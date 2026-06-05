"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Share2, MoreVertical, Plus, ExternalLink, CheckCircle2, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Platform =
  | "ios-safari"
  | "ios-other"
  | "android-chrome"
  | "android-firefox"
  | "desktop"
  | "already-installed"
  | "loading";

function detect(): Platform {
  if (typeof navigator === "undefined") return "loading";

  const ua = navigator.userAgent;
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true);

  if (isStandalone) return "already-installed";

  const isIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    const isCriOS = /CriOS/.test(ua);
    const isFxiOS = /FxiOS/.test(ua);
    const isEdgiOS = /EdgiOS/.test(ua);
    return isCriOS || isFxiOS || isEdgiOS ? "ios-other" : "ios-safari";
  }

  if (isAndroid) {
    const isFirefox = /Firefox/.test(ua) && !/Chrome/.test(ua);
    return isFirefox ? "android-firefox" : "android-chrome";
  }

  return "desktop";
}

export default function InstallClient() {
  const [platform, setPlatform] = useState<Platform>("loading");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setPlatform(detect());

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
  }

  if (platform === "loading") return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A4D68] to-[#088395] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A4D68] px-6 pt-8 pb-6 text-center text-white">
          <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-bold font-serif shadow-lg">
            M
          </div>
          <h1 className="text-xl font-bold font-serif">Mediplus Home</h1>
          <p className="text-sm text-white/70 mt-1">Dashboard infirmier</p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-5">
          {platform === "already-installed" && <AlreadyInstalled />}
          {platform === "android-chrome" && (
            <AndroidChrome
              deferredPrompt={deferredPrompt}
              installed={installed}
              onInstall={handleInstall}
            />
          )}
          {platform === "android-firefox" && <AndroidFirefox />}
          {platform === "ios-safari" && <IOSSafari />}
          {platform === "ios-other" && <IOSOther />}
          {platform === "desktop" && <Desktop />}
        </div>

        {platform !== "already-installed" && (
          <div className="border-t border-gray-100 px-6 py-4 text-center">
            <Link
              href="/admin/dashboard"
              className="text-sm text-[#0A4D68] hover:underline flex items-center justify-center gap-1.5"
            >
              Accéder au dashboard directement
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>

      <p className="mt-6 text-white/50 text-xs text-center">
        mediplus-home.vercel.app/fr/installer
      </p>
    </div>
  );
}

function AlreadyInstalled() {
  return (
    <div className="text-center py-4 space-y-3">
      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
      <div>
        <p className="font-semibold text-gray-900">Application déjà installée</p>
        <p className="text-sm text-gray-500 mt-1">Ouvrez Mediplus Home depuis votre écran d'accueil.</p>
      </div>
      <Link
        href="/admin/dashboard"
        className="block w-full bg-[#0A4D68] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#088395] transition-colors text-center"
      >
        Ouvrir le dashboard
      </Link>
    </div>
  );
}

function AndroidChrome({
  deferredPrompt,
  installed,
  onInstall,
}: {
  deferredPrompt: BeforeInstallPromptEvent | null;
  installed: boolean;
  onInstall: () => void;
}) {
  if (installed) {
    return (
      <div className="text-center space-y-3 py-2">
        <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
        <p className="font-semibold text-gray-900">Installé avec succès !</p>
        <p className="text-sm text-gray-500">Retrouvez l'app sur votre écran d'accueil.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="font-semibold text-gray-900">Installer sur votre téléphone</p>
        <p className="text-sm text-gray-500 mt-1">Accédez au dashboard même sans connexion.</p>
      </div>

      {deferredPrompt ? (
        <button
          onClick={onInstall}
          className="w-full flex items-center justify-center gap-2 bg-[#0A4D68] text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#088395] transition-colors"
        >
          <Download className="h-4 w-4" />
          Installer Mediplus Home
        </button>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            Installez via le menu de votre navigateur si le bouton n'apparaît pas.
          </p>
          <Step n={1} text="Appuyez sur les 3 points ⋮ en haut à droite" />
          <Step n={2} text={`"Ajouter à l'écran d'accueil"`} />
          <Step n={3} text={`Confirmez en appuyant sur "Ajouter"`} />
        </div>
      )}
    </div>
  );
}

function AndroidFirefox() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="font-semibold text-gray-900">Installation — Firefox</p>
        <p className="text-sm text-gray-500 mt-1">Suivez ces étapes pour installer l'app.</p>
      </div>
      <Step n={1} icon={<MoreVertical className="h-4 w-4" />} text="Appuyez sur les 3 points ⋮ en bas de l'écran" />
      <Step n={2} text={`"Installer"`} />
      <Step n={3} text={`Confirmez et l'icône apparaît sur votre écran d'accueil`} />
      <p className="text-xs text-gray-400 text-center pt-1">
        💡 Chrome donne une meilleure expérience d'installation
      </p>
    </div>
  );
}

function IOSSafari() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="font-semibold text-gray-900">Installation sur iPhone / iPad</p>
        <p className="text-sm text-gray-500 mt-1">3 étapes dans Safari :</p>
      </div>
      <Step
        n={1}
        icon={<Share2 className="h-4 w-4 text-blue-500" />}
        text="Appuyez sur le bouton Partager"
        sub="(icône en bas de l'écran ou en haut sur iPad)"
      />
      <Step
        n={2}
        icon={<Plus className="h-4 w-4 text-blue-500" />}
        text={`"Sur l'écran d'accueil"`}
        sub="Faites défiler vers le bas si nécessaire"
      />
      <Step
        n={3}
        icon={<Download className="h-4 w-4 text-blue-500" />}
        text={`Appuyez sur "Ajouter"`}
        sub="L'icône Mediplus apparaît sur votre accueil"
      />
    </div>
  );
}

function IOSOther() {
  return (
    <div className="space-y-4 text-center">
      <Smartphone className="h-12 w-12 text-amber-500 mx-auto" />
      <div>
        <p className="font-semibold text-gray-900">Ouvrez ce lien dans Safari</p>
        <p className="text-sm text-gray-500 mt-1">
          L'installation sur iPhone n'est possible que depuis Safari.
        </p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <p className="text-xs font-mono text-gray-600 break-all select-all">
          mediplus-home.vercel.app/fr/installer
        </p>
      </div>
      <Step n={1} text="Copiez le lien ci-dessus" />
      <Step n={2} text="Ouvrez Safari et collez-le" />
      <Step n={3} text="Suivez les instructions qui s'affichent" />
    </div>
  );
}

function Desktop() {
  return (
    <div className="space-y-4 text-center">
      <Smartphone className="h-12 w-12 text-[#0A4D68] mx-auto" />
      <div>
        <p className="font-semibold text-gray-900">Ouvrez ce lien sur votre téléphone</p>
        <p className="text-sm text-gray-500 mt-1">
          Scannez ou tapez l'adresse sur votre mobile.
        </p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
        <p className="text-xs font-mono text-gray-600 select-all">
          mediplus-home.vercel.app/fr/installer
        </p>
      </div>
      <p className="text-xs text-gray-400">
        Android : Chrome ou Samsung Internet<br />
        iPhone : Safari
      </p>
    </div>
  );
}

function Step({
  n,
  text,
  sub,
  icon,
}: {
  n: number;
  text: string;
  sub?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 h-7 w-7 rounded-full bg-[#0A4D68] text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {n}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {icon}
          <p className="text-sm font-medium text-gray-800">{text}</p>
        </div>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
