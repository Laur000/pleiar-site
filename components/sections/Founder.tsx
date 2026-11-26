import Link from "next/link";
import { site } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";
import { PortraitFrame } from "@/components/ui/PortraitFrame";
import { StatList } from "@/components/ui/StatList";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { hrefOr } from "@/lib/links";

/**
 * „Cine suntem” (pagina Agenție): rezumatul echipei pentru branduri.
 * Fiecare creator: portret mic, nume, nișă și prima cifră a canalului (de obicei abonații).
 * Varianta completă („Despre”) e pe pagina Creatori, unde duce butonul.
 */
export function Founder() {
  const { founder } = site.agency;

  return (
    <section id="fondator" className="surface-light section-y" aria-labelledby="fondator-titlu">
      <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
        <RevealGroup as="ul" className="grid max-w-[420px] grid-cols-2 gap-5 sm:gap-8">
          {founder.creators.map((c) => (
            <RevealItem as="li" key={c.name} className="flex flex-col gap-4">
              <PortraitFrame portrait={c.portrait} sizes="190px" offset="sm" />
              <div className="flex flex-col gap-0.5">
                <span className="font-display text-xl leading-tight font-bold">{c.name}</span>
                <span className="text-sm text-gray-600">{c.niche}</span>
              </div>
              {c.stats[0] && <StatList stats={[c.stats[0]]} />}
            </RevealItem>
          ))}
        </RevealGroup>

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
          <RevealItem className="mt-2">
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
