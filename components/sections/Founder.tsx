import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";
import { StatList } from "@/components/ui/StatList";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { hrefOr } from "@/lib/links";

/**
 * „Cine e în spate” (pagina Agenție): rezumatul despre Pleiar pentru branduri.
 * Varianta completă („Despre”) e pe pagina de creatori, unde duce butonul.
 */
export function Founder() {
  const { founder } = site.agency;

  return (
    <section id="fondator" className="surface-light section-y" aria-labelledby="fondator-titlu">
      <div className="container-site grid grid-cols-1 items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
        {/* Portret mic, cu blocul galben decalat în spate (ca la „Despre”, mai mic) */}
        <Reveal className="relative mr-3.5 mb-3.5 w-full max-w-[240px] md:w-[280px] md:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-card bg-yellow"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-black">
            {founder.portrait.src ? (
              <Image
                src={founder.portrait.src}
                alt={founder.portrait.alt}
                fill
                sizes="(min-width: 768px) 280px, 240px"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center p-5 text-center text-sm text-gray-400">
                {founder.portrait.placeholder}
              </div>
            )}
          </div>
        </Reveal>

        <RevealGroup className="flex max-w-[640px] flex-col gap-6">
          <RevealItem as="p" className="eyebrow">
            {founder.eyebrow}
          </RevealItem>
          <RevealItem>
            <h2 id="fondator-titlu" className="text-h2">
              {founder.title}
            </h2>
          </RevealItem>
          {founder.paragraphs.map((p) => (
            <RevealItem as="p" key={p} className="text-lg leading-[1.65] text-gray-600">
              {p}
            </RevealItem>
          ))}
          <RevealItem className="mt-2 flex flex-wrap items-end gap-x-10 gap-y-6">
            <StatList stats={founder.stats} className="min-w-[160px]" />
            <Link href={hrefOr(founder.link.href)} className={buttonClasses("outline-dark")}>
              {founder.link.label}
              <span aria-hidden="true">→</span>
            </Link>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
