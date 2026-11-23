"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { hrefOr } from "@/lib/links";

export function Nav() {
  const { nav } = site;
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Escape închide meniul; meniul se închide și dacă ecranul trece pe desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 48rem)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="surface-dark sticky top-0 z-50 border-b border-gray-900">
      <nav aria-label={nav.ariaLabel} className="container-site">
        <div className="flex min-h-[72px] items-center justify-between gap-4">
          <a
            href="#top"
            className="rounded-md bg-yellow px-2.5 py-1 font-display text-[22px] font-bold tracking-[0.04em] text-black"
          >
            {nav.logo}
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-7 text-[15px] md:flex">
            <ul className="flex items-center gap-7">
              {nav.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={hrefOr(l.href)}
                    className="text-gray-400 transition-colors hover:text-pure-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ButtonLink href={hrefOr(nav.cta.href)} className="px-5">
              {nav.cta.label}
            </ButtonLink>
          </div>

          {/* Mobil: hamburger */}
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-pill md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? nav.closeMenuLabel : nav.openMenuLabel}
            onClick={() => setOpen((o) => !o)}
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        <div id={menuId} hidden={!open} className="pb-6 md:hidden">
          <ul className="flex flex-col border-t border-gray-900 pt-2">
            {nav.links.map((l) => (
              <li key={l.label}>
                <a
                  href={hrefOr(l.href)}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center font-display text-2xl font-bold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink
            href={hrefOr(nav.cta.href)}
            onClick={() => setOpen(false)}
            className="mt-4 w-full"
          >
            {nav.cta.label}
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}
