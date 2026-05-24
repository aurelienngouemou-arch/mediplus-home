import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mediplus Home · Soins à domicile en Belgique",
    template: "%s | Mediplus Home",
  },
  description:
    "Soins infirmiers à domicile professionnels dans la région d'Overijse, Hoeilaart et Tervuren. Disponible 7j/7, prise en charge INAMI complète.",
  keywords: [
    "infirmier domicile",
    "soins à domicile",
    "Overijse",
    "Hoeilaart",
    "Tervuren",
    "Belgique",
    "INAMI",
    "soins infirmiers",
    "Mediplus Home",
  ],
  authors: [{ name: "Mediplus Home" }],
  creator: "Mediplus Home",
  metadataBase: new URL("https://infirmier-domicile-belgique.be"),
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: "Mediplus Home",
    title: "Mediplus Home · Soins à domicile en Belgique",
    description:
      "Soins infirmiers professionnels à domicile. Disponible 7j/7 dans la région d'Overijse, Hoeilaart et Tervuren.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground overflow-x-hidden">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
