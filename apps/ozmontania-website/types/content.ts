// Type definitions for Oz Montanía content JSON

export interface SiteConfig {
  title: string
  description: string
  url: string
  whatsapp: string
  instagram: string
  instagram_url: string
  facebook: string
  facebook_url: string
  email: string
}

export interface NavConfig {
  obra: string
  murales: string
  biografia: string
  prensa: string
  tienda: string
  blog: string
  contacto: string
}

export interface HeroConfig {
  headline: string
  subheadline: string
  description: string
  cta_primary: string
  cta_secondary: string
  cover: string
}

export interface StatItem {
  number: string
  label: string
}

export interface ObraItem {
  id: string
  title: string
  category: string
  year: number
  location: string
  technique?: string
  dimensions?: string
  description: string
  images: string[]
  featured: boolean
  has_print: boolean
  print_price?: number
}

export interface ObraConfig {
  title: string
  description: string
  categories: string[]
  items: ObraItem[]
}

export interface MuralLocation {
  id: string
  lat: number
  lng: number
  title: string
  address: string
  year: number
  image: string
}

export interface MuralesConfig {
  title: string
  description: string
  locations: MuralLocation[]
}

export interface TimelineEvent {
  year: string
  event: string
  detail: string
}

export interface SectionWithText {
  title: string
  text: string
}

export interface BiografiaConfig {
  title: string
  intro: string
  timeline: TimelineEvent[]
  quote: string
  quote_author: string
  section_influencias: SectionWithText
  section_filosofia: SectionWithText
}

export interface PressItem {
  media: string
  media_logo: string
  date: string
  title: string
  excerpt: string
  url: string
  type: string
  featured: boolean
}

export interface PrensaConfig {
  title: string
  description: string
  items: PressItem[]
}

export interface ShopItemSize {
  value: string
  price?: number
}

export interface ShopItem {
  id: string
  name: string
  type: string
  price: number
  currency: string
  image: string
  description: string
  sizes: string[]
  available: boolean
  obra_id?: string
  original_price?: number
}

export interface TiendaConfig {
  title: string
  description: string
  whatsapp_order: boolean
  items: ShopItem[]
}

export interface BlogPost {
  id: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
  image: string
  featured: boolean
}

export interface BlogConfig {
  title: string
  description: string
  items: BlogPost[]
}

export interface ContactFormConfig {
  name_label: string
  email_label: string
  phone_label: string
  project_type_label: string
  project_types: string[]
  budget_label: string
  budget_options: string[]
  message_label: string
  file_label?: string
  submit_label: string
}

export interface ContactoConfig {
  title: string
  subtitle: string
  description: string
  whatsapp_message: string
  whatsapp_label: string
  form: ContactFormConfig
}

export interface FooterLink {
  label: string
  url: string
}

export interface FooterSection {
  title: string
  items: FooterLink[]
}

export interface FooterConfig {
  copyright: string
  tagline: string
  links: Record<string, FooterSection>
}

export interface NotFoundConfig {
  title: string
  message: string
  cta: string
  subtext: string
}

export interface TestimonioItem {
  text: string
  author: string
  role: string
  project: string
}

export interface TestimoniosConfig {
  title: string
  description: string
  items: TestimonioItem[]
}

export interface SiteContent {
  site: SiteConfig
  nav: NavConfig
  hero: HeroConfig
  stats: StatItem[]
  obra: ObraConfig
  murales: MuralesConfig
  biografia: BiografiaConfig
  testimonios: TestimoniosConfig
  prensa: PrensaConfig
  tienda: TiendaConfig
  blog: BlogConfig
  contacto: ContactoConfig
  footer: FooterConfig
  not_found: NotFoundConfig
}
