"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDelegation } from "@/lib/actions/delegations";
import type { VisiteAvecPatient } from "@/lib/actions/visites";
import type { PartenaireSelectItem } from "@/lib/actions/partenaires";

const MOTIFS_PREDEFINED = [
  "Indisponibilité",
  "Conflit d'horaire",
  "Maladie / Repos",
  "Vacances / Congés",
  "Hors zone habituelle",
  "Compétence spécialisée requise",
  "Autre",
];

const formSchema = z.object({
  partenaire_id: z.string().uuid("Sélectionnez un partenaire"),
  motif_select: z.string().min(1, "Le motif est requis"),
  motif_autre: z.string().optional(),
  methode_notification: z.enum(["email", "sms", "les_deux"]),
  notes: z.string().optional(),
});
type FormData = z.infer<typeof formSchema>;

interface DelegationFormProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  visite: VisiteAvecPatient;
  partenaires: PartenaireSelectItem[];
}

export default function DelegationForm({
  open,
  onOpenChange,
  visite,
  partenaires,
}: DelegationFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      methode_notification: "email",
      motif_select: "",
    },
  });

  const motifSelect = watch("motif_select");
  const isAutre = motifSelect === "Autre";

  const partenairesFiltered = partenaires.filter((p) =>
    p.zones_couvertes?.toLowerCase().includes(visite.patient_commune.toLowerCase())
  );
  const autresPartenaires = partenaires.filter(
    (p) => !partenairesFiltered.find((pf) => pf.id === p.id)
  );

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    const motif = isAutre ? (data.motif_autre ?? "Autre") : data.motif_select;

    const res = await createDelegation({
      visite_id: visite.id,
      partenaire_id: data.partenaire_id,
      motif,
      methode_notification: data.methode_notification,
      notes: data.notes,
    });

    setSubmitting(false);

    if ("error" in res && res.error) {
      toast.error(res.error);
      return;
    }

    const prenom = "partenaire_prenom" in res ? res.partenaire_prenom : "le partenaire";
    toast.success(`Délégation envoyée à ${prenom}`);
    reset();
    onOpenChange(false);
  }

  const heureVisite = format(new Date(visite.date_visite), "EEEE d MMMM à HH:mm", { locale: fr });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            Déléguer cette visite
          </DialogTitle>
          <DialogDescription>
            Envoyer cette visite à un collègue partenaire
          </DialogDescription>
        </DialogHeader>

        {/* Récapitulatif visite */}
        <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-1.5 text-sm">
          <p className="font-semibold text-foreground">
            {visite.patient_prenom} {visite.patient_nom}
          </p>
          <p className="text-muted-foreground capitalize">{heureVisite}</p>
          <p className="text-muted-foreground">
            {visite.patient_adresse}, {visite.patient_commune}
          </p>
          {visite.acte_principal && (
            <p className="text-foreground/80">{visite.acte_principal}</p>
          )}
          {visite.duree_minutes && (
            <p className="text-muted-foreground">{visite.duree_minutes} min estimées</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-1">
          {/* A. Partenaire */}
          <div className="space-y-1.5">
            <Label htmlFor="partenaire_id">Partenaire *</Label>
            <Controller
              name="partenaire_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un partenaire…" />
                  </SelectTrigger>
                  <SelectContent>
                    {partenairesFiltered.length > 0 && (
                      <>
                        <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                          Suggérés pour {visite.patient_commune}
                        </div>
                        {partenairesFiltered.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.prenom} {p.nom}
                            {p.zones_couvertes && (
                              <span className="text-muted-foreground ml-1">
                                ({p.zones_couvertes})
                              </span>
                            )}
                          </SelectItem>
                        ))}
                        {autresPartenaires.length > 0 && (
                          <div className="px-2 py-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-t border-border mt-1">
                            Autres partenaires
                          </div>
                        )}
                      </>
                    )}
                    {autresPartenaires.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.prenom} {p.nom}
                        {p.zones_couvertes && (
                          <span className="text-muted-foreground ml-1">
                            ({p.zones_couvertes})
                          </span>
                        )}
                      </SelectItem>
                    ))}
                    {partenaires.length === 0 && (
                      <div className="px-2 py-3 text-sm text-muted-foreground text-center">
                        Aucun partenaire actif
                      </div>
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.partenaire_id && (
              <p className="text-xs text-destructive">{errors.partenaire_id.message}</p>
            )}
            <a
              href="/admin/partenaires/nouveau"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
            >
              <ExternalLink className="h-3 w-3" />
              Ajouter un nouveau partenaire
            </a>
          </div>

          {/* B. Motif */}
          <div className="space-y-1.5">
            <Label>Motif de la délégation *</Label>
            <Controller
              name="motif_select"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un motif…" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOTIFS_PREDEFINED.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.motif_select && (
              <p className="text-xs text-destructive">{errors.motif_select.message}</p>
            )}
            {isAutre && (
              <input
                {...register("motif_autre")}
                placeholder="Précisez le motif…"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            )}
          </div>

          {/* C. Méthode notification */}
          <div className="space-y-2">
            <Label>Méthode de notification *</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="email"
                  {...register("methode_notification")}
                  className="text-primary"
                />
                <span className="text-sm">Email uniquement (recommandé)</span>
              </label>
              <label className="flex items-center gap-2 opacity-40 cursor-not-allowed">
                <input type="radio" disabled />
                <span className="text-sm">SMS uniquement (bientôt disponible)</span>
              </label>
              <label className="flex items-center gap-2 opacity-40 cursor-not-allowed">
                <input type="radio" disabled />
                <span className="text-sm">Email + SMS (bientôt disponible)</span>
              </label>
            </div>
          </div>

          {/* D. Notes */}
          <div className="space-y-1.5">
            <Label>Notes pour le partenaire (optionnel)</Label>
            <Textarea
              rows={3}
              placeholder="Informations utiles pour le partenaire (codes d'accès, particularités du patient, etc.)"
              {...register("notes")}
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Envoi en cours…" : "Envoyer la délégation"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => { reset(); onOpenChange(false); }}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
