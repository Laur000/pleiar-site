/**
 * TOT conținutul site-ului Pleiar stă aici.
 * Componentele nu au texte proprii: schimbi ceva aici și se schimbă pe site.
 *
 * Reguli:
 * - Ce e între [paranteze pătrate] e placeholder și apare așa pe site până îl completezi.
 * - Cifrele (views, abonați etc.) sunt numere simple, fără puncte: 1250000, nu „1.250.000”.
 *   Site-ul le formatează singur (ex. „1,2 mil.”). Cât timp sunt `null`, apare „[nr.]”.
 * - Linkurile care încă lipsesc sunt `null`; butonul respectiv duce la „#” până le completezi.
 * - Fișierele (poze, clipuri, logo-uri) se pun în `public/` și se scriu aici cu „/” în față,
 *   ex. „/images/portret.webp”. Cât timp sunt `null`, apare un placeholder.
 * - Clipurile: pui originalul în `public/raw/` și rulezi `npm run videos`. Scriptul face
 *   preview-ul, versiunea HD și coperta; aici scrii doar căile lor.
 */

/* ------------------------------------------------------------------ */
/* Tipuri                                                              */
/* ------------------------------------------------------------------ */

/** Text afișat când o cifră lipsește. */
export const MISSING_NUMBER = "[nr.]";

export type Url = string | null;

export type Link = {
  label: string;
  href: Url;
};

/** O cifră care numără de la 0 când intră în ecran. */
export type Stat = {
  value: number | null;
  /** Ex. „+” sau „%”, afișat după cifră. */
  suffix?: string;
  label: string;
};

export type Platform = "TikTok" | "Instagram" | "YouTube Shorts";

/** Tipul unui clip de client (după asta se filtrează galeria de la Agenție). */
export type ClipCategory = "ads" | "virale";

/** O poză 4:5 în public/images/. Cât timp `src` e `null`, apare `placeholder`. */
export type Portrait = {
  src: Url;
  alt: string;
  placeholder: string;
};

/**
 * Un creator din echipă. Apare pe ambele pagini: la Creatori („Despre”, card complet)
 * și la Agenție („Cine suntem”, portret mic + prima cifră).
 */
export type CreatorProfile = {
  name: string;
  /** Ce fel de content face, ex. „Travel”. Apare ca etichetă lângă nume. */
  niche: string;
  portrait: Portrait;
  /** 1–2 paragrafe despre el/ei. */
  bio: string[];
  /** Cifrele canalului. Prima apare și pe pagina Agenție (de obicei abonații). */
  stats: Stat[];
};

/** Rețelele sociale. Apar în footer; linkul de YouTube e folosit și la „Abonează-te”. */
export type SocialLinks = {
  youtube: Link;
  instagram: Link;
  tiktok: Link;
};

/**
 * O secțiune de servicii (carduri cu preț). Aceeași formă pe ambele pagini.
 * Poți adăuga sau șterge oricâte carduri în `items`; grila se aranjează singură.
 */
export type ServicesContent = {
  eyebrow: string;
  title: string;
  /** O frază sub titlu (opțional), ex. ce include și ce nu. */
  intro?: string;
  /** Eticheta de pe cardul cu `featured: true` (ex. „Cel mai cerut”). */
  featuredLabel: string;
  pricePrefix: string;
  items: {
    num: string;
    title: string;
    description: string;
    features: string[];
    price: string;
    /** Card negru cu galben, evidențiat. De obicei unul singur. */
    featured: boolean;
  }[];
};

/** Ce apare în Google și când cineva dă share la pagină (WhatsApp, Facebook etc.). */
export type PageMeta = {
  /** Titlul din Google și din tab-ul browserului. Ideal sub 60 de caractere. */
  title: string;
  /** Descrierea din Google. Ideal 120–160 de caractere. */
  description: string;
  /** Textul alternativ al imaginii de share. */
  shareImageAlt: string;
};

/** Showreel 16:9 din hero. */
export type ShowreelContent = {
  /** MP4 în public/videos/, ex. „/videos/showreel.mp4”. */
  src: Url;
  /** Imagine WebP în public/posters/. */
  poster: Url;
  placeholder: string;
  soundOnLabel: string;
  soundOffLabel: string;
};

