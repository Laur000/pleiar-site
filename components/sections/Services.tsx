import { site } from "@/content/site";
import { Card } from "@/components/ui/Card";

export function Services() {
  const { services } = site;

  return (
    <section id="servicii" className="surface-light section-y" aria-labelledby="servicii-titlu">
      <div className="container-site flex flex-col gap-12">
        <div className="flex max-w-[760px] flex-col gap-4">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 id="servicii-titlu" className="text-h2">
            {services.title}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.items.map((s) => {
            const f = s.featured;
            return (
              <li key={s.num}>
                <Card tone={f ? "dark" : "light"} className="flex h-full flex-col gap-[18px]">
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
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
