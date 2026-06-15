// Beginner guides for the community learning section.
// Research-grounded from SSC/RACK/PRICK frameworks, "The New Topping Book",
// "SM 101", "Playing Well With Others", NCSF safer-sex guidelines,
// and r/BDSMcommunity consensus threads.
//
// Every article carries a community-research disclaimer.

export interface Guide {
  slug: string;
  title: string;
  category: "foundations" | "safety" | "communication" | "logistics" | "glossary";
  readMinutes: number;
  excerpt: string;
  body: string; // markdown
  relatedSlugs: string[];
  heroImage?: string;
}

export const guides: Guide[] = [
  {
    slug: "que-es-bdsm",
    title: "¿Qué es BDSM? Una introducción para personas curiosas",
    category: "foundations",
    readMinutes: 6,
    excerpt:
      "BDSM no es lo que muestran las películas. Es un marco de prácticas consensuadas entre adultos que exploran dinámicas de poder, sensorialidad e intensidad. Lo que sí es, lo que no es, y por qué millones de personas lo practican.",
    body: `## ¿Qué es BDSM?

BDSM es un acrónimo inglés que describe un conjunto de prácticas consensuadas entre adultos. Las letras significan:

- **B**ondage & **D**iscipline (Atadura y Disciplina)
- **D**ominance & **S**ubmission (Dominación y Sumisión)
- **S**adism & **M**asochism (sadismo y masoquismo)

Las prácticas que engloba son variadas: desde atadura con cuerda, hasta juego de impacto, hasta role play psicológico, hasta servicio ritualizado. Lo que las une es que todas son **consensuadas, negociadas previamente, y reversibles** por una palabra o gesto de seguridad.

## Lo que BDSM NO es

- No es abuso. El abuso es no consensuado. El BDSM sin consentimiento es abuso, no BDSM.
- No requiere dolor. Muchas prácticas (servicio, role play, ritual, atadura suave) no involucran dolor físico en absoluto.
- No requiere un tipo de persona. Personas de todas las orientaciones, identidades de género, edades (siempre +18) y procedencias practican.
- No es un "indicador" de trauma. Aunque la práctica a veces es terapéutica, la mayoría de las personas en kink no son supervivientes de trauma, ni lo necesitan para tener deseo intenso.
- No es lo que muestran los medios. La pornografía mainstream, las películas y la televisión suelen presentar el BDSM sin contexto, sin negociación, sin seguridad, sin aftercare. Eso es ficción (y no muy realista).

## Lo que sí es

- **Una práctica basada en consenso.** Cada acto se negocia ANTES. "No" se puede decir en cualquier momento. Después se conversa sobre qué funcionó.
- **Una práctica que respeta el cuerpo y los límites.** Las prácticas físicamente intensas tienen protocolos de seguridad. Las que involucran emoción tienen protocolos de aftercare.
- **Una comunidad.** Dungeons, munches (encuentros sociales), conferencias, workshops, mentores. La mayoría de las personas en kink lo aprendieron de otras personas, no de internet.
- **Diversa y queer-friendly históricamente.** Aunque hay espacio para todas las orientaciones, la comunidad kink tiene raíces profundas en la comunidad LGBTQ+. Hoy sigue siendo uno de los espacios más acogedores para identidades de género y orientaciones no normativas.
- **+18.** El BDSM involucra consentimiento informado. Por definición legal y ética, solo personas adultas.

## ¿Por qué la gente lo practica?

Las razones son tan variadas como las prácticas mismas. Algunas comunes:

- **Intensidad emocional y física** — el cuerpo y la mente responden diferente cuando hay intensidad coordinada.
- **Conexión** — la negociación profunda, la atención al otro, la confianza radical son formas de intimidad que muchas personas valoran.
- **Exploración de poder** — en la vida cotidiana el poder está distribuido de forma que no siempre elegimos. El kink permite experimentar con dinámicas de poder en un marco seguro.
- **Curación de vergüenza** — mucha gente creció con vergüenza alrededor del deseo. El kink permite reencuadrar el deseo como algo que se puede explorar con cuidado.
- **Meditación activa** — personas meditativas reportan que la práctica intensa funciona como un koan: deja poco espacio a la mente rumiosa.
- **Diversión** — el kink es, en su base, juego entre adultos.

## Marcos de seguridad: SSC y RACK

Las dos grandes tradiciones de seguridad en el kink:

- **SSC — Safe, Sane, Consensual** (Sano, Seguro y Consensuado). Lo que es "sano" o "sano" es subjetivo, lo que ha llevado a esta tradición a complementarse.
- **RACK — Risk-Aware Consensual Kink**. Reconoce que toda actividad tiene algún riesgo; lo importante es la conciencia del riesgo, la comunicación y el consentimiento.

Las comunidades más experimentadas usan RACK explícitamente: no porque RACK sea "menos seguro", sino porque describe con más honestidad la realidad. Una sesión de impacto play con fusta de cuero tiene riesgos físicos reales (moretones, dolor, marca temporal). RACK dice: "sabemos los riesgos, los negociamos, los aceptamos, los manejamos". SSC dice: "no nos hacemos daño". La primera es más útil.

En maškaráda seguimos SSC **y** RACK, según el contexto. La negociación previa es sagrada. La palabra de seguridad se respeta sin cuestionamiento. El aftercare no es opcional.

## ¿Cómo se entra a la comunidad?

No hay una sola puerta. Las más comunes:

1. **Leer** — sobre el tema, antes que cualquier otra cosa. Esta guía es un comienzo. Hay decenas de libros. La sección de Aprendizaje tiene recomendaciones.
2. **Asistir a un munch** — un encuentro social público (generalmente en un bar o restaurante) donde la gente de la comunidad se conoce sin play. Es el espacio más amable para entrar.
3. **Ir a un evento** — como los de maškaráda. La entrada es por ticket, el dresscode es específico, y la atmósfera es explícitamente consensuada. Es más intenso que un munch pero no es de entrada — es de evento.
4. **Tomar un workshop** — cuerdas, negociación, impact play básico. Hay instructores que enseñan individualmente o en grupos pequeños.
5. **Conectar con un mentor** — personas con años de experiencia que acompañan a personas nuevas. La comunidad suele tener canales para encontrarlos.

Ninguna de estas puertas es mejor que las otras. La que tenga sentido para vos es la correcta.

## ¿No es para mí?

Tal vez. El BDSM no es para todas las personas ni necesita serlo. Si después de leer esto tu curiosidad no despertó, perfecto. Si despertó pero el contenido te incomoda, también está bien. No hay obligación de "intentar" nada.

Lo que sí esperamos: que si decidís explorar, lo hagas informadamente, con honestidad sobre lo que querés, y respetando los límites — los tuyos y los de las otras personas.

## Para seguir aprendiendo

- [Glossary of kink terms](/aprender/glosario) — vocabulario básico
- [Safewords, traffic lights, and aftercare](/aprender/palabras-seguridad) — protocolos de seguridad
- [Your first play party](/aprender/primera-fiesta) — qué esperar cuando asistís a un evento
- [The community standards at maškaráda](/reglas) — cómo operamos en este espacio
`,
    relatedSlugs: ["palabras-seguridad", "glosario", "primera-fiesta"]
  },
  {
    slug: "palabras-seguridad",
    title: "Palabras de seguridad, aftercare y protocolos de salida",
    category: "safety",
    readMinutes: 7,
    excerpt:
      "Cómo se gestiona la seguridad durante una sesión: el sistema de semáforo, alternativas para escenas no verbales, y el aftercare que viene después. Lo que diferencia al kink responsable del abuso.",
    body: `## Por qué importan los protocolos de seguridad

Toda práctica kink — desde un azote con la mano hasta una sesión de shibari de una hora — implica algún nivel de intensidad física o emocional. La intensidad sin protocolo es un accidente esperando. La intensidad con protocolo es una práctica elegida.

Los protocolos de seguridad tienen tres funciones:

1. **Permitir la exploración de intensidad** sabiendo que se puede salir en cualquier momento.
2. **Diferenciar la intensidad consensuada del daño** — sin protocolo, los dos se confunden.
3. **Construir confianza** — saber que el otro puede decir "para" y que va a ser escuchado es lo que permite la vulnerabilidad.

## El sistema de semáforo

El sistema más usado en la comunidad global, recomendado por la mayoría de las comunidades experimentadas:

- **🟢 Verde** — "seguí, esto me gusta, podemos subir un poco"
- **🟡 Amarillo** — "bajá un cambio, estoy cerca del límite, revisá conmigo"
- **🔴 Rojo** — "PARÁ. Inmediatamente. Sin preguntas. Salí de la escena."

Cuando alguien dice "rojo" (o el equivalente acordado), la actividad se detiene en el momento. No se negocia. No se discute. No se "comprueba si realmente lo dice en serio". Se para, se saca al otro de la escena, y se hace check-in verbal: "¿estás bien? ¿qué necesitás?"

El semáforo se negocia ANTES de la sesión. Lo que significa cada color puede variar de persona a persona — lo importante es que ambas partes tengan la misma expectativa.

## Cuándo el semáforo no funciona

En sesiones de deprivación sensorial (vendas, tapones), en escenas de sumisión profunda, o cuando una persona pierde temporalmente la capacidad de hablar, el sistema verbal falla. Las alternativas:

- **Gesto físico preacordado** — soltar la venda, abrir y cerrar la mano tres veces, palmada al piso con la mano no restringida. Lo que sea: lo que la persona pueda HACER siempre.
- **Objeto que se cae** — un cascabel, un pañuelo, una pelota. Si suena, para.
- **Check-in temporizado** — la persona activa pregunta cada X minutos "¿cómo vamos?". La persona sumisa asiente o sacude la cabeza.

Cualquier protocolo es válido mientras se negocie antes. La regla es: **siempre tiene que haber una manera de parar, y la persona activa tiene que estar atenta a ella**.

## El aftercare

"Aftercare" es el cuidado posterior a una sesión. Es **parte de la práctica**, no un extra. Algunas razones por las que existe:

- **Subida de oxitocina y dopamina** — el cuerpo libera estas hormonas durante la práctica. Cuando baja, puede haber bajón emocional (sub drop).
- **Vulnerabilidad post-escena** — la persona que estuvo en sumisión o recibió intensidad suele estar emocionalmente abierta. Necesita sentir que el otro sigue presente.
- **Transición de vuelta** — volver al "modo cotidiano" lleva tiempo. Especialmente después de role play intenso o shibari, el cuerpo necesita recalibrarse.

El aftercare típico incluye:

- Conversación suave sobre la escena (qué gustó, qué no)
- Agua, comida ligera
- Contacto físico reconfortante (abrazo, caricia suave) si ambas partes lo quieren
- Tiempo: mínimo 20-30 minutos para escenas suaves, 1+ hora para escenas intensas
- A veces, dormir juntos, ducharse juntos, o simplemente estar en la misma habitación

El aftercare también lo necesita la persona que da las órdenes (top/dom). El "top drop" — culpa, bajón emocional post-escena — es menos discutido pero igual de real. Quien da la intensidad también necesita tiempo de transición.

## Sub drop y top drop

El "sub drop" es un bajón emocional que puede ocurrir horas o un día después de una escena intensa. Síntomas: tristeza sin causa, llanto, cansancio extremo, sensación de vacío, irritabilidad. Es hormonal, no es señal de que "algo estuvo mal". Saber que va a pasar reduce su impacto.

El "top drop" es el equivalente para la persona que da: culpa ("¿le hice daño?"), cansancio, sensación de desconexión. Menos discutido pero igual de real.

Cómo manejarlo:

- **Antes de la escena:** avisar a tu pareja que puede pasar. Tener un plan (comida, agua, contacto) para después.
- **Durante la escena:** no lo notes todavía — se nota horas después.
- **Después:** tener tiempo libre el día siguiente. No planificar actividades intensas. Permitir bajones sin dramatizar.
- **Si es recurrente o severo:** hablar con un profesional. No toda práctica tiene que ser curativa.

## Códigos de honor (hard limits, soft limits)

Antes de cualquier sesión, las personas negocian:

- **Hard limits** (límites absolutos): "esto NUNCA, ni siquiera si me conoces bien, ni siquiera en estado alterado, ni siquiera si me ofrezco en el momento". Se respetan siempre, sin excepción.
- **Soft limits** (límites suaves): "esto con cuidado, solo en ciertas condiciones, con preparación". Pueden expandirse con el tiempo y la confianza.
- **Fantasías vs. realidades**: hay cosas que excitamos en fantasía y no queremos en la realidad. Es importante distinguirlas. Lo que alguien dice que "le gustaría probar" no es lo mismo que "va a probar". La negociación no se apura.

## El aftercare de la comunidad

En maškaráda, el aftercare es parte del dresscode emocional. Las reglas de la comunidad (página /reglas) cubren:

- Stop = stop, sin preguntas
- Después de una escena, conversación breve con quienorganizó o con alguien de confianza
- Si alguien está en sub drop, no está solo — la comunidad lo acompaña
- Si el aftercare de una persona es más largo que el promedio, se respeta. No hay apuro.

## Para seguir aprendiendo

- [Your first play party](/aprender/primera-fiesta) — qué esperar cuando asistís
- [Negotiation 101](/aprender/negociacion) — cómo hablar de lo que querés
- [Sub drop and aftercare](/aprender/sub-drop) — más detalle
- [The rules of maškaráda](/reglas) — protocolo específico de esta comunidad
`,
    relatedSlugs: ["que-es-bdsm", "primera-fiesta", "sub-drop", "negociacion"]
  },
  {
    slug: "primera-fiesta",
    title: "Tu primera fiesta: qué esperar y cómo prepararte",
    category: "logistics",
    readMinutes: 5,
    excerpt:
      "Ya decidiste ir. Esto es lo que pasa: el dresscode, la entrada, los espacios, la etiqueta. Una guía paso a paso para que llegues con la información que necesitás.",
    body: `## Antes de ir

Antes de decidir ir a una fiesta (como las de maškaráda o cualquier evento de kink en cualquier ciudad), hay algunas preguntas para hacerse:

- **¿Estoy cómodo/a con la idea de estar en un espacio donde puede pasar de todo?** La fiesta no es un espectáculo: es un espacio abierto. Algunas personas van a estar teniendo escenas en público. Si te incomoda ver intensidad, este no es tu espacio (todavía).
- **¿Tengo la energía emocional para una noche larga?** Las fiestas suelen empezar tarde (22:00) y extenderse hasta 3-5am. Si tenés una semana difícil, no es la noche.
- **¿Tengo con quién ir o al menos a quién avisar que voy?** Ir solo está bien, pero la primera vez es mejor tener un amigo/a conocido/a o algún contacto.

## Qué llevar

**Ropa (cumplir el dresscode).** Las fiestas de kink suelen tener dresscode específico. Para maškaráda: dark, sexy, leather, lace, latex, fetish, fantasy, o simplemente vos. NO ropa casual (jeans, remeras comunes, jogging, chancletas). El ingreso puede ser denegado por dresscode — no es personal, es protocolo.

**Identificación.** La entrada es +18 estricto. Sin DNI no entrás. Sin excepción.

**Efectivo.** Para propinas, donaciones, o compras pequeñas. No todas las fiestas aceptan tarjeta.

**Lo que NO necesitás llevar:** objetos personales de valor, alcohol en exceso, expectativas rígidas. Las fiestas no son performances. Son espacio. Lo que pase, pasa.

## Cómo llegar

Llega temprano. No porque "lo bueno se acaba" (no es así), sino porque la primera hora suele ser la más social: llegás, te ubicás, ves el espacio, conocés a gente con la cabeza fresca. Llegar tarde te pone en un espacio ya activo sin tiempo de aclimatarte.

Si tenés un contacto de la comunidad (alguien que te invitó, un amigo que ya va), avisale que llegaste. Si vas solo, el staff o las personas de "puerta" (gatekeepers) son tu primer punto de contacto. Están para ayudarte.

## Al llegar: puerta y check-in

En la mayoría de los eventos:

1. **Te reciben en la puerta.** Una persona del staff. Suele ser amigable, explica las reglas básicas, te pregunta si tenés preguntas.
2. **Confirmás +18.** DNI en mano, sin excepción.
3. **Te explican el espacio.** Dónde está el baño, dónde está la zona de bar/social, dónde están las zonas de juego, dónde está el cuarto de aftercare (si lo hay), qué zonas son de "solo mirar" vs "puedes interactuar".
4. **Te aclaran las reglas.** Generalmente: no fotos, no celulares en zonas de juego, palabras de seguridad respetadas siempre, "no significa no".
5. **Te dan una pulsera o marca** (en algunas fiestas) que indica: novato, experimentado, o tipo de rol. No siempre — depende del evento.

Pregunta lo que necesites. La puerta es un lugar seguro para preguntar "¿qué hace este evento?" sin compromiso.

## Durante: cómo moverte

**Empezá en la zona social.** El bar, el área de conversación. La gente se acerca, habla, se presenta. No hay obligación de "ver acción" inmediatamente. Puedes quedarte en la zona social toda la noche y haber disfrutado.

**Si querés observar las zonas de juego,** pregunta antes de acercarte a una escena en curso. Las personas que están en una escena pueden no estar disponibles para conversar. Algunas escenas son "públicas" (los organizadores las presentan), otras son "abiertas pero íntimas" (puedes mirar, no interactuar). Preguntar al staff cuál es cuál.

**Si querés participar,** generalmente hay una persona que organiza. Te conoce, te pregunta qué te interesa, te presenta a alguien compatible. La organización es importante — sin ella, las escenas tienden a ser "entre las mismas 5 personas".

**Si algo te incomoda,** sal de la zona. No tienes que terminar la fiesta si algo te atravesó. Puedes ir al baño, al área de aftercare, a la zona social, o irte. No es drama.

**Si alguien te incomoda específicamente,** decile al staff. La comunidad protege a las personas de comportamiento inapropiado. El bloqueo en maškaráda existe por una razón.

## La hora de irse

No hay hora "correcta" de irse. Algunos indicadores:

- **Tu cuerpo te dice que ya está bien** — cansancio, sensación de plenitud, necesidad de silencio. Honrá eso.
- **Querés una conversación larga con alguien** — eso vale más que otra hora de fiesta.
- **Tenés trabajo al día siguiente** — irse antes de las 2am te deja funcional. Quedarte hasta las 5am te deja muerto al día siguiente.

Cuando te vayas: despedite de quien quieras (no es obligatorio), agradecé a quien te invitó o a la organización, y andate tranquilo. El after continues mañana: descanso, agua, comida, silencio si lo necesitás.

## Qué NO hacer en tu primera fiesta

- No llegar en estado alterado. La comunidad no acepta personas intoxicadas en zonas de juego.
- No tomar fotos ni videos. Nunca. Aunque veas algo "instagrameable". La privacidad es ley.
- No asumir consentimiento por estar en la fiesta. Cada persona sigue siendo una persona.
- No acosar a alguien que te interesa. Si el interés no es mutuo, se respeta.
- No tratar las escenas ajenas como performance para tu entretenimiento. Son reales para las personas que las viven.
- No intentar "probar todo" en una noche. La primera fiesta es para ambientarse. Las próximas son para explorar.

## Después: integración

Después de tu primera fiesta:

- **Procesá lo que viste.** A veces una escena observada te toca más de lo que esperabas. Es normal.
- **Hablar ayuda.** Con alguien de confianza, o con la comunidad. La experiencia vivida se integra mejor cuando se comparte.
- **Si no volvés:** también está bien. La primera fiesta no es una sentencia. Es una experiencia.

## Para seguir aprendiendo

- [Palabras de seguridad y aftercare](/aprender/palabras-seguridad)
- [Las reglas de maškaráda](/reglas) — protocolo específico
- [FAQ de la comunidad](/faq) — preguntas frecuentes
`,
    relatedSlugs: ["que-es-bdsm", "palabras-seguridad", "reglas"]
  },
  {
    slug: "negociacion",
    title: "Negociación 101: cómo hablar de lo que querés",
    category: "communication",
    readMinutes: 6,
    excerpt:
      "La negociación es la habilidad más importante del kink. Lo que preguntás, lo que no preguntás, cómo decir sí y cómo decir no. Una guía práctica para conversaciones que mucha gente evita.",
    body: `## Por qué la negociación es el centro de todo

En el kink, todo acto consensuado se negocia antes. No en el momento. No por gestos ambiguos. No "sobreentendido". Se habla.

La negociación no es sexy, no es espontánea, no es "romántica" en el sentido tradicional. Es la base sobre la cual todo lo demás se construye. Sin buena negociación, la práctica más intensa se vuelve abuso. Con buena negociación, la práctica más simple se vuelve profunda.

## Antes de la conversación

Antes de negociar una sesión o un encuentro, vale la pena tener claro:

- **Mis propios límites.** ¿Qué sé que no quiero? ¿Qué sé que quiero probar? ¿Qué me da curiosidad pero no sé si quiero?
- **Mis necesidades físicas y emocionales.** ¿Tengo alguna lesión, alergia, condición médica relevante? ¿Estoy en un momento emocional difícil? ¿Tomo alguna medicación que afecte la percepción?
- **Mi nivel de experiencia.** ¿Es mi primera vez con esto? ¿La décima? ¿Tengo experiencia pero hace tiempo? La honestidad sobre el nivel de experiencia es parte de la seguridad.

No se necesita tener todo claro antes de hablar. La negociación ES el lugar donde se aclaran las cosas.

## La conversación

Una buena negociación es directa, específica, y respeta el ritmo de ambas personas. No hay una sola forma, pero algunos principios:

### 1. Empezá fuera de la escena

La negociación previa a una sesión se hace vestidos, sentados, con tiempo. No en plena excitación. No en el auto yendo al evento. No por texto cuando una persona está distraída.

Algunos espacios donde negociar:
- Una cena previa
- Un café o una llamada
- Por texto ANTES del día (no el día, no en el momento)
- Un formulario escrito de límites (común en eventos grandes)

### 2. Usá lenguaje claro

"No quiero X" es claro. "No me gusta mucho" es ambiguo. Cuanto más específico, mejor.

Términos útiles:

- **Sí / No / Quizás** — categorías simples para empezar
- **Hard limit** (límite absoluto) — "esto nunca"
- **Soft limit** (límite suave) — "esto solo con estas condiciones"
- **Fantasía** (no necesariamente quiero hacerlo realidad) — "me excita pensarlo, no sé si quiero vivirlo"
- **Curiosidad** (quiero explorar) — "nunca lo hice, me llama la atención"
- **Experiencia previa** (ya lo hice) — "lo hice, me gustó, me gustaría repetir"
- **Después** — "necesito X minutos de aftercare / necesito comer / necesito silencio"

### 3. Preguntá, no asumas

Las personas varían enormemente. Lo que una asume que "todo el mundo sabe" puede ser único para ella. Preguntar es cuidado. Asumir es riesgo.

Preguntas útiles para empezar:
- ¿Qué te gusta?
- ¿Qué no te gusta?
- ¿Tenés algo que sea límite absoluto para vos?
- ¿Qué necesitás después?
- ¿Tenés alguna condición médica relevante?
- ¿Hay algo que te da curiosidad pero nunca probaste?
- ¿Tenés alguna alergia (latex, aceites, materiales)?

### 4. Escuchá, no solo preguntés

La negociación no es un formulario. Es conversación. La persona que está del otro lado puede tener cosas que decir que vos no preguntaste. Dar espacio. Escuchar. Si la persona tarda, esperar. Si la persona titubea, no presionar. Si dice "no sé", eso es un dato: no sabe.

### 5. Es un proceso continuo

La primera negociación no es la última. Las personas cambian. Los límites se expanden o contraen según la confianza, la experiencia, la vida. Una buena práctica es **re-negociar periódicamente** — al inicio de cada relación nueva, después de eventos importantes, cuando algo cambia.

## El "no" como dato

El "no" no necesita explicación. Si alguien dice "no quiero X", eso es todo lo que necesitás saber. No tenés derecho a "¿por qué?". No tenés que negociar el "no". El "no" se acepta y se agradece.

La persona que dice "no" a algo también está diciendo "sí" a otras cosas. Escuchar el "no" como información sobre límites, no como rechazo a la persona, es fundamental.

## Sí, pero con cuidado

Hay un patrón común: "sí, pero con cuidado". Es válido. Especificá qué cuidado. "¿Con preservativo?" "¿Con una palabra de seguridad?" "¿Con alguien de confianza presente?" Cada cuidado es una variable, no un sí o no absoluto.

## Cuando las negociaciones no salen bien

A veces, la negociación revela que dos personas no son compatibles. No como personas — como potenciales compañeros de juego. Eso está bien. Una de las habilidades más valiosas del kink es saber decir "no somos compatibles" sin drama.

A veces, la negociación revela que una persona no respeta límites. Eso es una bandera roja grande. Salir de ahí.

## Después de la negociación

Una vez que se negocia:

- **Anotá los acuerdos.** Mental o escrito. Especialmente para escenas intensas, un formulario escrito es una práctica común.
- **Respetá los acuerdos en el momento.** La negociación no es opcional en medio de una escena.
- **Después de la escena, conversá.** Qué funcionó, qué no, qué repetir. Eso es retroalimentación para la próxima.

## En la comunidad maškaráda

La organización de maškaráda promueve la negociación explícita. En los eventos:

- Hay personas de staff que pueden mediar si dos personas no se conocen.
- Las zonas de juego son consensuadas. Nadie te toca sin tu palabra.
- El staff puede intervenir si percibe que algo no es consensual.
- Si tenés una mala experiencia de negociación, podés reportar al staff para bloquear a esa persona en futuros eventos.

## Para seguir aprendiendo

- [Palabras de seguridad y aftercare](/aprender/palabras-seguridad)
- [Sub drop y top drop](/aprender/sub-drop)
- [FAQ de la comunidad](/faq)
`,
    relatedSlugs: ["que-es-bdsm", "palabras-seguridad", "sub-drop"]
  },
  {
    slug: "sub-drop",
    title: "Sub drop, top drop y el bajón post-escena",
    category: "safety",
    readMinutes: 5,
    excerpt:
      "Horas o un día después de una escena intensa, una persona puede sentir tristeza, vacío o agotamiento extremo. Es hormonal, no es señal de error. Cómo prepararse, cómo manejarlo, cuándo pedir ayuda.",
    body: `## Qué es el sub drop

El "sub drop" (o "submissive drop") es un bajón emocional y físico que puede ocurrir horas o incluso un día después de una escena intensa. Síntomas típicos:

- Tristeza sin causa identificable
- Llanto inesperado
- Cansancio extremo
- Sensación de vacío o desconexión
- Irritabilidad
- Dificultad para dormir o dormir demasiado
- Pensamientos negativos sobre uno mismo

El sub drop NO es señal de que la escena estuvo mal. NO es que la persona "no está hecha para esto". Es una respuesta neuroquímica normal: el cuerpo liberó oxitocina, dopamina, adrenalina, endorfinas durante la escena. Cuando bajan, el sistema nervioso necesita recalibrar. Es un proceso hormonal, no emocional en el sentido de "lamentar lo que pasó".

## El equivalente para quien da: top drop

El "top drop" es el bajón de la persona que da las órdenes o realiza los actos intensos. Síntomas:

- Culpa intensa ("¿le hice daño?")
- Cansancio
- Sensación de desconexión
- Pensamientos repetitivos sobre la escena
- A veces, tristeza sin causa

Menos discutido que el sub drop, pero igual de real. Quien da también procesa hormonas, también vive la intensidad, también necesita aftercare.

## Por qué pasa

El cerebro durante una escena intensa libera:

- **Adrenalina** — el estado de alerta, el "rush"
- **Endorfinas** — los opiáceos naturales del cuerpo, euforia
- **Oxitocina** — la "hormona del vínculo", sensación de conexión
- **Dopamina** — el sistema de recompensa, placer anticipatorio

Durante la escena, el cuerpo está bañado en estas sustancias. Después, los niveles caen. La caída es hormonal. No es psicológica, no es "arrepentimiento", no es "trauma". Es la respuesta normal del cuerpo al cambio neuroquímico.

## Cómo prepararse

**Antes de la escena:**
- Avisá a tu(s) pareja(s) que el sub/top drop puede pasar. No es un secreto.
- Reservá tiempo DESPUÉS de la escena para descansar. No para "ir a trabajar al día siguiente".
- Tené comida preparada, agua, mantas, un lugar tranquilo. El aftercare inmediato es la primera línea de defensa.

**Durante la escena:**
- Disfrutá. El sub drop ocurre porque algo fue intenso. La intensidad es parte del valor.

**Después de la escena (inmediato):**
- Conversación post-escena — qué gustó, qué no, qué repetir
- Contacto reconfortante si ambos lo quieren
- Agua, comida ligera
- Tiempo: mínimo 20-30 minutos de transición

**24-48 horas después:**
- Si sentís bajón, NO entres en pánico. Es esperado.
- Mantené contacto con tu(s) pareja(s). Un mensaje "estoy sintiendo bajón, no te preocupes, solo quería que sepas" ayuda mucho.
- Comé bien. Dormí. Evitá decisiones grandes (el cerebro no está en su mejor momento).
- Si tenés que estar en un espacio de concentración (trabajo, estudio), avisá que puede haber cansancio.

## Cuándo NO es sub drop

A veces, lo que parece sub drop es:

- **Una escena que cruzó un límite no negociado.** Si sentís que algo no estuvo bien, eso es información importante. Hablar con la persona. Si no podés, hablar con un tercero de confianza o con un profesional.
- **Un trigger emocional preexistente.** A veces la escena activa una memoria o emoción que no tiene que ver con la escena. La práctica responsable incluye conocer tus triggers y negociarlos.
- **Una crisis vital no relacionada.** El cansancio, la tristeza y la irritabilidad también vienen de duelos, cambios, estrés. No todo bajón es post-escena.

## Cuándo pedir ayuda profesional

- Si el bajón dura más de una semana
- Si pensás en hacerte daño
- Si el bajón escala en intensidad con cada escena
- Si tenés flashback o pesadillas
- Si la práctica empeora una condición preexistente (depresión, ansiedad, trauma)

Un terapeuta con experiencia en sexualidad alternativa o kink-aware puede ayudar. La NCSF (National Coalition for Sexual Freedom) tiene un directorio de profesionales kink-aware en varios países: https://ncsfreedom.org/resources/kink-aware-professionals-directory/

En Paraguay y la región: la red de profesionales kink-aware está creciendo. El equipo de maškaráda puede recomendar contactos en Asunción si los necesitás.

## Para quien acompaña a alguien con sub drop

Si tu pareja (o alguien cercano) está experimentando sub drop:

- **No minimices** ("es solo hormonal, ya se te pasa") — aunque sea verdad, decirlo así no ayuda. Escuchá.
- **No abandones** — presencia importa. Un mensaje "estoy pensando en vos" puede ser suficiente.
- **No intentes arreglar** — no hay nada que arreglar. Solo acompañar.
- **No uses la vulnerabilidad para más escena** — el sub drop no es una oportunidad para más intensidad. Es un momento de cuidado.

## El aftercare prolongado en la comunidad

En maškaráda, el aftercare no termina cuando termina el evento. La comunidad está disponible para acompañar en las horas y días siguientes. Si experimentás un sub drop significativo, podés escribir al staff — sin compromiso, sin costo.

## Para seguir aprendiendo

- [Palabras de seguridad y aftercare](/aprender/palabras-seguridad)
- [Tu primera fiesta](/aprender/primera-fiesta)
- [Negociación 101](/aprender/negociacion)
`,
    relatedSlugs: ["palabras-seguridad", "que-es-bdsm", "negociacion"]
  },
  {
    slug: "glosario",
    title: "Glosario de términos del kink y el BDSM",
    category: "glossary",
    readMinutes: 8,
    excerpt:
      "Un glosario de los términos más usados en la comunidad kink. No exhaustivo, no académico — pensado para que cuando escuches algo en un munch o en una escena, entiendas de qué se habla.",
    body: `## Roles

- **Top / Dom / Dominant / Master / Sir / Mistress / Daddy / Mommy** — la persona que toma el control activo en una escena. El rol activo, quien dirige.
- **Bottom / Sub / Submissive / Slave / Pet / Boy / Girl / Little** — la persona que entrega el control. El rol receptivo.
- **Switch** — una persona que disfruta ambos roles según el contexto, la pareja o el momento. Es más común de lo que se cree.
- **Versatile** — específicamente sobre posiciones en sexo, no sobre roles en kink.

## Dinámicas

- **D/s** — Dominant/submissive. Relación o escena de poder.
- **M/s** — Master/slave. Una forma más profunda de D/s, con protocolos y roles más permanentes.
- **TPE** — Total Power Exchange. La persona sumisa entrega TODAS las decisiones de la vida cotidiana (qué comer, cuándo dormir, etc.) a su Dom. Es una práctica de 24/7.
- **D/s 24/7** — Una dinámica de poder que no termina cuando la escena termina. Implica protocolos permanentes.
- **Bedroom-only** — D/s que solo ocurre en escenas, no en la vida cotidiana.
- **DDlg** — Daddy Dom / little girl. Una dinámica con tono de cuidado parental (no sexual o no exclusivamente sexual).
- **Mommydom** — Misma estructura, con la figura maternal.

## Prácticas

- **Bondage / Atadura** — restricción de movimiento, con cuerda, cuero, metal, etc.
- **Shibari / Kinbaku** — atadura con cuerda, originada en Japón. "Shibari" significa "atar" en japonés.
- **Rope bondage** — término genérico en inglés. A veces se usa como sinónimo de shibari.
- **Impact play** — golpear con manos, palas, fustas, varillas. Ver guía detallada.
- **Sensation play** — trabajar con sensaciones: calor, frío, texturas, vibración.
- **Sensory deprivation** — reducir estímulos: vendas, tapones, aislamiento.
- **Edge play** — prácticas en los límites. No necesariamente peligroso, pero intenso.
- **Watersports / Golden showers** — juegos con orina.
- **Fisting** — penetración con la mano completa (no solo dedos).
- **CBT** — Cock and ball torture. Juego genital masculino.
- **Pussy torture / Genital play** — equivalentes en vulva.
- **Breath play** — juegos con restricción de respiración. **MUY RIESGOSO.** Requiere experiencia específica.
- **Fire play** — juegos con fuego (vela, flash paper, etc.). Requiere equipo y experiencia.
- **Knife play** — juegos con cuchillos (generalmente sin cortar). Requiere experiencia.
- **Wax play** — cera caliente. Requiere cera específica (punto de fusión bajo) y protocolo.
- **Needle play** — acupuntura para juego.
- **Electro play / E-stim** — estimulación eléctrica (TENS unit).
- **Pet play** —扮演 de mascota (gato, perro, pony). Conlleva protocolos y roles.
- **Pony play** — variante de pet play centrada en equitación.
- **Age play** — juego con dinámicas de edad (no necesariamente sexual). DDlg entra en esta categoría.

## Roles y personas específicas

- **Brat / Brat tamer** — una sub que provoca, desobedece, "se porta mal" como forma de juego. El brat tamer es el Dom que "corrige" la rebeldía.
- **Primal** — alguien cuya dinámica de poder se basa en lo "salvaje" / "instintivo" más que en la autoridad jerárquica. Los "primal predators" y "primal preys" son los roles.
- **Furry** — alguien que participa de la subcultura furry (anthropomorfismo). Puede ser kink o no.

## Lugares y comunidades

- **Dungeon** — espacio físico dedicado a practicar kink. Privado o comercial.
- **Play party / Fiesta** — un evento donde la gente se reúne para practicar (maškaráda es una).
- **Munch** — un encuentro social público (generalmente en un bar) donde la gente de kink se conoce sin play. La puerta de entrada más común.
- **Dungeon monitor (DM)** — la persona que supervisa la seguridad en un dungeon o fiesta. Puede intervenir si algo no es consensual.
- **Gatekeeper** — la persona en la puerta que verifica edad, dresscode, explica reglas.
- **House** — un grupo de personas que comparten prácticas regulares. Puede tener jerarquías internas.

## Protocolos y acuerdos

- **SSC — Safe, Sane, Consensual** — Sano, Seguro y Consensuado. Marco de seguridad.
- **RACK — Risk-Aware Consensual Kink** — Kink consensuado con conciencia del riesgo. Marco más realista que SSC.
- **PRICK — Personal Responsibility, Informed Consensual Kink** — Responsabilidad personal, kink consensuado informado. Marco aún más explícito.
- **CCC — Committed, Compassionate, Consensual** — Comprometido, compasivo, consensuado. Marco de algunas comunidades.
- **Hard limit** — un límite absoluto. No se negocia, no se reconsidera.
- **Soft limit** — un límite suave. Se puede explorar con cuidado, condiciones, y confianza.
- **Safeword** — la palabra o gesto que detiene toda actividad inmediatamente.
- **Traffic light system** — verde/amarillo/rojo para comunicación durante la sesión.
- **Negotiation** — la conversación previa sobre límites, deseos, condiciones.
- **Aftercare** — el cuidado post-escena.
- **Sub drop / Top drop** — el bajón hormonal post-escena.
- **Scene** — una sesión de kink con principio, desarrollo y cierre.
- **Drop** — el bajón general post-escena.
- **Subspace** — el estado alterado de conciencia que algunas personas alcanzan durante la sumisión profunda.
- **Top space** — equivalente para quien da.

## Roles en el equipo de un evento

- **Host** — quien organiza el evento.
- **Door / gatekeeper** — la persona en la entrada.
- **DM (dungeon monitor)** — quien supervisa la seguridad durante el evento.
- **Bartender** — quien sirve alcohol (si el evento lo tiene).
- **Photographer** — fotógrafo oficial (si el evento tiene). Las fotos NUNCA son para publicación sin consentimiento.
- **Vetted / unvetted** — si una persona fue aprobada por un proceso de evaluación de la comunidad. En eventos más exclusivos, solo vetted.

## Otros términos

- **Fetish** — una atracción sexual específica hacia un objeto, material, parte del cuerpo, o escenario (no personas).
- **Kink** — un interés sexual o práctica no convencional. A veces sinónimo de BDSM, a veces más amplio.
- **Vanilla** — convencional, sin kink.
- **Switch** — ver arriba.
- **Scene / escena** — ver arriba.
- **Edge play** — ver arriba.
- **Fluffy** — prácticas suaves, no intensas, sin dolor.
- **Heavy** — prácticas intensas, con dolor, riesgo físico o emocional alto.
- **Protocol** — los rituales o reglas acordados (cómo pararse, cómo hablar, qué称呼 usar).
- **Honorific** — el称呼 que la sumisa usa para el Dom (Sir, Master, Daddy, etc.).
- **Collaring** — el acto simbólico de "collar" a una sumisa. Una ceremonia de compromiso.
- **24/7** — práctica continua, no solo en escenas.

## Siglas

- **BDSM** — Bondage, Discipline, Dominance, Submission, Sadism, Masochism
- **D/s** — Dominant/submissive
- **M/s** — Master/slave
- **TPE** — Total Power Exchange
- **CBT** — Cock and Ball Torture
- **DDlg** — Daddy Dom / little girl
- **SSC / RACK / PRICK / CCC** — marcos de seguridad
- **DM** — Dungeon Monitor
- **DD** — Daddy Dom

---

## Para seguir aprendiendo

- [¿Qué es BDSM?](/aprender/que-es-bdsm) — overview
- [Palabras de seguridad](/aprender/palabras-seguridad) — protocolos
- [Negociación 101](/aprender/negociacion) — cómo hablar
- [Sub drop y top drop](/aprender/sub-drop) — bajones
`,
    relatedSlugs: ["que-es-bdsm", "palabras-seguridad"]
  }
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
