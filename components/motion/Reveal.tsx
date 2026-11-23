"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/*
 * Intrare la scroll: fade + 24px în sus, 0.6s, o singură dată per element.
 * Cu „mai puține animații” activ, CSS-ul din globals.css ([data-reveal]) forțează starea finală.
 */

export const EASE_SMOOTH = [0.2, 0.7, 0.2, 1] as const;
const DURATION = 0.6;
const STAGGER = 0.06;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE_SMOOTH, delay },
  }),
};

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: STAGGER } },
};

type Tag = "div" | "ul" | "ol" | "li" | "p" | "dl";

type Props = {
  as?: Tag;
  className?: string;
  children: ReactNode;
  delay?: number;
} & Record<`aria-${string}`, string | undefined>;

/** Un singur element care apare la scroll. */
export function Reveal({ as = "div", className, children, delay = 0, ...rest }: Props) {
  const Component = motion[as];
  return (
    <Component
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={item}
      custom={delay}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Container: copiii <RevealItem> apar pe rând (stagger 0.06s). */
export function RevealGroup({ as = "div", className, children, ...rest }: Omit<Props, "delay">) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={group}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Element dintr-un <RevealGroup>. */
export function RevealItem({ as = "div", className, children }: Omit<Props, "delay">) {
  const Component = motion[as];
  return (
    <Component data-reveal="" className={className} variants={item}>
      {children}
    </Component>
  );
}
