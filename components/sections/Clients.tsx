import Image from "next/image";
import { site } from "@/content/site";
import { ClipGallery } from "@/components/ui/ClipGallery";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatList } from "@/components/ui/StatList";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function Clients() {
  const { clients } = site;

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

        <RevealGroup as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {clients.logos.map((logo, i) => (
            <RevealItem
              as="li"
              key={`${logo.name}-${i}`}
              className="relative flex h-[72px] items-center justify-center rounded-xl border-2 border-black px-4 text-center text-sm font-medium"
            >
              {logo.src ? (
                <Image src={logo.src} alt={logo.name} fill sizes="200px" className="object-contain p-4" />
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
