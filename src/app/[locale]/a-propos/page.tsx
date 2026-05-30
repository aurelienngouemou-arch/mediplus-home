import { MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBaseUrl } from "@/lib/seo";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/animations/FadeIn";
import StorySection from "@/components/about/StorySection";
import ValuesSection from "@/components/about/ValuesSection";
import TeamSection from "@/components/about/TeamSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  const base = getBaseUrl();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}/${locale}/a-propos`,
      languages: {
        fr: `${base}/fr/a-propos`,
        nl: `${base}/nl/a-propos`,
        en: `${base}/en/a-propos`,
        "x-default": `${base}/fr/a-propos`,
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });

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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeIn direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              {t("heroBadge")}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      <StorySection />
      <ValuesSection />
      <TeamSection />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t("ctaSubtitle")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t("ctaButton")}
            </Link>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-foreground">
              <span>{t("ctaBadge1")}</span>
              <span>·</span>
              <span>{t("ctaBadge2")}</span>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
