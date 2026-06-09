import { NextResponse } from "next/server"

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Fun4Me Store - Blog</title>
    <link>https://fun4me.paragu-ai.com/blog</link>
    <description>Consejos, guías y contenido sobre bienestar íntimo y cuidado personal.</description>
    <language>es</language>
    <atom:link href="https://fun4me.paragu-ai.com/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  })
}
