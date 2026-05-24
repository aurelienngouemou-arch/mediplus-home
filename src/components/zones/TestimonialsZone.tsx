import { Quote, MapPin } from "lucide-react";
import type { ZoneData } from "@/lib/zones-data";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface TestimonialsZoneProps {
  zone: ZoneData;
}

export default function TestimonialsZone({ zone }: TestimonialsZoneProps) {
  return (
    <section
      role="region"
      aria-label={`Témoignages de patients à ${zone.name}`}
      className="py-12 md:py-20 bg-background"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Ils nous ont fait confiance à{" "}
              <span className="text-primary">{zone.name}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des patients de {zone.name} et de ses quartiers partagent leur
              expérience.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {zone.testimonials.map((testimonial, i) => (
            <StaggerItem key={i}>
              <figure className="flex flex-col h-full bg-muted rounded-2xl border border-border p-6 hover:shadow-md transition-shadow">
                <Quote
                  className="size-8 text-primary/30 mb-4 shrink-0"
                  aria-hidden="true"
                />
                <blockquote className="flex-1">
                  <p className="text-foreground leading-relaxed italic text-sm">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2 pt-4 border-t border-border">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}, {testimonial.age} ans
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" aria-hidden="true" />
                      {testimonial.location}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
