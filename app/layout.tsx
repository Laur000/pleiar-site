import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
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

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
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
