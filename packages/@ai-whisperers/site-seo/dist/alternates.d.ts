export type Locale = string;
export interface SiteConfig {
    siteUrl: string;
    defaultLocale: Locale;
    locales: readonly Locale[];
    slugMap?: Record<Locale, Record<string, string>>;
}
export interface AlternatesResult {
    canonical: string;
    languages: Record<string, string>;
}
declare function stripLocale(path: string, locales: readonly Locale[]): string;
declare function withLocale(slug: string, locale: Locale): string;
export declare function buildAlternates(slug: string, config: SiteConfig): AlternatesResult;
export declare function absoluteUrl(path: string, siteUrl: string): string;
export declare function pathForLocale(slug: string, locale: Locale, config: SiteConfig): string;
export { stripLocale, withLocale };
//# sourceMappingURL=alternates.d.ts.map