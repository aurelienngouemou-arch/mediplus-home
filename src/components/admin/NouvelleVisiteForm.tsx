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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
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
import { createVisite } from "@/lib/actions/patients";

const ACTES_COURANTS = [
  "Pansement simple",
  "Pansement complexe",
  "Injection IM",
  "Injection SC",
  "Injection insuline",
  "Perfusion IV",
  "Tension artérielle",
  "Glycémie capillaire",
  "Soins post-opératoires",
  "Suivi diabète",
  "Toilette / aide à la toilette",
  "Pose/retrait sonde urinaire",
];

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
  const [isAutreActe, setIsAutreActe] = useState(false);

  const localNow = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const { register, handleSubmit, reset, control, setValue, formState: { errors, isSubmitting } } =
    useForm<VisiteInput>({
      resolver: zodResolver(visiteSchema),
      defaultValues: { date_visite: localNow() },
    });

  // Fix 5a — refresh date each time the dialog opens
  useEffect(() => {
    if (open) {
      reset({ date_visite: localNow() });
      setIsAutreActe(false);
    }
  }, [open, reset]);

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
    setIsAutreActe(false);
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* Fix 5b — Select shadcn/ui instead of Input + datalist */}
            <div className="space-y-1.5">
              <Label>Acte principal</Label>
              {!isAutreActe ? (
                <Controller
                  name="acte_principal"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(v) => {
                        if (v === "__autre__") {
                          setIsAutreActe(true);
                          setValue("acte_principal", "");
                        } else {
                          field.onChange(v);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir…" />
                      </SelectTrigger>
                      <SelectContent>
                        {actesSuggeres.length > 0 && (
                          <>
                            <SelectGroup>
                              <SelectLabel>Plan de soins</SelectLabel>
                              {actesSuggeres.map((a) => (
                                <SelectItem key={a} value={a}>
                                  {a}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                            <SelectSeparator />
                          </>
                        )}
                        <SelectGroup>
                          {ACTES_COURANTS.map((a) => (
                            <SelectItem key={a} value={a}>
                              {a}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectItem value="__autre__">Autre…</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              ) : (
                <div className="flex gap-2">
                  <Input
                    autoFocus
                    placeholder="Décrire l'acte"
                    {...register("acte_principal")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsAutreActe(false);
                      setValue("acte_principal", "");
                    }}
                    className="shrink-0 text-xs"
                  >
                    Liste
                  </Button>
                </div>
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