/** Primul ecran al unei pagini. */
export type HeroContent = {
  eyebrow: string;
  /** Titlul e împărțit ca să știm ce parte primește marker-ul galben. */
  title: { before: string; highlight: string; after: string };
  subtitle: string;
  primaryCta: Link;
  secondaryCta: Link;
  /** `null` = hero fără video (doar text). */
  showreel: ShowreelContent | null;
};

/** Banda galbenă care se mișcă. */
export type MarqueeContent = {
  items: string[];
  separator: string;
};

export type SiteContent = {
  /** Comun pentru tot site-ul. Titlul și descrierea sunt pe fiecare pagină (`agency.meta`, `creators.meta`). */
  meta: {
    /** Domeniul final, ex. „https://pleiar.ro”. Folosit la SEO și sitemap. */
    siteUrl: Url;
    siteName: string;
  };
  social: SocialLinks;
  nav: {
    logo: string;
    /** Comutatorul dintre cele două pagini (arată ca taburi). */
    pages: {
      ariaLabel: string;
      agency: Link;
      creators: Link;
    };
    cta: Link;
    ariaLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
  };
  contact: {
    title: string;
    text: string;
    cta: Link;
    email: string;
  };
  footer: {
    copyright: string;
  };
  /** Pagina „/” – Agenția, pentru branduri. */
  agency: {
    /** Linkurile din meniu pentru pagina asta (secțiunile ei). */
    navLinks: Link[];
    meta: PageMeta;
    hero: HeroContent;
    marquee: MarqueeContent;
    /** „Cine e în spate”: rezumatul despre tine, cu link spre pagina de creatori. */
    founder: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      /** Creatorii arătați aici (portret mic, nume, nișă și prima lor cifră). */
      creators: CreatorProfile[];
      link: Link;
    };
    clients: {
      eyebrow: string;
      title: string;
      intro: string;
      logos: {
        name: string;
        /** SVG/PNG transparent în public/logos/. */
        src: Url;
      }[];
      /** Tab-urile de deasupra clipurilor: unul mixt + câte unul pe categorie. */
      filters: {
        ariaLabel: string;
        /** Primul tab (activ la început): câte `mixedPerCategory` clipuri din fiecare categorie, alternate. */
        mixedLabel: string;
        mixedPerCategory: number;
        /** Câte un tab pe categorie; arată toate clipurile din ea. Ordinea de aici e ordinea tab-urilor. */
        categories: { id: ClipCategory; label: string }[];
      };
      viewsLabel: string;
      /** Player-ul care se deschide pe tot ecranul, cu sunet, la click pe un clip. */
      player: {
        openLabel: string;
        closeLabel: string;
        /** Citit de cititoarele de ecran cât timp clipul se încarcă. */
        loadingLabel: string;
        /** Butonul spre clipul original (apare doar dacă clipul are `href`). */
        originalLabel: string;
      };
      clips: {
        client: string;
        /** Tab-ul în care apare: „ads” sau „virale”. */
        category: ClipCategory;
        /** Platforma, afișată pe pastila albă din colțul clipului. */
        platform: Platform;
        /** Ce am făcut pentru client. */
        what: string;
        views: number | null;
        /** Preview mut pentru card (public/videos/nume.mp4, făcut de `npm run videos`). */
        video: Url;
        /** Versiunea HD cu sunet, pentru ecran complet (public/videos/nume-hd.mp4). Dacă lipsește, se folosește preview-ul. */
        videoHd: Url;
        /** WebP în public/posters/. */
        poster: Url;
        /** Linkul spre clipul original (opțional). */
        href: Url;
        placeholder: string;
      }[];
      stats: Stat[];
    };
    services: ServicesContent;
  };
  /** Pagina „/youtube” – pentru creatori (vlogueri, podcasteri, streameri). */
  creators: {
    /** Linkurile din meniu pentru pagina asta (secțiunile ei). */
    navLinks: Link[];
    meta: PageMeta;
    hero: HeroContent;
    marquee: MarqueeContent;
    /** „Despre”: echipa, cu câte un card pentru fiecare creator. */
    about: {
      eyebrow: string;
      title: string;
      /** Textul despre echipă/agenție, deasupra cardurilor. */
      paragraphs: string[];
      creators: CreatorProfile[];
      /** Cifrele echipei (sub carduri), ex. clipuri editate. */
      stats: Stat[];
    };
    youtube: {
      eyebrow: string;
      title: string;
      viewsLabel: string;
      playLabel: string;
      videos: {
        /** De pe ce canal e clipul (numele creatorului). */
        creator: string;
        /** ID-ul din link: youtube.com/watch?v=ACESTA */
        youtubeId: string | null;
        /** Thumbnail propriu 16:9 în public/images/youtube/. Dacă e `null`, se ia cel de la YouTube. */
        thumbnail: Url;
        title: string;
        views: number | null;
        /** Ex. „12:34”. Lasă "" dacă thumbnail-ul are deja durata pe el (captură de pe YouTube). */
        duration: string;
        placeholder: string;
      }[];
    };
    /** „Ce edităm pentru creatori”: doar editare (creatorul ne trimite materialul). */
    services: ServicesContent;
    /** „Filmare + editare”: venim noi cu aparatura (mai scump: deplasare + echipament). */
    filming: ServicesContent;
  };
};

