import { ImageResponse } from "next/og";
import { site, type HeroContent, type MarqueeContent } from "@/content/site";
import { loadDisplayFont } from "@/lib/og-font";

/**
 * Imaginea care apare când cineva dă share la o pagină (WhatsApp, Facebook, LinkedIn etc.).
 * Aceeași machetă pentru ambele pagini; diferă eticheta, titlul și cuvintele din bandă.
 */
export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 };

const YELLOW = "#FFD60A";
const BLACK = "#0A0A0A";
const GRAY = "#BDBDBD";

type Props = {
  hero: HeroContent;
  marquee: MarqueeContent;
};

export async function renderShareImage({ hero, marquee }: Props) {
  const font = await loadDisplayFont();
  // „✦” nu există în Space Grotesk, deci în imagine separatorul e desenat ca SVG.
  const band = [...marquee.items, ...marquee.items];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BLACK,
          fontFamily: "Space Grotesk",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "64px 72px 0", gap: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div
              style={{
                background: YELLOW,
                color: BLACK,
                fontSize: 40,
                letterSpacing: "0.04em",
                padding: "6px 18px",
                borderRadius: 10,
              }}
            >
              {site.nav.logo}
            </div>
            <div style={{ color: GRAY, fontSize: 24, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              {hero.eyebrow}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#FFFFFF",
              fontSize: 76,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              columnGap: 20,
              rowGap: 4,
            }}
          >
            {hero.title.before.split(" ").filter(Boolean).map((w, i) => (
              <span key={`b${i}`}>{w}</span>
            ))}
            <span
              style={{
                background: YELLOW,
                color: BLACK,
                padding: "0 14px",
                borderRadius: 10,
              }}
            >
              {hero.title.highlight}
            </span>
            {hero.title.after.split(" ").filter(Boolean).map((w, i) => (
              <span key={`a${i}`}>{w}</span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            background: YELLOW,
            color: BLACK,
            borderTop: `4px solid ${BLACK}`,
            fontSize: 34,
            padding: "22px 0 22px 72px",
            alignItems: "center",
            gap: 18,
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {band.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>
              <span>{item}</span>
              <svg width="26" height="26" viewBox="0 0 24 24">
                <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill={BLACK} />
              </svg>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
      fonts: [{ name: "Space Grotesk", data: font, style: "normal", weight: 700 }],
    },
  );
}
