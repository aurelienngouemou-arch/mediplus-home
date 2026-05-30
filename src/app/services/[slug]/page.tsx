import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ALL_SERVICES, getServiceData } from "@/lib/services-data";
import { CONTACT_INFO, SITE_URL } from "@/lib/constants";
import { Phone, MessageCircle, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import IntroService from "@/components/services/IntroService";
import TargetSection from "@/components/services/TargetSection";
import IncludedSection from "@/components/services/IncludedSection";
import ProcessService from "@/components/services/ProcessService";
import ReimbursementSection from "@/components/services/ReimbursementSection";
import FaqService from "@/components/services/FaqService";
import RelatedServices from "@/components/services/RelatedServices";
import FadeIn from "@/components/animations/FadeIn";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceData(slug);
  if (!service) return {};

  const title = `${service.name} | Infirmier à domicile Belgique`;
  const description = service.heroSubtitle.substring(0, 160);
  const url = `${SITE_URL}/services/${slug}`;

  return {
    title: service.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "fr_BE",
      siteName: "Infirmier à domicile Belgique",
    },
  };
}

function MedicalProcedureJsonLd({ service }: { service: ReturnType<typeof getServiceData> }) {
  if (!service) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: service.name,
    description: service.heroSubtitle,
    procedureType: "Therapeutic",
    bodyLocation: "Home",
    provider: {
      "@type": "MedicalBusiness",
      name: "Infirmier à domicile Belgique",
      telephone: CONTACT_INFO.phone,
      areaServed: ["Overijse", "Hoeilaart", "Tervuren"],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FaqJsonLd({ faq }: { faq: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceData(slug);
  if (!service) notFound();

  const Icon = service.icon;

  return (
    <>
      <MedicalProcedureJsonLd service={service} />
      <FaqJsonLd faq={service.faq} />

      {/* Hero service */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-gradient-to-br from-primary/[0.05] via-background to-secondary/[0.05] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(197 83% 22%) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <FadeIn direction="up">
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <Link href="/services" className="hover:text-primary transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-foreground font-medium">{service.shortName}</span>
            </nav>

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Icon className="w-4 h-4" aria-hidden="true" />
              {service.heroBadge}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground mb-5 leading-tight">
              {service.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-8">
              {service.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Prendre rendez-vous
              </Link>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2 border border-border bg-background text-foreground rounded-full px-6 py-3 font-medium hover:border-primary/40 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>

            {/* Mini-stats */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: CheckCircle2, label: "Toutes les mutuelles belges" },
                { icon: CheckCircle2, label: "Disponible 7j/7" },
                { icon: CheckCircle2, label: "À votre domicile" },
              ].map(({ icon: StatIcon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <StatIcon className="w-4 h-4 text-accent" aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sections de contenu */}
      <IntroService service={service} />
      <TargetSection forWho={service.forWho} />
      <IncludedSection whatIncluded={service.whatIncluded} />
      <ProcessService howItWorks={service.howItWorks} />
      <ReimbursementSection reimbursement={service.reimbursement} />
      <FaqService faq={service.faq} serviceName={service.shortName} />
      <RelatedServices relatedSlugs={service.relatedServices} currentSlug={slug} />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
              Besoin de {service.shortName.toLowerCase()} ?
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Contactez-nous dès aujourd&apos;hui. Nous vous répondons en moins de 2 heures
              et organisons une évaluation gratuite à votre domicile.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary rounded-full px-6 py-3 font-medium hover:bg-white/90 transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Prendre rendez-vous
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.replace(/\+/g, "")}`}
                className="inline-flex items-center gap-2 border border-white/40 bg-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="inline-flex items-center gap-2 border border-white/40 bg-white/10 text-white rounded-full px-6 py-3 font-medium hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Appeler
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
