/**
 * Team members for /staff. Each role has a public-facing bio, a slug
 * (used in /staff/[member] detail pages), and a list of responsibilities.
 * Photos are optional — when Kiki provides them, drop them in
 * public/images/staff/<slug>.jpg and they'll be picked up.
 */

export interface StaffMember {
  slug: string;
  role: string;
  name: string;
  bio: string;
  icon: string;
  responsibilities: string[];
  /** Optional photo path under /public. If set, renders the image. */
  photo?: string;
  /** Optional WhatsApp / contact link for inquiries. */
  contactHref?: string;
}

export const TEAM: StaffMember[] = [
  {
    slug: "organizacion",
    role: "Organización",
    name: "El equipo",
    icon: "🎭",
    bio: "Detrás de cada evento está un equipo que trabaja en silencio — coordinación, seguridad, producción y comunicación — para que cuando llegués, todo esté listo.",
    responsibilities: [
      "Coordinación general del evento (timing, espacios, accesos).",
      "Comunicación con asistentes antes, durante y después del evento.",
      "Logística: hidratación, comida, lockers, aftercare.",
      "Vínculo con vendors, fotógrafos, y staff temporal.",
    ],
  },
  {
    slug: "djs",
    role: "DJ Sets",
    name: "Sonido oscuro",
    icon: "🎶",
    bio: "EBM, dark techno, industrial y todo lo que mueve cuerpos en la oscuridad. Nuestra selección musical crea la atmósfera que define cada edición.",
    responsibilities: [
      "Selección musical por edición (dark, EBM, industrial, techno).",
      "Calibración del sistema de sonido para cada zona.",
      "Coordinación con performances y body painting.",
    ],
  },
  {
    slug: "shibari",
    role: "Shibari & Ropes",
    name: "Moñai Ropes",
    icon: "⛓️",
    bio: "El equipo de cuerdas shobari. Encargados de la Zona Cuerdas donde se realizan ligaduras conscientes, demostraciones y prácticas supervisadas. Todas nuestras cuerdas son artesanalmente hechas en Asunción.",
    responsibilities: [
      "Operación de la Zona Cuerdas en cada edición.",
      "Demostraciones de shibari supervisadas.",
      "Venta de cuerdas artesanales (jute, cotton, hemp) en /tienda.",
      "Asesoramiento a personas que se acercan al bondage por primera vez.",
    ],
    contactHref: "/tienda/monai",
  },
  {
    slug: "performer",
    role: "Performances",
    name: "Artistas del cuerpo",
    icon: "🎨",
    bio: "Body painting en vivo, performances eróticas y cuadros que transforman el espacio. Cada edición convoca artistas locales que traen algo único.",
    responsibilities: [
      "Body painting en vivo durante el evento.",
      "Cuadros de performance (escenas cortas, instalaciones).",
      "Coordinación con el equipo de música y luces.",
    ],
  },
  {
    slug: "seguridad",
    role: "Seguridad & Consentimiento",
    name: "El equipo SS",
    icon: "🛡️",
    bio: "Encargados de velar por el cumplimiento de las reglas SSC/RACK. Están para consensuar, intervienen cuando algo no está bien y sostienen el espacio seguro.",
    responsibilities: [
      "Verificación de identidad (+18) en puerta.",
      "Vigilancia del dresscode y de las reglas del Club.",
      "Recepción y resolución de reportes de incidentes.",
      "Disponibilidad como punto de apoyo si alguien necesita parar o retirarse.",
    ],
  },
];

export function getStaffMember(slug: string): StaffMember | undefined {
  return TEAM.find((m) => m.slug === slug);
}
