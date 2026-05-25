import type { Metadata } from "next";

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://mediplus-home.vercel.app";
}

interface CreateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
}: CreateMetadataOptions): Metadata {
  const url = `${getBaseUrl()}${path}`;
  const fullTitle = `${title} | Mediplus Home`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: "website",
      locale: "fr_BE",
      siteName: "Mediplus Home",
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
  };
}
