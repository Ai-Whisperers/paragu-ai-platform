export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ozmontania-website",
    "url": "https://ozmontania.paragu-ai.com",
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
