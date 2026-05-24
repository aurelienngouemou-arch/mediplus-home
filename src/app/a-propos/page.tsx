import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import FadeIn from "@/components/animations/FadeIn";
import StorySection from "@/components/about/StorySection";
import ValuesSection from "@/components/about/ValuesSection";
import TeamSection from "@/components/about/TeamSection";
import StatsSection from "@/components/about/StatsSection";
import CertificationsSection from "@/components/about/CertificationsSection";

export const metadata = createMetadata({
  title: "À propos · Notre équipe d'infirmiers à domicile",
  description:
    "Découvrez notre équipe d'infirmiers à domicile agréés INAMI, nos valeurs, notre histoire et nos certifications. Au service des patients d'Overijse, Hoeilaart et Tervuren.",
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/[0.04] via-background to-secondary/[0.04] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(197 83% 22%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeIn direction="up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Notre équipe
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Une équipe d&apos;infirmiers
              <span className="block text-primary">au service de votre santé</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Nous sommes des professionnels de santé passionnés par le soin à domicile,
              engagés auprès des habitants d&apos;Overijse, Hoeilaart et Tervuren depuis
              plus d&apos;une décennie.
            </p>
          </FadeIn>
        </div>
      </section>

      <StorySection />
      <ValuesSection />
      <TeamSection />
      <StatsSection />
      <CertificationsSection />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              Discutons de vos besoins
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Chaque situation est unique. Contactez-nous pour un échange gratuit
              et sans engagement avec un infirmier de notre équipe.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Nous contacter
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
