"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STORAGE_KEY = "pwa-install-dismissed";

function isIOS() {
  return (
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !("MSStream" in window)
  );
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    if (isIOS()) {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      if (!isStandalone) {
        setShowIOSGuide(true);
        setShowBanner(true);
      }
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setShowBanner(false);
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(STORAGE_KEY, "1");
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  }

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:max-w-sm md:bottom-4 md:left-4 md:right-auto">
      <div className="bg-card border border-border rounded-xl shadow-lg p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-base font-serif shrink-0">
              M
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Mediplus Home</p>
              <p className="text-xs text-muted-foreground">
                Installez l'app pour un accès rapide
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground shrink-0"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {showIOSGuide ? (
          <div className="text-xs text-muted-foreground space-y-1.5 bg-muted/50 rounded-lg p-3">
            <p className="font-medium text-foreground">Installation sur iOS :</p>
            <p>1. Appuyez sur l'icône de partage dans Safari</p>
            <p>2. Choisissez "Sur l'écran d'accueil"</p>
            <p>3. Appuyez sur "Ajouter"</p>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleInstall} className="flex-1">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Installer
            </Button>
            <Button size="sm" variant="outline" onClick={handleDismiss}>
              Plus tard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
