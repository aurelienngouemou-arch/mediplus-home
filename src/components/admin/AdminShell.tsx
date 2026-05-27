"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  Users,
  CalendarDays,
  Handshake,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface AdminShellProps {
  userNom: string;
  userPrenom: string;
  userEmail: string;
  newDemandesCount: number;
  patientsActifsCount: number;
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  disabled?: boolean;
}

function SidebarNav({
  navItems,
  onClose,
}: {
  navItems: NavItem[];
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Navigation admin">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin/dashboard"
            ? pathname === "/admin/dashboard"
            : pathname.startsWith(item.href);

        if (item.disabled) {
          return (
            <div
              key={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground/40 cursor-not-allowed select-none"
              title="Bientôt disponible"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
              <span className="ml-auto text-[10px] bg-muted rounded px-1.5 py-0.5 text-muted-foreground">
                Bientôt
              </span>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-white"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
            {item.badge !== undefined && (
              <Badge
                variant="secondary"
                className={cn(
                  "ml-auto text-[10px] h-5 min-w-5 px-1.5",
                  isActive
                    ? "bg-white/20 text-white hover:bg-white/20"
                    : "bg-primary/10 text-primary"
                )}
              >
                {item.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({
  userNom,
  userPrenom,
  userEmail,
  onClose,
}: {
  userNom: string;
  userPrenom: string;
  userEmail: string;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const initials = `${userPrenom.charAt(0)}${userNom.charAt(0)}`.toUpperCase();

  return (
    <>
      <Separator />
      <div className="px-3 py-3 space-y-0.5">
        <Link
          href="/admin/profil"
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            pathname === "/admin/profil"
              ? "bg-primary text-white"
              : "text-foreground/70 hover:bg-muted hover:text-foreground"
          )}
        >
          <User className="h-4 w-4 shrink-0" />
          <span>Mon profil</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Déconnexion</span>
        </button>
      </div>
      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              {userPrenom} {userNom}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-5 border-b border-border shrink-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white font-serif font-bold text-sm shrink-0">
        M
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">Mediplus Home</p>
        <p className="text-xs text-muted-foreground">Espace infirmier</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded-md hover:bg-muted transition-colors"
          aria-label="Fermer le menu"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export default function AdminShell({
  userNom,
  userPrenom,
  userEmail,
  newDemandesCount,
  patientsActifsCount,
  children,
}: AdminShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "Accueil", href: "/admin/dashboard", icon: LayoutDashboard },
    {
      label: "Demandes",
      href: "/admin/demandes",
      icon: Inbox,
      badge: newDemandesCount > 0 ? newDemandesCount : undefined,
    },
    {
      label: "Patients",
      href: "/admin/patients",
      icon: Users,
      badge: patientsActifsCount > 0 ? patientsActifsCount : undefined,
    },
    { label: "Ma tournée", href: "/admin/tournee", icon: CalendarDays, disabled: true },
    { label: "Mes collègues", href: "/admin/partenaires", icon: Handshake, disabled: true },
  ];

  const currentPageLabel =
    navItems.find((item) =>
      item.href === "/admin/dashboard"
        ? pathname === "/admin/dashboard"
        : pathname.startsWith(item.href)
    )?.label ?? (pathname === "/admin/profil" ? "Mon profil" : "Admin");

  const initials = `${userPrenom.charAt(0)}${userNom.charAt(0)}`.toUpperCase();

  return (
    <div className="fixed inset-0 z-[100] flex bg-background overflow-hidden">
      {/* ─── Desktop sidebar (flex item) ─────────────────────── */}
      <aside className="hidden md:flex w-64 flex-col shrink-0 border-r border-border bg-card">
        <SidebarHeader />
        <SidebarNav navItems={navItems} />
        <SidebarFooter
          userNom={userNom}
          userPrenom={userPrenom}
          userEmail={userEmail}
        />
      </aside>

      {/* ─── Content column (flex-1) ──────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="md:hidden flex h-14 items-center gap-3 px-4 border-b border-border bg-card shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Ouvrir le menu de navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="flex-1 text-sm font-semibold text-foreground truncate">
            {currentPageLabel}
          </span>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="max-w-6xl mx-auto p-4 md:p-6">{children}</div>
        </main>
      </div>

      {/* ─── Mobile drawer (fixed overlay) ───────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[110] bg-black/50 md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed inset-y-0 left-0 z-[120] w-72 flex flex-col bg-card border-r border-border shadow-2xl md:hidden"
            >
              <SidebarHeader onClose={() => setDrawerOpen(false)} />
              <SidebarNav
                navItems={navItems}
                onClose={() => setDrawerOpen(false)}
              />
              <SidebarFooter
                userNom={userNom}
                userPrenom={userPrenom}
                userEmail={userEmail}
                onClose={() => setDrawerOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
