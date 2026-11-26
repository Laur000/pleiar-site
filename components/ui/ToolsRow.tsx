import type { ToolsContent } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  tools: ToolsContent;
  /** Fundalul secțiunii în care stă (alb sau negru), pentru culori. */
  tone?: "light" | "dark";
};

/**
 * „Cu ce lucrăm”: eticheta, numele programelor pe pastile și o frază despre workflow.
 * Doar numele, fără logo-urile programelor (sunt mărci cu reguli stricte de folosire).
 */
export function ToolsRow({ tools, tone = "light" }: Props) {
  const dark = tone === "dark";

  return (
    <Reveal
      className={`flex flex-col gap-4 border-t-2 pt-8 lg:flex-row lg:items-center lg:gap-6 ${
        dark ? "border-gray-900" : "border-black"
      }`}
    >
      <p className={`eyebrow shrink-0 ${dark ? "text-yellow" : ""}`}>{tools.label}</p>
      <ul className="flex flex-wrap gap-2 sm:gap-2.5">
        {tools.items.map((name) => (
          <li
            key={name}
            className={`rounded-pill border-2 px-3 py-1.5 text-[13px] font-semibold sm:px-4 sm:py-2 sm:text-[15px] ${
              dark ? "border-gray-400 text-pure-white" : "border-black bg-pure-white text-black"
            }`}
          >
            {name}
          </li>
        ))}
      </ul>
      <p className={`text-[15px] lg:ml-auto lg:max-w-[300px] lg:text-right ${dark ? "text-gray-400" : "text-gray-600"}`}>
        {tools.note}
      </p>
    </Reveal>
  );
}
