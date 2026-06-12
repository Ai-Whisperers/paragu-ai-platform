export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Granja Cabral",
    "url": "https://granjacabral.paragu-ai.com",
    "email": "contacto@granjacabral.com.py",
    "description": "Huevos frescos de granja en Coronel Oviedo",
    "telephone": "+595982911935",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Asuncion",
      "addressCountry": "PY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.4400,
      "longitude": -56.4400
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
