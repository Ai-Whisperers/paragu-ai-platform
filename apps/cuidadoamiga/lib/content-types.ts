// Explicit types for the content JSONs. JSON inference produces fragile union
// types; we declare the shape here so the rest of the codebase can depend on
// the contract, not on the inference.

import type { AdminContent } from './admin-types'

export interface SiteContent {
  _meta: {
    site: string
    tagline: string
    description: string
    url: string
    owner: string
    email: string
    locale: string
    country: string
  }
  navigation: {
    items: Array<{ label: string; href: string }>
    primaryCta: { label: string; href: string }
    adminLink: { label: string; href: string }
  }
  home: {
    hero: {
      eyebrow: string
      headline: string
      subheadline: string
      primaryCta: { label: string; href: string }
      secondaryCta: { label: string; href: string }
      stats: Array<{ value: string; label: string }>
    }
    intro: {
      title: string
      paragraphs: string[]
    }
  }
  comoFunciona: {
    title: string
    subtitle: string
    sections: InfoSection[]
  }
  protocolo: {
    title: string
    subtitle: string
    sections: InfoSection[]
  }
  unirse: {
    title: string
    subtitle: string
    form: {
      fields: { nombre: string; mail: string; pais: string; organizacion: string; motivo: string; comoSeEntero: string }
      comoSeEnteroOptions: Array<{ value: string; label: string }>
      consent: string[]
      submitLabel: string
    }
    success: { title: string; body: string }
  }
  reportar: {
    title: string
    subtitle: string
    form: {
      fields: {
        nombre: string
        victima: string
        fecha: string
        tipo: string
        pais: string
        descripcion: string
        direccion: string
        calle: string
        numero: string
        barrio: string
        ciudad: string
        cp: string
        fotoUrl: string
        fuentes: string
        procesoJudicial: string
      }
      tipoOptions: Array<{ value: string; label: string }>
      procesoOptions: Array<{ value: string; label: string }>
      submitLabel: string
    }
    success: { title: string; body: string }
    hints: { victima: string; fotoUrl: string; direccion: string }
  }
  recursos: {
    title: string
    subtitle: string
    emergencyBanner: { title: string; body: string }
    recursoTypes: { linea: string; org: string; web: string }
    missingBanner: string
  }
  faq: {
    title: string
    items: Array<{ q: string; a: string; isRich?: boolean }>
  }
  footer: {
    tagline: string
    disclaimer: string
    links: Array<{ label: string; href: string }>
    contact: { label: string; email: string }
  }
  errors: {
    rateLimit: string
    generic: string
    geocodeFailed: string
    loginInvalid: string
    solicitudConsent: string
    solicitudSend: string
    caseSend: string
  }
  caseTypes: { femicidio: string; abuso: string; acoso: string }
  judicialStates: { en_proceso: string; cerrado: string }
  admin: AdminContent
}

export type InfoSection = { title: string; items?: string[]; body?: string }
