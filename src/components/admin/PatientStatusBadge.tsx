import { cn } from "@/lib/utils";

const config = {
  actif: {
    label: "Actif",
    className: "bg-green-100 text-green-800 border-green-200",
  },
  inactif: {
    label: "Inactif",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  archive: {
    label: "Archivé",
    className: "bg-red-50 text-red-700 border-red-200",
  },
} as const;

type Statut = keyof typeof config;

export default function PatientStatusBadge({ statut }: { statut: string }) {
  const conf = config[statut as Statut] ?? config.inactif;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
        conf.className
      )}
    >
      {conf.label}
    </span>
  );
}
