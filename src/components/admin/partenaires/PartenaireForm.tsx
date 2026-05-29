"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { partenaireCreateSchema, type PartenaireCreate } from "@/lib/validations/partenaire";
import { createPartenaire, updatePartenaire } from "@/lib/actions/partenaires";
import type { InfirmierPartenaire } from "@/db/schema";

const ZONES = [
  "Overijse",
  "Hoeilaart",
  "Tervuren",
  "Bruxelles",
  "Brabant flamand",
  "Autre",
];

interface PartenaireFormProps {
  partenaire?: InfirmierPartenaire;
}

export default function PartenaireForm({ partenaire }: PartenaireFormProps) {
  const router = useRouter();
  const isEdit = !!partenaire;

  const existingZones = partenaire?.zones_couvertes
    ? partenaire.zones_couvertes.split(",").map((z) => z.trim())
    : [];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PartenaireCreate>({
    resolver: zodResolver(partenaireCreateSchema),
    defaultValues: {
      nom: partenaire?.nom ?? "",
      prenom: partenaire?.prenom ?? "",
      telephone: partenaire?.telephone ?? "",
      email: partenaire?.email ?? "",
      zones_couvertes: partenaire?.zones_couvertes ?? "",
      specialites: partenaire?.specialites ?? "",
      numero_inami: partenaire?.numero_inami ?? "",
      notes: partenaire?.notes ?? "",
      actif: partenaire?.actif ?? true,
    } as PartenaireCreate,
  });

  const watchedZones = watch("zones_couvertes") ?? "";
  const selectedZones = watchedZones
    ? watchedZones.split(",").map((z) => z.trim()).filter(Boolean)
    : [];

  function toggleZone(zone: string) {
    const current = new Set(selectedZones);
    if (current.has(zone)) {
      current.delete(zone);
    } else {
      current.add(zone);
    }
    setValue("zones_couvertes", Array.from(current).join(", "));
  }

  async function onSubmit(data: PartenaireCreate) {
    const result = isEdit
      ? await updatePartenaire(partenaire.id, data)
      : await createPartenaire(data);

    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(isEdit ? "Partenaire mis à jour" : "Partenaire créé");
    const id = isEdit ? partenaire.id : ("id" in result ? result.id : undefined);
    router.push(id ? `/admin/partenaires/${id}` : "/admin/partenaires");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* A. Coordonnées */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Coordonnées
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="nom">Nom *</Label>
            <Input id="nom" placeholder="Dupont" {...register("nom")} />
            {errors.nom && (
              <p className="text-xs text-destructive">{errors.nom.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prenom">Prénom *</Label>
            <Input id="prenom" placeholder="Pierre" {...register("prenom")} />
            {errors.prenom && (
              <p className="text-xs text-destructive">{errors.prenom.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input
              id="telephone"
              type="tel"
              placeholder="0470123456"
              {...register("telephone")}
            />
            {errors.telephone && (
              <p className="text-xs text-destructive">{errors.telephone.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="pierre@example.be"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="numero_inami">Numéro INAMI (optionnel)</Label>
            <Input
              id="numero_inami"
              placeholder="1-XXXXX-XX-XXX"
              {...register("numero_inami")}
            />
          </div>
        </div>
      </section>

      {/* B. Zones */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Zones d'intervention
        </h2>
        <div className="flex flex-wrap gap-3">
          {ZONES.map((zone) => (
            <label
              key={zone}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <Checkbox
                checked={selectedZones.includes(zone)}
                onCheckedChange={() => toggleZone(zone)}
              />
              <span className="text-sm text-foreground">{zone}</span>
            </label>
          ))}
        </div>
        <input type="hidden" {...register("zones_couvertes")} />
        {selectedZones.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Zones sélectionnées : {selectedZones.join(", ")}
          </p>
        )}
      </section>

      {/* C. Spécialités */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Spécialités (optionnel)
        </h2>
        <div className="space-y-1.5">
          <Input
            placeholder="ex: Soins palliatifs, Diabète, Pédiatrie"
            {...register("specialites")}
          />
        </div>
      </section>

      {/* D. Notes */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Notes internes (optionnel)
        </h2>
        <Textarea
          rows={3}
          placeholder="Relation, fiabilité, disponibilités habituelles..."
          {...register("notes")}
        />
      </section>

      {/* E. Statut */}
      <section className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <Checkbox
            defaultChecked={partenaire?.actif ?? true}
            onCheckedChange={(checked) => setValue("actif", !!checked)}
          />
          <span className="text-sm font-medium text-foreground">Partenaire actif</span>
        </label>
      </section>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enregistrement…" : isEdit ? "Mettre à jour" : "Créer le partenaire"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
