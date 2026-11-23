"use client";

import { useState } from "react";
import type { Platform, SiteContent } from "@/content/site";
import { ClipCard } from "@/components/ui/ClipCard";

type Props = { clients: SiteContent["clients"] };

/** Filtrele pe platformă + grid-ul de clipuri verticale. */
export function ClipGallery({ clients }: Props) {
  const { filters, clips, viewsLabel } = clients;
  const [active, setActive] = useState<Platform | null>(null);

  const options: { label: string; value: Platform | null }[] = [
    { label: filters.allLabel, value: null },
    ...filters.platforms.map((p) => ({ label: p, value: p })),
  ];
  const shown = active ? clips.filter((c) => c.platform === active) : clips;

  return (
    <div className="flex flex-col gap-8">
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

      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((clip, i) => (
          <li key={`${clip.client}-${i}`}>
            <ClipCard clip={clip} viewsLabel={viewsLabel} />
          </li>
        ))}
      </ul>
    </div>
  );
}
