import type { Metadata } from "next";
import Script from "next/script";
import { getBaseUrl } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import ActesSection from "@/components/sections/ActesSection";
import ZonesSection from "@/components/sections/ZonesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Infirmier à domicile | Overijse, Hoeilaart, Tervuren",
  description:
    "Soins infirmiers professionnels à domicile. Disponible 7j/7 à Overijse, Hoeilaart et Tervuren. Toutes les mutuelles belges.",
  alternates: {
    canonical: getBaseUrl(),
  },
  openGraph: {
    title: "Infirmier à domicile | Overijse, Hoeilaart, Tervuren",
    description:
      "Soins infirmiers professionnels à domicile. Disponible 7j/7 dans la région sud-est de Bruxelles.",
    url: getBaseUrl(),
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Mediplus Home",
  description: "Soins infirmiers à domicile en Belgique",
  image: "https://mediplus-home.vercel.app/hero-nurse.png",
  telephone: "+32486364888",
  url: "https://mediplus-home.vercel.app",
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

export default function HomePage() {
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
