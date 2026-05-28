"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
import { patientCreateSchema, type PatientCreate, type PatientCreateInput } from "@/lib/validations/patient";
import { createPatient, updatePatient } from "@/lib/actions/patients";
import type { Patient } from "@/db/schema";

interface PatientFormProps {
  mode: "create" | "edit";
  patient?: Patient;
  demandeData?: {
    nom?: string;
    telephone?: string;
    email?: string;
    commune?: string;
    demandeId?: string;
    notes?: string;
  };
  onSuccess?: (patientId: string) => void;
}

const COMMUNES = ["Overijse", "Hoeilaart", "Tervuren", "Autre"];
const MUTUELLES = [
  "Mutualités Chrétiennes",
  "Solidaris",
  "Libre",
  "Indépendants",
  "Autre",
];

export default function PatientForm({
  mode,
  patient,
  demandeData,
  onSuccess,
}: PatientFormProps) {
  const router = useRouter();

  const defaultValues: Partial<PatientCreateInput> = patient
    ? {
        nom: patient.nom,
        prenom: patient.prenom,
        telephone: patient.telephone,
        email: patient.email ?? "",
        adresse: patient.adresse,
        code_postal: patient.code_postal,
        commune: patient.commune,
        code_porte: patient.code_porte ?? "",
        date_naissance: patient.date_naissance ?? "",
        mutuelle: patient.mutuelle ?? "",
        numero_mutuelle: patient.numero_mutuelle ?? "",
        allergies: patient.allergies ?? "",
        notes: patient.notes ?? "",
        statut: (patient.statut as PatientCreate["statut"]) ?? "actif",
      }
    : {
        nom: demandeData?.nom ?? "",
        telephone: demandeData?.telephone ?? "",
        email: demandeData?.email ?? "",
        commune: demandeData?.commune ?? "",
        notes: demandeData?.notes ?? "",
        statut: "actif",
      };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PatientCreateInput>({
    resolver: zodResolver(patientCreateSchema),
    defaultValues,
  });

  const communeValue = watch("commune");
  const muelleValue = watch("mutuelle");
  const statutValue = watch("statut");

  async function onSubmit(data: PatientCreateInput) {
    const payload = {
      ...data,
      demande_origine_id: demandeData?.demandeId,
    };

    const result =
      mode === "create"
        ? await createPatient(payload)
        : await updatePatient(patient!.id, data);

    if ("error" in result && result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(
      mode === "create" ? "Patient créé avec succès" : "Patient mis à jour"
    );

    const patientId: string | undefined =
      mode === "create" && "patientId" in result
        ? (result as { patientId: string }).patientId
        : patient?.id;

    if (onSuccess && patientId) {
      onSuccess(patientId);
    } else if (patientId) {
      router.push(`/admin/patients/${patientId}`);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Section Coordonnées */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">
          Coordonnées
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="nom">
              Nom <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nom"
              {...register("nom")}
              aria-invalid={!!errors.nom}
              autoComplete="family-name"
            />
            {errors.nom && (
              <p className="text-xs text-destructive">{errors.nom.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="prenom">
              Prénom <span className="text-destructive">*</span>
            </Label>
            <Input
              id="prenom"
              {...register("prenom")}
              aria-invalid={!!errors.prenom}
              autoComplete="given-name"
            />
            {errors.prenom && (
              <p className="text-xs text-destructive">{errors.prenom.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="telephone">
              Téléphone <span className="text-destructive">*</span>
            </Label>
            <Input
              id="telephone"
              type="tel"
              {...register("telephone")}
              aria-invalid={!!errors.telephone}
              autoComplete="tel"
              placeholder="0478000000"
            />
            {errors.telephone && (
              <p className="text-xs text-destructive">
                {errors.telephone.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="date_naissance">Date de naissance</Label>
          <Input
            id="date_naissance"
            type="date"
            {...register("date_naissance")}
          />
        </div>
      </fieldset>

      {/* Section Adresse */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">
          Adresse
        </legend>
        <div className="space-y-1.5">
          <Label htmlFor="adresse">
            Adresse <span className="text-destructive">*</span>
          </Label>
          <Input
            id="adresse"
            {...register("adresse")}
            aria-invalid={!!errors.adresse}
            autoComplete="street-address"
            placeholder="Rue et numéro"
          />
          {errors.adresse && (
            <p className="text-xs text-destructive">{errors.adresse.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="code_postal">
              Code postal <span className="text-destructive">*</span>
            </Label>
            <Input
              id="code_postal"
              {...register("code_postal")}
              aria-invalid={!!errors.code_postal}
              maxLength={4}
              placeholder="1380"
            />
            {errors.code_postal && (
              <p className="text-xs text-destructive">
                {errors.code_postal.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="commune">
              Commune <span className="text-destructive">*</span>
            </Label>
            <Select
              value={communeValue || undefined}
              onValueChange={(v) => setValue("commune", v)}
            >
              <SelectTrigger id="commune" className="w-full" aria-invalid={!!errors.commune}>
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {COMMUNES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.commune && (
              <p className="text-xs text-destructive">
                {errors.commune.message}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="code_porte">Code porte / digicode</Label>
          <Input
            id="code_porte"
            {...register("code_porte")}
            placeholder="A1234"
          />
        </div>
      </fieldset>

      {/* Section Informations médicales */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-foreground border-b border-border pb-2 w-full">
          Informations complémentaires
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="mutuelle">Mutuelle</Label>
            <Select
              value={muelleValue || undefined}
              onValueChange={(v) => setValue("mutuelle", v)}
            >
              <SelectTrigger id="mutuelle" className="w-full">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                {MUTUELLES.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="numero_mutuelle">Numéro de mutuelle</Label>
            <Input
              id="numero_mutuelle"
              {...register("numero_mutuelle")}
              placeholder="123-456-789"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="allergies">Allergies connues</Label>
          <Input
            id="allergies"
            {...register("allergies")}
            placeholder="Pénicilline, latex…"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="notes">Notes (informations pratiques, préférences…)</Label>
          <Textarea
            id="notes"
            {...register("notes")}
            rows={3}
            placeholder="Informations utiles pour les soins…"
          />
        </div>
        {mode === "edit" && (
          <div className="space-y-1.5">
            <Label htmlFor="statut">Statut du patient</Label>
            <Select
              value={statutValue}
              onValueChange={(v) =>
                setValue("statut", v as "actif" | "inactif" | "archive")
              }
            >
              <SelectTrigger id="statut" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
                <SelectItem value="archive">Archivé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </fieldset>

      {/* Boutons */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Enregistrement…"
            : mode === "create"
              ? "Créer le patient"
              : "Enregistrer les modifications"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
}
