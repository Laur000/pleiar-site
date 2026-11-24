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

1. **Structura** – `content/site.ts` împărțit în comun / agenție / creatori; pagina `/youtube`; meniul cu comutator. Pagina Agenție fără Despre și fără Top 3.
2. **„Cine e în spate”** pe pagina Agenție.
3. **Pagina Creatori** – hero, marquee, Despre, Top 3.
4. **Ce editez pentru creatori** + contact pentru creatori.
5. **SEO pe fiecare pagină** – titlu, descriere și imagine de share separate; sitemap cu 2 adrese.
6. **Verificare** la 375 / 768 / 1440, lint, build.

## De decis pe parcurs

- Numele din comutator: `Agenție | Creatori` (propus – spune pentru cine e) sau `Agenție | YouTube`.
- Textele noi (titluri, servicii pentru creatori) le scriu ca propunere, marcate; cifrele și prețurile rămân `[placeholder]`.
