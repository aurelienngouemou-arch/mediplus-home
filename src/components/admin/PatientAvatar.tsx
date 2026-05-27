import { cn } from "@/lib/utils";

const COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-teal-100 text-teal-700",
];

function getColorIndex(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % COLORS.length;
}

interface PatientAvatarProps {
  nom: string;
  prenom: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PatientAvatar({
  nom,
  prenom,
  size = "md",
  className,
}: PatientAvatarProps) {
  const initials = `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
  const colorClass = COLORS[getColorIndex(nom + prenom)];

  const sizeClass = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  }[size];

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold shrink-0",
        sizeClass,
        colorClass,
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
