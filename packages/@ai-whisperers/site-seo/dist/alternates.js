function stripLocale(path, locales) {
    const alt = locales.join("|");
    return path.replace(new RegExp(`^\\/(${alt})\\b`), "").replace(/^\/+/, "");
}
function withLocale(slug, locale) {
    return slug ? `/${locale}/${slug}` : `/${locale}`;
}
function translateSlug(slug, fromLocale, toLocale, slugMap) {
    if (!slugMap || fromLocale === toLocale)
        return slug;
    const map = slugMap[fromLocale]?.[slug];
    if (map)
        return slugMap[toLocale]?.[map] ?? map;
    return slug;
}
export function buildAlternates(slug, config) {
    const { siteUrl, defaultLocale, locales, slugMap } = config;
    const canonicalSlug = slug;
    const canonical = `${siteUrl}${withLocale(canonicalSlug, defaultLocale)}`;
    const languages = {};
    for (const locale of locales) {
        const localizedSlug = translateSlug(canonicalSlug, defaultLocale, locale, slugMap);
        languages[locale] = `${siteUrl}${withLocale(localizedSlug, locale)}`;
    }
    languages["x-default"] = canonical;
    return { canonical, languages };
}
export function absoluteUrl(path, siteUrl) {
    if (path.startsWith("http"))
        return path;
    return `${siteUrl}${path.startsWith("/") ? path : "/" + path}`;
}
export function pathForLocale(slug, locale, config) {
    const localized = translateSlug(slug, config.defaultLocale, locale, config.slugMap);
    return withLocale(localized, locale);
}
export { stripLocale, withLocale };
//# sourceMappingURL=alternates.js.map