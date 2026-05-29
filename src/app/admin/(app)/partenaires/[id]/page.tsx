import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ChevronLeft,
  MessageCircle,
  MapPin,
  Pencil,
  Share2,
} from "lucide-react";
import CopyableContact from "@/components/admin/CopyableContact";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPartenaireById } from "@/lib/actions/partenaires";
import { getDelegationsByPartenaire } from "@/lib/actions/delegations";
import PartenaireToggleActif from "@/components/admin/partenaires/PartenaireToggleActif";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Détail partenaire — Admin | Mediplus Home",
  robots: { index: false },
};

const STATUT_DELEGATION: Record<string, { label: string; className: string }> = {
  envoyee: { label: "Envoyée", className: "border-blue-200 bg-blue-50 text-blue-700" },
  acceptee: { label: "Acceptée", className: "border-green-200 bg-green-50 text-green-700" },
  refusee: { label: "Refusée", className: "border-red-200 bg-red-50 text-red-700" },
  completee: { label: "Complétée", className: "border-gray-200 bg-gray-50 text-gray-600" },
};

export default async function PartenaireDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [data, historiqueDelegations] = await Promise.all([
    getPartenaireById(id),
    getDelegationsByPartenaire(id),
  ]);

  if (!data) notFound();

  const { partenaire } = data;
  const initiales = `${partenaire.prenom.charAt(0)}${partenaire.nom.charAt(0)}`.toUpperCase();
  const zones = partenaire.zones_couvertes
    ? partenaire.zones_couvertes.split(",").map((z) => z.trim()).filter(Boolean)
    : [];

  const waUrl = `https://wa.me/${partenaire.telephone.replace(/[\s+]/g, "").replace(/^0/, "32")}`;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb + actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/partenaires"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Mes collègues
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/partenaires/${id}/modifier`}>
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Modifier
            </Link>
          </Button>
          <PartenaireToggleActif id={id} actif={partenaire.actif ?? true} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne gauche — profil */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-border/50">
            <CardContent className="pt-6 pb-5 space-y-4">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-2">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                  {initiales}
                </div>
                <div className="text-center">
                  <h1 className="text-lg font-semibold text-foreground">
                    {partenaire.prenom} {partenaire.nom}
                  </h1>
                  <Badge
                    variant="outline"
                    className={
                      partenaire.actif
                        ? "border-green-200 bg-green-50 text-green-700 mt-1"
                        : "border-gray-200 bg-gray-50 text-gray-500 mt-1"
                    }
                  >
                    {partenaire.actif ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="space-y-2.5 pt-2 border-t border-border">
                <CopyableContact type="tel" value={partenaire.telephone} />
                <CopyableContact type="email" value={partenaire.email} />
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-foreground hover:text-green-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-muted-foreground" />
                  WhatsApp
                </a>
              </div>

              {/* INAMI */}
              {partenaire.numero_inami && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">N° INAMI</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">
                    {partenaire.numero_inami}
                  </p>
                </div>
              )}

              {/* Zones */}
              {zones.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Zones couvertes</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {zones.map((z) => (
                      <span
                        key={z}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                      >
                        {z}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Spécialités */}
              {partenaire.specialites && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Spécialités</p>
                  <p className="text-sm text-foreground">{partenaire.specialites}</p>
                </div>
              )}

              {/* Notes */}
              {partenaire.notes && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Notes internes</p>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">
                    {partenaire.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite — historique délégations */}
        <div className="lg:col-span-2">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Share2 className="h-4 w-4 text-purple-600" />
                Historique des délégations
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {historiqueDelegations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Share2 className="h-7 w-7 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucune délégation encore envoyée à ce partenaire</p>
                </div>
              ) : (
                <div className="space-y-0 divide-y divide-border">
                  {historiqueDelegations.map((d) => {
                    const conf = STATUT_DELEGATION[d.statut ?? "envoyee"] ?? STATUT_DELEGATION.envoyee;
                    return (
                      <div key={d.id} className="py-3 flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {d.patient_prenom} {d.patient_nom}
                          </p>
                          {d.acte_principal && (
                            <p className="text-xs text-muted-foreground">{d.acte_principal}</p>
                          )}
                          {d.date_visite_prevue && (
                            <p className="text-xs text-muted-foreground">
                              {format(new Date(d.date_visite_prevue), "d MMM yyyy", { locale: fr })}
                            </p>
                          )}
                          {d.motif && (
                            <p className="text-xs text-foreground/60 mt-0.5">{d.motif}</p>
                          )}
                        </div>
                        <Badge variant="outline" className={`shrink-0 text-[10px] ${conf.className}`}>
                          {conf.label}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
