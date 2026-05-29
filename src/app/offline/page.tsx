import type { Metadata } from "next";
import OfflineReloadButton from "./OfflineReloadButton";

export const metadata: Metadata = {
  title: "Hors ligne — Mediplus Home",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-6 text-center">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <svg
          className="h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
        Pas de connexion
      </h1>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Vous êtes hors ligne. Certaines fonctionnalités sont limitées.
        Vérifiez votre connexion internet et réessayez.
      </p>
      <OfflineReloadButton />
    </div>
  );
}
