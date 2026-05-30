import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ALL_SERVICES, getServiceData } from "@/lib/services-data";
import { CONTACT_INFO, SITE_URL } from "@/lib/constants";
import { Phone, MessageCircle, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import IntroService from "@/components/services/IntroService";
import TargetSection from "@/components/services/TargetSection";
import IncludedSection from "@/components/services/IncludedSection";
import ProcessService from "@/components/services/ProcessService";
import ReimbursementSection from "@/components/services/ReimbursementSection";
import FaqService from "@/components/services/FaqService";
import RelatedServices from "@/components/services/RelatedServices";
import FadeIn from "@/components/animations/FadeIn";
import { getBaseUrl } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ["fr", "nl", "en"];
  return locales.flatMap((locale) =>
    ALL_SERVICES.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceData(slug);
  if (!service) return {};

  const t = await getTranslations({ locale });
  const base = getBaseUrl();
  const name = t(`services.${slug}.name`);
  const subtitle = t(`services.${slug}.heroSubtitle`);
  const url = `${base}/${locale}/services/${slug}`;

  return {
    title: name,
    description: subtitle.substring(0, 160),
    alternates: {
      canonical: url,
      languages: {
        fr: `${base}/fr/services/${slug}`,
        nl: `${base}/nl/services/${slug}`,
        en: `${base}/en/services/${slug}`,
        "x-default": `${base}/fr/services/${slug}`,
      },
    },
    openGraph: {
      title: `${name} | Mediplus Home`,
      description: subtitle.substring(0, 160),
      url,
      type: "website",
      locale: locale === "en" ? "en_BE" : locale === "nl" ? "nl_BE" : "fr_BE",
      siteName: "Mediplus Home",
    },
  };
}

function MedicalProcedureJsonLd({
  service,
  locale,
  name,
}: {
  service: ReturnType<typeof getServiceData>;
  locale: string;
  name: string;
}) {
  if (!service) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description: name,
    procedureType: "Therapeutic",
    bodyLocation: "Home",
    provider: {
      "@type": "MedicalBusiness",
      name: "Mediplus Home",
      telephone: CONTACT_INFO.phone,
      areaServed: ["Overijse", "Hoeilaart", "Tervuren"],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = getServiceData(slug);
  if (!service) notFound();

  const t = await getTranslations({ locale });
  const Icon = service.icon;
  const name = t(`services.${slug}.name`);
  const heroTitle = t(`services.${slug}.heroTitle`);
  const heroSubtitle = t(`services.${slug}.heroSubtitle`);
  const heroBadge = t(`services.${slug}.heroBadge`);

  return (
    <>
      <MedicalProcedureJsonLd service={service} locale={locale} name={name} />

      {/* Hero service */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-gradient-to-br from-primary/[0.05] via-background to-secondary/[0.05] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(197 83% 22%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeIn direction="up">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors">
                {t("servicePage.breadcrumbHome")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/services" className="hover:text-primary transition-colors">
                {t("servicePage.breadcrumbServices")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-foreground font-medium">{t(`services.${slug}.shortName`)}</span>
            </nav>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Icon className="w-4 h-4" aria-hidden="true" />
              {heroBadge}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-5 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {t("servicePage.ctaBook")}
              </Link>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2 border border-border bg-background text-foreground rounded-full px-6 py-3 font-medium hover:border-primary/40 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                t("servicePage.badgeMutual"),
                t("servicePage.badgeAvailable"),
                t("servicePage.badgeHome"),
              ].map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content sections — uses original French data */}
      <IntroService service={service} />
      <TargetSection forWho={service.forWho} />
      <IncludedSection whatIncluded={service.whatIncluded} />
      <ProcessService howItWorks={service.howItWorks} />
      <ReimbursementSection reimbursement={service.reimbursement} />
      <FaqService faq={service.faq} serviceName={t(`services.${slug}.shortName`)} />
      <RelatedServices relatedSlugs={service.relatedServices} currentSlug={slug} />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
              {t("servicePage.ctaTitle", { service: t(`services.${slug}.shortName`).toLowerCase() })}
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {t("servicePage.ctaSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary rounded-full px-6 py-3 font-medium hover:bg-white/90 transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {t("servicePage.ctaBook")}
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.replace(/\+/g, "")}`}
                className="inline-flex items-center gap-2 border border-white/40 bg-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t("servicePage.ctaWhatsApp")}
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2 border border-white/40 bg-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {t("servicePage.ctaCall")}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
