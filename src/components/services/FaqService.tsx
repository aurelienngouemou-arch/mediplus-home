import type { ServiceData } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeIn from "@/components/animations/FadeIn";

interface FaqServiceProps {
  faq: ServiceData["faq"];
  serviceName: string;
}

export default function FaqService({ faq, serviceName }: FaqServiceProps) {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground mt-3">
            Tout ce que vous devez savoir sur {serviceName.toLowerCase()}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
            <Accordion type="single" collapsible className="px-2">
              {faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left px-4 text-sm font-medium hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-muted-foreground leading-relaxed">
                    {item.a}
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
