import { z } from "zod/v4";

const phoneRegex = /^(\+32|0032|0)[1-9][0-9]{7,8}$/;

export const patientCreateSchema = z.object({
  nom: z.string().min(1, "Le nom est requis").max(60),
  prenom: z.string().min(1, "Le prénom est requis").max(60),
  telephone: z.string().regex(phoneRegex, "Numéro belge invalide"),
  email: z.email("Email invalide").optional().or(z.literal("")),
  adresse: z.string().min(1, "L'adresse est requise").max(200),
  code_postal: z.string().min(4, "Code postal invalide").max(10),
  commune: z.string().min(1, "La commune est requise").max(60),
  code_porte: z.string().max(20).optional(),
  date_naissance: z.string().optional(),
  mutuelle: z.string().max(100).optional(),
  numero_mutuelle: z.string().max(50).optional(),
  allergies: z.string().optional(),
  notes: z.string().optional(),
  statut: z.enum(["actif", "inactif", "archive"]).optional(),
  demande_origine_id: z.string().uuid().optional(),
});

export const patientUpdateSchema = patientCreateSchema.partial();

export type PatientCreate = z.infer<typeof patientCreateSchema>;
export type PatientUpdate = z.infer<typeof patientUpdateSchema>;
export type PatientCreateInput = z.input<typeof patientCreateSchema>;
