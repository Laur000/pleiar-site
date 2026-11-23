import Image from "next/image";
import { site } from "@/content/site";
import { ClipGallery } from "@/components/ui/ClipGallery";
import { StatList } from "@/components/ui/StatList";

export function Clients() {
  const { clients } = site;

  return (
    <section id="clienti" className="surface-yellow section-y" aria-labelledby="clienti-titlu">
      <div className="container-site flex flex-col gap-12">
        <div className="flex max-w-[780px] flex-col gap-4">
          <p className="eyebrow">{clients.eyebrow}</p>
          <h2 id="clienti-titlu" className="text-h2">
            {clients.title}
          </h2>
          <p className="text-lg leading-[1.6] text-ink-on-yellow">{clients.intro}</p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {clients.logos.map((logo, i) => (
            <li
              key={`${logo.name}-${i}`}
              className="relative flex h-[72px] items-center justify-center rounded-xl border-2 border-black px-4 text-center text-sm font-medium"
            >
              {logo.src ? (
                <Image src={logo.src} alt={logo.name} fill sizes="200px" className="object-contain p-4" />
              ) : (
                logo.name
              )}
            </li>
          ))}
        </ul>

        <ClipGallery clients={clients} />

        <StatList
          stats={clients.stats}
          size="large"
          labelClassName="text-ink-on-yellow"
          className="border-t-2 border-black pt-8"
        />
      </div>
    </section>
  );
}