/* ------------------------------------------------------------------ */
/* Conținut                                                            */
/* ------------------------------------------------------------------ */

/*
 * Date care apar pe AMBELE pagini. Le schimbi o singură dată aici.
 */

/** Numele agenției (încă nedecis). Apare în footer. */
const AGENCY_NAME = "[Numele agenției]";

/*
 * Creatorii din echipă. Fiecare apare la Creatori („Despre”, card complet)
 * și la Agenție („Cine suntem”, portret mic + prima cifră).
 * Ordinea din CREATORS e ordinea de pe site. Pentru un creator nou: copiezi un bloc.
 */
const PLEIAR: CreatorProfile = {
  name: "Pleiar",
  niche: "[nișa – ex. Vloguri]",
  portrait: {
    src: "/images/pleiar.png",
    alt: "Pleiar, cu căști și mască neagră, pe fundal galben",
    placeholder: "[Portret Pleiar]",
  },
  bio: [
    "[Pleiar a început cu … – 2–3 fraze: cum a început canalul, ce fel de vloguri face și de ce.]",
  ],
  stats: [
    { value: null, label: "abonați YouTube" },
    { value: null, label: "vizualizări pe canal" },
  ],
};

const CAPETURISTI: CreatorProfile = {
  name: "capeturisti",
  niche: "Travel",
  portrait: {
    src: "/images/capeturisti.png",
    alt: "capeturisti, cu șapcă cu urechi de urs, în fața unui lac de munte",
    placeholder: "[Portret capeturisti]",
  },
  bio: [
    "[capeturisti face content de travel … – 2–3 fraze: ce fel de călătorii, pe ce platforme, ce îi face diferiți.]",
  ],
  stats: [
    { value: null, label: "abonați YouTube" },
    { value: null, label: "vizualizări pe canal" },
  ],
};

const CREATORS: CreatorProfile[] = [PLEIAR, CAPETURISTI];

