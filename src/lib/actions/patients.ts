"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import {
  patients,
  actesPlanSoins,
  demandesContact,
  visites,
} from "@/db/schema";
import {
  eq,
  and,
  desc,
  asc,
  ilike,
  or,
  count,
  gte,
  sql,
} from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  patientCreateSchema,
  patientUpdateSchema,
} from "@/lib/validations/patient";
import {
  acteCreateSchema,
  acteUpdateSchema,
} from "@/lib/validations/plan-soins";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  return session;
}

// ─── Patients ─────────────────────────────────────────────

export async function createPatient(data: unknown) {
  await requireAuth();

  const parsed = patientCreateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const [patient] = await db
      .insert(patients)
      .values({
        ...parsed.data,
        statut: parsed.data.statut ?? "actif",
        email: parsed.data.email || null,
        updated_at: new Date(),
      })
      .returning({ id: patients.id });

    revalidatePath("/admin/patients");
    revalidatePath("/admin/dashboard");

    return { success: true, patientId: patient.id };
  } catch (e) {
    console.error("createPatient error:", e);
    return { error: "Erreur lors de la création du patient" };
  }
}

export async function updatePatient(id: string, data: unknown) {
  await requireAuth();

  const parsed = patientUpdateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    await db
      .update(patients)
      .set({ ...parsed.data, updated_at: new Date() })
      .where(eq(patients.id, id));

    revalidatePath(`/admin/patients/${id}`);
    revalidatePath("/admin/patients");

    return { success: true };
  } catch (e) {
    console.error("updatePatient error:", e);
    return { error: "Erreur lors de la mise à jour du patient" };
  }
}

export async function deletePatient(id: string) {
  await requireAuth();

  try {
    await db
      .update(patients)
      .set({ statut: "archive", updated_at: new Date() })
      .where(eq(patients.id, id));

    revalidatePath("/admin/patients");
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (e) {
    console.error("deletePatient error:", e);
    return { error: "Erreur lors de l'archivage du patient" };
  }
}

export async function getPatients(filters: {
  q?: string;
  statut?: string;
  commune?: string;
  tri?: string;
  page?: number;
}) {
  const PAGE_SIZE = 20;
  const page = filters.page ?? 1;

  const conditions = [];

  if (filters.statut && filters.statut !== "tous") {
    conditions.push(eq(patients.statut, filters.statut));
  } else if (!filters.statut) {
    conditions.push(
      or(eq(patients.statut, "actif"), eq(patients.statut, "inactif"))!
    );
  }

  if (filters.commune && filters.commune !== "tous") {
    conditions.push(ilike(patients.commune, `%${filters.commune}%`));
  }

  if (filters.q) {
    conditions.push(
      or(
        ilike(patients.nom, `%${filters.q}%`),
        ilike(patients.prenom, `%${filters.q}%`),
        ilike(patients.telephone, `%${filters.q}%`)
      )!
    );
  }

  const where =
    conditions.length === 0
      ? undefined
      : conditions.length === 1
        ? conditions[0]
        : and(...conditions);

  const orderBy =
    filters.tri === "alpha_asc"
      ? [asc(patients.nom), asc(patients.prenom)]
      : filters.tri === "alpha_desc"
        ? [desc(patients.nom), desc(patients.prenom)]
        : filters.tri === "ancien"
          ? [asc(patients.created_at)]
          : [desc(patients.created_at)];

  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(patients)
      .where(where)
      .orderBy(...orderBy)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ value: count() }).from(patients).where(where),
  ]);

  return {
    patients: rows,
    total: Number(totalResult[0].value),
    page,
    totalPages: Math.ceil(Number(totalResult[0].value) / PAGE_SIZE),
  };
}

export async function getPatientById(id: string) {
  const [patient] = await db
    .select()
    .from(patients)
    .where(eq(patients.id, id))
    .limit(1);

  if (!patient) return null;

  const [actes, lastVisites] = await Promise.all([
    db
      .select()
      .from(actesPlanSoins)
      .where(
        and(eq(actesPlanSoins.patient_id, id), eq(actesPlanSoins.actif, true))
      )
      .orderBy(asc(actesPlanSoins.created_at)),
    db
      .select()
      .from(visites)
      .where(eq(visites.patient_id, id))
      .orderBy(desc(visites.date_visite))
      .limit(10),
  ]);

  return { ...patient, actes, visites: lastVisites };
}

export async function getPatientsActifsCount() {
  const [result] = await db
    .select({ value: count() })
    .from(patients)
    .where(eq(patients.statut, "actif"));
  return Number(result.value);
}

