import { Scissors, Dumbbell, Flower2, Hand, PenTool, User, Sparkles, Palette, Zap, Eye, Globe, Smartphone, Search, MessageCircle } from 'lucide-react'

/**
 * Rubros grid — quick-pick cards shown above the showcase.
 * Each card uses an icon asset from /public/icons/ and an external link
 * to a live ParaguAI tenant. Designed for the cyberpunk theme.
 */
export type RubroCard = {
  id: string
  name: string
  href: string
  icon: string // path under /public/icons/
  badge: string // 'Demo live' | '<n> leads' | etc.
  color: string // hex used for the icon background tint
}

export const RUBROS: readonly RubroCard[] = [
  { id: 'indumentaria', name: 'Indumentaria', href: 'https://superspuma.paragu-ai.com', icon: '/icons/indumentaria.png', badge: 'Demo live', color: '#92400e' },
  { id: 'spa', name: 'Spa & Wellness', href: 'https://mantraspa.paragu-ai.com', icon: '/icons/spa-wellness.png', badge: '927 leads', color: '#7c9885' },
  { id: 'gimnasio', name: 'Gimnasio', href: 'https://bichosgym.paragu-ai.com', icon: '/icons/gimnasio.png', badge: '1,087 leads', color: '#2d6a4f' },
  { id: 'depilacion', name: 'Depilación', href: 'https://depiflash.paragu-ai.com', icon: '/icons/depilacion.png', badge: 'Demo live', color: '#be185d' },
  { id: 'reubicacion', name: 'Reubicación', href: 'https://nexa.paragu-ai.com', icon: '/icons/reubicacion.png', badge: 'Demo live', color: '#1e3a5f' },
  { id: 'belleza', name: 'Belleza', href: 'https://mantraspa.paragu-ai.com', icon: '/icons/belleza.png', badge: '2,393 leads', color: '#b76e79' },
]

export type Template = {
  id: string
  name: string
  icon: string
  leads: number
  pct: number
  demoSlug: string | null
  seoSlug: string
  seoHeadline: string
  seoLead: string
}

