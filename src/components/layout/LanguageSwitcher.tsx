"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const LOCALE_LABELS: Record<string, string> = {
  fr: "FR",
  nl: "NL",
  en: "EN",
};

const LOCALE_FULL: Record<string, string> = {
  fr: "Français",
  nl: "Nederlands",
  en: "English",
};

export default function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || routing.defaultLocale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(next: string) {
    router.push(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
      >
        <Globe className="w-3.5 h-3.5" aria-hidden="true" />
        <span>{LOCALE_LABELS[locale] ?? locale.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-border bg-white shadow-lg z-50 overflow-hidden py-1">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-slate-50",
                loc === locale
                  ? "text-primary font-medium"
                  : "text-slate-700"
              )}
            >
              <span className="w-6 text-xs font-semibold text-muted-foreground">
                {LOCALE_LABELS[loc]}
              </span>
              <span>{LOCALE_FULL[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
