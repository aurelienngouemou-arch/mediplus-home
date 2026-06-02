import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  const email = "test.admin@mediplus-home.local";

  const existing = await db
    .select({ id: schema.users.id, email: schema.users.email })
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existing.length === 0) {
    console.log(`\nℹ️  Aucun compte trouvé avec l'email : ${email}\n`);
    process.exit(0);
  }

  await db.delete(schema.users).where(eq(schema.users.email, email));

  console.log(`\n✅ Compte de test supprimé : ${email}\n`);
}

main().catch((err) => {
  console.error("Erreur lors de la suppression :", err);
  process.exit(1);
});
