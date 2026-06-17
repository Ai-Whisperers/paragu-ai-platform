// Unified events model for /eventos (formal events) and /encuentros
// (recurring gatherings like munches, rope jams, workshops).
//
// Two types of event, distinguished by `kind`:
//   - "evento" — ticketed, produced, full event. Past ones go to /historia.
//   - "encuentro" — recurring or one-off small gathering. No ticket.
//     Always informal, always public, no production.
//
// Until the mk_events Supabase table is wired (Kiki runs the SQL),
// all events live in this TS file. The /eventos and /encuentros pages
// read from this. When the SQL runs and the admin tool is built, this
// becomes the seed data for the table and the page switches to read
// from Supabase.

export type EventKind = "evento" | "encuentro";
export type EncuentroFormat = "munch" | "rope_jam" | "workshop" | "discussion" | "social" | "demo";

export interface CommunityEvent {
  id: string;
  kind: EventKind;
  title: string;
  slug: string;
  date: string;            // ISO
  endDate?: string;
  dateLabel: string;       // human
  weekday: string;
  startTime?: string;      // "19:30" (PY local)
  duration?: string;       // "2 horas"
  location: string;
  address?: string;
  format?: EncuentroFormat; // only for encuentros
  description: string;
  body?: string;           // longer markdown
  capacity?: number;
  attendees?: number;      // post-event (eventos)
  price?: string;          // "Gratis" / "Gs 50.000" / "Donación"
  dresscode?: string;
  signupUrl?: string;      // external RSVP (meetup.com, etc.)
  signupNote?: string;     // free text for signup instructions
  status: "upcoming" | "today" | "past" | "cancelled";
  rrule?: string;          // for recurring: "WEEKLY;BYDAY=SA" or "BIWEEKLY;BYDAY=SA"
  heroImage?: string;
  photos?: string[];
  tags?: string[];
}

