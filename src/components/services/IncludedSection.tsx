import type { ServiceData } from "@/types";
import { Sparkles } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface IncludedSectionProps {
  whatIncluded: ServiceData["whatIncluded"];
}

export default function IncludedSection({ whatIncluded }: IncludedSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Prestations
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {whatIncluded.title}
          </h2>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {whatIncluded.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-full flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/[0.08] border border-primary/[0.12] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
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
