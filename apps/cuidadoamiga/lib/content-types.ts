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
  ui: {
    search: UiSearch
    filter: UiFilter
    pagination: UiPagination
    country: UiCountryPicker
    date: UiDatePicker
    stat: UiStatCards
    chart: UiChart
    csv: UiCsv
    tag: UiTagLabels
    share: UiShare
    copy: UiCopy
    alert: UiAlert
    loading: UiLoading
  }
}

// ── UI component content types ──────────────────────────────────────────
export interface UiSearch {
  placeholder: string
  clearButton: string
  noResults: string
  resultsCount: string
  searching: string
}
export interface UiFilter {
  label: string
  allCountries: string
  allTypes: string
  allYears: string
  selectCountry: string
  selectType: string
  reset: string
  clearAll: string
}
export interface UiPagination {
  previous: string
  next: string
  page: string
  loading: string
}
export interface UiCountryPicker {
  placeholder: string
  noResults: string
  allCountries: string
}
export interface UiDatePicker {
  from: string
  to: string
  year: string
  allYears: string
}
export interface UiStatCards {
  totalCases: string
  totalCountries: string
  thisYear: string
  thisMonth: string
  trendUp: string
  trendDown: string
  noChange: string
}
export interface UiChart {
  byYear: string
  byCountry: string
  byType: string
  byJudicialState: string
  total: string
  noData: string
}
export interface UiCsv {
  download: string
  exporting: string
  error: string
  success: string
}
export interface UiTagLabels {
  femicidio: string
  abuso: string
  acoso: string
  en_proceso: string
  cerrado: string
}
export interface UiShare {
  twitter: string
  whatsapp: string
  facebook: string
  copyLink: string
  copied: string
  shareLink: string
}
export interface UiCopy {
  copy: string
  copied: string
  copyLink: string
}
export interface UiAlert {
  dismiss: string
  info: string
  success: string
  warning: string
  danger: string
}
export interface UiLoading {
  loading: string
  saving: string
  processing: string
  error: string
}

export type InfoSection = { title: string; items?: string[]; body?: string }
