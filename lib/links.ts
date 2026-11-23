import type { Url } from "@/content/site";

/** Linkurile care lipsesc încă din content/site.ts duc la „#”. */
export function hrefOr(url: Url): string {
  return url ?? "#";
}

/** True pentru linkuri spre alte site-uri (se deschid în tab nou). */
export function isExternal(url: Url): boolean {
  return !!url && /^https?:\/\//.test(url);
}
