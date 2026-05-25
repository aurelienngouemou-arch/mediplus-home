import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "horizontal";
  size?: "sm" | "md" | "lg";
  theme?: "light" | "dark" | "white";
  className?: string;
}

const iconSizes = { sm: 36, md: 44, lg: 56 } as const;

const textSizes = {
  sm: { brand: "text-xl", sub: "text-base", slogan: "text-[10px]" },
  md: { brand: "text-2xl", sub: "text-[18px]", slogan: "text-[11px]" },
  lg: { brand: "text-[30px]", sub: "text-[22px]", slogan: "text-[13px]" },
} as const;

function MediplusIcon({
  size = "md",
  white = false,
}: {
  size?: "sm" | "md" | "lg";
  white?: boolean;
}) {
  const dim = iconSizes[size];

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        width="44"
        height="44"
        rx="12"
        style={{ fill: white ? "rgba(255,255,255,0.2)" : "hsl(var(--primary))" }}
      />
      <path
        d="M8 34L8 12L21 26L33 12L33 34"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* shadow offset */}
      <circle cx="35" cy="11" r="7.5" fill="rgba(0,0,0,0.15)" />
      <circle
        cx="34"
        cy="10"
        r="7.5"
        style={{ fill: white ? "rgba(255,255,255,0.9)" : "#05BFDB" }}
      />
      <path
        d="M34 7L34 13M31 10L37 10"
        stroke={white ? "#088395" : "white"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = "full",
  size = "md",
  theme,
  className,
}: LogoProps) {
  const white = theme === "white";
  const ts = textSizes[size];

  const brandColor = white ? "text-white" : "text-primary";
  const subColor = white ? "text-white/80" : "text-secondary";
  const sloganColor = white ? "text-white/60" : "text-muted-foreground";

  const icon = <MediplusIcon size={size} white={white} />;

  if (variant === "icon") {
    return (
      <span
        className={cn("inline-flex shrink-0", className)}
      >
        {icon}
      </span>
    );
  }

  const nameBlock = (
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          "font-serif font-medium leading-none tracking-tight",
          ts.brand,
          brandColor
        )}
      >
        Mediplus
      </span>
      <span
        className={cn(
          "font-serif italic font-normal leading-tight",
          ts.sub,
          subColor
        )}
      >
        Home
      </span>
    </span>
  );

  if (variant === "horizontal") {
    return (
      <span
        className={cn("inline-flex items-center gap-3", className)}
      >
        {icon}
        {nameBlock}
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex flex-col items-center gap-2", className)}
    >
      {icon}
      <span className="flex flex-col items-center leading-none gap-0.5">
        <span
          className={cn(
            "font-serif font-medium leading-none tracking-tight",
            ts.brand,
            brandColor
          )}
        >
          Mediplus
        </span>
        <span
          className={cn(
            "font-serif italic font-normal leading-tight",
            ts.sub,
            subColor
          )}
        >
          Home
        </span>
        <span
          className={cn(
            "font-sans mt-1 tracking-wide leading-none",
            ts.slogan,
            sloganColor
          )}
        >
          Soins à domicile · Belgique
        </span>
      </span>
    </span>
  );
}
