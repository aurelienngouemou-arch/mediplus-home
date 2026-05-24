"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Shield, Clock, Star, Heart } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function anim(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-current"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const TRUST_ITEMS = [
  { icon: Shield, label: "INAMI agréé" },
  { icon: Clock, label: "7j/7" },
  { icon: MapPin, label: "À domicile" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Fond dégradé */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-sky-50/50 -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Colonne gauche ── */}
          <div className="flex flex-col gap-6">
            {/* Badge pulsé */}
            <motion.div {...anim(0)} className="w-fit">
              <div className="flex items-center gap-2.5 bg-primary/[0.07] text-primary border border-primary/[0.12] rounded-full px-4 py-1.5 text-sm font-medium">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Soins infirmiers à domicile
              </div>
            </motion.div>

            {/* Titre H1 */}
            <motion.h1
              {...anim(0.1)}
              className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-semibold text-foreground leading-[1.1] tracking-tight"
            >
              Des soins infirmiers{" "}
              <span className="text-primary">humains</span>,{" "}
              <br className="hidden sm:block" />
              chez vous.
            </motion.h1>

            {/* Sous-titre */}
            <motion.p {...anim(0.2)} className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              Notre équipe intervient à{" "}
              <strong className="text-foreground font-medium">Overijse</strong>,{" "}
              <strong className="text-foreground font-medium">Hoeilaart</strong> et{" "}
              <strong className="text-foreground font-medium">Tervuren</strong>{" "}
              avec professionnalisme et bienveillance, à chaque étape de votre rétablissement.
            </motion.p>

            {/* CTA */}
            <motion.div {...anim(0.3)} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                aria-label="Prendre rendez-vous avec notre infirmier"
                className="inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 text-sm font-medium shadow-md shadow-primary/20 transition-all hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Prendre rendez-vous
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.phone.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nous contacter via WhatsApp"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white rounded-full px-6 py-3 text-sm font-medium shadow-md shadow-emerald-500/20 transition-all hover:bg-[#1ebe5d] hover:-translate-y-0.5 hover:shadow-lg"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </motion.div>

            {/* Mini trust bar */}
            <motion.div {...anim(0.4)} className="flex flex-wrap items-center gap-5 pt-2">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Icon className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Colonne droite ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="relative"
          >
            {/* Blob décoratif */}
            <div className="absolute -inset-6 -z-10 pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                <path
                  d="M255,18 C370,8 460,90 472,200 C484,310 412,402 308,444 C204,486 96,460 46,366 C-4,272 16,150 92,82 C168,14 140,28 255,18Z"
                  fill="hsl(197,83%,22%)"
                  fillOpacity="0.07"
                />
              </svg>
            </div>

            {/* Image frame — gradient border + lift hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.35, ease: "easeOut" } }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="p-[2px] rounded-3xl bg-gradient-to-br from-primary/35 via-accent/15 to-transparent shadow-2xl hover:shadow-[0_32px_64px_-8px_rgba(10,77,104,0.28)] transition-shadow duration-500"
            >
              <div className="relative aspect-[4/5] md:aspect-square rounded-[22px] overflow-hidden">
                <Image
                  src="/hero-nurse.png"
                  alt="Infirmière souriante prenant soin d'une dame senior à domicile"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover"
                  quality={90}
                />

                {/* Badge bas-droit */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-3.5 py-2"
                  aria-label="Soins humains, expertise médicale"
                >
                  <Heart className="w-3.5 h-3.5 text-white fill-white/80 shrink-0" aria-hidden="true" />
                  <span className="text-[11px] font-semibold text-white leading-none tracking-wide">
                    Soins humains, expertise médicale
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Carte flottante — note */}
            <motion.div
              initial={{ opacity: 0, y: 10, x: -10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-100 p-3.5 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" aria-hidden="true" />
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5" aria-label="Note 4.9 sur 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-800">4.9 · Avis patients</p>
              </div>
            </motion.div>

            {/* Carte flottante — compteur */}
            <motion.div
              initial={{ opacity: 0, y: -10, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 px-5 py-4"
            >
              <p className="text-2xl font-bold leading-none tracking-tight">+500</p>
              <p className="text-xs opacity-75 mt-1 font-medium">patients soignés</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
