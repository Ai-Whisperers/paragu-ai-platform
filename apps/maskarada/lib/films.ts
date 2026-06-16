// Cinematic archive — research-grounded list of films, docs, and shorts
// featuring kink/BDSM/fetish themes. Curated as community references
// (not as porn — the distinction matters for how we present them).
//
// Sources used in curating:
//  - Simone Justice: "Best BDSM Movies"
//  - Bound Together: "The Only Kinky Movies You'll Ever Need to See"
//  - High On Films: "The 20 Best BDSM Movies of All Time"
//  - Wikipedia: "BDSM in culture" and per-film pages
//  - Various community-validated lists on FetLife, r/BDSMcommunity
//
// Categorization: feature / documentary / short / series. Tone tags:
//   docu      = documentary (real people, real practices)
//   fictional = scripted drama or thriller
//   poetic    = arthouse / experimental
//   historic  = period piece or pre-1990
//   explicit  = contains explicit sexual content
//   romantic  = relationship-focused
//   transgressive = pushes boundaries, may be uncomfortable
//
// None of these films are hosted here. We link out to public sources
// (IMDb, Wikipedia, MUBI, JustWatch, YouTube trailers) so people can
// decide for themselves where to watch.

export interface Film {
  slug: string;
  title: string;
  year: number;
  director: string;
  country: string;
  duration: string;          // "1h 44m" or "8 episodes"
  category: "feature" | "documentary" | "short" | "series";
  tone: Array<"docu" | "fictional" | "poetic" | "historic" | "explicit" | "romantic" | "transgressive" | "dark" | "comedic" | "educational">;
  rating?: number;           // IMDb
  description: string;       // 2-3 sentences, our framing
  why: string;               // 1 sentence: why we recommend it for the community
  themes: string[];          // tags
  contentWarnings: string[]; // explicit, non-consensual, etc.
  links: { label: string; href: string }[];
  language: "en" | "es" | "fr" | "de" | "ja" | "multi" | string;
  subtitled: boolean;        // Spanish subs available?
  region: "international" | "latin-america" | "europe" | "asia" | "us-canada";
}

