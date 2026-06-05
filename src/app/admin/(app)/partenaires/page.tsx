import Link from "next/link";
import { Plus, Phone, Mail, Handshake, MapPin, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getPartenaires,
  getPartenairesStats,
} from "@/lib/actions/partenaires";
import { DeletePartenaireButton } from "@/components/admin/DeletePartenaireButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes collègues partenaires — Admin | Mediplus Home",
  robots: { index: false },
};

export default async function PartenairesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; zone?: string; statut?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const zone = params.zone ?? "";
  const sortParam = params.sort ?? "nom_az";
  const statutParam = params.statut ?? "";

  const actifFilter =
    statutParam === "actif"
      ? true
      : statutParam === "inactif"
        ? false
        : null;

  const [partenaires, stats] = await Promise.all([
    getPartenaires({
      search: search || undefined,
      zone: zone || undefined,
      actif: actifFilter,
      sort: sortParam === "recent" ? "recent" : "nom_az",
    }),
    getPartenairesStats(),
  ]);

  const statCards = [
    {
      label: "Partenaires actifs",
      value: stats.partenairesActifs,
      icon: Handshake,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Zones couvertes",
      value: stats.zonesCouvertes,
      icon: MapPin,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      label: "Délégations / mois",
      value: stats.delegationsMois,
      icon: Share2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Mes collègues partenaires
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {stats.partenairesActifs} infirmier{stats.partenairesActifs !== 1 ? "s" : ""} dans votre réseau
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/partenaires/nouveau">
            <Plus className="h-4 w-4 mr-1.5" />
            Ajouter un collègue
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {statCards.map((s) => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div className={`rounded-lg p-2 shrink-0 ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-foreground tabular-nums">{s.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight truncate">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtres */}
      <form method="GET" className="flex flex-wrap gap-3">
        <input
          name="search"
          defaultValue={search}
          placeholder="Rechercher…"
          className="flex h-9 min-w-[160px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <select
          name="zone"
          defaultValue={zone}
          className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Toutes les zones</option>
          <option value="Overijse">Overijse</option>
          <option value="Hoeilaart">Hoeilaart</option>
          <option value="Tervuren">Tervuren</option>
          <option value="Bruxelles">Bruxelles</option>
          <option value="Autre">Autre</option>
        </select>
        <select
          name="statut"
          defaultValue={statutParam}
          className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="">Tous les statuts</option>
          <option value="actif">Actifs</option>
          <option value="inactif">Inactifs</option>
        </select>
        <select
          name="sort"
          defaultValue={sortParam}
          className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="nom_az">Nom A-Z</option>
          <option value="recent">Plus récent</option>
        </select>
        <Button type="submit" variant="outline" size="sm" className="h-9">
          Filtrer
        </Button>
      </form>

      {/* Liste */}
      {partenaires.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Handshake className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">Aucun partenaire trouvé</p>
            <p className="text-sm mt-1">
              {search || zone || statutParam
                ? "Modifiez les filtres ou"
                : "Commencez par"}
              {" "}
              <Link href="/admin/partenaires/nouveau" className="text-primary hover:underline">
                ajouter un collègue
              </Link>
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nom</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Zones</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Téléphone</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Statut</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {partenaires.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/partenaires/${p.id}`}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {p.prenom} {p.nom}
                        {p.numero_inami && (
                          <span className="text-xs text-muted-foreground ml-2">
                            #{p.numero_inami}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <ZonesChips zones={p.zones_couvertes} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <a
                        href={`tel:${p.telephone}`}
                        className="hover:text-primary flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" />
                        {p.telephone}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                      <a
                        href={`mailto:${p.email}`}
                        className="hover:text-primary flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        {p.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          p.actif
                            ? "border-green-200 bg-green-50 text-green-700"
                            : "border-gray-200 bg-gray-50 text-gray-500"
                        }
                      >
                        {p.actif ? "Actif" : "Inactif"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={`tel:${p.telephone}`}
                          title="Appeler"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={`mailto:${p.email}`}
                          title="Email"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                        <Link
                          href={`/admin/partenaires/${p.id}/modifier`}
                          title="Modifier"
                          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground text-xs px-2"
                        >
                          Modifier
                        </Link>
                        <DeletePartenaireButton id={p.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {partenaires.map((p) => (
              <Card key={p.id} className="border-border/50">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/admin/partenaires/${p.id}`}
                      className="flex-1 min-w-0"
                    >
                      <p className="font-semibold text-foreground hover:text-primary transition-colors">
                        {p.prenom} {p.nom}
                      </p>
                      <ZonesChips zones={p.zones_couvertes} />
                    </Link>
                    <div className="flex items-center gap-1 shrink-0">
                      <Badge
                        variant="outline"
                        className={
                          p.actif
                            ? "border-green-200 bg-green-50 text-green-700 text-[10px]"
                            : "border-gray-200 bg-gray-50 text-gray-500 text-[10px]"
                        }
                      >
                        {p.actif ? "Actif" : "Inactif"}
                      </Badge>
                      <DeletePartenaireButton id={p.id} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <a href={`tel:${p.telephone}`} className="flex items-center gap-1 hover:text-primary">
                      <Phone className="h-3 w-3" /> {p.telephone}
                    </a>
                    <a href={`mailto:${p.email}`} className="flex items-center gap-1 hover:text-primary truncate max-w-[200px]">
                      <Mail className="h-3 w-3" /> {p.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ZonesChips({ zones }: { zones: string | null }) {
  if (!zones) return null;
  const list = zones.split(",").map((z) => z.trim()).filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1 mt-0.5">
      {list.map((z) => (
        <span
          key={z}
          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary"
        >
          {z}
        </span>
      ))}
    </div>
  );
}
