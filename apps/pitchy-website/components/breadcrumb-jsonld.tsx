import content from "@/content/es.json"

const c = content as Record<string, any>
const baseUrl = c.site?.url || "https://pitchy.paragu-ai.com"

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
