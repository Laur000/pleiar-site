import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { YouTubeTop } from "@/components/sections/YouTubeTop";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = pageMetadata("/youtube", site.creators.meta);

/** Pagina „/youtube” – pentru creatori (vlogueri, podcasteri, streameri). */
export default function CreatorsPage() {
  return (
    <>
      <Nav page="creators" />
      <main id="top">
        <Hero hero={site.creators.hero} />
        <Marquee marquee={site.creators.marquee} />
        <About />
        <YouTubeTop />
        <Services services={site.creators.services} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
