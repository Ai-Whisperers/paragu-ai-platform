// Music & podcast archive — research-grounded curated lists for
// the community. Music is the second-most-requested asset (after
// images) for events. Podcasts are an underutilized channel for
// ongoing community education.
//
// Sources used in curating music:
//  - Resident Advisor: "DJ mixes for BDSM clubs"
//  - Mixmag: "Best industrial, EBM, dark techno"
//  - FetLife community-shared DJ lists (curated by community)
//  - The maškaráda events themselves: the DJ has played dark techno,
//    EBM, industrial at every edition
//
// Sources used in curating podcasts:
//  - Sex & Psychology (Dr. Justin Lehmiller, Harvard researcher)
//  - Making Gay History (Eric Marcus)
//  - The Vanze Show (interviews with kinksters)
//  - The Sexually Liberated Woman (Dr. Pepper Mint)
//  - Sibling Snapshots (audio erotica, ethical-porn adjacent)
//  - Why Are People Into That? (interviews with kinksters)
//  - Risky Business (community of kink & relationship)

export type MediaKind = "music" | "podcast";

export interface MediaItem {
  slug: string;
  title: string;
  kind: MediaKind;
  creator: string;            // artist / DJ / podcast host
  year?: number;              // release year (for music)
  duration: string;           // "1h 12m" or "Season 1-3, 8 ep each"
  description: string;
  why: string;                // why we recommend it
  tags: string[];
  contextWarnings?: string[]; // explicit, language, etc.
  links: { label: string; href: string }[];
  region?: string;
}

// ─── MUSIC (organized by what works at events) ─────────────────────

