/**
 * Static search index. Generated from the actual site data so it stays
 * in sync as we add content. Used by components/Search.tsx (client-side
 * Fuse.js search).
 *
 * Adding a new page: just add an entry to the right array. No need to
 * regenerate an index file or anything — this is plain data, fetched
 * as a static JSON at build time.
 */

import { guides } from "./guides";
import { activities } from "./activities";
import { events } from "./events-v2";
import { events as historyEvents } from "./events";

export type SearchHit = {
  title: string;
  href: string;
  description: string;
  category: string;
};

export const STATIC_PAGES: SearchHit[] = [
  { title: "Inicio", href: "/", description: "Club maškaráda — la noche donde el deseo usa máscara. Comunidad de kink y exploración consciente en Asunción.", category: "Página" },
  { title: "Eventos", href: "/eventos", description: "Calendario de eventos. Ediciones de gran formato y encuentros regulares. Próximos y pasados.", category: "Página" },
  { title: "Ritmo", href: "/ritmo", description: "1 alté por mes, 1 maskarada cada 4-6 meses, 1 grupo de Telegram. Calendario público.", category: "Página" },
  { title: "Sobre maškaráda", href: "/sobre", description: "Quiénes somos, qué ofrecemos, el nombre, el equipo.", category: "Página" },
  { title: "Comunidad", href: "/comunidad", description: "Eventos, encuentros, foro, cine, música, staff, reglas, consentimiento.", category: "Página" },
  { title: "Tienda", href: "/tienda", description: "Marketplace de la comunidad. Moñai Ropes y futuros vendors.", category: "Página" },
  { title: "Aplicar como vendor", href: "/tienda/aplicar", description: "Si tenés una tienda o un producto para la comunidad, aplicá.", category: "Página" },
  { title: "Tienda Moñai Ropes", href: "/tienda/monai", description: "Cuerdas shibari artesanales en cáñamo natural, hechas a mano en Asunción.", category: "Página" },
  { title: "Aprender", href: "/aprender", description: "Guías, glosario, y aprendizajes para la comunidad kink. Fundamentos, seguridad, logística, comunicación.", category: "Página" },
  { title: "Actividades", href: "/actividades", description: "Las prácticas de la comunidad: shibari, impact play, sensory deprivation, role play, psychological play, service play.", category: "Página" },
  { title: "Historia", href: "/historia", description: "Las ediciones pasadas: Simón Dice, Máscara Negra, Noche Oscura, Inauguración. Con fotos y recaps.", category: "Página" },
  { title: "Galería", href: "/galeria", description: "Las imágenes de nuestras noches. Por evento.", category: "Página" },
  { title: "Reglas del Club", href: "/reglas", description: "SSC / RACK. Consentimiento absoluto. +18 exclusivo. No fotos. Respeto. Dresscode.", category: "Página" },
  { title: "Consentimiento de uso de imagen", href: "/consentimiento", description: "Firmá el consentimiento para que tus fotos se publiquen.", category: "Página" },
  { title: "Contacto", href: "/contacto", description: "Mandanos un mensaje. Instagram, WhatsApp, email.", category: "Página" },
  { title: "Equipo", href: "/staff", description: "El equipo maškaráda: organización, DJ, seguridad, Moñai Ropes, artistas del cuerpo.", category: "Página" },
  { title: "Preguntas Frecuentes", href: "/faq", description: "Qué es maškaráda, qué necesitás, qué esperar, dresscode, etc.", category: "Página" },
  { title: "Entradas", href: "/entradas", description: "Tickets para las ediciones. Pre-Venta, General, VIP.", category: "Página" },
  { title: "Privacidad", href: "/privacidad", description: "Política de privacidad. Qué datos recopilamos y por qué.", category: "Página" },
  { title: "Manifiesto", href: "/manifiesto", description: "Lo que creemos, cómo nos vinculamos, qué defendemos. Principios SSC/RACK.", category: "Página" },
  { title: "Aliados", href: "/aliados", description: "Organizaciones, colectivos y comunidades aliadas. PY, LATAM, internacional.", category: "Página" },
  { title: "Sugerir un aliado", href: "/aliados/sugerir", description: "Conocés una org que debería estar en /aliados? Sugerila.", category: "Página" },
  { title: "Colaborar", href: "/colaborar", description: "Faltan personas, espacios, oficios. Tomá uno o sugerí uno.", category: "Página" },
  { title: "Sumar una necesidad", href: "/colaborar/sugerir", description: "Sumá una necesidad a /colaborar.", category: "Página" },
  { title: "Donar", href: "/donar", description: "Cómo apoyar maškaráda: transferencia bancaria, Tigo Money, o escribinos directo.", category: "Página" },
  { title: "Cine", href: "/cine", description: "Archivo curado de cine, cortos y series con temas kink/BDSM/fetish.", category: "Página" },
  { title: "Música y podcasts", href: "/musica", description: "Lo que suena en los eventos. DJ sets, mixtapes, podcasts sobre kink, consentimiento, sexualidad.", category: "Página" },
  { title: "Foro", href: "/foro", description: "Conversación de la comunidad por categoría. Hilos destacados.", category: "Página" },
  { title: "Testimonios", href: "/testimonios", description: "Lo que dice la gente que pasó por maškaráda.", category: "Página" },
  { title: "Enviar testimonio", href: "/testimonios/nuevo", description: "Compartí tu experiencia. Anónimo, primer nombre, o con nombre completo.", category: "Página" },
  { title: "Subir fotos", href: "/subir-fotos", description: "Compartinos las fotos que sacaste en un evento de maškaráda.", category: "Página" },
];

// Generate dynamic entries from data
function fromGuides() {
  return guides.map((g) => ({
    title: g.title,
    href: `/aprender/${g.slug}`,
    description: g.excerpt,
    category: "Aprender",
  }));
}
function fromActivities() {
  return activities.map((a) => ({
    title: a.name,
    href: `/actividades/${a.slug}`,
    description: a.tagline,
    category: "Actividad",
  }));
}
function fromEvents() {
  return events
    .filter((e) => e.status === "upcoming" || e.status === "past")
    .map((e) => ({
      title: e.title,
      href: e.kind === "evento" ? `/eventos/${e.slug}` : `/encuentros/${e.slug}`,
      description: e.description,
      category: e.kind === "evento" ? "Edición" : "Encuentro",
    }));
}
function fromHistory() {
  return historyEvents.map((e) => ({
    title: e.editionName,
    href: `/historia/${e.slug}`,
    description: e.theme,
    category: "Historia",
  }));
}

export const SEARCH_INDEX: SearchHit[] = [
  ...STATIC_PAGES,
  ...fromGuides(),
  ...fromActivities(),
  ...fromEvents(),
  ...fromHistory(),
];
