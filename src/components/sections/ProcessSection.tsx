import { getTranslations } from "next-intl/server";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Phone, Home, CalendarCheck } from "lucide-react";

export default async function ProcessSection() {
  const t = await getTranslations("processSection");

  const steps = [
    { icon: Phone, titleKey: "step1Title", descKey: "step1Desc" },
    { icon: Home, titleKey: "step2Title", descKey: "step2Desc" },
    { icon: CalendarCheck, titleKey: "step3Title", descKey: "step3Desc" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-14 md:mb-20">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            {t("label")}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 relative"
        >
          <div
            className="hidden md:block absolute top-[2.75rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-border via-accent/30 to-border"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <StaggerItem key={step.titleKey}>
              <div className="flex flex-col items-center text-center gap-4 relative">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center z-10 relative shadow-sm">
                    <step.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <span
                    className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shadow-md"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">
                    {t(step.titleKey as "step1Title" | "step2Title" | "step3Title")}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                    {t(step.descKey as "step1Desc" | "step2Desc" | "step3Desc")}
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
