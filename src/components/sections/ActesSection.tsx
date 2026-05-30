import { getTranslations } from "next-intl/server";
import { ACTES_TECHNIQUES } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export default async function ActesSection() {
  const t = await getTranslations();

  return (
    <section className="py-14 md:py-20 bg-muted/25 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-10 md:mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            {t("actesSection.label")}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-2">
            {t("actesSection.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("actesSection.subtitle")}
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.06}
          className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-3"
        >
          {ACTES_TECHNIQUES.map((acte) => (
            <StaggerItem key={acte.slug}>
              <ActeCard name={t(`actes.${acte.slug}`)} icon={acte.icon} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="md:hidden -mx-4 px-4" aria-hidden="true">
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
            {ACTES_TECHNIQUES.map((acte) => (
              <div key={acte.slug} className="snap-start shrink-0 w-[120px]">
                <ActeCard name={t(`actes.${acte.slug}`)} icon={acte.icon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActeCard({
  name,
  icon: Icon,
}: {
  name: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-border hover:border-accent/40 hover:shadow-sm transition-all text-center group cursor-default">
      <div className="w-12 h-12 rounded-full bg-primary/[0.07] flex items-center justify-center group-hover:bg-primary/[0.13] transition-colors shrink-0">
        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      <p className="text-xs font-medium text-foreground leading-tight">{name}</p>
    </div>
  );
}
