"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { terminerVisite } from "@/lib/actions/visites";
import type { VisiteAvecPatient } from "@/lib/actions/visites";

const schema = z.object({
  transmissions: z.string().min(1, "Les transmissions sont requises").max(5000),
  etat_patient: z.enum(["bon", "stable", "preoccupant", "a_surveiller"]).optional(),
  actes_effectues: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const ETAT_OPTIONS = [
  { value: "bon", label: "Bon" },
  { value: "stable", label: "Stable" },
  { value: "preoccupant", label: "Préoccupant" },
  { value: "a_surveiller", label: "À surveiller" },
];

interface VisiteTerminerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  visite: VisiteAvecPatient;
}

export default function VisiteTerminerForm({
  open,
  onOpenChange,
  visite,
}: VisiteTerminerFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      transmissions: visite.transmissions ?? "",
      etat_patient: undefined,
      actes_effectues: visite.actes_supplementaires ?? visite.acte_principal ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        transmissions: visite.transmissions ?? "",
        etat_patient: undefined,
        actes_effectues: visite.actes_supplementaires ?? visite.acte_principal ?? "",
      });
    }
  }, [open, visite, reset]);

  async function onSubmit(data: FormData) {
    const result = await terminerVisite(visite.id, {
      transmissions: data.transmissions,
      actes_effectues: data.actes_effectues,
      etat_patient: data.etat_patient,
    });

    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Visite enregistrée ✓");
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Marquer la visite comme terminée</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {visite.patient_prenom} {visite.patient_nom} · {visite.patient_commune}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-1">
          <div className="space-y-1.5">
            <Label htmlFor="actes_effectues">Actes effectués</Label>
            <Textarea
              id="actes_effectues"
              rows={2}
              placeholder={visite.acte_principal ?? "Pansement, injection…"}
              {...register("actes_effectues")}
            />
          </div>

          <div className="space-y-1.5">
            <Label>
              Transmissions <span className="text-destructive">*</span>
            </Label>
            <Textarea
              rows={4}
              placeholder="Notes sur la visite, observations, état du patient…"
              {...register("transmissions")}
            />
            {errors.transmissions && (
              <p className="text-xs text-destructive">{errors.transmissions.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>État général du patient</Label>
            <Controller
              name="etat_patient"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner…" />
                  </SelectTrigger>
                  <SelectContent>
                    {ETAT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting ? "Enregistrement…" : "Terminer la visite"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
