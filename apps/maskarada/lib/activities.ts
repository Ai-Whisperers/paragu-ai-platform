// Activity catalog — research-grounded descriptions for the kink community site.
// Sources: SSC/RACK/PRICK community frameworks, "The New Topping Book" (Brame),
// "SM 101" (Wiseman), "Playing Well With Others" (Easton & Hardy),
// National Coalition for Sexual Freedom (NCSF) safer-sex guidelines.
//
// These are COMMUNITY-RESEARCHED descriptions, not professional advice.
// Each activity page surfaces safety + consent + aftercare fundamentals
// and links to the community team for personal guidance.

export interface Activity {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  beginnerFriendly: boolean;
  physicalRisk: "low" | "medium" | "high";
  consentComplexity: "low" | "medium" | "high";
  duration: string;          // typical session length
  equipment: string[];        // required/recommended
  safetyNotes: string[];      // bullet points for the page
  beginnerTips: string[];     // bullet points for the page
  relatedActivities: string[]; // slugs
  heroImage?: string;
}

export const activities: Activity[] = [
  {
    slug: "shibari-rope",
    name: "Shibari · Rope Bondage",
    emoji: "🪢",
    tagline: "Cuerdas como lenguaje",
    shortDesc: "Atado estético, sensual y consciente. Origen en el kinbaku japonés, hoy practicado en todo el mundo como arte de la conexión.",
    longDesc:
      "Shibari (縛り, 'atar') describe el atado con cuerdas como práctica estética, sensual y a veces erótica. Aunque la palabra es japonesa, el kinbaku y el shibari contemporáneo se enseñan y se practican globalmente como formas de arte corporal consensuado. La práctica se centra en la comunicación, la atención al cuerpo del otro, y la construcción de un diálogo físico progresivo. En la comunidad maškaráda, el shibari se enseña como una de las puertas de entrada al kink: la cuerda crea un ritmo, una estructura, y un foco compartido que muchas personas encuentran meditativo.",
    beginnerFriendly: true,
    physicalRisk: "medium",
    consentComplexity: "low",
    duration: "30–120 minutos por sesión (principiantes suelen empezar con 20-30 min)",
    equipment: [
      "Cuerda de cáñamo o yute, 6-8 mm de diámetro, 5-8 m de largo (principiantes)",
      "Tijeras de seguridad siempre al alcance — para corte rápido si hay compromiso nervioso o circulatorio",
      "Superficie acolchada o esterilla en el suelo",
      "Ambiente cálido (la práctica requiere que el cuerpo esté relajado)"
    ],
    safetyNotes: [
      "Compresión nerviosa: revisar dedos y zonas distales cada 5-10 minutos. Color normal, movilidad, sensibilidad —这些都是 signos de circulación sana.",
      "Nunca atar el cuello salvo con técnicas avanzadas de suspensión y siempre con persona capacitada presente.",
      "Posición vertical sola (suspensión parcial) requiere experiencia. Empezá siempre con atados en el suelo (floor work).",
      "Hidratar antes, durante y después. Algunas personas experimentan hipotensión o mareo — un vaso de agua y conversación post-escena ayudan.",
      "Cualquier sensación de hormigueo, pérdida de sensibilidad o dolor agudo = PARAR inmediatamente. El cuerpo habla antes que la mente."
    ],
    beginnerTips: [
      "Empezá con atados simples (muñecas, antebrazos, pecho) antes de pasar a patrones complejos.",
      "La comunicación verbal no se apaga durante la práctica. Cada nuevo nivel requiere un check-in explícito.",
      "Estudiá la anatomía básica: nervios, tendones, arterias principales. Tu conocimiento protege a tu pareja.",
      "Aprendé de una persona con experiencia real, no solo de videos. El shibari se enseña en persona.",
      "La práctica se perfecciona con repetición. No te apures a hacer 'el patrón del libro' — primero el ritmo y la atención."
    ],
    relatedActivities: ["sensorial-deprivation", "suspension", "impact-play"]
  },
  {
    slug: "impact-play",
    name: "Impact Play",
    emoji: "🪵",
    tagline: "Ritmo, sensación y control",
    shortDesc: "Golpes controlados con manos, palas, fustas o varillas. Una de las prácticas más antiguas y mejor documentadas del BDSM.",
    longDesc:
      "Impact play describe cualquier juego que involucre golpear el cuerpo de manera consensuada: nalgadas con la mano, palas de cuero, fustas, varillas, martillos de sensaciones. La práctica tiene una larga historia cultural — desde rituales de fertilidad hasta la cultura leather — y se enseña hoy con énfasis en control, precisión y comunicación. La sensación varía enormemente según la herramienta, la zona del cuerpo, la fuerza aplicada y la respuesta de quien recibe. Un golpe firme en las nalgadas con la mano es una experiencia muy distinta de un azote con una fusta de cuero. La práctica responsable se centra en la zona muscular (nalgas, muslos, espalda), evitando áreas óseas, articulares y vulnerables.",
    beginnerFriendly: true,
    physicalRisk: "medium",
    consentComplexity: "medium",
    duration: "10–60 minutos típicamente, con pausas",
    equipment: [
      "Mano (sin equipamiento — perfecta para empezar)",
      "Pala de cuero o madera (niveles suaves a medios)",
      "Fusta (experiencia intermedia)",
      "Para el receptor: agua, manta, espacio tranquilo post-juego"
    ],
    safetyNotes: [
      "Evitar siempre: zona lumbar baja (riñones), coxis, nuca, genitales, interior de muslos, espinilla, plantas de los pies, articulaciones.",
      "Zonas seguras por excelencia: nalgadas (tejido muscular grueso), muslos externos, espalda alta-media (no cervical).",
      "Empezar suave. Siempre. La intensidad se sube con confianza mutua, no al inicio.",
      "Después de un golpe fuerte, revisar con la mano que no haya endurecimiento muscular — si lo hay, masaje suave y calor.",
      "Comprobar con regularidad: '¿cómo vamos?' no es opcional. El silencio puede ser resistencia o sumisión — hay que diferenciarlo con práctica."
    ],
    beginnerTips: [
      "El primer contacto se siente MUY distinto del quinto. El cuerpo se 'calienta' y la sensación cambia.",
      "Una mano tibia antes del primer golpe cambia la experiencia. Es gentileza, no debilidad.",
      "Un mal golpe no arruina la escena — un mal silencio sí. Si algo se siente mal, decirlo en el momento.",
      "Después de la sesión: agua, comida ligera, conversación. El aftercare es parte del impacto play, no un extra.",
      "Las marcas visibles pueden durar horas o días. Coordiná con tu entorno: no siempre es posible esconder un azote bien dado."
    ],
    relatedActivities: ["sensory-deprivation", "role-play", "rope-bondage"]
  },
  {
    slug: "sensory-deprivation",
    name: "Deprivación Sensorial",
    emoji: "🕶️",
    tagline: "Cuando el mundo se acorta, los otros sentidos se agudizan",
    shortDesc: "Vendas, tapones, aislamiento controlado. Reduce los estímulos externos para amplificar la conexión interna.",
    longDesc:
      "La deprivación sensorial (a veces 'sensory play' o 'sensation play') consiste en reducir o alterar la información sensorial: ojos vendados, oídos tapados, restricción de movimiento, oscuridad, silencio. La práctica existe en muchos contextos — desde la meditación Vipassana hasta técnicas terapéuticas de integración — y en el kink se usa para amplificar la atención a las sensaciones táctiles, la anticipación y la entrega. Una persona con los ojos vendados depende más de su cuerpo, de su respiración, del contacto del otro. Esto profundiza la sensación de vulnerabilidad y de presencia que muchas personas practican.",
    beginnerFriendly: true,
    physicalRisk: "low",
    consentComplexity: "medium",
    duration: "15–60 minutos",
    equipment: [
      "Venda de tela suave o antifaz (NO bufanda apretada, no materiales que presionen ojos)",
      "Tapones de oídos de espuma blanda (o música ambiental)",
      "Temperatura cálida del ambiente",
      "Tiempo de check-in verbal predefinido ('cada 5 minutos preguntás ¿estás bien?')"
    ],
    safetyNotes: [
      "Nunca usar elementos que comprometan la respiración (cinta sobre nariz/boca, bolsas plásticas).",
      "Siempre establecer un gesto de seguridad pre-negociado (soltar la venda = stop, palabra hablada si aún posible, palmada al piso, etc.).",
      "Personas con historial de trauma, ansiedad o ataques de pánico: hablar con el equipo antes. La deprivación puede ser trigger.",
      "Tiempo máximo recomendado para principiantes: 30-45 minutos. Más allá, el cuerpo empieza a desorientarse.",
      "Al retirar la venda: hacerlo gradualmente. Pasar de oscuridad total a penumbra antes que a luz brillante. El sistema nervioso necesita recalibrar."
    ],
    beginnerTips: [
      "Empezar con UN solo sentido reducido (solo ojos, solo oídos) — no todo a la vez.",
      "La persona que tiene los ojos vendados necesita saber siempre DÓNDE está su pareja. Contacto continuo o saber 'está a mi izquierda'.",
      "El silencio y la quietud son parte de la práctica — la persona activa aprende a moverse sin hacer ruido.",
      "Después: agua, conversación, recalibración. La persona que tuvo los ojos vendados puede estar desorientada unos minutos.",
      "Un cuaderno post-escena ayuda mucho: qué sentiste, qué se sintió bien, qué repetir, qué cambiar."
    ],
    relatedActivities: ["rope-bondage", "impact-play", "psychological-play"]
  },
  {
    slug: "role-play-scene",
    name: "Role Play · Trabajo de Escena",
    emoji: "🎭",
    tagline: "Personajes, ficciones, performances consensuadas",
    shortDesc: "Construir un personaje, un escenario, una ficción. Una de las prácticas más antiguas del BDSM y una de las más variadas.",
    longDesc:
      "Role play y trabajo de escena involucran la construcción consensuada de un personaje, un escenario y unas dinámicas de poder dentro de una ficción acordada. Esto abarca desde el clásico 'master/slave' de la comunidad leather, hasta escenarios de autoridad (jefe/empleado, médico/paciente), hasta ficciones personalizadas. La práctica es performativa pero la experiencia es real: la negociación previa, la construcción del personaje, la suspensión de incredulidad consensuada. La clave es la negociación: qué es seguro, qué no, qué pasa si la escena no funciona. La palabra 'escena' (scene) viene del teatro — es una actuación, pero con consecuencias emocionales y corporales reales para los participantes.",
    beginnerFriendly: true,
    physicalRisk: "low",
    consentComplexity: "high",
    duration: "30 minutos a 2-3 horas",
    equipment: [
      "Ropa o accesorios del personaje (opcional pero ayuda a la inmersión)",
      "Espacio físico seguro (puerta con llave, sin interrupciones)",
      "Tiempo de negociación previa (15-30 minutos) y post-escena (15-30 minutos)",
      "Algo para tomar nota de qué funcionó para iterar la próxima vez"
    ],
    safetyNotes: [
      "Las escenas de autoridad que involucran sumisión psicológica profunda requieren experiencia y confianza establecida.",
      "Negociar SIEMPRE antes: hard limits (nunca), soft limits (con cuidado), fantasías (sí, con entusiasmo), desconocidos (preguntar primero).",
      "Una palabra de seguridad no es opcional. Si la persona en sumisión no puede hablar, establecer gesto.",
      "El aftercare post-escena es crítico. Las escenas de role play pueden activar emociones intensas — la transición al 'nosotros reales' necesita tiempo y cuidado.",
      "Sub drop y top drop son reales: bajones emocionales horas o un día después. Anticipar, no minimizar."
    ],
    beginnerTips: [
      "Empezar con escenarios simples y límites claros. La complejidad viene con el tiempo.",
      "Tener un 'cronómetro emocional': si la escena se extiende, chequear a intervalos regulares.",
      "Después de la escena, hablar. Qué te gustó, qué fue difícil, qué probar la próxima vez. El role play mejora con la reflexión.",
      "No toda escena funciona. Una escena 'mala' (incómoda, no excitante, técnicamente floja) es información, no fracaso.",
      "Personajes que conoces bien: el dueño del bar donde siempre vas, el profesor que admiras, la autoridad. Las ficciones familiares se exploran más fácil que las exóticas."
    ],
    relatedActivities: ["psychological-play", "service-play", "sensory-deprivation"]
  },
  {
    slug: "psychological-play",
    name: "Psychological Play",
    emoji: "🧠",
    tagline: "Lo que no se toca también se siente",
    shortDesc: "Juego mental: humillación consensuada, control verbal, edging emocional. Sin contacto físico necesario, igual de intenso.",
    longDesc:
      "Psychological play es una categoría amplia de prácticas kink que trabajan sobre la mente, la emoción, la percepción de poder — sin requerir necesariamente contacto físico. Incluye humillación consensuada (insultos acordados), control verbal, obediencia ritual, denial (incluido el 'orgasm denial' y otras restricciones), obediencia de servicio, exhibicionismo, entrenamiento. Es quizás la categoría que más depende del consenso explícito y la comunicación porque el 'daño' es emocional y menos tangible que un azote. La línea entre humillación consensuada y abuso real es la negociación previa y el aftercare posterior. La práctica responsable de psychological play es una de las más avanzadas — requiere autoconocimiento de ambas partes y confianza profunda.",
    beginnerFriendly: false,
    physicalRisk: "low",
    consentComplexity: "high",
    duration: "Variable, desde minutos hasta una sesión completa",
    equipment: [
      "Tiempo para negociar — esta es la práctica con MÁS negociación previa proporcional al tiempo total",
      "Un 'script' o 'contrato' escrito si los límites son complejos (opcional pero recomendado)",
      "Espacio de aftercare con tiempo y privacidad",
      "Persona de referencia (un 'mentor' o 'tercero de confianza') en caso de escenas avanzadas"
    ],
    safetyNotes: [
      "Establecer con claridad qué palabras/conceptos son ABSOLUTAMENTE off-limits (a menudo relacionados con inseguridades reales: peso, inteligencia, apariencia, etc.).",
      "Sabes que el psychological play tocó un límite cuando: la persona deja de responder, o responde mecánicamente, o se ríe sin sentido. PARAR y chequear.",
      "El aftercare de psychological play es más extenso que el de impact play. Mínimo 30 minutos de transición.",
      "Estar atento al 'sub drop' (depresión post-escena) y al 'top drop' (culpa del que da las órdenes). Ambos son reales.",
      "No hacer psychological play con alguien que esté atravesando un momento difícil de su vida sin discutirlo primero."
    ],
    beginnerTips: [
      "Empezar con intensidad BAJA. La fantasía en tu cabeza suele ser más intensa que lo que se siente bien en la realidad.",
      "El humor salva escenas. Si algo se vuelve incómodo, una broma honesta ('estoy sobrepensando esto') puede desbloquear.",
      "Después de la escena: 'sacate el personaje' verbalmente. Decir 'ya soy yo de nuevo' es poderoso.",
      "Un cuaderno compartido donde ambos escriben qué disfrutaron y qué no — invaluable para escenas futuras.",
      "El psychological play no es para todas las personas, ni para todas las parejas. Si no resuena, hay muchas otras prácticas."
    ],
    relatedActivities: ["role-play", "service-play", "sensory-deprivation"]
  },
  {
    slug: "service-play",
    name: "Service Play",
    emoji: "🍷",
    tagline: "Entrega, atención, protocolo",
    shortDesc: "Servicio consensuado a otra persona: ceremonial, doméstico, ritual. Una de las prácticas más antiguas de la comunidad leather.",
    longDesc:
      "Service play es la práctica de realizar actos de servicio a otra persona dentro de un marco consensuado: servir una cena, atender detalles, mantener protocolo, ejecutar rituales. Viene de la tradición leather/old guard donde 'service' era (y sigue siendo) una de las formas más altas de entrega — no es sumisión degradada, es entrega intencional y honrosa. La práctica se centra en la atención al otro: qué necesita, qué prefiere, qué ritual tiene significado. Es quizás la práctica con más 'aftermath positivo' — los actos de servicio suelen dejar a ambas partes sintiéndose cuidadas.",
    beginnerFriendly: true,
    physicalRisk: "low",
    consentComplexity: "low",
    duration: "De horas a una vida",
    equipment: [
      "Lo que se sirva: comida, bebida, ritual (opcional)",
      "Un 'protocolo' acordado: cómo hablar, cómo pararse, qué称呼 usar",
      "Tiempo. El service play requiere presencia sostenida, no ráfagas.",
      "Honestidad: si la cabeza del servidor no está, decirlo"
    ],
    safetyNotes: [
      "El service play se degenera en abuso si no se discuten los límites: qué servicios sí, qué servicios no.",
      "Honestidad > obediencia ciega. Si algo no se puede o no se quiere, decirlo, negociar.",
      "Cuidar al servidor después: comida, descanso, espacio para 'salir del personaje' si hubo alguno.",
      "El service play de 24/7 (cocina, limpieza, mantenimiento) es intenso y solo funciona con roles bien establecidos y descansos programados.",
      "El cansancio acumulado es real. Service play sostenido requiere gestión de energía — el servidor tiene que cuidarse para servir bien."
    ],
    beginnerTips: [
      "Empezar con servicios específicos y cortos: 'esta noche servís la cena con este protocolo'.",
      "Acordar primero qué称呼, gestos, rituales tienen significado. No improvisar protocolos en el momento.",
      "Después: contar qué disfrutó cada uno, qué fue difícil. El service play mejora con la conversación post.",
      "El servidor también es persona. Tiene días malos, mal humor, cansancio. Eso no rompe la dinámica — la honra, si se maneja con honestidad.",
      "Hay una línea fina entre service play y trabajo doméstico no remunerado. El service play es VOLUNTARIO, ACORDADO, y reversible. El trabajo doméstico impuesto no lo es."
    ],
    relatedActivities: ["role-play", "protocol-play"]
  }
];

export function getActivity(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}
