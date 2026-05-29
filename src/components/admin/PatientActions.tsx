"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Archive, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  archivePatient,
  restorePatient,
  deletePatientPermanently,
} from "@/lib/actions/patients";

interface PatientActionsProps {
  patientId: string;
  patientName: string;
  statut: string;
}

export default function PatientActions({
  patientId,
  patientName,
  statut,
}: PatientActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [modal, setModal] = useState<"archive" | "delete" | "restore" | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");

  function closeModal() {
    setModal(null);
    setConfirmText("");
    setDeleteError("");
  }

  function handleArchive() {
    startTransition(async () => {
      const result = await archivePatient(patientId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Patient archivé");
        closeModal();
        router.push("/admin/patients");
      }
    });
  }

  function handleRestore() {
    startTransition(async () => {
      const result = await restorePatient(patientId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Patient restauré");
        closeModal();
        router.refresh();
      }
    });
  }

  function handleDelete() {
    if (confirmText !== "SUPPRIMER") return;
    setDeleteError("");
    startTransition(async () => {
      const result = await deletePatientPermanently(patientId);
      if (result.error) {
        setDeleteError(result.error);
      } else {
        toast.success("Patient supprimé définitivement");
        closeModal();
        router.push("/admin/patients");
      }
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="px-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          {statut === "archive" ? (
            <DropdownMenuItem onClick={() => setModal("restore")}>
              <RotateCcw className="h-4 w-4 mr-2 text-green-600" />
              Restaurer le patient
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setModal("archive")}>
              <Archive className="h-4 w-4 mr-2" />
              Archiver le patient
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setModal("delete")}
            className="text-destructive focus:text-destructive focus:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer définitivement
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal : Archiver */}
      <Dialog open={modal === "archive"} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Archiver {patientName} ?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Le patient sera masqué de la liste principale, mais toutes ses données
            seront conservées. Vous pourrez le restaurer à tout moment.
          </p>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={closeModal} disabled={isPending}>
              Annuler
            </Button>
            <Button size="sm" onClick={handleArchive} disabled={isPending}>
              {isPending ? "Archivage…" : "Archiver"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal : Restaurer */}
      <Dialog open={modal === "restore"} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Restaurer {patientName} ?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Le patient repassera au statut actif et réapparaîtra dans la liste.
          </p>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={closeModal} disabled={isPending}>
              Annuler
            </Button>
            <Button size="sm" onClick={handleRestore} disabled={isPending}>
              {isPending ? "Restauration…" : "Restaurer"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal : Supprimer définitivement */}
      <Dialog open={modal === "delete"} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              ⚠️ Supprimer définitivement {patientName} ?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Cette action est <strong className="text-foreground">IRRÉVERSIBLE</strong>.
            Toutes les données du patient seront effacées : fiche, plan de soins,
            historique des visites, transmissions. Cette suppression est conforme au
            RGPD (droit à l'oubli).
          </p>
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">
              Tapez <span className="font-bold text-destructive">SUPPRIMER</span> pour confirmer
            </label>
            <Input
              value={confirmText}
              onChange={(e) => {
                setConfirmText(e.target.value);
                setDeleteError("");
              }}
              placeholder="SUPPRIMER"
              className="font-mono"
            />
          </div>
          <AnimatePresence>
            {deleteError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2"
              >
                {deleteError}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={closeModal} disabled={isPending}>
              Annuler
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={confirmText !== "SUPPRIMER" || isPending}
            >
              {isPending ? "Suppression…" : "Supprimer définitivement"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
