"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  Download,
  Share2,
  MoreVertical,
  Plus,
  ExternalLink,
  CheckCircle2,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

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

type Step = "login" | "install";

// ─── Saved credentials (base64 encoded, localStorage) ────────────────────────

const CREDS_KEY = "saved_credentials";

interface SavedCreds {
  email: string;
  password: string;
}

function loadSavedCredentials(): SavedCreds | null {
  try {
    const raw = localStorage.getItem(CREDS_KEY);
    if (!raw) return null;
    return JSON.parse(atob(raw)) as SavedCreds;
  } catch {
    return null;
  }
}

function persistCredentials(email: string, password: string) {
  try {
    localStorage.setItem(CREDS_KEY, btoa(JSON.stringify({ email, password })));
  } catch {}
}

function clearCredentials() {
  localStorage.removeItem(CREDS_KEY);
}

// ─── Platform detection ──────────────────────────────────────────────────────

function detect(): Platform {
  if (typeof navigator === "undefined") return "loading";

  const ua = navigator.userAgent;
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as { standalone?: boolean }).standalone === true);

  if (isStandalone) return "already-installed";

  const isIOS = /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) return /CriOS|FxiOS|EdgiOS/.test(ua) ? "ios-other" : "ios-safari";
  if (isAndroid)
    return /Firefox/.test(ua) && !/Chrome/.test(ua)
      ? "android-firefox"
      : "android-chrome";

  return "desktop";
}

// ─── Root component ──────────────────────────────────────────────────────────

export default function InstallClient({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [step, setStep] = useState<Step>(isAuthenticated ? "install" : "login");
  const [platform, setPlatform] = useState<Platform>("loading");
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A4D68] to-[#088395] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* App header */}
        <div className="bg-[#0A4D68] px-6 pt-8 pb-6 text-center text-white">
          <div className="mx-auto mb-4 h-20 w-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-4xl font-bold font-serif shadow-lg">
            M
          </div>
          <h1 className="text-xl font-bold font-serif">Mediplus Home</h1>
          <p className="text-sm text-white/70 mt-1">Dashboard infirmier</p>
        </div>

        {/* Step tabs — only shown when login is required */}
        {!isAuthenticated && (
          <div className="flex border-b border-gray-100">
            <div
              className={`flex-1 py-2.5 text-xs font-medium text-center transition-colors ${
                step === "login"
                  ? "text-[#0A4D68] border-b-2 border-[#0A4D68]"
                  : "text-gray-400"
              }`}
            >
              1. Connexion
            </div>
            <div
              className={`flex-1 py-2.5 text-xs font-medium text-center transition-colors ${
                step === "install"
                  ? "text-[#0A4D68] border-b-2 border-[#0A4D68]"
                  : "text-gray-400"
              }`}
            >
              2. Installation
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6 space-y-5">
          {step === "login" ? (
            <LoginStep onSuccess={() => setStep("install")} />
          ) : (
            <>
              {platform === "loading" && (
                <div className="h-40 animate-pulse bg-gray-100 rounded-xl" />
              )}
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
            </>
          )}
        </div>

        {step === "install" && platform !== "already-installed" && (
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

// ─── Login step ──────────────────────────────────────────────────────────────

function LoginStep({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = loadSavedCredentials();
    if (saved) {
      setEmail(saved.email);
      setPassword(saved.password);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect.");
        if (!rememberMe) clearCredentials();
      } else {
        if (rememberMe) {
          persistCredentials(email, password);
        } else {
          clearCredentials();
        }
        onSuccess();
      }
    } catch {
      setError("Erreur de connexion. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="text-center mb-1">
        <p className="font-semibold text-gray-900">Connectez-vous d'abord</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Pour installer l'application sur cet appareil
        </p>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label
          htmlFor="install-email"
          className="text-xs font-medium text-gray-700"
        >
          Adresse e-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="install-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="infirmier@exemple.be"
            required
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]/20 focus:border-[#0A4D68] transition-colors"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label
          htmlFor="install-password"
          className="text-xs font-medium text-gray-700"
        >
          Mot de passe
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            id="install-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="••••••••"
            required
            className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A4D68]/20 focus:border-[#0A4D68] transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Remember me */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 accent-[#0A4D68]"
        />
        <span className="text-xs text-gray-600">Se souvenir de moi</span>
      </label>

      {/* Error */}
      {error && (
        <p
          role="alert"
          className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !email || !password}
        className="w-full flex items-center justify-center gap-2 bg-[#0A4D68] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#088395] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connexion…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" />
            Se connecter
          </>
        )}
      </button>
    </form>
  );
}

// ─── Install step components ─────────────────────────────────────────────────

function AlreadyInstalled() {
  return (
    <div className="text-center py-4 space-y-3">
      <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
      <div>
        <p className="font-semibold text-gray-900">Application déjà installée</p>
        <p className="text-sm text-gray-500 mt-1">
          Ouvrez Mediplus Home depuis votre écran d'accueil.
        </p>
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
        <p className="text-sm text-gray-500">
          Retrouvez l'app sur votre écran d'accueil.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="font-semibold text-gray-900">Installer sur votre téléphone</p>
        <p className="text-sm text-gray-500 mt-1">
          Accédez au dashboard même sans connexion.
        </p>
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
        <p className="text-sm text-gray-500 mt-1">
          Suivez ces étapes pour installer l'app.
        </p>
      </div>
      <Step
        n={1}
        icon={<MoreVertical className="h-4 w-4" />}
        text="Appuyez sur les 3 points ⋮ en bas de l'écran"
      />
      <Step n={2} text={`"Installer"`} />
      <Step
        n={3}
        text={`Confirmez et l'icône apparaît sur votre écran d'accueil`}
      />
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
        <p className="font-semibold text-gray-900">
          Installation sur iPhone / iPad
        </p>
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
        <p className="font-semibold text-gray-900">
          Ouvrez ce lien sur votre téléphone
        </p>
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
        Android : Chrome ou Samsung Internet
        <br />
        iPhone : Safari
      </p>
    </div>
  );
}

// ─── Shared step component ───────────────────────────────────────────────────

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
