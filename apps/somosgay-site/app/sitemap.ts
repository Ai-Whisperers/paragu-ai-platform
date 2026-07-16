import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { NEWS_ARTICLES } from "@/content/news";

// Sitemap strategy: ONE file with all URLs + image extensions inline.
// Google confirms that <image:image> in the main sitemap is the preferred
// format for image discovery — separate image-only sitemaps are only needed
// when the main sitemap exceeds 50,000 URLs (we're nowhere near that).
//
// Articles live under /noticias/[slug] and are statically generated —
// each one gets its own URL with the article's date as lastModified.

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const ogImage = `${SITE_URL}/opengraph-image`;

  // Base pages — most get the OG image included for Google Images indexing.
  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/programas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/clinica-kunuu`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/memoria-108`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/donar`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/noticias`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [ogImage],
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // News article URLs — Google News / Discover ingestion
  const articleEntries: MetadataRoute.Sitemap = NEWS_ARTICLES.map((a) => ({
    url: `${SITE_URL}/noticias/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [ogImage],
  }));

  return [...baseEntries, ...articleEntries];
}