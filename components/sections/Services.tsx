import type { ServicesContent } from "@/content/site";
import { Card, type CardTone } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolsRow } from "@/components/ui/ToolsRow";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Props = {
  services: ServicesContent;
  /** Ancora secțiunii (linkurile din meniu), ex. „servicii”, „filmare”. */
  id?: string;
  /** Fundalul secțiunii: alb (implicit) sau negru – ca două secțiuni de servicii la rând să nu se confunde. */
  tone?: "light" | "dark";
};

/**
 * Coloanele pe ecran lat, după câte carduri sunt: 4 → 4 pe rând, altfel 3 pe rând
 * (3 → un rând plin; 5–6 → două rânduri), ca să nu rămână un card singur pe un rând gol.
 */
function wideColumns(count: number) {
  return count === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3";
}

/** Pe tabletă (2 coloane), dacă numărul de carduri e impar, ultimul ocupă tot rândul. */
const ODD_LAST_FULL = "md:max-lg:[&>li:last-child:nth-child(odd)]:col-span-2";

/** Cum arată un card: pe fundal alb sau negru, normal sau evidențiat („featured”). */
type CardStyle = { tone: CardTone; muted: string; bullet: string; price: string };

const CARD_STYLES: Record<"light" | "dark", { normal: CardStyle; featured: CardStyle }> = {
  // Pe alb: carduri albe cu contur negru; cel evidențiat e negru cu galben.
  light: {
    normal: { tone: "light", muted: "text-gray-600", bullet: "bg-black", price: "border-black" },
    featured: { tone: "dark", muted: "text-gray-400", bullet: "bg-yellow", price: "border-yellow text-yellow" },
  },
  // Pe negru: carduri gri închis cu accente galbene; cel evidențiat e alb.
  dark: {
    normal: { tone: "dark-muted", muted: "text-gray-400", bullet: "bg-yellow", price: "border-yellow text-yellow" },
    featured: { tone: "light", muted: "text-gray-600", bullet: "bg-black", price: "border-black" },
  },
};

/** Carduri de servicii cu preț. Folosită pe ambele pagini, fiecare cu datele ei. */
export function Services({ services, id = "servicii", tone = "light" }: Props) {
  const titleId = `${id}-titlu`;
  const dark = tone === "dark";

  return (
    <section
      id={id}
      className={`${dark ? "surface-dark" : "surface-light"} section-y`}
      aria-labelledby={titleId}
    >
      <div className="container-site flex flex-col gap-12">
        <SectionHeader
          id={titleId}
          eyebrow={services.eyebrow}
          title={services.title}
          intro={services.intro}
          eyebrowClassName={dark ? "text-yellow" : ""}
          introClassName={dark ? "text-gray-400" : "text-gray-600"}
          className="max-w-[760px]"
        />

        <RevealGroup
          as="ul"
          className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${ODD_LAST_FULL} ${wideColumns(services.items.length)}`}
        >
          {services.items.map((s) => {
            const f = s.featured;
            const st = CARD_STYLES[tone][f ? "featured" : "normal"];
            return (
              <RevealItem as="li" key={s.num}>
                <Card tone={st.tone} className="tile flex h-full flex-col gap-[18px]">
                  <div className="flex min-h-7 items-center justify-between gap-3">
                    <span className="font-display text-[15px] font-semibold">{s.num}</span>
                    {f && (
                      <span className="rounded-pill bg-yellow px-2.5 py-1 text-xs font-semibold text-black">
                        {services.featuredLabel}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[26px] leading-[1.15]">{s.title}</h3>
                  <p className={st.muted}>{s.description}</p>
                  <ul className="flex flex-col gap-2.5 text-[15px]">
                    {s.features.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className={`mt-[7px] size-2 shrink-0 rounded-[2px] ${st.bullet}`} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-auto border-t-2 pt-4 font-display text-xl font-bold ${st.price}`}>
                    {services.pricePrefix} {s.price}
                  </p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {services.tools && <ToolsRow tools={services.tools} tone={tone} />}
      </div>
    </section>
  );
}
