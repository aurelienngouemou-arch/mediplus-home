"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDemandeStatus } from "@/app/admin/(app)/demandes/actions";

const STATUTS = [
  { value: "nouveau", label: "Nouveau" },
  { value: "en_cours", label: "En cours" },
  { value: "traite", label: "Traité" },
  { value: "archive", label: "Archivé" },
  { value: "spam", label: "Spam" },
];

export default function DemandeStatusSelector({
  id,
  currentStatut,
}: {
  id: string;
  currentStatut: string;
}) {
  const [statut, setStatut] = useState(currentStatut);
  const [isPending, startTransition] = useTransition();

  const handleChange = (newStatut: string) => {
    const previous = statut;
    setStatut(newStatut);
    startTransition(async () => {
      try {
        await updateDemandeStatus(id, newStatut);
        toast.success("Statut mis à jour");
      } catch {
        setStatut(previous);
        toast.error("Erreur lors de la mise à jour");
      }
    });
  };

  return (
    <Select value={statut} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choisir un statut" />
      </SelectTrigger>
      <SelectContent>
        {STATUTS.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
