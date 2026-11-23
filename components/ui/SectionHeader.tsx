import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  eyebrowClassName?: string;
  introClassName?: string;
  className?: string;
};

/** Eticheta „0X · …” + H2 (+ intro), care apar pe rând la scroll. */
export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  eyebrowClassName = "",
  introClassName = "",
  className = "",
}: Props) {
  return (
    <RevealGroup className={`flex flex-col gap-4 ${className}`.trim()}>
      <RevealItem as="p" className={`eyebrow ${eyebrowClassName}`.trim()}>
        {eyebrow}
      </RevealItem>
      <RevealItem>
        <h2 id={id} className="text-h2">
          {title}
        </h2>
      </RevealItem>
      {intro && (
        <RevealItem as="p" className={`text-lg leading-[1.6] ${introClassName}`.trim()}>
          {intro}
        </RevealItem>
      )}
    </RevealGroup>
  );
}
