import type { ZoneData } from "@/lib/zones-data";
import StylizedMap from "@/components/maps/StylizedMap";
import FadeIn from "@/components/animations/FadeIn";

interface IntroZoneProps {
  zone: ZoneData;
}

export default function IntroZone({ zone }: IntroZoneProps) {
  return (
    <section
      role="region"
      aria-label={`Présentation de ${zone.name}`}
      className="py-20 bg-background"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <FadeIn direction="left">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-muted text-primary rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                {zone.region} · {zone.population} hab.
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                {zone.introTitle}
              </h2>
              <div className="space-y-4">
                {zone.introText.map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {zone.languages.map((lang) => (
                  <span
                    key={lang}
                    className="inline-flex items-center bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 text-sm font-semibold"
                  >
                    {lang}
                  </span>
                ))}
                <span className="inline-flex items-center bg-muted text-muted-foreground rounded-full px-3 py-0.5 text-sm">
                  INAMI agréé
                </span>
                <span className="inline-flex items-center bg-muted text-muted-foreground rounded-full px-3 py-0.5 text-sm">
                  7j/7
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Map column */}
          <FadeIn direction="right" delay={0.1}>
            <div className="relative rounded-2xl border border-border bg-white shadow-sm overflow-hidden p-4">
              <StylizedMap
                highlightZone={zone.slug}
                aria-label={`Carte montrant ${zone.name} dans la région`}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
