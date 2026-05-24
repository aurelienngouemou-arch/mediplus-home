import { Wallet, ShieldCheck, Info } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

interface ReimbursementSectionProps {
  reimbursement: string;
}

export default function ReimbursementSection({
  reimbursement,
}: ReimbursementSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] p-8 md:p-10">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Remboursement & prise en charge INAMI
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {reimbursement}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { icon: ShieldCheck, label: "INAMI agréé", desc: "Tous actes conventionnés" },
                    { icon: ShieldCheck, label: "Toutes mutuelles", desc: "Affilié & non affilié" },
                    { icon: Info, label: "Tiers payant", desc: "Sur demande disponible" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border"
                    >
                      <Icon className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
