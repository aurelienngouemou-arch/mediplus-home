import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { join } from "path";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const migrationSQL = readFileSync(
  join(process.cwd(), "src/db/migrations/0001_breezy_wendell_rand.sql"),
  "utf-8"
);

const statements = migrationSQL
  .split("--> statement-breakpoint")
  .map((s) => s.trim())
  .filter(Boolean);

async function run() {
  console.log(`Applying ${statements.length} statements...`);
  for (const stmt of statements) {
    try {
      await sql.query(stmt);
      console.log("✓", stmt.slice(0, 70).replace(/\n/g, " "));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.includes("already exists") ||
        msg.includes("relation") ||
        msg.includes("duplicate")
      ) {
        console.log("⚠ Already exists, skipping");
      } else {
        throw err;
      }
    }
  }
  console.log("\n✅ Migration applied successfully.");
}

run().catch(console.error);
