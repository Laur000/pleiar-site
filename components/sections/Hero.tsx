import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Showreel } from "@/components/ui/Showreel";
import { hrefOr } from "@/lib/links";

export function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="surface-dark">
      <div className="container-site flex flex-col gap-12 pt-16 pb-16 md:pt-24 md:pb-[72px]">
        <div className="flex max-w-[1040px] flex-col gap-6">
          <p className="flex items-center gap-2.5 text-sm tracking-[0.14em] text-gray-400 uppercase">
            <span aria-hidden="true" className="size-2 rounded-full bg-yellow" />
            {hero.eyebrow}
          </p>

          <h1 className="text-h1">
            {hero.title.before}{" "}
            <span className="box-decoration-clone rounded-[0.12em] bg-yellow px-[0.15em] text-black">
              {hero.title.highlight}
            </span>{" "}
            {hero.title.after}
          </h1>

          <p className="max-w-[640px] text-lg leading-[1.55] text-gray-400 md:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-2 flex flex-wrap gap-3.5">
            <ButtonLink href={hrefOr(hero.primaryCta.href)} className="px-[26px] py-4">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hrefOr(hero.secondaryCta.href)}
              variant="outline-light"
              className="px-[26px] py-4 font-medium"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <Showreel showreel={hero.showreel} />
      </div>
    </section>
  );
}
