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

/** O poză 4:5 în public/images/. Cât timp `src` e `null`, apare `placeholder`. */
export type Portrait = {
  src: Url;
  alt: string;
  placeholder: string;
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
      portrait: Portrait;
      stats: Stat[];
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
      filters: {
        ariaLabel: string;
        allLabel: string;
        platforms: Platform[];
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
    about: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      portrait: Portrait;
      stats: Stat[];
    };
    youtube: {
      eyebrow: string;
      title: string;
      subscribeLabel: string;
      viewsLabel: string;
      playLabel: string;
      videos: {
        /** ID-ul din link: youtube.com/watch?v=ACESTA */
        youtubeId: string | null;
        /** Thumbnail propriu 16:9 în public/images/youtube/. Dacă e `null`, se ia cel de la YouTube. */
        thumbnail: Url;
        title: string;
        views: number | null;
        /** Ex. „12:34”. */
        duration: string;
        placeholder: string;
      }[];
    };
    /** „Ce editez pentru creatori”. */
    services: ServicesContent;
  };
};

/* ------------------------------------------------------------------ */
/* Conținut                                                            */
/* ------------------------------------------------------------------ */

/*
 * Date care apar pe AMBELE pagini. Le schimbi o singură dată aici:
 * la Agenție („Cine e în spate”) și la Creatori („Despre”).
 */

/** Portretul tău (4:5, în public/images/). */
const PORTRAIT: Portrait = {
  src: "/images/portret.jpg", // TEST – de înlocuit
  alt: "Pleiar în culise, cu camera în mână",
  placeholder: "[Portret Pleiar – din culise, cu camera în mână]",
};

