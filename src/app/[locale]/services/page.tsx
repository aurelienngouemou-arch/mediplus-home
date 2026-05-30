import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ALL_SERVICES } from "@/lib/services-data";
import { CONTACT_INFO } from "@/lib/constants";
import { getBaseUrl } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.services" });
  const base = getBaseUrl();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}/${locale}/services`,
      languages: {
        fr: `${base}/fr/services`,
        nl: `${base}/nl/services`,
        en: `${base}/en/services`,
        "x-default": `${base}/fr/services`,
      },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      {/* Hero */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-gradient-to-br from-primary/[0.04] via-background to-secondary/[0.04] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, hsl(197 83% 22%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeIn direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t("servicesPage.heroBadge")}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              {t("servicesPage.heroTitle")}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.15} className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              t("servicesPage.heroBadgeAll"),
              t("servicesPage.heroBadge7j"),
              t("servicesPage.heroBadgeRapid"),
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {badge}
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Grid services */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer
            staggerDelay={0.08}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {ALL_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <StaggerItem key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex flex-col items-center text-center rounded-xl border border-border bg-card p-6 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-200 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <h2 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug">
                      {t(`services.${service.slug}.shortName`)}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      {t(`services.${service.slug}.heroSubtitle`).substring(0, 100)}…
                    </p>
                    <div className="flex items-center justify-center gap-1 text-sm font-medium text-primary mt-auto">
                      {t("servicesPage.learnMore")}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              {t("servicesPage.ctaTitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("servicesPage.ctaSubtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t("servicesPage.ctaContact")}
              </Link>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2 border border-border bg-background text-foreground rounded-full px-6 py-3 font-medium hover:border-primary/40 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
