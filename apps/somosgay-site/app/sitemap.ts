import type { MetadataRoute } from "next";
import { content as c } from "@/lib/content";
const BASE = c.site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/programas`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/clinica-kunuu`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/memoria-108`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/donar`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/noticias`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/nosotros`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contacto`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}