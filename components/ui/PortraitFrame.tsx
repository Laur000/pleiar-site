import Image from "next/image";
import type { Portrait } from "@/content/site";

type Props = {
  portrait: Portrait;
  /** `sizes` pentru next/image (cât de lată e poza pe ecran). */
  sizes: string;
  /** Cât de decalat e blocul galben din spate: mare la cardurile mari, mic la portretele mici. */
  offset?: "sm" | "lg";
  className?: string;
};

const OFFSETS = {
  sm: { block: "translate-x-2.5 translate-y-2.5", space: "mr-2.5 mb-2.5" },
  lg: { block: "translate-x-3.5 translate-y-3.5", space: "mr-3.5 mb-3.5" },
};

/** Portret 4:5 cu blocul galben decalat în spate (umbra plată a site-ului). Fără poză: placeholder. */
export function PortraitFrame({ portrait, sizes, offset = "lg", className = "" }: Props) {
  const o = OFFSETS[offset];

  return (
    <div className={`relative ${o.space} ${className}`.trim()}>
      <div aria-hidden="true" className={`absolute inset-0 ${o.block} rounded-card bg-yellow`} />
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-black">
        {portrait.src ? (
          <Image src={portrait.src} alt={portrait.alt} fill sizes={sizes} className="object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center p-4 text-center text-sm text-gray-400">
            {portrait.placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
