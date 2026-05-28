"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
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
import { patientCreateSchema, type PatientCreateInput } from "@/lib/validations/patient";
import { convertDemandeToPatient } from "@/lib/actions/patients";

const COMMUNES = ["Overijse", "Hoeilaart", "Tervuren", "Autre"];

interface ConvertDemandeModalProps {
  demande: {
    id: string;
    nom: string;
    telephone: string;
    email: string;
    commune: string | null;
    created_at: Date | null;
  };
}

export default function ConvertDemandeModal({ demande }: ConvertDemandeModalProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const defaultNom = demande.nom.split(" ").slice(1).join(" ") || demande.nom;
  const defaultPrenom = demande.nom.split(" ")[0] || "";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientCreateInput>({
    resolver: zodResolver(patientCreateSchema),
    defaultValues: {
      nom: defaultNom,
      prenom: defaultPrenom,
      telephone: demande.telephone,
      email: demande.email,
      commune: demande.commune ?? "",
      adresse: "",
      code_postal: "",
      notes: demande.created_at
        ? `Patient créé depuis demande du ${new Date(demande.created_at).toLocaleDateString("fr-BE")}`
        : "Patient créé depuis une demande",
      statut: "actif",
    },
  });

  const communeVal = watch("commune");

  async function onSubmit(data: PatientCreateInput) {
    const result = await convertDemandeToPatient(demande.id, data);

    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Patient créé avec succès");
    setOpen(false);

    if ("patientId" in result && result.patientId) {
      router.push(`/admin/patients/${result.patientId}`);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <UserPlus className="h-4 w-4 mr-2" />
          Convertir en patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un patient depuis cette demande</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="conv-prenom">
                Prénom <span className="text-destructive">*</span>
              </Label>
              <Input id="conv-prenom" {...register("prenom")} aria-invalid={!!errors.prenom} />
              {errors.prenom && (
                <p className="text-xs text-destructive">{errors.prenom.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="conv-nom">
                Nom <span className="text-destructive">*</span>
              </Label>
              <Input id="conv-nom" {...register("nom")} aria-invalid={!!errors.nom} />
              {errors.nom && (
                <p className="text-xs text-destructive">{errors.nom.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="conv-tel">
                Téléphone <span className="text-destructive">*</span>
              </Label>
              <Input id="conv-tel" {...register("telephone")} aria-invalid={!!errors.telephone} />
              {errors.telephone && (
                <p className="text-xs text-destructive">{errors.telephone.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="conv-email">Email</Label>
              <Input id="conv-email" type="email" {...register("email")} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="conv-adresse">
              Adresse <span className="text-destructive">*</span>
            </Label>
            <Input
              id="conv-adresse"
              {...register("adresse")}
              aria-invalid={!!errors.adresse}
              placeholder="Rue et numéro"
            />
            {errors.adresse && (
              <p className="text-xs text-destructive">{errors.adresse.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="conv-cp">
                Code postal <span className="text-destructive">*</span>
              </Label>
              <Input
                id="conv-cp"
                {...register("code_postal")}
                aria-invalid={!!errors.code_postal}
                placeholder="1380"
              />
              {errors.code_postal && (
                <p className="text-xs text-destructive">{errors.code_postal.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>
                Commune <span className="text-destructive">*</span>
              </Label>
              <Select
                value={communeVal || undefined}
                onValueChange={(v) => setValue("commune", v)}
              >
                <SelectTrigger className="w-full" aria-invalid={!!errors.commune}>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {COMMUNES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.commune && (
                <p className="text-xs text-destructive">{errors.commune.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="conv-notes">Notes</Label>
            <Textarea id="conv-notes" {...register("notes")} rows={2} />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création…" : "Créer le patient"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
