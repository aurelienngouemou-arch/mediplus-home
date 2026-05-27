import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PatientForm from "@/components/admin/PatientForm";
import { getPatientById } from "@/lib/actions/patients";
import type { Patient } from "@/db/schema";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getPatientById(id);
  return {
    title: data
      ? `Modifier ${data.prenom} ${data.nom} — Admin | Mediplus Home`
      : "Patient introuvable",
    robots: { index: false },
  };
}

export default async function ModifierPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPatientById(id);

  if (!data) notFound();

  const patient: Patient = {
    id: data.id,
    nom: data.nom,
    prenom: data.prenom,
    telephone: data.telephone,
    email: data.email,
    adresse: data.adresse,
    code_postal: data.code_postal,
    commune: data.commune,
    code_porte: data.code_porte,
    date_naissance: data.date_naissance,
    mutuelle: data.mutuelle,
    numero_mutuelle: data.numero_mutuelle,
    allergies: data.allergies,
    notes: data.notes,
    statut: data.statut,
    demande_origine_id: data.demande_origine_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href={`/admin/patients/${id}`}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Retour à la fiche"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Modifier le patient
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {patient.prenom} {patient.nom}
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <PatientForm mode="edit" patient={patient} />
      </div>
    </div>
  );
}
