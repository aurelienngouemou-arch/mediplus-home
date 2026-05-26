CREATE TABLE "delegations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"visite_id" uuid,
	"partenaire_id" uuid,
	"patient_id" uuid,
	"motif" varchar(200),
	"statut" varchar(30) DEFAULT 'envoyee',
	"methode_notification" varchar(20),
	"notes" text,
	"date_visite_prevue" timestamp with time zone,
	"reponse_partenaire" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "demandes_contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" varchar(120) NOT NULL,
	"telephone" varchar(20) NOT NULL,
	"email" varchar(180) NOT NULL,
	"commune" varchar(60),
	"type_demande" varchar(40),
	"message" text,
	"rgpd_consent" boolean DEFAULT false NOT NULL,
	"statut" varchar(30) DEFAULT 'nouveau',
	"notes_internes" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"ip_adresse" varchar(45)
);
--> statement-breakpoint
CREATE TABLE "infirmiers_partenaires" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" varchar(60) NOT NULL,
	"prenom" varchar(60) NOT NULL,
	"telephone" varchar(20) NOT NULL,
	"email" varchar(180) NOT NULL,
	"zones_couvertes" text,
	"specialites" text,
	"numero_inami" varchar(30),
	"notes" text,
	"actif" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nom" varchar(60) NOT NULL,
	"prenom" varchar(60) NOT NULL,
	"telephone" varchar(20) NOT NULL,
	"email" varchar(180),
	"adresse" varchar(200) NOT NULL,
	"code_postal" varchar(10) NOT NULL,
	"commune" varchar(60) NOT NULL,
	"code_porte" varchar(20),
	"date_naissance" date,
	"mutuelle" varchar(100),
	"numero_mutuelle" varchar(50),
	"allergies" text,
	"notes" text,
	"statut" varchar(30) DEFAULT 'actif',
	"demande_origine_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "visites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL,
	"date_visite" timestamp with time zone NOT NULL,
	"duree_minutes" integer,
	"acte_principal" varchar(120),
	"actes_supplementaires" text,
	"transmissions" text,
	"statut" varchar(30) DEFAULT 'planifiee',
	"delegation_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "delegations" ADD CONSTRAINT "delegations_visite_id_visites_id_fk" FOREIGN KEY ("visite_id") REFERENCES "public"."visites"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delegations" ADD CONSTRAINT "delegations_partenaire_id_infirmiers_partenaires_id_fk" FOREIGN KEY ("partenaire_id") REFERENCES "public"."infirmiers_partenaires"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "delegations" ADD CONSTRAINT "delegations_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patients" ADD CONSTRAINT "patients_demande_origine_id_demandes_contact_id_fk" FOREIGN KEY ("demande_origine_id") REFERENCES "public"."demandes_contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "visites" ADD CONSTRAINT "visites_patient_id_patients_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_delegations_partenaire_statut" ON "delegations" USING btree ("partenaire_id","statut");--> statement-breakpoint
CREATE INDEX "idx_demandes_statut_created" ON "demandes_contact" USING btree ("statut","created_at");--> statement-breakpoint
CREATE INDEX "idx_patients_commune_statut" ON "patients" USING btree ("commune","statut");--> statement-breakpoint
CREATE INDEX "idx_visites_patient_date_statut" ON "visites" USING btree ("patient_id","date_visite","statut");