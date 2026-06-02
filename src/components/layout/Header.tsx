"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/Logo";
import { Link } from "@/i18n/navigation";
import {
  LanguageSwitcherDesktop,
  LanguageSwitcherMobile,
} from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/zones", label: t("zones") },
    { href: "/a-propos", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" aria-label="Mediplus Home">
            <Logo variant="horizontal" size="sm" className="sm:hidden" />
            <Logo variant="horizontal" size="md" className="hidden sm:inline-flex" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: language switcher + CTA + burger */}
          <div className="flex items-center gap-2">
            {/* Language switcher — desktop only */}
            <div className="hidden md:block">
              <LanguageSwitcherDesktop />
            </div>

            {/* CTA — hidden on small mobile */}
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              {t("bookAppointment")}
            </Link>

            {/* Burger toggle — mobile only */}
            <button
              onClick={() => setIsMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label={isMobileOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-slate-100"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {/* Language switcher — en haut du drawer */}
              <div className="pb-2 mb-1 border-b border-slate-100">
                <LanguageSwitcherMobile onSwitch={() => setIsMobileOpen(false)} />
              </div>

              {/* Nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-primary px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA */}
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full text-sm font-medium mt-2 hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {t("bookAppointment")}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
