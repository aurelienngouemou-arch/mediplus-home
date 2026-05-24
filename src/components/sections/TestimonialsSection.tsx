import { Star, Quote } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface Testimonial {
  initials: string;
  name: string;
  city: string;
  rating: number;
  quote: string;
  bg: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    initials: "MD",
    name: "Marie D.",
    city: "Overijse",
    rating: 5,
    quote:
      "L'infirmière était ponctuelle, douce et très professionnelle. Ma mère se sentait rassurée dès la première visite. Une prise en charge vraiment humaine.",
    bg: "bg-primary/10 text-primary",
  },
  {
    initials: "PV",
    name: "Pieter V.",
    city: "Tervuren",
    rating: 5,
    quote:
      "Très bonne prise en charge après mon opération. Les soins étaient impeccables et les explications claires. Je recommande vivement, zeker voor Nederlandstaligen.",
    bg: "bg-secondary/10 text-secondary",
  },
  {
    initials: "SM",
    name: "Sophie M.",
    city: "Hoeilaart",
    rating: 5,
    quote:
      "Disponibles même le weekend, c'est rare et précieux. Mon père a reçu des soins excellents à domicile. Le contact est simple, rapide, et les infirmiers sont bienveillants.",
    bg: "bg-accent/20 text-secondary",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${count} étoiles sur 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50/60 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <FadeIn direction="up" className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Témoignages
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Des centaines de familles nous ont accordé leur confiance dans la
            région.
          </p>
        </FadeIn>

        {/* Grille */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="bg-white rounded-2xl border border-border p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow h-full">
                {/* Guillemet décoratif */}
                <div className="text-border" aria-hidden="true">
                  <Quote className="w-7 h-7 fill-current" />
                </div>

                {/* Citation */}
                <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Auteur */}
                <figcaption className="flex items-center gap-3 pt-2 border-t border-border">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${t.bg}`}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                  <div className="ml-auto">
                    <StarRating count={t.rating} />
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Note globale */}
        <FadeIn direction="up" delay={0.3} className="text-center mt-10">
          <div className="inline-flex items-center gap-3 bg-white border border-border rounded-full px-6 py-3 shadow-sm">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">
              4.9 / 5
            </span>
            <span className="text-sm text-muted-foreground">
              · Basé sur 120+ avis patients
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
