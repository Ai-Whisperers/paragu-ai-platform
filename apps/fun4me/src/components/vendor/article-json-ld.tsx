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
    "url": `https://fun4me.paragu-ai.com/blog/${slug}`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://fun4me.paragu-ai.com/blog/${slug}` }
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
