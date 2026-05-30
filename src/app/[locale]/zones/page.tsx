import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowRight, Phone } from "lucide-react";
import { ALL_ZONES } from "@/lib/zones-data";
import { CONTACT_INFO } from "@/lib/constants";
import { getBaseUrl } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import StylizedMap from "@/components/maps/StylizedMap";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.zones" });
  const base = getBaseUrl();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}/${locale}/zones`,
      languages: {
        fr: `${base}/fr/zones`,
        nl: `${base}/nl/zones`,
        en: `${base}/en/zones`,
        "x-default": `${base}/fr/zones`,
      },
    },
  };
}

export default async function ZonesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <>
      {/* Hero */}
      <section
        role="region"
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-20 md:pt-28 pb-12 md:pb-20"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="container mx-auto max-w-5xl px-4 text-center">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              {t("zonesPage.heroBadge")}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
              {t("zonesPage.heroTitle")}
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              {t("zonesPage.heroSubtitle")}
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-white shadow-md overflow-hidden p-6">
              <StylizedMap aria-label={t("zonesPage.mapLabel")} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Zone cards */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
                {t("zonesPage.sectionTitle")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t("zonesPage.sectionSubtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {ALL_ZONES.map((zone) => (
              <StaggerItem key={zone.slug}>
                <div className="group flex flex-col h-full bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all overflow-hidden">
                  <div className="bg-gradient-to-br from-primary/8 to-secondary/5 p-6 border-b border-border">
                    <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                      {zone.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{zone.region}</p>
                  </div>
                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {zone.shortDescription}
                    </p>
                    <Link
                      href={`/zones/${zone.slug}`}
                      className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors group-hover:shadow-md group-hover:shadow-primary/20"
                    >
                      {t("zonesPage.discoverBtn")}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Out-of-zone CTA */}
      <section className="py-10 md:py-16 bg-muted">
        <div className="container mx-auto max-w-4xl px-4">
          <FadeIn direction="up">
            <div className="bg-white border border-border rounded-2xl shadow-sm p-5 sm:p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
                {t("zonesPage.outOfZoneTitle")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                {t("zonesPage.outOfZoneSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                  {t("zonesPage.outOfZoneContact")}
                </Link>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="inline-flex items-center gap-2 border border-border rounded-full px-6 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {t("zonesPage.outOfZoneCall")}
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
