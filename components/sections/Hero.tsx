import Link from "next/link";
import type { HeroContent, Link as LinkContent } from "@/content/site";
import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { Showreel } from "@/components/ui/Showreel";
import { HeroTitle } from "@/components/motion/HeroTitle";
import { Reveal } from "@/components/motion/Reveal";
import { hrefOr } from "@/lib/links";

type Props = { hero: HeroContent };

/**
 * Buton din hero. Linkurile spre o altă pagină a site-ului (ex. „/youtube”) merg prin
 * `next/link` (trecere instant, fără reîncărcare); ancorele („#contact”) rămân `<a>`.
 */
function HeroButton({ link, variant, className }: { link: LinkContent; variant: ButtonVariant; className: string }) {
  const href = hrefOr(link.href);
  const classes = buttonClasses(variant, className);
  return href.startsWith("/") ? (
    <Link href={href} className={classes}>
      {link.label}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {link.label}
    </a>
  );
}

/** Primul ecran al unei pagini: etichetă, titlu cu marker galben, subtitlu, 2 butoane, showreel opțional. */
export function Hero({ hero }: Props) {
  return (
    <section className="surface-dark">
      <div className="container-site flex flex-col gap-12 pt-16 pb-16 md:pt-24 md:pb-[72px]">
        <div className="flex max-w-[1040px] flex-col gap-6">
          <Reveal as="p" className="flex items-center gap-2.5 text-sm tracking-[0.14em] text-gray-400 uppercase">
            <span aria-hidden="true" className="size-2 rounded-full bg-yellow" />
            {hero.eyebrow}
          </Reveal>

          <HeroTitle {...hero.title} />

          <Reveal as="p" delay={0.45} className="max-w-[640px] text-lg leading-[1.55] text-gray-400 md:text-xl">
            {hero.subtitle}
          </Reveal>

          <Reveal delay={0.55} className="mt-2 flex flex-wrap gap-3.5">
            <HeroButton link={hero.primaryCta} variant="yellow" className="px-[26px] py-4" />
            <HeroButton link={hero.secondaryCta} variant="outline-light" className="px-[26px] py-4 font-medium" />
          </Reveal>
        </div>

        {hero.showreel && (
          <Reveal delay={0.65}>
            <Showreel showreel={hero.showreel} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
