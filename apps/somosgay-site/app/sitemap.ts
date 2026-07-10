import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { NEWS_ARTICLES } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const baseEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/programas`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/clinica-kunuu`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/memoria-108`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/donar`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/noticias`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/nosotros`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contacto`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  // News article URLs — Google News / Discover ingestion
  const articleEntries: MetadataRoute.Sitemap = NEWS_ARTICLES.map((a) => ({
    url: `${SITE_URL}/noticias/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...baseEntries, ...articleEntries];
}