"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Platform, SiteContent } from "@/content/site";
import { ClipCard } from "@/components/ui/ClipCard";
import { ClipLightbox } from "@/components/ui/ClipLightbox";
import { EASE_SMOOTH, Reveal } from "@/components/motion/Reveal";

type Props = { clients: SiteContent["agency"]["clients"] };
type Clip = SiteContent["agency"]["clients"]["clips"][number];

const transition = { duration: 0.45, ease: EASE_SMOOTH };

/** Filtrele pe platformă + grid-ul de clipuri verticale, cu tranziție de layout la schimbarea filtrului. */
export function ClipGallery({ clients }: Props) {
  const { filters, clips, viewsLabel, player } = clients;
  const [active, setActive] = useState<Platform | null>(null);
  // Clipul deschis pe tot ecranul (null = niciunul).
  const [open, setOpen] = useState<Clip | null>(null);

  const options: { label: string; value: Platform | null }[] = [
    { label: filters.allLabel, value: null },
    ...filters.platforms.map((p) => ({ label: p, value: p })),
  ];
  const shown = clips
    .map((clip, i) => ({ clip, key: `${clip.client}-${i}` }))
    .filter(({ clip }) => !active || clip.platform === active);

  return (
    <div className="flex flex-col gap-8">
      <Reveal>
        <div role="group" aria-label={filters.ariaLabel} className="flex flex-wrap gap-2.5">
          {options.map((o) => {
            const on = o.value === active;
            return (
              <button
                key={o.label}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(o.value)}
                className={`min-h-11 rounded-pill border-2 border-black px-5 py-2.5 text-[15px] font-semibold transition-colors duration-200 ${
                  on ? "bg-black text-yellow" : "text-black hover:bg-pure-white"
                }`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {shown.map(({ clip, key }, i) => (
            <motion.li
              key={key}
              layout
              data-reveal=""
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
              transition={{ ...transition, delay: (i % 4) * 0.06, layout: transition }}
            >
              <ClipCard
                clip={clip}
                viewsLabel={viewsLabel}
                openLabel={player.openLabel}
                onOpen={() => setOpen(clip)}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <ClipLightbox clip={open} labels={player} viewsLabel={viewsLabel} onClose={() => setOpen(null)} />
    </div>
  );
}
