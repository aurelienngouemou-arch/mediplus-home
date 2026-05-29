import { Suspense } from "react";
import Link from "next/link";
import { Plus, Users, TrendingUp, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PatientStatusBadge from "@/components/admin/PatientStatusBadge";
import PatientAvatar from "@/components/admin/PatientAvatar";
import {
  getPatients,
  getPatientsActifsCount,
  getNouveauxPatientsCeMois,
  getPatientsParCommune,
} from "@/lib/actions/patients";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes patients — Admin | Mediplus Home",
  robots: { index: false },
};

type SearchParams = Record<string, string | string[] | undefined>;

function getString(params: SearchParams, key: string): string {
  const val = params[key];
  return typeof val === "string" ? val : "";
}

function getPage(params: SearchParams): number {
  const p = parseInt(getString(params, "page"), 10);
  return isNaN(p) || p < 1 ? 1 : p;
}

async function StatsCards() {
  const [actifs, nouveaux, parCommune] = await Promise.all([
    getPatientsActifsCount(),
    getNouveauxPatientsCeMois(),
    getPatientsParCommune(),
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="border-border/50">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Patients actifs</p>
              <p className="text-3xl font-bold text-foreground tabular-nums">{actifs}</p>
            </div>
            <div className="rounded-lg p-2 bg-blue-50">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Nouveaux ce mois</p>
              <p className="text-3xl font-bold text-foreground tabular-nums">{nouveaux}</p>
            </div>
            <div className="rounded-lg p-2 bg-green-50">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground mb-2">Top communes</p>
              <div className="space-y-0.5">
                {parCommune.length === 0 ? (
                  <p className="text-sm text-muted-foreground">—</p>
                ) : (
                  parCommune.map((c) => (
                    <p key={c.commune} className="text-sm font-medium truncate">
                      {c.commune}{" "}
                      <span className="text-muted-foreground font-normal">
                        ({c.count})
                      </span>
                    </p>
                  ))
                )}
              </div>
            </div>
            <div className="rounded-lg p-2 bg-primary/10">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

async function PatientsList({ searchParams }: { searchParams: SearchParams }) {
  const page = getPage(searchParams);
  const q = getString(searchParams, "q");
  const statut = getString(searchParams, "statut") || "actif";
  const commune = getString(searchParams, "commune");
  const tri = getString(searchParams, "tri");

  const { patients, total, totalPages } = await getPatients({
    q,
    statut: statut === "tous" ? undefined : statut,
    commune: commune || undefined,
    tri,
    page,
  });

  if (patients.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm font-medium">Aucun patient trouvé</p>
        <p className="text-xs mt-1">
          {q ? "Essayez de modifier votre recherche" : "Ajoutez votre premier patient"}
        </p>
        {!q && (
          <Button asChild size="sm" className="mt-4">
            <Link href="/admin/patients/nouveau">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Ajouter un patient
            </Link>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        {total} patient{total > 1 ? "s" : ""} · Page {page}/{totalPages}
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Patient
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Commune
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Téléphone
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Statut
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {patients.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-muted/30 transition-colors group"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <PatientAvatar nom={p.nom} prenom={p.prenom} size="sm" />
                    <div>
                      <p className="font-medium text-foreground">
                        {p.prenom} {p.nom}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.email ?? "—"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground/80">{p.commune}</td>
                <td className="px-4 py-3">
                  {/* CORRECTION : suppression de onClick */}
                  <a href={`tel:${p.telephone}`} className="text-primary hover:underline">
                    {p.telephone}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <PatientStatusBadge statut={p.statut ?? "actif"} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`tel:${p.telephone}`}
                      className="px-2 py-1 rounded text-xs border border-border hover:bg-muted transition-colors"
                      title="Appeler"
                    >
                      📞
                    </a>
                    <Link
                      href={`/admin/patients/${p.id}/modifier`}
                      className="px-2 py-1 rounded text-xs border border-border hover:bg-muted transition-colors"
                      title="Modifier"
                    >
                      ✏️
                    </Link>
                    <Link
                      href={`/admin/patients/${p.id}`}
                      className="px-2 py-1 rounded text-xs bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      Voir
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2.5">
        {patients.map((p) => (
          <Link key={p.id} href={`/admin/patients/${p.id}`}>
            <Card className="border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <PatientAvatar nom={p.nom} prenom={p.prenom} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {p.prenom} {p.nom}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.commune} · {p.telephone}
                    </p>
                  </div>
                  <PatientStatusBadge statut={p.statut ?? "actif"} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {page > 1 && (
            <Link
              href={`?page=${page - 1}&q=${q}&statut=${statut}&commune=${commune}&tri=${tri}`}
              className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-muted transition-colors"
            >
              ← Précédent
            </Link>
          )}
          <span className="text-xs text-muted-foreground">
            {page} / {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`?page=${page + 1}&q=${q}&statut=${statut}&commune=${commune}&tri=${tri}`}
              className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-muted transition-colors"
            >
              Suivant →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function PatientFilters({ searchParams }: { searchParams: SearchParams }) {
  const q = getString(searchParams, "q");
  const statut = getString(searchParams, "statut") || "actif";
  const commune = getString(searchParams, "commune");
  const tri = getString(searchParams, "tri");

  return (
    <form method="GET" className="flex flex-wrap gap-3 items-end">
      <div className="flex-1 min-w-[180px]">
        <label htmlFor="q" className="text-xs text-muted-foreground block mb-1">
          Rechercher
        </label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="Nom, prénom, téléphone…"
          className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      <div>
        <label
          htmlFor="statut"
          className="text-xs text-muted-foreground block mb-1"
        >
          Statut
        </label>
        <select
          id="statut"
          name="statut"
          defaultValue={statut}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="archive">Archivé</option>
          <option value="tous">Tous</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="commune"
          className="text-xs text-muted-foreground block mb-1"
        >
          Commune
        </label>
        <select
          id="commune"
          name="commune"
          defaultValue={commune}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Toutes</option>
          <option value="Overijse">Overijse</option>
          <option value="Hoeilaart">Hoeilaart</option>
          <option value="Tervuren">Tervuren</option>
          <option value="Autre">Autre</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="tri"
          className="text-xs text-muted-foreground block mb-1"
        >
          Trier par
        </label>
        <select
          id="tri"
          name="tri"
          defaultValue={tri}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Plus récent</option>
          <option value="alpha_asc">Nom A→Z</option>
          <option value="alpha_desc">Nom Z→A</option>
          <option value="ancien">Plus ancien</option>
        </select>
      </div>
      <button
        type="submit"
        className="h-9 px-4 rounded-md bg-primary text-white text-sm hover:bg-primary/90 transition-colors"
      >
        Filtrer
      </button>
    </form>
  );
}

export default async function PatientsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const actifs = await getPatientsActifsCount();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Mes patients
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {actifs} patient{actifs > 1 ? "s" : ""} suivi{actifs > 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/admin/patients/nouveau">
            <Plus className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">Ajouter un patient</span>
            <span className="sm:hidden">Nouveau</span>
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 animate-pulse bg-muted rounded-xl" />
            ))}
          </div>
        }
      >
        <StatsCards />
      </Suspense>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="pt-4 pb-4">
          <PatientFilters searchParams={params} />
        </CardContent>
      </Card>

      {/* List */}
      <Suspense
        fallback={
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse bg-muted rounded-xl" />
            ))}
          </div>
        }
      >
        <PatientsList searchParams={params} />
      </Suspense>
    </div>
  );
}