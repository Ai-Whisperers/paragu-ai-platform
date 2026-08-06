import { readFileSync } from 'fs'
import { join } from 'path'

function loadSiteConfig() {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), 'site.json'), 'utf-8'))
  } catch {
    return {}
  }
}

export function OrganizationSchema() {
  const siteConfig = loadSiteConfig()
  const phone = siteConfig?.contact?.whatsapp || '595982515138'
  const email = siteConfig?.contact?.email || 'paraguaynexa@gmail.com'
  // Luana 2026-08-05: nexaparaguay.com.py is the only canonical link.
  // All other links (nexa.paragu-ai.com) have been removed.
  const SITE_URL = 'https://nexaparaguay.com.py'
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Nexa Paraguay',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/brand/logo.svg`,
    },
    description:
      'Professional advisory for permanent residency, banking and company incorporation in Paraguay for European citizens.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+595-${phone.slice(3)}`,
      email,
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English', 'Dutch', 'German'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Santa Teresa 2456',
      addressLocality: 'Asunción',
      addressCountry: 'PY',
      addressRegion: 'Central',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.2637,
      longitude: -57.5759,
    },
    sameAs: [
      'https://www.instagram.com/nexaparaguay',
      'https://www.facebook.com/nexaparaguay',
      'https://www.linkedin.com/company/nexaparaguay',
    ],
    areaServed: [
      { '@type': 'Country', name: 'Paraguay' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Europe' },
    ],
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