export async function getRecentPatients(limit = 5) {
  return db
    .select()
    .from(patients)
    .where(eq(patients.statut, "actif"))
    .orderBy(desc(patients.created_at))
    .limit(limit);
}

export async function getPatientsParCommune() {
  const result = await db
    .select({
      commune: patients.commune,
      count: count(),
    })
    .from(patients)
    .where(eq(patients.statut, "actif"))
    .groupBy(patients.commune)
    .orderBy(desc(count()))
    .limit(3);
  return result;
}

export async function getNouveauxPatientsCeMois() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [result] = await db
    .select({ value: count() })
    .from(patients)
    .where(gte(patients.created_at, startOfMonth));
  return Number(result.value);
}

// ─── Conversion demande → patient ─────────────────────────

export async function convertDemandeToPatient(
  demandeId: string,
  additionalData: unknown
) {
  await requireAuth();

  const extraSchema = patientCreateSchema.omit({ demande_origine_id: true });
  const parsed = extraSchema.safeParse(additionalData);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const [demande] = await db
      .select()
      .from(demandesContact)
      .where(eq(demandesContact.id, demandeId))
      .limit(1);

    if (!demande) return { error: "Demande introuvable" };

    const [patient] = await db
      .insert(patients)
      .values({
        ...parsed.data,
        statut: parsed.data.statut ?? "actif",
        email: parsed.data.email || null,
        demande_origine_id: demandeId,
        updated_at: new Date(),
      })
      .returning({ id: patients.id });

    await db
      .update(demandesContact)
      .set({ statut: "traite", updated_at: new Date() })
      .where(eq(demandesContact.id, demandeId));

    revalidatePath(`/admin/demandes/${demandeId}`);
    revalidatePath("/admin/demandes");
    revalidatePath("/admin/patients");
    revalidatePath("/admin/dashboard");

    return { success: true, patientId: patient.id };
  } catch (e) {
    console.error("convertDemandeToPatient error:", e);
    return { error: "Erreur lors de la conversion" };
  }
}

// ─── Plan de soins ─────────────────────────────────────────

export async function createActePlanSoins(data: unknown) {
  await requireAuth();

  const parsed = acteCreateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const [acte] = await db
      .insert(actesPlanSoins)
      .values({ ...parsed.data, updated_at: new Date() })
      .returning({ id: actesPlanSoins.id });

    revalidatePath(`/admin/patients/${parsed.data.patient_id}`);

    return { success: true, acteId: acte.id };
  } catch (e) {
    console.error("createActePlanSoins error:", e);
    return { error: "Erreur lors de l'ajout de l'acte" };
  }
}

export async function updateActePlanSoins(id: string, data: unknown) {
  await requireAuth();

  const parsed = acteUpdateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const [acte] = await db
      .select({ patient_id: actesPlanSoins.patient_id })
      .from(actesPlanSoins)
      .where(eq(actesPlanSoins.id, id))
      .limit(1);

    await db
      .update(actesPlanSoins)
      .set({ ...parsed.data, updated_at: new Date() })
      .where(eq(actesPlanSoins.id, id));

    if (acte) revalidatePath(`/admin/patients/${acte.patient_id}`);

    return { success: true };
  } catch (e) {
    console.error("updateActePlanSoins error:", e);
    return { error: "Erreur lors de la mise à jour de l'acte" };
  }
}

export async function toggleActePlanSoinsActif(id: string) {
  await requireAuth();

  try {
    const [acte] = await db
      .select()
      .from(actesPlanSoins)
      .where(eq(actesPlanSoins.id, id))
      .limit(1);

    if (!acte) return { error: "Acte introuvable" };

    await db
      .update(actesPlanSoins)
      .set({ actif: !acte.actif, updated_at: new Date() })
      .where(eq(actesPlanSoins.id, id));

    revalidatePath(`/admin/patients/${acte.patient_id}`);

    return { success: true };
  } catch (e) {
    console.error("toggleActePlanSoinsActif error:", e);
    return { error: "Erreur lors de la modification de l'acte" };
  }
}

export async function deleteActePlanSoins(id: string) {
  await requireAuth();

  try {
    const [acte] = await db
      .select({ patient_id: actesPlanSoins.patient_id })
      .from(actesPlanSoins)
      .where(eq(actesPlanSoins.id, id))
      .limit(1);

    await db.delete(actesPlanSoins).where(eq(actesPlanSoins.id, id));

    if (acte) revalidatePath(`/admin/patients/${acte.patient_id}`);

    return { success: true };
  } catch (e) {
    console.error("deleteActePlanSoins error:", e);
    return { error: "Erreur lors de la suppression de l'acte" };
  }
}
