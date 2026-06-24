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
  },

  // ── 2026-06-18 additions: edge play + common activities ─────────────
  {
    slug: "breath-play",
    name: "Breath Play · Juego de respiración",
    emoji: "💨",
    tagline: "La práctica más letal del kink. Por eso importa leer antes de hacer.",
    shortDesc:
      "Jugar con el flujo de aire y la oxigenación. Altísimo riesgo. Esta página documenta lo que la comunidad sabe sobre los riesgos — no es un tutorial.",
    longDesc: `## Lo que es

Breath play es cualquier práctica que limita, controla, o juega con la respiración de una persona con fines eróticos, psicológicos, o de dinámica de poder. Incluye:

- **Choking / estrangulación erótica** — presión externa en el cuello.
- **Smothering** —限制 o bloqueo de la vía aérea con la mano, una máscara, una tela, o el cuerpo.
- **Gas /缺氧** — inhalación de sustancias que alteran la oxigenación (NO recomendado — el helio mata personas cada año).
- **Prisión respiratoria** — restricción del pecho con bondage, peso, o ropa.

## Por qué esta página no te enseña a hacerlo

El breath play es la práctica kink con mayor tasa de mortalidad documentada. No porque sea complicada, sino porque el cuerpo humano **no tiene un sistema de alarma confiable para la falta de oxígeno**. La víctima puede no sentir que algo está mal hasta que está a punto de desmayarse — y para entonces, no tiene tiempo de decir "pará".

Por eso esta página no es un tutorial. Es una guía sobre **qué riesgos tiene, qué necesita saber alguien que decide practicarla, y qué hacer si las cosas van mal**. Para una discusión completa de los datos, ver la guía de [play de respiración](/aprender/play-de-respiracion).

## Lo mínimo que tenés que saber

- **El sensor de "te falta aire" está en el pecho y el abdomen, no en el cuello.** Si presionás el cuello, la víctima puede no sentir nada hasta que está inconsciente.
- **4-5 minutos sin oxígeno suficiente → daño cerebral permanente.** La ventana es corta.
- **El "pará" puede no llegar a tiempo.** La víctima se desmaya antes de poder decirlo.
- **Aneurismas no diagnosticados** se rompen con la presión en el cuello. Sin aviso.
- **El alcohol, las drogas, y la privación de sueño** multiplican el riesgo exponencialmente.

## Quién NO debería hacer breath play

Esta es una lista no exhaustiva:

- Personas con condiciones cardíacas (arritmias, hipertensión no controlada, antecedentes familiares de muerte súbita).
- Personas con epilepsia.
- Personas con aneurismas (incluso no diagnosticados — el breath play puede ser el evento que los encuentra).
- Personas con apnea del sueño.
- Personas con cualquier condición respiratoria crónica.
- Personas que toman medicación anticoagulante.
- Personas que están bajo efectos de alcohol o cualquier sustancia psicoactiva.
- Personas con cualquier condición que afecte la respuesta vagal (algunas neuropatías, diabetes avanzada, etc.).

## Si decidís hacerlo de todos modos

Las **mínimas condiciones** que la comunidad kink experimentada considera no negociables:

1. **No bajo alcohol ni drogas.** Punto. No negociable.
2. **No con personas que conociste hace poco.** Necesitás confianza y comunicación sostenida.
3. **Con consentimiento explícito, escrito, actualizado.** Cada vez. "Ya lo hicimos" no es suficiente.
4. **Con un dungeon monitor (DM) presente.** Alguien que NO esté jugando, que pueda intervenir.
5. **Con un plan de emergencia claro.** ¿Quién llama? ¿A qué número? ¿Cómo se hace RCP?
6. **Sabiendo hacer RCP.** Si no sabés, no hagas esto. Punto.
7. **Empezando con intensidades muy bajas.** La primera vez que probás, no llegues a pérdida de conciencia. La primera vez es para aprender cómo reacciona el cuerpo de la víctima.

## Lo que se hace si algo va mal

- **Si la víctima se desmaya:** retirá la restricción de inmediato. Posición lateral de seguridad. Verificá respiración. Si no respira, RCP. Llama a emergencias (\*911 en PY).
- **Si la víctima tiene una convulsión:** no la retengas. Dejala en el piso,retirá objetos alrededor, esperá. Después de la convulsión, posición lateral.
- **Si la víctima vomita:** posición lateral para que no aspire el vómito.
- **Si la víctima parece "bien" después de un desmayo:** médico igual. Algunas complicacionesaparecen 24-48h después (diferida). No es opcional.

## En resumen

Breath play existe. Personas adultas lo hacen. Pero:

- Es la práctica con mayor mortalidad.
- No hay forma de "hacerlo seguro". Hay formas de reducir el riesgo.
- Si no podés aceptar el riesgo, no lo hagas. Hay 50 prácticas más.
- Si lo hacés, sabé RCP, tené un DM, y no lo hagas con alguien que conociste hace una hora.

La guía completa está en [play de respiración](/aprender/play-de-respiracion).`,
    beginnerFriendly: false,
    physicalRisk: "high",
    consentComplexity: "high",
    duration: "De segundos a minutos (cada aplicación individual)",
    equipment: [
      "Nada, o las manos del top. La herramienta es el cuerpo.",
      "Equipo de emergencia a mano: celular cargado, RCP sabida, número de emergencia a mano",
      "DM presente (no negociable)",
      "Opcional: señal de mano predeterminada (la víctima toca dos veces el brazo del top si necesita parar — más fácil que una palabra hablada si la respiración está limitada)"
    ],
    safetyNotes: [
      "**Esta no es una práctica para principiantes.** Sin excepción.",
      "Cada aplicación individual requiere consentimiento explícito y actualizado. 'Ya lo hicimos' no es consentimiento.",
      "El cuerpo humano no avisa cuando la oxigenación está al límite. La víctima puede no tener tiempo de decir 'pará' antes de desmayarse.",
      "4-5 minutos sin oxígeno suficiente → daño cerebral permanente.",
      "Aneurismas no diagnosticados se rompen con la presión en el cuello. Sin aviso. Sin forma de saber que existen.",
      "**Nunca** bajo alcohol o drogas. La combinación es la causa de la mayoría de las muertes.",
      "Con un DM presente que NO esté jugando. Sin excepción.",
      "Con un plan de emergencia claro y RCP sabida.",
      "La víctima puede tener complicaciones 24-48h después. Si se desmayó aunque sea una vez, médico.",
      "Si cualquiera de las condiciones de la lista de arriba aplica, no hacerlo."
    ],
    beginnerTips: [
      "**No hagas esto si estás empezando.** Punto. Esta no es una actividad de 'arranque'.",
      "Si después de leer todo esto querés hacerlo, empezá con intensidades mínimas y con un instructor o play partner con años de experiencia.",
      "Buscá un workshop de edge play en Buenos Aires, São Paulo, o CDMX. La inversión vale la pena.",
      "Leé la guía completa: [play de respiración](/aprender/play-de-respiracion).",
      "El 'aguantar un poco más' no es una técnica. Es un error que mata."
    ],
    relatedActivities: ["needle-play", "sensory-deprivation"]
  },
  {
    slug: "needle-play",
    name: "Needle Play · Juego de agujas",
    emoji: "🪡",
    tagline: "El cuerpo como libro, la piel como página.",
    shortDesc:
      "Inserción temporal de agujas hipodérmicas estériles con fines estéticos, sensoriales, o psicológicos. Requiere formación específica — no es para principiantes.",
    longDesc: `## Lo que es

Needle play (juego de agujas) es una práctica que consiste en insertar agujas hipodérmicas estériles a través de la piel con fines:

- **Estéticos** — la imagen visual de agujas en el cuerpo.
- **Sensoriales** — el pinchazo repetido genera una sensación que muchas personas describen como meditativa o trance-like.
- **Psicológicos** — la vulnerabilidad del cuerpo atravesado conecta con dinámicas de poder.
- **Químicos** — el cuerpo libera endorfinas y adrenalina en respuesta al trauma menor controlado, similar al "runner's high".

A diferencia del body piercing comercial, en needle play las agujas se retiran al final de la sesión.

## Por qué esto NO es para principiantes

El needle play requiere:

- Conocimiento anatómico (dónde pasan nervios, arterias, órganos).
- Conocimiento del equipo (tipos de aguja, calibres, cómo conseguirlas estériles).
- Entrenamiento en esterilidad (cómo no introducir infección).
- Capacidad de responder a una emergencia médica.

**No** es una práctica para "probar un día". No es para aprender de YouTube. No es para improvisar en casa.

## Lo que necesitás para empezar

### 1. Formación

Un workshop con un instructor certificado. En Paraguay no hay (todavía). En Buenos Aires, São Paulo, y México sí. La inversión en formación es **antes** de comprar agujas.

### 2. Equipo apropiado

- **Agujas hipodérmicas estériles, nuevas, en envase sellado.** Una aguja por persona por sesión.
- **No compartir agujas entre personas.** Es la regla básica de cualquier inyección.
- **No reutilizar una aguja en la misma persona en diferentes sesiones** (idealmente).
- **NO acupuntura, no costura, no tatuaje casero, no herramientas no médicas.** La esterilidad es lo que evita infecciones serias.
- **Guantes de nitrilo** para el/la top.
- **Apósitos estériles** para después.
- **Botiquín de emergencia** a mano.

### 3. Conocimiento anatómico

Zonas seguras (con formación):

- **Espalda** (musculatura paravertebral, NO sobre la columna).
- **Muslos** (cara lateral).
- **Nalgas** (cara lateral-superior, en el cuadrante externo).
- **Brazos** (cara lateral del deltoides).
- **Abdomen** (zona periumbilical, NO profundamente).

Zonas de riesgo (no para principiantes):

- **Cuello** — carótida, yugular, tráquea, tiroides. Riesgo de hemorragia masiva, embolismo, paro.
- **Tórax** — neumotórax (pulmón pinchado).
- **Abdomen profundo** — perforación intestinal, peritonitis.
- **Ingle, axila** — arterias principales.
- **Rostro** — nervio facial, arteria temporal.

### 4. La víctima

- **Despierta, capaz de hablar, capaz de parar en cualquier momento.**
- **Sin antecedentes de desmayos, sin medicación anticoagulante, sin condiciones cardíacas serias.**
- **Que sepa qué esperar.** No es una sorpresa para el cumpleaños.
- **Que haya comido en las últimas 4-6 horas.** El desmayo por respuesta vagal es común si la persona está en ayunas.

## Cómo se hace

1. **Consentimiento escrito, específico, actualizado.** Qué zonas, cuántas agujas, hasta cuándo.
2. **Inspección visual y palpación** de la zona para evitar estructuras anatómicas.
3. **Antisepsia** de la piel (alcohol 70% o clorhexidina).
4. **Inserción rápida y firme** en ángulo de 15-30 grados respecto a la piel.
5. **Fijación con cinta o apósito** si la aguja es larga.
6. **Monitoreo constante** de la víctima: color, sudoración, respuesta verbal.
7. **Retiro después del tiempo acordado.** Una aguja a la vez, firme y rápido.
8. **Limpieza y apósito.**
9. **Seguimiento 24-48h** por signos de infección.

## Complicaciones posibles

- **Hematoma** — moretón, normal las primeras veces.
- **Sangrado leve** — esperable.
- **Infección local** — si la esterilidad falla. Síntomas: enrojecimiento creciente, calor, pus. **Médico.**
- **Lipotimia / desmayo** — la respuesta vagal es común. Si pasa, retirar agujas con cuidado (una a una, no todas) y posición lateral.
- **Daño nervioso** — si la aguja toca un nervio. Dolor irradiado, hormigueo. La mayoría se recupera; algunos casos son permanentes.
- **Reacción alérgica** — raro, pero posible (níquel en acero quirúrgico).
- **Neumotórax** — si se inserta en tórax. **Emergencia médica inmediata.**

## Lo que NO se hace

- **Insertar agujas en genitales, pezones, mucosas, párpados** sin formación especializada.
- **Bajo alcohol o drogas.**
- **En el primer encuentro con alguien.**
- **Con agujas no estériles o usadas.**
- **Sin una víctima que pueda hablar y parar.**
- **Sin DM o alguien que pueda intervenir.**

## En resumen

Needle play es una práctica real, practicada por miles de personas en el mundo. Tiene riesgos reales, mitigables con formación, equipo, y respeto por los protocolos.

Si no tenés formación, **no lo hagas**. No en casa, no con cuidado, no "porque leí en internet".

Para más información, ver la guía completa: [play de agujas](/aprender/play-de-agujas).`,
    beginnerFriendly: false,
    physicalRisk: "high",
    consentComplexity: "high",
    duration: "30-90 minutos (sesión típica)",
    equipment: [
      "Agujas hipodérmicas estériles, nuevas, en envase sellado (calibres 18G-25G son comunes para principiantes; calibres más finos para mayor sensibilidad)",
      "Guantes de nitrilo",
      "Apósitos estériles y cinta médica",
      "Alcohol 70% o clorhexidina para antisepsia",
      "Botiquín de emergencia (gasas, apósitos, tijeras)",
      "DM o alguien que pueda intervenir sin estar jugando"
    ],
    safetyNotes: [
      "**No es para principiantes.** Sin formación, no se hace.",
      "Workshop con instructor certificado antes de la primera sesión. Punto.",
      "Material estéril solamente. Una aguja por persona por sesión.",
      "Conocimiento anatómico obligatorio: evitar cuello, tórax, abdomen profundo, ingle, axila, rostro.",
      "Consentimiento escrito, específico, actualizado. Por sesión.",
      "Víctima despierta, capaz de hablar, capaz de parar. Sin excepción.",
      "DM o persona de seguridad presente que no esté jugando.",
      "Seguimiento 24-48h por signos de infección.",
      "Si neumotórax, hemiplejia, o cualquier síntoma neurológico: emergencia médica inmediata.",
      "No bajo alcohol ni drogas."
    ],
    beginnerTips: [
      "Conseguí formación con un instructor certificado antes de comprar agujas.",
      "Empezá con agujas más gruesas (18G-21G) y zonas seguras (espalda, muslos).",
      "Una aguja a la vez hasta dominar la técnica. Cinco agujas es nivel intermedio, no principiante.",
      "Después de cada sesión, revisá a la víctima 24 y 48 horas después.",
      "Si te interesa needle play, el viaje a un workshop en Buenos Aires vale la inversión.",
      "Leé la guía completa: [play de agujas](/aprender/play-de-agujas)."
    ],
    relatedActivities: ["sensory-deprivation", "service-play"]
  },
  {
    slug: "electrical-play",
    name: "Electrical Play · Juego eléctrico",
    emoji: "⚡",
    tagline: "TENS units, vibradores, y conducción. La electricidad domesticada.",
    shortDesc:
      "Estimulación eléctrica controlada con equipos de baja potencia. La entrada más accesible al edge play, pero no exenta de riesgos.",
    longDesc: `## Lo que es

Electrical play (juego eléctrico) es el uso de corriente eléctrica de baja potencia con fines eróticos o sensoriales. A diferencia de la imaginación popular, **no** se usan cables pelados ni nada improvisado. Se usan dispositivos diseñados para kink que limitan la corriente a niveles seguros.

Los equipos más comunes:

- **TENS units** (Transcutaneous Electrical Nerve Stimulation) — dispositivos médicos para analgesia. La comunidad kink los adoptó por la variedad de modos y la seguridad intrínseca.
- **EMS units** (Electrical Muscle Stimulation) — similares, estimulan músculos.
- **Violet wands / Neon wands** — alta frecuencia, baja corriente, efecto "rayo". Sensación superficial.
- **Vibradores** en modo continuo (kink-friendly).
- **Pin wheels electrificados** (específicos de la industria kink).

## Por qué es el edge play más accesible

El equipo TENS/EMS comercial:

- Limita la corriente a niveles seguros.
- No genera riesgo de electrocución si se usa correctamente.
- Es relativamente barato (US$30-100 por unidad).
- Es portátil y discreto.

Esto NO significa que sea "seguro". Hay riesgos, sobre todo si se combina con otras prácticas.

## Lo que necesitás saber

### Electricidad básica

- **Voltaje (V):** diferencia de potencial. Lo que "empuja" la corriente.
- **Amperaje (mA):** cantidad de corriente. Lo que **hace** el daño.
- **Resistencia (Ω):** oposición al flujo. La piel mojada tiene menos resistencia.
- **Ley de Ohm:** V = I × R. A mayor voltaje o menor resistencia, mayor corriente.

El cuerpo humano tiene una resistencia de ~100.000 Ω en piel seca, y baja a ~1.000 Ω en piel mojada o mucosas. **Una TENS unit que es segura en piel seca puede ser peligrosa en piel mojada o en genitales.**

### Reglas fundamentales

1. **Nunca en el corazón.** No pasar corriente a través del torso de una persona con marcapasos o cualquier dispositivo cardíaco. **Nunca.**
2. **Nunca cerca del corazón.** La corriente a través del corazón puede causar fibrilación ventricular.
3. **Un solo camino a la vez.** Si tenés dos electrodos, la corriente va de uno a otro. Que sea un camino simple, no a través de órganos vitales.
4. **Piel seca siempre.** No usar en genitales, ano, mucosas. No usar con la persona sudada. No usar dentro del agua.
5. **Sin marcapasos, sin defibriladores, sin ninguna condición cardíaca.**

## Zonas seguras

- **Brazos, piernas, glúteos, espalda** — generalmente bien.
- **Zonas erógenas externas** (clítoris, pene) — algunos equipos específicos, baja potencia, con consentimiento explícito.
- **Cuello** — solo con equipos específicamente diseñados para eso, y con conocimiento.

## Zonas prohibidas

- **Corazón / torso** — riesgo de fibrilación.
- **Cabeza** — convulsiones.
- **Genitales internos** — no.
- **Mucosas** — no.
- **Piel mojada o lesionada** — no.

## Cómo se hace

1. **Consentimiento explícito y escrito** por sesión.
2. **Verificación de salud** — sin marcapasos, sin condiciones cardíacas, sin embarazo (en el caso de personas con útero, el electrodo sobre el útero puede ser un problema).
3. **Equipo cargado, electrodos en buen estado** (no usar electrodos viejos o secos).
4. **Gel conductor** en los electrodos si es necesario.
5. **Empezar con la intensidad más baja** y subir de a poco.
6. **Monitoreo constante** de la víctima: reacción, color, sudoración, respuesta verbal.
7. **Stop inmediato** si hay dolor en el pecho, irregularidad cardíaca, o cualquier síntoma de shock.

## Complicaciones posibles

- **Quemadura eléctrica** — por mal contacto del electrodo, alta potencia, o uso prolongado.
- **Arritmia** — por conducción a través del corazón.
- **Espasmo muscular** — involuntario, puede asustar.
- **Convulsión** — si pasa por la cabeza.
- **Dolor persistente** en la zona de aplicación.

## Lo que NO se hace

- **TENS units sobre el corazón** de nadie. Especialmente no en personas con marcapasos.
- **Equipo improvisado** (cables pelados, electricidad doméstica). Esto **mata**.
- **En piel mojada, dentro del agua, sobre mucosas.**
- **Combinado con alcohol o drogas.**
- **En una persona con cualquier condición cardíaca.**

## En resumen

Electrical play es la entrada más accesible al edge play. Es relativamente seguro con el equipo correcto y el conocimiento adecuado. **Pero no es seguro si se hace mal.** La electricidad doméstica mata. La corriente correcta, con el equipo correcto, en la zona correcta, no.

La recomendación: comprá una TENS unit, leé el manual, experimentá con vos mismo/a, después con un play partner con experiencia. Y siempre: **lejos del corazón, en piel seca, con consentimiento explícito.**`,
    beginnerFriendly: true,
    physicalRisk: "medium",
    consentComplexity: "medium",
    duration: "20-60 minutos",
    equipment: [
      "TENS unit o EMS unit con electrodos nuevos en buen estado",
      "Gel conductor si el electrodo lo requiere",
      "Manual del equipo (leer antes)",
      "DM o persona de seguridad si la sesión es intensa",
      "Sin marcapasos, sin condiciones cardíacas documentadas"
    ],
    safetyNotes: [
      "**Nunca** sobre el corazón, especialmente si la persona tiene marcapasos o cualquier dispositivo cardíaco.",
      "**Nunca** en piel mojada, dentro del agua, o sobre mucosas.",
      "Piel seca siempre. Si la persona suda, pará, secá, continuá.",
      "Equipo comercial certificado, no improvisado. La electricidad doméstica mata.",
      "Empezar con la intensidad más baja y subir de a poco.",
      "Si la persona reporta dolor en el pecho, irregularidad cardíaca, o sensación de shock, parar inmediatamente.",
      "No combinar con alcohol o drogas.",
      "El consentimiento explícito y escrito es necesario. Por sesión.",
      "Si tenés dudas sobre la condición cardíaca de la persona, no hagas electrical play. Hay 50 prácticas más."
    ],
    beginnerTips: [
      "Comprá una TENS unit de grado médico (no las baratas chinas sin certificación).",
      "Leé el manual completo antes de usar con alguien.",
      "Experimentá con vos mismo/a primero: dónde se siente bien, dónde duele, dónde es neutro.",
      "Un electrodo en el antebrazo, el otro en el antebrazo del otro brazo. Eso es un circuito simple. Lejos del corazón.",
      "Subí la intensidad de a poco. Si la víctima dice 'más', un click. No diez.",
      "Después de la sesión,hidratá y descansá. La electricidad estimula el sistema nervioso; el cuerpo necesita bajar."
    ],
    relatedActivities: ["sensory-deprivation", "needle-play"]
  },
  {
    slug: "temperature-play",
    name: "Temperature Play · Juego de temperatura",
    emoji: "🔥",
    tagline: "Calor, frío, y la línea entre sensación y quemadura.",
    shortDesc:
      "Estimulación sensorial usando variaciones de temperatura. Wax play, ice play, y combinaciones. Baja barrera de entrada, riesgos si se hace mal.",
    longDesc: `## Lo que es

Temperature play (juego de temperatura) es cualquier práctica que usa variaciones de temperatura con fines sensoriales o de poder. Es una de las prácticas más comunes y accesibles del kink, y una buena puerta de entrada para principiantes.

Las variantes principales:

- **Wax play** — cera derretida sobre la piel.
- **Ice play** — hielo, agua helada, o superficies frías.
- **Hot oil / hot towel** — aceite caliente, toallas calientes.
- **Combinaciones** — alternar caliente/frío para estimulación extrema.
- **Fire play** — ⚠️ separado, requiere formación específica.

## Wax play

### Materiales

**No cualquier cera sirve.** Las velas aromáticas comerciales tienen fragancias y colorantes que pueden irritar la piel o, peor, están hechas de parafina de bajo punto de fusión que se adhiere a la piel y puede causar quemaduras más profundas.

Lo que se usa en wax play:

- **Cera de soja** — bajo punto de fusión (~46-49°C), fácil de limpiar.
- **Cera de abeja** — punto de fusión medio (~62-64°C), más firme.
- **Cera de parafina de grado cosmético** — punto de fusión medio-alto (~55-65°C), la más común en la industria.
- **Cera de masaje** — específicamente diseñada para la piel, con punto de fusión bajo.

**NO usar:**

- Cera de vela aromática (parafina barata + fragancias).
- Cera con colorantes agresivos.
- Ceras de baja calidad que se agrietan al enfriar (pueden pegarse a la piel).

### Cómo se hace

1. **Consentimiento explícito** por sesión.
2. **Test de alergia:** aplicar un poco de cera en una zona pequeña (antebrazo, por ejemplo) y esperar 5 minutos. Si hay irritación, no usar.
3. **Altura de goteo:** 30-50 cm de la piel. Más alto = más frío al llegar = menos riesgo de quemadura. **Empezar alto.**
4. **Zonas seguras:** espalda, muslos, nalgas, abdomen, pecho (no cerca de pezones al principio).
5. **Evitar zonas con vello facial** (la cera se pega), **mucosas**, **heridas abiertas**.
6. **Retirar la cera fría** con un movimiento de borde. No tirar en contra del vello.
7. **Agua tibia y jabón** para limpiar después.

### Riesgos

- **Quemadura de primer grado** — si la cera está muy caliente, se deja muy cerca, o se aplica repetidamente en la misma zona.
- **Quemadura de segundo grado** — más seria, requiere atención médica.
- **Quemadura química** — por fragancias o colorantes en velas inadecuadas.
- **Alergia** — algunas personas reaccionan a la cera de abeja o a ciertos colorantes.

## Ice play

### Materiales

- **Hielo** (agua congelada en cubeteras, o bandejas de cubos grandes para mayor duración).
- **Agua helada** en recipiente.
- **Toallas frías** (remojo + congelado).
- **Wartenberg wheels** (opcional) refrigerados.

### Cómo se hace

1. **Consentimiento explícito.**
2. **Aplicar con movimiento** — no dejar el hielo quieto en un punto (riesgo de quemadura por frío).
3. **Zonas erógenas:** pezones, genitales, cuello, muslos internos. Alta sensibilidad.
4. **Combinado con calor:** alternar hielo y toalla caliente crea una sensación intensa.
5. **Después:** la piel vuelve a temperatura normal en 5-10 minutos.

### Riesgos

- **Quemadura por frío** (frostbite) — si se deja el hielo en un solo punto más de 2-3 minutos.
- **Hipotermia local** — en zonas pequeñas, se resuelve sola. En zonas grandes, riesgo sistémico.
- **Reacción vasovagal** — desmayo por la estimulación. Posición lateral de seguridad.

## Fire play ⚠️

**NO confundir con wax play.** El fire play usa fuego real cerca de la piel, con sustancias inflamables (alcohol, perfumes) que se encienden y apagan rápidamente.

Esto es **edge play** de alta peligrosidad. Requiere:

- Formación específica con instructor certificado.
- Extintor a mano.
- No usar NUNCA cerca de la cara, el cabello, o la ropa.
- Sustrato inflamable: alcohol isopropílico al 70% o специальные fluidos de fire play.
- NO usar perfume, NO usar gel a base de aceite, NO usar ningún flammable que no esté específicamente aprobado.

Para más información, ver la sección de edge play en [play de respiración](/aprender/play-de-respiracion) y considerar un workshop especializado antes de intentar.

## En resumen

- Wax play: accesible, baja barrera de entrada, baja-mediana peligrosidad si se hace bien.
- Ice play: accesible, bajo riesgo, alto impacto sensorial.
- Fire play: **edge play**, requiere formación específica, no para principiantes.
- Wax + ice combinados: una de las prácticas más intensas sensorialmente.
- Materiales importan. Cera inadecuada = quemadura química.
- Consentimiento explícito. Por sesión.
- Zonas seguras: espalda, muslos, nalgas, abdomen.
- Evitar mucosas, heridas, vello facial, cerca de los ojos.

Una buena sesión de temperature play puede ser la práctica más intensa y la más segura. La mayoría de las lesiones vienen de improvisar.`,
    beginnerFriendly: true,
    physicalRisk: "medium",
    consentComplexity: "low",
    duration: "20-60 minutos",
    equipment: [
      "Cera de soja, abeja, o de grado cosmético (NO velas aromáticas comerciales)",
      "Recipiente para derretir la cera (slow cooker o baño maría, no microondas)",
      "Aplicadores (cuchara, brocha, o goteo directo)",
      "Hielo en cubeteras o bandejas",
      "Toallas tibias para combinaciones calor/frío",
      "Agua tibia, jabón neutro, apósitos para después"
    ],
    safetyNotes: [
      "**No usar velas aromáticas comerciales** (parafina barata + fragancias = quemaduras químicas).",
      "Test de alergia en zona pequeña antes de la sesión completa.",
      "Empezar el goteo de cera a 30-50 cm de altura. Más alto = más frío al llegar = más seguro.",
      "Evitar mucosas, heridas abiertas, zonas con vello facial denso, cerca de los ojos.",
      "Para ice play, mantener el hielo en movimiento. No dejarlo quieto más de 2-3 minutos en un punto.",
      "Fire play es edge play. Requiere formación específica. NO improvisar.",
      "Consentimiento explícito por sesión.",
      "Si hay quemadura de primer grado (enrojecimiento, dolor leve), crema hidratante. Si es de segundo grado (ampollas), médico.",
      "No combinar wax play con materiales inflamables (alcohol, perfumes) — riesgo de ignición."
    ],
    beginnerTips: [
      "Empezá con cera de soja (punto de fusión más bajo = más segura).",
      "Goteá desde 50 cm de altura. La cera se enfría en el aire.",
      "Para tu primera vez, probá vos mismo/a antes con una persona. Saber cómo se siente te hace mejor top.",
      "Combiná cera tibia con hielo en la misma zona para una experiencia intensa.",
      "La cera de abeja es más firme y se retira más limpia. La de soja es más suave y más fácil de limpiar.",
      "Después de wax play: aceite tibio o agua tibia y jabón neutro. No arrancar la cera en frío."
    ],
    relatedActivities: ["sensory-deprivation", "impact-play"]
  },
];

export function getActivity(slug: string): Activity | undefined {
  return activities.find((a) => a.slug === slug);
}
