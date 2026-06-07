export interface ContentData {
  site: { name: string; tagline: string; taglineEs: string; taglinePt: string }
  programs: Record<string, any>
  languages: { code: string; name: string; flag: string }[]
  en: LocalizedContent
  es: LocalizedContent
  [key: string]: any
}

export interface LocalizedContent {
  entry: {
    title: string; subtitle: string; languageLabel: string; pathLabel: string
    pathResidency: string; pathBusiness: string; continue: string; remember: string
  }
  investor: {
    hero: { title: string; subtitle: string; description: string; cta: string }
    team: { title: string; description: string }
    trackRecord: Record<string, string>
    testimonials?: { title: string; items: { quote: string; name: string; country: string; flag: string }[] }
    process: { title: string; subtitle: string; steps: { step: number; title: string; description: string }[] }
    comparisonTable?: Record<string, string>
    successStory?: Record<string, string>
    cta: { title: string; subtitle: string; cta: string }
  }
  business: {
    hero: { title: string; subtitle: string; cta: string }
    whatIsGV: { title: string; description: string; stats?: { value: string; label: string }[] }
    services: { title: string; subtitle: string; items: { icon: string; title: string; description: string }[] }
    chainOfTrust?: { title: string; subtitle: string; links: { title: string; description: string }[] }
    investorProfiles?: { title: string; subtitle: string; items: { type: string; needs: string; regions: string }[] }
    cta: { title: string; subtitle: string; cta: string }
  }
  faq: {
    title: string
    forDevelopers: { title: string; items: { q: string; a: string }[] }
    forLawFirms: { title: string; items: { q: string; a: string }[] }
    forBanks: { title: string; items: { q: string; a: string }[] }
  }
}
