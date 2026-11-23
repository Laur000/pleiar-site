"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/site";
import { ClipVideo } from "@/components/ui/ClipVideo";
import { formatNumber } from "@/lib/format";
import { isExternal } from "@/lib/links";

type Clip = SiteContent["clients"]["clips"][number];

type Props = { clip: Clip; viewsLabel: string };

/** Card negru cu clip vertical 9:16, platforma sus și banda galbenă cu views jos. */
export function ClipCard({ clip, viewsLabel }: Props) {
  const [hovered, setHovered] = useState(false);
  const views = `${formatNumber(clip.views)} ${viewsLabel}`;

  const body = (
    <>
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-gray-900">
        {clip.video ? (
          <ClipVideo src={clip.video} poster={clip.poster} hovered={hovered} />
        ) : (
          <div className="flex size-full items-center justify-center p-3 text-center text-sm text-gray-400">
            {clip.placeholder}
          </div>
        )}
        <span className="absolute top-2.5 left-2.5 rounded-pill bg-pure-white px-2.5 py-1 text-xs font-semibold text-black">
          {clip.platform}
        </span>
        <span className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 rounded-[10px] bg-yellow px-3 py-2 text-black">
          <span className="font-display text-[15px] leading-tight font-bold sm:text-lg">{views}</span>
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
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

  const className =
    "flex h-full flex-col gap-3 rounded-[18px] bg-black p-2.5 text-pure-white [--focus-color:var(--color-black)]";
  const hoverProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (clip.href) {
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
