"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";

interface HeroZoneImageProps {
  slug: string;
  postalCode: string;
  name: string;
  interventionTime: string;
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

export default function HeroZoneImage({
  slug,
  postalCode,
  name,
  interventionTime,
}: HeroZoneImageProps) {
  const image = ZONE_IMAGES[slug] ?? { src: "/hero-nurse.png", alt: "Infirmier à domicile" };

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

      {/* Card bottom-left: postal code + name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.5 }}
        className="absolute bottom-4 left-4 flex items-center gap-2 bg-white border border-border/50 rounded-xl px-3 py-2.5 shadow-md"
        aria-hidden="true"
      >
        <MapPin className="size-4 text-primary shrink-0" />
        <div className="leading-tight">
          <p className="text-xs text-muted-foreground">Code postal</p>
          <p className="text-sm font-semibold text-foreground">
            {postalCode} · {name}
          </p>
        </div>
      </motion.div>

      {/* Card top-right: intervention time */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.7 }}
        className="absolute top-4 right-4 flex items-center gap-2 bg-primary text-white rounded-xl px-3 py-2.5 shadow-md"
        aria-hidden="true"
      >
        <Clock className="size-4 shrink-0" />
        <div className="leading-tight">
          <p className="text-xs opacity-80">Intervention</p>
          <p className="text-sm font-semibold">{interventionTime}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
