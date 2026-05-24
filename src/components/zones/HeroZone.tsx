import Link from "next/link";
import { ChevronRight, MapPin, Clock, Navigation, Grape, Trees, Globe } from "lucide-react";
import type { ZoneData } from "@/lib/zones-data";
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

export default function HeroZone({ zone }: HeroZoneProps) {
  return (
    <section
      role="region"
      aria-label={`Infirmier à domicile à ${zone.name}`}
      className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-28 pb-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <FadeIn direction="down" delay={0}>
          <nav aria-label="Fil d'Ariane" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </li>
              <li>
                <Link
                  href="/zones"
                  className="hover:text-primary transition-colors"
                >
                  Zones
                </Link>
              </li>
              <li>
                <ChevronRight className="size-3.5" aria-hidden="true" />
              </li>
              <li className="text-foreground font-medium">{zone.name}</li>
            </ol>
          </nav>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text content */}
          <div>
            {/* Badge */}
            <FadeIn direction="up" delay={0.05}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
                {(() => {
                  const AngleIcon = ANGLE_ICONS[zone.heroAngle];
                  return <AngleIcon className="size-4" aria-hidden="true" />;
                })()}
                Soins infirmiers · {zone.name}
              </div>
            </FadeIn>

            {/* H1 */}
            <FadeIn direction="up" delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
                Infirmier à domicile à{" "}
                <span className="text-primary">{zone.name}</span>
              </h1>
            </FadeIn>

            {/* Subtitle */}
            <FadeIn direction="up" delay={0.15}>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                {zone.heroSubtitle}
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn direction="up" delay={0.2}>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                  Prendre rendez-vous
                </Link>
                <a
                  href="tel:+32400000000"
                  aria-label={`Appeler notre cabinet infirmier pour ${zone.name}`}
                  className="inline-flex items-center gap-2 border border-border bg-background rounded-full px-6 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Appeler
                </a>
              </div>
            </FadeIn>

            {/* Mini stats */}
            <FadeIn direction="up" delay={0.25}>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-2.5 shadow-sm">
                  <MapPin className="size-4 text-primary shrink-0" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    Code postal :{" "}
                    <strong className="text-foreground">{zone.postalCode}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-2.5 shadow-sm">
                  <Clock className="size-4 text-primary shrink-0" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    Délai d&apos;intervention :{" "}
                    <strong className="text-foreground">
                      {zone.interventionTime}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white border border-border rounded-xl px-4 py-2.5 shadow-sm">
                  <Navigation className="size-4 text-primary shrink-0" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    Bruxelles :{" "}
                    <strong className="text-foreground">
                      {zone.distanceBrussels}
                    </strong>
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right column — zone image */}
          <HeroZoneImage
            slug={zone.slug}
            postalCode={zone.postalCode}
            name={zone.name}
            interventionTime={zone.interventionTime}
          />
        </div>
      </div>
    </section>
  );
}
