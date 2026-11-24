import Link from "next/link";
import type { SiteContent } from "@/content/site";
import { hrefOr } from "@/lib/links";

export type PageKey = "agency" | "creators";

type Props = {
  pages: SiteContent["nav"]["pages"];
  current: PageKey;
  /** Apelat la click (ex. meniul de mobil se închide). */
  onNavigate?: () => void;
};

/**
 * Comutatorul dintre pagini: arată ca două taburi într-o pastilă, dar sunt linkuri reale
 * (fiecare pagină are adresa ei, Next.js o preîncarcă, deci trecerea e instant).
 */
export function PageSwitch({ pages, current, onNavigate }: Props) {
  const items: { key: PageKey; link: SiteContent["nav"]["pages"]["agency"] }[] = [
    { key: "agency", link: pages.agency },
    { key: "creators", link: pages.creators },
  ];

  return (
    <nav aria-label={pages.ariaLabel}>
      <ul className="flex rounded-pill border border-gray-900 p-1">
        {items.map(({ key, link }) => {
          const active = key === current;
          return (
            <li key={key}>
              <Link
                href={hrefOr(link.href)}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={`flex min-h-11 items-center rounded-pill px-3.5 text-sm font-semibold transition-colors duration-200 sm:px-5 sm:text-[15px] ${
                  active ? "bg-yellow text-black" : "text-gray-400 hover:text-pure-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
