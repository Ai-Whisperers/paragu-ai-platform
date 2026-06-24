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
  },

  // ── TIER 1: foundational gaps ─────────────────────────────────────
  {
    slug: "hospedar-un-munch",
    title: "Cómo organizar un munch: la puerta de entrada a la comunidad",
    category: "logistics",
    readMinutes: 8,
    excerpt:
      "Un munch es un encuentro social público (generalmente en un bar o café) donde personas kink se conocen sin juego. Cómo organizarlo, facilitarlo, y hacerlo accesible a gente nueva.",
    body: `## ¿Qué es un munch?

Un **munch** (de "Munchausen", jerga interna) es un encuentro social de la comunidad kink, usualmente en un bar, café o restaurante, donde las personas se conocen **sin práctica**. No hay juego, no hay zona de bondage, no hay ropa fetish. La conversación es normal. La única diferencia con cualquier juntada de amigos es que todos los presentes saben que el resto está en kink.

El munch es la **puerta de entrada a la comunidad**. La mayoría de las personas que hoy tienen una vida kink activa llegaron a su primer munch por curiosidad, invitación de un amigo, o búsqueda en internet.

## Por qué los munches importan

- **Conexión social sin presión.** El primer paso no es ir a un evento formal. Es conocer gente en un espacio neutral.
- **Aprendizaje entre pares.** Se aprende más en una hora de conversación con tres personas experimentadas que en seis meses de internet.
- **Construcción de comunidad.** Las amistades kink se vuelven soporte emocional, logístico, y de seguridad a largo plazo.
- **Filtrado natural.** Las personas que son hostiles, agresivas, o no respetan límites **se notan rápido** en un espacio social sin play. Eso los filtra antes de los eventos.

## Cómo organizar uno

### Antes

1. **Conseguí un lugar.** Un bar o café con un rincón tranquilo (idealmente 6-15 personas). Hablá con el/la dueña: "somos un grupo de hobby que se reúne mensualmente, compramos algo del menú, somos tranquilos". No tenés que explicar qué es kink.
2. **Fecha y hora recurrentes.** "Primer sábado del mes, 19:00" es mejor que fechas esporádicas. La gente se acostumbra y la planificación se vuelve automática.
3. **Quién viene.** Empezá con tu círculo cercano (3-5 personas de confianza). Cada uno trae a alguien nuevo. El boca a boca hace el resto.

### El día

- **Llegá 15 min antes.** Para hablar con el staff del bar, elegir mesa, y estar relajado/a cuando llegue la primera persona nueva.
- **Tené un "pack de bienvenida" mental.** Si alguien llega por primera vez: "Hola, soy [nombre], bienvenido/a. ¿Cómo llegaste? ¿Querés un café?". Tres frases. Sin asumir nada.
- **Un/a facilitador/a designado/a.** Una persona que se hace cargo de las pausas, las conversaciones difíciles, y de integrar a gente nueva. No un moderador, un facilitador.
- **No temas redirigir.** Si alguien hace una pregunta fuera de lugar, está borracho/a, o está incomodando: intervención breve y amable. "Ey, podemos hablar de eso en otro momento, hay gente nueva hoy" es suficiente.

### Reglas del espacio

Publicá reglas básicas en la invitación (o en la descripción del grupo):

- **Respeto absoluto.** Especialmente a personas nuevas.
- **Lo que se habla en el munch, queda en el munch.** (Igual que cualquier juntada con gente que se está conociendo.)
- **No se fotografía sin consentimiento explícito de cada persona en el cuadro.**
- **Cero presión para participar, jugar, o tener pareja.**
- **Si algo te incomoda, podés irte sin explicación.**

## Errores comunes

- **"Nadie vino."** Los primeros 2-3 meses van a ser chicos. Es normal. La constancia importa más que el tamaño.
- **Mezclar alcohol y newcomers.** Una persona borracha puede arruinar el espacio para alguien que está dando sus primeros pasos. Si alguien tomó de más, hablarle en privado.
- **Hacerlo en tu casa.** El munch es público. Eventualmente, en un bar. Una casa genera problemas de seguridad y excluye a gente que no conoce a nadie.
- **Olvidarse de la gente nueva.** Si llegan 3 personas nuevas y 8 viejas, las viejas van a conversar entre ellas. Asigná a alguien la tarea explícita de "hablarle a las caras nuevas."

## Cómo invitar gente nueva

Las personas que más necesitan un munch son las que **nunca fueron a uno**. La barrera típica:

- "No conozco a nadie" → normal. Es la primera vez para todos.
- "¿Qué me pongo?" → ropa de calle, cómoda, sin expectativa de dresscode.
- "¿Tengo que tener experiencia?" → no. El munch es para curiosos.
- "¿Y si me cruzo con alguien que conozco?" → confidencialidad estricta. El munch es un espacio seguro o no es munch.

## Después de los primeros 3-6 meses

- **Ritualizá.** Un tema por mes ("este mes hablamos de palabras de seguridad", "este mes cada uno cuenta su primer evento"). Hace que la gente vuelva.
- **Conectá con el resto del calendario.** "Si te interesa el shibari, el mes que viene hay un rope jam". El munch no es el destino final: es el hub.
- **Protegé la cultura.** Si alguien se vuelve problemático, hablá en privado. Si el patrón se repite, no lo/a invites más. Las comunidades chiquitas se destruyen por no hacer esto.

## Para cerrar

Un munch no es un evento grande. Es un grupo de gente que se junta, se conoce, y se cuida. Si llega a 12 personas, es exitoso. Si la gente nueva vuelve al mes siguiente, es exitoso. Si alguien que llegó asustado/a sale diciendo "estuvo bueno, vuelvo el mes que viene", es exitoso.

El munch no necesita marketing, necesita consistencia.
`,
    relatedSlugs: ["que-es-bdsm", "primera-fiesta", "comunidad"]
  },
  {
    slug: "consentimiento-fotografico",
    title: "Consentimiento fotográfico: la diferencia entre documentar y exponer",
    category: "safety",
    readMinutes: 7,
    excerpt:
      "Por qué el consentimiento de cada persona fotografiada es innegociable, qué se necesita para que una foto sea publicable, y cómo funciona el modelo de liberación (release) que usamos en maškaráda.",
    body: `## El principio

Cada persona en una foto, vídeo, o registro es **una persona**. No un fondo, no un "ambiente", no "parte de la noche". Si la cara o el cuerpo son identificables (incluso tatuajes, ropa característica, peinado, ubicación visible), esa persona tiene derecho a vetar el uso de la imagen.

No es negociable. No es "si después le preguntamos". Es **antes**.

## Por qué importa

- **El kink sigue siendo estigmatizado.** Una foto subida a redes puede tener consecuencias laborales, familiares, personales que el fotógrafo nunca anticipó. Una persona "out" en el munch no necesariamente quiere ser visible en una story.
- **El estado alterado no es consentimiento.** La gente en un evento está bajo efectos de alcohol, euforia, sub space, cansancio. Eso no es consentimiento para que la imagen sea pública. La euforia de las 3am no vale como firma.
- **El uso es acumulativo.** Una foto que vos subís a tu Instagram "personal" puede ser screenshot-eada y compartida en grupos que la persona no controla. Una vez que sale, sale.
- **Las consecuencias son asimétricas.** El fotógrafo, el community manager, la organización, no sufren las consecuencias. La persona de la foto, sí.

## El modelo de maškaráda

En maškaráda usamos un sistema de **consentimiento escrito por evento**, escaneado o firmado al ingreso (digital o papel). Cada persona firma:

- **Qué eventos autoriza.** Por edición, no genérico.
- **Para qué uso.** Web pública, redes sociales, archivo interno, o una combinación.
- **Opcional.** Nadie tiene que firmar para entrar. Si no firmás, no se publica ninguna imagen en la que aparezcas identificable.
- **Retirable.** Podés retirar el consentimiento en cualquier momento, incluso después de que la foto se publicó. La foto se despublica.

La plantilla está en [/consentimiento](/consentimiento) y se puede firmar digitalmente desde cualquier celular.

## Lo que el fotógrafo oficial tiene prohibido

- **Tomar fotos de personas que no firmaron.** Ni "de espaldas", ni "con máscara", ni "no se ve la cara". Si la persona no firmó, la cámara no apunta a esa persona.
- **Subir fotos a redes propias sin proceso de curación.** El fotógrafo sube todo al equipo. El equipo elige. La foto se publica con un crédito a la persona. La persona que aparece es notificada antes de la publicación.
- **Vender fotos.** Las fotos de eventos no se venden sin consentimiento adicional.

## Lo que los asistentes pueden hacer

- **Pedir que no les saquen fotos.** La organización tiene identificadores visibles (stickers, pulseras) para personas que no autorizan. Si ves el identificador, no apuntes la cámara.
- **Pedir que se borre una foto específica.** "Esa foto donde aparezco con la cara visible, por favor no la suban" se respeta siempre, sin excepciones.
- **Revisar antes de la publicación.** Para eventos de gran formato, las fotos seleccionadas se envían a las personas que aparecen para revisión. Si alguien no responde en 48h, la foto se despublica.

## Lo que NO se considera consentimiento

- "Estaba ahí y no me opuse" — no es consentimiento. Es silencio. El silencio nunca es consentimiento para la imagen pública.
- "Estaba con poca ropa" — no es consentimiento. La elección de vestimenta no autoriza la foto.
- "Era una foto grupal" — no es consentimiento. Una foto grupal requiere el consentimiento de cada persona identificable.
- "Es una foto artística" — no es consentimiento. La intención artística no anula el derecho de la persona.
- "Era público" — no aplica. Un evento privado con dresscode y entrada no es público en el sentido legal o social.

## El caso del "ambiente"

Una foto de un cuarto lleno de gente, donde no se ven caras, puede publicarse. Una foto de una multitud en un concierto, donde hay mil personas, puede publicarse. Pero una foto de "tres personas jugando bondage en el rincón" requiere el consentimiento escrito de las tres, **incluso si están enmascaradas** (porque el cuerpo, la ropa, el tatuaje, la postura, las hacen identificables para quien las conoce).

## En resumen

1. Consentimiento escrito, antes, por evento.
2. Sin foto sin firma.
3. Retirable en cualquier momento.
4. El equipo de maškaráda procesa y notifica antes de publicar.

Esto no es un "nice to have". Es la línea base. Si alguien quiere fotos en su evento privado, con un grupo pequeño, con todas las firmas recogidas, perfecto. Pero en un evento organizado, el fotógrafo no trabaja sin consentimiento previo.
`,
    relatedSlugs: ["que-es-bdsm", "reglas", "que-es-bdsm"]
  },
  {
    slug: "marcando-limites",
    title: "Marcando límites: hard, soft, y lo que queda en el medio",
    category: "communication",
    readMinutes: 7,
    excerpt:
      "Cómo distinguir lo que sí, lo que no, y lo que depende. Una guía práctica para negociar escenas con personas nuevas o con pareja de hace años.",
    body: `## La taxonomía básica

En la negociación kink, los límites se dividen en tres categorías:

- **Hard limit (límite duro):** No, en ninguna circunstancia, no negociable, no esta vez, no la próxima, no nunca. Punto.
- **Soft limit (límite blando):** No por ahora, o no en este contexto, o con esta persona no, o después de una conversación específica. Puede cambiar con el tiempo.
- **Yes (verde / go):** Sí, con gusto, en este contexto, con estas condiciones.

La negociación explícita de los tres es lo que distingue un encuentro bien hecho de uno que termina mal.

## Cómo se negocia en la práctica

### Antes de la escena

La conversación ocurre **antes**, no durante. La estructura clásica:

1. **Intercambio de listas** (written or verbal). "Esto sí, esto no, esto condicional".
2. **Revisión de lo nuevo.** "Hay algo que quieras probar hoy que no hayas hecho antes?"
3. **Palabras de seguridad.** "Usamos [palabra]. Si la decís, paro todo. Sin preguntas."
4. **Después.** "Después de la escena, hablamos de qué funcionó, qué no, qué querés repetir."

Un buen momento para esto es **en una conversación sin presión**, idealmente en un contexto neutral (no en la cama justo antes).

### Durante la escena

- **Sí no es silencio.** Si la persona no responde, pará.
- **No es no, y "no sé" también es no.** "No sé si quiero" = "no quiero ahora".
- **El cuerpo manda.** Si la persona está tensa, llorando sin control, con la mirada perdida, congelada — parás. Las palabras pueden demorar, el cuerpo no.

### Después

- **Aftercare inmediato.** Agua, manta, abrazo, silencio, lo que la persona necesite.
- **Debrief 24-48h después.** "Qué funcionó, qué no, qué querés probar la próxima". Esto NO es solo "fue lindo?", es un check-in real.

## Lo que la gente confunde

- **"Lo hizo una vez" ≠ "lo va a hacer siempre".** Una escena no es consentimiento para la siguiente. Cada vez es una negociación nueva.
- **"Me lo dijo como fantasía" ≠ "lo quiere hacer".** Las fantasías se hablan por placer, no como pedido. Si querés saber si quiere hacerlo, preguntá explícitamente: "¿Querés probar X?".
- **"Lo hizo con otra persona" ≠ "lo va a hacer conmigo".** Distintas personas, distintos contextos, distintos límites. No asumas.

## Límites en relaciones de largo plazo

En una relación kink de meses o años, los límites pueden relajarse naturalmente. Eso está bien, **pero requiere conversación explícita**. "Ya lo hicimos mil veces" no es lo mismo que "cada vez lo negociamos".

Algunas personas usan listas que actualizan cada cierto tiempo. Otras lo charlan de manera informal antes de cada escena. Cualquiera de las dos funciona, mientras sea explícita.

## Cuando los límites cambian

Los límites pueden **ampliarse** (con el tiempo, con confianza, con experiencia) o **encogerse** (después de una mala experiencia, con un cambio de salud, con un cambio emocional). Ambos están bien.

Si tu pareja o compañero/a de juego te dice "ya no quiero hacer X", **no es un ataque a tu práctica, es un límite de ellos que cambió**. Lo respetás, o no jugás con esa persona.

## Para cerrar

La negociación no es una lista legal. Es una conversación humana. La estructura ayuda (sí/no/quizás), pero el tono importa más: ¿hay espacio para decir "no" sin que la otra persona se ofenda? Si no, no es una negociación real, es un simulacro.

Si tu escena no incluye la posibilidad real de que la otra persona diga "no" en cualquier momento, no es kink. Es abuso con estética.
`,
    relatedSlugs: ["negociacion", "palabras-seguridad"]
  },
  {
    slug: "cuando-pedir-ayuda",
    title: "Cuándo pedir ayuda: drops, frenesi, y señales de que algo no va",
    category: "safety",
    readMinutes: 6,
    excerpt:
      "Cómo distinguir un sub drop normal de uno que necesita intervención, qué es el sub frenzy, y por qué la cultura del \"aguanto solo\" es peligrosa.",
    body: `## Lo normal vs. lo que necesita atención

Después de una escena intensa, es esperable sentir:

- Cansancio físico
- Emociones intensas (llanto, risa, euforia, silencio)
- Necesidad de contacto físico o de soledad
- Hambre, sed, frío
- Confusión mental ligera

Esto es **sub drop** o **top drop** (lo tiene el dominante también, en menor grado). Es hormonal, neuroquímico, y desaparece en 24-72h. Es normal. Se trata con descanso, hidratación, comida, contención emocional, y tiempo.

## Lo que NO es normal

Si tú o tu pareja de juego presenta alguna de estas señales **después** de una escena (o durante, o hasta varios días después), buscá ayuda:

- Llanto incontrolable que dura más de 30 minutos
- Desrealización persistente (sentir que el mundo no es real, que "estoy fuera de mi cuerpo")
- Pensamientos suicidas o de hacerse daño
- Disociación severa (no recordar partes de la escena, lagunas de tiempo)
- Confusión que no se resuelve con descanso
- Comportamiento errático, agresivo, o muy fuera del carácter habitual
- Adormecimiento de partes del cuerpo que no se resuelve (en escenas de bondage o impact play)
- Hemorragia que no para
- Dificultad para respirar que no cede (en escenas de breath play, especialmente)
- Cualquier signo de shock: piel fría, pulso rápido, confusión, palidez

## Sub frenzy (la trampa de los principiantes)

El **sub frenzy** es un estado que afecta a personas nuevas (o después de una experiencia muy intensa): una mezcla de euforia, deseo intenso, y desinhibición. La persona quiere probar todo, todo el tiempo, con cualquiera, sin las pausas de negociación que normalmente tomaría.

**Es peligroso** porque:

- Lleva a escenas con personas que no negociaron bien.
- Lleva a escenas fuera de los propios límites.
- Lleva a dinámicas de poder mal calibradas.
- Lleva a no descansar lo suficiente entre escenas.

La cura: pausa. Reconocer "estoy en frenzy". Decir "no" por unas semanas hasta que baje. Si tenés un/a play partner estable, hablarle para que te ayude a mantener los límites durante la fase.

## Top drop y la soledad del dominante

El dominante también tiene drop. Después de una escena intensa, especialmente si la persona sumisa se queda dormida, el top puede sentir:

- Vacío emocional
- Culpa (irracional, pero real)
- Cansancio físico
- Cuestionamiento ("¿estuvo bien lo que hice?")

Esto no se habla tanto como el sub drop. Pero existe. Si sos top y sentís esto, no sos mala persona. Es el cuerpo procesando. Buscá contención con tu partner, comunidad, o terapeuta si es recurrente.

## Cuándo buscar ayuda profesional

- Pensamientos suicidas → línea de crisis **\*911** (PY) o **\*343** (línea de la vida, gratuita) **inmediatamente**.
- Trauma que se reactiva → profesional con experiencia en trauma (idealmente kink-aware, ver [terapia-sexual-kink-aware](/aprender/terapia-sexual-kink-aware)).
- Disociación recurrente → profesional.
- Uso de sustancias para aguantar el drop → profesional (adicción y kink son un tema serio).
- Disputas con parejas sobre límites que se vuelven conflictivas → mediación o terapia de pareja.

## El dicho: "aguanto solo"

La cultura del aguante es una trampa. El kink no es un deporte de resistencia. Pedir ayuda es una habilidad, no una debilidad. Si en tu comunidad "pedir ayuda" se ve como debilidad, tu comunidad tiene un problema.

En maškaráda: si necesitás ayuda, pedila. Si la necesitás urgentemente, hablá con el staff del evento (identificables) o escribinos por privado a través de [/contacto](/contacto).

## Para cerrar

- Drop es normal, ayuda no es opcional cuando es fuerte.
- Sub frenzy se atraviesa, no se "aguanta".
- El top también necesita contención.
- La cultura del aguante es peligrosa. La cultura del cuidado es kink.
`,
    relatedSlugs: ["sub-drop", "palabras-seguridad", "consentimiento-fotografico"]
  },
  {
    slug: "vinculos-no-monogamos",
    title: "Vínculos no monógamos: polyamory, ENM, y kink",
    category: "communication",
    readMinutes: 9,
    excerpt:
      "Por qué las comunidades kink tienen tasas altas de no-monogamia, las estructuras más comunes (polyamory, open, swinging, relationship anarchy), y qué hace falta para que funcione.",
    body: `## Por qué el kink y la no-monogamia van de la mano

No todas las personas kink son no-monógamas. Pero las comunidades kink tienen tasas mucho más altas de no-monogamia que la población general. Las razones:

- **La monogamia no es el default moral del kink.** Si ya cuestionás una norma social (el kink es tabú para la mayoría), cuestionar la monogamia es un paso más pequeño.
- **Las prácticas kink requieren a veces múltiples partenaires.** No todo el mundo sabe atar, no todo el mundo tiene las mismas inclinaciones. Una pareja estable de 5 años no necesariamente cubre lo que la otra persona quiere explorar.
- **La cultura queer deconstruyó la monogamia mucho antes.** Las comunidades LGBTQ+ tienen décadas de reflexión sobre modelos relacionales no tradicionales. El kink toma de ahí.

## Los modelos principales

### Poliamor (polyamory)

Múltiples relaciones amorosas simultáneas, **con el conocimiento y consentimiento de todas las partes involucradas**. Cada relación es significativa por derecho propio, no es "sexo casual" ni "follamigos". Las configuraciones:

- **Triad (tríada):** tres personas en relación.
- **V (vee):** una persona en el centro con dos relaciones paralelas que no se intersectan necesariamente.
- **N (n-pol):** grupo más grande.
- **Red / polifidelidad:** varias parejas que tienen relaciones entre sí pero no fuera del grupo.

### ENM (Ethical Non-Monogamy)

Término paraguas. Incluye polyamory, swinging, open relationships, y todo lo que sea "no exclusivo pero ético". El énfasis está en la ética: comunicación, honestidad, consentimiento.

### Open relationship (relación abierta)

Pareja primaria con permiso explícito de tener parejas sexuales secundarias, generalmente sin involucramiento emocional profundo con las terceras personas. La "regla" varía enormemente: algunos permiten solo afuera, otros todo.

### Swinging

Parejas (generalmente heterosexuales, históricamente) que tienen sexo con otras parejas como evento social. Más "recreativo" que relacional.

### Relationship Anarchy (anarquía relacional)

Filosofía que cuestiona **todas** las jerarquías relacionales: no hay "primario" y "secundario", no hay "novio/a" y "amigo/a con derechos", cada relación define sus propios términos.

## Lo que hace falta para que funcione

### 1. Honestidad radical

Si no podés hablar de lo que sentís, con quién, y por qué, no-monogamia va a ser un desastre. **El secreto es el enemigo**. La transparencia con tus partenaires actuales es lo único que separa ENM de infidelidad.

### 2. Tiempo para conversaciones difíciles

Las no-monogamias bien hechas requieren **mucho** más tiempo de conversación que las monogamias. Acuerdos, renegociaciones, revisión de cómo se siente cada persona. Si tu pareja actual y vos nunca hablan, ENM no es para ustedes.

### 3. Gestión de la celosía

Los celos no desaparecen mágicamente con el modelo. La cultura poly tiene herramientas (radar emocional, check-ins programados, "tiempo de calidad"). Pero hay que aprenderlas. Recursos: "The Ethical Slut" (Dossie Easton), "More Than Two" (Franklin Veaux).

### 4. Reglas claras, revisables

Las reglas iniciales en ENM no son "leyes", son **hipótesis**. Si no funcionan, se cambian. Las reglas que nunca se revisan se vuelven prisiones.

Ejemplos: "podemos tener sexo con terceros pero no pasar la noche", "podemos besar a otros pero no en eventos familiares", "los terceros saben de la relación principal". Cada pareja las suyas.

### 5. Soporte externo

Polyamory sin comunidad (amigos poly, terapeutas poly-aware, grupos locales) es difícil. La soledad poly es real. Si estás en Asunción y querés conectar con otras personas en vínculos no-monógamos, maškaráda puede ser un punto de partida.

## Errores comunes

- **Abrir la pareja como solución a problemas.** Si la relación está mal, abrirla la va a hacer peor. Primero arreglá lo de a dos, después considerá ENM.
- **"Solo vos y yo" → "ahora somos tres" sin que la persona involucrada sepa.** Esto se llama triángulo de cornudo/drag y es abuso emocional.
- **Hacer reglas en caliente.** Las reglas de ENM se acuerdan en estado neutral, no después de un disgusto.
- **No leer.** "The Ethical Slut" lleva 25 años publicándose. Lo que vos te estás preguntando, alguien lo pensó y lo escribió.

## No-monogamia y kink específicamente

En maškaráda vemos tres configuraciones frecuentes:

1. **Pareja monógama que viene junta a eventos.** Lo más común. Funciona.
2. **Pareja con permiso de jugar con terceros.** Requiere negociación previa. Común.
3. **Personas solteras que juegan con quien quieran.** Funciona, pero requiere conocer a las personas con las que jugás, no solo acostarse con alguien que conociste esa noche.

Cualquiera funciona, ninguna es "más kink" o "más avanzada".

## Para cerrar

No-monogamia no es para todos. Es una opción más, no una obligación ni una marca de profundidad. Si la monogamia funciona para vos y tu(s) pareja(s), perfecto. Si no, hay alternativas. Lo importante es la honestidad con las personas involucradas.

La frase que resume: "si querés probar, leé, hablá, y empezá de a poco con alguien que sepa. No abras la relación un viernes a las 3am después de una juerga."
`,
    relatedSlugs: ["que-es-bdsm", "negociacion", "marcando-limites"]
  },
  {
    slug: "terapia-sexual-kink-aware",
    title: "Terapia kink-aware: cómo encontrar ayuda profesional sin explicar tu vida",
    category: "logistics",
    readMinutes: 6,
    excerpt:
      "La diferencia entre un terapeuta kink-aware y uno que no, qué preguntar en la primera sesión, y la situación actual en Paraguay y la región.",
    body: `## Por qué importa

Si estás en kink y necesitás hablar con un profesional de salud mental (ansiedad, depresión, trauma, disforia, problemas de pareja, lo que sea), necesitás que esa persona **no se shockee** cuando le cuentes tu vida. No es opcional. Es crítico.

Un terapeuta que patologiza el kink te va a hacer daño, aunque sea buena persona. Un terapeuta que asume que el kink es la causa de tus problemas (cuando no lo es) te va a hacer perder meses de tratamiento.

## Qué preguntar en la primera sesión

1. **"¿Tenés experiencia trabajando con personas de la comunidad BDSM o kink?"** Si la respuesta es "no sé qué es eso" o "no, pero estoy abierto/a", considerá buscar a otro/a profesional.
2. **"¿Patologizás el kink en tu práctica clínica?"** La respuesta debería ser no. Si hay dudas o aclaraciones (como "depende del contexto"), pedir que aclare.
3. **"¿Trabajás con personas no-monógamas?"** Si estás en ENM, la respuesta debería ser sí o al menos "sí, es parte de mi práctica".
4. **"¿Conocés los marcos SSC y RACK?"** La respuesta debería ser al menos "sí, los conozco".

Si dos o más respuestas son "no" o evasivas, buscá a otro/a profesional.

## En Paraguay

La oferta es limitada. Las opciones que conocemos:

- **Profesionales formados en sexología clínica** (Universidad Nacional de Asunción, posgrados en Argentina y Brasil). Algunos tienen apertura a clientes kink.
- **Profesionales queer-affirming** (no necesariamente kink-specific, pero por lo menos no patologizan identidades no-normativas). La comunidad LGBTQ+ de PY tiene una red informal.
- **Terapeutas online** de Argentina, Brasil, España. Más opciones, en español, con experiencia en diversidad sexual.

La maškaráda no mantiene una lista pública de profesionales. La recomendación: preguntar en confianza en la comunidad.

## La trampa del "no te juzgo"

El "no te juzgo" en un terapeuta novato en kink a veces significa "no te juzgo **todavía**" o "no te juzgo **pero te voy a mirar raro**". La experiencia de muchas personas: la primera sesión va bien, pero a la tercera o cuarta el terapeuta empieza a "explorar" si el kink está conectado a un trauma, una disfunción, una "etapa". Esa exploración sin formación es iatrogénica (causa daño).

Una señal de alerta: si el terapeuta te pregunta en la primera sesión "¿y cuándo empezaste con esto?", en un tono que sugiere "antes de esto, ¿qué te pasó?", no es kink-aware.

## Recursos regionales

- **CCHS (Centro Cultural y de la Salud Sexual), Buenos Aires.** Línea de profesionales.
- **Centro de Estudios SexualityWatch, Chile.** Online, en español.
- **FLASSES (Federación Latinoamericana de Sociedades de Sexología y Educación Sexual).** Directorio de profesionales.
- **WPATH** (para temas de género). No es kink pero sí identidades de género.

## Qué buscar

- **Sexólogos clínicos** con formación en diversidad sexual.
- **Psicoterapeutas** con experiencia en prácticas alternativas.
- **Terapeutas de pareja** con apertura a ENM.
- **Trabajadores sociales** con experiencia en comunidad LGBTQ+ (muchos terminan atendiendo a comunidad kink por afinidad).

## En maškaráda

No somos un servicio de salud mental. No damos terapia. Lo que sí hacemos:

- **Escucharte** si necesitás hablar con alguien de la comunidad.
- **Orientarte** sobre recursos disponibles (sin recomendar profesionales específicos, por la responsabilidad que implica).
- **Conectarte** con personas de la comunidad que hayan pasado por cosas similares (cuando sea apropiado y vos lo quieras).

Si la situación es urgente (pensamientos suicidas, riesgo de hacerte daño, abuso), los recursos son:

- Paraguay: **\*911** emergencias, **\*343** línea de la vida (gratuita).
- Argentina: **\*135** Centro de Asistencia al Suicida.
- Internacional: **findahelpline.com** directorio por país.

## Para cerrar

- Un terapeuta kink-aware existe. Buscalo.
- La primera sesión es para evaluar al profesional, no para que te evalúe a vos.
- Si sentís que te patologiza, cambialo. No tenés que convencer a nadie de que tu vida está bien.
- Las urgencias van a línea de crisis, no a terapeuta.
`,
    relatedSlugs: ["que-es-bdsm", "cuando-pedir-ayuda", "vinculos-no-monogamos"]
  },
  // ── TIER 2: edge play / safety ───────────────────────────────────
  {
    slug: "play-de-respiracion",
    title: "Play de respiración: la práctica kink más letal y por qué importa entenderla",
    category: "safety",
    readMinutes: 10,
    excerpt:
      "El play de respiración mata personas cada año. Esta guía no te enseña a hacerlo, te enseña a entender por qué no es algo para principiantes y cómo evitar que ocurra un accidente.",
    body: `## Lo que vas a leer aquí

Esta guía **no es un tutorial**. No vas a aprender a hacer play de respiración. Lo que vas a leer:

- Por qué esta práctica es la que más muertes causa en el mundo kink.
- Qué es lo que crees que estás haciendo (y por qué probablemente estás equivocado).
- Cuáles son los riesgos reales.
- Qué hacer si decidís hacerlo de todos modos (y cómo no hacerlo).

Si tu objetivo es aprender a hacer choke o breath play hoy, esta guía te va a decepcionar. Si querés entender por qué la gente muere haciéndolo, sigue leyendo.

## Los datos

Las estadísticas varían, pero el consenso entre forenses y clínicos es que **el play de respiración es responsable de la mayoría de las muertes no-accidentales en contexto kink** en países occidentales. No es un rumor. Es lo que muestra la evidencia forense cuando se investigan muertes en eventos privados.

El número exacto es difícil de precisar (muchas muertes se reportan como "ahogamiento accidental" o "paro cardíaco"), pero **cualquier practicante con 10+ años en la escena conoce al menos una muerte cercana**.

## Por qué es peligroso

### El sistema nervioso no avisa

El cuerpo humano no tiene un sensor confiable de "te falta oxígeno". El sensor (quimiorreceptores) detecta **el aumento de CO₂**, no la falta de O₂. Estos están en el **tórax y abdomen**, no en el cuello.

Cuando presionás el cuello (choking):

- La tráquea puede colapsar o cerrarse.
- Las arterias carótidas se comprimen.
- **La persona no siente "falta de aire" hasta que está a punto de perder la conciencia.**

La señal de "ya no puedo respirar" llega **después** de que el cerebro está a punto de apagar. No podés confiar en la víctima para que diga "pará" porque **la víctima puede no tener tiempo de decirlo antes de desmayarse**.

### El daño cerebral no avisa

4-5 minutos sin oxígeno suficiente → daño cerebral permanente. La muerte sobreviene después. La ventana es corta, y la víctima no puede señalarte que está al límite.

### La médula espinal sí avisa

Si presionás la tráquea y la persona tose, se resiste, intenta hablar — **es una señal de que el cuerpo está reaccionando**, lo cual significa que aún hay protección. Pero esa resistencia también puede ser un espasmo involuntario que se confunde con "todavía está bien".

### La "asfixia erótica" no es segura porque es placentera

La excitación sexual altera la percepción del riesgo. La dopamina y la adrenalina mezcladas con un estado de "privación leve" producen una sensación subjetiva de "todo bien" cuando objetivamente no lo está.

## Lo que la gente cree que está haciendo

Muchas personas que hacen play de respiración lo describen como "limitar el flujo sanguíneo al cerebro" (lo cual es real) y creen que eso es controlable. **No lo es.** El cuerpo humano no tiene una forma nativa de limitar el flujo al cerebro de manera segura. Las técnicas que la gente cree estar usando (presionar un lado, no el otro; controlar el tiempo; leer la cara) son folklore. La realidad es que cada cuerpo es diferente y el margen de error es de segundos.

## Qué hacer si decidís hacerlo de todos modos

Si después de leer esto querés hacerlo igual (que es un derecho adulto), las **mínimas condiciones** son:

1. **No hacerlo nunca bajo alcohol ni drogas.** El juicio está alterado. La víctima puede no responder bien.
2. **No hacerlo con personas que conociste hace una hora.** Necesitás confianza y comunicación.
3. **Con consentimiento explícito y actualizado.** No vale "siempre lo hacemos". Cada vez.
4. **Con un observer (dungeon monitor) presente.** Alguien que no esté jugando, que pueda intervenir si las cosas van mal.
5. **Con plan de emergencia claro.** ¿Dónde está el celular? ¿Quién llama si algo pasa? ¿La víctima sabe que puede parar? (Sí, pero a veces no puede.)
6. **Saber reanimación cardiopulmonar (RCP).** No es opcional. Si no sabés, **no hagas esto**.
7. **Saber que "no pasó nada las últimas 10 veces" no es protección.** Los accidentes se acumulan.
8. **Saber que la víctima puede tener una reacción retardada.** Algunas complicaciones aparecen 24-48h después. Si la persona se desmaya y se "recupera" en 30 segundos, no significa que esté bien. Ir a un médico.

## Por qué igual te puede matar

- **Aneurisma no diagnosticado.** Comprimir el cuello puede romper un aneurisma que la persona no sabía que tenía. Esto es instantáneo e irreversible.
- **Espasmo laríngeo.** La laringe se cierra y no se reabre. La persona no puede respirar. Puede requerir intervención médica inmediata.
- **Vómito aspirado.** Si la persona vomita mientras está inconsciente, el vómito va a los pulmones. Riesgo de neumonía, paro respiratorio.
- **Embolia gaseosa.** Una pequeña burbuja de aire en una arteria del cerebro puede causar un ACV.

Ninguna de estas las podés prevenir. Solo reducís probabilidad.

## La pregunta real

No "¿cómo lo hago seguro?". La pregunta real es: **"¿vale la pena el riesgo para lo que estoy buscando?"**

Si lo que buscás es control, hay otras prácticas.
Si lo que buscás es intensidad, hay otras prácticas.
Si lo que buscás es sumisión a través de la vulnerabilidad, hay otras prácticas.

La respiración es la única práctica donde la línea entre "intenso" y "muerto" es de segundos, sin marcadores visibles, y depende de variables que no controlás (presión arterial, hidratación, nivel de estrés del momento, etc.).

## Para cerrar

Esta guía no es anti-kink. Es pro-información. El play de respiración existe. Personas adultas lo hacen. Pero la diferencia entre "play" y "muerte" es la información que tenés antes de empezar.

Si decidís hacerlo, sabé los riesgos. Si no, hay 50 prácticas más para explorar.
`,
    relatedSlugs: ["palabras-seguridad", "marcando-limites", "cuando-pedir-ayuda"]
  },
  {
    slug: "play-de-agujas",
    title: "Play de agujas: cuando el cuerpo se vuelve un libro",
    category: "safety",
    readMinutes: 8,
    excerpt:
      "Qué es el play de agujas, qué equipo se necesita, qué riesgos médicos existen, y por qué esto NO es una práctica para hacer en casa sin formación.",
    body: `## Qué es

**Play de agujas** (needle play) es una práctica kink que consiste en insertar agujas hipodérmicas estériles a través de la piel con fines estéticos, sensoriales, o psicológicos. La persona que recibe la inserción ve, siente, y a veces experimenta un estado modificado de conciencia (similar al "runner's high" en corredores de larga distancia).

Es distinta del **body piercing** comercial: en piercing, el objetivo es joyería permanente; en needle play, el objetivo es la experiencia temporal (las agujas se retiran al final).

## Por qué la gente lo hace

- **Visual.** La imagen de agujas en el cuerpo es estéticamente impactante.
- **Sensorial.** El pinchazo repetido genera una sensación que muchas personas describen como "meditativa" o "trance-like".
- **Psicológico.** La vulnerabilidad de tener el cuerpo atravesado por objetos filosos genera una sensación de exposición y entrega que conecta con dinámicas de poder.
- **Endorfinas.** El cuerpo libera endorfinas en respuesta al trauma menor controlado. Similar al impacto play, pero con agujas.

## Lo que necesitás saber ANTES de intentarlo

### 1. No es para principiantes en absoluto

El play de agujas requiere:

- Conocimiento anatómico básico (dónde pasan nervios, arterias, venas, órganos).
- Conocimiento de equipo médico (tipos de aguja, calibres, dónde conseguir material estéril).
- Entrenamiento en esterilidad (cómo no introducir infección).
- Capacidad de responder a una emergencia médica.

**Si nunca hiciste nada de esto, no es el momento.**

### 2. Necesitás formación práctica con alguien con experiencia

No alcanza con leer esta guía. La práctica de agujas se enseña en workshops con instructores certificados. En Paraguay no hay (todavía). En Buenos Aires, São Paulo, y México hay. Un viaje de formación es la inversión inicial.

Hasta que tengas esa formación: **no hagas play de agujas en casa**.

### 3. Material estéril solamente

- Agujas hipodérmicas estériles, nuevas, en envase sellado. **Una aguja por persona por sesión.**
- No compartir agujas entre personas (igual que en cualquier práctica de inyección).
- No reutilizar una aguja en la misma persona en diferentes sesiones (idealmente).
- **No** acupuntura, no costura, no tatuaje casero, no herramientas no médicas. La esterilidad es lo que evita infecciones serias.

### 4. Zonas de riesgo

Hay zonas del cuerpo donde insertar una aguja puede tener consecuencias serias:

- **Cuello** (carótida, yugular, tráquea, tiroides) → riesgo de hemorragia masiva, embolismo aéreo, paro respiratorio.
- **Tórax** (entre las costillas) → neumotórax (pulmón pinchado).
- **Abdomen** (perforación intestinal) → peritonitis.
- **Ingle / axila** (arterias principales) → hemorragia.
- **Rostro** (nervio facial, arteria temporal) → parálisis, ACV.

Las zonas "seguras" (con formación) incluyen: espalda (sobre la musculatura paravertebral, no sobre la columna), muslos (cara lateral), nalgas (cara lateral-superior), brazos (cara lateral del deltoides), abdomen (zona periumbilical con cuidado, no profundamente).

### 5. Complicaciones posibles

Aunque se haga bien:

- **Hematoma** (moretón) — normal, especialmente las primeras veces.
- **Sangrado leve** — normal. Un poco de sangre en la inserción es esperable.
- **Infección local** — si la esterilidad falla. Síntomas: enrojecimiento creciente, calor, pus. Si pasa, atención médica.
- **Lipotimia / desmayo** — la respuesta vagal es común. La víctima puede desmayarse al ver la sangre o por el dolor. **Si la víctima se desmaya, retirá las agujas con cuidado (no todas a la vez, una por una) y ponela en posición lateral.**
- **Reacción alérgica al material** — raro, pero posible. Las agujas son generalmente acero quirúrgico, pero algunas personas reaccionan al níquel.
- **Daño nervioso** — si la aguja toca un nervio, puede haber dolor irradiado, hormigueo, o pérdida de función temporal. La mayoría se recupera; algunos casos son permanentes.

## Qué hacer si decidís hacerlo

1. **Formate primero.** Workshop con instructor certificado. No improvises.
2. **Empezá con zonas seguras y pocas agujas.** Una o dos agujas en la espalda, con víctima experimentada que pueda decirte si algo va mal.
3. **Consentimiento escrito.** Por sesión, especificando qué zonas, cuántas agujas, hasta cuándo.
4. **Equipo de emergencia a mano.** Celular con números de emergencia, conocimiento de RCP, alguien que NO esté jugando y pueda intervenir.
5. **Después.** Limpieza de la zona, apósito si sangra, descanso. La víctima puede sentir mareo, fatiga, o euforia durante 1-2 horas.
6. **Seguimiento 24-48h.** Si hay signos de infección (calor, enrojecimiento creciente, pus), médico.

## Lo que no se hace

- Insertar agujas en genitales, pezones, mucosas, o párpados. Hay riesgos específicos y se requiere formación especializada.
- Hacerlo bajo alcohol o drogas.
- Hacerlo en el primer encuentro con alguien.
- Usar agujas no estériles, agujas de costura, o cualquier cosa que no sea aguja hipodérmica nueva.
- Hacerlo sin una víctima despierta, capaz de hablar, y que pueda parar en cualquier momento.

## En resumen

El play de agujas es una práctica kink real, practicada por miles de personas en el mundo. Tiene riesgos reales, mitigables con formación, equipo, y respeto por los protocolos.

Si no tenés formación, **no lo hagas**. No en casa, no con "cuidado", no "porque leí en internet". Esperá a tener un instructor y equipo apropiado.

Las emergencias de play de agujas no son "le duele un poco". Son: infecciones serias, daño nervioso, hemorragia, neumotórax. Cada una requiere atención médica inmediata.
`,
    relatedSlugs: ["palabras-seguridad", "cuando-pedir-ayuda", "consentimiento-fotografico"]
  },

  // ── TIER 2: activities to add ─────────────────────────────────────
  {
    slug: "kink-y-discapacidad",
    title: "Kink y discapacidad: cuerpos reales, prácticas reales",
    category: "foundations",
    readMinutes: 7,
    excerpt:
      "Cómo adaptar prácticas kink cuando hay una discapacidad física, enfermedad crónica, o neurodivergencia. Por qué la mayoría de las guías asumen un cuerpo \"promedio\" que no existe.",
    body: `## El problema con la mayoría de las guías kink

Casi todas las guías asumen un cuerpo "promedio" sin dolor crónico, sin movilidad reducida, sin medicación que afecte la respuesta, sin fatiga fluctuante, sin neurodivergencia. **Ese cuerpo no existe.** Toda persona tiene algo. La pregunta no es si hay una condición, es cómo se vive con ella en la práctica kink.

Esta guía no es médica ni terapéutica. Es una invitación a adaptar la práctica, no a abandonarla.

## Discapacidad física

### Movilidad reducida

- **Bondage:** las posiciones de atadura que requieren flexión o extensión completa pueden no ser posibles. Shibari en silla, bondage en cama, posiciones tumbadas, son todas alternativas reales.
- **Impact play:** la persona tumbada puede recibir impacto en zonas accesibles sin requerir movilidad.
- **Role play y servicio:** funcionan sin requerir movilidad específica.

### Dolor crónico

- **Posición de la persona:** no mantener una posición que genere dolor. La persona sumisa puede pedir cambio de posición en cualquier momento. **No** se asume que "aguantás" porque el dolor es crónico.
- **Sobreestimulación:** el dolor crónico a veces significa que el umbral de dolor está alterado. Lo que para otra persona es un azote leve, para quien vive con dolor crónico puede ser insignificante o, paradójicamente, demasiado. Preguntar siempre.
- **Medicación:** si la persona toma opioides, relajantes musculares, o cualquier medicación que afecte la percepción del dolor o la respuesta física, planificar la escena alrededor de eso. **Nunca** combinar con alcohol o drogas.

### Discapacidad visual

- **Consentimiento explícito por audio.** "Sí, ese punto, más fuerte" funciona. "Sí" con un gesto de cabeza depende de que la persona lo vea.
- **Descripción verbal.** Antes de tocar, describir qué se va a hacer. "Te voy a tocar el hombro con esta pluma" en lugar de hacerlo en silencio.
- **Discreción del espacio:** que la persona pueda reconocer dónde está, qué hay alrededor. Hablar al llegar, no asumir que conoce el espacio.

### Discapacidad auditiva

- **Consentimiento explícito visual.** La persona necesita verte para confirmar. Acordar señas antes de la escena.
- **Atención a la comunicación no verbal.** Si la persona no puede oír un suspiro, mirar el cuerpo para señales de distress.
- **Texto escrito** para consentimiento detallado, no solo oral.

## Enfermedad crónica

### Fatiga fluctuante

- **Planificación flexible.** "Hoy podemos, mañana no". No hacer planes firmes con mucha anticipación.
- **Escenas cortas.** 20-30 minutos, no sesiones de 3 horas.
- **Aftercare extendido.** Si la fatiga post-escena es peor que la baseline, planificar reposo.

### Medicación

- **Efectos sobre la práctica:** algunos antidepresivos (ISRS) afectan la respuesta sexual, el orgasmo, o el estado emocional. Saber cómo te afecta tu medicación antes de hacer kink.
- **Interacciones:** algunas medicaciones interactúan mal con alcohol, con opiáceos, con ciertos alimentos. **No** improvisar combinaciones.
- **Compliance:** no dejar de tomar medicación por hacer kink. Si la práctica entra en conflicto con la medicación, hablar con el médico.

## Neurodivergencia

### TDAH

- **Tiempo de concentración:** las escenas largas pueden perder foco. Planificar pausas o escenas más cortas.
- **Estimulación:** el TDAH a veces significa que se busca más intensidad. Esto está bien mientras los límites se respeten.
- **Aftercare estructurado:** después de una escena intensa, el cerebro neurodivergente puede tener más dificultad para "bajar". Un protocolo de aftercare predecible ayuda.

### Autismo

- **Estimulación sensorial:** algunas prácticas son muy intensas sensorialmente. Otras son demasiado tenues. Comunicar la preferencia explícitamente.
- **Rutinas:** las prácticas que se vuelven rutina (un ritual, un protocolo) pueden ser muy positivas. Lo inesperado puede ser difícil.
- **Comunicación directa:** las personas autistas a menudo son muy directas. La negociación puede ser más fácil, no más difícil.

### Disociación

- **Conocer los disparadores:** las personas con historia de disociación (no necesariamente asociada a un diagnóstico) saben qué las disocia. Planificar para evitar esos disparadores, o para tener un protocolo de salida si pasan.
- **Salir de la escena con cuidado:** la transición "post-escena → vida normal" puede ser abrupta. Un protocolo de "vuelta" (5-10 min de hablar de otra cosa, de tomar agua, de respirar) puede ayudar.

## Cómo adaptar

### En la negociación

Preguntar:

- "¿Tenés alguna condición física o mental que afecte cómo vivimos esto?"
- "¿Hay algo que sea mejor evitar?"
- "¿Necesitás adaptaciones específicas? (posición, comunicación, equipo)"

No asumir. No preguntar de forma invasiva. La persona comparte lo que quiere compartir.

### En la escena

- **Pausa sin pedir.** "¿Estás bien?" cada cierto tiempo, especialmente si la persona tiene dolor crónico o neurodivergencia.
- **Señales explícitas.** Acordar señales que no requieren palabra (tocar dos veces la rodilla, decir "necesito un segundo").
- **Después.** Chequear cómo está la persona 1-2 horas después, no solo al final de la escena.

### En la comunidad

- **No patologizar.** "Tenés que cuidarte más" o "no deberías hacer esto" son formas de patologizar. La persona con la condición sabe lo que puede y no puede. Si dice que sí, confia.
- **No romantizar.** "Qué valiente" es condescendiente. La persona no es valiente por hacer kink con una discapacidad, es una persona haciendo kink.
- **Preguntar, no asumir.** Las adaptaciones cambian de persona a persona. La única manera de saber es preguntar.

## En resumen

- No existe el cuerpo "promedio". Cada cuerpo tiene algo.
- La práctica se adapta, no se abandona.
- Preguntar siempre. Asumir nunca.
- Las adaptaciones son específicas de cada persona.
- La persona con la condición es la experta en su cuerpo.

## Para cerrar

Si tenés una condición y querés hacer kink: no es que "no puedas". Es que vas a necesitar adaptaciones, y está bien. La comunidad kink tiene décadas de práctica adaptando; no sos la primera persona en esa situación.

Si tu play partner tiene una condición: preguntá, no asumas. Si no sabés qué preguntar, decí "no sé qué preguntar pero quiero hacerlo bien". Es el mejor punto de partida.
`,
    relatedSlugs: ["que-es-bdsm", "marcando-limites", "terapia-sexual-kink-aware"]
  },
  {
    slug: "salud-sexual-kink",
    title: "Salud sexual en el kink: STI, PrEP, y conversaciones que hay que tener",
    category: "safety",
    readMinutes: 7,
    excerpt:
      "Por qué la conversación de salud sexual es parte de la negociación kink, qué tests hacerse, cómo funciona PrEP/PEP, y los errores comunes que comete la gente.",
    body: `## La conversación que nadie quiere tener

En las comunidades kink, la conversación de salud sexual a menudo se evita. "Somos cuidadosos", "confío en esta persona", "no es un evento casual". Las tres son razones reales, pero no sustituyen la conversación directa.

La realidad: el kink a menudo involucra intercambio de fluidos (oral, genital, sangre en needle play, contacto con mucosas en fisting, etc.). El riesgo de STI es real. La conversación es adulta.

## Qué STI importan en el contexto kink

- **HIV** — el más serio. Transmisión por sangre, semen, fluidos vaginales, leche materna. Con tratamiento, una persona con HIV puede tener carga viral indetectable y NO transmitir.
- **Hepatitis B y C** — transmisión sexual y por sangre. Hepatitis B tiene vacuna. Hepatitis C no tiene vacuna, pero tiene cura.
- **Sífilis** — en aumento en LATAM y global. Tratable con penicilina.
- **Gonorrea, clamidia** — las más comunes. Curables con antibióticos.
- **HPV** — muy común, a veces asintomático. Hay vacuna.
- **Herpes (HSV)** — no tiene cura, pero se trata. Riesgo de transmisión aún sin síntomas.
- **Hepatitis A** — fecal-oral. Vacuna disponible.

## Cuándo testear

- **Antes de empezar a tener parejas sexuales nuevas.** Baseline.
- **Cada 3-6 meses** si tenés vida sexual activa con múltiples partenaires.
- **Después de una exposición de riesgo** (rotura de condón, aguja compartida, agresión sexual).
- **Si tenés síntomas.**

Dónde testear en Paraguay:

- **PRONASIDA** (Programa Nacional de Control de VIH/SIDA e ITS). Gratuito, confidencial. Disponible en hospitales públicos y centros de salud.
- **Laboratorios privados** (CPC, etc.). Más caro pero más rápido.
- **Tests rápidos** (autotest) están disponibles en farmacias en algunos países de la región. En Paraguay el acceso es irregular.

## PrEP y PEP

### PrEP (Pre-Exposure Prophylaxis)

Medicación preventiva para personas VIH-negativas con alto riesgo de exposición. Tomada **antes** de la exposición.

- **Eficacia:** >99% si se toma correctamente.
- **Disponibilidad en Paraguay:** irregular. Consultar con infectólogo o PRONASIDA.
- **Costo:** varía, algunos programas la dan gratuita.

### PEP (Post-Exposure Prophylaxis)

Medicación de emergencia **después** de una exposición de riesgo. Tomada dentro de las **72 horas** post-exposición.

- **Eficacia:** alta si se toma en ventana correcta.
- **Disponibilidad:** urgencias hospitalarias, PRONASIDA.
- **Si creés que tuviste una exposición de riesgo**, no esperes. La PEP es una emergencia.

## Cómo hablarlo con tu play partner

### Antes del primer juego

"¿Cuándo fue tu último test de STI? ¿Te testeás regularmente? ¿Tenés alguna condición que sepamos?"

Si la persona no quiere hablar de esto, **es información**. No asumas que es porque "no le importa" — a veces es porque no sabe, o porque no se testeó nunca.

### En una relación establecida

La conversación no termina en la primera cita. Cada cierto tiempo (3-6 meses) re-confirmar estado de salud. Las infecciones pueden aparecer entre test y test.

### En eventos

Si vas a tener sexo casual en un evento:

- **Condones y barreras bucales** a mano. La organización debería proveerlos; sino, traé los tuyos.
- **Lubricante** a base de agua o silicona (NO a base de aceite con condones de látex).
- **No compartir juguetes** sin desinfectar (alcohol 70% o solución de bleach diluida 1:10).
- **Si se rompió un condón, o se compartió un juguete sin protección:** hablarlo inmediatamente. La PEP es una opción.

## Lo que el kink agrega a la conversación

- **Blood play / needle play:** transmisión por sangre es directa. Las agujas hipodérmicas son estériles por uso. Compartir agujas es compartir hepatitis C, HIV, y otras infecciones transmitidas por sangre. **Nunca.**
- **Fisting / fist play:** las micro-lesiones en mucosas aumentan el riesgo de transmisión. Guantes de nitrilo, lubricante, e información de salud.
- **Impact play:** bajo riesgo de transmisión si no hay sangre, pero las marcas y la rotura de piel aumentan el riesgo. Limpiar el equipo entre personas.
- **Breath play:** sin transmisión directa de STI, pero el intercambio de saliva (mordidas, besos) sí.

## Errores comunes

- **"Soy monógamo/a" = "no tengo STI".** No. Las personas entran a relaciones con infecciones preexistentes. Los test confirman.
- **"Me veo sano/a".** La mayoría de las STI son asintomáticas. La única manera de saber es testear.
- **"Uso condón siempre".** El condón previene muchas cosas pero no todas (HPV, herpes). Sumar test regular + conversación + PrEP si aplica.
- **"El kink es seguro".** El kink responsable es seguro. El kink sin conversación de salud es como sexo casual sin protección.

## En maškaráda

No exigimos tests para entrar. No es un espacio libre de STI. Es un espacio donde la conversación de salud es **bienvenida y adulta**.

Lo que sí hacemos:

- Proveemos condones y lubricante en eventos.
- El staff está entrenado para orientar sobre recursos de salud.
- Si alguien tiene una exposición de riesgo en un evento, el staff puede activar PEP local.

## Para cerrar

- Testear regularmente.
- Hablar con cada play partner antes de empezar.
- PrEP/PEP existen y son herramientas. Usálas.
- Las infecciones no son juicio moral, son hechos. Se tratan.

La salud sexual es parte del kink responsable. No es separada.
`,
    relatedSlugs: ["que-es-bdsm", "marcando-limites", "consentimiento-fotografico"]
  },
];


export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
