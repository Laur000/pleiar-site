import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Founder } from "@/components/sections/Founder";
import { Clients } from "@/components/sections/Clients";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Titlul, descrierea și imaginea de share proprii vin în Etapa 5 (SEO pe fiecare pagină).
export const metadata: Metadata = pageMetadata("/");

/** Pagina „/” – Agenția, pentru branduri. */
export default function AgencyPage() {
  return (
    <>
      <Nav page="agency" />
      <main id="top">
        <Hero />
        <Marquee marquee={site.agency.marquee} />
        <Founder />
        <Clients />
        <Services services={site.agency.services} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
