import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod/v4";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

// In-memory rate limiter — réinitialisé à chaque cold start serverless
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= MAX_ATTEMPTS) return true;
  entry.count++;
  return false;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Requis sur Vercel : autorise les requêtes depuis l'hôte de déploiement
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, request) {
        const ip =
          request?.headers?.get("x-forwarded-for") ??
          request?.headers?.get("x-real-ip") ??
          "unknown";

        if (isRateLimited(ip)) {
          throw new Error("Trop de tentatives. Réessayez dans 15 minutes.");
        }

        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user || !user.actif) return null;

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.prenom} ${user.nom}`,
          role: user.role,
          nom: user.nom,
          prenom: user.prenom,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.nom = user.nom;
        token.prenom = user.prenom;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id ?? "";
      session.user.role = token.role ?? "infirmier";
      session.user.nom = token.nom ?? "";
      session.user.prenom = token.prenom ?? "";
      return session;
    },
  },
});
