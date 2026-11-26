# Pleiar – site portofoliu (vlog + editare video + agenție de marketing)

Site în limba română pentru o agenție (numele e încă nedecis: `[Numele agenției]`) care filmează, editează și administrează social media pentru clienți.
Agenția e o **echipă**: textele sunt la plural („noi”), iar creatorii principali sunt **Pleiar** și **capeturisti** (travel). Fiecare creator e definit o singură dată în `content/site.ts` (`PLEIAR`, `CAPETURISTI`, lista `CREATORS`) și apare pe ambele pagini.
Are **două pagini**, pentru două publicuri (planul: `PLAN-2-PAGINI.md`; varianta veche one-page e în branch-ul `varianta-o-pagina`):
- `/` – **Agenție**, pentru branduri: vede rezultatele clienților (views) și cere o ofertă.
- `/youtube` – **Creatori** (vlogueri, podcasteri, streameri): vede canalele echipei ca dovadă și cere editare pentru propriul content.

Referința vizuală e prototipul din `reference/prototip-galben.dc.html` (varianta „galben, negru, alb”).
E scris într-un format de prototipare (`<x-dc>`, `{{hole}}`, `<sc-for>`): folosește-l DOAR ca referință de layout, culori, texte și ordine a secțiunilor. Nu copia sintaxa lui.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion (`motion/react`, fostul Framer Motion) pentru animații la scroll și hover
- Lenis pentru smooth scroll
- `next/font` pentru fonturi (Space Grotesk + Inter, cu subset `latin-ext` pentru diacritice)
- Deploy pe Vercel

Nu adăuga alte librării fără să întrebi.

## Comenzi

- `npm run dev` – server local
- `npm run build` – build de producție (rulează-l înainte să spui că ai terminat)
- `npm run lint`

## Design tokens

Culori (doar acestea):
- `yellow` #FFD60A – culoarea brandului
- `black` #0A0A0A – fundal principal, text pe galben
- `white` #FAFAF7 – fundal secțiuni deschise
- `pure-white` #FFFFFF – carduri pe alb, text pe negru
- `gray-900` #1A1A1A – placeholder video pe negru
- `gray-400` #BDBDBD – text secundar pe negru
- `gray-600` #4A4A4A – text secundar pe alb
- `ink-on-yellow` #2A2600 – text secundar pe galben

Reguli de culoare:
- Pe galben textul e mereu negru. Nu pune niciodată alb pe galben.
- Galbenul pe negru e permis pentru accente, cifre și butoane.
- Fără gradiente și fără umbre difuze. Look-ul e plat, contrastant, editorial.

Tipografie:
- Titluri: Space Grotesk 700, letter-spacing negativ (-0.02em … -0.03em), line-height ~1
- H1: clamp(44px, 7vw, 100px); H2: clamp(36px, 4.5vw, 64px)
- Text: Inter 400/500/600, 16–20px, line-height 1.55–1.65
- Etichete de secțiune: 14px, uppercase, letter-spacing 0.14em, cu numerotare „01 · …”

Forme:
- Butoane: pastilă (border-radius 999px), înălțime minimă 44px
- Carduri: radius 18–20px; pe secțiunile deschise au contur negru de 2px
- Container: max-width 1240px, padding lateral 24px, secțiuni cu ~104px padding vertical

## Structura paginilor (în ordinea asta)

**Nav** (comun) sticky, negru: logo „PLEIAR” pe pastilă galbenă; comutator-pastilă între pagini (`Agenție | Creatori`, cu `aria-current` pe pagina activă); linkurile secțiunilor paginii curente; buton galben „Hai să lucrăm”. Pe mobil: meniu hamburger (comutatorul rămâne vizibil).

### `/` – Agenție (branduri)
1. **Hero** negru: eticheta „Creatori · Editori · Agenție”, H1 cu „chiar le privesc” evidențiat cu galben (stil marker), subtitlu, 2 butoane, showreel 16:9 (video mut, autoplay, loop, cu buton de sunet).
2. **Bandă marquee** galbenă cu bordură neagră: „EDITARE ✦ FILMARE ✦ SOCIAL MEDIA ✦ VLOG ✦ REELS ✦ TIKTOK ✦ YOUTUBE ✦”, se mișcă continuu.
3. **Cine suntem** (rezumat): câte un portret mic pentru fiecare creator (nume, nișă, abonați), 1–2 fraze despre echipă, link spre `/youtube`.
4. **Clienți** pe galben: grid de logo-uri, filtre pe platformă (Toate / TikTok / Instagram / YouTube Shorts), grid de clipuri verticale 9:16 pe carduri negre cu bandă galbenă „[X] views”, apoi 3 cifre totale. Click pe clip: player pe tot ecranul, cu sunet.
5. **Ce oferim** pe alb: 4 carduri (Editare video, Filmare, Social media & marketing, Pachet complet). „Pachet complet” e negru cu galben și eticheta „Cel mai cerut”.
6. **Contact** pe galben: titlu uriaș „Ai ceva de filmat? Hai să vorbim.”, buton negru „Programează un call”, email.
7. **Footer** negru: copyright + YouTube / Instagram / TikTok.

