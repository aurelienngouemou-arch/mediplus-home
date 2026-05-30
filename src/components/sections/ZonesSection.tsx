import { MapPin, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

const ZONE_SLUGS = ["overijse", "hoeilaart", "tervuren"] as const;

const ZONE_COLORS: Record<string, string> = {
  overijse: "from-primary/10 to-primary/5",
  hoeilaart: "from-secondary/10 to-secondary/5",
  tervuren: "from-accent/10 to-accent/5",
};

function RegionMap() {
  return (
    <svg
      viewBox="0 0 320 300"
      className="w-full h-full"
      aria-label="Carte simplifiée de la région desservie"
      role="img"
    >
      <path
        d="M70,30 L160,15 L250,35 L295,90 L290,170 L260,235 L195,278 L120,270 L60,230 L28,160 L32,90 Z"
        fill="hsl(210,40%,96%)"
        stroke="hsl(214,32%,85%)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M160,15 L160,278" stroke="hsl(214,32%,82%)" strokeWidth="1" strokeDasharray="5,4" />
      <path d="M28,150 L295,150" stroke="hsl(214,32%,82%)" strokeWidth="1" strokeDasharray="5,4" />
      <circle cx="160" cy="70" r="18" fill="hsl(214,32%,91%)" stroke="hsl(214,32%,82%)" strokeWidth="1" />
      <text x="160" y="66" textAnchor="middle" fontSize="7" fill="hsl(215,16%,47%)" fontFamily="sans-serif">BXL</text>
      <circle cx="210" cy="115" r="11" fill="hsl(197,83%,22%)" fillOpacity="0.2" stroke="hsl(197,83%,22%)" strokeWidth="1.5" />
      <circle cx="210" cy="115" r="4" fill="hsl(197,83%,22%)" />
      <text x="225" y="113" fontSize="9" fill="hsl(197,83%,22%)" fontFamily="sans-serif" fontWeight="600">Tervuren</text>
      <circle cx="155" cy="175" r="11" fill="hsl(188,90%,31%)" fillOpacity="0.2" stroke="hsl(188,90%,31%)" strokeWidth="1.5" />
      <circle cx="155" cy="175" r="4" fill="hsl(188,90%,31%)" />
      <text x="170" y="173" fontSize="9" fill="hsl(188,90%,31%)" fontFamily="sans-serif" fontWeight="600">Hoeilaart</text>
      <circle cx="195" cy="215" r="11" fill="hsl(188,96%,44%)" fillOpacity="0.2" stroke="hsl(188,96%,38%)" strokeWidth="1.5" />
      <circle cx="195" cy="215" r="4" fill="hsl(188,96%,38%)" />
      <text x="210" y="213" fontSize="9" fill="hsl(188,96%,38%)" fontFamily="sans-serif" fontWeight="600">Overijse</text>
      <path d="M210,115 L155,175" stroke="hsl(197,83%,22%)" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3,3" />
      <path d="M155,175 L195,215" stroke="hsl(197,83%,22%)" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3,3" />
    </svg>
  );
}

export default async function ZonesSection() {
  const t = await getTranslations("zonesSection");

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="bg-white rounded-3xl border border-border shadow-sm p-6 aspect-square max-w-md mx-auto lg:max-w-none">
              <RegionMap />
              <p className="text-center text-xs text-muted-foreground mt-3">
                {t("mapCaption")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.1} className="flex flex-col gap-4">
            {ZONE_SLUGS.map((slug) => (
              <StaggerItem key={slug}>
                <div
                  className={`bg-gradient-to-r ${ZONE_COLORS[slug]} border border-border rounded-2xl p-5 flex items-start gap-4 hover:shadow-md transition-all`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-border flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-base mb-2 capitalize">
                      {slug.charAt(0).toUpperCase() + slug.slice(1)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(slug)}
                    </p>
                  </div>
                  <Link
                    href={`/zones/${slug}`}
                    aria-label={`${slug}`}
                    className="shrink-0 w-8 h-8 rounded-full bg-white/60 border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </StaggerItem>
            ))}

            <FadeIn direction="up" delay={0.3}>
              <p className="text-sm text-muted-foreground text-center lg:text-left pt-2">
                {t("neighborsQuestion")}{" "}
                <Link href="/contact" className="text-primary font-medium hover:underline">
                  {t("contactUs")}
                </Link>{" "}
                {t("neighborsText")}
              </p>
            </FadeIn>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
