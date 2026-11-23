"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Înălțimea meniului sticky: ancorele se opresc sub el. */
const NAV_OFFSET = -72;

/**
 * Scroll lin cu Lenis pe toată pagina.
 * Dacă utilizatorul are „mai puține animații” activ, Lenis nu pornește deloc.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: { offset: NAV_OFFSET },
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
