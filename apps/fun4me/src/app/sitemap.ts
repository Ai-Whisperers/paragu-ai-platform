import { MetadataRoute } from 'next';
import { getCategories, getProducts, getKinks } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fun4me.paragu-ai.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/tienda`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/promociones`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/buscar`, lastModified: now, changeFrequency: 'weekly', priority: 0.3 },
    { url: `${baseUrl}/login`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/registro`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/terminos`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacidad`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/envios`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/devoluciones`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/nosotros`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/eventos`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ];

  // Categories
  const categories = getCategories();
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categoria/${cat.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Products
  const products = getProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/producto/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Kinks
  const kinks = getKinks();
  const kinkPages: MetadataRoute.Sitemap = kinks.map((k) => ({
    url: `${baseUrl}/kink/${k.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...kinkPages];
}
