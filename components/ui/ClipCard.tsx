"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/site";
import { ClipVideo } from "@/components/ui/ClipVideo";
import { formatNumber } from "@/lib/format";
import { isExternal } from "@/lib/links";

type Clip = SiteContent["agency"]["clients"]["clips"][number];

type Props = {
  clip: Clip;
  viewsLabel: string;
  /** Textul butonului care deschide clipul pe tot ecranul (pentru cititoare de ecran). */
  openLabel: string;
  /** Deschide clipul pe tot ecranul, cu sunet. */
  onOpen: () => void;
};

/**
 * Card negru cu clip vertical 9:16, platforma sus și banda galbenă cu views jos.
 * Preview-ul e mut; click pe card deschide clipul pe tot ecranul, cu sunet.
 */
export function ClipCard({ clip, viewsLabel, openLabel, onOpen }: Props) {
  const [hovered, setHovered] = useState(false);
  const views = `${formatNumber(clip.views)} ${viewsLabel}`;

  const body = (
    <>
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-gray-900">
        {clip.video ? (
          <>
            <ClipVideo src={clip.video} poster={clip.poster} hovered={hovered} />
            {/* Tot clipul e un buton: deschide player-ul pe tot ecranul. */}
            <button
              type="button"
              onClick={() => {
                // Oprește preview-ul mut din card: clipul HD din player are nevoie de toată conexiunea.
                setHovered(false);
                onOpen();
              }}
              aria-label={`${openLabel}: ${clip.client}, ${clip.platform}`}
              className="absolute inset-0 size-full cursor-pointer rounded-xl"
            />
          </>
        ) : (
          <div className="flex size-full items-center justify-center p-3 text-center text-sm text-gray-400">
            {clip.placeholder}
          </div>
        )}
        <span className="pointer-events-none absolute top-2.5 left-2.5 rounded-pill bg-pure-white px-2.5 py-1 text-xs font-semibold text-black">
          {clip.platform}
        </span>
        {/* Pe telefon cardul e îngust: textul rămâne pe un rând (mai mic), iar iconița apare de la sm în sus. */}
        <span className="pointer-events-none absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-[10px] bg-yellow px-2.5 py-2 text-black sm:inset-x-2.5 sm:bottom-2.5 sm:px-3">
          <span className="truncate font-display text-[13px] leading-tight font-bold sm:text-lg">{views}</span>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="hidden shrink-0 sm:block">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <div className="flex flex-col gap-1 px-1 pb-1.5">
        <span className="font-semibold">{clip.client}</span>
        <span className="text-sm leading-snug text-gray-400">{clip.what}</span>
      </div>
    </>
  );

  // Focus: galben pe butonul din cardul negru; negru când tot cardul e link (contur pe fundalul galben).
  const linkCard = !clip.video && !!clip.href;
  const className = `tile flex h-full flex-col gap-3 rounded-[18px] bg-black p-2.5 text-pure-white ${
    linkCard ? "[--focus-color:var(--color-black)]" : "[--focus-color:var(--color-yellow)]"
  }`;
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  // Fără clip, dar cu link: tot cardul duce la clipul original.
  // (Când există clip, linkul original apare în player-ul pe tot ecranul.)
  if (linkCard && clip.href) {
    return (
      <a
        href={clip.href}
        className={className}
        {...hoverProps}
        {...(isExternal(clip.href) && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {body}
      </a>
    );
  }

  return (
    <article className={className} {...hoverProps}>
      {body}
    </article>
  );
}
