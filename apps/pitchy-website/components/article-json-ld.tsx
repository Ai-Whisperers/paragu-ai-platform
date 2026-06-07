import content from "@/content/es.json"

const c = content as Record<string, any>
const baseUrl = c.site?.url || "https://pitchy.paragu-ai.com"

export function ArticleJsonLd({ title, description, date, author, slug }: {
  title: string; description: string; date: string; author: string; slug: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "datePublished": date,
    "author": { "@type": "Person", "name": author },
    "url": `${baseUrl}/blog/${slug}`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${baseUrl}/blog/${slug}` }
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
