import { auth } from "@/auth";
import { db } from "@/db";
import { demandesContact, patients } from "@/db/schema";
import { eq, count, gte, and, desc } from "drizzle-orm";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { ArrowRight, Inbox, Clock, CheckCircle2, BarChart3, Users, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DemandeStatusBadge from "@/components/admin/DemandeStatusBadge";
import PatientAvatar from "@/components/admin/PatientAvatar";
import VisiteStatusBadge from "@/components/admin/tournee/VisiteStatusBadge";
import { getProchesVisites, getStatsVisites } from "@/lib/actions/visites";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tableau de bord — Admin | Mediplus Home",
  robots: { index: false },
};

async function getStats() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [nouveaux, enCours, traitesRecents, total, patientsActifs] =
    await Promise.all([
      db
        .select({ value: count() })
        .from(demandesContact)
        .where(eq(demandesContact.statut, "nouveau")),
      db
        .select({ value: count() })
        .from(demandesContact)
        .where(eq(demandesContact.statut, "en_cours")),
      db
        .select({ value: count() })
        .from(demandesContact)
        .where(
          and(
            eq(demandesContact.statut, "traite"),
            gte(demandesContact.created_at, sevenDaysAgo)
          )
        ),
      db.select({ value: count() }).from(demandesContact),
      db
        .select({ value: count() })
        .from(patients)
        .where(eq(patients.statut, "actif")),
    ]);

  return {
    nouveaux: Number(nouveaux[0].value),
    enCours: Number(enCours[0].value),
    traitesRecents: Number(traitesRecents[0].value),
    total: Number(total[0].value),
    patientsActifs: Number(patientsActifs[0].value),
  };
}

async function getRecentPatients() {
  return db
    .select()
    .from(patients)
    .where(eq(patients.statut, "actif"))
    .orderBy(desc(patients.created_at))
    .limit(5);
}

async function getRecentDemandes() {
  return db
    .select()
    .from(demandesContact)
    .orderBy(desc(demandesContact.created_at))
    .limit(5);
}

function RelativeTime({ date }: { date: Date | null }) {
  if (!date) return <span className="text-muted-foreground">—</span>;
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return <span>Il y a {minutes} min</span>;
  if (hours < 24) return <span>Il y a {hours}h</span>;
  return <span>Il y a {days}j</span>;
}

export default async function DashboardPage() {
  const session = await auth();
  const [stats, recentDemandes, recentPatients, prochesVisites, statsVisites] = await Promise.all([
    getStats(),
    getRecentDemandes(),
    getRecentPatients(),
    getProchesVisites(3),
    getStatsVisites(),
  ]);

  const today = format(new Date(), "EEEE d MMMM yyyy", { locale: fr });
  const prenom = session?.user?.prenom ?? "Infirmier";

  const statCards = [
    {
      label: "Nouvelles demandes",
      value: stats.nouveaux,
      icon: Inbox,
      color: "text-blue-600",
      bg: "bg-blue-50",
      href: "/admin/demandes?statut=nouveau",
    },
    {
      label: "En attente",
      value: stats.enCours,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      href: "/admin/demandes?statut=en_cours",
    },
    {
      label: "Traitées (7 jours)",
      value: stats.traitesRecents,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      href: "/admin/demandes",
    },
    {
      label: "Total demandes",
      value: stats.total,
      icon: BarChart3,
      color: "text-primary",
      bg: "bg-primary/10",
      href: "/admin/demandes",
    },
    {
      label: "Patients actifs",
      value: stats.patientsActifs,
      icon: Users,
      color: "text-teal-600",
      bg: "bg-teal-50",
      href: "/admin/patients",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-semibold text-foreground capitalize">
          Bonjour {prenom}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5 capitalize">{today}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="border-border/50 hover:border-primary/30 transition-colors cursor-pointer">
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground leading-tight mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground tabular-nums">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`rounded-lg p-2 shrink-0 ${stat.bg}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Tournée du jour */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            Aujourd'hui
          </CardTitle>
          <Link
            href="/admin/tournee"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Voir la tournée <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          {prochesVisites.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <CalendarDays className="h-7 w-7 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Aucune visite prévue aujourd'hui</p>
              <Link
                href="/admin/tournee"
                className="text-xs text-primary hover:underline mt-1 inline-block"
              >
                Planifier une visite →
              </Link>
            </div>
          ) : (
            <div className="space-y-0">
              {prochesVisites.map((v) => (
                <Link
                  key={v.id}
                  href="/admin/tournee"
                  className="flex items-center gap-3 py-3 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="shrink-0 w-10 text-center">
                    <p className="text-sm font-bold text-foreground tabular-nums">
                      {format(new Date(v.date_visite), "HH:mm")}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {v.patient_prenom} {v.patient_nom}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {v.patient_commune}
                      {v.acte_principal && ` · ${v.acte_principal}`}
                    </p>
                  </div>
                  <VisiteStatusBadge statut={v.statut} />
                </Link>
              ))}
            </div>
          )}
          {statsVisites.visitesAujourdhui > 3 && (
            <p className="text-xs text-muted-foreground mt-2 text-center">
              +{statsVisites.visitesAujourdhui - 3} autre{statsVisites.visitesAujourdhui - 3 > 1 ? "s" : ""} visite{statsVisites.visitesAujourdhui - 3 > 1 ? "s" : ""}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Patients récents */}
      {recentPatients.length > 0 && (
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">
              Patients récemment ajoutés
            </CardTitle>
            <Link
              href="/admin/patients"
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Voir tout <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-0">
              {recentPatients.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/patients/${p.id}`}
                  className="flex items-center gap-3 py-3 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <PatientAvatar nom={p.nom} prenom={p.prenom} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {p.prenom} {p.nom}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {p.commune} · {p.telephone}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    <RelativeTime date={p.created_at} />
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demandes récentes */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold">
            Demandes récentes
          </CardTitle>
          <Link
            href="/admin/demandes"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Voir tout <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          {recentDemandes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Inbox className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Aucune demande pour l'instant</p>
            </div>
          ) : (
            <div className="space-y-0">
              {recentDemandes.map((demande, i) => (
                <Link
                  key={demande.id}
                  href={`/admin/demandes/${demande.id}`}
                  className="flex items-center gap-3 py-3 hover:bg-muted/50 -mx-2 px-2 rounded-lg transition-colors group"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                    {demande.nom.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {demande.nom}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {demande.commune ?? "—"} · {demande.type_demande ?? "Soin"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <DemandeStatusBadge statut={demande.statut ?? "nouveau"} />
                    <span className="text-[10px] text-muted-foreground">
                      <RelativeTime date={demande.created_at} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
