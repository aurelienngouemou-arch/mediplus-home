import { ACTES_TECHNIQUES } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export default function ActesSection() {
  return (
    <section className="py-14 md:py-20 bg-muted/25 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <FadeIn direction="up" className="text-center mb-10 md:mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Actes infirmiers
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-2">
            Tous les actes infirmiers à domicile
          </h2>
          <p className="text-muted-foreground">
            Conventionnés INAMI, remboursés par votre mutuelle.
          </p>
        </FadeIn>

        {/* Mobile : scroll horizontal — Desktop : grille 4 col */}
        <StaggerContainer
          staggerDelay={0.06}
          className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-3"
        >
          {ACTES_TECHNIQUES.map((acte) => (
            <StaggerItem key={acte.slug}>
              <ActeCard acte={acte} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile scroll */}
        <div className="md:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-none">
            {ACTES_TECHNIQUES.map((acte) => (
              <div key={acte.slug} className="snap-start shrink-0 w-[120px]">
                <ActeCard acte={acte} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ActeCard({
  acte,
}: {
  acte: (typeof ACTES_TECHNIQUES)[number];
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-border hover:border-accent/40 hover:shadow-sm transition-all text-center group cursor-default">
      {/* Cercle icône */}
      <div className="w-12 h-12 rounded-full bg-primary/[0.07] flex items-center justify-center group-hover:bg-primary/[0.13] transition-colors shrink-0">
        <acte.icon className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      {/* Nom */}
      <p className="text-xs font-medium text-foreground leading-tight">
        {acte.name}
      </p>
    </div>
  );
}
