"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

const STATS: Stat[] = [
  { value: 10, suffix: "+", label: "Années d'expérience", sublabel: "Au service des patients" },
  { value: 500, suffix: "+", label: "Patients accompagnés", sublabel: "Chaque année" },
  { value: 3, suffix: "", label: "Communes desservies", sublabel: "Overijse · Hoeilaart · Tervuren" },
  { value: 7, suffix: "j/7", label: "Disponibilité", sublabel: "De 7h à 20h" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-14">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-3">
            En chiffres
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
            Notre engagement en chiffres
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <FadeIn key={stat.label} direction="up" delay={0.1}>
              <div className="text-center">
                <p className="font-serif text-5xl md:text-6xl font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-semibold text-white/90 text-base">{stat.label}</p>
                <p className="text-white/60 text-sm mt-1">{stat.sublabel}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
