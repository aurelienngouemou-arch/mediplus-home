import { Clock, Languages, ShieldCheck, CalendarDays } from "lucide-react";
import type { ZoneData } from "@/lib/zones-data";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface WhyUsZoneProps {
  zone: ZoneData;
}

export default function WhyUsZone({ zone }: WhyUsZoneProps) {
  const languageLabel =
    zone.languages.length >= 3
      ? `Trilingue ${zone.languages.join(" / ")}`
      : `Bilingue ${zone.languages.join(" / ")}`;

  const languageDetail =
    zone.languages.length >= 3
      ? `Soins et communication en ${zone.languages.join(", ")} — pour les familles belges et les expatriés.`
      : `Toute notre équipe parle ${zone.languages.join(" et ")}, essentiel pour une commune comme ${zone.name}.`;

  const cards = [
    {
      Icon: Clock,
      title: `Proximité · ${zone.interventionTime}`,
      description: `Nos soignants sont basés à proximité de ${zone.name}. Délai moyen d'intervention : ${zone.interventionTime}, parfois moins selon la disponibilité.`,
    },
    {
      Icon: Languages,
      title: languageLabel,
      description: languageDetail,
    },
    {
      Icon: ShieldCheck,
      title: "INAMI agréé · Toutes mutuelles",
      description:
        "Nos infirmiers sont agréés par l'INAMI. Remboursement garanti par toutes les mutuelles belges selon votre statut (ordinaire, BIM, VIPO).",
    },
    {
      Icon: CalendarDays,
      title: "7j/7 · Soir & week-end",
      description:
        "Disponibles du lundi au vendredi de 7h à 20h, le week-end de 8h à 18h. Parce que la santé n'attend pas le lundi.",
    },
  ];

  return (
    <section
      role="region"
      aria-label={`Pourquoi nous choisir à ${zone.name}`}
      className="py-12 md:py-20 bg-muted"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <FadeIn direction="up">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Pourquoi choisir notre équipe à{" "}
              <span className="text-primary">{zone.name}</span> ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Quatre engagements concrets, tenus chaque jour auprès de nos
              patients de {zone.name}.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="flex flex-col items-center text-center h-full bg-white rounded-2xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 shrink-0">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-foreground mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
