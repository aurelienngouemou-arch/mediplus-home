import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CONTACT_INFO } from "@/lib/constants";
import StylizedMap from "@/components/maps/StylizedMap";

export default async function ContactInfo() {
  const t = await getTranslations("contactInfo");

  return (
    <div className="space-y-4">
      {/* Phone */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center">
          <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            {t("hoursTitle")}
          </p>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="text-primary font-semibold text-lg hover:underline"
          >
            {CONTACT_INFO.phoneDisplay}
          </a>
          <p className="text-xs text-muted-foreground mt-1">
            {t("hoursWeekdays")} · {t("hoursWeekend")}
          </p>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            WhatsApp
          </p>
          <a
            href={`https://wa.me/${CONTACT_INFO.phone.replace(/\+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#22c55e] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            WhatsApp
          </a>
          <p className="text-xs text-muted-foreground mt-2">{t("responseTime")}</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Email
          </p>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-primary text-sm hover:underline break-all"
          >
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>

      {/* Zone */}
      <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            {t("coverageTitle")}
          </p>
          <p className="text-sm text-foreground font-medium">{t("coverageText")}</p>
          <p className="text-xs text-muted-foreground mt-1">{t("languagesText")}</p>
        </div>
      </div>

      {/* Map */}
      <div className="rounded-xl border border-border overflow-hidden shadow-sm">
        <StylizedMap className="w-full" />
      </div>
    </div>
  );
}
