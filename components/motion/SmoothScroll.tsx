"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Scroll lin cu Lenis pe toată pagina.
 * Dacă utilizatorul are „mai puține animații” activ, Lenis nu pornește deloc.
 *
 * Ancorele se opresc sub meniul sticky datorită `scroll-padding-top` din globals.css.
 * Lenis îl citește singur, deci NU îi dăm și `offset` (s-ar aduna de două ori).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
