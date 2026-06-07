import content from "@/content/es.json"

export function FaqJsonLd() {
  const faq = content.faq || []
  if (faq.length === 0) return null

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item: any) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
