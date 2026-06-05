"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteDemande } from "@/app/admin/(app)/demandes/actions";

export function DeleteDemandeButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Supprimer définitivement cette demande ?")) return;
    const res = await deleteDemande(id);
    if ("error" in res && res.error) toast.error(res.error);
    else toast.success("Demande supprimée");
  }

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 rounded hover:bg-red-50 transition-colors text-muted-foreground hover:text-destructive"
      title="Supprimer"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}
