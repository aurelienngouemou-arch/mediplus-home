import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FadeIn from "@/components/animations/FadeIn";

const FAQ_ITEMS = [
  {
    q: "Quel est votre délai de réponse ?",
    a: "Nous nous engageons à vous répondre en moins de 2 heures pendant nos heures d'ouverture (lun–ven 7h–20h, sam–dim 8h–18h). Sur WhatsApp, notre délai habituel est de 30 minutes. En dehors de ces horaires, votre message est traité en priorité dès la reprise.",
  },
  {
    q: "Puis-je vous joindre le weekend ?",
    a: "Oui. Nous sommes disponibles le samedi et le dimanche de 8h à 18h, aussi bien pour les appels que pour les messages WhatsApp. Les demandes urgentes sont toujours traitées en priorité.",
  },
  {
    q: "Comment se déroule un premier contact ?",
    a: "Après réception de votre message, un infirmier vous rappelle pour comprendre votre situation en détail. Si nécessaire, nous organisons une visite d'évaluation gratuite à votre domicile pour établir un plan de soins personnalisé.",
  },
  {
    q: "Acceptez-vous les nouveaux patients ?",
    a: "Oui, nous acceptons de nouveaux patients dans nos zones d'intervention (Overijse, Hoeilaart, Tervuren et communes limitrophes). Contactez-nous pour vérifier notre disponibilité actuelle et organiser une prise en charge.",
  },
  {
    q: "Travaillez-vous avec ma mutuelle ?",
    a: "Nous travaillons avec l'ensemble des mutuelles belges (Mutualité chrétienne, Solidaris, Mutualité libérale, Mutualité neutre, CAAMI, etc.). Nous proposons le tiers payant sur demande, ce qui signifie que vous n'avancez pas les frais remboursables.",
  },
];

export default function FaqContact() {
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            Questions fréquentes
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden">
            <Accordion type="single" collapsible className="px-2">
              {FAQ_ITEMS.map((item, i) => (
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