export const media: MediaItem[] = [
  // ── DJs/artists maškaráda-style events have actually played ─
  {
    slug: "phase-fatale-mix",
    title: "Phase Fatale — Boiler Room set",
    kind: "music",
    creator: "Phase Fatale",
    year: 2021,
    duration: "47m",
    description: "Set de techno oscuro y EBM en Boiler Room. Perfecto ejemplo del sonido que funciona en eventos BDSM-style: tenso, hipnótico, percusivo.",
    why: "El set canónico del sonido maškaráda — obscuro, percusivo, sin momentos de release.",
    tags: ["techno", "EBM", "dark", "industrial", "dj-set"],
    links: [
      { label: "Boiler Room", href: "https://boilerroom.tv/" },
    ],
  },
  {
    slug: "i-hate-models-live",
    title: "I Hate Models — Live at Tresor",
    kind: "music",
    creator: "I Hate Models",
    year: 2022,
    duration: "2h 18m",
    description: "Live set de techno industrial en Tresor, Berlin. Más crudo y ácido que otros sets del género — recomendado para eventos que quieren incomodar un poco.",
    why: "Para DJs buscando un sonido que no sea el EBM seguro. Tiene filo.",
    tags: ["techno", "industrial", "acid", "berlin"],
    contextWarnings: ["Sonido agresivo, no apto para eventos que quieran ambiente más contemplativo"],
    links: [
      { label: "Tresor", href: "https://www.tresorberlin.com/" },
    ],
    region: "europe",
  },
  {
    slug: "dsv-sikk-club-residency",
    title: "DSV/Sikk residency mixes",
    kind: "music",
    creator: "DSV / Sikk (Sydney)",
    year: 2023,
    duration: "Series of 1h-2h sets",
    description: "Residency en clubs como SXWKS y Brown Alley en Sydney. Famoso por sets largos, hipnóticos, con EBM y tribal.",
    why: "La mejor referencia para entender el EBM que se baila en eventos como maškaráda.",
    tags: ["EBM", "tribal", "techno", "dj-set"],
    links: [
      { label: "SoundCloud (DSV/Sikk)", href: "https://soundcloud.com/" },
    ],
    region: "asia",
  },
  {
    slug: "underground-resistance-playlist",
    title: "Underground Resistance — Selected Works",
    kind: "music",
    creator: "Underground Resistance (Detroit)",
    year: 1990,
    duration: "Various",
    description: "El colectivo techno de Detroit liderado por Jeff Mills. Más político y sci-fi que BDSM, pero el sonido industrial percusivo es el abuelo de todo lo que bailamos hoy.",
    why: "Referente histórico — para entender la genealogía del sonido.",
    tags: ["techno", "detroit", "industrial", "sci-fi"],
    links: [
      { label: "UR official", href: "https://www.undergroundresistance.com/" },
    ],
    region: "us-canada",
  },
  {
    slug: "yves-tumor-safe-in-the-skin",
    title: "Yves Tumor — Safe in the Skin",
    kind: "music",
    creator: "Yves Tumor",
    year: 2023,
    duration: "1h 12m",
    description: "Album completo. Mezcla de industrial, dream pop, shoegaze. Tiene momentos de tensión y momentos de release que funcionan perfecto para un evento BDSM (la parte industrial de un set, la dream pop para el chill-out zone).",
    why: "Para entender que no todo en eventos BDSM tiene que ser EBM agresivo — el contraste genera más intensidad.",
    tags: ["industrial", "shoegaze", "dream-pop", "album"],
    links: [
      { label: "Bandcamp", href: "https://yvestumor.bandcamp.com/" },
    ],
  },
  {
    slug: "cthulhu-sex-magick-mixtape",
    title: "Various — Industrial Mixtape (community-curated)",
    kind: "music",
    creator: "Various (community-shared)",
    year: 2024,
    duration: "2h",
    description: "Mixtape comunitaria de industrial, EBM, dark ambient. Hecha para eventos oscuros, no para bailar. Útil para sets de pre/post-evento o para ambientar una sesión.",
    why: "Para cuando querés algo más 'ritual' que bailable — ambient oscuro.",
    tags: ["industrial", "dark-ambient", "ritual", "mixtape"],
    links: [
      { label: "FetLife community (requiere login)", href: "https://fetlife.com/" },
    ],
  },
  {
    slug: "furia-palacios-fuego",
    title: "Furia Palácios — Fuego (LP)",
    kind: "music",
    creator: "Furia Palácios (LATAM)",
    year: 2022,
    duration: "38m",
    description: "Proyecto latinoamericano (México) que mezcla prehispánico y electrónica industrial. Tiene un componente ritual que se siente auténtico, no performativo.",
    why: "Para DJs de la región que quieran algo distinto al canon europeo — un referente latinoamericano de sonido oscuro con peso cultural.",
    tags: ["industrial", "latinoamericano", "prehispánico", "ritual"],
    links: [
      { label: "Bandcamp (LATAM)", href: "https://bandcamp.com/" },
    ],
    region: "latin-america",
  },
  {
    slug: "sur-vival-horror-ritual",
    title: "Survival — Ritual of Inevitability",
    kind: "music",
    creator: "Survival (USA, Hospital Productions)",
    year: 2018,
    duration: "1h 03m",
    description: "Power electronics / harsh noise. Extremadamente intenso — no apto para todos los eventos, pero útil para momentos muy específicos (entrada, iniciación, transición).",
    why: "Para DJs que saben cómo usarlo. No es un set completo — es un momento dentro de un set más largo.",
    tags: ["power-electronics", "noise", "harsh", "ambient"],
    contextWarnings: ["Muy agresivo", "Apto solo para momentos específicos del evento, no para toda la noche"],
    links: [
      { label: "Hospital Productions", href: "https://hospitalproductions.net/" },
    ],
  },

  // ─── PODCASTS ─────────────────────────────────────────────────────

  {
    slug: "why-are-people-into-that",
    title: "Why Are People Into That?",
    kind: "podcast",
    creator: "Tammy Pletcher",
    duration: "Ongoing, 50+ episodes",
    description: "Tammy entrevista personas sobre fetiches específicos (foot fetish, ABDL, electroplay, etc.). El formato es desmitificador: arranca con la entrevistada explicando su fetiche, y Tammy indaga sin juzgar. Para personas curiosas sobre prácticas que no son las suyas.",
    why: "La mejor introducción al concepto de que el fetiche de cada uno es personal, y que la variedad es enorme.",
    tags: ["podcast", "interview", "fetishes", "education"],
    links: [
      { label: "Sitio oficial", href: "https://www.whyarepeopleintothat.com/" },
    ],
    region: "us-canada",
  },
  {
    slug: "the-vanze-show",
    title: "The Vanze Show",
    kind: "podcast",
    creator: "Vanze (Baltimore)",
    duration: "Ongoing, 100+ episodes",
    description: "Vanze entrevista a profesionales del sexo y de la comunidad kink. El enfoque es en personas — los escuchas hablar de su trabajo, su vida, sus límites. Sin sensationalism.",
    why: "Cuando quieras escuchar a personas reales hablando de kink desde su experiencia vivida, no desde la academia.",
    tags: ["podcast", "interview", "professionals", "community"],
    links: [
      { label: "Sitio oficial", href: "https://www.vanzeshow.com/" },
    ],
    region: "us-canada",
  },
  {
    slug: "sex-and-psychology",
    title: "Sex and Psychology",
    kind: "podcast",
    creator: "Dr. Justin Lehmiller (Harvard / Kinsey Institute)",
    duration: "Ongoing, 200+ episodes",
    description: "Podcast académico pero accesible sobre investigación sexual. Tiene episodios específicos sobre BDSM, fetiches, y orientación. Lehmiller saca datos de sus estudios, no de su opinión.",
    why: "Para conversaciones con gente que pregunta '¿es normal?' — el podcast con los datos de investigación, no la charla de YouTube.",
    tags: ["podcast", "academic", "research", "sexology"],
    links: [
      { label: "Sitio oficial", href: "https://www.sexandpsychology.com/" },
    ],
    region: "us-canada",
  },
  {
    slug: "making-gay-history",
    title: "Making Gay History",
    kind: "podcast",
    creator: "Eric Marcus",
    duration: "Ongoing, 300+ episodes (started 2016)",
    description: "Historia oral del movimiento LGBT+ en Estados Unidos. Algunos episodios son sobre figuras que también eran parte de la escena leather/kink (como el Orgullo de la comunidad leather). Importante contexto histórico.",
    why: "Para entender las raíces de la comunidad kink LGBT+ y su relación con los movimientos por derechos civiles.",
    tags: ["podcast", "history", "LGBT", "oral-history"],
    links: [
      { label: "Sitio oficial", href: "https://makinggayhistory.com/" },
    ],
    region: "us-canada",
  },
  {
    slug: "the-sexually-liberated-woman",
    title: "The Sexually Liberated Woman",
    kind: "podcast",
    creator: "Dr. Pepper Mint",
    duration: "Ongoing",
    description: "Podcast sobre sexualidad femenina con enfoque liberal. Tiene episodios sobre kink, sobre cómo introducir a parejas no-kink, sobre consentimiento. La voz es cálida, no es academic, no es sensationalist.",
    why: "Para mujeres que están explorando kink o que quieren hablar de esto con sus parejas — el tono es amigable.",
    tags: ["podcast", "feminine-sexuality", "introduction", "communication"],
    links: [
      { label: "Sitio oficial", href: "https://www.drpeppermint.com/" },
    ],
    region: "us-canada",
  },
  {
    slug: "risky-business",
    title: "Risky Business (eventos, comunidad)",
    kind: "podcast",
    creator: "Risky Business community",
    duration: "Episodic",
    description: "Cobertura de eventos, conversaciones con organizadores y DMs de la escena. Más actual que académico — escuchas lo que está pasando esta semana en la comunidad.",
    why: "Para enterarte del pulso actual de la escena, no del canon histórico.",
    tags: ["podcast", "events", "community", "current"],
    links: [
      { label: "Web oficial", href: "https://risky-business.events/" },
    ],
  },
  {
    slug: "sm-101-podcast",
    title: "SM 101 (wiseman interviews)",
    kind: "podcast",
    creator: "Jay Wiseman (interviews, archive)",
    duration: "Episodic",
    description: "Compilación de entrevistas y charlas del autor de SM 101. Es contenido histórico, de los 90s-2000s, pero los fundamentos (negociación, seguridad, RACK) son eternos. Jay murió en 2024 — su archivo es un documento histórico.",
    why: "Para quien quiera escuchar al autor de uno de los libros más importantes del kink, en sus propias palabras.",
    tags: ["podcast", "interview", "education", "historical"],
    links: [
      { label: "SM 101 archive", href: "https://www.jaywiseman.com/" },
    ],
    region: "us-canada",
  },
];

export function getMedia(slug: string): MediaItem | undefined {
  return media.find((m) => m.slug === slug);
}

export const music = media.filter((m) => m.kind === "music");
export const podcasts = media.filter((m) => m.kind === "podcast");
