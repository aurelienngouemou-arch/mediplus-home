"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deletePartenaire } from "@/lib/actions/partenaires";

export function DeletePartenaireButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm("Supprimer ce collègue ? Cette action est irréversible.")) return;
    const res = await deletePartenaire(id);
    if ("error" in res && res.error) toast.error(res.error);
    else if (res.archived)
      toast.info("Collègue archivé (délégations existantes conservées)");
    else toast.success("Collègue supprimé");
  }

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-destructive"
      title="Supprimer"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}
