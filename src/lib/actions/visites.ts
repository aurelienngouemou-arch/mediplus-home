"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { visites, patients, actesPlanSoins } from "@/db/schema";
import { eq, and, gte, lt, desc, asc, count, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { visiteCreateSchema, visiteUpdateSchema } from "@/lib/validations/visite";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  return session;
}

export type VisiteAvecPatient = {
  id: string;
  date_visite: Date;
  duree_minutes: number | null;
  acte_principal: string | null;
  actes_supplementaires: string | null;
  transmissions: string | null;
  notes_pre_visite: string | null;
  etat_patient: string | null;
  statut: string;
  patient_id: string;
  patient_nom: string;
  patient_prenom: string;
  patient_commune: string;
  patient_adresse: string;
  patient_telephone: string;
};

export type PatientSelectItem = {
  id: string;
  nom: string;
  prenom: string;
  commune: string;
};

function dayRange(dateStr: string): { start: Date; end: Date } {
  const start = new Date(`${dateStr}T00:00:00Z`);
  const end = new Date(`${dateStr}T23:59:59Z`);
  return { start, end };
}

const visiteSelectFields = {
  id: visites.id,
  date_visite: visites.date_visite,
  duree_minutes: visites.duree_minutes,
  acte_principal: visites.acte_principal,
  actes_supplementaires: visites.actes_supplementaires,
  transmissions: visites.transmissions,
  notes_pre_visite: visites.notes_pre_visite,
  etat_patient: visites.etat_patient,
  statut: visites.statut,
  patient_id: visites.patient_id,
  patient_nom: patients.nom,
  patient_prenom: patients.prenom,
  patient_commune: patients.commune,
  patient_adresse: patients.adresse,
  patient_telephone: patients.telephone,
};

function normalizeRow(row: {
  id: string;
  date_visite: Date;
  duree_minutes: number | null;
  acte_principal: string | null;
  actes_supplementaires: string | null;
  transmissions: string | null;
  notes_pre_visite: string | null;
  etat_patient: string | null;
  statut: string | null;
  patient_id: string;
  patient_nom: string;
  patient_prenom: string;
  patient_commune: string;
  patient_adresse: string;
  patient_telephone: string;
}): VisiteAvecPatient {
  return { ...row, statut: row.statut ?? "planifiee" };
}

export async function getVisitesJour(dateStr: string): Promise<VisiteAvecPatient[]> {
  const { start, end } = dayRange(dateStr);

  const rows = await db
    .select(visiteSelectFields)
    .from(visites)
    .innerJoin(patients, eq(visites.patient_id, patients.id))
    .where(and(gte(visites.date_visite, start), lt(visites.date_visite, end)))
    .orderBy(asc(visites.date_visite));

  return rows.map(normalizeRow);
}

