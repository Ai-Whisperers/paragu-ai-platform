export interface SiteInfo {
  name: string
  shortName: string
  tagline: string
  description: string
  locale: string
  phone: string
  whatsapp: string
  email: string
  address: string
  city: string
  country: string
  founded: number
  hours: string
  instagram: string
  linkedin: string
  memberships: string[]
}

export interface StatItem {
  value: string
  label: string
}

export interface HeroContent {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCta: string
  secondaryCtaLink: string
  stats: StatItem[]
}

export interface ValueItem {
  title: string
  desc: string
}

export interface AboutContent {
  title: string
  intro: string
  mission: string
  vision: string
  values: ValueItem[]
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
  features: string[]
}

export interface ServicesContent {
  title: string
  subtitle: string
  items: ServiceItem[]
}

export interface ProcessStep {
  step: string
  title: string
  desc: string
}

export interface ProcessContent {
  title: string
  subtitle: string
  steps: ProcessStep[]
}

export interface TestimonialItem {
  author: string
  role: string
  text: string
  rating: number
}

export interface TestimonialsContent {
  title: string
  items: TestimonialItem[]
}

export interface FAQItem {
  q: string
  a: string
}

export interface ContactContent {
  title: string
  subtitle: string
  address_line1: string
  address_line2: string
  map_embed: string
}

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  date: string
  category: string
  readTime: string
}

export interface BlogContent {
  title: string
  subtitle: string
  posts: BlogPost[]
}

export interface FooterContent {
  copyright: string
  disclaimer: string
}

export interface Content {
  site: SiteInfo
  hero: HeroContent
  about: AboutContent
  services: ServicesContent
  process: ProcessContent
  testimonials: TestimonialsContent
  faq: FAQItem[]
  contact: ContactContent
  blog: BlogContent
  footer: FooterContent
}
