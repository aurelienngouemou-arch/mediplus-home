"use client";

import { useState } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Pencil, Power, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlanSoinsActeForm from "@/components/admin/PlanSoinsActeForm";
import {
  toggleActePlanSoinsActif,
  deleteActePlanSoins,
} from "@/lib/actions/patients";
import type { ActePlanSoins } from "@/db/schema";

interface ActeActionsProps {
  acte: ActePlanSoins;
}

export default function ActeActions({ acte }: ActeActionsProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<"toggle" | "delete" | null>(null);

  async function handleToggle() {
    setLoading("toggle");
    const result = await toggleActePlanSoinsActif(acte.id);
    if ("error" in result && result.error) toast.error(result.error);
    else
      toast.success(acte.actif ? "Acte désactivé" : "Acte réactivé");
    setLoading(null);
  }

  async function handleDelete() {
    if (!confirm("Supprimer cet acte définitivement ?")) return;
    setLoading("delete");
    const result = await deleteActePlanSoins(acte.id);
    if ("error" in result && result.error) toast.error(result.error);
    else toast.success("Acte supprimé");
    setLoading(null);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground"
        aria-label="Actions"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-7 z-20 bg-card border border-border rounded-lg shadow-lg p-1 min-w-[140px]">
            <PlanSoinsActeForm
              patientId={acte.patient_id}
              acte={acte}
              trigger={
                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded hover:bg-muted transition-colors">
                  <Pencil className="h-3.5 w-3.5" />
                  Modifier
                </button>
              }
              onDone={() => setOpen(false)}
            />
            <button
              onClick={handleToggle}
              disabled={loading === "toggle"}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded hover:bg-muted transition-colors"
            >
              <Power className="h-3.5 w-3.5" />
              {acte.actif ? "Désactiver" : "Réactiver"}
            </button>
            <button
              onClick={handleDelete}
              disabled={loading === "delete"}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm rounded hover:bg-red-50 text-destructive transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Supprimer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
