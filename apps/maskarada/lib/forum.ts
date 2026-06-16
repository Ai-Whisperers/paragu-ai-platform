// Forum — structured discussion categories. Mature kink communities
// (FetLife, r/BDSMcommunity, Kink.com forums) use threaded forums
// for ongoing conversation. For maškaráda, we start with seeded
// discussion topics — a read-only forum for now, designed to be
// ready for a future auth/thread system.
//
// Each category has: a description, an icon, a list of pinned
// discussion threads (which are markdown content), and tags. Threads
// are seeded from common questions the community gets, so newcomers
// can browse answers without needing to post.
//
// The category structure mirrors the pattern from FetLife groups:
//   - General / Community
//   - For newcomers (curiosos y principiantes)
//   - Encuentros (munches, workshops, comunidad)
//   - Each actividad (shibari, impact, etc.) — discussed separately

export interface ForumThread {
  slug: string;
  title: string;
  author: string;          // display name (or "Equipo maškaráda" for staff)
  authorRole?: "staff" | "community" | "external";
  postedAgo: string;       // "hace 3 días", "hace 2 semanas", etc.
  category: ForumCategorySlug;
  tags: string[];
  body: string;            // markdown
  replies: number;          // for the rendered thread count
  views: number;
  pinned?: boolean;
  featured?: boolean;
}

export interface ForumCategory {
  slug: ForumCategorySlug;
  title: string;
  emoji: string;
  description: string;
  longDescription: string; // shown in category page
  tags: string[];
  threadCount: number;
  postingPolicy: "open" | "members-only" | "curated";
}

export type ForumCategorySlug =
  | "general"
  | "nuevos"
  | "encuentros"
  | "shibari"
  | "impact-play"
  | "role-play"
  | "psychological"
  | "service"
  | "seguridad"
  | "comunidad";