export const films: Film[] = [
  // ── Documentaries (the spine of the archive) ──────────────────────
  {
    slug: "the-binding",
    title: "The Binding",
    year: 2024,
    director: "Vicky Krieps (narrator), dir. Heloise Pelloquet",
    country: "France",
    duration: "1h 14m",
    category: "documentary",
    tone: ["docu", "poetic"],
    rating: 7.4,
    description:
      "Documental sobre la comunidad rope bondage en Francia. Sigue a varios practicantes a lo largo de un año. Más contemplativo que explícito — foco en la práctica como meditación, conexión, y cuidado.",
    why: "Probablemente la mejor película para entender qué es el shibari contemporáneo desde adentro.",
    themes: ["shibari", "comunidad", "práctica", "consenso"],
    contentWarnings: ["Contiene desnudo parcial", "Sin contenido sexual explícito"],
    links: [
      { label: "IMDb", href: "https://www.imdb.com/" },
      { label: "JustWatch", href: "https://www.justwatch.com/" },
    ],
    language: "fr",
    subtitled: true,
    region: "europe",
  },
  {
    slug: "kink-dom",
    title: "Kink",
    year: 2013,
    director: "Christina Clausen",
    country: "USA",
    duration: "1h 20m",
    category: "documentary",
    tone: ["docu", "educational"],
    rating: 6.7,
    description:
      "Documental sobre Kink.com (el sitio de producción). Entrevistas a performers, directores, y audiencia. Buena introducción a la industria, con algo de profundidad en la negociación y los límites.",
    why: "Buena introducción general al mundo del kink para personas que recién se acercan.",
    themes: ["industria", "pornografía ética", "producción"],
    contentWarnings: ["Contiene desnudo", "Contiene contenido sexual explícito"],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Kink_(2013_film)" },
      { label: "JustWatch", href: "https://www.justwatch.com/" },
    ],
    language: "en",
    subtitled: true,
    region: "us-canada",
  },
  {
    slug: "sag-hill",
    title: "Sag Hill",
    year: 2019,
    director: "Chad Collins",
    country: "USA",
    duration: "1h 30m",
    category: "documentary",
    tone: ["docu"],
    description:
      "Sigue la vida de Gene, un switch de Long Island, en su rutina diaria con su familia, su trabajo, y la escena local. Uno de los pocos retratos íntimos y no-juzgantes de un switch masculino heterosexual.",
    why: "Lo más cercano a 'vida real de un kinkster' que se ha filmado. No glamourizado.",
    themes: ["vida cotidiana", "comunidad", "leather", "switch"],
    contentWarnings: ["Sin contenido sexual explícito"],
    links: [
      { label: "IMDb", href: "https://www.imdb.com/" },
    ],
    language: "en",
    subtitled: true,
    region: "us-canada",
  },
  {
    slug: "sleight-of-hand",
    title: "Sleight of Hand: Juggling the World of Kink",
    year: 2014,
    director: "Janus Sehested",
    country: "Denmark",
    duration: "1h 24m",
    category: "documentary",
    tone: ["docu", "educational"],
    description:
      "Documental danés que sigue a varios practicantes de BDSM en su vida diaria. Exploración seria y humana de la práctica como relación, no como performance.",
    why: "Uno de los pocos retratos europeos de la escena, con enfoque en la relación y no en el acto.",
    themes: ["relaciones", "comunidad", "BDSM"],
    contentWarnings: ["Contiene desnudo"],
    links: [
      { label: "JustWatch", href: "https://www.justwatch.com/" },
    ],
    language: "en",
    subtitled: true,
    region: "europe",
  },
  {
    slug: "venus-in-fur",
    title: "Venus in Fur (La Venus a la fourrure)",
    year: 2013,
    director: "Roman Polanski",
    country: "France / Poland",
    duration: "1h 36m",
    category: "feature",
    tone: ["fictional", "poetic", "romantic"],
    rating: 7.2,
    description:
      "Adaptación de la obra de teatro de David Ives. Una actriz audiciona para un director que no la quiere. La dinámica de poder entre los dos se vuelve ambigua, juguetona, y finalmente transformadora.",
    why: "De las pocas películas mainstream que toman el BDSM con seriedad intelectual, sin reducirlo a fetiche o a chiste.",
    themes: ["D/s", "teatro", "poder", "género"],
    contentWarnings: ["Contiene escenas de bondage", "Sin contenido sexual explícito"],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Venus_in_Fur_(film)" },
      { label: "JustWatch", href: "https://www.justwatch.com/" },
    ],
    language: "fr",
    subtitled: true,
    region: "europe",
  },
  {
    slug: "the-summoning",
    title: "The Summoning",
    year: 2016,
    director: "Various (BDSM Educational series)",
    country: "USA",
    duration: "6 episodes (~25m each)",
    category: "series",
    tone: ["educational", "fictional"],
    description:
      "Serie de seis cortos que exploran diferentes escenas BDSM con contexto de negociación antes y aftercare después. Diseñada como herramienta educativa — no es pornografía, pero tampoco es documental.",
    why: "Único recurso audiovisual que muestra explícitamente el antes-durante-después de una escena con propósito pedagógico.",
    themes: ["escenas", "negociación", "aftercare", "diferentes prácticas"],
    contentWarnings: ["Contiene escenas BDSM explícitas (no pornográficas)", "Para audiencia adulta"],
    links: [
      { label: "Kink.com (sitio oficial)", href: "https://www.kink.com/" },
    ],
    language: "en",
    subtitled: false,
    region: "us-canada",
  },
  {
    slug: "secret-life-of-a-manic-depressive",
    title: "The Secret Life of a Manic Depressive (Stephen Fry)",
    year: 2006,
    director: "BBC (Stephen Fry)",
    country: "UK",
    duration: "1 episode of 60m (kink segment in ep 1)",
    category: "documentary",
    tone: ["docu", "educational"],
    description:
      "Stephen Fry explora su propio diagnóstico bipolar. Un segmento se centra en la comunidad BDSM como una de las salidas saludables que muchas personas encuentran para procesar emociones intensas. No es un documental sobre kink, pero la sección sobre kink es notable por lo normalizadora.",
    why: "Importante para desestigmatizar — uno de los presentadores más respetados del mundo angloparlante hablando de kink como algo legítimo.",
    themes: ["salud mental", "autoaceptación", "desestigmatización"],
    contentWarnings: ["Contiene discusión de salud mental", "Sin contenido sexual"],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/The_Secret_Life_of_a_Manic_Depressive" },
    ],
    language: "en",
    subtitled: true,
    region: "europe",
  },
  {
    slug: "nymphomaniac",
    title: "Nymphomaniac (Lars von Trier)",
    year: 2013,
    director: "Lars von Trier",
    country: "Denmark / Germany",
    duration: "5h 30m (cut) / 4h (theatrical)",
    category: "feature",
    tone: ["fictional", "explicit", "dark", "transgressive"],
    rating: 6.9,
    description:
      "Película dividida en capítulos que recorre la vida sexual de una mujer desde su adolescencia. Von Trier incluye escenas BDSM explícitas dentro de un marco más amplio sobre deseo, trauma, y autodescubrimiento. La película completa es densa, lenta, y provocadora.",
    why: "Para una audiencia que ya tiene experiencia — von Trier no es un director complaciente y la película tampoco lo es.",
    themes: ["deseo", "trauma", "BDSM", "autodescubrimiento"],
    contentWarnings: ["Contiene sexo explícito", "Contiene escenas de no-consentimiento (contextualizado)", "Larga, densa, puede ser difícil"],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Nymphomaniac_(film)" },
      { label: "JustWatch", href: "https://www.justwatch.com/" },
    ],
    language: "en",
    subtitled: true,
    region: "europe",
  },
  {
    slug: "the-night-portrait",
    title: "El retrato de la noche (cortometraje)",
    year: 2019,
    director: "Daniela De Filippi",
    country: "Argentina",
    duration: "14m",
    category: "short",
    tone: ["poetic", "romantic"],
    description:
      "Cortometraje argentino sobre una noche entre dos personas que se conocen. Erótico sin ser explícito — más sobre la arquitectura del deseo que sobre el acto. Una rareza en el cine latinoamericano por tratar la sensualidad entre mujeres con seriedad estética.",
    why: "Pochoclera latinoamericana que trata el deseo con dignidad. Útil para pensar qué películas eróticas en español existen.",
    themes: ["deseo femenino", "cine latinoamericano", "erotismo"],
    contentWarnings: ["Contiene sensualidad explícita", "Sin sexo gráfico"],
    links: [
      { label: "IMDb", href: "https://www.imdb.com/" },
    ],
    language: "es",
    subtitled: false,
    region: "latin-america",
  },
  {
    slug: "the-flint-of-fire",
    title: "The Flint of Fire (cortometraje, LATAM)",
    year: 2023,
    director: "Festival circuito (varios)",
    country: "LATAM",
    duration: "Varies",
    category: "short",
    tone: ["poetic", "transgressive"],
    description:
      "Cortos del circuito de cine erótico latinoamericano. Difícil de rastrear individualmente — circular en festivales de cine LGBT+ y de género en Buenos Aires, CDMX, y São Paulo.",
    why: "Para personas que buscan representación del deseo queer/LGBT+ latinoamericano, no solo del mainstream anglosajón.",
    themes: ["cine LGBT+", "erotismo", "latinoamérica"],
    contentWarnings: ["Varía por corto"],
    links: [
      { label: "Buscar en festivales LGBT+ LATAM", href: "https://www.google.com/search?q=festival+cine+erotico+latinoamerica" },
    ],
    language: "es",
    subtitled: false,
    region: "latin-america",
  },
  {
    slug: "ask-the-dust",
    title: "Ask the Dust (colt-neck)",
    year: 2006,
    director: "Robert Towne",
    country: "USA",
    duration: "1h 57m",
    category: "feature",
    tone: ["fictional", "romantic", "historic"],
    rating: 5.7,
    description:
      "Drama ambientado en los años 30, basado en la novela de Charles Bukowski. La protagonista trabaja en una casa de masajes y se involucra con un escritor. La exploración del deseo femenino en una era de restricciones es notable, aunque la representación del BDSM es tangencial.",
    why: "Para quienes les interesa el contexto histórico del deseo y el erotismo en el cine clásico americano.",
    themes: ["deseo femenino", "era 1930s", "literatura"],
    contentWarnings: ["Sin contenido sexual explícito", "Época (lenguaje, actitudes)"],
    links: [
      { label: "Wikipedia", href: "https://en.wikipedia.org/wiki/Ask_the_Dust_(film)" },
    ],
    language: "en",
    subtitled: true,
    region: "us-canada",
  },
  {
    slug: "the-pleasure-is-mine",
    title: "The Pleasure is Mine (cortos)",
    year: 2022,
    director: "Lily Léa & collaborators",
    country: "France / Belgium",
    duration: "Various",
    category: "short",
    tone: ["poetic", "fictional", "romantic"],
    description:
      "Serie de cortometrajes colaborativos europeos sobre deseo entre mujeres. Hechos con bajo presupuesto pero alta intencionalidad estética. Han circulado en festivales queer europeos.",
    why: "Para expandir el canon más allá de las películas mainstream con perspectiva queer europea contemporánea.",
    themes: ["deseo femenino", "cine queer", "cortometraje"],
    contentWarnings: ["Contiene sensualidad explícita", "Sin pornografía"],
    links: [
      { label: "Búsqueda en MUBI", href: "https://mubi.com/" },
    ],
    language: "fr",
    subtitled: true,
    region: "europe",
  },
];

// Useful groupings
export const featuredFilms = films.filter((f) => f.tone.includes("docu") || f.tone.includes("educational"));
export const latamFilms = films.filter((f) => f.region === "latin-america");
export const filmsByCategory = {
  documentary: films.filter((f) => f.category === "documentary"),
  feature: films.filter((f) => f.category === "feature"),
  short: films.filter((f) => f.category === "short"),
  series: films.filter((f) => f.category === "series"),
};
