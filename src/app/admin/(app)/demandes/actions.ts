"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { demandesContact } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod/v4";

const updateStatusSchema = z.object({
  id: z.uuid(),
  statut: z.enum(["nouveau", "en_cours", "traite", "archive", "spam"]),
});

const updateNotesSchema = z.object({
  id: z.uuid(),
  notes: z.string().max(5000),
});

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  return session;
}

export async function updateDemandeStatus(id: string, statut: string) {
  await requireAuth();

  const parsed = updateStatusSchema.safeParse({ id, statut });
  if (!parsed.success) throw new Error("Données invalides");

  await db
    .update(demandesContact)
    .set({ statut: parsed.data.statut, updated_at: new Date() })
    .where(eq(demandesContact.id, parsed.data.id));

  revalidatePath(`/admin/demandes/${id}`);
  revalidatePath("/admin/demandes");
  revalidatePath("/admin/dashboard");
}

export async function updateDemandeNotes(id: string, notes: string) {
  await requireAuth();

  const parsed = updateNotesSchema.safeParse({ id, notes });
  if (!parsed.success) throw new Error("Données invalides");

  await db
    .update(demandesContact)
    .set({ notes_internes: parsed.data.notes, updated_at: new Date() })
    .where(eq(demandesContact.id, parsed.data.id));

  revalidatePath(`/admin/demandes/${id}`);
}
