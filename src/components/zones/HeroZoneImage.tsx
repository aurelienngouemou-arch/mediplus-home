"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroZoneImageProps {
  slug: string;
  name: string;
}

const ZONE_IMAGES: Record<
  string,
  { src: string; alt: string }
> = {
  overijse: {
    src: "/zone-overijse.jpg",
    alt: "Infirmier à domicile à Overijse, soins chaleureux au cœur du terroir viticole",
  },
  hoeilaart: {
    src: "/zone-hoeilaart.jpg",
    alt: "Infirmier à domicile à Hoeilaart, soins paisibles au cœur de la forêt de Soignes",
  },
  tervuren: {
    src: "/zone-tervuren.jpg",
    alt: "Infirmier à domicile à Tervuren, équipe trilingue au service des familles locales et internationales",
  },
};

const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;

export default function HeroZoneImage({ slug, name }: HeroZoneImageProps) {
  const image = ZONE_IMAGES[slug] ?? { src: "/hero-nurse.png", alt: `Infirmier à domicile à ${name}` };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
      className="relative aspect-[4/5] lg:aspect-[5/4] w-full rounded-3xl shadow-2xl ring-1 ring-white/50 overflow-hidden"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        preload
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
        className="object-cover"
      />
    </motion.div>
  );
}