export const forumCategories: ForumCategory[] = [
  {
    slug: "general",
    title: "General",
    emoji: "💬",
    description: "Conversación amplia de la comunidad. Sin tema específico.",
    longDescription:
      "Espacio para cualquier conversación de la comunidad que no encaje en otra categoría. Charlas generales, preguntas, propuestas. Los temas más activos suelen ser sobre eventos próximos, cambios de dresscode, recomendaciones de películas/libros/podcasts, y consultas que no son específicas de una práctica.",
    tags: ["general", "comunidad"],
    threadCount: 4,
    postingPolicy: "open",
  },
  {
    slug: "nuevos",
    title: "Para curiosos y principiantes",
    emoji: "🌱",
    description: "Tu primera vez aquí. Leé antes de preguntar.",
    longDescription:
      "Categoría especial para personas que recién se acercan al kink o a la comunidad. Antes de preguntar algo, te recomendamos leer la sección /aprender (6 guías cubren los temas más comunes) y el /faq. Si después de leer querés preguntar algo específico que no encontraste, este es el lugar. La comunidad responde con respeto — no hay preguntas tontas.",
    tags: ["principiantes", "FAQ", "orientación"],
    threadCount: 5,
    postingPolicy: "open",
  },
  {
    slug: "encuentros",
    title: "Encuentros y eventos",
    emoji: "☕",
    description: "Munches, rope jams, workshops, y la próxima edición.",
    longDescription:
      "Discusiones sobre los encuentros regulares (munch, rope jam, workshop, café) y las ediciones formales. Proponer temas para workshops, organizar transporte compartido al próximo evento, coordinar después del encuentro, fotos y recap de cada sesión. Esta es la categoría más activa entre eventos.",
    tags: ["munch", "rope-jam", "workshop", "evento", "recap"],
    threadCount: 4,
    postingPolicy: "open",
  },
  {
    slug: "seguridad",
    title: "Seguridad y consenso",
    emoji: "🛡️",
    description: "RACK, SSC, palabras de seguridad, aftercare. La base.",
    longDescription:
      "Discusión sobre los marcos de seguridad (RACK, SSC, PRICK), las palabras de seguridad, el aftercare, y cómo reportar una situación que no se sintió bien. Esta categoría es moderada por el equipo — no se tolera consejo que normalice prácticas riesgosas sin contexto, ni la promoción de no-consentimiento.",
    tags: ["RACK", "SSC", "consenso", "aftercare", "seguridad"],
    threadCount: 3,
    postingPolicy: "curated",
  },
  {
    slug: "shibari",
    title: "Shibari & rope",
    emoji: "🪢",
    description: "Atado, nudos, suspensión, anatomía.",
    longDescription:
      "Para preguntas específicas de shibari: técnicas, equipo, anatomía, suspension. La comunidad de shibari de maškaráda es activa — preguntas técnicas suelen tener respuesta en pocas horas. Si nunca ataste, leé primero /actividades/shibari-rope y /aprender (guía sobre safewords).",
    tags: ["shibari", "rope", "nudos", "suspension"],
    threadCount: 3,
    postingPolicy: "open",
  },
  {
    slug: "impact-play",
    title: "Impact play",
    emoji: "🪵",
    description: "Palas, fustas, varillas, técnicas de golpe.",
    longDescription:
      "Discusión sobre impact play: herramientas, técnicas, zonas seguras, intensidad progresiva. Antes de preguntar, leé /actividades/impact-play. Si tenés una herida reciente o condición médica, mencionalo en tu primera pregunta — la comunidad te ayuda a adaptar la práctica a tu cuerpo.",
    tags: ["impact", "palas", "fustas", "técnicas"],
    threadCount: 2,
    postingPolicy: "open",
  },
  {
    slug: "role-play",
    title: "Role play & escenas",
    emoji: "🎭",
    description: "Construcción de escenas, personajes, ficción consensuada.",
    longDescription:
      "Para conversar sobre role play: cómo construir un personaje, cómo negociar el escenario, qué hacer cuando una escena no funciona, ideas para principiantes. Si te interesa role play, leé /actividades/role-play-scene antes de preguntar.",
    tags: ["role-play", "escenas", "ficción"],
    threadCount: 2,
    postingPolicy: "open",
  },
  {
    slug: "psychological",
    title: "Psychological play",
    emoji: "🧠",
    description: "Juego mental, humillación consensuada, control verbal.",
    longDescription:
      "Esta categoría es para personas con experiencia previa. Psychological play involucra riesgos emocionales reales y requiere autoconocimiento. Leé /actividades/psychological-play antes de preguntar. La comunidad mantiene un estándar alto de cuidado en estas conversaciones.",
    tags: ["psychological", "humillación", "control"],
    threadCount: 2,
    postingPolicy: "curated",
  },
  {
    slug: "service",
    title: "Service & protocolo",
    emoji: "🍷",
    description: "Servicio ritual, protocolo, atención.",
    longDescription:
      "Service play como práctica sostenida (no solo una escena). Conversación sobre rituales, protocolos, cómo mantener prácticas a largo plazo sin quemarse. Leé /actividades/service-play primero.",
    tags: ["service", "protocolo", "ritual"],
    threadCount: 2,
    postingPolicy: "open",
  },
  {
    slug: "comunidad",
    title: "Comunidad LATAM",
    emoji: "🌎",
    description: "Otras comunidades, aliados, contexto regional.",
    longDescription:
      "Para conversar sobre la comunidad kink en Paraguay y la región. Otras comunidades, eventos aliados, recursos en español, diferencias culturales. Si conocés una comunidad o evento que debería estar en la red de aliados de maškaráda, este es el lugar.",
    tags: ["LATAM", "paraguay", "regional", "aliados"],
    threadCount: 2,
    postingPolicy: "open",
  },
];