export const events: CommunityEvent[] = [
  // ─── Upcoming formal events ───────────────────────────────────────────
  {
    id: "evt-2026-08-15",
    kind: "evento",
    title: "Próxima edición — Tema por anunciar",
    slug: "2026-08-15-proxima",
    date: "2026-08-15T21:00:00-04:00",
    endDate: "2026-08-16T04:00:00-04:00",
    dateLabel: "Sábado 15 de agosto, 2026",
    weekday: "Sábado",
    startTime: "21:00",
    duration: "Hasta 04:00",
    location: "Asunción, Paraguay",
    address: "A confirmar al público. Se envía a quienes se anotaron por WhatsApp.",
    description:
      "La próxima edición de maškaráda. Tema, dresscode, preventa y line-up a confirmar. Anotate por WhatsApp o el formulario de /contacto para recibir el anuncio.",
    price: "A confirmar",
    dresscode: "A confirmar",
    status: "upcoming",
    tags: ["edición", "ticketed", "+18"],
  },

  // ─── Past editions (archive) ──────────────────────────────────────────
  {
    id: "evt-2026-06-11",
    kind: "evento",
    title: "Simón Dice",
    slug: "2026-06-11-simondice",
    date: "2026-06-11T19:00:00-04:00",
    endDate: "2026-06-12T01:00:00-04:00",
    dateLabel: "Jueves 11 de junio, 2026",
    weekday: "Jueves",
    startTime: "19:00",
    duration: "Hasta 01:00",
    location: "Eligio Ayala 1073, Asunción",
    address: "Eligio Ayala 1073, Asunción",
    description:
      "La edición \"Simón Dice\" consolidó a maškaráda como un espacio de referencia para el kink y el BDSM en Paraguay. Más de 180 asistentes, dresscode estricto (dark, fetish, masquerade), y un juego de identidad: las máscaras como permiso para explorar versiones menos exhibidas del self.",
    body: `La edición "Simón Dice" consolidó a maškaráda como un espacio de referencia para el kink y el BDSM en Paraguay. Con más de 180 asistentes y un dresscode estricto (dark, fetish, masquerade), la noche se construyó alrededor de un juego de identidad: las máscaras, además de proteger a los participantes, operaron como un permiso para explorar versiones menos exhibidas del self.

La atmósfera musical —EBM, dark techno, industrial— corrió por cuenta del DJ residente y se extendió durante las seis horas de evento. El equipo de Moñai Ropes mantuvo abierta la Zona Cuerdas con demostraciones de shibari y práctica supervisada. Hubo performances de body painting en vivo, dos cuadros de role play, y una instalación de luz roja con decenas de metros de tela.

El aftercare se extendió hasta bien entrada la madrugada: agua, comida, mantas, conversación. La próxima edición está en preparación; las personas que quieran ser notificadas pueden escribirle al equipo por WhatsApp.`,
    attendees: 180,
    price: "Entrada anticipada / en puerta",
    dresscode: "Dark, fetish, masquerade. Máscaras obligatorias.",
    status: "past",
    heroImage: "/images/event-2026-06-11/hero.jpg",
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
    ],
    tags: ["edición", "pasado", "máscaras", "shibari", "+18"],
  },

  // ─── Recurring encuentros (munches, jams, workshops) ─────────────────
  {
    id: "enc-munch-asuncion",
    kind: "encuentro",
    title: "Munch de Asunción",
    slug: "munch-asuncion",
    date: "2026-06-27T19:30:00-04:00",
    endDate: "2026-06-27T22:30:00-04:00",
    dateLabel: "Último sábado del mes",
    weekday: "Sábado",
    startTime: "19:30",
    duration: "~3 horas",
    location: "Café a confirmar (centro de Asunción)",
    address: "Se envía por WhatsApp al anotarse. Lugar cambia cada mes para mantener la privacidad.",
    format: "munch",
    description:
      "Munch mensual: reunión social sin play, en un café o bar del centro. Para conocer a la comunidad, hacer preguntas, charlar sobre cualquier cosa. Personas solas bienvenidas. Primera vez que vas a un munch y no sabés qué esperar: leé /aprender/primera-fiesta.",
    body: `## ¿Qué es un munch?

Un munch (del inglés "meeting over lunch", aunque la mayoría son nocturnos) es una reunión social de personas kink en un espacio **vanilla** — un bar, un café, un restaurante. No hay play, no hay dresscode, no hay zonas de juego. Es un espacio para charlar y conocer gente.

## Por qué existe

La mayoría de las personas que recién llegan a la comunidad no quieren (ni deben) ir directamente a un evento de play. Un munch es la puerta de entrada más amable: estás en un bar con gente con tus mismos intereses, sin presión, sin performance.

## Cómo es el nuestro

Nos encontramos el último sábado del mes. El lugar cambia cada vez (cafés, bares, alguno más tranqui). El grupo suele ser de 8-20 personas. La edad promedio es 25-40. Hay gente que viene por primera vez, gente que viene sola, gente que se conoce de años.

**No hay play. No hay dresscode. No hay performance esperada. Es un café con gente afín.**

## Reglas del munch

- Sin play de ningún tipo (es el acuerdo implícito del espacio)
- Sin tomar fotos de las personas del grupo
- "Lo que se dice en el munch, queda en el munch" — confidencialidad
- Si alguien se acerca a vos y no querés conversar, está bien decir "disculpá, estoy esperando a alguien"
- Si ves a alguien que conocés del mundo "vanilla" (trabajo, familia), lo más probable es que también esté explorando su kink por primera vez — la discreción mutua es la norma
- Si una persona te hace sentir incómodo/a, decile al staff o al organizador del munch en privado

## Cómo anotarte

Anotate por WhatsApp (mandanos un mensaje al +595 981 200255). El lugar se confirma el martes anterior al munch. Si no podés venir después de anotarte, avisanos — solemos tener lista de espera.

## Después del munch

Algunos munches terminan temprano (22:00), otros se quedan hasta que el bar cierra. No hay obligación de quedarse. Si te vas antes, un "me voy, un gusto" alcanza.`,
    price: "Gratis (consumisión individual en el bar)",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20al%20próximo%20munch",
    signupNote: "Cupos limitados según capacidad del lugar. Se confirma lugar el martes previo.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=SA;BYSETPOS=-1",
    tags: ["munch", "social", "principiantes", "vanilla", "+18", "gratis"],
  },
  {
    id: "enc-rope-jam",
    kind: "encuentro",
    title: "Rope Jam — Práctica de shibari",
    slug: "rope-jam",
    date: "2026-07-05T15:00:00-04:00",
    endDate: "2026-07-05T19:00:00-04:00",
    dateLabel: "Primer domingo del mes",
    weekday: "Domingo",
    startTime: "15:00",
    duration: "~4 horas",
    location: "Espacio de práctica (cambia cada mes)",
    format: "rope_jam",
    description:
      "Práctica abierta de shibari. Traés tu propia cuerda o pedís prestada. Hay gente con experiencia que puede acompañar a principiantes. Ambiente de aprendizaje, no de performance. Sin presión a participar — podés venir a mirar y charlar.",
    body: `## ¿Qué es un rope jam?

Un rope jam es un espacio de práctica abierta de shibari. A diferencia de un evento, no es un show: la gente viene a practicar entre sí, a aprender, a mejorar su técnica. La atmósfera es de taller, no de escenario.

## ¿Cómo funciona el nuestro?

Cada rope jam tiene:
- Un espacio amplio con suficientes puntos de suspensión para varias parejas
- Cuerdas para prestamos si no tenés (consultar antes)
- Personas con experiencia dispuestas a acompañar a principiantes — pedí sin miedo
- Café, agua, fruta
- Reglas de seguridad básicas en un cartel a la vista

## Si nunca ataste ni te ataron

Bienvenido/a. La primera vez que vengas, te recomendamos:
- Decirle al staff que es tu primera vez — te van a orientar
- Empezar con atados simples en el piso (no suspensión)
- No venir solo/a si te pone nervioso/a — el staff puede asignarte un compañero
- Leer la guía /aprender/shibari-rope antes de venir

## Dresscode

Cómodo para atar / ser atado. Ropa de gym o similar. Sin piezas metálicas que puedan dañar la cuerda o la piel.

## Cupo

Limitado a 16-20 personas (por el espacio físico). Anotate por WhatsApp.`,
    price: "Gs 30.000 (incluye cuerdas para prestamos + merienda)",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20al%20próximo%20rope%20jam",
    signupNote: "Cupos limitados. Anotarse con al menos 48h de anticipación.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=SU;BYSETPOS=1",
    tags: ["shibari", "práctica", "taller", "+18", "principiantes-bienvenidos"],
  },
  {
    id: "enc-workshop",
    kind: "encuentro",
    title: "Workshop de negociación",
    slug: "workshop-negociacion",
    date: "2026-07-11T18:00:00-04:00",
    endDate: "2026-07-11T21:00:00-04:00",
    dateLabel: "Segundo viernes del mes",
    weekday: "Viernes",
    startTime: "18:00",
    duration: "3 horas",
    location: "Espacio a confirmar",
    format: "workshop",
    description:
      "Workshop práctico sobre cómo negociar escenas, límites, palabras de seguridad. Basado en la guía /aprender/negociacion. Cupos limitados. Se repite mensualmente con temas rotativos (este mes: negociación; el mes que viene: aftercare; el siguiente: cómo organizar un munch propio).",
    body: `## Estructura del workshop

- 30 min: charla introductoria sobre el tema del mes
- 60 min: práctica en parejas (rotamos cada 15 min) con escenarios pre-armados
- 30 min: debrief grupal sobre lo que aprendimos
- 60 min: tiempo libre, café, charla

## ¿Para quién es?

- Personas que nunca tuvieron una escena y quieren saber cómo se negocia una
- Personas con experiencia que quieren afinar su estilo de negociación
- Personas en relaciones nuevas (kink o no) que quieren practicar decir "no" en un espacio seguro
- Curiosos en general — no hay requisitos de experiencia previa

## ¿Por qué rotamos parejas?

Porque la negociación cambia según con quién estés. Con alguien que conocés hace años, es distinta que con alguien nuevo. Practicar con varias personas en un workshop te da rango.

## Lo que NO es

No es terapia. No es un espacio para procesar escenas pasadas que te hayan afectado. Para eso, hay un directorio de profesionales kink-aware en /aprender/sub-drop.`,
    price: "Donación sugerida Gs 50.000 (cubre espacio + materiales)",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20al%20workshop%20de%20negociación",
    signupNote: "Cupos limitados a 12 personas. Se confirma lugar 24h antes.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=FR;BYSETPOS=2",
    tags: ["workshop", "educación", "comunicación", "+18", "principiantes-bienvenidos"],
  },
  {
    id: "enc-discussion",
    kind: "encuentro",
    title: "Charla abierta — Sub drop, top drop, aftercare",
    slug: "charla-aftercare",
    date: "2026-07-18T20:00:00-04:00",
    endDate: "2026-07-18T22:00:00-04:00",
    dateLabel: "Tercer sábado del mes (cuando hay)",
    weekday: "Sábado",
    startTime: "20:00",
    duration: "~2 horas",
    location: "Café del centro (rotativo)",
    format: "discussion",
    description:
      "Charla abierta sobre sub drop, top drop, y las prácticas de aftercare. No es una clase: es un espacio para compartir experiencias, hacer preguntas, y aprender de los demás. Sin presentador formal — la comunidad modera.",
    body: `## ¿Qué es una charla abierta?

A diferencia de un workshop, no hay un presentador. La facilitación la hace alguien con experiencia en el tema, pero el conocimiento viene de las experiencias de las personas presentes.

## Reglas de la charla

- **Confidencialidad** — lo que se dice aquí queda aquí
- **Sin nombres** — hablamos en primera persona, no en tercera
- **Trigger warning** — si algo te activa, podés irte en cualquier momento sin explicación
- **No es terapia** — no estamos acá para resolver traumas individuales, sino para aprender juntos
- **Sin play** — el espacio es verbal

## Temas que hemos cubierto

- Sub drop: qué es, cómo se siente, qué hacer
- Top drop: la culpa del que da, cómo procesarla
- Aftercare en comunidades: por qué la comunidad sostiene el aftercare, no solo las parejas
- Cuándo pedir ayuda profesional — directorio kink-aware
- Cómo ayudar a unx amigx en sub drop

## Temas sugeridos (rotación)

Si tenés un tema que te gustaría que se cubra, mandanos un mensaje y lo sumamos a la rotación.`,
    price: "Gratis",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20a%20la%20próxima%20charla%20abierta",
    signupNote: "No requiere anotación formal — presentate el día. Pero avisar por WhatsApp ayuda a calcular espacio.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=SA;BYSETPOS=3",
    tags: ["charla", "discusión", "aftercare", "comunidad", "+18", "gratis"],
  },
  {
    id: "enc-coffee",
    kind: "encuentro",
    title: "Café Dominical — Kinksters & Curious",
    slug: "cafe-domingo",
    date: "2026-07-12T10:00:00-04:00",
    endDate: "2026-07-12T12:00:00-04:00",
    dateLabel: "Cada 2 domingos",
    weekday: "Domingo",
    startTime: "10:00",
    duration: "~2 horas",
    location: "Café del centro",
    format: "social",
    description:
      "Versión matutina del munch. Para gente que no puede ir a las reuniones nocturnas (trabajan en comercio, tienen chicos, etc.). Misma dinámica: café + charla, sin play. Especialmente amigable para padres/madres kinksters y para personas nuevas que quieren ver la dinámica antes del munch nocturno.",
    body: `## ¿Por qué un café matutino?

No todos los horarios funcionan para todos. Los munches nocturnos son difíciles para personas que:
- Trabajan en comercio o tienen horarios rotativos
- Tienen hijos y no tienen con quién dejarlos en la noche
- Son introvertidos y los eventos nocturnos les cargan mucho
- Están en un momento de su vida donde las noches no son una opción

## Misma dinámica que el munch

- Café o merienda, no alcohol
- Sin play
- Sin dresscode
- Confidencialidad
- Cupos limitados

## Diferencia importante

El café es más corto (2 horas vs 3 del munch), arranca más temprano (10:00), y suele tener una energía más calmada. Si tu primera experiencia en un evento de comunidad, este es más amable.`,
    price: "Consumisión individual",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20al%20café%20dominical",
    signupNote: "No requiere anotación formal — vení. Pero avisar por WhatsApp ayuda.",
    status: "upcoming",
    rrule: "BIWEEKLY;BYDAY=SU",
    tags: ["café", "matutino", "social", "principiantes", "+18"],
  },
  {
    id: "enc-demo-night",
    kind: "encuentro",
    title: "Demo Night — Performance + discusión",
    slug: "demo-night",
    date: "2026-08-08T21:00:00-04:00",
    endDate: "2026-08-08T23:30:00-04:00",
    dateLabel: "Eventual (cada 2-3 meses)",
    weekday: "Sábado",
    startTime: "21:00",
    duration: "~2.5 horas",
    location: "Espacio de eventos (rotativo)",
    format: "demo",
    description:
      "Una noche donde unx artistx de la comunidad presenta una performance de shibari, impact play, o role play, seguida de una conversación con el público sobre lo que se vio. La idea es desmitificar el performance, abrir espacio para preguntas, y construir cultura kink informada.",
    body: `## ¿Qué es una demo night?

Unx artistx (o duo) presenta una pieza performativa — shibari, impact play, role play, lo que sea. Después de la performance, se abre una conversación con el público.

## La conversación después

Lo que se busca no es "explicar" lo que se vio (la performance se explica sola), sino:
- ¿Qué te llamó la atención?
- ¿Qué pregunta te quedó?
- ¿Qué técnica te sorprendió?
- ¿Cómo se construye una pieza así?

No es una clase. Es un espacio de conversación horizontal entre el artista y el público.

## ¿Quiénes han presentado?

Por confirmar — la primera demo está en preparación. Si tenés práctica performativa y querés presentar, contactanos.

## Dresscode

Como un evento, no como un munch. Dark, fetish, lo que te represente.`,
    price: "Gs 50.000",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20a%20la%20demo%20night",
    signupNote: "Cupo limitado por el espacio. Anotarse con al menos 1 semana.",
    status: "upcoming",
    tags: ["performance", "demo", "shibari", "+18", "ticketed"],
  },

  // ─── 2026 Q3-Q4 — 1 alté per month + 1 maskarada/sexpo every 4-6mo ──────

  // Encuentros mensuales (1 per month, rotating format)
  {
    id: "enc-2026-09-munch",
    kind: "encuentro",
    title: "Munch de Asunción",
    slug: "2026-09-munch-asuncion",
    date: "2026-09-26T19:30:00-04:00",
    endDate: "2026-09-26T22:30:00-04:00",
    dateLabel: "Último sábado del mes",
    weekday: "Sábado",
    startTime: "19:30",
    duration: "~3 horas",
    location: "Café a confirmar (centro de Asunción)",
    address: "Se envía por WhatsApp al anotarse. Lugar cambia cada mes para mantener la privacidad.",
    format: "munch",
    description:
      "Munch mensual: reunión social sin play, en un café o bar del centro. Para conocer a la comunidad, hacer preguntas, charlar sobre cualquier cosa. Personas solas bienvenidas.",
    price: "Gratis (consumisión individual en el bar)",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20al%20próximo%20munch",
    signupNote: "Cupos limitados según capacidad del lugar. Se confirma lugar el martes previo.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=SA;BYSETPOS=-1",
    tags: ["munch", "social", "principiantes", "vanilla", "+18", "gratis"],
  },
  {
    id: "enc-2026-10-rope-jam",
    kind: "encuentro",
    title: "Rope Jam — Práctica de shibari",
    slug: "2026-10-rope-jam",
    date: "2026-10-04T15:00:00-04:00",
    endDate: "2026-10-04T18:00:00-04:00",
    dateLabel: "Primer domingo del mes",
    weekday: "Domingo",
    startTime: "15:00",
    duration: "~3 horas",
    location: "Espacio de práctica (cambia cada mes)",
    address: "Se envía por WhatsApp al anotarse.",
    format: "rope_jam",
    description:
      "Práctica abierta de shibari. Cuerdas disponibles para prestar, instructores de Moñai Ropes supervisan. Traé tu propia cuerda si tenés.",
    price: "Gs 30.000 (incluye cuerdas para prestar + merienda)",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20al%20rope%20jam",
    signupNote: "Cupos limitados. Anotarse al menos 3 días antes.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=SU;BYSETPOS=1",
    tags: ["shibari", "rope", "intermedio", "+18"],
  },
  {
    id: "enc-2026-11-workshop",
    kind: "encuentro",
    title: "Workshop — Negociación y límites",
    slug: "2026-11-workshop-negociacion",
    date: "2026-11-13T18:00:00-04:00",
    endDate: "2026-11-13T21:00:00-04:00",
    dateLabel: "Segundo viernes del mes",
    weekday: "Viernes",
    startTime: "18:00",
    duration: "~3 horas",
    location: "Espacio a confirmar",
    address: "Se envía por WhatsApp al anotarse.",
    format: "workshop",
    description:
      "Taller práctico sobre cómo negociar escenas, pactar límites, usar palabras de seguridad. Incluye role-play y práctica en parejas/tríos con consentimiento explícito. Para todos los niveles, no requiere experiencia previa.",
    price: "Donación sugerida Gs 50.000 (cubre espacio + materiales)",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20al%20workshop",
    signupNote: "Cupo limitado. Inscripción por orden de llegada.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=FR;BYSETPOS=2",
    tags: ["workshop", "principiantes", "comunicación", "+18"],
  },

  // ─── Máscaras/ediciones grandes (cada 4-6 meses) ─────────────────────

  {
    id: "evt-2026-09-maskarada",
    kind: "evento",
    title: "maškaráda — edición septiembre",
    slug: "2026-09-19-maskarada",
    date: "2026-09-19T21:00:00-04:00",
    endDate: "2026-09-20T04:00:00-04:00",
    dateLabel: "Sábado 19 de septiembre, 2026",
    weekday: "Sábado",
    startTime: "21:00",
    duration: "Hasta 04:00",
    location: "Asunción, Paraguay",
    address: "A confirmar al público. Se envía a quienes se anotaron por WhatsApp.",
    description:
      "La edición de septiembre. Tema, dresscode, preventa y line-up a confirmar. Anotate por WhatsApp o el formulario de /contacto para recibir el anuncio.",
    price: "A confirmar",
    dresscode: "A confirmar",
    status: "upcoming",
    tags: ["edición", "ticketed", "+18"],
  },
  {
    id: "evt-2027-02-maskarada",
    kind: "evento",
    title: "maškaráda — edición carnaval",
    slug: "2027-02-13-maskarada",
    date: "2027-02-13T21:00:00-04:00",
    endDate: "2027-02-14T04:00:00-04:00",
    dateLabel: "Sábado 13 de febrero, 2027",
    weekday: "Sábado",
    startTime: "21:00",
    duration: "Hasta 04:00",
    location: "Asunción, Paraguay",
    address: "A confirmar al público.",
    description:
      "Edición de carnaval. Temática, dresscode, preventa y line-up a confirmar. La edición más festiva del año.",
    price: "A confirmar",
    dresscode: "A confirmar",
    status: "upcoming",
    tags: ["edición", "carnaval", "ticketed", "+18"],
  },
  {
    id: "evt-2027-07-maskarada",
    kind: "evento",
    title: "maškaráda — edición aniversario",
    slug: "2027-07-10-maskarada",
    date: "2027-07-10T21:00:00-04:00",
    endDate: "2027-07-11T04:00:00-04:00",
    dateLabel: "Sábado 10 de julio, 2027",
    weekday: "Sábado",
    startTime: "21:00",
    duration: "Hasta 04:00",
    location: "Asunción, Paraguay",
    address: "A confirmar al público.",
    description:
      "Segunda edición aniversario. La noche que celebra otro año de comunidad.",
    price: "A confirmar",
    dresscode: "A confirmar",
    status: "upcoming",
    tags: ["edición", "aniversario", "ticketed", "+18"],
  },

  // ─── Encuentros que faltan para llegar a 1/mes en 2026 ────────────────

  {
    id: "enc-2026-12-charla",
    kind: "encuentro",
    title: "Charla abierta — Aftercare y drop",
    slug: "2026-12-charla-aftercare",
    date: "2026-12-19T20:00:00-04:00",
    endDate: "2026-12-19T22:00:00-04:00",
    dateLabel: "Tercer sábado del mes",
    weekday: "Sábado",
    startTime: "20:00",
    duration: "~2 horas",
    location: "Café del centro (rotativo)",
    address: "Se envía por WhatsApp al anotarse.",
    format: "discussion",
    description:
      "Charla abierta sobre sub drop, top drop, y cómo cuidar(se) después de una escena. Espacio seguro para compartir experiencias, hacer preguntas, y aprender. Sin play.",
    price: "Gratis",
    signupUrl: "https://wa.me/595981200255?text=Hola!%20Quiero%20anotarme%20a%20la%20charla",
    signupNote: "Cupo limitado. Confirmar asistencia por WhatsApp.",
    status: "upcoming",
    rrule: "MONTHLY;BYDAY=SA;BYSETPOS=3",
    tags: ["charla", "aftercare", "principiantes", "intermedio", "+18", "gratis"],
  },
];

