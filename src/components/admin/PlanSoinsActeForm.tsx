"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";
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
import { acteCreateSchema, type ActeCreate, type ActeCreateInput } from "@/lib/validations/plan-soins";
import {
  createActePlanSoins,
  updateActePlanSoins,
} from "@/lib/actions/patients";
import type { ActePlanSoins } from "@/db/schema";

const ACTES_SUGGERES = [
  "Pansement simple",
  "Pansement complexe",
  "Injection IM/SC",
  "Injection insuline",
  "Perfusion IV",
  "Tension artérielle",
  "Glycémie capillaire",
  "Soins post-op",
  "Suivi diabète",
  "Pose/dépose sonde urinaire",
  "Toilette intime",
  "Aide à la toilette",
  "Préparation pilulier",
  "Autre",
];

const FREQUENCES = [
  "1x/jour",
  "2x/jour",
  "3x/jour",
  "1x/semaine",
  "2x/semaine",
  "3x/semaine",
  "Lundi-Mer-Ven",
  "Mar-Jeu-Sam",
  "Autre",
];

const MOMENTS = [
  { value: "matin", label: "Matin" },
  { value: "midi", label: "Midi" },
  { value: "soir", label: "Soir" },
  { value: "nuit", label: "Nuit" },
  { value: "variable", label: "Variable" },
];

interface PlanSoinsActeFormProps {
  patientId: string;
  acte?: ActePlanSoins;
  trigger?: React.ReactNode;
  onDone?: () => void;
  onOpen?: () => void;
}

export default function PlanSoinsActeForm({
  patientId,
  acte,
  trigger,
  onDone,
  onOpen,
}: PlanSoinsActeFormProps) {
  const [open, setOpen] = useState(false);
  const [acteLibre, setActeLibre] = useState(
    acte ? !ACTES_SUGGERES.includes(acte.acte) : false
  );
  const [freqLibre, setFreqLibre] = useState(
    acte ? !FREQUENCES.includes(acte.frequence) : false
  );

  const isEdit = !!acte;
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActeCreateInput, unknown, ActeCreate>({
    resolver: zodResolver(acteCreateSchema),
    defaultValues: acte
      ? {
          patient_id: patientId,
          acte: acte.acte,
          frequence: acte.frequence,
          duree_minutes: acte.duree_minutes ?? undefined,
          moment_journee: (acte.moment_journee as ActeCreate["moment_journee"]) ?? undefined,
          actif: acte.actif ?? true,
          date_debut: acte.date_debut ?? today,
          date_fin: acte.date_fin ?? undefined,
          notes: acte.notes ?? "",
        }
      : {
          patient_id: patientId,
          actif: true,
          date_debut: today,
        },
  });

  const acteVal = watch("acte");
  const freqVal = watch("frequence");
  const momentVal = watch("moment_journee");

  async function onSubmit(data: ActeCreate) {
    const result = isEdit
      ? await updateActePlanSoins(acte!.id, data)
      : await createActePlanSoins(data);

    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(isEdit ? "Acte mis à jour" : "Acte ajouté au plan de soins");
    setActeLibre(false);
    setFreqLibre(false);
    setOpen(false);
    reset();
    onDone?.();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => {
      setOpen(v);
      if (v) onOpen?.();
      else {
        setActeLibre(false);
        setFreqLibre(false);
        if (isEdit) onDone?.(); // ferme le dropdown quand dialog se ferme (annuler ou Escape)
      }
    }}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" variant="outline">
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Ajouter un acte
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Modifier l'acte" : "Ajouter un acte au plan de soins"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <input type="hidden" {...register("patient_id")} />

          {/* Acte */}
          <div className="space-y-1.5">
            <Label>
              Acte <span className="text-destructive">*</span>
            </Label>
            {!acteLibre ? (
              <Select
                value={acteVal}
                onValueChange={(v) => {
                  if (v === "Autre") {
                    setActeLibre(true);
                    setValue("acte", "");
                  } else {
                    setValue("acte", v);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir un acte" />
                </SelectTrigger>
                <SelectContent>
                  {ACTES_SUGGERES.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2">
                <Input
                  {...register("acte")}
                  placeholder="Décrire l'acte"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setActeLibre(false)}
                  className="shrink-0 text-xs"
                >
                  Liste
                </Button>
              </div>
            )}
            {errors.acte && (
              <p className="text-xs text-destructive">{errors.acte.message}</p>
            )}
          </div>

          {/* Fréquence */}
          <div className="space-y-1.5">
            <Label>
              Fréquence <span className="text-destructive">*</span>
            </Label>
            {!freqLibre ? (
              <Select
                value={freqVal}
                onValueChange={(v) => {
                  if (v === "Autre") {
                    setFreqLibre(true);
                    setValue("frequence", "");
                  } else {
                    setValue("frequence", v);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir la fréquence" />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCES.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2">
                <Input
                  {...register("frequence")}
                  placeholder="Ex: Lun-Mar-Jeu"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFreqLibre(false)}
                  className="shrink-0 text-xs"
                >
                  Liste
                </Button>
              </div>
            )}
            {errors.frequence && (
              <p className="text-xs text-destructive">
                {errors.frequence.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Durée */}
            <div className="space-y-1.5">
              <Label htmlFor="duree">Durée (min)</Label>
              <Input
                id="duree"
                type="number"
                min={5}
                max={240}
                step={5}
                {...register("duree_minutes", {
                  setValueAs: (v: string) => v === "" ? undefined : parseInt(v, 10),
                })}
                placeholder="15"
              />
            </div>
            {/* Moment */}
            <div className="space-y-1.5">
              <Label>Moment</Label>
              <Select
                value={momentVal}
                onValueChange={(v) =>
                  setValue("moment_journee", v as ActeCreate["moment_journee"])
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Variable" />
                </SelectTrigger>
                <SelectContent>
                  {MOMENTS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="date_debut">Date début</Label>
              <Input
                id="date_debut"
                type="date"
                {...register("date_debut")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="date_fin">Date fin (optionnel)</Label>
              <Input id="date_fin" type="date" {...register("date_fin")} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="notes_acte">Notes spécifiques</Label>
            <Textarea
              id="notes_acte"
              {...register("notes")}
              rows={2}
              placeholder="Précisions particulières…"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting
                ? "Enregistrement…"
                : isEdit
                  ? "Mettre à jour"
                  : "Ajouter l'acte"}
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
