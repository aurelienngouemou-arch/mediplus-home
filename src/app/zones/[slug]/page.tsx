import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ZONES_DATA, ALL_ZONES, getZoneData } from "@/lib/zones-data";
import { CONTACT_INFO, SITE_URL } from "@/lib/constants";
import HeroZone from "@/components/zones/HeroZone";
import IntroZone from "@/components/zones/IntroZone";
import CoverageZone from "@/components/zones/CoverageZone";
import ServicesZone from "@/components/zones/ServicesZone";
import WhyUsZone from "@/components/zones/WhyUsZone";
import TestimonialsZone from "@/components/zones/TestimonialsZone";
import FaqZone from "@/components/zones/FaqZone";
import CtaZone from "@/components/zones/CtaZone";

export const dynamicParams = false;

export async function generateStaticParams() {
  return ALL_ZONES.map((zone) => ({ slug: zone.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const zone = getZoneData(slug);
  if (!zone) return {};

  const title = `Infirmier à domicile ${zone.name} - Soins 7j/7`;

  const META_DESCRIPTIONS: Record<string, string> = {
    overijse:
      "Infirmier à domicile à Overijse. Équipe bilingue FR/NL, disponible 7j/7 dans le centre, Jezus-Eik, Maleizen et Tombeek. Toutes les mutuelles belges.",
    hoeilaart:
      "Infirmier à domicile à Hoeilaart. Soins infirmiers 7j/7 dans tout Hoeilaart, Groenendaal et Sloesveld. Équipe locale, toutes les mutuelles belges.",
    tervuren:
      "Home nursing in Tervuren. Trilingual team FR/NL/EN, accepting Belgian mutual insurance and international health plans. Centre, Vossem, Duisburg, Moorsel.",
  };

  const description =
    META_DESCRIPTIONS[zone.slug] ??
    `Soins infirmiers à domicile à ${zone.name}. Toutes les mutuelles belges. Disponible 7j/7.`;
  const url = `${SITE_URL}/zones/${zone.slug}`;

  return {
    title,
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

function LocalBusinessJsonLd({
  zone,
}: {
  zone: (typeof ZONES_DATA)[string];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Infirmier à domicile - ${zone.name}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: zone.name,
      postalCode: zone.postalCode,
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: zone.coordinates.lat,
      longitude: zone.coordinates.lng,
    },
    areaServed: [zone.name, ...zone.neighborhoods],
    telephone: CONTACT_INFO.phone,
    priceRange: "€€",
    medicalSpecialty: ["HomeCare", "Nursing"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function FaqPageJsonLd({ zone }: { zone: (typeof ZONES_DATA)[string] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: zone.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ZonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const zone = getZoneData(slug);
  if (!zone) notFound();

  return (
    <>
      <LocalBusinessJsonLd zone={zone} />
      <FaqPageJsonLd zone={zone} />
      <HeroZone zone={zone} />
      <IntroZone zone={zone} />
      <CoverageZone zone={zone} />
      <ServicesZone zone={zone} />
      <WhyUsZone zone={zone} />
      <TestimonialsZone zone={zone} />
      <FaqZone zone={zone} />
      <CtaZone zone={zone} />
    </>
  );
}
