// SchemaJsonLd — emits JSON-LD structured data for a landing page.
// Renders 3 (or 4 with product) <script type="application/ld+json"> tags:
//   1. LocalBusiness       — service provider with phone/email/hours
//   2. Organization        — publisher with logo, social, founding date
//   3. FAQPage             — every FAQ converted to Question/Answer
//   4. Product (optional)  — for landing pages that sell a specific SKU
//
// Schema.org is JSON-LD-only at runtime — types below are illustrative TS
// interfaces, not external imports (the site doesn't depend on schema-dts).

interface Address {
  "@type": "PostalAddress"
  streetAddress: string
  addressLocality: string
  addressRegion: string
  addressCountry: string
}

interface LocalBusinessSchema {
  "@context": "https://schema.org"
  "@type": "LocalBusiness"
  "@id": string
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: Address
  areaServed: { "@type": "Country"; name: string }
  knowsLanguage: string[]
  priceRange: string
  openingHoursSpecification: Array<{
    "@type": "OpeningHoursSpecification"
    dayOfWeek: string | string[]
    opens: string
    closes: string
  }>
  contactPoint: Array<{
    "@type": "ContactPoint"
    contactType: string
    telephone: string
    areaServed: string
    availableLanguage: string[]
  }>
  sameAs: string[]
}

interface OrganizationSchema {
  "@context": "https://schema.org"
  "@type": "Organization"
  "@id": string
  name: string
  alternateName?: string
  url: string
  logo: string
  description: string
  foundingDate: string
  address: Address
  contactPoint: Array<{
    "@type": "ContactPoint"
    contactType: string
    telephone: string
    email: string
    areaServed: string[]
    availableLanguage: string[]
  }>
  sameAs: string[]
}

interface FAQPageSchema {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  "@id": string
  url: string
  name: string
  description: string
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: { "@type": "Answer"; text: string }
  }>
}

interface ProductSchema {
  "@context": "https://schema.org"
  "@type": "Product"
  name: string
  description: string
  brand: { "@type": "Brand"; name: string }
  url: string
  offers?: { "@type": "Offer"; priceCurrency: string; price: string; availability: string }
  image?: string
}

export interface SchemaJsonLdProps {
  site: {
    name: string
    description: string
    phone: string
    whatsapp: string
    email: string
    address: string
    basedIn: string
    serviceArea: string
    github: string
    liveSite: string
    founded?: string
  }
  pageUrl: string
  pageTitle: string
  pageDescription: string
  imageUrl?: string
  faqs: Array<{ q: string; a: string }>
  productName?: string
  productDescription?: string
  productPrice?: string
  productCurrency?: string
}

const PHONE_E164 = "+595991501444"

export function SchemaJsonLd(props: SchemaJsonLdProps) {
  const { site, pageUrl, pageTitle, pageDescription, imageUrl, faqs, productName, productDescription, productPrice, productCurrency } = props

  const addr: Address = {
    "@type": "PostalAddress",
    streetAddress: site.address,
    addressLocality: "San Lorenzo",
    addressRegion: "Central",
    addressCountry: "PY",
  }

  const localBusiness: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.liveSite}#organization`,
    name: site.name,
    description: site.description,
    url: site.liveSite,
    telephone: site.phone,
    email: site.email,
    address: addr,
    areaServed: { "@type": "Country", name: "Paraguay" },
    knowsLanguage: ["es", "en", "pt", "nl"],
    priceRange: "Gs 97.000 - Gs 639.000 /mes",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PHONE_E164,
        areaServed: "PY",
        availableLanguage: ["Spanish", "English", "Portuguese", "Dutch"],
      },
    ],
    sameAs: [site.github],
  }

  const organization: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.liveSite}#org`,
    name: site.name,
    alternateName: "AI Whisperers",
    url: site.liveSite,
    logo: `${site.liveSite}/og/og-home.png`,
    description: site.description,
    foundingDate: site.founded || "2025-11",
    address: addr,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: PHONE_E164,
        email: site.email,
        areaServed: ["PY", "AR", "BR", "UY", "NL", "BE", "DE", "US"],
        availableLanguage: ["Spanish", "English", "Portuguese", "Dutch"],
      },
    ],
    sameAs: [site.github],
  }

  const faqPage: FAQPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  }

  const product: ProductSchema | null = productName
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productName,
        description: productDescription || pageDescription,
        brand: { "@type": "Brand", name: site.name },
        url: pageUrl,
        ...(productPrice && {
          offers: {
            "@type": "Offer",
            priceCurrency: productCurrency || "PYG",
            price: productPrice,
            availability: "https://schema.org/InStock",
          },
        }),
        ...(imageUrl ? { image: imageUrl } : {}),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
        />
      )}
    </>
  )
}
