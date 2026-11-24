import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

// Cele două pagini ale site-ului: Agenție („/”) și Creatori („/youtube”).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const pages = [site.nav.pages.agency.href, site.nav.pages.creators.href].filter(
    (href): href is string => !!href,
  );

  return pages.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
