import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { getSiteUrl } from "@/lib/site-url";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Valorile de bază (ex. pentru pagina 404). Fiecare pagină își pune titlul, descrierea,
// adresa canonică și Open Graph prin `pageMetadata()` (lib/page-metadata.ts).
// Imaginile de share (opengraph-image.tsx din fiecare folder) și iconițele (app/icon.tsx,
// app/apple-icon.tsx) sunt adăugate automat de Next.js.
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: site.agency.meta.title,
  description: site.agency.meta.description,
  applicationName: site.meta.siteName,
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="surface-dark min-h-dvh font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
