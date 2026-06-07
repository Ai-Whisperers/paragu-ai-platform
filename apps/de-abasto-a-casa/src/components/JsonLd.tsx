export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "de-abasto-a-casa",
    "url": "https://deabastoacasa.paragu-ai.com",
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
