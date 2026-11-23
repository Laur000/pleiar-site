import { site } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function Services() {
  const { services } = site;

  return (
    <section id="servicii" className="surface-light section-y" aria-labelledby="servicii-titlu">
      <div className="container-site flex flex-col gap-12">
        <SectionHeader
          id="servicii-titlu"
          eyebrow={services.eyebrow}
          title={services.title}
          className="max-w-[760px]"
        />

        <RevealGroup as="ul" className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.items.map((s) => {
            const f = s.featured;
            return (
              <RevealItem as="li" key={s.num}>
                <Card tone={f ? "dark" : "light"} className="tile flex h-full flex-col gap-[18px]">
                  <div className="flex min-h-7 items-center justify-between gap-3">
                    <span className="font-display text-[15px] font-semibold">{s.num}</span>
                    {f && (
                      <span className="rounded-pill bg-yellow px-2.5 py-1 text-xs font-semibold text-black">
                        {services.featuredLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[26px] leading-[1.15]">{s.title}</h3>
                  <p className={f ? "text-gray-400" : "text-gray-600"}>{s.description}</p>
                  <ul className="flex flex-col gap-2.5 text-[15px]">
                    {s.features.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className={`mt-[7px] size-2 shrink-0 rounded-[2px] ${f ? "bg-yellow" : "bg-black"}`}
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`mt-auto border-t-2 pt-4 font-display text-xl font-bold ${
                      f ? "border-yellow text-yellow" : "border-black"
                    }`}
                  >
                    {services.pricePrefix} {s.price}
                  </p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
