import { site, type Stat } from "@/content/site";
import { PortraitFrame } from "@/components/ui/PortraitFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { formatNumber } from "@/lib/format";

/** Cifrele pe un singur rând, mic: „[nr.] abonați YouTube · [nr.] vizualizări pe canal”. */
function InlineStats({ stats, className = "" }: { stats: Stat[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 ${className}`.trim()}>
      {stats.map((s) => (
        <li key={s.label}>
          <strong className="font-display font-bold text-black">{formatNumber(s.value, s.suffix)}</strong>{" "}
          {s.label}
        </li>
      ))}
    </ul>
  );
}

/**
 * „Despre” (pagina Creatori), compact: textul echipei în stânga, creatorii în dreapta
 * ca niște carduri mici (portret mic, nume, nișă, 1–2 fraze, cifrele pe un rând).
 */
export function About() {
  const { about } = site.creators;

  return (
    <section id="despre" className="surface-light py-16 md:py-20" aria-labelledby="despre-titlu">
      <div className="container-site grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="flex flex-col gap-5">
          <SectionHeader id="despre-titlu" eyebrow={about.eyebrow} title={about.title} />
          {about.paragraphs.map((p) => (
            <Reveal as="p" key={p} className="leading-[1.65] text-gray-600">
              {p}
            </Reveal>
          ))}
          {about.stats.length > 0 && (
            <Reveal>
              <InlineStats stats={about.stats} />
            </Reveal>
          )}
        </div>

        <RevealGroup as="ul" className="flex flex-col gap-4">
          {about.creators.map((c) => (
            <RevealItem
              as="li"
              key={c.name}
              className="flex items-start gap-5 rounded-[18px] border-2 border-black bg-pure-white p-4 sm:p-5"
            >
              <PortraitFrame portrait={c.portrait} sizes="110px" offset="sm" className="w-[84px] shrink-0 sm:w-[104px]" />
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[22px] leading-none tracking-[-0.02em]">{c.name}</h3>
                  <span className="rounded-pill bg-black px-2.5 py-0.5 text-xs font-semibold text-pure-white">
                    {c.niche}
                  </span>
                </div>
                {c.bio.map((p) => (
                  <p key={p} className="text-[15px] leading-[1.55] text-gray-600">
                    {p}
                  </p>
                ))}
                <InlineStats stats={c.stats} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
