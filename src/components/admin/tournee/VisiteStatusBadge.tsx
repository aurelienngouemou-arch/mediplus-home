const STATUT_CONFIG: Record<string, { label: string; className: string }> = {
  planifiee: {
    label: "Planifiée",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  en_cours: {
    label: "En cours",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  terminee: {
    label: "Terminée",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  annulee: {
    label: "Annulée",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  deleguee: {
    label: "Déléguée",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
};

export default function VisiteStatusBadge({ statut }: { statut: string }) {
  const conf = STATUT_CONFIG[statut] ?? STATUT_CONFIG.planifiee;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${conf.className}`}
    >
      {conf.label}
    </span>
  );
}