### `/youtube` – Creatori (vlogueri, podcasteri, streameri)
1. **Hero** negru pentru creatori: titlu și subtitlu proprii, buton spre contact.
2. **Bandă marquee** cu cuvintele creatorilor (VLOGURI ✦ PODCASTURI ✦ TWITCH ✦ SHORTS …).
3. **Despre** pe alb, **compact** (secțiunea cea mai puțin importantă – să nu ocupe mult): textul echipei în stânga, creatorii în dreapta, carduri mici (portret mic cu bloc galben, nume + nișă, 1–2 fraze, cifrele pe un rând). Fără butoane spre canale.
4. **Clipuri de pe YouTube** pe negru: 3 exemple editate de noi (unul Pleiar, unul capeturisti, unul de la un client), **fără clasament** (fără „Top”, fără numere). Carduri 16:9 cu pastila galbenă a canalului, titlu, vizualizări în galben. Embed YouTube „lite” (se încarcă iframe-ul doar la click).
5. **Doar editare – Ce edităm pentru creatori** pe alb: Vloguri, Podcasturi, Stream-uri, Editare Ads (campaniile influencerilor de la branduri), prețuri `[PREȚ]`.
6. **Filmare + editare** pe negru, separat de editare: venim cu aparatura, filmăm și edităm (Vlog, Podcast, Ads). Mai scump: prețul include deplasarea și echipamentul.
7. **Contact** pe galben.
8. **Footer** negru (comun).

## Conținut

Tot textul și datele (clipuri, views, clienți, servicii, prețuri, linkuri) stau într-un singur fișier: `content/site.ts`, tipat.
Componentele nu conțin texte hardcodate. Pleiar trebuie să poată schimba orice din acel fișier.
Unde lipsește o informație, folosește un placeholder vizibil între paranteze pătrate, de ex. `[nr.] views`. Nu inventa cifre, clienți sau prețuri.

## Video și imagini

- Clipurile clienților: MP4 H.264 în `public/videos/`, 720p, fără sunet pentru preview, ≤ 3 MB fiecare, plus imagine `poster` în `public/posters/` (WebP).
- Pornesc doar când intră în viewport (IntersectionObserver), cu `muted playsInline loop preload="none"`; se opresc când ies din viewport.
- Pe hover (desktop), clipul pornește; pe mobil pornește când e în centru.
- Top 3 YouTube: thumbnail-ul de la YouTube + iframe încărcat la click (nu 3 iframe-uri la încărcarea paginii).
- Imagini prin `next/image`.

## Animații (să fie „smooth”, nu țipătoare)

- Lenis pentru scroll, cu `prefers-reduced-motion` respectat (fără Lenis și fără animații când e activ).
- Intrare la scroll: fade + translateY 24px, 0.6s, ease [0.2, 0.7, 0.2, 1], cu stagger 0.06s pe elementele din grid. O singură dată per element.
- H1 din hero: cuvintele apar pe rând; blocul galben „marker” se desenează de la stânga la dreapta după.
- Cifrele numără de la 0 când intră în ecran.
- Hover pe carduri: ridicare 6px + rotire -0.4deg.
- Marquee: CSS pur, 28s, liniar, infinit; se oprește la hover.
- Filtrele de platformă: tranziție de layout (Motion `layout` + `AnimatePresence`).
- Animează doar `transform` și `opacity`.

## Calitate

- Mobile-first; verifică la 375px, 768px și 1440px.
- Accesibilitate: HTML semantic, `<button>`/`<a>` reale, `aria-pressed` pe filtre, `alt` pe imagini, contrast ≥ 4.5:1, focus vizibil (contur galben pe negru, negru pe galben).
- SEO: `metadata` în română pe fiecare pagină (titlu, descriere și imagine Open Graph 1200×630 proprii), `lang="ro"`, sitemap cu ambele adrese.
- Lighthouse țintă: Performance ≥ 90 pe mobil, Accessibility ≥ 95.
- Componente mici, câte una per secțiune, în `components/sections/`.
