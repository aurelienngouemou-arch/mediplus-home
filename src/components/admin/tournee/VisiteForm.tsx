"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { toast } from "sonner";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createVisite, updateVisite } from "@/lib/actions/visites";
import type { VisiteAvecPatient, PatientSelectItem } from "@/lib/actions/visites";

const formSchema = z.object({
  patient_id: z.string().uuid("Sélectionnez un patient"),
  date_visite: z.string().min(1, "La date est requise"),
  duree_minutes: z.number().int().min(5).max(480).optional(),
  acte_principal: z.string().max(120).optional(),
  notes_pre_visite: z.string().max(2000).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface VisiteFormProps {
  patientsActifs: PatientSelectItem[];
  initialPatientId?: string;
  initialDate?: string;
  visite?: VisiteAvecPatient;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

function localNow(date?: string): string {
  const d = date ? new Date(`${date}T08:00:00Z`) : new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

export default function VisiteForm({
  patientsActifs,
  initialPatientId,
  initialDate,
  visite,
  trigger,
  onSuccess,
}: VisiteFormProps) {
  const [open, setOpen] = useState(false);
  const isEdit = !!visite;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient_id: visite?.patient_id ?? initialPatientId ?? "",
      date_visite: visite
        ? new Date(
            new Date(visite.date_visite).getTime() -
              new Date(visite.date_visite).getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 16)
        : localNow(initialDate),
      duree_minutes: visite?.duree_minutes ?? undefined,
      acte_principal: visite?.acte_principal ?? "",
      notes_pre_visite: visite?.notes_pre_visite ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        patient_id: visite?.patient_id ?? initialPatientId ?? "",
        date_visite: visite
          ? new Date(
              new Date(visite.date_visite).getTime() -
                new Date(visite.date_visite).getTimezoneOffset() * 60000
            )
              .toISOString()
              .slice(0, 16)
          : localNow(initialDate),
        duree_minutes: visite?.duree_minutes ?? undefined,
        acte_principal: visite?.acte_principal ?? "",
        notes_pre_visite: visite?.notes_pre_visite ?? "",
      });
    }
  }, [open, visite, initialPatientId, initialDate, reset]);

  async function onSubmit(data: FormData) {
    let result: { success?: boolean; error?: string };

    if (isEdit && visite) {
      result = await updateVisite(visite.id, {
        date_visite: data.date_visite,
        duree_minutes: data.duree_minutes,
        acte_principal: data.acte_principal,
        notes_pre_visite: data.notes_pre_visite,
      });
    } else {
      result = await createVisite({
        patient_id: data.patient_id,
        date_visite: data.date_visite,
        duree_minutes: data.duree_minutes,
        acte_principal: data.acte_principal,
        notes_pre_visite: data.notes_pre_visite,
      });
    }

    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(isEdit ? "Visite modifiée" : "Visite planifiée");
    setOpen(false);
    onSuccess?.();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm">
            <CalendarPlus className="h-3.5 w-3.5 mr-1.5" />
            Nouvelle visite
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Modifier la visite" : "Planifier une visite"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {!isEdit && (
            <div className="space-y-1.5">
              <Label>
                Patient <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="patient_id"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!!initialPatientId}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un patient…" />
                    </SelectTrigger>
                    <SelectContent>
                      {patientsActifs.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.prenom} {p.nom} · {p.commune}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.patient_id && (
                <p className="text-xs text-destructive">{errors.patient_id.message}</p>
              )}
            </div>
          )}

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
              <Label htmlFor="duree_minutes">Durée (min)</Label>
              <Input
                id="duree_minutes"
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
                {...register("acte_principal")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes_pre_visite">Notes pré-visite</Label>
            <Textarea
              id="notes_pre_visite"
              rows={2}
              placeholder="Instructions, contexte…"
              {...register("notes_pre_visite")}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting ? "Enregistrement…" : isEdit ? "Modifier" : "Planifier"}
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
