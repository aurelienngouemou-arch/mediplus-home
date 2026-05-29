"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { delegations, visites, patients, infirmiersPartenaires } from "@/db/schema";
import { eq, desc, and, sql, count, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { delegationCreateSchema } from "@/lib/validations/delegation";
import { sendDelegationToPartner } from "@/lib/email/send";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  return session;
}

export async function createDelegation(data: unknown) {
  await requireAuth();

  const parsed = delegationCreateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const [visite] = await db
      .select()
      .from(visites)
      .where(eq(visites.id, parsed.data.visite_id!))
      .limit(1);

    if (!visite) return { error: "Visite introuvable" };

    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, visite.patient_id))
      .limit(1);

    const [partenaire] = await db
      .select()
      .from(infirmiersPartenaires)
      .where(eq(infirmiersPartenaires.id, parsed.data.partenaire_id))
      .limit(1);

    if (!patient || !partenaire) return { error: "Données manquantes" };

    const [newDelegation] = await db
      .insert(delegations)
      .values({
        visite_id: parsed.data.visite_id,
        partenaire_id: parsed.data.partenaire_id,
        patient_id: visite.patient_id,
        motif: parsed.data.motif,
        statut: "envoyee",
        methode_notification: parsed.data.methode_notification,
        notes: parsed.data.notes,
        date_visite_prevue: visite.date_visite,
      })
      .returning({ id: delegations.id });

    await db
      .update(visites)
      .set({
        statut: "deleguee",
        delegation_id: newDelegation.id,
        updated_at: new Date(),
      })
      .where(eq(visites.id, visite.id));

    if (parsed.data.methode_notification === "email" || parsed.data.methode_notification === "les_deux") {
      await sendDelegationToPartner(
        { ...newDelegation, ...{ motif: parsed.data.motif, notes: parsed.data.notes ?? null, date_visite_prevue: visite.date_visite, statut: "envoyee", methode_notification: parsed.data.methode_notification, patient_id: visite.patient_id, visite_id: visite.id, partenaire_id: parsed.data.partenaire_id, reponse_partenaire: null, created_at: new Date(), updated_at: new Date() } },
        visite,
        patient,
        partenaire
      );
    }

    revalidatePath("/admin/tournee");
    revalidatePath(`/admin/partenaires/${parsed.data.partenaire_id}`);
    revalidatePath("/admin/dashboard");

    return { success: true, id: newDelegation.id, partenaire_prenom: partenaire.prenom };
  } catch (e) {
    console.error("createDelegation error:", e);
    return { error: "Erreur lors de la création de la délégation" };
  }
}

export async function updateDelegationStatus(
  id: string,
  statut: "acceptee" | "refusee" | "completee"
) {
  await requireAuth();

  try {
    await db
      .update(delegations)
      .set({ statut, updated_at: new Date() })
      .where(eq(delegations.id, id));

    revalidatePath("/admin/tournee");
    revalidatePath("/admin/partenaires");

    return { success: true };
  } catch (e) {
    console.error("updateDelegationStatus error:", e);
    return { error: "Erreur lors de la mise à jour du statut" };
  }
}

export async function cancelDelegation(delegationId: string, visiteId: string) {
  await requireAuth();

  try {
    await db.delete(delegations).where(eq(delegations.id, delegationId));

    await db
      .update(visites)
      .set({ statut: "planifiee", delegation_id: null, updated_at: new Date() })
      .where(eq(visites.id, visiteId));

    revalidatePath("/admin/tournee");
    revalidatePath("/admin/partenaires");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (e) {
    console.error("cancelDelegation error:", e);
    return { error: "Erreur lors de l'annulation de la délégation" };
  }
}

export async function getDelegationByVisiteId(visiteId: string) {
  const [deleg] = await db
    .select({
      id: delegations.id,
      visite_id: delegations.visite_id,
      partenaire_id: delegations.partenaire_id,
      patient_id: delegations.patient_id,
      motif: delegations.motif,
      statut: delegations.statut,
      notes: delegations.notes,
      created_at: delegations.created_at,
      partenaire_nom: infirmiersPartenaires.nom,
      partenaire_prenom: infirmiersPartenaires.prenom,
      partenaire_telephone: infirmiersPartenaires.telephone,
      partenaire_email: infirmiersPartenaires.email,
    })
    .from(delegations)
    .leftJoin(infirmiersPartenaires, eq(delegations.partenaire_id, infirmiersPartenaires.id))
    .where(eq(delegations.visite_id, visiteId))
    .orderBy(desc(delegations.created_at))
    .limit(1);

  return deleg ?? null;
}

export async function getDelegationsByPartenaire(partenaireId: string) {
  return db
    .select({
      id: delegations.id,
      visite_id: delegations.visite_id,
      motif: delegations.motif,
      statut: delegations.statut,
      date_visite_prevue: delegations.date_visite_prevue,
      created_at: delegations.created_at,
      patient_nom: patients.nom,
      patient_prenom: patients.prenom,
      acte_principal: visites.acte_principal,
    })
    .from(delegations)
    .leftJoin(patients, eq(delegations.patient_id, patients.id))
    .leftJoin(visites, eq(delegations.visite_id, visites.id))
    .where(eq(delegations.partenaire_id, partenaireId))
    .orderBy(desc(delegations.created_at))
    .limit(10);
}

export type DelegationRecente = {
  id: string;
  statut: string | null;
  motif: string | null;
  created_at: Date | null;
  partenaire_nom: string | null;
  partenaire_prenom: string | null;
  patient_nom: string | null;
  patient_prenom: string | null;
  date_visite_prevue: Date | null;
};

export async function getDelegationsRecentes(limit = 3): Promise<DelegationRecente[]> {
  return db
    .select({
      id: delegations.id,
      statut: delegations.statut,
      motif: delegations.motif,
      created_at: delegations.created_at,
      partenaire_nom: infirmiersPartenaires.nom,
      partenaire_prenom: infirmiersPartenaires.prenom,
      patient_nom: patients.nom,
      patient_prenom: patients.prenom,
      date_visite_prevue: delegations.date_visite_prevue,
    })
    .from(delegations)
    .leftJoin(infirmiersPartenaires, eq(delegations.partenaire_id, infirmiersPartenaires.id))
    .leftJoin(patients, eq(delegations.patient_id, patients.id))
    .orderBy(desc(delegations.created_at))
    .limit(limit);
}

export async function getDelegationsStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, enCours, cemois] = await Promise.all([
    db.select({ value: count() }).from(delegations),
    db
      .select({ value: count() })
      .from(delegations)
      .where(eq(delegations.statut, "envoyee")),
    db
      .select({ value: count() })
      .from(delegations)
      .where(gte(delegations.created_at, startOfMonth)),
  ]);

  return {
    total: Number(total[0].value),
    enCours: Number(enCours[0].value),
    ceMois: Number(cemois[0].value),
  };
}
