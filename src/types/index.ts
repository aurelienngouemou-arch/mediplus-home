import type { LucideIcon } from "lucide-react";

export type { LucideIcon };

export interface Zone {
  name: string;
  slug: string;
}

export interface Service {
  icon: LucideIcon;
  name: string;
  slug: string;
  description: string;
}

export interface ActeTechnique {
  icon: LucideIcon;
  name: string;
  slug: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  hours: string;
}

export interface ServiceData {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  description: string;
  forWho: {
    title: string;
    items: string[];
  };
  whatIncluded: {
    title: string;
    items: { title: string; description: string }[];
  };
  howItWorks: {
    title: string;
    steps: { title: string; description: string }[];
  };
  faq: { q: string; a: string }[];
  reimbursement: string;
  relatedServices: string[];
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  commune: "overijse" | "hoeilaart" | "tervuren" | "autre";
  requestType:
    | "rendez-vous"
    | "information"
    | "devis"
    | "autre";
  message?: string;
  rgpdConsent: boolean;
}
