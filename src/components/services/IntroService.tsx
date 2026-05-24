import type { ServiceData } from "@/types";
import FadeIn from "@/components/animations/FadeIn";

interface IntroServiceProps {
  service: ServiceData;
}

export default function IntroService({ service }: IntroServiceProps) {
  const Icon = service.icon;
  const paragraphs = service.description.split("\n\n");

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="space-y-5">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Blob de fond */}
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
                  style={{ transform: "rotate(6deg)" }}
                />
                <div
                  className="absolute inset-4 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-accent/[0.06] border border-primary/10"
                  style={{ transform: "rotate(-3deg)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
                    <Icon className="w-14 h-14 md:w-18 md:h-18 text-white" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