export const TEMPLATES: readonly Template[] = [
  { id: 'restaurant', name: 'Restaurante', icon: 'UtensilsCrossed', leads: 1834, pct: 91, demoSlug: 'demo-restaurant', seoSlug: 'restaurante', seoHeadline: 'Sitio web para restaurantes — menú digital, reservas y pedidos', seoLead: 'Tu menú actualizado, fotos de platos y botón de reservas. Los clientes sehen tu oferta sin esperar al mesero.' },
  { id: 'gimnasio', name: 'Gimnasio', icon: 'Dumbbell', leads: 2201, pct: 87, demoSlug: 'demo-gym', seoSlug: 'gimnasio', seoHeadline: 'Sitio web para gimnasios — horarios, planes y contacto por WhatsApp', seoLead: 'Mostrá tus planes, horarios y testimonios. Tus leads te escriben directo por WhatsApp.' },
  { id: 'ecommerce', name: 'Tienda online', icon: 'ShoppingCart', leads: 3104, pct: 94, demoSlug: 'demo-commerce', seoSlug: 'tienda-online', seoHeadline: 'Tienda online para Paraguay — inventario, pagos y envíos', seoLead: 'Tu catálogo 24/7, MercadoPago integrado y seguimiento de envíos. Vendés cuando dormís.' },
  { id: 'portfolio', name: 'Portfolio / Freelance', icon: 'User', leads: 1403, pct: 79, demoSlug: 'demo-portfolio', seoSlug: 'portfolio-freelance', seoHeadline: 'Sitio portfolio para creativos — muestrá tu trabajo, cobrál en USD', seoLead: 'Tu trabajo habla por vos. Portfolio profesional con formulario de contacto y pricing en dólares.' },
  { id: 'salon_belleza', name: 'Salón de Belleza', icon: 'Sparkles', leads: 1210, pct: 75, demoSlug: 'studio-belleza', seoSlug: 'salon-belleza', seoHeadline: 'Sitio web para salones de belleza — reservas y galería sin complicaciones', seoLead: 'Mostrá tus servicios, el equipo y la galería de trabajos. Tus clientas reservan por WhatsApp con un clic.' },
  { id: 'relocation', name: 'Reubicación', icon: 'Globe', leads: 0, pct: 0, demoSlug: 'nexa-paraguay', seoSlug: 'reubicacion', seoHeadline: 'Sitio web para servicios de reubicación — multi-idioma y profesional', seoLead: 'Sitio serio para clientes internacionales, multi-idioma, con proceso de trabajo, casos de éxito y contacto directo.' },
  { id: 'barberia', name: 'Barbería', icon: 'Scissors', leads: 988, pct: 72, demoSlug: null, seoSlug: 'barberia', seoHeadline: 'Sitio web para barberías — galería, servicios y reservas online', seoLead: 'Tu barbería online: galería de trabajos, servicios con precios y botón de reservas directo.' },
  { id: 'hotel', name: 'Hotel / Hospedaje', icon: 'Building2', leads: 654, pct: 68, demoSlug: null, seoSlug: 'hotel-hospedaje', seoHeadline: 'Sitio web para hoteles — habitaciones, reservas y contacto directo', seoLead: 'Mostrá tus habitaciones, tarifas y ubicación. Los huéspedes reservan directo sin comisiones.' },
  { id: 'ecommerce2', name: 'E-commerce básico', icon: 'ShoppingCart', leads: 2341, pct: 88, demoSlug: null, seoSlug: 'e-commerce-basico', seoHeadline: 'E-commerce básico para Paraguay — catálogo, precios y WhatsApp', seoLead: 'Tu negocio en internet: catálogo, precios en Gs y botón de pedido por WhatsApp. Sin complejidad.' },
  { id: 'servicios', name: 'Servicios profesionales', icon: 'Calculator', leads: 1109, pct: 71, demoSlug: null, seoSlug: 'servicios-profesionales', seoHeadline: 'Sitio para servicios profesionales — proceso, testimonios y contacto', seoLead: 'Tu expertise visible: proceso de trabajo, casos de éxito y formulario de contacto. Leids cualificados.' },
]

export const LIVE_TEMPLATES: readonly Template[] = TEMPLATES.filter((t) => t.demoSlug !== null)

export type RealClient = {
  slug: string
  name: string
  tagline: string
  vertical: string
  href: string
  color: string
  summary: string
  screenshot?: string
}

