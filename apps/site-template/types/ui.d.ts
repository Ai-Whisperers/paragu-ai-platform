declare module "@/content/es/ui.json" {
  const val: {
    description: string
    nav: Record<string, string>
    hero: Record<string, string>
    booking: Record<string, string>
    auth: Record<string, string> & { description: string }
    loyalty: Record<string, string>
    giftCards: Record<string, string>
    footer: Record<string, string>
    errors: Record<string, string>
    cookies: Record<string, string>
    exitIntent: Record<string, string>
    promotions: Record<string, string>
    gallery: Record<string, string>
    testimonials: Record<string, string>
    services: {
      title: string
      subtitle: string
      bookService: string
      verCategoria: string
      todosServicios: string
    }
    blog: {
      title: string
      subtitle: string
      description: string
      read: string
      time: string
      readMore: string
      by: string
    }
    faqs: { title: string; subtitle: string }
    team: Record<string, string>
    about: {
      title: string
      subtitle: string
      label: string
      storyIntro: string
      storySectionLabel: string
      storyTitle: string
      storyParagraphs: string[]
    }
    process: {
      title: string
      subtitle: string
      steps: Array<{ step: string; title: string; description: string }>
    }
    servicesSpecific: {
      needSomethingTitle: string
      needSomethingText: string
      needSomethingBtn: string
    }
    bookingPage: Record<string, string>
    contact: Record<string, string>
    cookieConsent: Record<string, string>
    giftCardsPage: Record<string, string>
    legal: {
      privacidad: {
        title: string
        lastUpdated: string
        sections: Array<{ title: string; content: string }>
      }
      terminos: {
        title: string
        sections: Array<{ title: string; body: string }>
      }
    }
  }
  export default val
}
declare module "@/content/en/ui.json" {
  const val: {
    description: string
    nav: Record<string, string>
    hero: Record<string, string>
    booking: Record<string, string>
    auth: Record<string, string> & { description: string }
    loyalty: Record<string, string>
    giftCards: Record<string, string>
    footer: Record<string, string>
    errors: Record<string, string>
    cookies: Record<string, string>
    exitIntent: Record<string, string>
    promotions: Record<string, string>
    gallery: Record<string, string>
    testimonials: Record<string, string>
    services: {
      title: string
      subtitle: string
      bookService: string
      verCategoria: string
      todosServicios: string
    }
    blog: {
      title: string
      subtitle: string
      description: string
      read: string
      time: string
      readMore: string
      by: string
    }
    faqs: { title: string; subtitle: string }
    team: Record<string, string>
    about: {
      title: string
      subtitle: string
      label: string
      storyIntro: string
      storySectionLabel: string
      storyTitle: string
      storyParagraphs: string[]
    }
    process: {
      title: string
      subtitle: string
      steps: Array<{ step: string; title: string; description: string }>
    }
    servicesSpecific: {
      needSomethingTitle: string
      needSomethingText: string
      needSomethingBtn: string
    }
    bookingPage: Record<string, string>
    contact: Record<string, string>
    cookieConsent: Record<string, string>
    giftCardsPage: Record<string, string>
    legal: {
      privacidad: {
        title: string
        lastUpdated: string
        sections: Array<{ title: string; content: string }>
      }
      terminos: {
        title: string
        sections: Array<{ title: string; body: string }>
      }
    }
  }
  export default val
}
