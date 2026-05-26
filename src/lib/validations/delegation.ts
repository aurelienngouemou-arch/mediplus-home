import { z } from "zod/v4";

export const delegationCreateSchema = z.object({
  visite_id: z.string().uuid().optional(),
  partenaire_id: z.string().uuid("ID partenaire invalide"),
  patient_id: z.string().uuid("ID patient invalide"),
  motif: z.string().max(200).optional(),
  statut: z
    .enum(["envoyee", "acceptee", "refusee", "completee"])
    .default("envoyee"),
  methode_notification: z.enum(["email", "sms", "les_deux"]).default("email"),
  notes: z.string().optional(),
  date_visite_prevue: z.string().optional(),
});

export type DelegationCreate = z.infer<typeof delegationCreateSchema>;
