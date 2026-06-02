import type { Zone, Service, ActeTechnique, ContactInfo } from "@/types";
import {
  Stethoscope,
  Brain,
  Zap,
  CalendarHeart,
  HeartPulse,
  UserRound,
  HandHeart,
  Hospital,
  Syringe,
  Droplet,
  Bandage,
  TestTube,
  Activity,
  Pill,
  Sparkles,
  BedDouble,
} from "lucide-react";

/* ─── Zones d'intervention (3 communes principales) ─── */
export const ZONES: Zone[] = [
  { name: "Overijse", slug: "overijse" },
  { name: "Hoeilaart", slug: "hoeilaart" },
  { name: "Tervuren", slug: "tervuren" },
];

/* ─── 8 catégories de prise en charge ─── */
export const SERVICES: Service[] = [
  {
    icon: Stethoscope,
    name: "Soins infirmiers généraux à domicile",
    slug: "soins-generaux",
    description:
      "Soins de base et quotidiens : pansements, injections, perfusions, prise de tension. Tout ce dont vous avez besoin, chez vous.",
  },
  {
    icon: Brain,
    name: "Accompagnement des troubles de la mémoire",
    slug: "troubles-memoire",
    description:
      "Soutien spécialisé pour les patients atteints d'Alzheimer ou de troubles cognitifs, avec une approche douce et patiente.",
  },
  {
    icon: Zap,
    name: "Interventions infirmières rapides",
    slug: "interventions-rapides",
    description:
      "Disponibilité immédiate pour les soins urgents à domicile : nous intervenons dans l'heure si nécessaire.",
  },
  {
    icon: CalendarHeart,
    name: "Suivi infirmier à long terme",
    slug: "suivi-long-terme",
    description:
      "Une équipe stable qui vous suit dans la durée, avec le même infirmier référent pour une vraie continuité.",
  },
  {
    icon: HeartPulse,
    name: "Suivi des maladies chroniques",
    slug: "maladies-chroniques",
    description:
      "Diabète, hypertension, BPCO, insuffisance cardiaque : gestion quotidienne et éducation thérapeutique.",
  },
  {
    icon: UserRound,
    name: "Soins aux personnes âgées",
    slug: "soins-seniors",
    description:
      "Maintien à domicile, prévention des chutes, soins d'hygiène et accompagnement gériatrique global.",
  },
  {
    icon: HandHeart,
    name: "Soins palliatifs et accompagnement à domicile",
    slug: "soins-palliatifs",
    description:
      "Confort, dignité et présence humaine pour les patients en fin de vie et leurs proches.",
  },
  {
    icon: Hospital,
    name: "Soins post-hospitalisation à domicile",
    slug: "post-hospitalisation",
    description:
      "Retour serein après une opération : pansements, rééducation, surveillance et coordination médicale.",
  },
];

/* ─── 8 actes techniques ─── */
export const ACTES_TECHNIQUES: ActeTechnique[] = [
  { icon: Syringe, name: "Injections & vaccinations", slug: "injections" },
  { icon: Droplet, name: "Perfusions à domicile", slug: "perfusions" },
  { icon: Bandage, name: "Pansements & soins de plaies", slug: "pansements" },
  { icon: TestTube, name: "Prélèvements sanguins", slug: "prelevements" },
  { icon: Activity, name: "Soins de stomie", slug: "stomie" },
  { icon: Pill, name: "Gestion des médicaments", slug: "medicaments" },
  { icon: Sparkles, name: "Toilette & soins d'hygiène", slug: "hygiene" },
  { icon: BedDouble, name: "Récupération post-opératoire", slug: "post-op" },
];

/* ─── Coordonnées ─── */
export const CONTACT_INFO: ContactInfo = {
  phone: "+32486364888",
  phoneDisplay: "+32 486 364 888",
  email: "mediplushome@gmail.com",
  address: "Région d'Overijse, Hoeilaart & Tervuren, Belgique",
  hours: "Lun–Ven : 7h–20h · Sam–Dim : 8h–18h",
};

export const SITE_NAME = "Mediplus Home";
export const SITE_URL = "https://mediplus-home.be";
