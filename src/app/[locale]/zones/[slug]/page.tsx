import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ZONES_DATA, ALL_ZONES, getZoneData } from "@/lib/zones-data";
import { CONTACT_INFO } from "@/lib/constants";
import { getBaseUrl } from "@/lib/seo";
import HeroZone from "@/components/zones/HeroZone";
import IntroZone from "@/components/zones/IntroZone";
import CoverageZone from "@/components/zones/CoverageZone";
import ServicesZone from "@/components/zones/ServicesZone";
import WhyUsZone from "@/components/zones/WhyUsZone";
import TestimonialsZone from "@/components/zones/TestimonialsZone";
import FaqZone from "@/components/zones/FaqZone";
import CtaZone from "@/components/zones/CtaZone";

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = ["fr", "nl", "en"];
  return locales.flatMap((locale) =>
    ALL_ZONES.map((zone) => ({ locale, slug: zone.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const zone = getZoneData(slug);
  if (!zone) return {};

  const base = getBaseUrl();

  const META_DESCRIPTIONS: Record<string, Record<string, string>> = {
    overijse: {
      fr: "Infirmier à domicile à Overijse. Équipe bilingue FR/NL, disponible 7j/7 dans le centre, Jezus-Eik, Maleizen et Tombeek. Toutes les mutuelles belges.",
      nl: "Thuisverpleging in Overijse. Tweetalig team FR/NL, beschikbaar 7/7 in het centrum, Jezus-Eik, Maleizen en Tombeek. Alle Belgische ziekenfondsen.",
      en: "Home nursing in Overijse. Bilingual FR/NL team, available 7/7 in the centre, Jezus-Eik, Maleizen and Tombeek. All Belgian health insurance accepted.",
    },
    hoeilaart: {
      fr: "Infirmier à domicile à Hoeilaart. Soins infirmiers 7j/7 dans tout Hoeilaart, Groenendaal et Sloesveld. Équipe locale, toutes les mutuelles belges.",
      nl: "Thuisverpleging in Hoeilaart. Verpleegkundige zorg 7/7 in heel Hoeilaart, Groenendaal en Sloesveld. Lokaal team, alle Belgische ziekenfondsen.",
      en: "Home nursing in Hoeilaart. Nursing care 7/7 throughout Hoeilaart, Groenendaal and Sloesveld. Local team, all Belgian health insurance.",
    },
    tervuren: {
      fr: "Infirmier à domicile à Tervuren. Équipe trilingue FR/NL/EN, acceptant les mutuelles belges et assurances internationales. Centre, Vossem, Duisburg, Moorsel.",
      nl: "Thuisverpleging in Tervuren. Drietalig team FR/NL/EN, voor Belgische en internationale ziekteverzekeringen. Centrum, Vossem, Duisburg, Moorsel.",
      en: "Home nursing in Tervuren. Trilingual team FR/NL/EN, accepting Belgian mutual insurance and international health plans. Centre, Vossem, Duisburg, Moorsel.",
    },
  };

  const TITLES: Record<string, string> = {
    fr: `Infirmier à domicile ${zone.name} - Soins 7j/7`,
    nl: `Thuisverpleging ${zone.name} - Zorg 7/7`,
    en: `Home nursing ${zone.name} - Care 7/7`,
  };

  const title = TITLES[locale] ?? `${zone.name} - Mediplus Home`;
  const description = META_DESCRIPTIONS[zone.slug]?.[locale] ?? zone.shortDescription;
  const url = `${base}/${locale}/zones/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${base}/fr/zones/${slug}`,
        nl: `${base}/nl/zones/${slug}`,
        en: `${base}/en/zones/${slug}`,
        "x-default": `${base}/fr/zones/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: locale === "en" ? "en_BE" : locale === "nl" ? "nl_BE" : "fr_BE",
      siteName: "Mediplus Home",
    },
  };
}

function LocalBusinessJsonLd({ zone }: { zone: (typeof ZONES_DATA)[string] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Mediplus Home - ${zone.name}`,
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
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

export default async function ZonePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const zone = getZoneData(slug);
  if (!zone) notFound();

  return (
    <>
      <LocalBusinessJsonLd zone={zone} />
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
