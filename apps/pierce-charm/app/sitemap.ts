import type { MetadataRoute } from "next";
import content from "@/content/es.json";

const c = content as any;
const SITE = c.site?.url || "https://piercecharm.paragu-ai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/piercings`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/galeria`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
