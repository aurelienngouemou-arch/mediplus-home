import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import * as schema from "../db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  const oldEmail = "mediplushome@gmail.com";

  const existing = await db
    .select({ id: schema.users.id, email: schema.users.email })
    .from(schema.users)
    .where(eq(schema.users.email, oldEmail))
    .limit(1);

  if (existing.length === 0) {
    console.log("\n✅ Aucun compte à supprimer — mediplushome@gmail.com n'existe pas dans la base.\n");
    process.exit(0);
  }

  await db.delete(schema.users).where(eq(schema.users.email, oldEmail));

  console.log(`\n✅ Compte supprimé avec succès : ${oldEmail}\n`);
}

main().catch((err) => {
  console.error("Erreur lors de la suppression :", err);
  process.exit(1);
});
