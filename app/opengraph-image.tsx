import { site } from "@/content/site";
import { renderShareImage, SHARE_IMAGE_SIZE } from "@/lib/share-image";

// Imaginea de share pentru pagina Agenție („/”). Macheta e în lib/share-image.tsx.
export const alt = site.agency.meta.shareImageAlt;
export const size = SHARE_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderShareImage({ hero: site.agency.hero, marquee: site.agency.marquee });
}
