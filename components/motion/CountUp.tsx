"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

type Props = {
  value: number | null;
  suffix?: string;
};

/**
 * Cifră care numără de la 0 până la valoare când intră în ecran (o singură dată).
 * HTML-ul are deja valoarea finală (bun pentru SEO și fără JS); animația o rescrie doar vizual.
 */
export function CountUp({ value, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const started = useRef(false);

  // Înainte să intre în ecran, cifra arată 0 (doar dacă animația va rula).
  useEffect(() => {
    const el = ref.current;
    if (!el || value === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!started.current) el.textContent = formatNumber(0, suffix);
  }, [value, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === null || !inView || started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = formatNumber(Math.round(v), suffix);
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>{formatNumber(value, suffix)}</span>;
}
