// Search index for client-side in-site search.
// Each page contributes one doc. Excerpt is short by design — searching
// already finds matches in the long body but excerpt makes the result
// row scannable.

export interface SearchDoc {
  title: string;
  excerpt: string;
  href: string;
  kind: "page" | "news" | "programa";
  tags?: string[];
}

export const SEARCH_DOCS: SearchDoc[] = [
  {
    title: "SOMOSGAY — Inicio",
    excerpt: "Tekoporã para todes — Derechos LGBTQ+ y salud comunitaria en Paraguay desde 2005",
    href: "/",
    kind: "page",
    tags: ["home", "lanzamiento", "fundación"],
  },
  {
    title: "Clínica Kunu'u — Testeo VIH, PrEP, salud comunitaria",
    excerpt: "Primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. Gratuita, sin documento de identidad.",
    href: "/clinica-kunuu",
    kind: "page",
    tags: ["salud", "clinica", "VIH", "PrEP", "test", "prevención"],
  },
  {
    title: "Donar a SOMOSGAY",
    excerpt: "Doná a SOMOSGAY y apoyá la salud comunitaria LGTBI+ en Paraguay",
    href: "/donar",
    kind: "page",
    tags: ["donar", "donación", "dinero", "transferencia", "tigo money"],
  },
  {
    title: "Auditoría y transparencia",
    excerpt: "Informes auditados, financiadores, asignación de fondos",
    href: "/auditoria",
    kind: "page",
    tags: ["auditoría", "transparencia", "informe", "donación"],
  },
  {
    title: "Quiero ayudar sin donar",
    excerpt: "Otras formas de apoyar a SOMOSGAY además de donar",
    href: "/ayudar",
    kind: "page",
    tags: ["voluntario", "voluntariado", "prensa", "ayuda"],
  },
  {
    title: "Memoria 108",
    excerpt: "Homenaje anual a las víctimas de las razias de septiembre de 1959",
    href: "/memoria-108",
    kind: "page",
    tags: ["memoria", "historia", "razias", "bernardo aranda"],
  },
  {
    title: "Equipo SOMOSGAY",
    excerpt: "Equipo multidisciplinario: Liderazgo, Clínica, Programas, Comunicaciones",
    href: "/equipo",
    kind: "page",
    tags: ["equipo", "staff", "paloma", "dirección"],
  },
  {
    title: "Cuidado y seguridad personal",
    excerpt: "Si te sentís en peligro, esta página tiene pasos concretos",
    href: "/cuidado",
    kind: "page",
    tags: ["seguridad", "peligro", "ofensiva", "cuidado"],
  },
  {
    title: "Programa Kunu'u — PrEP y prevención combinada",
    excerpt: "Profilaxis Pre-Exposición: reduce el riesgo de VIH en 99%",
    href: "/programas/programa-kunuu",
    kind: "programa",
    tags: ["PrEP", "prevención", "VIH"],
  },
  {
    title: "Centro Tekoharã — Espacio de encuentro",
    excerpt: "Centro comunitario de SOMOSGAY en Asunción",
    href: "/programas/centro-tekohara",
    kind: "programa",
    tags: ["centro", "tekohara", "comunidad"],
  },
  {
    title: "Ñande Rekorã — Programa para mujeres lesbianas y bisexuales",
    excerpt: "Apoyo y visibilidad para mujeres lesbianas y bisexuales",
    href: "/programas/nande-rekora",
    kind: "programa",
    tags: ["mujeres", "lesbianas", "bisexuales"],
  },
  {
    title: "Karu Porã — Reducción de daños y acción social",
    excerpt: "Reducción de daños para personas en situación de vulnerabilidad",
    href: "/programas/karu-pora",
    kind: "programa",
    tags: ["karu", "reducción", "daños", "social"],
  },
  {
    title: "Conectar / Equis — Primera app LGTBI+ de Paraguay",
    excerpt: "App LGTBI+ construida por SOMOSGAY en 2014",
    href: "/noticias/equis-app-primera-app-gay-paraguay",
    kind: "news",
    tags: ["app", "tech"],
  },
  {
    title: "Guía completa de PrEP 2026",
    excerpt: "Todo lo que necesitás saber sobre Profilaxis Pre-Exposición",
    href: "/noticias/guia-completa-prep-2026",
    kind: "news",
    tags: ["PrEP", "VIH", "salud", "guía"],
  },
  {
    title: "Clínica Kunu'u — testeo gratuito 2025",
    excerpt: "Cobertura de pruebas de VIH, sífilis y hepatitis B en 2025",
    href: "/noticias/clinica-kunuu-testeo-gratuito-2025",
    kind: "news",
    tags: ["clinica", "test"],
  },
  {
    title: "Campaña PrEP 2023-2025",
    excerpt: "Yo amo PrEP — yo amo más seguro",
    href: "/noticias/campana-prep-2023-2025",
    kind: "news",
    tags: ["PrEP", "campaña"],
  },
  {
    title: "Kit de prensa",
    excerpt: "Recursos para periodistas, datos clave, referencias",
    href: "/prensa",
    kind: "page",
    tags: ["prensa", "periodismo", "kit", "datos"],
  },
];
