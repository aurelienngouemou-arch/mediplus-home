"use client";

import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VisiteStatusBadge from "@/components/admin/tournee/VisiteStatusBadge";
import VisiteForm from "@/components/admin/tournee/VisiteForm";
import type { VisiteAvecPatient, PatientSelectItem } from "@/lib/actions/visites";
import { cn } from "@/lib/utils";

interface JourSemaine {
  date: string;
  visites: VisiteAvecPatient[];
}

interface TourneeSemaineProps {
  semaine: JourSemaine[];
  mondayStr: string;
  today: string;
  patientsActifs: PatientSelectItem[];
}

const JOURS_COURTS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function TourneeSemaine({
  semaine,
  mondayStr,
  today,
  patientsActifs,
}: TourneeSemaineProps) {
  const router = useRouter();
  const monday = new Date(`${mondayStr}T12:00:00Z`);
  const sunday = addDays(monday, 6);
  const isCurrentWeek = semaine.some((j) => j.date === today);

  const rangeLabel = `${format(monday, "d", { locale: fr })}–${format(sunday, "d MMMM yyyy", { locale: fr })}`;

  function navigate(weeks: number) {
    const next = addDays(monday, weeks * 7);
    router.push(`/admin/tournee?vue=semaine&date=${next.toISOString().slice(0, 10)}`);
  }

  function goToDay(dateStr: string) {
    router.push(`/admin/tournee?vue=jour&date=${dateStr}`);
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Semaine précédente"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div>
              <p className="font-semibold text-sm text-foreground capitalize">
                {rangeLabel}
              </p>
              {isCurrentWeek && (
                <span className="text-[10px] text-primary font-medium">Cette semaine</span>
              )}
            </div>
            <button
              onClick={() => navigate(1)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Semaine suivante"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            {!isCurrentWeek && (
              <button
                onClick={() => {
                  const now = new Date();
                  const day = now.getUTCDay() || 7;
                  const mon = new Date(now);
                  mon.setUTCDate(now.getUTCDate() - day + 1);
                  router.push(`/admin/tournee?vue=semaine&date=${mon.toISOString().slice(0, 10)}`);
                }}
                className="text-xs text-primary hover:underline ml-1"
              >
                Cette semaine
              </button>
            )}
          </div>
          <VisiteForm
            patientsActifs={patientsActifs}
            trigger={
              <Button size="sm">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Nouvelle visite
              </Button>
            }
          />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-7 gap-2">
          {semaine.map((jour, i) => {
            const isToday = jour.date === today;
            const isWeekend = i >= 5;
            const visitesList = jour.visites;

            return (
              <div
                key={jour.date}
                className={cn(
                  "rounded-lg border p-2 min-h-[120px]",
                  isToday
                    ? "border-primary/50 bg-primary/5"
                    : isWeekend
                      ? "border-border/40 bg-muted/20"
                      : visitesList.length > 0
                        ? "border-border bg-card"
                        : "border-border/40 bg-card"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={() => goToDay(jour.date)}
                    className={cn(
                      "text-xs font-medium hover:underline",
                      isToday ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {JOURS_COURTS[i]} {format(new Date(`${jour.date}T12:00:00Z`), "d")}
                  </button>
                  {visitesList.length > 0 && (
                    <span className="text-[10px] font-medium text-primary bg-primary/10 px-1 rounded">
                      {visitesList.length}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {visitesList.slice(0, 3).map((v) => (
                    <div
                      key={v.id}
                      className="text-[11px] leading-tight p-1 rounded bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                      onClick={() => goToDay(jour.date)}
                    >
                      <p className="font-medium text-foreground/80">
                        {format(new Date(v.date_visite), "HH:mm")} {v.patient_prenom} {v.patient_nom.charAt(0)}.
                      </p>
                      {v.acte_principal && (
                        <p className="text-muted-foreground truncate">{v.acte_principal}</p>
                      )}
                    </div>
                  ))}
                  {visitesList.length > 3 && (
                    <button
                      onClick={() => goToDay(jour.date)}
                      className="text-[10px] text-primary hover:underline w-full text-left"
                    >
                      +{visitesList.length - 3} autre{visitesList.length - 3 > 1 ? "s" : ""}
                    </button>
                  )}
                </div>
                {visitesList.length === 0 && (
                  <p className="text-[10px] text-muted-foreground/50 italic mt-2">
                    Aucune visite
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile list */}
        <div className="md:hidden space-y-2">
          {semaine.map((jour, i) => {
            const isToday = jour.date === today;
            const isWeekend = i >= 5;

            return (
              <div
                key={jour.date}
                className={cn(
                  "rounded-lg border overflow-hidden",
                  isToday ? "border-primary/50" : isWeekend ? "border-border/40" : "border-border"
                )}
              >
                <button
                  onClick={() => goToDay(jour.date)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-left",
                    isToday ? "bg-primary/5" : isWeekend ? "bg-muted/20" : "bg-card"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-medium capitalize",
                      isToday ? "text-primary" : "text-foreground"
                    )}
                  >
                    {JOURS_COURTS[i]}{" "}
                    {format(new Date(`${jour.date}T12:00:00Z`), "d MMMM")}
                  </span>
                  <div className="flex items-center gap-2">
                    {jour.visites.length > 0 ? (
                      <span className="text-xs font-medium text-primary">
                        {jour.visites.length} visite{jour.visites.length > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">Libre</span>
                    )}
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </button>
                {jour.visites.length > 0 && (
                  <div className="px-3 py-2 space-y-1 border-t border-border/50">
                    {jour.visites.slice(0, 2).map((v) => (
                      <div key={v.id} className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground w-10 shrink-0 tabular-nums">
                          {format(new Date(v.date_visite), "HH:mm")}
                        </span>
                        <span className="font-medium text-foreground truncate">
                          {v.patient_prenom} {v.patient_nom}
                        </span>
                        <VisiteStatusBadge statut={v.statut} />
                      </div>
                    ))}
                    {jour.visites.length > 2 && (
                      <button
                        onClick={() => goToDay(jour.date)}
                        className="text-[11px] text-primary hover:underline"
                      >
                        Voir tout ({jour.visites.length} visites)
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {semaine.every((j) => j.visites.length === 0) && (
          <div className="text-center py-8 text-muted-foreground mt-4">
            <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Aucune visite cette semaine</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
