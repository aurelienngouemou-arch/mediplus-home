import { ShieldCheck } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

const CERTIFICATIONS = [
  {
    code: "INAMI",
    fullName: "Institut National d'Assurance Maladie-Invalidité",
    description: "Agrément INAMI pour tous les actes infirmiers conventionnés",
  },
  {
    code: "RIZIV",
    fullName: "Rijksinstituut voor Ziekte- en Invaliditeitsverzekering",
    description: "Erkend door het RIZIV voor alle geconventioneerde verpleegkundige handelingen",
  },
  {
    code: "OI",
    fullName: "Ordre des Infirmiers",
    description: "Membres inscrits à l'Ordre des Infirmiers de Belgique",
  },
  {
    code: "MUT",
    fullName: "Toutes mutuelles belges",
    description: "Agréé par l'ensemble des organismes assureurs belges",
  },
  {
    code: "CR",
    fullName: "Formations Croix-Rouge",
    description: "Formations continues en premiers secours et gestion des urgences",
  },
  {
    code: "RGPD",
    fullName: "Conformité RGPD",
    description: "Protection des données médicales selon le Règlement Général sur la Protection des Données",
  },
];

export default function CertificationsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-14">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Reconnaissance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Agréments & certifications
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Notre pratique répond aux exigences les plus strictes des organismes
            de référence belges et européens.
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {CERTIFICATIONS.map((cert) => (
            <StaggerItem key={cert.code}>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm mb-0.5">{cert.code}</p>
                  <p className="font-semibold text-foreground text-sm leading-snug mb-1">
                    {cert.fullName}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
