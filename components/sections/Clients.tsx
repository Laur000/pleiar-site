import Image from "next/image";
import { site } from "@/content/site";
import { ClipGallery } from "@/components/ui/ClipGallery";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatList } from "@/components/ui/StatList";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function Clients() {
  const { clients } = site.agency;

  return (
    <section id="clienti" className="surface-yellow section-y" aria-labelledby="clienti-titlu">
      <div className="container-site flex flex-col gap-12">
        <SectionHeader
          id="clienti-titlu"
          eyebrow={clients.eyebrow}
          title={clients.title}
          intro={clients.intro}
          introClassName="text-ink-on-yellow"
          className="max-w-[780px]"
        />

        {/*
          Logo-urile: 2 pe rând pe telefon, 3 / 4 pe tabletă, 7 pe desktop (14 logo-uri = 2 rânduri pline).
          Flex, ca ultimul rând incomplet să stea centrat. Implicit fiecare logo e afișat în negru
          (`brightness-0`), ca grila să arate unitar pe galben; `mono: false` îl lasă în culorile lui.
        */}
        <RevealGroup as="ul" className="flex flex-wrap justify-center gap-3">
          {clients.logos.map((logo, i) => (
            <RevealItem
              as="li"
              key={`${logo.name}-${i}`}
              className="relative flex h-[72px] w-[calc((100%-0.75rem)/2)] items-center justify-center rounded-xl border-2 border-black px-4 text-center text-sm font-medium sm:w-[calc((100%-1.5rem)/3)] md:w-[calc((100%-2.25rem)/4)] lg:w-[calc((100%-4.5rem)/7)]"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="(min-width: 1024px) 170px, (min-width: 768px) 25vw, 50vw"
                  className={`object-contain ${logo.square ? "px-3 py-1" : "px-4 py-3"} ${logo.mono === false ? "" : "brightness-0"}`}
                />
              ) : (
                logo.name
              )}
            </RevealItem>
          ))}
        </RevealGroup>

        <ClipGallery clients={clients} />

        <Reveal>
          <StatList
            stats={clients.stats}
            size="large"
            labelClassName="text-ink-on-yellow"
            className="border-t-2 border-black pt-8"
          />
        </Reveal>
      </div>
    </section>
  );
}
