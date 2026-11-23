"use client";

import { useRef, useState } from "react";
import type { SiteContent } from "@/content/site";

type Props = { showreel: SiteContent["hero"]["showreel"] };

function PlayIcon({ size = 30 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/** Showreel 16:9: mut, autoplay, loop, cu buton de sunet. Fără `src` arată placeholder-ul. */
export function Showreel({ showreel }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const frame =
    "relative aspect-video overflow-hidden rounded-card border border-gray-900 bg-gray-900";

  if (!showreel.src) {
    return (
      <div className={`${frame} flex items-center justify-center p-6`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-yellow text-black sm:size-22">
            <PlayIcon />
          </span>
          <span className="text-[15px] text-gray-400">{showreel.placeholder}</span>
        </div>
      </div>
    );
  }

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play();
  };

  return (
    <div className={frame}>
      <video
        ref={videoRef}
        className="size-full object-cover"
        src={showreel.src}
        poster={showreel.poster ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? showreel.soundOnLabel : showreel.soundOffLabel}
        className="absolute right-4 bottom-4 inline-flex size-12 items-center justify-center rounded-full bg-yellow text-black [--focus-color:var(--color-pure-white)]"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" />
          {muted ? (
            <path d="m23 9-6 6M17 9l6 6" />
          ) : (
            <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
          )}
        </svg>
      </button>
    </div>
  );
}