/** Abonații de pe canalul de YouTube. */
const YOUTUBE_SUBSCRIBERS: Stat = { value: null, label: "abonați YouTube" };

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
    copyright: "© 2026 Pleiar · [Numele agenției]",
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
      eyebrow: "Vlogger · Editor · Agenție",
      title: {
        before: "Facem clipuri pe care oamenii",
        highlight: "chiar le privesc",
        after: "până la capăt.",
      },
      subtitle:
        "Am început cu propriul canal de YouTube. Acum filmăm, edităm și creștem conturile de social media ale clienților noștri.",
      primaryCta: { label: "Vezi rezultatele", href: "#clienti" },
      secondaryCta: { label: "Canalul de YouTube", href: "/youtube" },
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
      eyebrow: "01 · Cine e în spate",
      title: "Agenția e condusă de un creator.",
      paragraphs: [
        "[1–2 fraze pentru branduri: cine ești și ce ai învățat pe propriul canal despre ce îi face pe oameni să se uite până la capăt – și aplici acum pentru clienți.]",
      ],
      portrait: PORTRAIT,
      stats: [YOUTUBE_SUBSCRIBERS],
      link: { label: "Vezi canalul meu", href: "/youtube" },
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
        ariaLabel: "Filtrează după platformă",
        allLabel: "Toate",
        platforms: ["TikTok", "Instagram", "YouTube Shorts"],
      },
      viewsLabel: "views",
      player: {
        openLabel: "Vezi clipul cu sunet",
        closeLabel: "Închide clipul",
        loadingLabel: "Se încarcă clipul…",
        originalLabel: "Vezi clipul original",
      },
      clips: [
        { client: "[Client 1]", platform: "TikTok", what: "[Ce am făcut: filmare + editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 1]" },
        { client: "[Client 2]", platform: "Instagram", what: "[Ce am făcut: editare Reels]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 2]" },
        { client: "[Client 3]", platform: "YouTube Shorts", what: "[Ce am făcut: editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 3]" },
        { client: "[Client 4]", platform: "TikTok", what: "[Ce am făcut: campanie]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 4]" },
        { client: "[Client 5]", platform: "Instagram", what: "[Ce am făcut: filmare + editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 5]" },
        { client: "[Client 6]", platform: "TikTok", what: "[Ce am făcut: editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 6]" },
        { client: "[Client 7]", platform: "YouTube Shorts", what: "[Ce am făcut: editare]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 7]" },
        { client: "[Client 8]", platform: "Instagram", what: "[Ce am făcut: campanie]", views: null, video: "/videos/clip-1.mp4", videoHd: "/videos/clip-1-hd.mp4", poster: "/posters/clip-1.webp", href: null, placeholder: "[Clip vertical – Client 8]" },
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
      { label: "Top 3", href: "#youtube" },
      { label: "Ce editez", href: "#servicii" },
    ],

    meta: {
      title: "Pleiar – editare vloguri, podcasturi și stream-uri",
      description:
        "Editez vloguri, podcasturi și stream-uri pentru creatori, cu ritmul învățat pe propriul canal de YouTube. Tu filmezi, eu fac restul.",
      shareImageAlt: "PLEIAR – Tu filmezi. Eu editez ca să fie privit până la capăt.",
    },

    hero: {
      eyebrow: "Vlogger · Editor",
      title: {
        before: "Tu filmezi.",
        highlight: "Eu editez",
        after: "ca să fie privit până la capăt.",
      },
      subtitle:
        "Vloguri, podcasturi și stream-uri editate de un creator care face asta și pe propriul canal de YouTube.",
      primaryCta: { label: "Cere o ofertă", href: "#contact" },
      secondaryCta: { label: "Vezi ce editez", href: "#servicii" },
      // Fără video aici: dovada sunt clipurile din „Top 3”. Poți pune un showreel ca la Agenție.
      showreel: null,
    },

    marquee: {
      items: ["VLOGURI", "PODCASTURI", "STREAM-URI", "TWITCH", "SHORTS", "YOUTUBE"],
      separator: "✦",
    },

    about: {
      eyebrow: "01 · Omul din spatele camerei",
      title: "Salut, sunt Pleiar.",
      paragraphs: [
        "[2–3 fraze despre tine: cum ai început canalul, ce fel de vloguri faci și de ce. Scrise la persoana I, pe tonul de pe canal.]",
        "[Cum a apărut agenția: ce ai învățat pe propriul canal și aplici acum pentru clienți – ritm, retenție, hook-uri.]",
      ],
      portrait: PORTRAIT,
      stats: [
        YOUTUBE_SUBSCRIBERS,
        { value: null, label: "vizualizări pe canal" },
        { value: null, label: "clipuri editate" },
      ],
    },

    youtube: {
      eyebrow: "02 · De pe canalul meu",
      title: "Top 3 clipuri de pe YouTube",
      /** Butonul duce la linkul din `social.youtube`. */
      subscribeLabel: "Abonează-te pe YouTube",
      viewsLabel: "vizualizări",
      playLabel: "Redă clipul",
      videos: [
        { youtubeId: null, thumbnail: "/images/youtube/video-1.jpg", title: "[Titlul clipului 1]", views: null, duration: "[durată]", placeholder: "[Thumbnail clip 1]" },
        { youtubeId: null, thumbnail: "/images/youtube/video-1.jpg", title: "[Titlul clipului 2]", views: null, duration: "[durată]", placeholder: "[Thumbnail clip 2]" },
        { youtubeId: null, thumbnail: "/images/youtube/video-1.jpg", title: "[Titlul clipului 3]", views: null, duration: "[durată]", placeholder: "[Thumbnail clip 3]" },
      ],
    },

    /**
     * Ca să adaugi un serviciu nou: copiezi un card de mai jos (de la `{` la `},`),
     * îi schimbi numărul, titlul și textele. Grila se aranjează singură.
     */
    services: {
      eyebrow: "03 · Pentru creatori",
      title: "Ce editez pentru creatori",
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
          description: "Din ore de live pe Twitch sau YouTube, scot momentele care merită văzute.",
          features: ["Highlights și best-of-uri pentru YouTube", "Clipuri scurte din momentele bune", "Intro, tranziții și subtitrări"],
          price: "[PREȚ]",
          featured: false,
        },
      ],
    },
  },
};
