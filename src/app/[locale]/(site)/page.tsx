import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { getBaseUrl } from "@/lib/seo";
import { CONTACT_INFO } from "@/lib/constants";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import ActesSection from "@/components/sections/ActesSection";
import ZonesSection from "@/components/sections/ZonesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const base = getBaseUrl();

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        fr: `${base}/fr`,
        nl: `${base}/nl`,
        en: `${base}/en`,
        "x-default": `${base}/fr`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${base}/${locale}`,
      locale: locale === "en" ? "en_BE" : locale === "nl" ? "nl_BE" : "fr_BE",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Mediplus Home",
    description: locale === "nl"
      ? "Verpleegkundige zorg aan huis in België"
      : locale === "en"
      ? "Home nursing care in Belgium"
      : "Soins infirmiers à domicile en Belgique",
    image: "https://mediplus-home.vercel.app/hero-nurse.png",
    telephone: CONTACT_INFO.phone,
    url: `https://mediplus-home.vercel.app/${locale}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Brabant flamand",
      addressCountry: "BE",
    },
    areaServed: ["Overijse", "Hoeilaart", "Tervuren"],
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
    <>
      <Script
        id="json-ld-medicalbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <ActesSection />
      <ZonesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
