import { z } from "zod/v4";

const phoneRegex = /^(\+32|0)[0-9]{8,9}$/;

export const partenaireCreateSchema = z.object({
  nom: z.string().min(1, "Le nom est requis").max(60, "Nom trop long"),
  prenom: z.string().min(1, "Le prénom est requis").max(60, "Prénom trop long"),
  telephone: z
    .string()
    .min(1, "Le téléphone est requis")
    .regex(phoneRegex, "Format téléphone invalide (ex: +32470000000 ou 0470000000)"),
  email: z.string().min(1, "L'email est requis").email("Adresse email invalide"),
  zones_couvertes: z.string().optional(),
  specialites: z.string().max(500).optional(),
  numero_inami: z.string().max(30).optional(),
  notes: z.string().max(2000).optional(),
  actif: z.boolean(),
});

export const partenaireUpdateSchema = z.object({
  id: z.string().uuid("ID invalide"),
  nom: z.string().min(1).max(60).optional(),
  prenom: z.string().min(1).max(60).optional(),
  telephone: z.string().regex(phoneRegex).optional(),
  email: z.string().email().optional(),
  zones_couvertes: z.string().optional(),
  specialites: z.string().max(500).optional(),
  numero_inami: z.string().max(30).optional(),
  notes: z.string().max(2000).optional(),
  actif: z.boolean().optional(),
});

export type PartenaireCreate = z.infer<typeof partenaireCreateSchema>;
export type PartenaireUpdate = z.infer<typeof partenaireUpdateSchema>;
