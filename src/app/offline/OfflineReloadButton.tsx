"use client";

export default function OfflineReloadButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      Réessayer
    </button>
  );
}
