import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CONTACT_INFO } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/animations/FadeIn";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default async function CTASection() {
  const t = await getTranslations("ctaSection");

  return (
    <section className="relative py-12 md:py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, hsl(197,83%,18%) 0%, hsl(188,90%,28%) 55%, hsl(188,96%,36%) 100%)" }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/[0.04] -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/[0.04] translate-y-1/3 -translate-x-1/4 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
        style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn direction="up">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-4">
            {t("availability")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              aria-label={`Appeler le ${CONTACT_INFO.phoneDisplay}`}
              className="inline-flex items-center gap-2.5 bg-white text-primary rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-black/10 hover:bg-white/95 hover:-translate-y-0.5 transition-all"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {CONTACT_INFO.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${CONTACT_INFO.phone.replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white rounded-full px-8 py-3.5 text-base font-semibold shadow-lg shadow-black/10 hover:bg-[#1ebe5d] hover:-translate-y-0.5 transition-all"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>

          <p className="mt-6 text-white/50 text-sm">
            {t("orText")}{" "}
            <Link
              href="/contact"
              className="text-white/80 underline underline-offset-4 hover:text-white transition-colors"
            >
              {t("formLink")}
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
