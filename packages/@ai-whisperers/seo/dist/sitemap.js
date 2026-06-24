/**
 * Sitemap generator helper for Next.js App Router
 * Usage: import { generateSitemap } from "@ai-whisperers/seo"
 */
/**
 * Generate a sitemap array for Next.js MetadataRoute.Sitemap
 * Supports single-locale and multi-locale sites.
 */
export function generateSitemap(options) {
    const { baseUrl, pages, locales, defaultLocale, generateAlternates = false } = options;
    const entries = [];
    for (const page of pages) {
        const entry = typeof page === "string" ? { url: page } : page;
        if (locales && locales.length > 0 && generateAlternates) {
            // For multi-locale sites, generate one entry per locale
            for (const locale of locales) {
                const localePath = locale === defaultLocale ? entry.url : `/${locale}${entry.url}`;
                entries.push({
                    url: `${baseUrl}${localePath}`,
                    lastModified: entry.lastModified,
                    changeFrequency: entry.changeFrequency,
                    priority: entry.priority,
                });
            }
        }
        else {
            entries.push({
                url: `${baseUrl}${entry.url.startsWith("/") ? "" : "/"}${entry.url}`,
                lastModified: entry.lastModified,
                changeFrequency: entry.changeFrequency,
                priority: entry.priority,
            });
        }
    }
    return entries;
}
/**
 * Slugify a string for URL-safe paths
 */
export function slugify(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
//# sourceMappingURL=sitemap.js.map