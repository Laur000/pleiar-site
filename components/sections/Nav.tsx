"use client";

import { useEffect, useId, useState } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { PageSwitch, type PageKey } from "@/components/ui/PageSwitch";
import { hrefOr } from "@/lib/links";

type Props = {
  /** Pagina pe care e meniul: alege linkurile secțiunilor și tabul activ din comutator. */
  page: PageKey;
};

export function Nav({ page }: Props) {
  const { nav } = site;
  const links = site[page].navLinks;
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // Escape închide meniul; meniul se închide și dacă ecranul trece pe desktop (lg, 1024px).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 64rem)");
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
        <div className="flex min-h-[72px] items-center gap-3 sm:gap-6">
          <a
            href="#top"
            className="shrink-0 rounded-md bg-yellow px-2 py-1 font-display text-lg font-bold tracking-[0.04em] text-black sm:px-2.5 sm:text-[22px]"
          >
            {nav.logo}
          </a>

          <PageSwitch pages={nav.pages} current={page} onNavigate={() => setOpen(false)} />

          {/* Desktop */}
          <div className="ml-auto hidden items-center gap-7 text-[15px] lg:flex">
            <ul className="flex items-center gap-7">
              {links.map((l) => (
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
            className="-mr-2 ml-auto inline-flex size-11 shrink-0 items-center justify-center rounded-pill lg:hidden"
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

        {/*
          Meniul de mobil stă PESTE pagină (absolute, sub bara de sus), nu o împinge în jos.
          Altfel, la click pe un link, poziția secțiunii s-ar calcula cu meniul deschis
          și ar fi greșită după ce meniul se închide.
        */}
        <div
          id={menuId}
          hidden={!open}
          className="absolute inset-x-0 top-full border-b border-gray-900 bg-black lg:hidden"
        >
          <div className="container-site pb-6">
            <ul className="flex flex-col border-t border-gray-900 pt-2">
              {links.map((l) => (
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
        </div>
      </nav>
    </header>
  );
}
