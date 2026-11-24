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

// Imaginea de share (app/opengraph-image.tsx) și iconițele (app/icon.tsx, app/apple-icon.tsx)
// sunt adăugate automat de Next.js.
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: site.meta.title,
  description: site.meta.description,
  applicationName: site.meta.siteName,
  // Adresa canonică (`alternates`) și `openGraph.url` le setează fiecare pagină.
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: site.meta.siteName,
    title: site.meta.title,
    description: site.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
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
