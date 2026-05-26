import { z } from "zod/v4";

export const visiteCreateSchema = z.object({
  patient_id: z.string().uuid("ID patient invalide"),
  date_visite: z.string().min(1, "La date de visite est requise"),
  duree_minutes: z.number().int().positive().optional(),
  acte_principal: z.string().max(120).optional(),
  actes_supplementaires: z.string().optional(),
  transmissions: z.string().optional(),
  statut: z
    .enum(["planifiee", "en_cours", "terminee", "annulee", "deleguee"])
    .default("planifiee"),
});

export const visiteUpdateSchema = visiteCreateSchema.partial();

export type VisiteCreate = z.infer<typeof visiteCreateSchema>;
export type VisiteUpdate = z.infer<typeof visiteUpdateSchema>;
