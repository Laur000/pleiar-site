# Plan nou: două pagini – Agenție și Creatori

Varianta veche (o singură pagină) e salvată în branch-ul `varianta-o-pagina` (și pe GitHub).
Lucrăm pe `main`.

## De ce

Două publicuri diferite, cu nevoi diferite:

| | Pagina **Agenție** (`/`) | Pagina **Creatori** (`/youtube`) |
|---|---|---|
| Cine o vede | Branduri, firme | Creatori: vlogueri, podcasteri, streameri (Twitch) |
| Ce vor | Clipuri scurte, social media administrat | Vloguri, podcasturi, stream-uri editate (long-form + clipuri din ele) |
| Dovada | Clienții și views-urile lor | Canalul lui Pleiar: abonați, views, Top 3 clipuri |

Un brand nu trebuie să treacă prin vloguri ca să ajungă la ofertă. Un creator nu trebuie să treacă prin logo-uri de firme.

## Cum arată

**Meniul (comun):** logo PLEIAR · comutator-pastilă `Agenție | Creatori` (arată ca taburi, dar sunt pagini reale,
cu adrese proprii și trecere instant) · linkurile secțiunilor paginii curente · buton „Hai să lucrăm”.

**Pagina Agenție – `/`** (pagina principală)
1. Hero – titlul actual + showreel-ul cu clienți
2. Banda marquee (EDITARE ✦ FILMARE ✦ SOCIAL MEDIA …)
3. **Cine e în spate** (nou, scurt) – mini-portret, 2 fraze, cifra de abonați, link „Vezi canalul →” spre `/youtube`
4. Clienți – logo-uri, filtre, clipuri verticale, cifre
5. Ce oferim – serviciile agenției
6. Contact
7. Footer

**Pagina Creatori – `/youtube`**
1. Hero pentru creatori – titlu + subtitlu proprii, buton spre contact
2. Banda marquee cu alte cuvinte (VLOGURI ✦ PODCASTURI ✦ TWITCH ✦ SHORTS …)
3. Despre – secțiunea completă de acum (portret, „Salut, sunt Pleiar.”, cifrele canalului)
4. Top 3 YouTube – „editate de mine”, dovada
5. **Ce editez pentru creatori** (nou) – ex. Vloguri, Podcasturi (video), Stream-uri / Twitch (highlights), Shorts din long-form; prețuri `[PREȚ]`
6. Contact – titlu pentru creatori
7. Footer

## Etape (una câte una, commit doar după aprobare)

1. ✅ **Structura** – `content/site.ts` împărțit în comun / agenție / creatori; pagina `/youtube`; meniul cu comutator. Pagina Agenție fără Despre și fără Top 3. (`2df7e5e`)
2. ✅ **„Cine e în spate”** pe pagina Agenție. (`41c49ff`)
3. ✅ **Pagina Creatori** – hero, marquee, Despre, Top 3. (`97627ab`)
4. ✅ **Ce editez pentru creatori** – Vloguri, Podcasturi, Stream-uri. (în `2df7e5e`) Contactul e deocamdată comun pentru ambele pagini.
5. ✅ **SEO pe fiecare pagină** – titlu, descriere și imagine de share separate; sitemap cu 2 adrese. (`de951d0`)
6. ✅ **Verificare** – ambele pagini la 375 / 768 / 1024 / 1440: fără scroll lateral, un singur H1, tabul activ corect,
   toate linkurile din meniu se opresc sub bara de sus, meniul de mobil se închide, imaginile se încarcă,
   fără erori în consolă; lint + build trec; meta-tag-urile și imaginile de share verificate pe build-ul de producție.

## Decizii luate

- Comutatorul: `Agenție | Creatori`.
- Sub 1024px meniul complet devine hamburger (comutatorul rămâne vizibil), ca să încapă pe tabletă.
- Hero-ul de la Creatori e fără showreel (dovada sunt clipurile din Top 3). Se poate adăuga: `creators.hero.showreel`.
- Portretul și abonații YouTube stau într-un singur loc (`PORTRAIT`, `YOUTUBE_SUBSCRIBERS` în `content/site.ts`).

## Ce mai rămâne (de la tine)

- Textele marcate `[...]`: despre tine (Agenție și Creatori), cifre, prețuri, email, link de programare.
- Textele propuse de mine, de verificat/schimbat: titlul „Cine e în spate”, hero-ul și descrierile de la Creatori,
  titlurile și descrierile pentru Google (`agency.meta`, `creators.meta`).
- Opțional: un contact cu text diferit pentru creatori (acum e același pe ambele pagini).
- Înainte de lansare: conținutul real (clipuri, poze, logo-uri), ștergerea paginii `/style`, domeniul.
