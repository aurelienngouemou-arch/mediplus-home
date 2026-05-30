"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ContactFormData } from "@/types";

const phoneRegex = /^(\+32|0032|0)[1-9][0-9]{7,8}$/;

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contactPage.form");
  const tc = useTranslations("common");
  const [formState, setFormState] = useState<FormState>("idle");

  const contactSchema = z.object({
    fullName: z.string().min(2, t("errors.fullName")),
    phone: z.string().regex(phoneRegex, t("errors.phone")),
    email: z.email(t("errors.email")),
    commune: z.enum(["overijse", "hoeilaart", "tervuren", "autre"], {
      error: t("errors.commune"),
    }),
    requestType: z.enum(["rendez-vous", "information", "devis", "autre"], {
      error: t("errors.requestType"),
    }),
    message: z.string().optional(),
    rgpdConsent: z.boolean().refine((v) => v === true, {
      message: t("errors.rgpdConsent"),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setFormState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: data.fullName,
          telephone: data.phone,
          email: data.email,
          commune: data.commune,
          type_demande: data.requestType,
          message: data.message,
          rgpd_consent: data.rgpdConsent,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
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
        <h3 className="font-semibold text-foreground text-lg mb-2">{t("successTitle")}</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">{t("successText")}</p>
        <button
          onClick={() => setFormState("idle")}
          className="text-sm text-primary underline hover:no-underline"
        >
          {tc("sendAnotherMessage")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Full name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
          {t("fullName")} <span className="text-destructive" aria-hidden="true">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          placeholder={t("fullNamePlaceholder")}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p id="fullName-error" role="alert" className="mt-1 text-xs text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            {t("phone")} <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            placeholder={t("phonePlaceholder")}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            {t("email")} <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            placeholder={t("emailPlaceholder")}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Commune + Request type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="commune" className="block text-sm font-medium text-foreground mb-1.5">
            {t("commune")} <span className="text-destructive" aria-hidden="true">*</span>
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
            <option value="" disabled>{t("communePlaceholder")}</option>
            <option value="overijse">Overijse</option>
            <option value="hoeilaart">Hoeilaart</option>
            <option value="tervuren">Tervuren</option>
            <option value="autre">{t("communeOther")}</option>
          </select>
          {errors.commune && (
            <p id="commune-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.commune.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="requestType" className="block text-sm font-medium text-foreground mb-1.5">
            {t("requestType")} <span className="text-destructive" aria-hidden="true">*</span>
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
            <option value="" disabled>{t("requestTypePlaceholder")}</option>
            <option value="rendez-vous">{t("requestTypeAppointment")}</option>
            <option value="information">{t("requestTypeInfo")}</option>
            <option value="devis">{t("requestTypeQuote")}</option>
            <option value="autre">{t("requestTypeOther")}</option>
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
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          {t("message")}{" "}
          <span className="text-muted-foreground font-normal">({tc("optional")})</span>
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition resize-none"
          placeholder={t("messagePlaceholder")}
          {...register("message")}
        />
      </div>

      {/* RGPD */}
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
            {t("rgpdConsentText")}{" "}
            <a href="#" className="text-primary underline hover:no-underline">{t("rgpdLink")}</a>.{" "}
            <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          {errors.rgpdConsent && (
            <p id="rgpd-error" role="alert" className="mt-1 text-xs text-destructive">
              {errors.rgpdConsent.message}
            </p>
          )}
        </div>
      </div>

      {formState === "error" && (
        <div
          className="flex items-start gap-2 rounded-lg bg-destructive/[0.08] border border-destructive/20 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            {t("errorTextPre")}{" "}
            <a href="tel:+32486364888" className="underline hover:no-underline font-medium">
              {t("errorLink")}
            </a>
            .
          </span>
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
            {t("submitting")}
          </>
        ) : (
          t("submit")
        )}
      </button>
    </form>
  );
}
