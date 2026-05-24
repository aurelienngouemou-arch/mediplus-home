"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import type { ContactFormData } from "@/types";

const phoneRegex = /^(\+32|0032|0)[1-9][0-9]{7,8}$/;

const contactSchema = z.object({
  fullName: z.string().min(2, "Veuillez entrer votre nom complet"),
  phone: z.string().regex(phoneRegex, "Numéro de téléphone belge invalide (ex: +32 470 00 00 00)"),
  email: z.email("Adresse email invalide"),
  commune: z.enum(["overijse", "hoeilaart", "tervuren", "autre"], {
    error: "Veuillez sélectionner une commune",
  }),
  requestType: z.enum(["rendez-vous", "information", "devis", "autre"], {
    error: "Veuillez sélectionner un type de demande",
  }),
  message: z.string().optional(),
  rgpdConsent: z.boolean().refine((v) => v === true, {
    message: "Vous devez accepter la politique de confidentialité",
  }),
});

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // TODO Phase 5: connecter à l'API route /api/contact
  async function onSubmit(data: ContactFormData) {
    setFormState("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      setFormState("success");
      reset();
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/[0.05] p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-7 h-7 text-accent" aria-hidden="true" />
        </div>
        <h3 className="font-semibold text-foreground text-lg mb-2">
          Message envoyé !
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Merci pour votre message. Nous vous contactons en moins de 2 heures
          aux coordonnées que vous avez fournies.
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="text-sm text-primary underline hover:no-underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Nom complet */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Nom complet <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          placeholder="Marie Dupont"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="mt-1 text-xs text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Téléphone + Email en grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Téléphone <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            placeholder="+32 470 00 00 00"
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            placeholder="marie@exemple.com"
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Commune + Type en grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="commune"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Commune <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <select
            id="commune"
            aria-required="true"
            aria-invalid={!!errors.commune}
            aria-describedby={errors.commune ? "commune-error" : undefined}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            {...register("commune")}
            defaultValue=""
          >
            <option value="" disabled>
              Sélectionnez…
            </option>
            <option value="overijse">Overijse</option>
            <option value="hoeilaart">Hoeilaart</option>
            <option value="tervuren">Tervuren</option>
            <option value="autre">Autre commune</option>
          </select>
          {errors.commune && (
            <p id="commune-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.commune.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="requestType"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Type de demande <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <select
            id="requestType"
            aria-required="true"
            aria-invalid={!!errors.requestType}
            aria-describedby={errors.requestType ? "requestType-error" : undefined}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            {...register("requestType")}
            defaultValue=""
          >
            <option value="" disabled>
              Sélectionnez…
            </option>
            <option value="rendez-vous">Prendre rendez-vous</option>
            <option value="information">Demande d&apos;information</option>
            <option value="devis">Devis personnalisé</option>
            <option value="autre">Autre</option>
          </select>
          {errors.requestType && (
            <p id="requestType-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.requestType.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Message{" "}
          <span className="text-muted-foreground font-normal">(optionnel)</span>
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition resize-none"
          placeholder="Décrivez votre situation ou votre besoin en quelques mots…"
          {...register("message")}
        />
      </div>

      {/* Consentement RGPD */}
      <div className="flex items-start gap-3">
        <input
          id="rgpdConsent"
          type="checkbox"
          aria-required="true"
          aria-invalid={!!errors.rgpdConsent}
          aria-describedby={errors.rgpdConsent ? "rgpd-error" : undefined}
          className="mt-0.5 h-4 w-4 rounded border-input accent-primary focus:ring-ring"
          {...register("rgpdConsent")}
        />
        <div>
          <label htmlFor="rgpdConsent" className="text-sm text-muted-foreground">
            J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément
            à la{" "}
            <a href="#" className="text-primary underline hover:no-underline">
              politique de confidentialité
            </a>
            . <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          {errors.rgpdConsent && (
            <p id="rgpd-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.rgpdConsent.message}
            </p>
          )}
        </div>
      </div>

      {formState === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/[0.08] border border-destructive/20 px-4 py-3 text-sm text-destructive" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Une erreur s&apos;est produite. Veuillez réessayer ou nous appeler directement.
        </div>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        {formState === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </button>
    </form>
  );
}
