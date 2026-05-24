import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ZoneData } from "@/lib/zones-data";
import { SERVICES } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface ServicesZoneProps {
  zone: ZoneData;
}

export default function ServicesZone({ zone }: ServicesZoneProps) {
  return (
    <section
      role="region"
      aria-label={`Services infirmiers disponibles à ${zone.name}`}
      className="py-12 md:py-20 bg-background"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Tous nos soins disponibles à{" "}
              <span className="text-primary">{zone.name}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              L&apos;ensemble de nos prestations infirmières sont accessibles à
              domicile dans toute la commune de {zone.name}.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex flex-col h-full rounded-xl border border-border bg-card shadow-sm p-6 hover:border-primary/30 hover:shadow-md transition-all"
                  aria-label={`${service.name} à ${zone.name}`}
                >
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <ArrowRight className="size-3.5" aria-hidden="true" />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn direction="up" delay={0.2}>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            Et bien d&apos;autres soins sur demande.{" "}
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contactez-nous
            </a>{" "}
            pour toute situation spécifique.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
