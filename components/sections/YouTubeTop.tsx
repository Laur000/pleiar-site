import Image from "next/image";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { YouTubeLite } from "@/components/ui/YouTubeLite";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { formatNumber } from "@/lib/format";
import { hrefOr, isExternal } from "@/lib/links";

export function YouTubeTop() {
  const { social } = site;
  const { youtube } = site.creators;
  const channel = social.youtube.href;

  return (
    <section id="youtube" className="surface-dark section-y" aria-labelledby="youtube-titlu">
      <div className="container-site flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            id="youtube-titlu"
            eyebrow={youtube.eyebrow}
            title={youtube.title}
            eyebrowClassName="text-yellow"
            className="max-w-[680px]"
          />
          <Reveal delay={0.12}>
            <ButtonLink
              href={hrefOr(channel)}
              variant="white"
              {...(isExternal(channel) && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {youtube.subscribeLabel}
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup as="ol" className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
                  {/* Numărul 1-2-3 în cerc galben */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-3.5 -left-2.5 flex size-14 items-center justify-center rounded-full bg-yellow font-display text-[30px] font-bold text-black"
                  >
                    {i + 1}
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
