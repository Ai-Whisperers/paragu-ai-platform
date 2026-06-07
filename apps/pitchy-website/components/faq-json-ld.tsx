import content from "@/content/es.json"

const c = content as Record<string, any>

export function FaqJsonLd() {
  const faq = c.faq || []
  if (faq.length === 0) return null

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
