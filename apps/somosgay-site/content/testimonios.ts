// Testimonios de la comunidad — primeras personas anonimizadas.
// No nombres reales, no fechas. Solo lo suficiente para que el lector
// encuentre una voz reconocible.

export interface Testimonio {
  id: string;
  scope: "Clinica" | "Programa Kunuu" | "Memoria 108" | "Centro Tekohara";
  body: string;
  excerpt: string;
  hint: string;
  year: number;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: "t1",
    scope: "Clinica",
    body:
      "Fui a Clínica Kunu'u porque vivía en una ciudad chica y acá era complicado hacerse el test. Me hicieron esperar a que nadie más estuviera en la sala. Una psicóloga me preguntó tres cosas sobre mi vida antes de hacerme el análisis. No recuerdo su nombre, no me pidió documento, y eso es exactamente lo que necesitaba ese día. Las pruebas son 30 minutos. Los resultados los entregan en persona. Nadie de mi familia se enteró.",
    excerpt: "No me pidió documento, y eso es exactamente lo que necesitaba ese día.",
    hint: "Paciente del interior, primera vez que se testa",
    year: 2023,
  },
  {
    id: "t2",
    scope: "Programa Kunuu",
    body:
      "Llevo casi un año en PrEP. La consulta es cada tres meses. Al principio fui porque mi pareja tiene VIH. Ahora sigo porque me protege a mí también de cualquier otra exposición. La enfermera me explica los efectos secundarios sin apuro. Me costó entender que no es una droga para una sola comunidad ni una cura. Es una pastilla simple.",
    excerpt: "Al principio fui porque mi pareja tiene VIH. Ahora sigo porque me protege a mí.",
    hint: "Paciente PrEP, primer año",
    year: 2024,
  },
  {
    id: "t3",
    scope: "Memoria 108",
    body:
      "Llegué al acto de Memoria 108 en setiembre porque en mi pueblo no hay marcha del orgullo. Esperaba más visibilidad. Encontré silencio, velas, lectura de los 108 nombres. Eso es lo que terminó enseñándome lo que significa estar en la lucha. No había orquesta; había una lista y unas personas escuchando.",
    excerpt: "Esperaba más visibilidad. Encontré silencio, velas, lectura de los 108 nombres.",
    hint: "Asistente al acto de Memoria 108",
    year: 2024,
  },
  {
    id: "t4",
    scope: "Centro Tekohara",
    body:
      "Cuando me rechazaron de mi casa fui a Tekoharã. Me dieron refugio, no mucho tiempo, lo justo para estabilizarme. Conocí a un consejero que después me conectó con la facultad. Yo ya había intentado entrar y retirarme dos veces. La tercera es la que sigue.",
    excerpt: "Conocí a un consejero que después me conectó con la facultad.",
    hint: "Joven LGBT rechazado de su hogar",
    year: 2022,
  },
];
