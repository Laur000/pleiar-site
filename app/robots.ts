import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // pagina temporară cu design system-ul (se șterge înainte de lansare)
      disallow: "/style",
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
