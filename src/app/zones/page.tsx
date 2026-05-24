import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users, Phone } from "lucide-react";
import { ALL_ZONES } from "@/lib/zones-data";
import { SITE_URL } from "@/lib/constants";
import StylizedMap from "@/components/maps/StylizedMap";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export const metadata: Metadata = {
  title: "Zones d'intervention — Overijse, Hoeilaart, Tervuren",
  description:
    "Infirmier à domicile INAMI agréé dans les communes d'Overijse, Hoeilaart et Tervuren (Brabant flamand). Intervention 7j/7. Toutes mutuelles.",
  alternates: {
    canonical: `${SITE_URL}/zones`,
  },
  openGraph: {
    title: "Zones d'intervention — Overijse, Hoeilaart, Tervuren",
    description:
      "Soins infirmiers à domicile dans les communes d'Overijse, Hoeilaart et Tervuren. Disponible 7j/7, INAMI agréé.",
    url: `${SITE_URL}/zones`,
    type: "website",
    locale: "fr_BE",
    siteName: "Infirmier à domicile Belgique",
  },
};

export default function ZonesPage() {
  return (
    <>
      {/* Hero */}
      <section
        role="region"
        aria-label="Nos zones d'intervention"
        className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-28 pb-20"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>

        <div className="container mx-auto max-w-5xl px-4 text-center">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Brabant flamand · Belgique
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.05}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
              Nos zones d&apos;intervention{" "}
              <span className="text-primary">en Belgique</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Nos infirmiers INAMI agréés interviennent à domicile dans les
              communes d&apos;Overijse, Hoeilaart et Tervuren — en français, en
              néerlandais et en anglais.
            </p>
          </FadeIn>

          {/* Overview map */}
          <FadeIn direction="up" delay={0.15}>
            <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-white shadow-md overflow-hidden p-6">
              <StylizedMap aria-label="Carte des 3 zones d'intervention : Overijse, Hoeilaart, Tervuren" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Zone cards */}
      <section
        role="region"
        aria-label="Présentation des communes desservies"
        className="py-20 bg-background"
      >
        <div className="container mx-auto max-w-6xl px-4">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Trois communes, une équipe dédiée
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Chaque commune possède ses particularités. Découvrez notre
                présence et nos engagements dans chaque zone.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {ALL_ZONES.map((zone) => (
              <StaggerItem key={zone.slug}>
                <div className="group flex flex-col h-full bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all overflow-hidden">
                  {/* Card header */}
                  <div className="bg-gradient-to-br from-primary/8 to-secondary/5 p-6 border-b border-border">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-serif text-2xl font-bold text-foreground">
                        {zone.name}
                      </h3>
                      <span className="text-xs font-semibold bg-primary/10 text-primary rounded-full px-2.5 py-1">
                        {zone.postalCode}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {zone.region}
                    </p>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-1 p-6 gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {zone.shortDescription}
                    </p>

                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4 text-primary shrink-0" aria-hidden="true" />
                        <span>
                          Délai d&apos;intervention :{" "}
                          <strong className="text-foreground">
                            {zone.interventionTime}
                          </strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4 text-primary shrink-0" aria-hidden="true" />
                        <span>
                          Bruxelles :{" "}
                          <strong className="text-foreground">
                            {zone.distanceBrussels}
                          </strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="size-4 text-primary shrink-0" aria-hidden="true" />
                        <span>
                          Population :{" "}
                          <strong className="text-foreground">
                            {zone.population}
                          </strong>
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/zones/${zone.slug}`}
                      aria-label={`Découvrir nos soins infirmiers à domicile à ${zone.name}`}
                      className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors group-hover:shadow-md group-hover:shadow-primary/20"
                    >
                      Découvrir
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Out-of-zone CTA */}
      <section
        role="region"
        aria-label="Vous habitez hors de nos zones ?"
        className="py-16 bg-muted"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <FadeIn direction="up">
            <div className="bg-white border border-border rounded-2xl shadow-sm p-8 md:p-12 text-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Vous n&apos;êtes pas dans ces zones ?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Nous couvrons également les communes voisines et étudions chaque
                demande au cas par cas. Contactez-nous pour vérifier si nous
                pouvons intervenir chez vous.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  aria-label="Nous contacter pour vérifier votre zone d'intervention"
                  className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                  Nous contacter
                </Link>
                <a
                  href="tel:+32400000000"
                  aria-label="Appeler directement notre cabinet infirmier"
                  className="inline-flex items-center gap-2 border border-border rounded-full px-6 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Appeler directement
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
