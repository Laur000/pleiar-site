import type { Metadata } from "next";
import { site, type PageMeta } from "@/content/site";

/**
 * Metadata unei pagini: titlu, descriere, adresa canonică, Open Graph și Twitter/X.
 * Next.js nu combină `openGraph` din layout cu cel din pagină (cel din pagină îl înlocuiește
 * complet), de aceea fiecare pagină primește aici tot obiectul.
 * Imaginea de share vine din `opengraph-image.tsx` din folderul paginii.
 */
export function pageMetadata(path: string, meta: PageMeta): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      siteName: site.meta.siteName,
      title: meta.title,
      description: meta.description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}
