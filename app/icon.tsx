import { ImageResponse } from "next/og";
import { loadDisplayFont } from "@/lib/og-font";

// Favicon: pastila galbenă PLEIAR, redusă la „P” (cuvântul întreg nu se citește la 32px).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          background: "#FFD60A",
          color: "#0A0A0A",
          borderRadius: 7,
          fontFamily: "Space Grotesk",
          fontSize: 26,
          lineHeight: 1,
        }}
      >
        P
      </div>
    ),
    { ...size, fonts: [{ name: "Space Grotesk", data: font, style: "normal", weight: 700 }] },
  );
}
