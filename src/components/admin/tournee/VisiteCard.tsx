"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Clock,
  MapPin,
  MoreVertical,
  Play,
  CheckCheck,
  XCircle,
  Pencil,
  Trash2,
  Share2,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  demarrerVisite,
  deleteVisite,
  annulerVisite,
  updateVisite,
} from "@/lib/actions/visites";
import {
  getDelegationByVisiteId,
  cancelDelegation,
  updateDelegationStatus,
} from "@/lib/actions/delegations";
import { getPartenairesActifsForSelect } from "@/lib/actions/partenaires";
import type { VisiteAvecPatient, PatientSelectItem } from "@/lib/actions/visites";
import VisiteStatusBadge from "@/components/admin/tournee/VisiteStatusBadge";
import VisiteTerminerForm from "@/components/admin/tournee/VisiteTerminerForm";
import DelegationForm from "@/components/admin/tournee/DelegationForm";
import type { PartenaireSelectItem } from "@/lib/actions/partenaires";

const editSchema = z.object({
  date_visite: z.string().min(1, "La date est requise"),
  duree_minutes: z.number().int().min(5).max(480).optional(),
  acte_principal: z.string().max(120).optional(),
  notes_pre_visite: z.string().max(2000).optional(),
});
type EditData = z.infer<typeof editSchema>;

interface VisiteCardProps {
  visite: VisiteAvecPatient;
  patientsActifs: PatientSelectItem[];
}

