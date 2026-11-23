"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";
import { formatNumber } from "@/lib/format";
import { isExternal } from "@/lib/links";

type Clip = SiteContent["clients"]["clips"][number];

type Props = {
  clip: Clip | null;
  labels: SiteContent["clients"]["player"];
  viewsLabel: string;
  onClose: () => void;
};

/**
 * Clipul din player. Coperta apare imediat; peste ea, un indicator de încărcare
 * până când clipul poate porni (`canplay`). Are `key` pe sursă, deci starea se resetează la fiecare clip.
 */
function LightboxVideo({ src, poster, loadingLabel }: { src: string; poster: string | null; loadingLabel: string }) {
  const [ready, setReady] = useState(false);

  return (
    <div className="relative flex max-h-[calc(100dvh-200px)] max-w-full justify-center">
      <video
        className="max-h-[calc(100dvh-200px)] w-auto max-w-full rounded-xl bg-gray-900"
        src={src}
        poster={poster ?? undefined}
        controls
        autoPlay
        playsInline
        loop
        preload="auto"
        onCanPlay={() => setReady(true)}
      />
      {!ready && (
        <span role="status" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="sr-only">{loadingLabel}</span>
          <span
            aria-hidden="true"
            className="size-12 animate-spin rounded-full border-4 border-yellow border-t-transparent motion-reduce:animate-none"
          />
        </span>
      )}
    </div>
  );
}

/**
 * Player pe tot ecranul pentru un clip vertical: calitate completă, cu sunet și controale.
 * Folosește `<dialog>` nativ: Escape închide, focusul rămâne în dialog și revine pe card la închidere.
 */
export function ClipLightbox({ clip, labels, viewsLabel, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  // Starea din React (`clip`) e singura sursă de adevăr: orice închidere trece prin `onClose`,
  // iar dialogul nativ doar o urmează. Nu ascultăm evenimentul nativ `close`, pentru că vine
  // asincron și poate ajunge după ce s-a deschis deja alt clip.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (clip && !dialog.open) dialog.showModal();
    if (!clip && dialog.open) dialog.close();
  }, [clip]);

  return (
    <dialog
      ref={ref}
      // Escape (și butonul „înapoi” pe Android): îl oprim și închidem prin stare.
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // Click pe fundal (în afara clipului) închide.
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-label={clip ? `${clip.client} – ${clip.platform}` : undefined}
      data-lenis-prevent=""
      className="surface-dark fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-black p-0 opacity-100 transition-opacity duration-300 backdrop:bg-black open:flex starting:open:opacity-0 motion-reduce:transition-none"
    >
      {clip?.video && (
        <div
          className="m-auto flex max-h-full w-full flex-col items-center gap-4 px-4 py-16"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <LightboxVideo
            key={clip.videoHd ?? clip.video}
            src={clip.videoHd ?? clip.video}
            poster={clip.poster}
            loadingLabel={labels.loadingLabel}
          />
          <div className="flex w-full max-w-[480px] flex-wrap items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="font-semibold">{clip.client}</span>
              <span className="text-sm text-gray-400">
                {clip.platform} · <span className="text-yellow">{formatNumber(clip.views)} {viewsLabel}</span>
              </span>
            </div>
            {clip.href && (
              <a
                href={clip.href}
                className={buttonClasses("yellow")}
                {...(isExternal(clip.href) && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {labels.originalLabel}
              </a>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        aria-label={labels.closeLabel}
        className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-full bg-yellow text-black transition-transform duration-200 hover:scale-105"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </dialog>
  );
}