export const REAL_CLIENTS: readonly RealClient[] = [
  {
    slug: 'nexa',
    name: 'Nexa Paraguay',
    tagline: 'Reubicación Europa → Paraguay',
    vertical: 'Reubicación',
    href: 'https://nexa.paragu-ai.com',
    color: '#1e3a5f',
    summary: 'Programa de reubicación para europeos (4 idiomas)',
    screenshot: '/screenshots/nexa.jpg',
  },
  {
    slug: 'superspuma',
    name: 'Superspuma',
    tagline: 'Ropa oversize y streetwear paraguayo',
    vertical: 'Indumentaria',
    href: 'https://superspuma.paragu-ai.com',
    color: '#92400e',
    summary: 'Ropa oversize y streetwear paraguayo',
    screenshot: '/screenshots/superspuma.jpg',
  },
  {
    slug: 'reinadecopas',
    name: 'Reinadecopas',
    tagline: 'Cerveza artesanal paraguaya',
    vertical: 'Cerveza Artesanal',
    href: 'https://reinadecopas.paragu-ai.com',
    color: '#d97706',
    summary: 'Tienda online de cerveza artesanal paraguaya',
    screenshot: '/screenshots/reinadecopas.jpg',
  },
  {
    slug: 'fun4me',
    name: 'Fun4Me',
    tagline: 'Eventos infantiles y cumpleaños',
    vertical: 'Eventos / Kids',
    href: 'https://fun4me.paragu-ai.com',
    color: '#f59e0b',
    summary: 'Eventos infantiles y cumpleaños',
    screenshot: '/screenshots/fun4me.jpg',
  },
  {
    slug: 'magnolia-peluqueria',
    name: 'Magnolia Peluquería',
    tagline: 'Peluquería integral en barrio Oporto',
    vertical: 'Peluquería',
    href: 'https://magnolia-peluqueria.paragu-ai.com',
    color: '#b76e79',
    summary: 'Peluquería integral en barrio Oporto',
    screenshot: '/screenshots/magnolia-peluqueria.jpg',
  },
  {
    slug: 'depiflash',
    name: 'DepiFlash',
    tagline: 'Depilación láser IPL a domicilio',
    vertical: 'Depilación',
    href: 'https://depiflash.paragu-ai.com',
    color: '#be185d',
    summary: 'Depilación láser IPL a domicilio',
    screenshot: '/screenshots/depiflash.jpg',
  },
  {
    slug: 'dayah-litworks',
    name: 'Dayah LitWorks',
    tagline: 'Diseño de portadas · Amazon Prime Reading',
    vertical: 'Diseño / Literatura',
    href: 'https://dayah-litworks.paragu-ai.com',
    color: '#c44569',
    summary: 'Diseño de portadas, autora Amazon Prime Reading — 400+ portadas',
    screenshot: '/screenshots/dayah.jpg',
  },
  {
    slug: 'ozmontania',
    name: 'Oz Montanía',
    tagline: 'Artista visual paraguayo',
    vertical: 'Arte / Muralismo',
    href: 'https://ozmontania.paragu-ai.com',
    color: '#7c3aed',
    summary: 'Artista visual, muralista e ilustrador paraguayo',
    screenshot: '/screenshots/ozz.jpg',
  },
  {
    slug: 'elgatosiames',
    name: 'El Gato Siamés',
    tagline: 'Stand up comedy desde Paraguay',
    vertical: 'Comedia / Stand Up',
    href: 'https://elgatosiames.com',
    color: '#1a1a2e',
    summary: 'Camilo Acosta — stand up comedy, humor ácido y original desde Paraguay',
    screenshot: '/screenshots/elgatosiames.jpg',
  },
] as const

export type Testimonial = {
  name: string
  role: string
  quote: string
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Marcelo — Nexa Paraguay',
    role: 'Reubicación',
    quote: 'Necesitábamos un sitio serio en 4 idiomas para clientes europeos. ParaguAI lo entregó sin que toquemos código y lo replicó para Uruguay en días.',
  },
  {
    name: 'Iván — De Abasto a Casa',
    role: 'Food',
    quote: 'Mandé los datos por WhatsApp un jueves y el lunes el sitio estaba online con menú semanal, precios en Gs y botón de pedido. Los clientes reservan solos.',
  },
]

export type PlanFeature = { text: string; included: boolean }

export type Plan = {
  name: string
  setup: string
  monthly: string | null
  period: string
  description: string
  features: PlanFeature[]
  cta: string
  highlight?: boolean
  popular?: boolean
  waMessage: string
}

