import type { ServiceData } from "@/types";
import FadeIn from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";

interface ProcessServiceProps {
  howItWorks: ServiceData["howItWorks"];
}

export default function ProcessService({ howItWorks }: ProcessServiceProps) {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-14">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Déroulement
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
            {howItWorks.title}
          </h2>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto"
        >
          {howItWorks.steps.length >= 3 && (
            <div
              className="hidden md:block absolute top-[2.75rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-border via-accent/30 to-border"
              aria-hidden="true"
            />
          )}

          {howItWorks.steps.map((step, index) => (
            <StaggerItem key={index}>
              <div className="flex flex-col items-center text-center gap-4 relative">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center z-10 relative shadow-sm">
                    <span className="text-primary font-bold text-xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-white text-[9px] font-bold flex items-center justify-center shadow"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
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
