"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { toast } from "sonner";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createVisite } from "@/lib/actions/patients";

const visiteSchema = z.object({
  date_visite: z.string().min(1, "La date est requise"),
  duree_minutes: z.number().int().min(5).max(480).optional(),
  acte_principal: z.string().max(120).optional(),
  transmissions: z.string().max(5000).optional(),
});

type VisiteInput = z.input<typeof visiteSchema>;

interface NouvelleVisiteFormProps {
  patientId: string;
  actesSuggeres?: string[];
}

export default function NouvelleVisiteForm({
  patientId,
  actesSuggeres = [],
}: NouvelleVisiteFormProps) {
  const [open, setOpen] = useState(false);

  const localNow = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<VisiteInput>({
      resolver: zodResolver(visiteSchema),
      defaultValues: { date_visite: localNow() },
    });

  async function onSubmit(data: VisiteInput) {
    const result = await createVisite(patientId, {
      date_visite: data.date_visite,
      duree_minutes: data.duree_minutes as number | undefined,
      acte_principal: data.acte_principal,
      transmissions: data.transmissions,
    });
    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Visite planifiée");
    setOpen(false);
    reset({ date_visite: localNow() });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <CalendarPlus className="h-3.5 w-3.5 mr-1.5" />
          Planifier une visite
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Planifier une visite</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="date_visite">
              Date et heure <span className="text-destructive">*</span>
            </Label>
            <Input
              id="date_visite"
              type="datetime-local"
              {...register("date_visite")}
            />
            {errors.date_visite && (
              <p className="text-xs text-destructive">{errors.date_visite.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="duree_visite">Durée (min)</Label>
              <Input
                id="duree_visite"
                type="number"
                min={5}
                max={480}
                step={5}
                placeholder="30"
                {...register("duree_minutes", {
                  setValueAs: (v: string) => (v === "" ? undefined : parseInt(v, 10)),
                })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acte_principal">Acte principal</Label>
              <Input
                id="acte_principal"
                placeholder="Pansement…"
                list="actes-suggestions"
                {...register("acte_principal")}
              />
              {actesSuggeres.length > 0 && (
                <datalist id="actes-suggestions">
                  {actesSuggeres.map((a) => (
                    <option key={a} value={a} />
                  ))}
                </datalist>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="transmissions">Transmissions / notes</Label>
            <Textarea
              id="transmissions"
              rows={3}
              placeholder="Observations, transmissions…"
              {...register("transmissions")}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting ? "Enregistrement…" : "Planifier"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
