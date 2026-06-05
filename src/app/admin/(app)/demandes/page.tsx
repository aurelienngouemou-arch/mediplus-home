import { db } from "@/db";
import { demandesContact } from "@/db/schema";
import { eq, count, desc, asc, and, gte, ilike, or } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { Phone, Mail, Eye, Inbox } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DemandeStatusBadge from "@/components/admin/DemandeStatusBadge";
import DemandeFilters from "@/components/admin/DemandeFilters";
import { DeleteDemandeButton } from "@/components/admin/DeleteDemandeButton";
import type { Metadata } from "next";
import type { SQL } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Demandes reçues — Admin | Mediplus Home",
  robots: { index: false },
};

const PAGE_SIZE = 20;

type SearchParams = Record<string, string | string[] | undefined>;

function getString(params: SearchParams, key: string): string {
  const val = params[key];
  return typeof val === "string" ? val : "";
}

function getPage(params: SearchParams): number {
  const p = parseInt(getString(params, "page"), 10);
  return isNaN(p) || p < 1 ? 1 : p;
}

function buildConditions(params: SearchParams): SQL | undefined {
  const conditions: SQL[] = [];
  const statut = getString(params, "statut");
  const commune = getString(params, "commune");
  const q = getString(params, "q");
  const periode = getString(params, "periode");

  if (statut) conditions.push(eq(demandesContact.statut, statut));
  if (commune) conditions.push(eq(demandesContact.commune, commune));

  if (q) {
    conditions.push(
      or(
        ilike(demandesContact.nom, `%${q}%`),
        ilike(demandesContact.email, `%${q}%`),
        ilike(demandesContact.telephone, `%${q}%`)
      )!
    );
  }

  if (periode === "aujourd_hui") {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    conditions.push(gte(demandesContact.created_at, today));
  } else if (periode === "7j") {
    conditions.push(
      gte(
        demandesContact.created_at,
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      )
    );
  } else if (periode === "30j") {
    conditions.push(
      gte(
        demandesContact.created_at,
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      )
    );
  }

  if (conditions.length === 0) return undefined;
  if (conditions.length === 1) return conditions[0];
  return and(...conditions);
}

function RelativeTime({ date }: { date: Date | null }) {
  if (!date) return <span>—</span>;
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 60) return <span>Il y a {minutes} min</span>;
  if (hours < 24) return <span>Il y a {hours}h</span>;
  return <span>Il y a {days}j</span>;
}

async function DemandesList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const page = getPage(searchParams);
  const tri = getString(searchParams, "tri");
  const where = buildConditions(searchParams);

  const [rows, totalResult] = await Promise.all([
    db
      .select()
      .from(demandesContact)
      .where(where)
      .orderBy(
        tri === "ancien"
          ? asc(demandesContact.created_at)
          : desc(demandesContact.created_at)
      )
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE),
    db.select({ value: count() }).from(demandesContact).where(where),
  ]);

  const total = Number(totalResult[0].value);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (rows.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Inbox className="h-10 w-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm font-medium">Aucune demande trouvée</p>
        <p className="text-xs mt-1">Essayez de modifier les filtres</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        {total} demande{total > 1 ? "s" : ""} · Page {page}/{totalPages}
      </p>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Statut</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Nom</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Commune</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Type</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Date</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {rows.map((d) => (
              <tr key={d.id} className="hover:bg-muted/30 transition-colors group">
                <td className="px-4 py-3">
                  <DemandeStatusBadge statut={d.statut ?? "nouveau"} />
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-foreground">{d.nom}</p>
                  <p className="text-xs text-muted-foreground">{d.email}</p>
                </td>
                <td className="px-4 py-3 text-foreground/80">{d.commune ?? "—"}</td>
                <td className="px-4 py-3 text-foreground/80 text-xs">{d.type_demande ?? "—"}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  <RelativeTime date={d.created_at} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={`tel:${d.telephone}`}
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="Appeler"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`mailto:${d.email}`}
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="Envoyer un email"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                    <Link
                      href={`/admin/demandes/${d.id}`}
                      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title="Voir le détail"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                    <DeleteDemandeButton id={d.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {rows.map((d) => (
          <Card key={d.id} className="border-border/50 hover:border-primary/30 transition-colors">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <Link href={`/admin/demandes/${d.id}`} className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.nom}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.telephone}</p>
                </Link>
                <div className="flex items-center gap-1 shrink-0">
                  <DemandeStatusBadge statut={d.statut ?? "nouveau"} />
                  <DeleteDemandeButton id={d.id} />
                </div>
              </div>
              <Link href={`/admin/demandes/${d.id}`} className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{d.commune ?? "—"}</span>
                <span>·</span>
                <span>{d.type_demande ?? "—"}</span>
                <span className="ml-auto">
                  <RelativeTime date={d.created_at} />
                </span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {page > 1 && (
            <Link
              href={`?page=${page - 1}`}
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
              href={`?page=${page + 1}`}
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

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-foreground">
            Demandes reçues
          </h1>
        </div>
        <button
          className="text-xs px-3 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          title="Export CSV — bientôt disponible"
          disabled
        >
          Exporter CSV
        </button>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardContent className="pt-4 pb-4">
          <Suspense fallback={<div className="h-20 animate-pulse bg-muted rounded-lg" />}>
            <DemandeFilters />
          </Suspense>
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
        <DemandesList searchParams={params} />
      </Suspense>
    </div>
  );
}
