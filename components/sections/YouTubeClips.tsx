import Image from "next/image";
import { site } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { YouTubeLite } from "@/components/ui/YouTubeLite";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { formatNumber } from "@/lib/format";

/**
 * „Clipuri de pe YouTube” (pagina Creatori): 3 exemple de clipuri editate de noi
 * (fără clasament), fiecare cu canalul de pe care e. Iframe-ul YouTube se încarcă doar la click.
 */
export function YouTubeClips() {
  const { youtube } = site.creators;

  return (
    <section id="youtube" className="surface-dark section-y" aria-labelledby="youtube-titlu">
      <div className="container-site flex flex-col gap-12">
        <SectionHeader
          id="youtube-titlu"
          eyebrow={youtube.eyebrow}
          title={youtube.title}
          eyebrowClassName="text-yellow"
          className="max-w-[680px]"
        />

        {/* 3 clipuri: unul sub altul pe telefon, toate 3 pe un rând de la tabletă (fără un clip singur pe rând). */}
        <RevealGroup as="ul" className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-3 lg:gap-x-6">
          {youtube.videos.map((v, i) => (
            <RevealItem as="li" key={i}>
              <div className="tile flex flex-col gap-4">
                <div className="relative">
                  <div className="relative aspect-video overflow-hidden rounded-[14px] border border-gray-900 bg-gray-900">
                    {v.youtubeId ? (
                      <YouTubeLite
                        youtubeId={v.youtubeId}
                        title={v.title}
                        playLabel={youtube.playLabel}
                        thumbnail={v.thumbnail}
                      >
                        <span className="absolute right-3 bottom-3 rounded-md bg-black px-2 py-1 text-[13px] text-pure-white">
                          {v.duration}
                        </span>
                      </YouTubeLite>
                    ) : v.thumbnail ? (
                      // Doar thumbnail (fără link YouTube încă): imagine simplă, fără redare.
                      <>
                        <Image
                          src={v.thumbnail}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <span className="absolute right-3 bottom-3 rounded-md bg-black px-2 py-1 text-[13px] text-pure-white">
                          {v.duration}
                        </span>
                      </>
                    ) : (
                      <div className="flex size-full items-center justify-center p-4 text-center text-sm text-gray-400">
                        {v.placeholder}
                        <span className="absolute right-3 bottom-3 rounded-md bg-black px-2 py-1 text-[13px] text-pure-white">
                          {v.duration}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Canalul de pe care e clipul, pe pastilă galbenă */}
                  <span className="pointer-events-none absolute top-3 left-3 rounded-pill bg-yellow px-3 py-1 text-[13px] font-semibold text-black">
                    {v.creator}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans text-[19px] leading-[1.35] font-semibold">{v.title}</h3>
                  <p className="text-[15px] font-semibold text-yellow">
                    {formatNumber(v.views)} {youtube.viewsLabel}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
