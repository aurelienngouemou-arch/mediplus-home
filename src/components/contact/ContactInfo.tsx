import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import StylizedMap from "@/components/maps/StylizedMap";

export default function ContactInfo() {
  const cards = [
    {
      icon: Phone,
      title: "Téléphone",
      content: (
        <>
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="text-primary font-semibold text-lg hover:underline"
          >
            {CONTACT_INFO.phoneDisplay}
          </a>
          <p className="text-xs text-muted-foreground mt-1">{CONTACT_INFO.hours}</p>
        </>
      ),
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: (
        <>
          <a
            href={`https://wa.me/${CONTACT_INFO.phone.replace(/\+/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#25D366] text-white rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#22c55e] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Écrire sur WhatsApp
          </a>
          <p className="text-xs text-muted-foreground mt-2">Réponse en moins de 30 min</p>
        </>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-primary text-sm hover:underline break-all"
          >
            {CONTACT_INFO.email}
          </a>
          <p className="text-xs text-muted-foreground mt-1">Réponse sous 24h max</p>
        </>
      ),
    },
    {
      icon: MapPin,
      title: "Zone d'intervention",
      content: (
        <>
          <p className="text-sm text-foreground font-medium">{CONTACT_INFO.address}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Overijse · Hoeilaart · Tervuren
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {cards.map(({ icon: Icon, title, content }) => (
        <div
          key={title}
          className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/[0.07] border border-primary/[0.12] flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              {title}
            </p>
            {content}
          </div>
        </div>
      ))}

      {/* Carte stylisée */}
      <div className="rounded-xl border border-border overflow-hidden shadow-sm">
        <StylizedMap className="w-full" />
      </div>
    </div>
  );
}
