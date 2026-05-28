"use client";

import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight, CalendarDays, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import VisiteCard from "@/components/admin/tournee/VisiteCard";
import VisiteForm from "@/components/admin/tournee/VisiteForm";
import type { VisiteAvecPatient, PatientSelectItem } from "@/lib/actions/visites";

interface TourneeJourProps {
  visites: VisiteAvecPatient[];
  dateStr: string;
  today: string;
  patientsActifs: PatientSelectItem[];
}

export default function TourneeJour({
  visites,
  dateStr,
  today,
  patientsActifs,
}: TourneeJourProps) {
  const router = useRouter();
  const currentDate = new Date(`${dateStr}T12:00:00Z`);
  const isToday = dateStr === today;

  function navigate(offset: number) {
    const next = addDays(currentDate, offset);
    router.push(`/admin/tournee?vue=jour&date=${next.toISOString().slice(0, 10)}`);
  }

  const dateLabel = format(currentDate, "EEEE d MMMM yyyy", { locale: fr });
  const totalDuree = visites.reduce((acc, v) => acc + (v.duree_minutes ?? 0), 0);
  const visitesActives = visites.filter((v) => v.statut !== "annulee");

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Jour précédent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div>
              <p className="font-semibold text-sm text-foreground capitalize">{dateLabel}</p>
              {isToday && (
                <span className="text-[10px] text-primary font-medium">Aujourd'hui</span>
              )}
            </div>
            <button
              onClick={() => navigate(1)}
              className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Jour suivant"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            {!isToday && (
              <button
                onClick={() => router.push(`/admin/tournee?vue=jour&date=${today}`)}
                className="text-xs text-primary hover:underline ml-1"
              >
                Aujourd'hui
              </button>
            )}
          </div>
          <VisiteForm
            patientsActifs={patientsActifs}
            initialDate={dateStr}
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
        {visites.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">Aucune visite prévue</p>
            <p className="text-xs mt-1 mb-4">
              {isToday ? "Votre journée est libre" : "Pas de visite ce jour-là"}
            </p>
            <VisiteForm
              patientsActifs={patientsActifs}
              initialDate={dateStr}
              trigger={
                <Button size="sm" variant="outline">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Ajouter la première visite
                </Button>
              }
            />
          </div>
        ) : (
          <div className="space-y-3">
            {visites.map((v) => (
              <VisiteCard key={v.id} visite={v} patientsActifs={patientsActifs} />
            ))}
          </div>
        )}

        {visites.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {visitesActives.length} visite{visitesActives.length > 1 ? "s" : ""} prévue{visitesActives.length > 1 ? "s" : ""}
            </span>
            {totalDuree > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {totalDuree} min estimées
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
