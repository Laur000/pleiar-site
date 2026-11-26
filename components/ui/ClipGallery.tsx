"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ClipCategory, SiteContent } from "@/content/site";
import { ClipCard } from "@/components/ui/ClipCard";
import { ClipLightbox } from "@/components/ui/ClipLightbox";
import { EASE_SMOOTH, Reveal } from "@/components/motion/Reveal";

type Props = { clients: SiteContent["agency"]["clients"] };
type Clip = SiteContent["agency"]["clients"]["clips"][number];
type Item = { clip: Clip; key: string };

/** Tab-ul activ: cel mixt sau o categorie. */
type Tab = "mixed" | ClipCategory;

const transition = { duration: 0.45, ease: EASE_SMOOTH };
/** Câte clipuri pe rând pe ecran lat (trebuie să corespundă cu lățimea `lg:w-[…/5]` de mai jos). */
const PER_ROW = 5;

/** Ia primele `perCategory` din fiecare listă și le alternează: A1, V1, A2, V2, … */
function interleave(lists: Item[][], perCategory: number): Item[] {
  const trimmed = lists.map((l) => l.slice(0, perCategory));
  const longest = Math.max(0, ...trimmed.map((l) => l.length));
  const out: Item[] = [];
  for (let i = 0; i < longest; i++) {
    for (const list of trimmed) if (list[i]) out.push(list[i]);
  }
  return out;
}

/**
 * Tab-urile (mixt / Ads / Virale) + grila de clipuri verticale, cu tranziție de layout la schimbare.
 * Tab-ul mixt arată câte `mixedPerCategory` din fiecare categorie, alternate.
 */
export function ClipGallery({ clients }: Props) {
  const { filters, clips, viewsLabel, player } = clients;
  const [active, setActive] = useState<Tab>("mixed");
  // Clipul deschis pe tot ecranul (null = niciunul).
  const [open, setOpen] = useState<Clip | null>(null);

  const items: Item[] = clips.map((clip, i) => ({ clip, key: `${clip.client}-${i}` }));
  const byCategory = (id: ClipCategory) => items.filter(({ clip }) => clip.category === id);

  const tabs: { label: string; value: Tab }[] = [
    { label: filters.mixedLabel, value: "mixed" },
    ...filters.categories.map((c) => ({ label: c.label, value: c.id })),
  ];
  const shown =
    active === "mixed"
      ? interleave(filters.categories.map((c) => byCategory(c.id)), filters.mixedPerCategory)
      : byCategory(active);

  return (
    <div className="flex flex-col gap-8">
      <Reveal>
        <div role="group" aria-label={filters.ariaLabel} className="flex flex-wrap gap-2.5">
          {tabs.map((t) => {
            const on = t.value === active;
            return (
              <button
                key={t.value}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(t.value)}
                className={`min-h-11 rounded-pill border-2 border-black px-5 py-2.5 text-[15px] font-semibold transition-colors duration-200 ${
                  on ? "bg-black text-yellow" : "text-black hover:bg-pure-white"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Flex (nu grid), ca ultimul rând incomplet să stea centrat: 2 pe rând pe telefon, 3 pe tabletă, 5 pe desktop. */}
      <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {shown.map(({ clip, key }, i) => (
            <motion.li
              key={key}
              layout
              data-reveal=""
              className="w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
              transition={{ ...transition, delay: (i % PER_ROW) * 0.06, layout: transition }}
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
