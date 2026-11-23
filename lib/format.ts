import { MISSING_NUMBER } from "@/content/site";

const compact = new Intl.NumberFormat("ro-RO", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/**
 * 1250000 → „1,3 mil.”, 48000 → „48 K”, 950 → „950”.
 * Cifrele care lipsesc (`null`) devin „[nr.]”.
 */
export function formatNumber(value: number | null, suffix = ""): string {
  if (value === null) return MISSING_NUMBER;
  return `${compact.format(value)}${suffix}`;
}
