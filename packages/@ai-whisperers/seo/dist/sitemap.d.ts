/**
 * Sitemap generator helper for Next.js App Router
 * Usage: import { generateSitemap } from "@ai-whisperers/seo"
 */
export interface SitemapEntry {
    url: string;
    lastModified?: Date | string;
    changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: number;
}
export interface SitemapOptions {
    baseUrl: string;
    pages: (string | SitemapEntry)[];
    locales?: string[];
    defaultLocale?: string;
    /**
     * For multi-locale sites, generate an alternates object for hreflang.
     */
    generateAlternates?: boolean;
}
/**
 * Generate a sitemap array for Next.js MetadataRoute.Sitemap
 * Supports single-locale and multi-locale sites.
 */
export declare function generateSitemap(options: SitemapOptions): SitemapEntry[];
/**
 * Slugify a string for URL-safe paths
 */
export declare function slugify(text: string): string;
//# sourceMappingURL=sitemap.d.ts.map