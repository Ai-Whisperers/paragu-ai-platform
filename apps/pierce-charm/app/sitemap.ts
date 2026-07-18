import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";
import content from "@/content/es.json";
import type { SiteContent } from "@/lib/content-types";

const c = content as SiteContent;
const SITE = c.site?.url || "https://piercecharm.paragu-ai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = listPosts().map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/piercings`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/galeria`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...posts,
  ];
}