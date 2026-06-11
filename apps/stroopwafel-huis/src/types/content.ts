export interface Content {
  siteName: string
  businessName: string
  tagline: string
  navigation: NavItem[]
  home: HomeSection
  menu: MenuSection
  historia: PageSection
  ubicacion: LocationSection
  catering: PageSection
  faq: FaqSection
  whatsapp: { phone: string; message: string }
  contacto: ContactSection
  footer: FooterSection
  privacidad: PageSection
  terminos: PageSection
}

export interface NavItem {
  label: string
  href: string
}

export interface HomeSection {
  hero: {
    headline: string
    subheadline: string
    ctaPrimary: string
    ctaSecondary: string
  }
  whatIs: {
    title: string
    body: string
    tip: string
    cta: string
  }
  weeklyFlavor: {
    title: string
    subtitle: string
    name: string
    description: string
    price: string
    cta: string
  }
  favorites: {
    title: string
    items: { name: string; price: string; description: string }[]
  }
  story: {
    title: string
    body: string
    author: string
  }
  location: {
    title: string
    address: string
    phone: string
    email: string
    hours: { days: string; time: string }[]
    cta: string
  }
  instagram: {
    title: string
    handle: string
  }
}

export interface MenuSection {
  title: string
  subtitle: string
  categories: MenuCategory[]
}

export interface MenuCategory {
  name: string
  items: MenuItem[]
}

export interface MenuItem {
  name: string
  price: string
  description: string
}

export interface PageSection {
  title: string
  body: string
  cta?: string
}

export interface LocationSection {
  title: string
  body: string
  address: string
  phone: string
  email: string
  hours: { days: string; time: string }[]
  mapEmbed?: string
}

export interface FaqSection {
  title: string
  items: { question: string; answer: string }[]
}

export interface ContactSection {
  title: string
  subtitle: string
  cta: string
}

export interface FooterSection {
  text: string
  social: { platform: string; url: string }[]
}
