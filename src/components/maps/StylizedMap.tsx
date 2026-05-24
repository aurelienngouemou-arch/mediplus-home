"use client";

import { motion } from "framer-motion";

type ZoneSlug = "overijse" | "hoeilaart" | "tervuren";

interface StylizedMapProps {
  highlightZone?: ZoneSlug;
  className?: string;
}

const PRIMARY = "#0A4D68";
const SECONDARY = "#088395";
const ACCENT = "#05BFDB";
const NEUTRAL = "#94a3b8";
const BRUSSELS_FILL = "#e2e8f0";
const BRUSSELS_STROKE = "#94a3b8";

const CITIES = {
  brussels: { x: 78, y: 118, label: "Bruxelles", code: null, slug: null },
  tervuren: {
    x: 270,
    y: 80,
    label: "Tervuren",
    code: "3080",
    slug: "tervuren" as ZoneSlug,
  },
  hoeilaart: {
    x: 210,
    y: 208,
    label: "Hoeilaart",
    code: "1560",
    slug: "hoeilaart" as ZoneSlug,
  },
  overijse: {
    x: 335,
    y: 216,
    label: "Overijse",
    code: "3090",
    slug: "overijse" as ZoneSlug,
  },
} as const;

const LABEL_OFFSETS: Record<keyof typeof CITIES, { x: number; y: number }> = {
  brussels: { x: -4, y: -16 },
  tervuren: { x: 14, y: -14 },
  hoeilaart: { x: -72, y: 20 },
  overijse: { x: 14, y: 18 },
};

export default function StylizedMap({
  highlightZone,
  className,
}: StylizedMapProps) {
  const getZoneColor = (slug: ZoneSlug | null): string => {
    if (!slug) return BRUSSELS_FILL;
    if (!highlightZone) return SECONDARY;
    return slug === highlightZone ? PRIMARY : NEUTRAL;
  };

  const isHighlighted = (slug: ZoneSlug | null): boolean =>
    !!slug && slug === highlightZone;

  return (
    <svg
      viewBox="0 0 440 300"
      role="img"
      aria-label="Carte stylisée des communes desservies"
      className={className}
      style={{ width: "100%", height: "auto" }}
    >
      {/* Background */}
      <rect width="440" height="300" fill="#faf9f6" rx="12" />

      {/* Subtle grid */}
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#f0ede8"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="440" height="300" fill="url(#grid)" rx="12" />

      {/* Forest of Soignes decorative blob */}
      <ellipse
        cx="252"
        cy="202"
        rx="115"
        ry="68"
        fill="#d1fae5"
        opacity="0.55"
      />
      <ellipse
        cx="245"
        cy="196"
        rx="90"
        ry="50"
        fill="#a7f3d0"
        opacity="0.3"
      />
      <text
        x="232"
        y="238"
        fontSize="9"
        fill="#059669"
        opacity="0.7"
        fontStyle="italic"
        textAnchor="middle"
      >
        Forêt de Soignes
      </text>

      {/* Connection lines Brussels → zones */}
      {(["tervuren", "hoeilaart", "overijse"] as const).map((key) => {
        const city = CITIES[key];
        const highlighted = isHighlighted(city.slug);
        return (
          <line
            key={key}
            x1={CITIES.brussels.x}
            y1={CITIES.brussels.y}
            x2={city.x}
            y2={city.y}
            stroke={highlighted ? ACCENT : "#d1d5db"}
            strokeWidth={highlighted ? 1.5 : 1}
            strokeDasharray={highlighted ? "6,3" : "4,4"}
            opacity={highlighted ? 0.8 : 0.5}
          />
        );
      })}

      {/* Brussels reference */}
      <circle
        cx={CITIES.brussels.x}
        cy={CITIES.brussels.y}
        r={7}
        fill={BRUSSELS_FILL}
        stroke={BRUSSELS_STROKE}
        strokeWidth={1.5}
      />
      <text
        x={CITIES.brussels.x + LABEL_OFFSETS.brussels.x}
        y={CITIES.brussels.y + LABEL_OFFSETS.brussels.y}
        fontSize="10"
        fill="#64748b"
        textAnchor="middle"
        fontWeight="500"
      >
        Bruxelles
      </text>

      {/* Zone cities */}
      {(["tervuren", "hoeilaart", "overijse"] as const).map((key) => {
        const city = CITIES[key];
        const highlighted = isHighlighted(city.slug);
        const color = getZoneColor(city.slug);
        const r = highlighted ? 11 : 8;
        const labelOffset = LABEL_OFFSETS[key];

        return (
          <g key={key}>
            {/* Pulse rings for highlighted zone */}
            {highlighted && (
              <>
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={r}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={1.5}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={r}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth={1}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  animate={{ scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.8,
                  }}
                />
              </>
            )}

            {/* City dot */}
            <motion.circle
              cx={city.x}
              cy={city.y}
              r={r}
              fill={color}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            />

            {/* Inner dot for highlighted */}
            {highlighted && (
              <circle cx={city.x} cy={city.y} r={4} fill="white" opacity={0.4} />
            )}

            {/* Labels */}
            <text
              x={city.x + labelOffset.x}
              y={city.y + labelOffset.y}
              fontSize="11"
              fill={highlighted ? PRIMARY : "#475569"}
              fontWeight={highlighted ? "700" : "600"}
              textAnchor={labelOffset.x < 0 ? "end" : "start"}
            >
              {city.label}
            </text>
            {city.code && (
              <text
                x={city.x + labelOffset.x}
                y={city.y + labelOffset.y + 13}
                fontSize="9"
                fill={highlighted ? SECONDARY : "#94a3b8"}
                textAnchor={labelOffset.x < 0 ? "end" : "start"}
              >
                {city.code}
              </text>
            )}
          </g>
        );
      })}

      {/* Legend */}
      <rect
        x="12"
        y="258"
        width="130"
        height="30"
        rx="6"
        fill="white"
        opacity="0.8"
      />
      <circle cx="26" cy="273" r="4" fill={PRIMARY} />
      <text x="34" y="277" fontSize="9" fill="#475569">
        Zone couverte
      </text>
      <circle cx="88" cy="273" r="4" fill={NEUTRAL} />
      <text x="96" y="277" fontSize="9" fill="#475569">
        Autre
      </text>
    </svg>
  );
}
