import Image from "next/image";
import { site } from "@/content/site";
import { StatList } from "@/components/ui/StatList";

export function About() {
  const { about } = site;

  return (
    <section id="despre" className="surface-light section-y" aria-labelledby="despre-titlu">
      <div className="container-site grid grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* Portret cu bloc galben decalat în spate */}
        <div className="relative mr-[18px] mb-[18px] max-w-[520px] md:mr-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-[18px] translate-y-[18px] rounded-card bg-yellow"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-black">
            {about.portrait.src ? (
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                fill
                sizes="(min-width: 768px) 520px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center p-6 text-center text-[15px] text-gray-400">
                {about.portrait.placeholder}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="despre-titlu" className="text-h2">
            {about.title}
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="text-lg leading-[1.65] text-gray-600">
              {p}
            </p>
          ))}
          <StatList stats={about.stats} className="mt-3" />
        </div>
      </div>
    </section>
  );
}
