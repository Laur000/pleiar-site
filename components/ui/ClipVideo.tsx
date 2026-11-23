"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string | null;
  /** Desktop: true cât timp mouse-ul e pe card (clipul pornește la hover). */
  hovered: boolean;
};

/**
 * Clip vertical de preview, mut.
 * - Desktop (are hover): pornește când ții mouse-ul pe card.
 * - Mobil (fără hover): pornește când cardul ajunge în centrul ecranului.
 * - Se oprește mereu când iese din ecran. `preload="none"`: nu descarcă nimic până nu pornește.
 */
export function ClipVideo({ src, poster, hovered }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const inCenter = useRef(false);
  const visible = useRef(false);
  const canHover = useRef(true);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    canHover.current = window.matchMedia("(hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Oprire când iese complet din ecran.
    const visibility = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      if (!e.isIntersecting) video.pause();
    });
    visibility.observe(video);

    // Pe mobil: pornire doar în banda din mijlocul ecranului.
    let center: IntersectionObserver | null = null;
    if (!canHover.current && !reduced) {
      center = new IntersectionObserver(
        ([e]) => {
          inCenter.current = e.isIntersecting;
          if (e.isIntersecting) void video.play().catch(() => {});
          else video.pause();
        },
        { rootMargin: "-40% 0px -40% 0px" },
      );
      center.observe(video);
    }

    return () => {
      visibility.disconnect();
      center?.disconnect();
    };
  }, []);

  // Desktop: hover.
  useEffect(() => {
    const video = ref.current;
    if (!video || !canHover.current) return;
    if (hovered && visible.current) void video.play().catch(() => {});
    else video.pause();
  }, [hovered]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      src={src}
      poster={poster ?? undefined}
      muted
      playsInline
      loop
      preload="none"
      aria-hidden="true"
    />
  );
}
