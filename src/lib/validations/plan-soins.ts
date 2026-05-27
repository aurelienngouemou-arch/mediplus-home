import { z } from "zod/v4";

export const acteCreateSchema = z.object({
  patient_id: z.uuid("ID patient invalide"),
  acte: z.string().min(1, "L'acte est requis").max(120),
  frequence: z.string().min(1, "La fréquence est requise").max(60),
  duree_minutes: z.number().int().min(5).max(240).optional(),
  moment_journee: z
    .enum(["matin", "midi", "soir", "nuit", "variable"])
    .optional(),
  actif: z.boolean().default(true),
  date_debut: z.string().optional(),
  date_fin: z.string().optional(),
  notes: z.string().max(2000).optional(),
});

export const acteUpdateSchema = acteCreateSchema.partial().omit({ patient_id: true });

export type ActeCreate = z.infer<typeof acteCreateSchema>;
export type ActeCreateInput = z.input<typeof acteCreateSchema>;
export type ActeUpdate = z.infer<typeof acteUpdateSchema>;
