import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PatientForm from "@/components/admin/PatientForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nouveau patient — Admin | Mediplus Home",
  robots: { index: false },
};

export default function NouveauPatientPage() {
  return (
    <div className="max-w-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/patients"
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Retour à la liste"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Nouveau patient
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Remplissez les informations pour ajouter un patient
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <PatientForm mode="create" />
      </div>
    </div>
  );
}
