import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ZONES, SERVICES, CONTACT_INFO } from "@/lib/constants";
import Logo from "@/components/brand/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* À propos */}
          <div>
            <div className="mb-4">
              <Logo variant="full" size="lg" theme="white" />
            </div>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
              {CONTACT_INFO.phoneDisplay}
            </a>
          </div>

          {/* Zones desservies — 3 communes seulement */}
          <div>
            <h3 className="font-medium text-white mb-4">Zones desservies</h3>
            <ul className="space-y-2">
              {ZONES.map((zone) => (
                <li key={zone.slug}>
                  <Link
                    href={`/zones/${zone.slug}`}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {zone.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos services — 8 catégories */}
          <div>
            <h3 className="font-medium text-white mb-4">Nos services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-slate-400 hover:text-accent transition-colors leading-snug block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <span>{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {year} Mediplus Home. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="hover:text-slate-300 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="hover:text-slate-300 transition-colors"
            >
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
