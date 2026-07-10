// Milestones in SOMOSGAY history, in chronological order.
// All dates verified against public materials.

export interface Hito {
  year: number;
  title: string;
  detail: string;
  kind: "fundación" | "programa" | "memoria" | "incidencia" | "alianza";
}

export const HITOS: Hito[] = [
  {
    year: 1959,
    title: "Septiembre · Razias",
    detail:
      "109 hombres gays son detenidos y torturados por la policía paraguaya. Bernardo Aranda Valdez es asesinado el 1 de septiembre. La prensa publica la 'Carta de un Amoral' — primera voz pública por la libertad sexual en Paraguay.",
    kind: "memoria",
  },
  {
    year: 2005,
    title: "Fundación de SOMOSGAY",
    detail:
      "Asociación Civil formalmente constituida en Asunción. Inicia el trabajo de incidencia política y construcción de comunidad.",
    kind: "fundación",
  },
  {
    year: 2010,
    title: "Centro Comunitario Tekoharã",
    detail:
      "Apertura del espacio de encuentro, formación y organización comunitaria. Hoy sigue funcionando como sede física de SOMOSGAY.",
    kind: "programa",
  },
  {
    year: 2014,
    title: "Apertura de Clínica Kunu'u",
    detail:
      "Primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. Testeo gratuito de VIH, sífilis, hepatitis B, PrEP, atención psicológica y psiquiátrica.",
    kind: "programa",
  },
  {
    year: 2014,
    title: "Equis · Primera app LGTBI+ de Paraguay",
    detail:
      "SOMOSGAY construye 'Equis' — primera 'app gay' paraguaya. Verificación manual de perfiles, moderación comunitaria. Dejó de operar comercialmente cuando llegaron apps globales.",
    kind: "programa",
  },
  {
    year: 2017,
    title: "Campaña 'Yo amo PrEP · Yo amo más seguro'",
    detail:
      "Lanzamiento de la campaña de prevención combinada más visible del Programa Kunu'u. Articulación con PRONASIDA, OPS/OMS Paraguay.",
    kind: "incidencia",
  },
  {
    year: 2020,
    title: "Informe Anual auditado",
    detail:
      "1.300+ tests de VIH en 2020. 100.000+ alcance en redes. Auditoría por Account Control & Asociados (registro 295/2020).",
    kind: "alianza",
  },
  {
    year: 2024,
    title: "20 años · 20 campañas",
    detail:
      "SOMOSGAY conmemora 20 años de trabajo continuo. Se renuevan los acuerdos con amfAR, UNAIDS, Global Fund y AHF.",
    kind: "alianza",
  },
  {
    year: 2026,
    title: "Lanzamiento sitio web oficial",
    detail:
      "somosgay.paragu-ai.com — primera plataforma web propia. Construida con principios OPSEC: sin rastreo, HTTPS forzado, accesible.",
    kind: "programa",
  },
];
