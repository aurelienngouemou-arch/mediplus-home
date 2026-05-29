import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import PartenaireForm from "@/components/admin/partenaires/PartenaireForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ajouter un collègue — Admin | Mediplus Home",
  robots: { index: false },
};

export default function NouveauPartenairePage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href="/admin/partenaires"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux collègues
        </Link>
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Ajouter un collègue partenaire
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Ajoutez un infirmier à votre réseau de partenaires
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <PartenaireForm />
      </div>
    </div>
  );
}
