export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Granja Cabral",
    "url": "https://granjacabral.paragu-ai.com",
    "description": "Huevos frescos de granja en Coronel Oviedo",
    "telephone": "+595982911935",
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
