import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/content";

/**
 * Sitemap index — references sitemap.xml, sitemap-news.xml, images-sitemap.xml.
 * Submit this to Google Search Console instead of the individual sitemaps.
 */

function buildSitemapIndex(): string {
  const lastmod = new Date().toISOString();
  const entries = [
    "/sitemap.xml",
    "/sitemap-news.xml",
    "/images-sitemap.xml",
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((p) => `  <sitemap>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>`;
}

export function GET() {
  return new NextResponse(buildSitemapIndex(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
