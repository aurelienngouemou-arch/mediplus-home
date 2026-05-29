import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getPartenaireById } from "@/lib/actions/partenaires";
import PartenaireForm from "@/components/admin/partenaires/PartenaireForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modifier le partenaire — Admin | Mediplus Home",
  robots: { index: false },
};

export default async function ModifierPartenairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPartenaireById(id);

  if (!data) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link
          href={`/admin/partenaires/${id}`}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour au profil
        </Link>
        <h1 className="text-2xl font-serif font-semibold text-foreground">
          Modifier {data.partenaire.prenom} {data.partenaire.nom}
        </h1>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <PartenaireForm partenaire={data.partenaire} />
      </div>
    </div>
  );
}
