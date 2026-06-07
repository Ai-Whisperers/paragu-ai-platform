import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://escribania.paragu-ai.com"

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
    { url: `${baseUrl}/servicios`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/nosotros`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contacto`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/privacidad`, lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ]

  const servicioSlugs = [
    "escrituras", "poderes", "contratos", "legalizaciones", "sucesiones", "societario",
  ]

  const servicePages = servicioSlugs.map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages]
}
