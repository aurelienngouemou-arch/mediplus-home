import { z } from "zod/v4";

export const visiteCreateSchema = z.object({
  patient_id: z.string().uuid("ID patient invalide"),
  date_visite: z.string().min(1, "La date de visite est requise"),
  duree_minutes: z.number().int().min(5, "Durée minimum 5 minutes").max(480).optional(),
  acte_principal: z.string().max(120).optional(),
  actes_supplementaires: z.string().optional(),
  notes_pre_visite: z.string().max(2000).optional(),
  statut: z
    .enum(["planifiee", "en_cours", "terminee", "annulee", "deleguee"])
    .default("planifiee"),
});

export const visiteUpdateSchema = z.object({
  date_visite: z.string().min(1).optional(),
  duree_minutes: z.number().int().min(5).max(480).optional(),
  acte_principal: z.string().max(120).optional(),
  actes_supplementaires: z.string().optional(),
  notes_pre_visite: z.string().max(2000).optional(),
  statut: z
    .enum(["planifiee", "en_cours", "terminee", "annulee", "deleguee"])
    .optional(),
  transmissions: z.string().max(5000).optional(),
  etat_patient: z.enum(["bon", "stable", "preoccupant", "a_surveiller"]).optional(),
});

export type VisiteCreate = z.infer<typeof visiteCreateSchema>;
export type VisiteUpdate = z.infer<typeof visiteUpdateSchema>;
