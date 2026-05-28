"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";

interface TourneeViewToggleProps {
  currentVue: string;
  currentDate: string;
}

export default function TourneeViewToggle({ currentVue, currentDate }: TourneeViewToggleProps) {
  const router = useRouter();

  const switchVue = (vue: string) => {
    router.push(`/admin/tournee?vue=${vue}&date=${currentDate}`);
  };

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      <button
        onClick={() => switchVue("jour")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
          currentVue !== "semaine"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <LayoutList className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Vue Jour</span>
        <span className="sm:hidden">Jour</span>
      </button>
      <button
        onClick={() => switchVue("semaine")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
          currentVue === "semaine"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <CalendarDays className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Vue Semaine</span>
        <span className="sm:hidden">Semaine</span>
      </button>
    </div>
  );
}
