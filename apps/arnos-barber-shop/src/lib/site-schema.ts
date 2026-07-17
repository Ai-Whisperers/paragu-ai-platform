export const SITE_URL = "https://arnos.paragu-ai.com"

type SiteContent = {
  site: {
    name: string
    description: string
    phone: string
    whatsapp: string
    address: string
    city: string
    country: string
    url: string
    verificationStatus?: string
  }
  contact: { whatsappMessage: string }
  services: { items: { title: string; description: string; message: string }[] }
  faq: { items: { question: string; answer: string }[] }
}

export function buildBarberShopSchema(content: SiteContent) {
  const { site, contact } = content
  const reserveUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`

  return {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "@id": `${SITE_URL}/#barbershop`,
    name: site.name,
    description: site.description,
    url: SITE_URL,
    telephone: site.phone,
    image: `${SITE_URL}/og/og-image.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressCountry: "PY",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -25.3419,
      longitude: -57.5083,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "21:00",
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: reserveUrl,
      result: {
        "@type": "Reservation",
        name: "Consulta de turno",
      },
    },
  }
}

export function buildServicesSchema(content: SiteContent) {
  return content.services.items.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    name: service.title,
    description: service.description,
    priceCurrency: "PYG",
    price: "0.00",
    availability: "https://schema.org/InStock",
    url: `https://wa.me/${content.site.whatsapp}?text=${encodeURIComponent(service.message)}`,
  }))
}

export function buildFaqSchema(content: SiteContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}
