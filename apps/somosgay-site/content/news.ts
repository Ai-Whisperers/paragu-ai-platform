// News article data for /noticias.
// All facts are sourced from public materials in somosgay-context.
// Each article is a NewsArticle in schema.org + a standalone route.

export interface NewsArticle {
  slug: string;
  title: string;
  dek: string; // sub-headline / one-sentence summary
  category: "Campaña" | "Memoria" | "Programa" | "Comunicado" | "Tecnología";
  date: string; // ISO 8601
  author: string;
  heroEyebrow: string;
  paragraphs: string[];
  keyFacts?: string[];
  tags?: string[];
  relatedLinks?: { label: string; href: string }[];
  authorRole?: string;
}

// Helper for related links
const SITE_PROGRAMS = {
  clinic: "/clinica-kunuu",
  prep: "/programas/programa-kunuu",
  memoria: "/memoria-108",
  tekohara: "/programas/centro-tekohara",
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: "lanzamiento-sitio-web-oficial",
    title: "SOMOSGAY lanza su sitio web oficial en somosgay.paragu-ai.com",
    dek: "La organización publica su plataforma digital renovada, accesible y libre de rastreo. Información de programas, clínica y memoria histórica en un solo lugar.",
    category: "Comunicado",
    date: "2026-07-10T16:00:00Z",
    author: "Equipo de comunicación SOMOSGAY",
    authorRole: "SOMOSGAY",
    heroEyebrow: "Lanzamiento · 10 julio 2026",
    paragraphs: [
      "SOMOSGAY presenta su nuevo sitio web oficial, una plataforma diseñada pensando en la comunidad LGTBI+ paraguaya y en las personas que buscan atención confidencial, gratuita y libre de discriminación.",
      "El sitio reúne información verificada de los cinco programas activos: Clínica Kunu'u (testeo de VIH/PrEP/sífilis/Hep B, atención psicológica y psiquiátrica), Centro Comunitario Tekoharã, Ñande Rekorã (cuidado mutuo), Karu Porã (seguridad alimentaria) y Programa Kunu'u (prevención combinada).",
      "Construido con principios OPSEC-conscious: sin cookies de terceros, sin analítica invasiva, con HTTPS forzado y cabeceras de seguridad reforzadas. Toda la información clínica se mantiene en la sede física de Independencia Nacional 1032 — el sitio web solo facilita el contacto inicial.",
      "La sección Memoria 108 documenta el trauma fundacional del movimiento LGTBI+ paraguayo (septiembre de 1959, razias contra 108 hombres en Asunción) y la Carta de un Amoral — publicada diez años antes de Stonewall. La sección se actualizará anualmente con la convocatoria al Mes de las Memorias.",
      "El sitio fue desarrollado por Ai-Whisperers como donación técnica, en el marco del compromiso con organizaciones de derechos humanos que operan en contextos políticos hostiles.",
    ],
    keyFacts: [
      "Sitio desarrollado como donación técnica por Ai-Whisperers",
      "Sin rastreo de terceros, sin cookies de analítica",
      "HTTPS forzado + cabeceras HSTS + CSP estricta",
      "Sitio responsive, accesible WCAG AA target",
    ],
    relatedLinks: [
      { label: "Conocé Clínica Kunu'u", href: SITE_PROGRAMS.clinic },
      { label: "Memoria 108", href: SITE_PROGRAMS.memoria },
      { label: "Doná a SOMOSGAY", href: "/donar" },
    ],
  },
  {
    slug: "clinica-kunuu-testeo-gratuito-2025",
    title: "Clínica Kunu'u atendió más de 1.300 tests de VIH en 2020 y mantiene atención gratuita en 2026",
    dek: "El Informe Anual 2020 auditado confirma el alcance de la primera clínica comunitaria dedicada a la salud LGTBI+ en Paraguay. La atención se mantiene sin costo y sin requerimiento de documento.",
    category: "Programa",
    date: "2026-02-13T13:00:00Z",
    author: "ABC Color · Cobertura periodística",
    authorRole: "ABC Color, 13 de febrero de 2025",
    heroEyebrow: "Cobertura · 13 febrero 2025",
    paragraphs: [
      "La Clínica Kunu'u, operada por SOMOSGAY desde su sede en Independencia Nacional 1032 (Asunción), mantiene un servicio gratuito y confidencial de testeo de VIH, sífilis y Hepatitis B, además de atención psicológica y psiquiátrica.",
      "Según el Informe Anual SOMOSGAY 2020 (auditado por Account Control & Asociados, registro 295/2020), la clínica realizó más de 1.300 tests rápidos de VIH en ese año y mantuvo un alcance combinado de 100.000+ personas a través de campañas de prevención en redes sociales.",
      "El espacio atiende de lunes a viernes de 13:00 a 17:00 (testeo sin turno) y los sábados de 10:00 a 15:00 (retiro de autotest). El equipo está capacitado en atención afirmativa para personas LGTBI+ y la información no se reporta a ningún registro público.",
      "La clínica también ofrece PrEP (Profilaxis Pre-Exposición, 99% de eficacia en la prevención de VIH) tras consulta inicial, y tratamiento antirretroviral (TARV) para personas ya diagnosticadas. Ambos servicios son gratuitos.",
      "Para reservar turno o confirmar disponibilidad, escribinos por WhatsApp al +595 986 173 200 o llamanos en horario de atención.",
    ],
    keyFacts: [
      "1.300+ tests de VIH en 2020 (Informe Anual auditado)",
      "100K+ alcance en redes sociales (campañas de prevención)",
      "Atención gratuita y confidencial — sin documento de identidad",
      "Lunes a viernes 13:00–17:00, sábado 10:00–15:00 (autotest)",
    ],
    relatedLinks: [
      { label: "Reservá por WhatsApp", href: SITE_PROGRAMS.clinic },
      { label: "Programa Kunu'u", href: SITE_PROGRAMS.prep },
    ],
  },
  {
    slug: "campana-prep-2023-2025",
    title: "Campaña 'Yo amo PrEP: Yo amo más seguro' crece en Paraguay",
    dek: "El Programa Kunu'u de SOMOSGAY promueve el acceso a PrEP como herramienta clave de prevención combinada. ABC Color documenta la expansión territorial de la iniciativa.",
    category: "Campaña",
    date: "2026-02-13T13:00:00Z",
    author: "ABC Color · Cobertura periodística",
    authorRole: "ABC Color, 13 de febrero de 2025",
    heroEyebrow: "Cobertura · 13 febrero 2025",
    paragraphs: [
      "El Programa Kunu'u de SOMOSGAY lanzó y mantiene la campaña 'Yo amo PrEP: Yo amo más seguro', una iniciativa de prevención combinada dirigida a hombres gays y otros hombres que tienen sexo con hombres.",
      "La campaña se articula con PRONASIDA (Programa Nacional de Control de VIH/SIDA/ITS), OPS/OMS Paraguay y la Clínica Kunu'u para difundir información basada en evidencia sobre PrEP — una pastilla diaria que reduce el riesgo de contraer VIH en 99%.",
      "Los materiales de la campaña están disponibles en español y guaraní, e incluyen testimonios reales de usuarios de PrEP para desestigmatizar el uso de la profilaxis pre-exposición.",
      "Además de la campaña en medios digitales (Instagram @somosgayorg, Facebook El Centro Somosgay), SOMOSGAY realiza jornadas territoriales de testeo combinado con consejería sobre PrEP. Las próximas fechas se anuncian en redes sociales.",
    ],
    relatedLinks: [
      { label: "Conocé Clínica Kunu'u", href: SITE_PROGRAMS.clinic },
      { label: "Programa Kunu'u", href: SITE_PROGRAMS.prep },
      { label: "Doná para sostener el programa", href: "/donar" },
    ],
  },
  {
    slug: "equis-app-primera-app-gay-paraguay",
    title: "Equis, la primera 'app gay' de Paraguay, nació del trabajo de SOMOSGAY",
    dek: "En 2014, antes de la explosión global de apps de encuentro, SOMOSGAY construyó Equis — un espacio seguro para la comunidad LGTBI+ paraguaya. Hoy, su legado vive en Tekoharã.",
    category: "Tecnología",
    date: "2026-01-15T13:00:00Z",
    author: "Hoy · Cobertura periodística",
    authorRole: "Hoy, 2014",
    heroEyebrow: "Historia · 2014",
    paragraphs: [
      "En 2014, mucho antes de que las principales apps de encuentro global llegaran a Paraguay, SOMOSGAY construyó Equis — la primera aplicación para teléfonos inteligentes de la comunidad LGTBI+ paraguaya.",
      "El proyecto fue una iniciativa del Centro Comunitario Tekoharã para ofrecer un espacio de encuentro seguro, con verificación manual de perfiles y moderación comunitaria. A diferencia de las apps comerciales, Equis se diseñó pensando en la seguridad y el bienestar de la comunidad, no en métricas de engagement.",
      "Equis dejó de operar comercialmente cuando el ecosistema global de apps llegó al país, pero el trabajo de Tekoharã continúa: hoy funciona como espacio de encuentro, formación y organización comunitaria, con actividades semanales y soporte entre pares.",
      "La historia de Equis es recordatorio de que SOMOSGAY siempre ha estado a la vanguardia tecnológica — sin perder de vista que la tecnología es una herramienta al servicio de la comunidad, no un fin en sí mismo.",
    ],
    relatedLinks: [
      { label: "Centro Comunitario Tekoharã", href: SITE_PROGRAMS.tekohara },
    ],
  },
  {
    slug: "memoria-108-setiembre-2026",
    title: "Mes de las Memorias 108 — septiembre 2026",
    dek: "Cada septiembre, SOMOSGAY y AIREANA conmemoran el trauma fundacional del movimiento LGTBI+ paraguayo. Las razias de 1959 contra 108 hombres gays siguen exigiendo memoria.",
    category: "Memoria",
    date: "2026-05-01T13:00:00Z",
    author: "Equipo de comunicación SOMOSGAY + AIREANA",
    authorRole: "SOMOSGAY · AIREANA",
    heroEyebrow: "Memoria · Anuncio · mayo 2026",
    paragraphs: [
      "El 1 de septiembre de 1959, Bernardo Aranda Valdez — locutor de Radio Comuneros de 25 años — fue asesinado en su casa del Barrio Obrero de Asunción. La policía usó su muerte como pretexto para diez días de razias que torturaron y detuvieron a más de 108 hombres gays.",
      "El 30 de septiembre de 1959, una semana antes de cerrar el mes de las razias, El País publicó la 'Carta de un Amoral' — la primera manifestación pública por la libertad sexual en Paraguay, escrita por los propios detenidos. Este texto precede a Stonewall (1969) por una década completa y es reclamado como documento fundacional del movimiento LGTBI+ paraguayo.",
      "Cada septiembre, AIREANA y SOMOSGAY co-organizan el Mes de las Memorias 108: jornadas de memoria, arte, formación y visibilización. Las actividades específicas de 2026 se anunciarán en los próximos meses.",
      "La cineasta Renate Costa dirigió '108 Cuchillo de Palo' (2010), documental que llevó el caso al cine internacional. El investigador Erwing Augsten Szokol publicó '108 Ciento Ocho' (2013, Arandura, Asunción, ISBN 978-99953-2-740-8), investigación histórica definitiva del caso.",
    ],
    keyFacts: [
      "Septiembre 1–30, 2026",
      "Co-organizado con AIREANA",
      "Sede: Asunción, Paraguay",
      "Documentos clave: '108 Cuchillo de Palo' (Costa, 2010) · '108 Ciento Ocho' (Augsten Szokol, 2013)",
    ],
    relatedLinks: [
      { label: "Memoria 108 completa", href: SITE_PROGRAMS.memoria },
    ],
  },
  {
    slug: "guia-completa-prep-2026",
    title: "PrEP en Paraguay: guía completa 2026",
    dek: "Todo lo que necesitás saber sobre la Profilaxis Pre-Exposición: qué es, cómo funciona, cuánto cuesta, dónde conseguirla en Asunción, y por qué reduce el riesgo de VIH en 99%.",
    category: "Campaña",
    date: "2026-07-10T18:00:00Z",
    author: "Equipo SOMOSGAY",
    authorRole: "Programa Kunu'u",
    heroEyebrow: "Guía · 10 julio 2026",
    paragraphs: [
      "PrEP (Profilaxis Pre-Exposición) es una pastilla que toma una persona VIH-negativa para reducir su riesgo de contraer VIH. La eficacia supera el 99% cuando se toma diariamente según indicación médica.",
      "La campaña 'Yo amo PrEP: Yo amo más seguro' del Programa Kunu'u de SOMOSGAY busca desestigmatizar el acceso a PrEP en Paraguay, donde persiste la confusión entre VIH y SIDA y aún circulan mitos sobre la profilaxis.",
      "En Paraguay, PrEP se consigue en Clínica Kunu'u (Asunción) tras una consulta inicial con profesionales formados en salud comunitaria LGTBI+. El medicamento, los controles de seguimiento y los análisis de sangre son gratuitos, sin requisito de documento de identidad ni orden médica.",
      "El estudio PROUD (2015, UK) y el estudio iPrEx (2010, multicéntrico) son los ensayos clínicos que demostraron la eficacia de PrEP en hombres gays y otros hombres que tienen sexo con hombres, así como en mujeres trans. En 2020, OMS incluyó PrEP en sus recomendaciones como herramienta estándar de prevención combinada.",
      "Los efectos secundarios son mínimos: algunas personas reportan náusea leve durante las primeras semanas. PrEP no protege contra otras ITS (sífilis, gonorrea, hepatitis C) — por eso se recomienda complementar con uso de preservativo y testeo regular cada 3 meses.",
      "SOMOSGAY también entrega materiales en español y guaraní, sesiones de preguntas y respuestas, y consejería entre pares. Hay líneas de WhatsApp confidenciales para personas que viven fuera de Asunción y quieren acceder a información antes de viajar.",
    ],
    keyFacts: [
      "Reduce el riesgo de VIH en 99% cuando se toma diariamente",
      "Gratuita en Clínica Kunu'u (Asunción), sin documento de identidad",
      "Funciona en hombres gays, mujeres trans, y otras poblaciones vulnerables",
      "No protege contra sífilis, gonorrea ni hepatitis C",
      "Sin patentes activos en Paraguay — disponible vía programas públicos",
    ],
    relatedLinks: [
      { label: "Clínica Kunu'u", href: SITE_PROGRAMS.clinic },
      { label: "Programa Kunu'u", href: SITE_PROGRAMS.prep },
      { label: "Donar para sostener PrEP gratuito", href: "/donar" },
    ],
  },
];

// Lookup helper
export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((a) => a.slug === slug);
}

// Sorted newest-first
export function getArticlesSorted(): NewsArticle[] {
  return [...NEWS_ARTICLES].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}