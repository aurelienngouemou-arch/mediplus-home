"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { infirmiersPartenaires, delegations } from "@/db/schema";
import { eq, asc, desc, count, ilike, or, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import {
  partenaireCreateSchema,
  partenaireUpdateSchema,
} from "@/lib/validations/partenaire";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  return session;
}

export type PartenaireSelectItem = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  zones_couvertes: string | null;
  actif: boolean | null;
};

export async function createPartenaire(data: unknown) {
  await requireAuth();

  const parsed = partenaireCreateSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const [created] = await db
      .insert(infirmiersPartenaires)
      .values(parsed.data)
      .returning({ id: infirmiersPartenaires.id });

    revalidatePath("/admin/partenaires");
    revalidatePath("/admin/dashboard");

    return { success: true, id: created.id };
  } catch (e) {
    console.error("createPartenaire error:", e);
    return { error: "Erreur lors de la création du partenaire" };
  }
}

export async function updatePartenaire(id: string, data: unknown) {
  await requireAuth();

  const parsed = partenaireUpdateSchema.safeParse({ id, ...(data as object) });
  if (!parsed.success) {
    return { error: "Données invalides : " + parsed.error.issues[0]?.message };
  }

  try {
    const { id: _, ...updateData } = parsed.data;
    await db
      .update(infirmiersPartenaires)
      .set(updateData)
      .where(eq(infirmiersPartenaires.id, id));

    revalidatePath("/admin/partenaires");
    revalidatePath(`/admin/partenaires/${id}`);

    return { success: true };
  } catch (e) {
    console.error("updatePartenaire error:", e);
    return { error: "Erreur lors de la mise à jour du partenaire" };
  }
}

export async function togglePartenaireActif(id: string) {
  await requireAuth();

  try {
    const [existing] = await db
      .select({ actif: infirmiersPartenaires.actif })
      .from(infirmiersPartenaires)
      .where(eq(infirmiersPartenaires.id, id))
      .limit(1);

    if (!existing) return { error: "Partenaire introuvable" };

    await db
      .update(infirmiersPartenaires)
      .set({ actif: !existing.actif })
      .where(eq(infirmiersPartenaires.id, id));

    revalidatePath("/admin/partenaires");
    revalidatePath(`/admin/partenaires/${id}`);

    return { success: true, newActif: !existing.actif };
  } catch (e) {
    console.error("togglePartenaireActif error:", e);
    return { error: "Erreur lors du changement de statut" };
  }
}

export async function deletePartenaire(id: string) {
  await requireAuth();

  try {
    const [delegCount] = await db
      .select({ value: count() })
      .from(delegations)
      .where(eq(delegations.partenaire_id, id));

    if (Number(delegCount.value) > 0) {
      await db
        .update(infirmiersPartenaires)
        .set({ actif: false })
        .where(eq(infirmiersPartenaires.id, id));

      revalidatePath("/admin/partenaires");
      return { success: true, archived: true };
    }

    await db.delete(infirmiersPartenaires).where(eq(infirmiersPartenaires.id, id));

    revalidatePath("/admin/partenaires");
    revalidatePath("/admin/dashboard");

    return { success: true, archived: false };
  } catch (e) {
    console.error("deletePartenaire error:", e);
    return { error: "Erreur lors de la suppression du partenaire" };
  }
}

export type PartenairesFilters = {
  search?: string;
  zone?: string;
  actif?: boolean | null;
  sort?: "nom_az" | "recent";
};

export async function getPartenaires(filters: PartenairesFilters = {}) {
  const conditions = [];

  if (filters.search) {
    const s = `%${filters.search}%`;
    conditions.push(
      or(
        ilike(infirmiersPartenaires.nom, s),
        ilike(infirmiersPartenaires.prenom, s),
        ilike(infirmiersPartenaires.telephone, s),
        ilike(infirmiersPartenaires.email, s)
      )
    );
  }

  if (filters.zone) {
    conditions.push(ilike(infirmiersPartenaires.zones_couvertes, `%${filters.zone}%`));
  }

  if (filters.actif !== undefined && filters.actif !== null) {
    conditions.push(eq(infirmiersPartenaires.actif, filters.actif));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const orderBy =
    filters.sort === "recent"
      ? desc(infirmiersPartenaires.created_at)
      : asc(infirmiersPartenaires.nom);

  return db
    .select()
    .from(infirmiersPartenaires)
    .where(where)
    .orderBy(orderBy);
}

export async function getPartenaireById(id: string) {
  const [partenaire] = await db
    .select()
    .from(infirmiersPartenaires)
    .where(eq(infirmiersPartenaires.id, id))
    .limit(1);

  if (!partenaire) return null;

  const recentDelegations = await db
    .select()
    .from(delegations)
    .where(eq(delegations.partenaire_id, id))
    .orderBy(desc(delegations.created_at))
    .limit(10);

  return { partenaire, delegations: recentDelegations };
}

export async function getPartenairesActifsForSelect(): Promise<PartenaireSelectItem[]> {
  return db
    .select({
      id: infirmiersPartenaires.id,
      nom: infirmiersPartenaires.nom,
      prenom: infirmiersPartenaires.prenom,
      telephone: infirmiersPartenaires.telephone,
      email: infirmiersPartenaires.email,
      zones_couvertes: infirmiersPartenaires.zones_couvertes,
      actif: infirmiersPartenaires.actif,
    })
    .from(infirmiersPartenaires)
    .where(eq(infirmiersPartenaires.actif, true))
    .orderBy(asc(infirmiersPartenaires.nom), asc(infirmiersPartenaires.prenom));
}

export async function getPartenairesStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [actifs, delegsMois] = await Promise.all([
    db
      .select({ value: count() })
      .from(infirmiersPartenaires)
      .where(eq(infirmiersPartenaires.actif, true)),
    db
      .select({ value: count() })
      .from(delegations)
      .where(sql`${delegations.created_at} >= ${startOfMonth}`),
  ]);

  const zonesResult = await db
    .select({ zones: infirmiersPartenaires.zones_couvertes })
    .from(infirmiersPartenaires)
    .where(eq(infirmiersPartenaires.actif, true));

  const allZones = new Set<string>();
  for (const row of zonesResult) {
    if (row.zones) {
      row.zones.split(",").forEach((z) => allZones.add(z.trim()));
    }
  }

  return {
    partenairesActifs: Number(actifs[0].value),
    zonesCouvertes: allZones.size,
    delegationsMois: Number(delegsMois[0].value),
  };
}

export async function getPartenairesActifsCount(): Promise<number> {
  const [result] = await db
    .select({ value: count() })
    .from(infirmiersPartenaires)
    .where(eq(infirmiersPartenaires.actif, true));
  return Number(result.value);
}
