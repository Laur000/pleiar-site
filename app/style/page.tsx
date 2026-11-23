import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

// Pagină temporară pentru verificarea design system-ului. Se șterge înainte de lansare.
export const metadata: Metadata = {
  title: "Design system – Pleiar",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "yellow", hex: "#FFD60A", use: "culoarea brandului", swatch: "bg-yellow", text: "text-black" },
  { name: "black", hex: "#0A0A0A", use: "fundal principal, text pe galben", swatch: "bg-black", text: "text-pure-white" },
  { name: "white", hex: "#FAFAF7", use: "fundal secțiuni deschise", swatch: "bg-white", text: "text-black" },
  { name: "pure-white", hex: "#FFFFFF", use: "carduri pe alb, text pe negru", swatch: "bg-pure-white", text: "text-black" },
  { name: "gray-900", hex: "#1A1A1A", use: "placeholder video pe negru", swatch: "bg-gray-900", text: "text-pure-white" },
  { name: "gray-400", hex: "#BDBDBD", use: "text secundar pe negru", swatch: "bg-gray-400", text: "text-black" },
  { name: "gray-600", hex: "#4A4A4A", use: "text secundar pe alb", swatch: "bg-gray-600", text: "text-pure-white" },
  { name: "ink-on-yellow", hex: "#2A2600", use: "text secundar pe galben", swatch: "bg-ink-on-yellow", text: "text-yellow" },
];

const diacritics = "ă â î ș ț Ă Â Î Ș Ț – „Clienții noștri și clipurile care au mers”";

export default function StylePage() {
  return (
    <main>
      {/* Culori */}
      <section className="surface-dark section-y">
        <div className="container-site flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="eyebrow text-yellow">00 · Design system</p>
            <h1 className="text-h1">Culori</h1>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {colors.map((c) => (
              <li
                key={c.name}
                className={`${c.swatch} ${c.text} flex min-h-40 flex-col justify-end gap-1 rounded-card border border-gray-600 p-5`}
              >
                <span className="font-display text-xl font-bold">{c.name}</span>
                <span className="font-mono text-sm">{c.hex}</span>
                <span className="text-sm">{c.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tipografie pe negru */}
      <section className="surface-dark section-y border-t border-gray-900">
        <div className="container-site flex flex-col gap-8">
          <p className="eyebrow text-gray-400">01 · Tipografie pe negru</p>
          <h1 className="text-h1 max-w-[1040px]">
            Facem clipuri pe care oamenii{" "}
            <span className="box-decoration-clone rounded-[0.12em] bg-yellow px-[0.15em] text-black">
              chiar le privesc
            </span>{" "}
            până la capăt.
          </h1>
          <h2 className="text-h2">Top 3 clipuri de pe YouTube</h2>
          <h3 className="text-[26px] leading-tight">Social media &amp; marketing</h3>
          <p className="max-w-[640px] text-xl leading-[1.55] text-gray-400">
            Am început cu propriul canal de YouTube. Acum filmăm, edităm și
            creștem conturile de social media ale clienților noștri.
          </p>
          <p className="text-lg">Inter 400 · <span className="font-medium">500</span> · <span className="font-semibold">600</span></p>
          <p className="font-display text-3xl font-bold">{diacritics}</p>
          <p className="text-lg">{diacritics}</p>
          <div className="flex flex-wrap gap-3.5">
            <ButtonLink href="#butoane">Vezi rezultatele</ButtonLink>
            <ButtonLink href="#butoane" variant="outline-light">Canalul de YouTube</ButtonLink>
            <ButtonLink href="#butoane" variant="white">Abonează-te pe YouTube</ButtonLink>
          </div>
        </div>
      </section>

      {/* Pe alb */}
      <section id="butoane" className="surface-light section-y">
        <div className="container-site flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">02 · Pe alb</p>
            <h2 className="text-h2">Salut, sunt Pleiar.</h2>
            <p className="max-w-[640px] text-lg leading-[1.65] text-gray-600">
              Text secundar pe alb, gray-600. [2–3 fraze despre tine, la
              persoana I, pe tonul de pe canal.]
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <Button>Galben</Button>
            <Button variant="black">Negru</Button>
            <Button variant="outline-dark">Contur negru</Button>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card tone="light" className="flex flex-col gap-4">
              <span className="font-display text-[15px] font-semibold">01</span>
              <h3 className="text-[26px] leading-tight">Editare video</h3>
              <p className="text-gray-600">
                Short-form și long-form, cu ritm construit pentru retenție.
              </p>
              <ul className="flex flex-col gap-2.5 text-[15px]">
                {["Reels, TikTok, Shorts", "Vloguri și clipuri YouTube", "Subtitrări, sound design, color"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-[7px] size-2 shrink-0 rounded-[2px] bg-black" />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t-2 border-black pt-4 font-display text-xl font-bold">de la [PREȚ]</p>
            </Card>
            <Card tone="dark" className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-display text-[15px] font-semibold">04</span>
                <span className="rounded-pill bg-yellow px-2.5 py-1 text-xs font-semibold text-black">Cel mai cerut</span>
              </div>
              <h3 className="text-[26px] leading-tight">Pachet complet</h3>
              <p className="text-gray-400">
                Idee, filmare, editare și postare. Tu doar apari în cadru.
              </p>
              <ul className="flex flex-col gap-2.5 text-[15px]">
                {["Tot ce e mai sus, lunar", "Un om dedicat contului tău", "[Nr.] clipuri pe lună"].map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-[7px] size-2 shrink-0 rounded-[2px] bg-yellow" />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t-2 border-yellow pt-4 font-display text-xl font-bold text-yellow">de la [PREȚ]</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Pe galben */}
      <section className="surface-yellow section-y">
        <div className="container-site flex flex-col gap-8">
          <p className="eyebrow">03 · Pe galben</p>
          <h2 className="text-h2">Ai ceva de filmat? Hai să vorbim.</h2>
          <p className="max-w-[560px] text-[19px] text-ink-on-yellow">
            Text secundar pe galben, ink-on-yellow. Pe galben textul e mereu negru.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button variant="black">Programează un call</Button>
            <Button variant="outline-dark">[email@domeniu.ro]</Button>
          </div>
          <p className="text-sm text-ink-on-yellow">
            Apasă Tab ca să vezi conturul de focus: negru aici, galben pe negru.
          </p>
        </div>
      </section>
    </main>
  );
}