export async function getVisitesSemaine(
  mondayStr: string
): Promise<{ date: string; visites: VisiteAvecPatient[] }[]> {
  const start = new Date(`${mondayStr}T00:00:00Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);

  const rows = await db
    .select(visiteSelectFields)
    .from(visites)
    .innerJoin(patients, eq(visites.patient_id, patients.id))
    .where(and(gte(visites.date_visite, start), lt(visites.date_visite, end)))
    .orderBy(asc(visites.date_visite));

  const days: Record<string, VisiteAvecPatient[]> = {};
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    days[d.toISOString().slice(0, 10)] = [];
  }

  for (const row of rows) {
    const key = new Date(row.date_visite).toISOString().slice(0, 10);
    if (key in days) {
      days[key].push(normalizeRow(row));
    }
  }

  return Object.entries(days).map(([date, visitesList]) => ({
    date,
    visites: visitesList,
  }));
}

export async function getStatsVisites() {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const { start: todayStart, end: todayEnd } = dayRange(todayStr);

  const dayOfWeek = now.getUTCDay() || 7;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - dayOfWeek + 1);
  const mondayStr = monday.toISOString().slice(0, 10);
  const weekStart = new Date(`${mondayStr}T00:00:00Z`);
  const weekEnd = new Date(weekStart);
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 7);

  const [auj, sem, term, patientsVusCnt] = await Promise.all([
    db
      .select({ value: count() })
      .from(visites)
      .where(and(gte(visites.date_visite, todayStart), lt(visites.date_visite, todayEnd))),
    db
      .select({ value: count() })
      .from(visites)
      .where(and(gte(visites.date_visite, weekStart), lt(visites.date_visite, weekEnd))),
    db
      .select({ value: count() })
      .from(visites)
      .where(
        and(
          eq(visites.statut, "terminee"),
          gte(visites.date_visite, weekStart),
          lt(visites.date_visite, weekEnd)
        )
      ),
    db
      .select({ value: sql<number>`count(distinct ${visites.patient_id})` })
      .from(visites)
      .where(
        and(
          eq(visites.statut, "terminee"),
          gte(visites.date_visite, weekStart),
          lt(visites.date_visite, weekEnd)
        )
      ),
  ]);

  return {
    visitesAujourdhui: Number(auj[0].value),
    visitesSemaine: Number(sem[0].value),
    visitesTerminees: Number(term[0].value),
    patientsVus: Number(patientsVusCnt[0].value),
  };
}

export async function getVisitesAujourdhuiCount(): Promise<number> {
  const todayStr = new Date().toISOString().slice(0, 10);
  const { start, end } = dayRange(todayStr);

  const [result] = await db
    .select({ value: count() })
    .from(visites)
    .where(and(gte(visites.date_visite, start), lt(visites.date_visite, end)));

  return Number(result.value);
}

export async function getProchesVisites(limit = 3): Promise<VisiteAvecPatient[]> {
  const now = new Date();
  const todayEnd = new Date(`${now.toISOString().slice(0, 10)}T23:59:59Z`);

  const rows = await db
    .select(visiteSelectFields)
    .from(visites)
    .innerJoin(patients, eq(visites.patient_id, patients.id))
    .where(
      and(
        gte(visites.date_visite, now),
        lt(visites.date_visite, todayEnd),
        eq(visites.statut, "planifiee")
      )
    )
    .orderBy(asc(visites.date_visite))
    .limit(limit);

  return rows.map(normalizeRow);
}

export async function getAllPatientsActifs(): Promise<PatientSelectItem[]> {
  return db
    .select({
      id: patients.id,
      nom: patients.nom,
      prenom: patients.prenom,
      commune: patients.commune,
    })
    .from(patients)
    .where(eq(patients.statut, "actif"))
    .orderBy(asc(patients.nom), asc(patients.prenom));
}

export async function getActesDuPatient(patientId: string) {
  return db
    .select()
    .from(actesPlanSoins)
    .where(and(eq(actesPlanSoins.patient_id, patientId), eq(actesPlanSoins.actif, true)))
    .orderBy(asc(actesPlanSoins.created_at));
}

// ─── Mutations ───────────────────────────────────────────

export async function createVisite(data: unknown) {
  await requireAuth();

  const parsed = visiteCreateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    await db.insert(visites).values({
      patient_id: parsed.data.patient_id,
      date_visite: new Date(parsed.data.date_visite),
      duree_minutes: parsed.data.duree_minutes ?? null,
      acte_principal: parsed.data.acte_principal || null,
      actes_supplementaires: parsed.data.actes_supplementaires || null,
      notes_pre_visite: parsed.data.notes_pre_visite || null,
      statut: "planifiee",
      updated_at: new Date(),
    });

    revalidatePath("/admin/tournee");
    revalidatePath(`/admin/patients/${parsed.data.patient_id}`);
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (e) {
    console.error("createVisite error:", e);
    return { error: "Erreur lors de la création de la visite" };
  }
}

export async function updateVisite(id: string, data: unknown) {
  await requireAuth();

  const parsed = visiteUpdateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const [existing] = await db
      .select({ patient_id: visites.patient_id })
      .from(visites)
      .where(eq(visites.id, id))
      .limit(1);

    const updateData: Record<string, unknown> = {
      ...parsed.data,
      updated_at: new Date(),
    };
    if (parsed.data.date_visite) {
      updateData.date_visite = new Date(parsed.data.date_visite);
    }

    await db.update(visites).set(updateData).where(eq(visites.id, id));

    revalidatePath("/admin/tournee");
    if (existing) revalidatePath(`/admin/patients/${existing.patient_id}`);

    return { success: true };
  } catch (e) {
    console.error("updateVisite error:", e);
    return { error: "Erreur lors de la mise à jour de la visite" };
  }
}

export async function deleteVisite(id: string) {
  await requireAuth();

  try {
    const [existing] = await db
      .select({ patient_id: visites.patient_id })
      .from(visites)
      .where(eq(visites.id, id))
      .limit(1);

    await db.delete(visites).where(eq(visites.id, id));

    revalidatePath("/admin/tournee");
    if (existing) revalidatePath(`/admin/patients/${existing.patient_id}`);
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (e) {
    console.error("deleteVisite error:", e);
    return { error: "Erreur lors de la suppression de la visite" };
  }
}

export async function demarrerVisite(id: string) {
  await requireAuth();

  try {
    await db
      .update(visites)
      .set({ statut: "en_cours", updated_at: new Date() })
      .where(eq(visites.id, id));

    revalidatePath("/admin/tournee");
    return { success: true };
  } catch (e) {
    console.error("demarrerVisite error:", e);
    return { error: "Erreur lors du démarrage de la visite" };
  }
}

export async function terminerVisite(
  id: string,
  data: { transmissions: string; actes_effectues?: string; etat_patient?: string }
) {
  await requireAuth();

  try {
    const [existing] = await db
      .select({ patient_id: visites.patient_id })
      .from(visites)
      .where(eq(visites.id, id))
      .limit(1);

    await db
      .update(visites)
      .set({
        statut: "terminee",
        transmissions: data.transmissions,
        actes_supplementaires: data.actes_effectues || null,
        etat_patient: data.etat_patient || null,
        updated_at: new Date(),
      })
      .where(eq(visites.id, id));

    revalidatePath("/admin/tournee");
    if (existing) revalidatePath(`/admin/patients/${existing.patient_id}`);
    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (e) {
    console.error("terminerVisite error:", e);
    return { error: "Erreur lors de la clôture de la visite" };
  }
}

export async function annulerVisite(id: string, motif?: string) {
  await requireAuth();

  try {
    await db
      .update(visites)
      .set({
        statut: "annulee",
        notes_pre_visite: motif || null,
        updated_at: new Date(),
      })
      .where(eq(visites.id, id));

    revalidatePath("/admin/tournee");
    return { success: true };
  } catch (e) {
    console.error("annulerVisite error:", e);
    return { error: "Erreur lors de l'annulation de la visite" };
  }
}
