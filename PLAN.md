# Plan – site Pleiar (galben + negru)

Lucrezi etapă cu etapă. La fiecare etapă: copiezi promptul în Claude Code, te uiți în browser la `localhost:3000`, ceri corecturi, apoi treci mai departe.
După fiecare etapă bună: `git commit` (sau îi spui lui Claude Code „fă commit”).

---

## Etapa 0 – Pregătire (înainte să deschizi Claude Code)

**Instalează:**
- Node.js LTS (nodejs.org)
- Git
- Cont GitHub + cont Vercel (te loghezi în Vercel cu GitHub)

**Pune folderul:** dezarhivează kitul, intră în folderul `pleiar-site` din terminal și rulează `claude`.
Claude Code citește automat `CLAUDE.md`, deci știe deja designul și regulile.

**Strânge materialele** (poți începe și fără ele, dar până la Etapa 5 îți trebuie):

| Ce | Detalii |
|---|---|
| Showreel | MP4, 30–60 s, cel mai bun montaj al tău |
| Portret | 1–2 poze cu tine, vertical 4:5, de preferat din culise |
| Bio | 2 paragrafe scurte, la persoana I |
| Cifre canal | abonați, vizualizări totale, câte clipuri ai editat |
| Top 3 YouTube | linkurile + numărul de vizualizări |
| Clienți | logo-uri (SVG/PNG transparent), numele, ce ați făcut pentru ei |
| Clipuri clienți | 6–8 clipuri verticale MP4 + platforma + nr. de views (cu acordul clienților) |
| Cifre agenție | views totale generate, clienți activi, urmăritori câștigați |
| Servicii | ce include fiecare pachet + preț „de la” |
| Contact | email, link Calendly/Cal.com pentru call, linkuri sociale |
| Domeniu | ex. pleiar.ro (de pe ROTLD, de la un registrar românesc, sau Namecheap) |

---

## Etapa 1 – Proiectul gol + design system

```
Citește CLAUDE.md și reference/prototip-galben.dc.html.
Creează proiectul Next.js (App Router, TypeScript, Tailwind) în folderul curent,
instalează motion și lenis, configurează fonturile Space Grotesk și Inter
cu latin-ext prin next/font și pune tokenii de culoare din CLAUDE.md în Tailwind.
Fă o pagină temporară /style care arată culorile, titlurile, butoanele și un card,
ca să verific design system-ul. Nu construi încă secțiunile.
```

Verifici: diacriticele (ă, î, ș, ț) arată bine, galbenul e cel corect.

## Etapa 2 – Conținutul ca date

```
Creează content/site.ts cu tipuri TypeScript pentru tot conținutul paginii
(nav, hero, despre, top 3 YouTube, clienți, clipuri, cifre, servicii, contact, footer).
Completează-l cu textele din prototip și placeholdere între [ ] unde lipsesc date.
Nu inventa cifre.
```

## Etapa 3 – Secțiunile, una câte una

Cere-le pe rând (nu toate odată, iese mai bine):

```
Construiește Nav și Hero conform CLAUDE.md, folosind content/site.ts.
Pentru showreel folosește deocamdată un placeholder video.
Verifică la 375px și 1440px.
```

Apoi, în ordine, câte un prompt:
1. „Construiește banda marquee.”
2. „Construiește secțiunea Despre.”
3. „Construiește Top 3 YouTube cu embed lite (iframe doar la click).”
4. „Construiește secțiunea Clienți cu filtrele pe platformă și clipurile verticale.”
5. „Construiește Ce oferim.”
6. „Construiește Contact și Footer.”

După fiecare: te uiți, ceri ajustări („titlul e prea mare pe mobil”, „mai mult spațiu între carduri”).

## Etapa 4 – Animațiile (aici devine „smooth”)

```
Adaugă animațiile din secțiunea „Animații” din CLAUDE.md:
Lenis, intrări la scroll cu stagger, H1 cu cuvinte pe rând și marker galben desenat,
cifre care numără, hover pe carduri, marquee care se oprește la hover,
tranziții de layout la filtre. Respectă prefers-reduced-motion.
```

Dacă ceva e prea mult: „animațiile sunt prea lente/prea multe la X, fă-le mai subtile”.

## Etapa 5 – Conținutul real

1. Pune pozele în `public/images/`, logo-urile în `public/logos/`, clipurile în `public/raw/`.
2. Prompt:

```
În public/raw/ am clipurile originale. Scrie un script care, cu ffmpeg,
le face 720p H.264 fără sunet, sub 3 MB, în public/videos/,
și extrage câte un poster WebP în public/posters/. Rulează-l.
Apoi actualizează content/site.ts cu clipurile, pozele și logo-urile.
```

3. Completezi singur (sau dictezi) cifrele, textele și prețurile în `content/site.ts`.

## Etapa 6 – Contact funcțional

Variante simple (alege una):
- **Doar link**: butonul „Programează un call” duce la Calendly / Cal.com. E cel mai simplu.
- **Formular**: „Adaugă un formular de contact (nume, email, ce vrei să filmăm, buget) care trimite pe email prin Resend.” Atunci îți trebuie cont Resend și cheia în `.env.local`.

## Etapa 7 – SEO + verificare

```
Adaugă metadata în română, Open Graph cu o imagine 1200x630 generată din design,
favicon cu logo-ul PLEIAR, sitemap și robots.
Rulează npm run build și repară erorile. Spune-mi ce scor Lighthouse ar trebui să verific și unde.
```

Verifici pe telefonul tău real, nu doar în browser.

## Etapa 8 – Online

1. „Inițializează git, fă commit și spune-mi pașii să urc pe GitHub.”
2. Pe vercel.com: **Add New → Project → importi repo-ul → Deploy**.
3. În Vercel: **Settings → Domains** → adaugi domeniul și pui DNS-urile pe care ți le arată la registrar.

De acum: orice modificare + `git push` = site-ul se actualizează singur.

---

## Sfaturi pentru lucrul cu Claude Code

- O cerere = o secțiune. Cererile mari dau rezultate mediocre.
- Dacă îți place ceva de pe alt site, fă screenshot și trage-l în terminal: „vreau efectul ăsta la secțiunea Clienți”.
- Dacă o ia razna: `Esc` îl oprește, `/clear` începe curat (CLAUDE.md rămâne).
- Commit după fiecare pas bun, ca să te poți întoarce.
