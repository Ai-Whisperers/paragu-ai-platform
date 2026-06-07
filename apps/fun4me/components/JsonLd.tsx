export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Fun4Me Store",
    "url": "https://fun4me.paragu-ai.com",
    "description": "Tienda de bienestar y productos para adultos en Paraguay. Envío discreto, calidad garantizada. Vibradores, lencería, BDSM y más.",
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
