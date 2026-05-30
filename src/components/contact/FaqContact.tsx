import { getTranslations } from "next-intl/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FadeIn from "@/components/animations/FadeIn";

export default async function FaqContact() {
  const t = await getTranslations("faqContact");

  const items = t.raw("items") as { q: string; a: string }[];

  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {t("title")}
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
            <Accordion type="single" collapsible className="px-2">
              {items.map((item, i) => (
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
