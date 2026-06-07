export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "golden-visa-advisory",
    "url": "https://goldenvisa.paragu-ai.com",
    "description": "",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Asuncion",
      "addressCountry": "PY"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