export const site: SiteContent = {
  meta: {
    siteUrl: null, // [domeniul, ex. https://pleiar.ro]
    siteName: "Pleiar",
  },

  social: {
    youtube: { label: "YouTube", href: null }, // [link canal YouTube]
    instagram: { label: "Instagram", href: null }, // [link Instagram]
    tiktok: { label: "TikTok", href: null }, // [link TikTok]
  },

  nav: {
    logo: "PLEIAR",
    pages: {
      ariaLabel: "Alege pagina",
      agency: { label: "Agenție", href: "/" },
      creators: { label: "Creatori", href: "/youtube" },
    },
    cta: { label: "Hai să lucrăm", href: "#contact" },
    ariaLabel: "Navigare principală",
    openMenuLabel: "Deschide meniul",
    closeMenuLabel: "Închide meniul",
  },

  contact: {
    title: "Ai ceva de filmat? Hai să vorbim.",
    text: "Spune-ne pe scurt ce vrei să faci, iar noi revenim cu o propunere în [nr.] zile.",
    cta: { label: "Programează un call", href: null }, // [link Calendly / Cal.com]
    email: "[email@domeniu.ro]",
  },

  footer: {
    copyright: `© 2026 ${AGENCY_NAME} · ${CREATORS.map((c) => c.name).join(" & ")}`,
  },

  /** Pagina „/” – Agenția, pentru branduri. */
  agency: {
    navLinks: [
      { label: "Despre", href: "#fondator" },
      { label: "Clienți", href: "#clienti" },
      { label: "Ce oferim", href: "#servicii" },
    ],

    meta: {
      title: "Pleiar – agenție de video și social media pentru branduri",
      description:
        "Facem clipuri pe care oamenii chiar le privesc până la capăt. Filmare, editare video și administrare social media pentru branduri.",
      shareImageAlt:
        "PLEIAR – Facem clipuri pe care oamenii chiar le privesc până la capăt.",
    },

    hero: {
      eyebrow: "Creatori · Editori · Agenție",
      title: {
        before: "Facem clipuri pe care oamenii",
        highlight: "chiar le privesc",
        after: "până la capăt.",
      },
      subtitle:
        "Am început cu propriile canale de YouTube. Acum filmăm, edităm și creștem conturile de social media ale clienților noștri.",
      primaryCta: { label: "Vezi rezultatele", href: "#clienti" },
      secondaryCta: { label: "Canalele noastre", href: "/youtube" },
      showreel: {
        src: "/videos/showreel.mp4", // TEST – de înlocuit
        poster: "/posters/showreel.webp",
        placeholder:
          "[Showreel 60 s – video pe tot ecranul, pornește automat fără sunet]",
        soundOnLabel: "Pornește sunetul",
        soundOffLabel: "Oprește sunetul",
      },
    },

    marquee: {
      items: ["EDITARE", "FILMARE", "SOCIAL MEDIA", "VLOG", "REELS", "TIKTOK", "YOUTUBE"],
      separator: "✦",
    },

    founder: {
      eyebrow: "01 · Cine suntem",
      title: "Agenția e condusă de creatori.",
      paragraphs: [
        "[1–2 fraze pentru branduri: cine sunteți și ce ați învățat pe propriile canale despre ce îi face pe oameni să se uite până la capăt – și aplicați acum pentru clienți.]",
      ],
      creators: CREATORS,
      link: { label: "Vezi canalele noastre", href: "/youtube" },
    },

    clients: {
      eyebrow: "02 · Agenția",
      title: "Clienții noștri și clipurile care au mers",
      intro:
        "Filmăm și edităm pentru branduri și creatori pe TikTok, Instagram și YouTube. Cifrele sunt de pe conturile lor.",
      logos: [
        { name: "[Logo client 1]", src: null },
        { name: "[Logo client 2]", src: null },
        { name: "[Logo client 3]", src: null },
        { name: "[Logo client 4]", src: null },
        { name: "[Logo client 5]", src: null },
        { name: "[Logo client 6]", src: null },
      ],
      filters: {
        ariaLabel: "Alege ce clipuri vezi",
        mixedLabel: "Toate",
        mixedPerCategory: 5,
        categories: [
          { id: "ads", label: "Ads" },
          { id: "virale", label: "Virale" },
        ],
      },
      viewsLabel: "views",
      player: {
        openLabel: "Vezi clipul cu sunet",
        closeLabel: "Închide clipul",
        loadingLabel: "Se încarcă clipul…",
        originalLabel: "Vezi clipul original",
      },
      /*
       * Clipurile: `category` decide tab-ul (ads / virale). Tab-ul „Toate” ia primele 5 din fiecare
       * categorie (în ordinea de aici) și le alternează. Poți pune oricâte (plan: 10 + 10); în „Ads” / „Virale” apar toate.
       * TEST: toate folosesc deocamdată același clip (clip-1).
       */
      clips: [
        // Ads
        { client: "[Client ads 1]", category: "ads", platform: "TikTok", what: "[Ce am făcut: reclamă filmată + editată]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 1]" },
        { client: "[Client ads 2]", category: "ads", platform: "Instagram", what: "[Ce am făcut: editare reclamă]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 2]" },
        { client: "[Client ads 3]", category: "ads", platform: "YouTube Shorts", what: "[Ce am făcut: campanie]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 3]" },
        { client: "[Client ads 4]", category: "ads", platform: "TikTok", what: "[Ce am făcut: editare reclamă]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 4]" },
        { client: "[Client ads 5]", category: "ads", platform: "Instagram", what: "[Ce am făcut: campanie]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 5]" },
        { client: "[Client ads 6]", category: "ads", platform: "YouTube Shorts", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 6]" },
        { client: "[Client ads 7]", category: "ads", platform: "TikTok", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 7]" },
        { client: "[Client ads 8]", category: "ads", platform: "Instagram", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 8]" },
        { client: "[Client ads 9]", category: "ads", platform: "YouTube Shorts", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 9]" },
        { client: "[Client ads 10]", category: "ads", platform: "TikTok", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip ads 10]" },
        // Virale
        { client: "[Client virale 1]", category: "virale", platform: "TikTok", what: "[Ce am făcut: filmare + editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 1]" },
        { client: "[Client virale 2]", category: "virale", platform: "Instagram", what: "[Ce am făcut: editare Reels]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 2]" },
        { client: "[Client virale 3]", category: "virale", platform: "YouTube Shorts", what: "[Ce am făcut: editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 3]" },
        { client: "[Client virale 4]", category: "virale", platform: "TikTok", what: "[Ce am făcut: editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 4]" },
        { client: "[Client virale 5]", category: "virale", platform: "Instagram", what: "[Ce am făcut: filmare + editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 5]" },
        { client: "[Client virale 6]", category: "virale", platform: "YouTube Shorts", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 6]" },
        { client: "[Client virale 7]", category: "virale", platform: "TikTok", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 7]" },
        { client: "[Client virale 8]", category: "virale", platform: "Instagram", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 8]" },
        { client: "[Client virale 9]", category: "virale", platform: "YouTube Shorts", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 9]" },
        { client: "[Client virale 10]", category: "virale", platform: "TikTok", what: "[Ce am făcut]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip viral 10]" },
      ],
      stats: [
        { value: null, label: "vizualizări generate pentru clienți" },
        { value: null, label: "clienți activi" },
        { value: null, label: "urmăritori câștigați de clienți" },
      ],
    },

    services: {
      eyebrow: "03 · Ce oferim",
      title: "De la filmare la contul care crește",
      featuredLabel: "Cel mai cerut",
      pricePrefix: "de la",
      items: [
        {
          num: "01",
          title: "Editare video",
          description: "Short-form și long-form, cu ritm construit pentru retenție.",
          features: ["Reels, TikTok, Shorts", "Vloguri și clipuri YouTube", "Subtitrări, sound design, color"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "02",
          title: "Filmare",
          description: "Venim cu echipamentul și filmăm conținut gata de editat.",
          features: ["Zile de filmare pentru branduri", "Evenimente și behind the scenes", "Conținut pentru o lună într-o zi"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "03",
          title: "Social media & marketing",
          description: "Strategie, calendar de postări și creștere organică.",
          features: ["Strategie și idei de conținut", "Administrare conturi", "Rapoarte lunare cu rezultate"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "04",
          title: "Pachet complet",
          description: "Idee, filmare, editare și postare. Tu doar apari în cadru.",
          features: ["Tot ce e mai sus, lunar", "Un om dedicat contului tău", "[Nr.] clipuri pe lună"],
          price: "[PREȚ]",
          featured: true,
        },
      ],
    },
  },

  /** Pagina „/youtube” – pentru creatori (vlogueri, podcasteri, streameri). */
  creators: {
    navLinks: [
      { label: "Despre", href: "#despre" },
      { label: "Clipuri", href: "#youtube" },
      { label: "Ce edităm", href: "#servicii" },
      { label: "Filmare", href: "#filmare" },
    ],

    meta: {
      title: "Pleiar – editare vloguri, podcasturi și stream-uri",
      description:
        "Edităm vloguri, reclame (ads), podcasturi și stream-uri pentru creatori, cu ritmul învățat pe propriile canale. Tu filmezi, noi facem restul.",
      shareImageAlt: "PLEIAR – Tu filmezi. Noi edităm ca să fie privit până la capăt.",
    },

    hero: {
      eyebrow: "Creatori · Editori",
      title: {
        before: "Tu filmezi.",
        highlight: "Noi edităm",
        after: "ca să fie privit până la capăt.",
      },
      subtitle:
        "Vloguri, ads, podcasturi și stream-uri editate de creatori care fac asta și pe propriile canale de YouTube, TikTok și Insta.",
      primaryCta: { label: "Cere o ofertă", href: "#contact" },
      secondaryCta: { label: "Vezi ce edităm", href: "#servicii" },
      // Fără video aici: dovada sunt „Clipuri de pe YouTube”. Poți pune un showreel ca la Agenție.
      showreel: null,
    },

    marquee: {
      items: ["VLOGURI", "PODCASTURI", "STREAM-URI", "ADS", "TWITCH", "SHORTS", "YOUTUBE"],
      separator: "✦",
    },

    about: {
      eyebrow: "01 · Oamenii din spatele camerei",
      title: "Salut, suntem [PLACEHOLDER].",
      paragraphs: [
        "[Cum a apărut agenția: ce am învățat pe propriile canale și aplicăm acum pentru clienți – ritm, retenție, hook-uri.]",
      ],
      creators: CREATORS,
      stats: [{ value: null, label: "clipuri editate de echipă" }],
    },

    // 3 exemple de clipuri editate de noi: unul de la Pleiar, unul de la capeturisti, unul de la un client.
    youtube: {
      eyebrow: "02 · Editate de noi",
      title: "Clipuri de pe YouTube",
      viewsLabel: "vizualizări",
      playLabel: "Redă clipul",
      videos: [
        { creator: PLEIAR.name, youtubeId: null, thumbnail: "/images/youtube/video-1.jpg", title: "[Titlul clipului]", views: null, duration: "[durată]", placeholder: "[Thumbnail clip Pleiar]" },
        { creator: CAPETURISTI.name, youtubeId: null, thumbnail: "/images/youtube/video-2.png", title: "[Titlul clipului]", views: null, duration: "", placeholder: "[Thumbnail clip capeturisti]" },
        { creator: "[Numele creatorului]", youtubeId: null, thumbnail: "/images/youtube/video-3.png", title: "[Titlul clipului]", views: null, duration: "", placeholder: "[Thumbnail clip client]" },
      ],
    },

    /**
     * Ca să adaugi un serviciu nou: copiezi un card de mai jos (de la `{` la `},`),
     * îi schimbi numărul, titlul și textele. Grila se aranjează singură.
     */
    services: {
      eyebrow: "03 · Doar editare",
      title: "Ce edităm pentru creatori",
      intro: "Tu filmezi și ne trimiți materialul, noi îl transformăm în clipuri gata de postat.",
      featuredLabel: "Cel mai cerut",
      pricePrefix: "de la",
      items: [
        {
          num: "01",
          title: "Vloguri",
          description: "Montaj care ține oamenii până la final: hook din primele secunde, ritm și poveste.",
          features: ["Vloguri și clipuri long-form pentru YouTube", "Structură gândită pentru retenție", "Subtitrări, sound design, color"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "02",
          title: "Podcasturi",
          description: "Podcastul video editat cap-coadă, plus clipuri scurte din cele mai bune momente.",
          features: ["Montaj pe mai multe camere", "Sunet curățat și egalizat", "Clipuri scurte pentru TikTok, Reels, Shorts"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "03",
          title: "Stream-uri",
          description: "Din ore de live pe Twitch sau YouTube, scoatem momentele care merită văzute.",
          features: ["Highlights și best-of-uri pentru YouTube", "Clipuri scurte din momentele bune", "Intro, tranziții și subtitrări"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "04",
          title: "Editare Ads",
          description: "Campaniile primite de la branduri, editate profesionist, ca reclama să arate bine și să-și facă treaba.",
          features: ["Ads pentru TikTok, Instagram, YouTube și Facebook", "Formate verticale și orizontale, cum cere brandul", "Hook, subtitrări, sound design, mesaj clar"],
          price: "[PREȚ]",
          featured: false,
        },
      ],
    },

    /**
     * Filmare + editare: venim noi cu aparatura. E separat de „Doar editare”
     * pentru că prețul include deplasarea și echipamentul.
     */
    filming: {
      eyebrow: "04 · Filmare + editare",
      title: "Venim noi, filmăm și edităm",
      intro:
        "Venim la tine cu aparatură profesională: cameră, lumini și sunet. Prețul include deplasarea și echipamentul, plus editarea.",
      featuredLabel: "Cel mai cerut",
      pricePrefix: "de la",
      items: [
        {
          num: "01",
          title: "Vlog",
          description: "Te însoțim la filmare – în oraș, la un eveniment sau într-o călătorie – și edităm vlogul cap-coadă.",
          features: ["Cameraman pe toată durata filmării", "Aparatură profesională", "Editare inclusă, gata de postat"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "02",
          title: "Podcast",
          description: "Montăm studioul la tine: camere, lumini și microfoane. Apoi edităm episodul și clipurile scurte.",
          features: ["Setup pe mai multe camere", "Microfoane și lumini profesionale", "Episod complet + clipuri scurte"],
          price: "[PREȚ]",
          featured: false,
        },
        {
          num: "03",
          title: "Ads",
          description: "Filmăm reclama primită de la brand și o edităm pentru fiecare platformă pe care rulează.",
          features: ["Filmare la locație sau la tine acasă", "Aparatură profesională", "Variante pentru TikTok, Reels, Shorts"],
          price: "[PREȚ]",
          featured: false,
        },
      ],
    },
  },
};
