"use client";

import { useState, useRef, useTransition } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { updateDemandeNotes } from "@/app/admin/(app)/demandes/actions";
import { Loader2, Check } from "lucide-react";

export default function DemandeNotes({
  id,
  initialNotes,
}: {
  id: string;
  initialNotes: string | null;
}) {
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    setNotes(value);
    setSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        try {
          await updateDemandeNotes(id, value);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        } catch {
          toast.error("Erreur lors de la sauvegarde des notes");
        }
      });
    }, 800);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-foreground">Notes internes</label>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
          {isPending ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Sauvegarde…
            </>
          ) : saved ? (
            <>
              <Check className="h-3 w-3 text-green-600" />
              Sauvegardé
            </>
          ) : (
            "Auto-sauvegarde"
          )}
        </span>
      </div>
      <Textarea
        value={notes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Notes visibles uniquement par l'équipe…"
        className="min-h-[120px] text-sm resize-none"
        aria-label="Notes internes sur cette demande"
      />
    </div>
  );
}
