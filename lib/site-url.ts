import { site } from "@/content/site";

/**
 * Adresa de bază a site-ului, pentru Open Graph, sitemap și robots.
 * 1. domeniul din content/site.ts (meta.siteUrl), dacă e completat;
 * 2. altfel domeniul de producție dat automat de Vercel;
 * 3. altfel localhost (în dezvoltare).
 */
export function getSiteUrl(): URL {
  if (site.meta.siteUrl) return new URL(site.meta.siteUrl);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
