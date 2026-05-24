import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServiceData } from "@/lib/services-data";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface RelatedServicesProps {
  relatedSlugs: string[];
  currentSlug: string;
}

export default function RelatedServices({
  relatedSlugs,
  currentSlug,
}: RelatedServicesProps) {
  const related = relatedSlugs
    .filter((s) => s !== currentSlug)
    .map(getServiceData)
    .filter(Boolean)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            À découvrir aussi
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-foreground">
            Vous pourriez aussi être intéressé par
          </h2>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {related.map((service) => {
            if (!service) return null;
            const Icon = service.icon;
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-4 hover:border-primary/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {service.shortName}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {service.heroSubtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    En savoir plus
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
