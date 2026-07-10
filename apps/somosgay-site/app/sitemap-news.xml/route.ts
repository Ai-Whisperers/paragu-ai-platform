import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/content";
import { NEWS_ARTICLES } from "@/content/news";

/**
 * Google News sitemap.
 *
 * Google wants news-published URLs in sitemap-news.xml, separate from the
 * main sitemap. Each <url> has only <loc> + <news:news> + <publication>
 * block. Use a sitemap index to reference this from robots.
 */

function buildNewsSitemapXml(): string {
  const now = new Date().toISOString();

  const urlEntries = NEWS_ARTICLES.map((a) => {
    const articleUrl = `${SITE_URL}/noticias/${a.slug}`;
    return `  <url>
    <loc>${articleUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>SOMOSGAY Paraguay</news:name>
        <news:language>es-PY</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.date).toISOString()}</news:publication_date>
      <news:title>${a.title.replace(/[<>&]/g, "")}</news:title>
      <news:keywords>${a.tags?.join(",") ?? ""}</news:keywords>
      <news:genres>PressRelease</news:genres>
    </news:news>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;
}

export function GET() {
  return new NextResponse(buildNewsSitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
