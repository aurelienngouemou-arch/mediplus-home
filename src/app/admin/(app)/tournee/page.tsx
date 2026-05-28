import type { ComponentType } from "react";
import { CalendarDays, Clock, CheckCircle2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  getVisitesJour,
  getVisitesSemaine,
  getStatsVisites,
  getAllPatientsActifs,
} from "@/lib/actions/visites";
import TourneeJour from "@/components/admin/tournee/TourneeJour";
import TourneeSemaine from "@/components/admin/tournee/TourneeSemaine";
import TourneeViewToggle from "@/components/admin/tournee/TourneeViewToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ma tournée — Admin | Mediplus Home",
  robots: { index: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

function getString(params: SearchParams, key: string, fallback: string): string {
  const val = params[key];
  return typeof val === "string" ? val : fallback;
}

function getTodayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function getMondayStr(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - day + 1);
  return d.toISOString().slice(0, 10);
}

export default async function TourneePage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await searchParamsPromise;
  const today = getTodayStr();
  const vue = getString(searchParams, "vue", "jour");
  const dateParam = getString(searchParams, "date", today);
  const isJour = vue !== "semaine";
  const dateStr = isJour ? dateParam : getMondayStr(dateParam);

  const [stats, patientsActifs] = await Promise.all([
    getStatsVisites(),
    getAllPatientsActifs(),
  ]);

  const visitesJour = isJour ? await getVisitesJour(dateStr) : null;
  const visitesSemaine = !isJour ? await getVisitesSemaine(dateStr) : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">Ma tournée</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gérez votre planning de visites
          </p>
        </div>
        <TourneeViewToggle currentVue={vue} currentDate={dateStr} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Visites aujourd'hui"
          value={stats.visitesAujourdhui}
          Icon={CalendarDays}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          label="Visites cette semaine"
          value={stats.visitesSemaine}
          Icon={Clock}
          color="text-amber-600"
          bg="bg-amber-50"
        />
        <StatCard
          label="Terminées (semaine)"
          value={stats.visitesTerminees}
          Icon={CheckCircle2}
          color="text-green-600"
          bg="bg-green-50"
        />
        <StatCard
          label="Patients vus (semaine)"
          value={stats.patientsVus}
          Icon={Users}
          color="text-primary"
          bg="bg-primary/10"
        />
      </div>

      {isJour && visitesJour !== null && (
        <TourneeJour
          visites={visitesJour}
          dateStr={dateStr}
          today={today}
          patientsActifs={patientsActifs}
        />
      )}
      {!isJour && visitesSemaine !== null && (
        <TourneeSemaine
          semaine={visitesSemaine}
          mondayStr={dateStr}
          today={today}
          patientsActifs={patientsActifs}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  Icon,
  color,
  bg,
}: {
  label: string;
  value: number;
  Icon: ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}) {
  return (
    <Card className="border-border/50">
      <CardContent className="pt-4 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground leading-tight mb-1.5">{label}</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
          </div>
          <div className={`rounded-lg p-1.5 shrink-0 ${bg}`}>
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
