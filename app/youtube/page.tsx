import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";
import { Nav } from "@/components/sections/Nav";
import { About } from "@/components/sections/About";
import { site } from "@/content/site";
import { YouTubeTop } from "@/components/sections/YouTubeTop";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Titlul, descrierea și imaginea de share proprii vin în Etapa 5 (SEO pe fiecare pagină).
export const metadata: Metadata = pageMetadata("/youtube");

/**
 * Pagina „/youtube” – pentru creatori (vlogueri, podcasteri, streameri).
 * Hero-ul și banda pentru creatori vin în Etapa 3 (vezi PLAN-2-PAGINI.md).
 */
export default function CreatorsPage() {
  return (
    <>
      <Nav page="creators" />
      <main id="top">
        <About />
        <YouTubeTop />
        <Services services={site.creators.services} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
