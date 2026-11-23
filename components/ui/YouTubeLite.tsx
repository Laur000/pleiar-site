"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  youtubeId: string;
  title: string;
  playLabel: string;
  /** Afișat peste thumbnail (ex. numărul și durata). */
  children?: React.ReactNode;
};

/**
 * Embed YouTube „lite”: la început e doar thumbnail-ul (o imagine).
 * Iframe-ul YouTube se încarcă abia după click, ca pagina să rămână rapidă.
 */
export function YouTubeLite({ youtubeId, title, playLabel, children }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 size-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`${playLabel}: ${title}`}
      className="group absolute inset-0 size-full cursor-pointer"
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <span className="absolute top-1/2 left-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-yellow text-black transition-transform duration-300 group-hover:scale-110">
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      {children}
    </button>
  );
}
