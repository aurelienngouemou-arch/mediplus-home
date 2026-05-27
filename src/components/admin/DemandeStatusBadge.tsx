import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
  string,
  { label: string; className: string }
> = {
  nouveau: {
    label: "Nouveau",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200",
  },
  en_cours: {
    label: "En cours",
    className: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200",
  },
  traite: {
    label: "Traité",
    className: "bg-green-100 text-green-800 hover:bg-green-100 border-green-200",
  },
  archive: {
    label: "Archivé",
    className: "bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200",
  },
  spam: {
    label: "Spam",
    className: "bg-red-100 text-red-800 hover:bg-red-100 border-red-200",
  },
};

export default function DemandeStatusBadge({ statut }: { statut: string }) {
  const config = STATUS_CONFIG[statut] ?? STATUS_CONFIG["nouveau"];
  return (
    <Badge
      variant="outline"
      className={cn("text-[10px] font-medium px-2 py-0.5 h-5", config.className)}
    >
      {config.label}
    </Badge>
  );
}

export { STATUS_CONFIG };
