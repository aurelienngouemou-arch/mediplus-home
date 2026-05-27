"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const STATUTS = [
  { value: "", label: "Tous" },
  { value: "nouveau", label: "Nouveau" },
  { value: "en_cours", label: "En cours" },
  { value: "traite", label: "Traité" },
  { value: "archive", label: "Archivé" },
  { value: "spam", label: "Spam" },
];

const COMMUNES = [
  { value: "", label: "Toutes communes" },
  { value: "Overijse", label: "Overijse" },
  { value: "Hoeilaart", label: "Hoeilaart" },
  { value: "Tervuren", label: "Tervuren" },
  { value: "Autre", label: "Autre" },
];

const PERIODES = [
  { value: "", label: "Tout" },
  { value: "aujourd_hui", label: "Aujourd'hui" },
  { value: "7j", label: "7 jours" },
  { value: "30j", label: "30 jours" },
];

export default function DemandeFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams]
  );

  const current = (key: string) => searchParams.get(key) ?? "";

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        {isPending ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          placeholder="Rechercher par nom, email, téléphone…"
          className="pl-9"
          defaultValue={current("q")}
          onChange={(e) => {
            const val = e.target.value;
            clearTimeout((window as Window & { _searchTimeout?: ReturnType<typeof setTimeout> })._searchTimeout);
            (window as Window & { _searchTimeout?: ReturnType<typeof setTimeout> })._searchTimeout = setTimeout(() => update("q", val), 400);
          }}
        />
      </div>

      {/* Pill filters */}
      <div className="flex flex-wrap gap-4">
        {/* Statut */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par statut">
          {STATUTS.map((s) => (
            <button
              key={s.value}
              onClick={() => update("statut", s.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                current("statut") === s.value
                  ? "bg-primary text-white border-primary"
                  : "bg-card text-foreground/70 border-border hover:bg-muted"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Commune */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par commune">
          {COMMUNES.map((c) => (
            <button
              key={c.value}
              onClick={() => update("commune", c.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                current("commune") === c.value
                  ? "bg-secondary text-white border-secondary"
                  : "bg-card text-foreground/70 border-border hover:bg-muted"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Période */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrer par période">
          {PERIODES.map((p) => (
            <button
              key={p.value}
              onClick={() => update("periode", p.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                current("periode") === p.value
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card text-foreground/70 border-border hover:bg-muted"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
