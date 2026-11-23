import type { ComponentProps } from "react";

export type CardTone =
  | "light" // card alb cu contur negru 2px – pe secțiuni deschise
  | "dark" // card negru – pe galben sau ca „featured” pe alb
  | "dark-muted"; // gri închis – pe negru

const tones: Record<CardTone, string> = {
  light: "bg-pure-white text-black border-2 border-black",
  dark: "bg-black text-pure-white border-2 border-black",
  "dark-muted": "bg-gray-900 text-pure-white",
};

type CardProps = ComponentProps<"div"> & { tone?: CardTone };

export function Card({ tone = "light", className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-card p-7 ${tones[tone]} ${className}`.trim()}
      {...props}
    />
  );
}
