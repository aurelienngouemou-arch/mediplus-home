"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  HandHeart,
  HeartPulse,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface TeamProfile {
  role: string;
  specialty: string;
  icon: LucideIcon;
}

const TEAM_PROFILES: TeamProfile[] = [
  {
    role: "Infirmier(ère) référent(e)",
    specialty: "Soins généraux & plaies",
    icon: Stethoscope,
  },
  {
    role: "Infirmier(ère) spécialisé(e)",
    specialty: "Gériatrie & soins palliatifs",
    icon: HandHeart,
  },
  {
    role: "Infirmier(ère) spécialisé(e)",
    specialty: "Maladies chroniques & diabète",
    icon: HeartPulse,
  },
  {
    role: "Infirmier(ère) coordinateur(trice)",
    specialty: "Coordination & planification",
    icon: ClipboardList,
  },
];

export default function TeamSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre + sous-titre */}
        <FadeIn direction="up" className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Notre équipe
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Des infirmier(ère)s diplômé(e)s qui prennent le temps qu&apos;il faut
            pour chaque patient.
          </p>
        </FadeIn>

        {/* Photo d'équipe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="relative aspect-[3/2] w-full">
            <Image
              src="/photo-equipe.jpg"
              alt="Notre équipe d'infirmiers à domicile en Belgique"
              fill
              quality={90}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Grille de cartes */}
        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TEAM_PROFILES.map((profile, i) => {
            const Icon = profile.icon;
            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group flex flex-col items-center text-center bg-card rounded-2xl border border-border/50 p-8 shadow-md hover:shadow-xl transition-shadow duration-200 h-full"
                >
                  {/* Avatar avec icône */}
                  <div className="w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                    <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                  </div>

                  {/* Texte */}
                  <div className="mt-4 flex flex-col flex-1">
                    <p className="font-semibold text-base text-foreground">
                      {profile.role}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {profile.specialty}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn direction="up" delay={0.2} className="text-center mt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-primary text-white rounded-full px-6 py-3 font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Nous contacter
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
