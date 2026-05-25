import { MapPin } from "lucide-react";
import type { ZoneData } from "@/lib/zones-data";
import StylizedMap from "@/components/maps/StylizedMap";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface CoverageZoneProps {
  zone: ZoneData;
}

export default function CoverageZone({ zone }: CoverageZoneProps) {
  return (
    <section
      role="region"
      aria-label={`Zone de couverture à ${zone.name}`}
      className="py-12 md:py-20 bg-muted"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Nous couvrons toute la commune de{" "}
              <span className="text-primary">{zone.name}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Chaque quartier, chaque hameau. Nos infirmiers connaissent le
              territoire et interviennent partout dans la commune.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Neighborhoods list */}
          <FadeIn direction="left" delay={0.05}>
            <div className="bg-white rounded-2xl border border-border shadow-sm p-5 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Quartiers &amp; hameaux desservis
              </h3>
              <StaggerContainer className="space-y-3">
                {zone.neighborhoods.map((neighborhood) => (
                  <StaggerItem key={neighborhood}>
                    <div className="flex items-center gap-3 group">
                      <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <MapPin
                          className="size-4 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="font-medium text-foreground">
                        {neighborhood}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>

          {/* Map */}
          <FadeIn direction="right" delay={0.1}>
            <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden p-4">
              <StylizedMap highlightZone={zone.slug} />
            </div>
          </FadeIn>
        </div>

        {/* Neighboring zones */}
        <FadeIn direction="up" delay={0.15}>
          <div className="mt-10 bg-white border border-border rounded-2xl p-6 text-center shadow-sm">
            <p className="text-muted-foreground">
              Vous habitez dans un village voisin ?{" "}
              <a
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
                Contactez-nous
              </a>{" "}
              pour vérifier si nous intervenons chez vous.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
