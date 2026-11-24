import type { Stat } from "@/content/site";
import { CountUp } from "@/components/motion/CountUp";

type Props = {
  stats: Stat[];
  /** „compact”: în Despre (36px, linie groasă deasupra fiecărei cifre). „large”: totalurile de la Clienți (52px). */
  size?: "compact" | "large";
  /** Clasa pentru eticheta de sub cifră (culoarea depinde de fundal). */
  labelClassName?: string;
  className?: string;
};

/** Varianta compactă: câte o coloană pentru fiecare cifră (1–3). */
const COMPACT_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

export function StatList({
  stats,
  size = "compact",
  labelClassName = "text-gray-600",
  className = "",
}: Props) {
  const isLarge = size === "large";
  const compactColumns = COMPACT_COLUMNS[stats.length] ?? "grid-cols-3";

  return (
    <dl
      className={`grid gap-4 ${
        isLarge ? "grid-cols-1 sm:grid-cols-3" : compactColumns
      } ${className}`.trim()}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={`flex flex-col gap-1.5 ${
            isLarge ? "" : "border-t-4 border-current pt-4"
          }`}
        >
          <dt className={`order-2 text-sm leading-snug ${isLarge ? "text-[15px]" : ""} ${labelClassName}`}>
            {s.label}
          </dt>
          <dd
            className={`order-1 font-display leading-none font-bold ${
              isLarge ? "text-[44px] md:text-[52px]" : "text-[28px] sm:text-4xl"
            }`}
          >
            <CountUp value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
