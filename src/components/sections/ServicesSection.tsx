import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export default function ServicesSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Fond discret à points */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(222,47%,11%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <FadeIn direction="up" className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Expertise médicale
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Nos prises en charge
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Une expertise médicale adaptée à chaque situation.
          </p>
        </FadeIn>

        {/* Grille 4 colonnes desktop */}
        <StaggerContainer
          staggerDelay={0.07}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <div className="group relative bg-card border border-border rounded-2xl p-5 flex flex-col gap-3 items-center text-center hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 transition-all duration-300 h-full">
                {/* Icône */}
                <div className="w-11 h-11 rounded-xl bg-primary/[0.07] flex items-center justify-center shrink-0 group-hover:bg-primary/[0.13] transition-colors">
                  <service.icon
                    className="w-5 h-5 text-primary"
                    aria-hidden="true"
                  />
                </div>

                {/* Texte */}
                <div className="flex flex-col gap-1.5 flex-1 w-full">
                  <h3 className="font-semibold text-foreground text-sm leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {service.description}
                  </p>
                </div>

                {/* Lien */}
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center justify-center gap-1 text-xs font-medium text-primary/70 group-hover:text-primary transition-colors"
                  aria-label={`En savoir plus sur : ${service.name}`}
                >
                  En savoir plus
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>

                {/* Trait accent au hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA bas */}
        <FadeIn direction="up" delay={0.3} className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary border border-primary/20 rounded-full px-6 py-2.5 hover:bg-primary hover:text-white transition-all"
          >
            Voir toutes nos prises en charge
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
