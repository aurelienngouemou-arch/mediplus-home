import type { Metadata } from "next";
import { SITE_URL } from "./constants";

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
  const url = `${SITE_URL}${path}`;
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
