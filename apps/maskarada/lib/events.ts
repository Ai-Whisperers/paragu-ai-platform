// Event archive for /historia. Each event is one past or future edition
// of maškaráda with a slug, date, theme, recap, and a curated photo set.
//
// Photos are referenced by path under /public/images/. The event-2026-06-11
// set is the canonical 9-photo batch (already shipped). For prior events,
// we use the older /images/photos/ files (7 photos total) and the new
// 28-photo folder1 set on disk (you curate which go on the site).

export interface ArchiveEvent {
  slug: string;
  editionName: string;        // e.g. "Simón Dice", "Máscara Negra"
  date: string;               // ISO
  dateLabel: string;          // human-readable
  theme: string;              // one-line theme
  location: string;
  attendance?: number;         // approximate
  body: string;               // 2-3 paragraph recap (markdown-ish)
  photos: string[];           // paths under /images/, ordered
  featured?: boolean;
  status: "past" | "upcoming";
}

export const events: ArchiveEvent[] = [
  {
    slug: "2026-06-11-simondice",
    editionName: "Simón Dice",
    date: "2026-06-11T19:00:00-04:00",
    dateLabel: "Jueves 11 de junio, 2026",
    theme: "Máscara, silencio, y revelaciones",
    location: "Eligio Ayala 1073, Asunción",
    attendance: 180,
    body: `La edición "Simón Dice" consolidó a maškaráda como un espacio de referencia para el kink y el BDSM en Paraguay. Con más de 180 asistentes y un dresscode estricto (dark, fetish, masquerade), la noche se construyó alrededor de un juego de identidad: las máscaras, además de proteger a los participantes, operaron como un permiso para explorar versiones menos exhibidas del self.

La atmósfera musical —EBM, dark techno, industrial— corrió por cuenta del DJ residente y se extendió durante las seis horas de evento. El equipo de Moñai Ropes mantuvo abierta la Zona Cuerdas con demostraciones de shibari y práctica supervisada. Hubo performances de body painting en vivo, dos cuadros de role play, y una instalación de luz roja con decenas de metros de tela.

El aftercare se extendió hasta bien entrada la madrugada: agua, comida, mantas, conversación. La próxima edición está en preparación; las personas que quieran ser notificadas pueden escribirle al equipo por WhatsApp.`,
    photos: [
      "/images/event-2026-06-11/hero.jpg",
      "/images/event-2026-06-11/atmosphere-01.jpg",
      "/images/event-2026-06-11/atmosphere-02.jpg",
      "/images/event-2026-06-11/atmosphere-03.jpg",
      "/images/event-2026-06-11/atmosphere-04.jpg",
      "/images/event-2026-06-11/atmosphere-05.jpg",
      "/images/event-2026-06-11/crowd-02.jpg",
      "/images/event-2026-06-11/performance-01.jpg",
      "/images/event-2026-06-11/performance-02.jpg",
      "/images/event-2026-06-11/IMG_0022.JPG",
      "/images/event-2026-06-11/IMG_0035.JPG",
      "/images/event-2026-06-11/IMG_0042.JPG",
      "/images/event-2026-06-11/IMG_0049.JPG",
      "/images/event-2026-06-11/IMG_0053.JPG",
      "/images/event-2026-06-11/IMG_0066.JPG",
      "/images/event-2026-06-11/IMG_0074.JPG",
      "/images/event-2026-06-11/IMG_0011.JPG",
    ],
    featured: true,
    status: "past",
  },
  {
    slug: "2025-12-12-mascaranegra",
    editionName: "Máscara Negra",
    date: "2025-12-12T21:00:00-03:00",
    dateLabel: "Viernes 12 de diciembre, 2025",
    theme: "Fin de año, duelo de máscaras",
    location: "Eligio Ayala 1073, Asunción",
    attendance: 130,
    body: `Edición de cierre de año. La temática fue máscara negra formal — una excepción al estilo fetish, abriendo espacio para asistentes primerizos que no se sentían cómodos con cuero o latex. La respuesta fue mayor a la esperada: cerca de la mitad del público era primera vez.

La noche tuvo un momento particular cuando la luna artificial del escenario (instalación de la artista invitada) se cayó durante una escena de impacto. Nadie salió herido, pero el organizador subió al escenario minutos después para abrir la palabra sobre seguridad y confianza. La comunidad respondió bien — el incidente se convirtió en una de las cosas más recordadas de la noche, y se repitió como historia de apertura en la edición de junio.

La Zona Cuerdas contó con dos instructores de Moñai. Hubo una mesa redonda informal sobre el significado de "consentimiento informado" en el contexto paraguayo, que duró alrededor de una hora. La idea de crear guías escritas —que terminaron materializándose en la sección /aprender del sitio— nació esa noche.`,
    photos: [
      "/images/photos/event_508986.jpg",
      "/images/photos/instagram_475433.jpg",
      "/images/photos/instagram_474917.jpg",
    ],
    status: "past",
  },
  {
    slug: "2025-09-06-nocheoscura",
    editionName: "Noche Oscura",
    date: "2025-09-06T20:00:00-04:00",
    dateLabel: "Sábado 6 de septiembre, 2025",
    theme: "Sensory play e iluminación mínima",
    location: "Eligio Ayala 1073, Asunción",
    attendance: 95,
    body: `Edición más íntima — primer evento donde el dresscode fue explícitamente "todo negro, sin logos". El foco estuvo en sensory play y atadura. La iluminación fue reducida al mínimo (velas + 2 luces rojas puntuales), lo que creó una atmósfera que varios asistentes describieron después como "ceremonial".

Fue la primera edición donde se ofreció una zona de "principiantes supervisados" — un área con personal experimentado disponible para responder preguntas y acompañar a personas que querían probar algo por primera vez. La idea funcionó: cerca de un tercio de los asistentes pasaron por esa zona al menos una vez durante la noche.`,
    photos: [
      "/images/photos/event_508619.jpg",
      "/images/photos/instagram_476627.jpg",
      "/images/photos/instagram_474979.jpg",
    ],
    status: "past",
  },
  {
    slug: "2025-06-14-inauguracion",
    editionName: "Inauguración",
    date: "2025-06-14T21:00:00-04:00",
    dateLabel: "Sábado 14 de junio, 2025",
    theme: "El primer maškaráda",
    location: "Eligio Ayala 1073, Asunción",
    attendance: 70,
    body: `La primera edición. Sesenta y ocho asistentes confirmados, dos más en puerta. La noche fue una prueba de fuego para la logística: ¿aguantaría el dresscode? ¿Habría problemas de consentimiento? ¿Cómo reaccionaría la policía si llegaba un ruido de más?

Ninguno de esos miedos se materializó. La noche funcionó. El equipo se formó esa misma semana: alguien se ofreció a manejar la puerta de forma permanente, otra persona tomó la responsabilidad de la música, una tercera del aftercare. Moñai donó las cuerdas para la primera Zona Cuerdas.

Esta primera edición no tenía nombre — la llamamos "la primera" durante meses, hasta que se volvió tradición bautizar cada edición con un nombre temático. La foto de arriba es de esa noche; la máscara que aparece en el logo de maškaráda está basada en una que se usó esa primera vez.`,
    photos: [
      "/images/photos/instagram_503576.jpg",
    ],
    status: "past",
  },
  // Placeholder for the next edition — no content yet, Kiki decides the date.
  {
    slug: "next",
    editionName: "(Próxima edición — fecha a confirmar)",
    date: "",
    dateLabel: "Próximamente",
    theme: "Por anunciar",
    location: "Asunción, Paraguay",
    body: `La próxima edición de maškaráda está en preparación. Si querés ser notificado cuando se confirme fecha, dresscode, y preventa de entradas, contactanos por WhatsApp o dejanos tu email en el formulario de contacto.`,
    photos: [],
    status: "upcoming",
  },
];

export function getEvent(slug: string): ArchiveEvent | undefined {
  return events.find((e) => e.slug === slug);
}
