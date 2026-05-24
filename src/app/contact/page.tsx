import { Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { CONTACT_INFO } from "@/lib/constants";
import FadeIn from "@/components/animations/FadeIn";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import FaqContact from "@/components/contact/FaqContact";

export const metadata = createMetadata({
  title: "Contact · Infirmier à domicile Belgique",
  description:
    "Contactez notre équipe d'infirmiers à domicile. Réponse en moins de 2 heures. Disponible 7j/7 à Overijse, Hoeilaart et Tervuren. Devis gratuit.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/[0.04] via-background to-secondary/[0.04] overflow-hidden">
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
              Contact
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-foreground mb-5 leading-tight">
              Contactez-nous
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous vous répondons en{" "}
              <span className="font-semibold text-foreground">moins de 2 heures</span>.
              Disponibles du lundi au dimanche.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section principale : formulaire + infos */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Formulaire */}
            <FadeIn direction="left">
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-1">
                  Envoyer un message
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Tous les champs marqués d&apos;un{" "}
                  <span className="text-destructive">*</span> sont obligatoires.
                </p>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Informations */}
            <FadeIn direction="right" delay={0.1}>
              <div>
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Nos coordonnées
                </h2>
                <ContactInfo />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Contact */}
      <FaqContact />

      {/* CTA urgence */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-5 sm:p-8 text-center">
              <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-3">
                Urgence médicale non vitale
              </p>
              <h2 className="font-serif text-2xl font-semibold text-rose-900 mb-3">
                Besoin urgent ? Appelez-nous directement.
              </h2>
              <p className="text-rose-700/80 text-sm mb-6 leading-relaxed">
                Pour toute urgence vitale, appelez le{" "}
                <strong className="text-rose-900">112</strong> immédiatement.
                Pour les soins urgents non vitaux, notre équipe intervient dans l&apos;heure.
              </p>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-3 bg-rose-600 text-white rounded-full px-8 py-4 font-semibold text-lg hover:bg-rose-700 transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
