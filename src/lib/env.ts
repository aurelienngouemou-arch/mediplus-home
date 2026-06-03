import { z } from "zod/v4";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL est requis"),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY est requis"),
  NEXT_PUBLIC_SITE_URL: z.string().min(1, "NEXT_PUBLIC_SITE_URL est requis"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET est requis"),
  ADMIN_EMAIL: z.string().email().default("medisplushome@gmail.com"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Variables d'environnement manquantes ou invalides :",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Variables d'environnement invalides. Vérifiez votre .env.local");
}

export const env = parsed.data;
