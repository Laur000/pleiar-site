import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadDisplayFont } from "@/lib/og-font";

// Iconița pentru „Adaugă pe ecranul principal” (iPhone): logo-ul PLEIAR pe negru.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const font = await loadDisplayFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          fontFamily: "Space Grotesk",
        }}
      >
        <div
          style={{
            background: "#FFD60A",
            color: "#0A0A0A",
            fontSize: 34,
            letterSpacing: "0.04em",
            padding: "4px 12px",
            borderRadius: 8,
          }}
        >
          {site.nav.logo}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Grotesk", data: font, style: "normal", weight: 700 }] },
  );
}
