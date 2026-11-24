import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Metadata de bază pentru o pagină (adresa canonică + Open Graph).
 * Next.js nu combină `openGraph` din layout cu cel din pagină: cel din pagină îl înlocuiește
 * complet. De aceea fiecare pagină primește aici tot obiectul, nu doar `url`.
 */
export function pageMetadata(path: string): Metadata {
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      siteName: site.meta.siteName,
      title: site.meta.title,
      description: site.meta.description,
      url: path,
    },
  };
}
