import type { MetadataRoute } from "next"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dayah.paragu-ai.com"

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/premades`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/portafolio`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/privacidad`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terminos`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ]

  const portfolioPages = content.home.portfolio.items.map((item) => ({
    url: `${baseUrl}/portafolio/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...portfolioPages]
}