export const forumThreads: ForumThread[] = [
  // ── Nuevos (curiosos y principiantes) ───────────────────────────
  {
    slug: "nunca-fui-a-un-munch",
    title: "Nunca fui a un munch. ¿Qué me pongo?",
    author: "Lucía",
    postedAgo: "hace 2 días",
    category: "nuevos",
    tags: ["munch", "primera-vez", "vestimenta"],
    body: `Escribo porque voy a ir a mi primer munch la semana que viene y no sé qué ponerme. Pensé que era 'come as you are' pero la página dice 'no ropa casual' y estoy re perdida. ¿Jeans y remera oscura cuenta como casual? ¿Hay dresscode real? ¿Y qué hago cuando llegue, me siento sola en una mesa?`,
    replies: 12,
    views: 89,
    pinned: true,
  },
  {
    slug: "que-son-rol-y-switch",
    title: "Me cuesta entender la diferencia entre 'rol' y 'switch'",
    author: "Carlos",
    postedAgo: "hace 5 días",
    category: "nuevos",
    tags: ["roles", "switch", "orientación"],
    body: `Leí la sección de /aprender pero me queda la duda: si soy switch, ¿eso significa que en una escena tengo que estar cambiando todo el tiempo, o que con distintas personas puedo tomar un rol distinto? ¿Hay gente que es switch en general y otros que son switch solo en contextos específicos?`,
    replies: 8,
    views: 67,
  },
  {
    slug: "primer-evento-vs-munch",
    title: "¿Voy a un evento grande o a un munch primero?",
    author: "Mariana",
    postedAgo: "hace 1 semana",
    category: "nuevos",
    tags: ["primer-vez", "evento", "munch", "recomendación"],
    body: `Conocí a alguien de la comunidad en una juntada de amigos y me contó de maškaráda. Tengo curiosidad pero también respeto. ¿Es mejor ir a un evento grande (la próxima edición) o a un munch primero? Siento que el munch puede ser más amable pero no sé si me voy a perder algo si espero al evento.`,
    replies: 15,
    views: 142,
    featured: true,
  },
  {
    slug: "como-hablar-con-pareja",
    title: "Cómo le hablo a mi pareja del kink sin que se asuste",
    author: "Andrés",
    postedAgo: "hace 1 semana",
    category: "nuevos",
    tags: ["comunicación", "pareja", "salir-del-closet-kink"],
    body: `Estoy saliendo hace un año con alguien que quiero mucho, y siento que necesito contarle que el kink me interesa. No sé cómo. Tengo miedo de que se asuste o piense que es una crítica a nuestra vida sexual. ¿Alguien tiene experiencia en contarle a una pareja nueva?`,
    replies: 21,
    views: 203,
  },
  {
    slug: "que-necesito-llevar",
    title: "Lista de lo que necesito llevar a mi primer evento",
    author: "Sofía",
    postedAgo: "hace 2 semanas",
    category: "nuevos",
    tags: ["evento", "checklist", "primera-vez"],
    body: `Voy a la próxima edición y quiero estar preparada. Más allá del dresscode, ¿qué llevo? Identificación, efectivo, ¿ropa de recambio? ¿Hay lockers o dejo las cosas en el baño? ¿Y si voy sola, hay zona de social para llegar, conocer gente, y decidir después si entro a las zonas de juego?`,
    replies: 18,
    views: 178,
  },

  // ── Encuentros ───────────────────────────────────────────────────
  {
    slug: "tema-proximo-workshop",
    title: "Tema para el próximo workshop: ¿qué les gustaría?",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 3 días",
    category: "encuentros",
    tags: ["workshop", "tema", "propuesta"],
    body: `Estamos planeando el workshop del mes que viene. Los temas que hemos cubierto: negociación, aftercare, juego psicológico básico. ¿Qué les interesaría para el próximo? Algunas ideas: cómo organizar un munch propio, cómo escribir escenas, cómo hacer safety check-ins verbales, cómo presentar el kink a parejas no-kink, técnicas de bondage específicas. Pero estamos abiertos a lo que la comunidad pida.`,
    replies: 23,
    views: 156,
    pinned: true,
  },
  {
    slug: "recap-munch-junio",
    title: "Recap del último munch — qué funcionó, qué no",
    author: "Diego",
    postedAgo: "hace 4 días",
    category: "encuentros",
    tags: ["munch", "recap"],
    body: `Fui al munch del sábado. Buen grupo (16 personas), ambiente tranqui, dos personas nuevas que se sintieron cómodas. Lo único: la música del lugar estaba muy alta, a veces costaba escucharse. ¿Alguien más tuvo esa sensación? Para el próximo ¿podemos pedirle al bar que baje el volumen?`,
    replies: 9,
    views: 78,
  },
  {
    slug: "transporte-compartido-proximo-evento",
    title: "¿Compartimos remís al próximo evento?",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 1 semana",
    category: "encuentros",
    tags: ["transporte", "logística", "compartir"],
    body: `Para las personas que vienen del centro o de barrios lejanos y quieren evitar el tema del regreso (especialmente en horarios raros), ¿alguien quisiera coordinar remís compartido? Si hay 3-4 personas podemos dividir el costo y es más seguro. Respondan por acá o por WhatsApp.`,
    replies: 11,
    views: 67,
  },
  {
    slug: "primer-rope-jam",
    title: "Mi primer rope jam — qué llevar y qué esperar",
    author: "Lucía",
    postedAgo: "hace 2 semanas",
    category: "encuentros",
    tags: ["rope-jam", "primera-vez", "shibari"],
    body: `Voy a ir a mi primer rope jam. Tengo mi propia cuerda (jute 8mm, 8m). ¿Algo más que debería llevar? ¿Hay colchonetas? ¿Y si no tengo a nadie con quien atar, puedo ir a observar?`,
    replies: 14,
    views: 95,
  },

  // ── Seguridad ────────────────────────────────────────────────────
  {
    slug: "como-reportar",
    title: "Cómo reportar una situación que no se sintió bien",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 1 semana",
    category: "seguridad",
    tags: ["reportar", "código-conducta", "staff"],
    body: `Si en un evento o encuentro alguien te hizo sentir incómodo/a, o cruzó un límite que habías negociado, podés reportarlo. Tres formas: (1) en persona al staff del evento, (2) por DM a la cuenta de maškaráda en Instagram, (3) por email a privacidad@clubmaskarada.com. El reporte es confidencial. No necesitás pruebas. No tenés que volver a un evento donde alguien te hizo sentir mal. La decisión de qué hacer con la persona reportada la toma el equipo, no vos.`,
    replies: 4,
    views: 112,
    pinned: true,
  },
  {
    slug: "sub-drop-pedir-ayuda",
    title: "Sub drop fuerte después de una escena. ¿Cómo pedir ayuda?",
    author: "Daniela",
    postedAgo: "hace 3 días",
    category: "seguridad",
    tags: ["sub-drop", "aftercare", "pedir-ayuda"],
    body: `Ayer tuve una escena intensa (larga, con varios cambios de intensidad). Esta mañana estoy en sub drop fuerte — llanto, cansancio, sensación de vacío. Sé que es hormonal pero igual cuesta. ¿Cómo le pido ayuda a mi comunidad sin sentir que estoy exagerando?`,
    replies: 17,
    views: 134,
  },
  {
    slug: "palabra-seguridad-no-respetada",
    title: "Alguien no respetó mi palabra de seguridad. ¿Qué hago?",
    author: "Anónimo",
    postedAgo: "hace 2 semanas",
    category: "seguridad",
    tags: ["palabra-de-seguridad", "violación", "reporte"],
    body: `[Post moderado por el equipo. Si esto te pasa, no es tu culpa. Reportá al staff o por privado. El equipo lo toma en serio.]`,
    replies: 0,
    views: 45,
    pinned: true,
  },

  // ── Shibari ──────────────────────────────────────────────────────
  {
    slug: "cuerda-jute-vs-cotton",
    title: "Cuerda de jute vs cotton para empezar — pros y contras",
    author: "Moñai Ropes",
    authorRole: "staff",
    postedAgo: "hace 5 días",
    category: "shibari",
    tags: ["equipo", "cuerda", "principiantes"],
    body: `Las dos cuerdas más comunes para empezar son jute y cotton. Jute tiene más grip, es la clásica, pero requiere más cuidado (se encoge con el agua, hay que aceitar). Cotton es más predecible, no encoge, pero es más resbaladiza. Para tu primer set, sugerimos: una cotton 8mm de 8m, fácil de mantener, suficiente para atar a una persona en el piso sin riesgo. Jute cuando ya tengas claro el mantenimiento.`,
    replies: 22,
    views: 187,
  },
  {
    slug: "tijeras-de-seguridad",
    title: "Tijeras de seguridad — dónde, qué tipo, por qué",
    author: "Moñai Ropes",
    authorRole: "staff",
    postedAgo: "hace 1 semana",
    category: "shibari",
    tags: ["seguridad", "tijeras", "equipo"],
    body: `Las tijeras de seguridad son innegociables en cualquier sesión de shibari. Tipo: tijeras de trauma (con punta roma, no quirúrgicas). Ubicación: dentro del alcance de la persona que está siendo atada, en menos de 2 segundos. NO en el bolsillo del atador. Si la persona atada tiene compromiso nervioso o circulatorio, esas tijeras son la diferencia entre un susto y un daño permanente. ¿Preguntas específicas sobre tijeras? Respondemos.`,
    replies: 16,
    views: 145,
  },
  {
    slug: "suspension-para-principiantes",
    title: "¿Suspension? Todavía no. Floor work primero.",
    author: "Camila (instructora)",
    authorRole: "external",
    postedAgo: "hace 2 semanas",
    category: "shibari",
    tags: ["suspension", "principiantes", "advertencia"],
    body: `He visto a gente intentar suspension en su segundo mes de práctica. Suspension es técnicamente demandante, médicamente riesgosa, y emocionalmente intensa. No es algo para 'cuando te sentís listo/a', es algo para 'después de tomar un taller específico con alguien certificado y con práctica supervisada'. Si querés probar, empezá con floor work. La suspensión es el final del camino, no el principio.`,
    replies: 19,
    views: 198,
    featured: true,
  },

  // ── Impact play ──────────────────────────────────────────────────
  {
    slug: "pala-vs-mano",
    title: "Pala vs mano — cuándo una, cuándo otra",
    author: "Roberto",
    postedAgo: "hace 1 semana",
    category: "impact-play",
    tags: ["herramientas", "técnica"],
    body: `Recién empiezo. Mi partner me dio con la mano y estuvo bien, pero la próxima vez va a probar con una pala. ¿Qué cambia cuando pasás de mano a herramienta? ¿Es más intenso? ¿Hay que aprender técnica nueva?`,
    replies: 11,
    views: 78,
  },
  {
    slug: "marcas-y-trabajo",
    title: "¿Cómo manejar las marcas cuando tenés trabajo al día siguiente?",
    author: "Florencia",
    postedAgo: "hace 2 semanas",
    category: "impact-play",
    tags: ["marcas", "trabajo", "vestimenta"],
    body: `Tengo un trabajo de oficina donde voy en remera. Las marcas en los muslos se ven si uso short, y las de las nalgadas se ven con pollera corta. ¿Cómo manejan esto otras personas? ¿Hay zonas más seguras? ¿Ropa interior que tape?`,
    replies: 14,
    views: 92,
  },

  // ── Role play ────────────────────────────────────────────────────
  {
    slug: "personaje-rechazado",
    title: "Mi pareja no entra en el personaje que quiero — ¿qué hago?",
    author: "Mariana",
    postedAgo: "hace 4 días",
    category: "role-play",
    tags: ["escena", "compatibilidad", "límites"],
    body: `Quisimos hacer un role play específico (jefe/empleado) y mi pareja se sintió incómoda. Lo hablamos después y dice que no le interesa ese tipo de dinámica porque le recuerda situaciones reales de poder que vivió. Respeto eso. ¿Hay forma de explorar role play con escenarios que no activen ese tipo de memoria?`,
    replies: 13,
    views: 96,
  },
  {
    slug: "escena-no-funciono",
    title: "La escena no funcionó. ¿Cómo lo procesamos?",
    author: "Pablo",
    postedAgo: "hace 1 semana",
    category: "role-play",
    tags: ["escena", "procesar", "comunicación"],
    body: `Hicimos una escena de role play que planificamos juntos. En la cabeza era increíble. En la práctica, ninguno de los dos entró en personaje, nos sentimos raros, lo cortamos a los 15 min. La noche siguiente hablamos y los dos estamos de acuerdo en que no queremos repetir esa escena. Pero nos quedó una sensación rara, como de haber fallado. ¿Es normal? ¿Cómo lo procesan ustedes?`,
    replies: 16,
    views: 121,
  },

  // ── Psychological ────────────────────────────────────────────────
  {
    slug: "marco-para-degradacion",
    title: "Cómo construir un marco seguro para humillación consensuada",
    author: "Sebastián",
    postedAgo: "hace 1 semana",
    category: "psychological",
    tags: ["humillación", "límites", "marco"],
    body: `Me interesa explorar humillación consensuada con mi pareja, pero no sé cómo armar el marco. ¿Qué hard limits se ponen usualmente? ¿Cómo se hace safe word si la humillación verbal es exactamente de lo que se trata? ¿Hay convenciones de la comunidad sobre esto?`,
    replies: 14,
    views: 108,
    featured: true,
  },
  {
    slug: "como-revisar-consentimiento",
    title: "Cómo hacer un check-in de consentimiento a mitad de escena",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 2 semanas",
    category: "psychological",
    tags: ["consentimiento", "check-in", "técnica"],
    body: `El check-in de mitad de escena no es solo decir '¿estás bien?'. Tiene que estar integrado al ritmo de la escena sin romper la atmósfera. Tres técnicas que usamos en la comunidad: (1) tiempo: pedir un número ('¿qué hora es?') — la persona responde coherente si está bien, incoherente si no; (2) escala: pedir que muestre un número con los dedos del 1 al 5; (3) palabra cifrada: elegir una palabra al inicio de la escena que indique 'sigo aquí, todo bien' — no es la palabra de seguridad, es la de 'confirmación'.`,
    replies: 9,
    views: 86,
  },

  // ── Service ─────────────────────────────────────────────────────
  {
    slug: "service-no-es-cuestion-de-poder",
    title: "Service play no es cuestión de poder, es cuestión de atención",
    author: "Ricardo",
    postedAgo: "hace 1 semana",
    category: "service",
    tags: ["service", "atención", "ritual"],
    body: `Algo que he aprendido haciendo service play con mi pareja por años: el service play no escala en intensidad por la dominancia, escala por la atención. Los mejores servicios que he hecho no fueron los más 'extremos' (arrodillarse, hacer un ritual complejo), fueron los más atentos: notar que mi partner tenía sed y traerle agua antes que lo pida. Esa es la práctica.`,
    replies: 18,
    views: 145,
  },
  {
    slug: "burnout-en-service-play",
    title: "Burnout en service play sostenido — cómo evitarlo",
    author: "Carla",
    postedAgo: "hace 2 semanas",
    category: "service",
    tags: ["burnout", "sostenibilidad", "auto-cuidado"],
    body: `Mi pareja y yo llevamos tres meses con un protocolo de service play diario. Lo amo, pero noto que estoy empezando a cansarme — no del service en sí, sino de la consistencia. ¿Cómo manejan esto otras personas? ¿Hay forma de mantener el protocolo sin quemarme?`,
    replies: 12,
    views: 98,
  },

  // ── Comunidad LATAM ────────────────────────────────────────────
  {
    slug: "comunidades-aliadas",
    title: "Mapa de comunidades aliadas en Paraguay y la región",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 1 semana",
    category: "comunidad",
    tags: ["aliados", "regional", "red"],
    body: `Estamos armando un mapa de comunidades kink, leather, queer, y aliadas en Paraguay y la región. Si conocés una comunidad o evento que debería estar en la red, decinos por acá. La idea no es competir sino conectar — si alguien en Buenos Aires busca una comunidad y maškaráda no le queda, podemos referirlo a otra en la región, y viceversa.`,
    replies: 8,
    views: 67,
    pinned: true,
  },
  {
    slug: "paraguay-kink-vs-otros-paises",
    title: "¿Cómo es la escena kink en Paraguay vs. otros países?",
    author: "Sebastián",
    postedAgo: "hace 2 semanas",
    category: "comunidad",
    tags: ["regional", "cultura", "comparación"],
    body: `He viajado a eventos en Buenos Aires y São Paulo y la escena se siente distinta. Más grande, más visible, con más infraestructura. Acá en Paraguay siento que es más chica, más cuidada, más de personas que se conocen. ¿Cómo lo ven ustedes? ¿Es una diferencia de escala o también de cultura?`,
    replies: 19,
    views: 142,
  },

  // ── General ─────────────────────────────────────────────────────
  {
    slug: "que-peliculas-recomiendan",
    title: "¿Qué películas/documentales recomiendan para entender el kink?",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 4 días",
    category: "general",
    tags: ["cine", "documentales", "recomendaciones"],
    body: `Acabamos de armar la sección de Cine en /aprender/cine. Tiene 12 películas y cortos curados, con descripción, advertencias de contenido, y por qué las recomendamos. Si tienen otras sugerencias, sumenlas acá. La idea es que esta lista crezca con el tiempo, validada por la comunidad.`,
    replies: 14,
    views: 98,
  },
  {
    slug: "que-podcasts-recomiendan",
    title: "Podcast de la comunidad: para el viaje, para la semana",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 5 días",
    category: "general",
    tags: ["podcast", "música", "recomendaciones"],
    body: `Igual que con el cine, abrimos hilo de recomendaciones. ¿Qué podcasts escuchan? ¿Qué música funciona para el viaje al evento, o para ambientar una escena, o para el chill-out post-encuentro? La lista curada está en /aprender/podcasts y /aprender/musica. Sumen lo que crean que falta.`,
    replies: 11,
    views: 87,
  },
  {
    slug: "evento-que-cambio-mi-vida",
    title: "¿Un evento que les haya cambiado la vida?",
    author: "Florencia",
    postedAgo: "hace 1 semana",
    category: "general",
    tags: ["evento", "memorable", "compartir"],
    body: `Pregunta abierta: ¿fueron a algún evento (de maškaráda, de otra comunidad, donde sea) que les haya cambiado algo? No en el sentido dramático, sino en el sentido de 'entendí algo que no había entendido'. Comparto el mío: el primer munch al que fui. No esperaba nada. Terminé entendiendo que el kink era una práctica, no un cliché.`,
    replies: 27,
    views: 234,
    featured: true,
  },
  {
    slug: "como-funciona-el-calendario",
    title: "¿Cómo me suscribo al calendario?",
    author: "Equipo maškaráda",
    authorRole: "staff",
    postedAgo: "hace 2 días",
    category: "general",
    tags: ["calendario", "iCal", "suscripción"],
    body: `El calendario de maškaráda es subscribible. Si usás Apple Calendar: abrí esta URL con Safari (no Chrome): webcal://maskarada.paragu-ai.com/api/calendar.ics. Google Calendar: agregala como URL en 'Other calendars' → 'From URL'. Cualquier cliente CalDAV: la URL funciona. Incluye eventos formales y los próximos 6 instances de cada encuentro.`,
    replies: 6,
    views: 54,
  },
];

export function getCategory(slug: ForumCategorySlug): ForumCategory | undefined {
  return forumCategories.find((c) => c.slug === slug);
}

export function getThread(slug: string): ForumThread | undefined {
  return forumThreads.find((t) => t.slug === slug);
}

export function threadsByCategory(slug: ForumCategorySlug): ForumThread[] {
  return forumThreads.filter((t) => t.category === slug);
}

export function featuredThreads(): ForumThread[] {
  return forumThreads.filter((t) => t.featured || t.pinned).slice(0, 6);
}
