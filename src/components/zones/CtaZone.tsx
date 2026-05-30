import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ZoneData } from "@/lib/zones-data";
import { CONTACT_INFO } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/animations/FadeIn";

interface CtaZoneProps {
  zone: ZoneData;
}

export default async function CtaZone({ zone }: CtaZoneProps) {
  const t = await getTranslations();
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phone.replace(/\D/g, "")}`;

  return (
    <section
      role="region"
      aria-label={`${t("zonePage.ctaBook")} · ${zone.name}`}
      className="py-14 md:py-24 bg-gradient-to-br from-primary via-secondary to-primary/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 text-center">
        <FadeIn direction="up">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            {t("ctaSection.availability")}
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            {zone.name}
          </h2>

          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            {t("common.available247")} · {t("common.allMutualities")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              aria-label={`${t("zonePage.ctaCall")} · ${zone.name}`}
              className="inline-flex items-center gap-2.5 bg-white text-primary rounded-full px-7 py-3.5 font-semibold hover:bg-white/90 transition-colors shadow-lg shadow-black/10 w-full sm:w-auto justify-center"
            >
              <Phone className="size-4" aria-hidden="true" />
              {t("zonePage.ctaCall")}
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t("zonePage.ctaWhatsApp")} · ${zone.name}`}
              className="inline-flex items-center gap-2.5 bg-white/15 border border-white/30 text-white rounded-full px-7 py-3.5 font-semibold hover:bg-white/25 transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {t("zonePage.ctaWhatsApp")}
            </a>

            <Link
              href="/contact"
              aria-label={`${t("zonePage.ctaBook")} · ${zone.name}`}
              className="inline-flex items-center gap-2.5 bg-accent/90 text-primary rounded-full px-7 py-3.5 font-semibold hover:bg-accent transition-colors shadow-lg shadow-black/10 w-full sm:w-auto justify-center"
            >
              <CalendarCheck className="size-4" aria-hidden="true" />
              {t("zonePage.ctaBook")}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
