import { notFound } from "next/navigation";
import Link from "next/link";
import { format, differenceInYears } from "date-fns";
import { fr } from "date-fns/locale";
import {
  ArrowLeft,
  MessageSquare,
  MapPin,
  CalendarDays,
  Pencil,
  AlertTriangle,
  ClipboardList,
  Clock,
  ExternalLink,
  ArchiveRestore,
} from "lucide-react";
import CopyableContact from "@/components/admin/CopyableContact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PatientStatusBadge from "@/components/admin/PatientStatusBadge";
import PatientAvatar from "@/components/admin/PatientAvatar";
import PlanSoinsActeForm from "@/components/admin/PlanSoinsActeForm";
import ActeActions from "@/components/admin/ActeActions";
import NouvelleVisiteForm from "@/components/admin/NouvelleVisiteForm";
import PatientActions from "@/components/admin/PatientActions";
import { getPatientById } from "@/lib/actions/patients";
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
      ? `${data.prenom} ${data.nom} — Patient | Admin Mediplus Home`
      : "Patient introuvable",
    robots: { index: false },
  };
}

function VisiteStatusBadge({ statut }: { statut: string }) {
  const config: Record<string, { label: string; className: string }> = {
    planifiee: { label: "Planifiée", className: "bg-blue-50 text-blue-700 border-blue-200" },
    en_cours: { label: "En cours", className: "bg-amber-50 text-amber-700 border-amber-200" },
    terminee: { label: "Terminée", className: "bg-green-50 text-green-700 border-green-200" },
    annulee: { label: "Annulée", className: "bg-red-50 text-red-700 border-red-200" },
    reportee: { label: "Reportée", className: "bg-gray-100 text-gray-600 border-gray-200" },
  };
  const conf = config[statut] ?? config.planifiee;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${conf.className}`}
    >
      {conf.label}
    </span>
  );
}

const MOMENT_LABELS: Record<string, string> = {
  matin: "Matin",
  midi: "Midi",
  soir: "Soir",
  nuit: "Nuit",
  variable: "Variable",
};

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPatientById(id);

  if (!data) notFound();

  const { actes, visites, ...patient } = data;

  const age = patient.date_naissance
    ? differenceInYears(new Date(), new Date(patient.date_naissance))
    : null;

  const waUrl = `https://wa.me/${patient.telephone.replace(/\D/g, "")}`;

  return (
    <div className="space-y-5">
      {/* Bandeau patient archivé */}
      {patient.statut === "archive" && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-amber-800">
            <ArchiveRestore className="h-4 w-4 shrink-0" />
            <span>Patient archivé — ses données sont conservées mais il n'apparaît plus dans la liste principale.</span>
          </div>
          <PatientActions
            patientId={id}
            patientName={`${patient.prenom} ${patient.nom}`}
            statut={patient.statut ?? "actif"}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/admin/patients"
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Retour"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-serif font-semibold text-foreground">
              {patient.prenom} {patient.nom}
            </h1>
            <PatientStatusBadge statut={patient.statut ?? "actif"} />
            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {patient.commune}
            </span>
          </div>
          {age !== null && (
            <p className="text-xs text-muted-foreground mt-0.5">{age} ans</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href={`/admin/patients/${id}/modifier`}>
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Modifier
            </Link>
          </Button>
          {patient.statut !== "archive" && (
            <PatientActions
              patientId={id}
              patientName={`${patient.prenom} ${patient.nom}`}
              statut={patient.statut ?? "actif"}
            />
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* ─── Colonne gauche ──────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Identité */}
          <Card className="border-border/50">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-center gap-4 mb-4">
                <PatientAvatar nom={patient.nom} prenom={patient.prenom} size="lg" />
                <div>
                  <p className="font-semibold text-foreground">
                    {patient.prenom} {patient.nom}
                  </p>
                  {patient.date_naissance && (
                    <p className="text-sm text-muted-foreground">
                      Né(e) le{" "}
                      {format(new Date(patient.date_naissance), "d MMMM yyyy", {
                        locale: fr,
                      })}{" "}
                      ({age} ans)
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p>{patient.adresse}</p>
                    <p className="text-muted-foreground">
                      {patient.code_postal} {patient.commune}
                    </p>
                    {patient.code_porte && (
                      <p className="text-xs text-muted-foreground">
                        Code : {patient.code_porte}
                      </p>
                    )}
                  </div>
                </div>
                <CopyableContact type="tel" value={patient.telephone} />
                {patient.email && (
                  <CopyableContact type="email" value={patient.email} />
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex flex-wrap items-center gap-3">
                <CopyableContact
                  type="tel"
                  value={patient.telephone}
                  label="Appeler"
                  className="text-sm"
                />
                {patient.email && (
                  <CopyableContact
                    type="email"
                    value={patient.email}
                    label="Email"
                    className="text-sm"
                  />
                )}
                <Button asChild size="sm" variant="outline">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Infos médicales */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Informations complémentaires
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 text-sm">
              {(patient.mutuelle || patient.numero_mutuelle) && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Mutuelle</p>
                  <p className="font-medium">
                    {patient.mutuelle ?? "—"}
                    {patient.numero_mutuelle && (
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        · n° {patient.numero_mutuelle}
                      </span>
                    )}
                  </p>
                </div>
              )}
              {patient.allergies && (
                <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-amber-800 mb-0.5">
                      Allergies
                    </p>
                    <p className="text-xs text-amber-700">{patient.allergies}</p>
                  </div>
                </div>
              )}
              {patient.notes && (
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Notes</p>
                  <p className="text-sm whitespace-pre-wrap text-foreground/80">
                    {patient.notes}
                  </p>
                </div>
              )}
              {!patient.mutuelle && !patient.allergies && !patient.notes && (
                <p className="text-sm text-muted-foreground italic">
                  Aucune information complémentaire
                </p>
              )}
            </CardContent>
          </Card>

          {/* Infos admin */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Informations admin
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-xs text-muted-foreground space-y-1.5">
              <p>
                Ajouté le{" "}
                {patient.created_at
                  ? format(new Date(patient.created_at), "d MMMM yyyy", {
                      locale: fr,
                    })
                  : "—"}
              </p>
              {patient.demande_origine_id ? (
                <div className="flex items-center gap-1.5">
                  <p>Converti depuis une demande</p>
                  <Link
                    href={`/admin/demandes/${patient.demande_origine_id}`}
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Voir la demande
                  </Link>
                </div>
              ) : (
                <p>Patient ajouté manuellement</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ─── Colonne droite ──────────────────────────────── */}
        <div className="lg:col-span-3 space-y-4">
          {/* Plan de soins */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                Plan de soins
                {actes.length > 0 && (
                  <span className="bg-primary/10 text-primary text-[11px] px-1.5 py-0.5 rounded-full font-medium">
                    {actes.filter(a => a.actif).length} acte{actes.filter(a => a.actif).length > 1 ? "s" : ""} actif{actes.filter(a => a.actif).length > 1 ? "s" : ""}
                  </span>
                )}
              </CardTitle>
              <PlanSoinsActeForm patientId={id} />
            </CardHeader>
            <CardContent className="pt-0">
              {actes.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucun acte planifié</p>
                  <p className="text-xs mt-1">
                    Ajoutez les soins réguliers de ce patient
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {actes.map((acte) => (
                    <div
                      key={acte.id}
                      className={`py-3 flex items-start justify-between gap-3 ${!acte.actif ? "opacity-50" : ""}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={`text-sm font-medium ${acte.actif ? "text-foreground" : "text-muted-foreground line-through"}`}>
                            {acte.acte}
                          </p>
                          {!acte.actif && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 font-medium">
                              Inactif
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted-foreground">
                          <span>{acte.frequence}</span>
                          {acte.duree_minutes && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {acte.duree_minutes} min
                            </span>
                          )}
                          {acte.moment_journee && (
                            <span>
                              {MOMENT_LABELS[acte.moment_journee] ?? acte.moment_journee}
                            </span>
                          )}
                        </div>
                        {acte.notes && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {acte.notes}
                          </p>
                        )}
                      </div>
                      <ActeActions acte={acte} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Historique visites */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Historique des visites
              </CardTitle>
              <NouvelleVisiteForm
                patientId={id}
                actesSuggeres={actes.filter((a) => a.actif).map((a) => a.acte)}
              />
            </CardHeader>
            <CardContent className="pt-0">
              {visites.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucune visite enregistrée</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {visites.map((v) => (
                    <div key={v.id} className="py-3 flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium">
                            {format(new Date(v.date_visite), "d MMM yyyy", {
                              locale: fr,
                            })}
                          </p>
                          <VisiteStatusBadge statut={v.statut ?? "planifiee"} />
                        </div>
                        {v.acte_principal && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {v.acte_principal}
                            {v.duree_minutes && ` · ${v.duree_minutes} min`}
                          </p>
                        )}
                        {v.transmissions && (
                          <p className="text-xs text-foreground/60 mt-1 line-clamp-2">
                            {v.transmissions}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
