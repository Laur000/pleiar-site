"use client";

import { motion } from "motion/react";
import { EASE_SMOOTH } from "@/components/motion/Reveal";

type Props = {
  before: string;
  highlight: string;
  after: string;
};

const WORD_STAGGER = 0.07;
const WORD_DURATION = 0.6;
const MARKER_PAUSE = 0.15;
const MARKER_PER_WORD = 0.16;

const words = (s: string) => s.split(/\s+/).filter(Boolean);

/**
 * H1 din hero: cuvintele apar pe rând, apoi blocul galben („marker”) se desenează
 * de la stânga la dreapta peste „chiar le privesc”, iar textul de sub el devine negru.
 * Se animă doar transform și opacity. Cititoarele de ecran citesc fraza întreagă o singură dată.
 */
export function HeroTitle({ before, highlight, after }: Props) {
  const b = words(before);
  const h = words(highlight);
  const a = words(after);
  const total = b.length + h.length + a.length;
  const markerStart = (total - 1) * WORD_STAGGER + WORD_DURATION + MARKER_PAUSE;

  let index = 0;
  const word = (w: string) => {
    const i = index++;
    return (
      <motion.span
        key={`w-${i}`}
        data-reveal=""
        className="inline-block"
        initial={{ opacity: 0, y: "0.3em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: WORD_DURATION, ease: EASE_SMOOTH, delay: i * WORD_STAGGER }}
      >
        {w}
      </motion.span>
    );
  };

  const highlighted = (w: string, j: number) => {
    const i = index++;
    const last = j === h.length - 1;
    const drawDelay = markerStart + j * MARKER_PER_WORD;
    return (
      <motion.span
        key={`h-${i}`}
        data-reveal=""
        className="relative inline-block"
        initial={{ opacity: 0, y: "0.3em" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: WORD_DURATION, ease: EASE_SMOOTH, delay: i * WORD_STAGGER }}
      >
        {/* Bucata de marker a cuvântului; cuvintele din mijloc acoperă și spațiul de după ele. */}
        <motion.span
          aria-hidden="true"
          data-reveal=""
          className={`absolute -top-[0.06em] -bottom-[0.1em] -left-[0.15em] origin-left rounded-[0.12em] bg-yellow ${
            last ? "-right-[0.15em]" : "-right-[0.3em]"
          }`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: MARKER_PER_WORD, ease: "linear", delay: drawDelay }}
        />
        <span className="relative">{w}</span>
        {/* Copia neagră a cuvântului apare odată cu marker-ul (pe galben textul e negru). */}
        <motion.span
          aria-hidden="true"
          data-reveal=""
          className="absolute inset-0 text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: MARKER_PER_WORD, ease: "linear", delay: drawDelay + MARKER_PER_WORD * 0.4 }}
        >
          {w}
        </motion.span>
      </motion.span>
    );
  };

  const withSpaces = (nodes: React.ReactNode[]) =>
    nodes.flatMap((n, k) => (k < nodes.length - 1 ? [n, " "] : [n]));

  return (
    <h1 className="text-h1">
      <span className="sr-only">
        {before} {highlight} {after}
      </span>
      <span aria-hidden="true">
        {withSpaces([...b.map(word), ...h.map(highlighted), ...a.map(word)])}
      </span>
    </h1>
  );
}