export default function VisiteCard({ visite, patientsActifs: _ }: VisiteCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminerOpen, setTerminerOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleguerOpen, setDeleguerOpen] = useState(false);
  const [partenaires, setPartenaires] = useState<PartenaireSelectItem[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const heure = format(new Date(visite.date_visite), "HH:mm", { locale: fr });
  const isFini = visite.statut === "terminee" || visite.statut === "annulee";
  const isDeleguee = visite.statut === "deleguee";

  async function handleDemarrer() {
    setMenuOpen(false);
    const res = await demarrerVisite(visite.id);
    if ("error" in res && res.error) toast.error(res.error);
    else toast.success("Visite démarrée");
  }

  async function handleAnnuler() {
    setMenuOpen(false);
    if (!confirm("Confirmer l'annulation de cette visite ?")) return;
    const res = await annulerVisite(visite.id);
    if ("error" in res && res.error) toast.error(res.error);
    else toast.success("Visite annulée");
  }

  async function handleSupprimer() {
    setMenuOpen(false);
    if (!confirm("Supprimer définitivement cette visite ?")) return;
    const res = await deleteVisite(visite.id);
    if ("error" in res && res.error) toast.error(res.error);
    else toast.success("Visite supprimée");
  }

  async function handleOuvrirDeleguer() {
    setMenuOpen(false);
    const list = await getPartenairesActifsForSelect();
    setPartenaires(list);
    setDeleguerOpen(true);
  }

  async function handleAnnulerDelegation() {
    setMenuOpen(false);
    if (!confirm("Annuler la délégation ? La visite reviendra en statut Planifiée.")) return;
    if (!visite.delegation_id) return;
    const res = await cancelDelegation(visite.delegation_id, visite.id);
    if ("error" in res && res.error) toast.error(res.error);
    else toast.success("Délégation annulée");
  }

  async function handleMarquerDelegation(statut: "acceptee" | "refusee" | "completee") {
    setMenuOpen(false);
    if (!visite.delegation_id) return;

    if (statut === "refusee") {
      if (!confirm("Marquer comme refusée ? La visite reviendra en Planifiée.")) return;
      await cancelDelegation(visite.delegation_id, visite.id);
      toast.info("Délégation refusée — visite remise en planifiée");
      return;
    }

    const res = await updateDelegationStatus(visite.delegation_id, statut);
    if ("error" in res && res.error) toast.error(res.error);
    else {
      const labels = { acceptee: "Délégation acceptée", completee: "Visite complétée par le partenaire" };
      toast.success(labels[statut]);
    }
  }

  return (
    <>
      <div
        className={`relative flex gap-4 p-4 rounded-xl border transition-colors ${
          isFini
            ? "border-border/40 bg-muted/30 opacity-70"
            : isDeleguee
              ? "border-purple-200 bg-purple-50/30"
              : visite.statut === "en_cours"
                ? "border-amber-200 bg-amber-50/50"
                : "border-border bg-card hover:border-primary/30"
        }`}
      >
        <div className="shrink-0 text-center w-12">
          <p className="text-lg font-bold text-foreground tabular-nums leading-none">{heure}</p>
          {visite.duree_minutes && (
            <p className="text-[10px] text-muted-foreground mt-1 flex items-center justify-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />
              {visite.duree_minutes}m
            </p>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-sm text-foreground">
              {visite.patient_prenom} {visite.patient_nom}
            </p>
            <VisiteStatusBadge statut={visite.statut} />
          </div>
          {visite.acte_principal && (
            <p className="text-sm text-muted-foreground">{visite.acte_principal}</p>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {visite.patient_adresse}, {visite.patient_commune}
            </span>
          </div>
          {visite.notes_pre_visite && (
            <p className="text-xs text-foreground/60 line-clamp-1 italic">
              {visite.notes_pre_visite}
            </p>
          )}
          {visite.statut === "terminee" && visite.transmissions && (
            <p className="text-xs text-foreground/60 line-clamp-2 mt-1">
              {visite.transmissions}
            </p>
          )}
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Actions"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-1 w-56 bg-popover rounded-lg border border-border shadow-lg py-1 text-sm">
                {visite.statut === "planifiee" && (
                  <>
                    <button
                      onClick={handleDemarrer}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <Play className="h-3.5 w-3.5 text-amber-600" />
                      Démarrer la visite
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); setTerminerOpen(true); }}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <CheckCheck className="h-3.5 w-3.5 text-green-600" />
                      Marquer comme terminée
                    </button>
                    <button
                      onClick={handleOuvrirDeleguer}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <Share2 className="h-3.5 w-3.5 text-purple-600" />
                      Déléguer cette visite
                    </button>
                  </>
                )}
                {visite.statut === "en_cours" && (
                  <button
                    onClick={() => { setMenuOpen(false); setTerminerOpen(true); }}
                    className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                  >
                    <CheckCheck className="h-3.5 w-3.5 text-green-600" />
                    Marquer comme terminée
                  </button>
                )}
                {isDeleguee && (
                  <>
                    <button
                      onClick={() => handleMarquerDelegation("acceptee")}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <CheckCheck className="h-3.5 w-3.5 text-green-600" />
                      Marquer acceptée
                    </button>
                    <button
                      onClick={() => handleMarquerDelegation("completee")}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <CheckCheck className="h-3.5 w-3.5 text-teal-600" />
                      Marquer complétée
                    </button>
                    <button
                      onClick={() => handleMarquerDelegation("refusee")}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left text-orange-600"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Marquer refusée
                    </button>
                    <button
                      onClick={handleAnnulerDelegation}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left text-orange-600"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Annuler la délégation
                    </button>
                  </>
                )}
                {!isFini && !isDeleguee && (
                  <>
                    <button
                      onClick={() => { setMenuOpen(false); setEditOpen(true); }}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                    >
                      <Pencil className="h-3.5 w-3.5 text-blue-600" />
                      Modifier
                    </button>
                    {visite.statut !== "annulee" && (
                      <button
                        onClick={handleAnnuler}
                        className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left"
                      >
                        <XCircle className="h-3.5 w-3.5 text-orange-500" />
                        Annuler la visite
                      </button>
                    )}
                  </>
                )}
                {!isDeleguee && (
                  <>
                    <div className="my-1 h-px bg-border" />
                    <button
                      onClick={handleSupprimer}
                      className="flex w-full items-center gap-2.5 px-3 py-2 hover:bg-muted transition-colors text-left text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Supprimer
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <VisiteTerminerForm
        open={terminerOpen}
        onOpenChange={setTerminerOpen}
        visite={visite}
      />

      <VisiteEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        visite={visite}
      />

      <DelegationForm
        open={deleguerOpen}
        onOpenChange={setDeleguerOpen}
        visite={visite}
        partenaires={partenaires}
      />
    </>
  );
}

function VisiteEditDialog({
  open,
  onOpenChange,
  visite,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  visite: VisiteAvecPatient;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: _errors, isSubmitting },
  } = useForm<EditData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      date_visite: new Date(
        new Date(visite.date_visite).getTime() -
          new Date(visite.date_visite).getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16),
      duree_minutes: visite.duree_minutes ?? undefined,
      acte_principal: visite.acte_principal ?? "",
      notes_pre_visite: visite.notes_pre_visite ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        date_visite: new Date(
          new Date(visite.date_visite).getTime() -
            new Date(visite.date_visite).getTimezoneOffset() * 60000
        )
          .toISOString()
          .slice(0, 16),
        duree_minutes: visite.duree_minutes ?? undefined,
        acte_principal: visite.acte_principal ?? "",
        notes_pre_visite: visite.notes_pre_visite ?? "",
      });
    }
  }, [open, visite, reset]);

  async function onSubmit(data: EditData) {
    const res = await updateVisite(visite.id, data);
    if ("error" in res && res.error) { toast.error(res.error); return; }
    toast.success("Visite modifiée");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Modifier la visite</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground -mt-1">
          {visite.patient_prenom} {visite.patient_nom}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-1">
          <div className="space-y-1.5">
            <Label htmlFor="edit_date">Date et heure</Label>
            <Input id="edit_date" type="datetime-local" {...register("date_visite")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Durée (min)</Label>
              <Input
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
              <Label>Acte principal</Label>
              <Input placeholder="Pansement…" {...register("acte_principal")} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Notes pré-visite</Label>
            <Textarea rows={2} placeholder="Instructions…" {...register("notes_pre_visite")} />
          </div>
          <div className="flex gap-3 pt-1">
            <Button type="submit" disabled={isSubmitting} size="sm">
              {isSubmitting ? "Enregistrement…" : "Modifier"}
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
