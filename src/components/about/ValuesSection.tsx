import { Heart, Award, Clock, Lock } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const VALUES = [
  {
    icon: Heart,
    title: "Humanité",
    description:
      "Chaque patient est une personne à part entière, pas un dossier. Nous prenons le temps de l'écouter, de comprendre ses craintes et d'adapter nos soins à sa réalité.",
    color: "text-rose-500",
    bg: "bg-rose-50 border-rose-100",
  },
  {
    icon: Award,
    title: "Excellence médicale",
    description:
      "Nous appliquons les protocoles les plus récents et formons continuellement notre équipe. La qualité technique de nos soins est non négociable.",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-100",
  },
  {
    icon: Clock,
    title: "Disponibilité",
    description:
      "7 jours sur 7, nous sommes là. Parce que la maladie et les besoins de soins n'attendent pas le lundi matin.",
    color: "text-primary",
    bg: "bg-primary/[0.04] border-primary/[0.12]",
  },
  {
    icon: Lock,
    title: "Confidentialité",
    description:
      "Votre vie privée et vos informations médicales sont protégées avec le plus grand soin, conformément au RGPD et au secret médical.",
    color: "text-secondary",
    bg: "bg-secondary/[0.04] border-secondary/[0.12]",
  },
] as const;

export default function ValuesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-14">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Ce qui nous guide
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Nos engagements
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Quatre valeurs fondamentales qui orientent chacun de nos actes et chacune
            de nos décisions.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <div
                className={`rounded-xl border ${value.bg} p-6 h-full flex flex-col gap-4 items-center text-center`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${value.bg} border flex items-center justify-center`}
                >
                  <value.icon className={`w-6 h-6 ${value.color}`} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
