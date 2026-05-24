import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import ActesSection from "@/components/sections/ActesSection";
import ZonesSection from "@/components/sections/ZonesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Infirmier à domicile | Overijse, Hoeilaart, Tervuren",
  description:
    "Soins infirmiers professionnels à domicile. Disponible 7j/7 à Overijse, Hoeilaart et Tervuren. INAMI agréé, remboursement mutuelle.",
  alternates: {
    canonical: "https://infirmier-domicile-belgique.be",
  },
  openGraph: {
    title: "Infirmier à domicile | Overijse, Hoeilaart, Tervuren",
    description:
      "Soins infirmiers professionnels à domicile. Disponible 7j/7 dans la région sud-est de Bruxelles.",
    url: "https://infirmier-domicile-belgique.be",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <ActesSection />
      <ZonesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
