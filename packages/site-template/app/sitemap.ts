import type { MetadataRoute } from 'next';
import { getBlogIndex } from '../lib/content/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://tu-emprendimiento.com';

  const staticPages = [
    { path: '/es', priority: 1.0, freq: 'weekly' as const },
    { path: '/es/servicios', priority: 0.9, freq: 'monthly' as const },
    { path: '/es/contacto', priority: 0.6, freq: 'monthly' as const },
    { path: '/es/nosotros', priority: 0.6, freq: 'monthly' as const },
    { path: '/es/faq', priority: 0.6, freq: 'monthly' as const },
    { path: '/es/booking', priority: 0.9, freq: 'weekly' as const },
    { path: '/es/privacidad', priority: 0.3, freq: 'yearly' as const },
    { path: '/es/terminos', priority: 0.3, freq: 'yearly' as const },
    { path: '/es/blog', priority: 0.8, freq: 'weekly' as const },
    { path: '/es/ofertas', priority: 0.7, freq: 'weekly' as const },
    { path: '/es/tarjetas-de-regalo', priority: 0.7, freq: 'monthly' as const },
    { path: '/en', priority: 1.0, freq: 'weekly' as const },
    { path: '/en/servicios', priority: 0.9, freq: 'monthly' as const },
    { path: '/en/contacto', priority: 0.6, freq: 'monthly' as const },
    { path: '/en/nosotros', priority: 0.6, freq: 'monthly' as const },
    { path: '/en/faq', priority: 0.6, freq: 'monthly' as const },
    { path: '/en/booking', priority: 0.9, freq: 'weekly' as const },
    { path: '/en/privacidad', priority: 0.3, freq: 'yearly' as const },
    { path: '/en/terminos', priority: 0.3, freq: 'yearly' as const },
    { path: '/en/blog', priority: 0.8, freq: 'weekly' as const },
    { path: '/en/ofertas', priority: 0.7, freq: 'weekly' as const },
    { path: '/en/tarjetas-de-regalo', priority: 0.7, freq: 'monthly' as const },
  ];

  const buildBlogPages = async (lang: 'es' | 'en') => {
    try {
      // The blog index JSON is typed by tsc from its literal contents, so its
      // shape does not overlap with the runtime shape we expect. Route through
      // `unknown` before narrowing to satisfy TS 5.x's stricter cast checks.
      const index = (await getBlogIndex(lang)) as unknown as { posts?: { slug: string }[] };
      const slugs = Array.isArray(index.posts)
        ? index.posts.map(entry => entry.slug)
        : [];
      return slugs.map(slug => ({
        url: `${domain}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    } catch {
      return [];
    }
  };

  const [blogPagesEs, blogPagesEn] = await Promise.all([buildBlogPages('es'), buildBlogPages('en')]);

  return [
    ...staticPages.map(({ path, priority, freq }) => ({
      url: `${domain}${path}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
    })),
    ...blogPagesEs,
    ...blogPagesEn,
  ];
}
