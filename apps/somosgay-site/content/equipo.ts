// Team data — names + roles verified against public SOMOSGAY materials.
// Photos not included in v1 (Paloma hasn't approved portrait usage).
// When real photos are ready, swap the placeholder avatar for `<img src={...}>`.

export interface TeamMember {
  name: string;
  role: string;
  area: "Liderazgo" | "Clínica" | "Programas" | "Comunicaciones" | "Administración";
  bio: string;
  since: number; // year joined SOMOSGAY
}

export const TEAM: TeamMember[] = [
  {
    name: "Simon(e) Nkurunziza",
    role: "Director Ejecutivo",
    area: "Liderazgo",
    bio: "Activista LGBTI+ paraguayo-burundés, dirige SOMOSGAY desde 2018. Trayectoria en incidencia política, prevención combinada de VIH y construcción de comunidad. Ha representado a Paraguay en ILGA Latin America, FOALP y otros espacios regionales.",
    since: 2014,
  },
  {
    name: "Paloma Vera",
    role: "Coordinadora Clínica Kunu'u",
    area: "Clínica",
    bio: "Coordina Clínica Kunu'u desde su apertura en 2014. Responde personalmente los mensajes de WhatsApp y gestiona las derivaciones a atención psicológica. Es el punto de contacto humano más visible de la organización.",
    since: 2014,
  },
  {
    name: "Equipo Salud Mental",
    role: "Atención psicológica y psiquiátrica",
    area: "Clínica",
    bio: "Profesionales formados en diversidad sexual y de género. Espacio afirmativo y libre de discriminación. Atención gratuita en Clínica Kunu'u previa coordinación por WhatsApp.",
    since: 2014,
  },
  {
    name: "Equipo de Comunicación",
    role: "Prensa, redes y visibilidad",
    area: "Comunicaciones",
    bio: "Mantiene los canales del SOMOSGAY: Instagram @somosgayorg, Facebook El Centro Somosgay, Twitter, YouTube y TikTok. Coordina campañas de PrEP y Memoria 108 con periodistas y aliados.",
    since: 2010,
  },
  {
    name: "Coordinación de Programas",
    role: "Tekoharã, Ñande Rekorã, Karu Porã, Programa Kunu'u",
    area: "Programas",
    bio: "Equipo multidisciplinario que coordina los cinco programas activos de SOMOSGAY. Trabajan en territorio, articulan con la clínica Kunu'u y representan a la comunidad en redes regionales.",
    since: 2010,
  },
  {
    name: "Administración y Auditoría",
    role: "Gestión financiera y rendición de cuentas",
    area: "Administración",
    bio: "Equipo responsable de los informes auditados por firmas independientes (Account Control & Asociados, registro 295/2020). Mantiene los reportes para amfAR, UNAIDS, Global Fund y AHF.",
    since: 2005,
  },
];
