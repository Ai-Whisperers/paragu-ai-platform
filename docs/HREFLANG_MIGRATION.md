# Hreflang Migration to `@ai-whisperers/site-seo`

Playbook for migrating remaining apps from ad-hoc `alternates` blocks to
the shared `@ai-whisperers/site-seo` package. Reference implementation:
`apps/nexa-paraguay/lib/seo.ts` (bilingual `[locale]` router with the
shared adapter).

> **Note (2026-07-16):** `apps/dra-gabriela` was un-migrated back to a
> hand-rolled `lib/seo.ts` as part of the Ometz Dental rebrand — do not
> use it as the reference impl. The rebrand's per-locale metadata and
> `metadataBase` overrides diverged from the shared adapter's shape;
> re-migration is deferred until the rebrand stabilises.
>
> **Note (2026-07-17):** `apps/golden-visa-advisory` is architecturally
> exempt from the shared adapter. It uses a client-side React Context
> locale switcher (`src/lib/locale-context.tsx`) with a single URL —
> there are no `[locale]` route segments, so `buildAlternates`'s
> `/${locale}/slug` URL emission would point at pages that don't exist.
> Fixed in-place instead: added `metadataBase` + expanded `alternates.languages`
> to include `es` / `en` / `x-default` all pointing at the single canonical URL.

## When to migrate

Only apps that actually serve **more than one language variant** need
hreflang. Everything else can stay on hand-rolled `alternates: { canonical }`
without the package — spending workspace deps + build cost on a single-locale
site returns nothing.

## Current bilingual (or multi-lang) apps

Discovered via `[locale]` route segments and metadata alternates:

| App                    | Status              | Locales     | Priority |
| ---------------------- | ------------------- | ----------- | -------- |
| `dra-gabriela`         | un-migrated (Ometz rebrand) | en, es      | deferred |
| `nexa-paraguay`        | migrated (reference impl) | en, es      | done     |
| `ai-whisperers-site`   | migrated            | en, es      | done     |
| `bufete-mendez`        | migrated            | en, es      | done     |
| `golden-visa-advisory` | N/A — inline alternates (context-based single-URL locale switcher) | en, es      | exempt   |
| `maskarada`            | migrated            | en, es      | done     |

Everything else in `apps/` is single-locale (Spanish only in most cases).
Do not migrate single-locale apps — no hreflang benefit and the workspace
dep adds nothing.

## Migration steps (per bilingual app)

1. **Add workspace dep** to `apps/<name>/package.json`:
   ```json
   "dependencies": {
     "@ai-whisperers/site-seo": "workspace:*",
     ...
   }
   ```

2. **Create or update** `apps/<name>/lib/seo.ts` (or the local equivalent) as
   a thin adapter. See `apps/nexa-paraguay/lib/seo.ts` for the full pattern.
   Key config:
   ```ts
   const SITE_CONFIG: SiteConfig = {
     siteUrl: resolveSiteUrl("NEXT_PUBLIC_SITE_URL", "https://<host>"),
     defaultLocale: "en",           // canonical/x-default target
     locales: ["en", "es"] as const,
     slugMap: {
       // Only the from-locale side is needed if all callsites pass
       // canonical (defaultLocale) slugs.
       en: {
         "about": "nosotros",
         "services": "servicios",
         // ...
       },
     },
   }
   ```

3. **Replace `alternates` block** in `app/layout.tsx` (and any
   `[locale]/layout.tsx`) with:
   ```ts
   alternates: buildAlternates(""),
   ```
   For per-page metadata, use `buildMetadata({ slug, title, description, locale })`
   which returns the full `Metadata` shape (alternates + openGraph + twitter +
   robots) in one call.

4. **Delete the old hand-rolled `getAlternates` / URL string literals** in
   the app's `lib/`. Public API of the adapter (`buildMetadata`, `buildAlternates`,
   `absoluteUrl`) stays the same so no page-level edits are needed.

5. **Run** `pnpm -w install` at repo root (workspace symlink pickup) then
   `pnpm --filter <app> build` to verify.

## Notes on `slugMap` semantics

Package impl at `packages/@ai-whisperers/site-seo/src/alternates.ts`:
```
translateSlug(slug, fromLocale, toLocale, slugMap):
  if !slugMap or fromLocale == toLocale: return slug
  map = slugMap[fromLocale]?[slug]
  if map: return slugMap[toLocale]?[map] ?? map
  return slug
```

Practical rules:
- Callsites always pass slugs in the **canonical (defaultLocale) form**.
- Only `slugMap[defaultLocale]` is required (`{ en: { about: "nosotros" } }`);
  the shared `buildAlternates` will produce `/es/nosotros` correctly.
- Providing `slugMap[otherLocale]` is only useful when callsites might pass
  the ES-form slug and you want the alternate to still resolve — most apps
  don't need this.

## URL-consistency prerequisite

Before migrating, verify the app's `metadataBase`, `openGraph.url`, JSON-LD
`url`, and static `robots.txt`/`sitemap.xml` all point to the SAME host that
the Traefik router serves. Two live examples of misalignment fixed as part
of this batch:

- `trentina-cerveza`: metadata used `trentina.paragu-ai.com` (non-existent),
  Traefik serves `trentina-cerveza.paragu-ai.com`. Fixed in commit `71b55ef`.
- `mantra-spa`: metadataBase/OG/JSON-LD used `mantraspa.paragu-ai.com`,
  Traefik serves `mantra-spa.paragu-ai.com`. Fixed in commit `3ec3def`.

Check Traefik host with:
```bash
grep -r "traefik.http.routers.*rule=Host" apps/<name>/docker-compose.yml
```

## Skipping single-locale apps

Confirmed single-locale (no migration needed unless plans change):
`3md-website`, `arnos-barber-shop`, `bichos-gym`, `builder`, `camilo-acosta`,
`cocodrilo-fitness`, `cronos-academy`, `cuidadoamiga`, `dayah-litworks`,
`de-abasto-a-casa`, `depiflash`, `escribania-paraguay`, `estudio-medieval`,
`fun4me`, `fun4me-store`, `granja-cabral`, `hidrobaby-spa`, `jota-ink-tattoo`,
`luis-de-leon-concept`, `magnolia-peluqueria`, `mantra-spa`, `meal-prep`,
`nde-barba`, `nudo`, `ozmontania-website`, `pierce-charm`, `pitchy-website`,
`portas-barber`, `reina-de-copas`, `rockabar`, `scott-tatuajes`, `shine-nails`,
`site-template`, `stroopwafel-huis`, `superspuma`, `trentina-cerveza`,
`trentina-site`, `tsuki-restaurante`, `villamayor-asociados`, `xxgym`.

If any of these grow an English variant later: promote them to the bilingual
list above and follow the 5-step migration.
