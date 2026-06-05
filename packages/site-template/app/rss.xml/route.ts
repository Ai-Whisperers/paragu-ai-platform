import { getAllPosts } from "@/lib/api/blog"
import { siteConfig } from "@/lib/config/config"

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function formatRssDate(dateStr: string): string {
  return new Date(dateStr).toUTCString()
}

export async function GET(): Promise<Response> {
  const site = siteConfig
  const business = site.business
  const posts = await getAllPosts("es")
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${site.site.url}/es/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${formatRssDate(post.date)}</pubDate>
      <guid>${site.site.url}/es/blog/${post.slug}</guid>
    </item>`
    )
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml((business?.name || site.site?.name) as string)}</title>
    <description>${escapeXml((site.site?.metaDescription || "") as string)}</description>
    <link>${(site.site?.url || "") as string}/es/blog</link>
    <language>es-py</language>
    <lastBuildDate>${formatRssDate(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${(site.site?.url || "") as string}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}