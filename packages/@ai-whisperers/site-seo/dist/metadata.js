import { buildAlternates, pathForLocale } from "./alternates.js";
function deriveOgImage(slug, prefix, fallback) {
    if (!slug)
        return fallback;
    const normalized = slug.replace(/\//g, "-");
    return `${prefix}/og-${normalized}.png`;
}
export function buildMetadata(input, config) {
    const { slug, title, description, locale, ogImage, ogType = "website", publishedTime, modifiedTime, author, } = input;
    const { siteUrl, siteName, ogLocaleMap, defaultOgImage = "/og/og-home.png", ogImagePathPrefix = "/og", } = config;
    const alts = buildAlternates(slug, config);
    const ogLocale = ogLocaleMap?.[locale] ?? locale;
    const resolvedOgImage = ogImage ?? (slug ? deriveOgImage(slug, ogImagePathPrefix, defaultOgImage) : defaultOgImage);
    const ogUrl = locale === config.defaultLocale
        ? alts.canonical
        : `${siteUrl}${pathForLocale(slug, locale, config)}`;
    return {
        title,
        description,
        alternates: alts,
        openGraph: {
            type: ogType,
            locale: ogLocale,
            url: ogUrl,
            siteName,
            title,
            description,
            images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: title }],
            ...(publishedTime && { publishedTime }),
            ...(modifiedTime && { modifiedTime }),
            ...(author && { authors: [author] }),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [resolvedOgImage],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}
export function resolveSiteUrl(envVarName, fallback) {
    const g = globalThis;
    const fromEnv = g.process?.env?.[envVarName];
    return fromEnv || fallback;
}
//# sourceMappingURL=metadata.js.map