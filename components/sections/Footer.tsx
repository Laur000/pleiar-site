import { site } from "@/content/site";
import { hrefOr, isExternal } from "@/lib/links";

export function Footer() {
  const { footer, social } = site;
  const links = [social.youtube, social.instagram, social.tiktok];

  return (
    <footer className="surface-dark">
      <div className="container-site flex flex-wrap justify-between gap-4 py-7 text-sm text-gray-400">
        <p>{footer.copyright}</p>
        <ul className="flex gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={hrefOr(l.href)}
                className="transition-colors hover:text-pure-white"
                {...(isExternal(l.href) && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
