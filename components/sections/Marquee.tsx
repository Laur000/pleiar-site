import { site } from "@/content/site";

/**
 * Bandă galbenă care se mișcă continuu (CSS pur, vezi `.marquee` în globals.css).
 * Textul e repetat de 4 ori: animația mută jumătate din bandă, deci bucla e fără cusătură
 * și acoperă și ecranele late.
 */
export function Marquee() {
  const { items, separator } = site.marquee;
  const line = items.map((item) => `${item} ${separator}`).join(" ");

  return (
    <div
      aria-hidden="true"
      className="marquee-wrap surface-yellow overflow-hidden border-y-2 border-black"
    >
      <div className="marquee py-4 font-display text-[22px] font-bold tracking-[0.02em] whitespace-nowrap md:py-[18px] md:text-[28px]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="pr-10">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
