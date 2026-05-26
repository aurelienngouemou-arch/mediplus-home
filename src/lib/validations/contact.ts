import { z } from "zod/v4";

const phoneRegex = /^(\+32|0032|0)[1-9][0-9]{7,8}$/;

export const contactFormSchema = z.object({
  nom: z.string().min(2, "Veuillez entrer votre nom complet"),
  telephone: z
    .string()
    .regex(phoneRegex, "Numéro de téléphone belge invalide (ex: +32 470 00 00 00)"),
  email: z.email("Adresse email invalide"),
  commune: z.enum(["overijse", "hoeilaart", "tervuren", "autre"], {
    error: "Veuillez sélectionner une commune",
  }),
  type_demande: z.enum(["rendez-vous", "information", "devis", "autre"], {
    error: "Veuillez sélectionner un type de demande",
  }),
  message: z.string().optional(),
  rgpd_consent: z.literal(true, {
    error: "Vous devez accepter la politique de confidentialité",
  }),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;
