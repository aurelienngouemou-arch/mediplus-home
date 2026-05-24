import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { Phone, Home, CalendarCheck } from "lucide-react";

interface Step {
  number: string;
  icon: typeof Phone;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: Phone,
    title: "Prenez contact",
    description:
      "Appelez-nous, envoyez un WhatsApp ou remplissez le formulaire en ligne. Nous vous répondons en moins de 2h.",
  },
  {
    number: "02",
    icon: Home,
    title: "Évaluation à domicile",
    description:
      "Un infirmier se déplace gratuitement pour évaluer vos besoins et établir un plan de soins personnalisé.",
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Soins personnalisés",
    description:
      "Nous démarrons les soins selon votre planning. Flexibilité totale, 7j/7, avec suivi continu.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <FadeIn direction="up" className="text-center mb-14 md:mb-20">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Comment ça marche
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Simple comme un coup de fil
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            De votre premier appel à la mise en place des soins, nous
            accompagnons chaque étape avec clarté.
          </p>
        </FadeIn>

        {/* Étapes */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 relative"
        >
          {/* Connecteur horizontal desktop */}
          <div
            className="hidden md:block absolute top-[2.75rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-border via-accent/30 to-border"
            aria-hidden="true"
          />

          {STEPS.map((step, index) => (
            <StaggerItem key={step.number}>
              <div className="flex flex-col items-center text-center gap-4 relative">
                {/* Numéro + icône */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center z-10 relative shadow-sm">
                    <step.icon
                      className="w-6 h-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-md"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Texte */}
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
