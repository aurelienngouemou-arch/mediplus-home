"use client";

import type { ZoneData } from "@/lib/zones-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeIn from "@/components/animations/FadeIn";

interface FaqZoneProps {
  zone: ZoneData;
}

export default function FaqZone({ zone }: FaqZoneProps) {
  return (
    <section
      role="region"
      aria-label={`Questions fréquentes à ${zone.name}`}
      className="py-20 bg-muted"
    >
      <div className="container mx-auto max-w-3xl px-4">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Questions fréquentes à{" "}
              <span className="text-primary">{zone.name}</span>
            </h2>
            <p className="text-muted-foreground">
              Toutes les réponses spécifiques à la commune de {zone.name}.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden px-2">
            <Accordion type="single" collapsible>
              {zone.faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-foreground px-4 text-base hover:no-underline hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed px-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
