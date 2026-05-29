import { db } from "@/db";
import { demandesContact } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import {
  MessageSquare,
  ArrowLeft,
  MapPin,
  Calendar,
  Shield,
  ExternalLink,
} from "lucide-react";
import CopyableContact from "@/components/admin/CopyableContact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DemandeStatusBadge from "@/components/admin/DemandeStatusBadge";
import DemandeStatusSelector from "@/components/admin/DemandeStatusSelector";
import DemandeNotes from "@/components/admin/DemandeNotes";
import ConvertDemandeModal from "@/components/admin/ConvertDemandeModal";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const [demande] = await db
    .select({ nom: demandesContact.nom })
    .from(demandesContact)
    .where(eq(demandesContact.id, id))
    .limit(1);

  return {
    title: demande ? `${demande.nom} — Demande | Admin Mediplus Home` : "Demande introuvable",
    robots: { index: false },
  };
}

export default async function DemandeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [demande] = await db
    .select()
    .from(demandesContact)
    .where(eq(demandesContact.id, id))
    .limit(1);

  if (!demande) notFound();

  const createdAt = demande.created_at
    ? format(new Date(demande.created_at), "d MMMM yyyy à HH:mm", { locale: fr })
    : "—";

  const updatedAt = demande.updated_at
    ? format(new Date(demande.updated_at), "d MMMM yyyy à HH:mm", { locale: fr })
    : "—";

  const waUrl = `https://wa.me/${demande.telephone.replace(/\D/g, "")}`;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/demandes"
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Retour à la liste"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-serif font-semibold text-foreground truncate">
              {demande.nom}
            </h1>
            <DemandeStatusBadge statut={demande.statut ?? "nouveau"} />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Reçue le {createdAt}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* ─── Colonne gauche (infos patient) ─────────────────── */}
        <div className="lg:col-span-3 space-y-4">
          {/* Coordonnées */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
                  {demande.nom.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{demande.nom}</span>
              </div>

              <div className="space-y-2 pl-0">
                <CopyableContact type="tel" value={demande.telephone} />
                <CopyableContact type="email" value={demande.email} />
                {demande.commune && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span>{demande.commune}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Actions rapides */}
              <div className="flex flex-wrap items-center gap-3">
                <CopyableContact
                  type="tel"
                  value={demande.telephone}
                  label="Appeler"
                  className="text-sm"
                />
                <CopyableContact
                  type="email"
                  value={demande.email}
                  label="Email"
                  className="text-sm"
                />
                <Button asChild size="sm" variant="outline">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Détails de la demande */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Détails de la demande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {demande.type_demande && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type de soin demandé</p>
                  <p className="text-sm font-medium">{demande.type_demande}</p>
                </div>
              )}

              {demande.message && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1.5">
                    <MessageSquare className="h-3 w-3" />
                    Message
                  </p>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed bg-muted/40 rounded-lg p-3">
                    {demande.message}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Reçue le
                  </p>
                  <p className="font-medium">{createdAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Mise à jour</p>
                  <p className="font-medium">{updatedAt}</p>
                </div>
                {demande.ip_adresse && (
                  <div>
                    <p className="text-muted-foreground mb-1">IP source</p>
                    <p className="font-mono">{demande.ip_adresse}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground mb-1 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Consentement RGPD
                  </p>
                  <p className="font-medium text-green-700">
                    {demande.rgpd_consent ? "✓ Accepté" : "✗ Non"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ─── Colonne droite (actions admin) ──────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Statut */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Gestion du statut</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <DemandeStatusSelector
                id={demande.id}
                currentStatut={demande.statut ?? "nouveau"}
              />
              <p className="text-[10px] text-muted-foreground">
                Le changement est sauvegardé immédiatement.
              </p>
            </CardContent>
          </Card>

          {/* Notes internes */}
          <Card className="border-border/50">
            <CardContent className="pt-4">
              <DemandeNotes
                id={demande.id}
                initialNotes={demande.notes_internes}
              />
            </CardContent>
          </Card>

          {/* Convertir en patient */}
          {demande.statut !== "traite" && demande.statut !== "archive" && (
            <Card className="border-border/50">
              <CardContent className="pt-4 pb-4">
                <ConvertDemandeModal
                  demande={{
                    id: demande.id,
                    nom: demande.nom,
                    telephone: demande.telephone,
                    email: demande.email,
                    commune: demande.commune,
                    created_at: demande.created_at,
                  }}
                />
                <p className="text-[10px] text-muted-foreground text-center mt-2">
                  Crée la fiche patient et marque la demande comme traitée
                </p>
              </CardContent>
            </Card>
          )}

          {/* Historique */}
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Historique
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p>
                    Demande reçue le {createdAt}
                  </p>
                </div>
                {demande.updated_at &&
                  demande.created_at &&
                  demande.updated_at > demande.created_at && (
                    <div className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <p>Modifiée le {updatedAt}</p>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
