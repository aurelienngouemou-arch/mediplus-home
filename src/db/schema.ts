import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  date,
  index,
} from "drizzle-orm/pg-core";

export const demandesContact = pgTable(
  "demandes_contact",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nom: varchar("nom", { length: 120 }).notNull(),
    telephone: varchar("telephone", { length: 20 }).notNull(),
    email: varchar("email", { length: 180 }).notNull(),
    commune: varchar("commune", { length: 60 }),
    type_demande: varchar("type_demande", { length: 40 }),
    message: text("message"),
    rgpd_consent: boolean("rgpd_consent").notNull().default(false),
    statut: varchar("statut", { length: 30 }).default("nouveau"),
    notes_internes: text("notes_internes"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    ip_adresse: varchar("ip_adresse", { length: 45 }),
  },
  (table) => [
    index("idx_demandes_statut_created").on(table.statut, table.created_at),
  ]
);

export const patients = pgTable(
  "patients",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    nom: varchar("nom", { length: 60 }).notNull(),
    prenom: varchar("prenom", { length: 60 }).notNull(),
    telephone: varchar("telephone", { length: 20 }).notNull(),
    email: varchar("email", { length: 180 }),
    adresse: varchar("adresse", { length: 200 }).notNull(),
    code_postal: varchar("code_postal", { length: 10 }).notNull(),
    commune: varchar("commune", { length: 60 }).notNull(),
    code_porte: varchar("code_porte", { length: 20 }),
    date_naissance: date("date_naissance"),
    mutuelle: varchar("mutuelle", { length: 100 }),
    numero_mutuelle: varchar("numero_mutuelle", { length: 50 }),
    allergies: text("allergies"),
    notes: text("notes"),
    statut: varchar("statut", { length: 30 }).default("actif"),
    demande_origine_id: uuid("demande_origine_id").references(
      () => demandesContact.id
    ),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_patients_commune_statut").on(table.commune, table.statut),
  ]
);

export const infirmiersPartenaires = pgTable("infirmiers_partenaires", {
  id: uuid("id").primaryKey().defaultRandom(),
  nom: varchar("nom", { length: 60 }).notNull(),
  prenom: varchar("prenom", { length: 60 }).notNull(),
  telephone: varchar("telephone", { length: 20 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  zones_couvertes: text("zones_couvertes"),
  specialites: text("specialites"),
  numero_inami: varchar("numero_inami", { length: 30 }),
  notes: text("notes"),
  actif: boolean("actif").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const visites = pgTable(
  "visites",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    patient_id: uuid("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    date_visite: timestamp("date_visite", { withTimezone: true }).notNull(),
    duree_minutes: integer("duree_minutes"),
    acte_principal: varchar("acte_principal", { length: 120 }),
    actes_supplementaires: text("actes_supplementaires"),
    transmissions: text("transmissions"),
    statut: varchar("statut", { length: 30 }).default("planifiee"),
    delegation_id: uuid("delegation_id"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_visites_patient_date_statut").on(
      table.patient_id,
      table.date_visite,
      table.statut
    ),
  ]
);

export const delegations = pgTable(
  "delegations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    visite_id: uuid("visite_id").references(() => visites.id),
    partenaire_id: uuid("partenaire_id").references(
      () => infirmiersPartenaires.id
    ),
    patient_id: uuid("patient_id").references(() => patients.id),
    motif: varchar("motif", { length: 200 }),
    statut: varchar("statut", { length: 30 }).default("envoyee"),
    methode_notification: varchar("methode_notification", { length: 20 }),
    notes: text("notes"),
    date_visite_prevue: timestamp("date_visite_prevue", {
      withTimezone: true,
    }),
    reponse_partenaire: text("reponse_partenaire"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_delegations_partenaire_statut").on(
      table.partenaire_id,
      table.statut
    ),
  ]
);

export type DemandeContact = typeof demandesContact.$inferSelect;
export type NewDemandeContact = typeof demandesContact.$inferInsert;
export type Patient = typeof patients.$inferSelect;
export type NewPatient = typeof patients.$inferInsert;
export type Visite = typeof visites.$inferSelect;
export type NewVisite = typeof visites.$inferInsert;
export type InfirmierPartenaire = typeof infirmiersPartenaires.$inferSelect;
export type NewInfirmierPartenaire =
  typeof infirmiersPartenaires.$inferInsert;
export type Delegation = typeof delegations.$inferSelect;
export type NewDelegation = typeof delegations.$inferInsert;
