# @ai-whisperers/site-seo

Portable SEO helpers extracted from `apps/dra-gabriela/lib/seo.ts`.

Every app in the fleet reimplements the same three concerns:
1. canonical URL + hreflang alternates for bilingual pages,
2. Next.js `generateMetadata` boilerplate (OG, Twitter, robots),
3. per-slug OG image resolution.

This package packages that pattern generically so any of the 45 apps can drop
its private `lib/seo.ts` and consume `@ai-whisperers/site-seo` instead.

## Why the site config is injected (not read from env inside the package)

Every app has its own domain, its own default locale, its own EN/ES slug map,
and its own site name. Reading those from env inside a shared package would
make the package effectively single-tenant. Instead, each app defines a
`SiteConfig` object once (typically in `lib/seo-config.ts`) and passes it to
`buildMetadata` / `buildAlternates`.

## Usage

```ts
// apps/<app>/lib/seo-config.ts
import type { BuildMetadataConfig } from "@ai-whisperers/site-seo"
import { resolveSiteUrl } from "@ai-whisperers/site-seo"

export const SEO_CONFIG: BuildMetadataConfig = {
  siteUrl: resolveSiteUrl("NEXT_PUBLIC_SITE_URL", "https://example.paragu-ai.com"),
  siteName: "Example Business",
  defaultLocale: "en",
  locales: ["en", "es"],
  slugMap: {
    en: { about: "about", services: "services" },
    es: { about: "nosotros", services: "servicios" },
  },
  ogLocaleMap: { en: "en_US", es: "es_PY" },
  defaultOgImage: "/og/og-home.png",
  ogImagePathPrefix: "/og",
}
```

```ts
// apps/<app>/app/[locale]/about/page.tsx
import { buildMetadata } from "@ai-whisperers/site-seo"
import { SEO_CONFIG } from "@/lib/seo-config"

export const generateMetadata = ({ params }) =>
  buildMetadata(
    {
      slug: "about",
      title: "About us",
      description: "…",
      locale: params.locale,
    },
    SEO_CONFIG
  )
```

## API

- `buildAlternates(slug, config)` — canonical + hreflang languages map.
- `buildMetadata(input, config)` — full Next.js Metadata object.
- `absoluteUrl(path, siteUrl)` — canonical absolute URL.
- `pathForLocale(slug, locale, config)` — locale-prefixed, slug-translated path.
- `resolveSiteUrl(envVarName, fallback)` — env-first with typed fallback.

## Slug maps

Slug maps are keyed by locale then by canonical (default-locale) slug:

```ts
slugMap: {
  en: { services: "services", "services/whitening": "services/whitening" },
  es: { services: "servicios", "services/whitening": "servicios/blanqueamiento" },
}
```

Missing entries fall back to the canonical slug (same string in every locale).
