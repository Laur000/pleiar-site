import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { YouTubeLite } from "@/components/ui/YouTubeLite";
import { formatNumber } from "@/lib/format";
import { hrefOr, isExternal } from "@/lib/links";

export function YouTubeTop() {
  const { youtube, social } = site;
  const channel = social.youtube.href;

  return (
    <section id="youtube" className="surface-dark section-y" aria-labelledby="youtube-titlu">
      <div className="container-site flex flex-col gap-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[680px] flex-col gap-4">
            <p className="eyebrow text-yellow">{youtube.eyebrow}</p>
            <h2 id="youtube-titlu" className="text-h2">
              {youtube.title}
            </h2>
          </div>
          <ButtonLink
            href={hrefOr(channel)}
            variant="white"
            {...(isExternal(channel) && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {youtube.subscribeLabel}
          </ButtonLink>
        </div>

        <ol className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {youtube.videos.map((v, i) => (
            <li key={i} className="flex flex-col gap-4">
              <div className="relative">
                <div className="relative aspect-video overflow-hidden rounded-[14px] border border-gray-900 bg-gray-900">
                  {v.youtubeId ? (
                    <YouTubeLite youtubeId={v.youtubeId} title={v.title} playLabel={youtube.playLabel}>
                      <span className="absolute right-3 bottom-3 rounded-md bg-black px-2 py-1 text-[13px] text-pure-white">
                        {v.duration}
                      </span>
                    </YouTubeLite>
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
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
