"use client";

import { useState } from "react";
import { Phone, Mail, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyableContactProps {
  type: "tel" | "email";
  value: string;
  /** Label affiché sur le bouton mobile (défaut: "Appeler" / "Email") */
  label?: string;
  className?: string;
}

/**
 * Desktop : affiche la valeur en clair + bouton Copier.
 * Mobile  : lien natif tel: / mailto: qui ouvre l'app.
 */
export default function CopyableContact({
  type,
  value,
  label,
  className,
}: CopyableContactProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("input");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    toast.success(type === "tel" ? "Numéro copié !" : "Email copié !");
    setTimeout(() => setCopied(false), 2000);
  }

  const Icon = type === "tel" ? Phone : Mail;
  const href = type === "tel" ? `tel:${value}` : `mailto:${value}`;
  const mobileLabel = label ?? (type === "tel" ? "Appeler" : "Email");

  return (
    <>
      {/* ─── Desktop : valeur + bouton copier ─────────────── */}
      <div className={cn("hidden md:flex items-center gap-2 text-sm text-foreground", className)}>
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{value}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="ml-0.5 p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0"
          title={type === "tel" ? "Copier le numéro" : "Copier l'adresse email"}
          aria-label={type === "tel" ? "Copier le numéro" : "Copier l'adresse email"}
        >
          {copied
            ? <Check className="h-3.5 w-3.5 text-green-600" />
            : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* ─── Mobile : lien natif ───────────────────────────── */}
      <a
        href={href}
        className={cn(
          "md:hidden flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors",
          className
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {mobileLabel}
      </a>
    </>
  );
}
