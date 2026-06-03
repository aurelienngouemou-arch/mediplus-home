"use client";

import { useState, useEffect } from "react";
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

// Shared button appearance — identical between placeholder and live trigger
const BTN_CLS =
  "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 shadow-sm";

function useLocale() {
  const params = useParams();
  return (params.locale as string) || routing.defaultLocale;
}

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  // Guard: Radix DropdownMenu uses useId() + a Portal targeting document.body.
  // Both differ between SSR and client, causing hydration mismatch.
  // We render an identical static placeholder on SSR and client-before-mount,
  // then swap in the real interactive component after useEffect fires.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function switchLocale(next: string) {
    router.push(pathname, { locale: next });
  }

  if (!mounted) {
    // Must produce exactly the same HTML server-side and client-side.
    // Use routing.defaultLocale so the value is static and never undefined.
    return (
      <div
        className={cn(BTN_CLS, "cursor-default select-none")}
        aria-hidden="true"
      >
        {LOCALE_CODE[routing.defaultLocale] ?? "FR"}
        <ChevronDown className="w-3 h-3 opacity-60" aria-hidden="true" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t("label")}
        className={cn(
          BTN_CLS,
          "group outline-none transition-colors",
          "hover:bg-slate-50 hover:text-primary",
          "data-[state=open]:bg-slate-50 data-[state=open]:text-primary",
          "focus-visible:ring-2 focus-visible:ring-ring"
        )}
      >
        {LOCALE_CODE[locale] ?? locale.toUpperCase()}
        <ChevronDown
          className="w-3 h-3 opacity-60 transition-transform group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
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

// Alias kept for backwards compatibility
export { LanguageSwitcher as LanguageSwitcherDesktop };
