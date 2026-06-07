interface JsonLdProps {
  schema: Record<string, unknown>
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// LocalBusiness structured data for Magnolia
export function MagnoliaLocalBusinessJsonLd({
  name = "Magnolia Peluquería",
  description = "Professional hair salon in Asunción, Paraguay. Balayage, cuts, coloring, keratin and treatments.",
  phone = "+595986106062",
  address = "Asunción, Paraguay",
  lat = -25.2971,
  lng = -57.6401,
  openingHours = ["Tu-Sa 09:00-19:00"],
  url = "https://magnolia-peluqueria.paragu-ai.com",
  imageUrl = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
}: {
  name?: string
  description?: string
  phone?: string
  address?: string
  lat?: number
  lng?: number
  openingHours?: string[]
  url?: string
  imageUrl?: string
} = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["HairSalon", "LocalBusiness"],
    name,
    description,
    url,
    image: imageUrl,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Asunción",
      addressRegion: "Central",
      addressCountry: "PY",
      streetAddress: address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lng,
    },
    openingHoursSpecification: openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    })),
    priceRange: "$$",
    sameAs: [
      "https://instagram.com/magnolia_peluqueria",
      "https://facebook.com/magnolia.peluqueria",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "800",
    },
  }

  return <JsonLd schema={schema} />
}