import type { ServiceData } from "@/types";
import { Check } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface TargetSectionProps {
  forWho: ServiceData["forWho"];
}

export default function TargetSection({ forWho }: TargetSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-12">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Patients concernés
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {forWho.title}
          </h2>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          {forWho.items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border shadow-sm">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center mt-0.5">
                  <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
