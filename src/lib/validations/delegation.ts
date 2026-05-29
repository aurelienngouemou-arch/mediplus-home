import { z } from "zod/v4";

export const delegationCreateSchema = z.object({
  visite_id: z.string().uuid("ID visite invalide"),
  partenaire_id: z.string().uuid("ID partenaire invalide"),
  motif: z.string().min(3, "Le motif est requis").max(200),
  methode_notification: z.enum(["email", "sms", "les_deux"]).default("email"),
  notes: z.string().max(2000).optional(),
});

export const delegationUpdateStatusSchema = z.object({
  statut: z.enum(["acceptee", "refusee", "completee"]),
});

export type DelegationCreate = z.infer<typeof delegationCreateSchema>;
export type DelegationUpdateStatus = z.infer<typeof delegationUpdateStatusSchema>;