export const PLANS: readonly Plan[] = [
  {
    name: 'Prueba',
    setup: 'Gratis',
    monthly: null,
    period: '3 meses',
    description: 'Probá todo lo que ofrecemos antes de pagar nada. Sin tarjeta, sin compromiso.',
    features: [
      { text: 'Tu sitio en subdominio .paragu-ai.com', included: true },
      { text: 'WhatsApp + Google Maps + SSL', included: true },
      { text: 'Soporte por WhatsApp', included: true },
      { text: 'Demo lista en 48h', included: true },
      { text: 'Después: seguís online (marca ParaguAI) o pasás a plan pago', included: true },
      { text: 'Dominio propio (.com.py)', included: false },
      { text: 'Sin marca ParaguAI', included: false },
    ],
    cta: 'Pedir demo gratis',
    waMessage: 'Hola, quiero una demo gratis de mi sitio web con ParaguAI.',
  },
  {
    name: 'Presencia',
    setup: 'Gs 650.000',
    monthly: '+ Gs 100.000/mes',
    period: 'después de 7 meses incluidos',
    description: 'Tu primer sitio profesional con dominio propio. Los primeros 7 meses incluidos.',
    features: [
      { text: '7 meses con todas las features desbloqueadas', included: true },
      { text: 'Hasta 5 páginas', included: true },
      { text: 'Dominio propio .com.py incluido 1 año', included: true },
      { text: 'Hasta 15 fotos optimizadas', included: true },
      { text: 'Formulario + WhatsApp Business', included: true },
      { text: 'SEO básico + Google Maps', included: true },
      { text: '2 cambios de contenido al mes', included: true },
      { text: 'Soporte dedicado por WhatsApp', included: true },
    ],
    cta: 'Comenzar Presencia',
    waMessage: 'Hola, me interesa el plan Presencia (Gs 650.000 + 100.000/mes).',
  },
  {
    name: 'Crecimiento',
    setup: 'Gs 1.200.000',
    monthly: '+ Gs 150.000/mes',
    period: 'después de 8 meses incluidos',
    description: 'Reservas online, blog y catálogo de productos. Los primeros 8 meses incluidos.',
    features: [
      { text: '8 meses con todas las features desbloqueadas', included: true },
      { text: 'Todo lo de Presencia + páginas ilimitadas', included: true },
      { text: 'Sistema de reservas online', included: true },
      { text: 'Catálogo con hasta 20 productos', included: true },
      { text: 'Blog + analytics avanzado', included: true },
      { text: 'SEO avanzado + Schema.org', included: true },
      { text: '5 cambios al mes + soporte prioritario', included: true },
      { text: 'Emails profesionales', included: true },
    ],
    cta: 'Comenzar Crecimiento',
    popular: true,
    highlight: true,
    waMessage: 'Hola, me interesa el plan Crecimiento (Gs 1.200.000 + 150.000/mes).',
  },
  {
    name: 'Profesional',
    setup: 'Gs 2.200.000',
    monthly: '+ Gs 300.000/mes',
    period: 'después del período incluido',
    description: 'Cadenas, franquicias y multi-sucursal. Experiencia Profesional completa, siempre.',
    features: [
      { text: 'Experiencia Profesional completa, siempre', included: true },
      { text: 'Todo lo de Crecimiento sin límite de tiempo', included: true },
      { text: 'Hasta 5 sucursales / locales', included: true },
      { text: 'Sitio multi-idioma (es/en/pt)', included: true },
      { text: 'Integraciones personalizadas', included: true },
      { text: 'Account manager dedicado', included: true },
      { text: 'SLA 99.9% uptime', included: true },
      { text: '10 horas de desarrollo al mes', included: true },
    ],
    cta: 'Hablar con ventas',
    waMessage:
      'Hola, me interesa el plan Profesional (Gs 2.200.000 + 300.000/mes). Quiero hablar con ventas.',
  },
]

export const TEMPLATE_FEATURES = [
  { icon: MessageCircle, title: 'WhatsApp directo', desc: 'Botón flotante que lleva a tu WhatsApp Business. Tus clientes te escriben con un clic.' },
  { icon: Smartphone, title: '100% responsive', desc: 'Se ve perfecto en móvil, tablet y desktop. Optimizado para la forma en que miran tus clientes.' },
  { icon: Palette, title: 'Plantillas por rubro', desc: 'Diseños especializados pensados para tu tipo de negocio. Cada cliente arranca con la base correcta y ajustamos a tu marca.' },
  { icon: Zap, title: 'Listo en 48hs', desc: 'Mandás los datos, nosotros armamos el sitio. Sin reuniones, sin paperwork.' },
  { icon: Globe, title: 'Dominio .com.py', desc: 'Tu dirección en internet con extensión paraguaya. Incluye SSL y hosting.' },
  { icon: Eye, title: 'Ves antes de pagar', desc: 'Te mostramos tu sitio funcionando antes de que pagués un peso.' },
]

export function waLink(message: string): string {
  return `https://wa.me/595981324569?text=${encodeURIComponent(message)}`
}
