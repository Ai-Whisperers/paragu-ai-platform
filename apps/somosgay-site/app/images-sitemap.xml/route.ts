import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/content";

/**
 * Image sitemap — Google Image Search uses this to discover images.
 *
 * Hand-built XML because Next.js' MetadataRoute.Sitemap type doesn't expose
 * Google's image sitemap extension fields (`images`). We render the standard
 * sitemap XML with the image extension namespace directly.
 *
 * If we add event photos, program photos, or team photos later,
 * extend the `images` array with their public URLs.
 */
const PAGES = [
  "/",
  "/clinica-kunuu",
  "/donar",
  "/memoria-108",
  "/programas",
  "/nosotros",
  "/contacto",
];

const IMAGES = [`${SITE_URL}/opengraph-image`];

function buildImageSitemapXml(): string {
  const now = new Date().toISOString();
  const urlEntries = PAGES.map((p) => {
    const imageEntries = IMAGES.map(
      (img) => `    <image:image>\n      <image:loc>${img}</image:loc>\n    </image:image>`
    ).join("\n");
    const priority = p === "/" ? "1.0" : "0.7";
    return `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n${imageEntries}\n  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>`;
}

export function GET() {
  return new NextResponse(buildImageSitemapXml(), {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}