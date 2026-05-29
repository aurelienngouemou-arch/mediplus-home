"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { togglePartenaireActif } from "@/lib/actions/partenaires";

export default function PartenaireToggleActif({
  id,
  actif,
}: {
  id: string;
  actif: boolean;
}) {
  const [currentActif, setCurrentActif] = useState(actif);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const res = await togglePartenaireActif(id);
    setLoading(false);

    if ("error" in res && res.error) {
      toast.error(res.error);
      return;
    }

    const newActif = "newActif" in res ? (res.newActif ?? !currentActif) : !currentActif;
    setCurrentActif(newActif);
    toast.success(newActif ? "Partenaire activé" : "Partenaire désactivé");
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
      className={
        currentActif
          ? "text-orange-600 border-orange-200 hover:bg-orange-50"
          : "text-green-600 border-green-200 hover:bg-green-50"
      }
    >
      {loading ? "…" : currentActif ? "Désactiver" : "Activer"}
    </Button>
  );
}