export function getEventBySlug(slug: string): CommunityEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventsByKind(kind: EventKind): CommunityEvent[] {
  return events
    .filter((e) => e.kind === kind)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getUpcoming(): CommunityEvent[] {
  const now = new Date().toISOString();
  return events
    .filter((e) => e.status === "upcoming" && e.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getEncuentrosByFormat(): Record<EncuentroFormat, CommunityEvent[]> {
  const out: Record<string, CommunityEvent[]> = {};
  for (const e of events.filter((x) => x.kind === "encuentro")) {
    const f = e.format || "social";
    (out[f] = out[f] || []).push(e);
  }
  return out as Record<EncuentroFormat, CommunityEvent[]>;
}

export const FORMAT_LABEL: Record<EncuentroFormat, string> = {
  munch: "Munch (reunión social)",
  rope_jam: "Rope jam (práctica de shibari)",
  workshop: "Workshop",
  discussion: "Charla abierta",
  social: "Social / café",
  demo: "Demo night (performance)",
};

export const FORMAT_EMOJI: Record<EncuentroFormat, string> = {
  munch: "☕",
  rope_jam: "🪢",
  workshop: "📚",
  discussion: "💬",
  social: "🍷",
  demo: "🎭",
};

export const FORMAT_COLOR: Record<EncuentroFormat, string> = {
  munch: "border-gold-400/30 text-gold-400",
  rope_jam: "border-gold-400/30 text-gold-400",
  workshop: "border-blood-500/30 text-blood-500",
  discussion: "border-purple-mid/30 text-purple-300",
  social: "border-green-500/30 text-green-400",
  demo: "border-blood-500/30 text-blood-500",
};
