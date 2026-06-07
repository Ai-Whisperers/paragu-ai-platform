import { NextResponse } from "next/server"
import content from "@/content/es.json"

const c = content as Record<string, any>
const baseUrl = c.site?.url || "https://pitchy.paragu-ai.com"
const siteName = c.siteName || "Pitchy Blindex"
const description = c.metaDescription || "Vidrio Blindex para construcción en Paraguay."

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName} - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>${description}</description>
    <language>es</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${((c.blog || []) as Record<string, any>[]).map((post: any) => `
    <item>
      <title>${post.title}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${post.excerpt || ""}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
    </item>`).join("")}
  </channel>
</rss>`
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
