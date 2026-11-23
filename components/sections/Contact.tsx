import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { hrefOr, isExternal, mailtoOr } from "@/lib/links";

export function Contact() {
  const { contact } = site;

  return (
    <section id="contact" className="surface-yellow" aria-labelledby="contact-titlu">
      <RevealGroup className="container-site flex flex-col items-center gap-7 py-24 text-center md:py-32">
        <RevealItem>
          <h2
            id="contact-titlu"
            className="max-w-[1000px] text-[clamp(44px,7vw,104px)] leading-[0.98] tracking-[-0.03em]"
          >
            {contact.title}
          </h2>
        </RevealItem>
        <RevealItem as="p" className="max-w-[560px] text-lg text-ink-on-yellow md:text-[19px]">
          {contact.text}
        </RevealItem>
        <RevealItem className="flex flex-wrap justify-center gap-3.5">
          <ButtonLink
            href={hrefOr(contact.cta.href)}
            variant="black"
            className="px-[30px] py-[18px] text-[17px]"
            {...(isExternal(contact.cta.href) && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {contact.cta.label}
          </ButtonLink>
          <ButtonLink
            href={mailtoOr(contact.email)}
            variant="outline-dark"
            className="px-7 py-4 text-[17px] font-medium"
          >
            {contact.email}
          </ButtonLink>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
