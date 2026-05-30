import { ChevronRight, Grape, Trees, Globe } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ZoneData } from "@/lib/zones-data";
import { CONTACT_INFO } from "@/lib/constants";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/animations/FadeIn";
import HeroZoneImage from "@/components/zones/HeroZoneImage";

const ANGLE_ICONS = {
  terroir: Grape,
  nature: Trees,
  international: Globe,
} as const;

interface HeroZoneProps {
  zone: ZoneData;
}

export default async function HeroZone({ zone }: HeroZoneProps) {
  const t = await getTranslations();

  return (
    <section
      role="region"
      aria-label={`${t("navigation.home")} · ${zone.name}`}
      className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-20 md:pt-28 pb-12 md:pb-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <FadeIn direction="down" delay={0}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {t("navigation.home")}
                </Link>
              </li>
              <li><ChevronRight className="size-3.5" aria-hidden="true" /></li>
              <li>
                <Link href="/zones" className="hover:text-primary transition-colors">
                  {t("navigation.zones")}
                </Link>
              </li>
              <li><ChevronRight className="size-3.5" aria-hidden="true" /></li>
              <li className="text-foreground font-medium">{zone.name}</li>
            </ol>
          </nav>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            <FadeIn direction="up" delay={0.05}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
                {(() => {
                  const AngleIcon = ANGLE_ICONS[zone.heroAngle];
                  return <AngleIcon className="size-4" aria-hidden="true" />;
                })()}
                {t("hero.badge")} · {zone.name}
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
                {zone.name}
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.15}>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                {zone.heroSubtitle}
              </p>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                  {t("zonePage.ctaBook")}
                </Link>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  aria-label={`${t("zonePage.ctaCall")} · ${zone.name}`}
                  className="inline-flex items-center gap-2 border border-border bg-background rounded-full px-6 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  {t("zonePage.ctaCall")}
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right column */}
          <HeroZoneImage slug={zone.slug} name={zone.name} />
        </div>
      </div>
    </section>
  );
}
