import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import * as schema from "../db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

function generateSecurePassword(length = 20): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()-_+=";
  const all = upper + lower + digits + symbols;

  // Garantit au moins un de chaque catégorie
  const required = [
    upper[crypto.randomInt(upper.length)],
    lower[crypto.randomInt(lower.length)],
    digits[crypto.randomInt(digits.length)],
    symbols[crypto.randomInt(symbols.length)],
  ];

  const rest = Array.from({ length: length - required.length }, () =>
    all[crypto.randomInt(all.length)]
  );

  return [...required, ...rest]
    .sort(() => crypto.randomInt(3) - 1)
    .join("");
}

async function main() {
  const email = "test.admin@mediplus-home.local";
  const plainPassword = generateSecurePassword(20);
  const passwordHash = await bcrypt.hash(plainPassword, 12);

  // Vérifie si le compte existe déjà
  const existing = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing.length > 0) {
    // Met à jour le mot de passe si le compte existe déjà
    await db
      .update(schema.users)
      .set({ password_hash: passwordHash, actif: true })
      .where(eq(schema.users.email, email));
    console.log("Compte existant — mot de passe réinitialisé.");
  } else {
    await db.insert(schema.users).values({
      email,
      password_hash: passwordHash,
      nom: "Admin",
      prenom: "Test",
      role: "admin",
      actif: true,
    });
  }

  const border = "═".repeat(57);
  console.log(`\n╔${border}╗`);
  console.log(`║${"COMPTE ADMIN CRÉÉ AVEC SUCCÈS".padEnd(57)}║`);
  console.log(`║${" ".repeat(57)}║`);
  console.log(`║  Email    : ${email.padEnd(44)}║`);
  console.log(`║  Password : ${plainPassword.padEnd(44)}║`);
  console.log(`║${" ".repeat(57)}║`);
  console.log(`║  ⚠  NOTE-LE MAINTENANT, IL NE SERA PLUS AFFICHÉ   ║`);
  console.log(`║  ⚠  Garde-le dans un gestionnaire de mots de passe ║`);
  console.log(`╚${border}╝\n`);
}

main().catch((err) => {
  console.error("Erreur lors du seed :", err);
  process.exit(1);
});
