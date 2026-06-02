"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALE_CODE: Record<string, string> = { fr: "FR", nl: "NL", en: "EN" };
const LOCALE_FULL: Record<string, string> = {
  fr: "Français",
  nl: "Nederlands",
  en: "English",
};

function useLocale() {
  const params = useParams();
  return (params.locale as string) || routing.defaultLocale;
}

/* ── Desktop dropdown ─────────────────────────────────────────── */
export function LanguageSwitcherDesktop() {
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  function switchLocale(next: string) {
    router.push(pathname, { locale: next });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("label")}
        className={cn(
          "flex items-center gap-1 rounded-lg px-2.5 py-1.5",
          "text-sm font-semibold text-slate-700 hover:text-primary",
          "bg-white/90 border border-slate-200 hover:bg-slate-50",
          "shadow-sm transition-colors outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        {LOCALE_CODE[locale] ?? locale.toUpperCase()}
        <ChevronDown className="w-3 h-3 opacity-60" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-36 rounded-xl border border-border bg-white shadow-lg p-1 z-[200]"
      >
        {routing.locales.map((loc) => {
          const active = loc === locale;
          return (
            <DropdownMenuItem
              key={loc}
              onSelect={() => switchLocale(loc)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm cursor-pointer",
                "transition-colors focus:bg-slate-50 hover:bg-slate-50",
                active ? "text-primary font-semibold" : "text-slate-700"
              )}
            >
              <Check
                className={cn(
                  "w-3.5 h-3.5 shrink-0 transition-opacity",
                  active ? "opacity-100 text-primary" : "opacity-0"
                )}
                aria-hidden="true"
              />
              {LOCALE_FULL[loc]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ── Mobile pills ─────────────────────────────────────────────── */
export function LanguageSwitcherMobile({
  onSwitch,
}: {
  onSwitch?: () => void;
}) {
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  function switchLocale(next: string) {
    router.push(pathname, { locale: next });
    onSwitch?.();
  }

  return (
    <div className="px-3 pb-3">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
        {t("label")}
      </p>
      <div className="flex gap-1.5" role="group" aria-label={t("label")}>
        {routing.locales.map((loc) => {
          const active = loc === locale;
          return (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              aria-pressed={active}
              className={cn(
                "flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800"
              )}
            >
              {LOCALE_CODE[loc]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
