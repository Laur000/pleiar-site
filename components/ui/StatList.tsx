import type { Stat } from "@/content/site";
import { formatNumber } from "@/lib/format";

type Props = {
  stats: Stat[];
  /** „compact”: în Despre (36px, linie groasă deasupra fiecărei cifre). „large”: totalurile de la Clienți (52px). */
  size?: "compact" | "large";
  /** Clasa pentru eticheta de sub cifră (culoarea depinde de fundal). */
  labelClassName?: string;
  className?: string;
};

export function StatList({
  stats,
  size = "compact",
  labelClassName = "text-gray-600",
  className = "",
}: Props) {
  const isLarge = size === "large";

  return (
    <dl
      className={`grid gap-4 ${
        isLarge ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-3"
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
            {formatNumber(s.value, s.suffix)}
          </dd>
        </div>
      ))}
    </dl>
  );
}
