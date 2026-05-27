CREATE TABLE "actes_plan_soins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL,
	"acte" varchar(120) NOT NULL,
	"frequence" varchar(60) NOT NULL,
	"duree_minutes" integer,
	"moment_journee" varchar(30),
	"actif" boolean DEFAULT true,
	"date_debut" date,
	"date_fin" date,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "actes_plan_soins" ADD CONSTRAINT "actes_plan_soins_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_actes_patient_actif" ON "actes_plan_soins" USING btree ("patient_id","actif");