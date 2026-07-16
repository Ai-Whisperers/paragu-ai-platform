# @ai-whisperers/site-content

Content-layer utilities extracted from `apps/dra-gabriela/lib/content.ts`.

Solves three fleet-wide pain points:

1. **Placeholder leaks.** Multiple apps ship `+595****0000`, `TODO_PHONE`,
   `0981 000 000` in prod because guards were per-app or missing.
2. **Silent `loadContent` failures.** Barbershop cluster's `loadContent` had
   `catch { return null }`, so JSON errors rendered blank sections in prod.
   This loader **throws with filepath context**. Always.
3. **WhatsApp link + phone display.** ~30 apps hand-roll `wa.me/` URLs.

## API

### `isPlaceholder(value): boolean`

Detects `TODO`, `TODO_PHONE`, `PENDING`, `PENDIENTE`, `TBD`, `Lorem`,
`[PLACEHOLDER…]`, `000 000`, `+595****`, empty, whitespace-only.

### `whatsappLink(raw, message?, opts?): string | null`

Normalizes to E.164 (defaults to Paraguay country code `595`), URL-encodes the
message, returns `https://wa.me/<num>?text=<msg>` or `null` for placeholder input.

```ts
whatsappLink("0981 234 567", "Hola") // "https://wa.me/595981234567?text=Hola"
whatsappLink("+595****0000")         // null (placeholder)
```

### `phoneDisplay(raw, opts?): string | null`

Pretty-prints as `+595 981 234-567`. Returns `null` for placeholder input.

### `truncate(s, n=160): string`

Hard cut with ellipsis, snaps back to the last word boundary if it's within
40% of `n`.

### `loadContent<T>(filepath): T`

Reads JSON. **Throws `ContentLoadError`** on ANY failure (fs error, JSON parse
error). The error carries the filepath and the underlying cause. Never
returns null on catch — the barbershop-cluster silent-swallow anti-pattern is
what motivated this package.

### `loadContentOptional<T>(filepath, fallback): T`

For truly optional files (e.g. per-locale overrides). Logs a warning via
`console.warn` and returns the fallback on failure. Use sparingly — most
missing content files should be loud errors.

## Consumer example

```ts
import {
  isPlaceholder,
  whatsappLink,
  phoneDisplay,
  loadContent,
} from "@ai-whisperers/site-content"

const site = loadContent<SiteConfig>(path.join(process.cwd(), "content/site.json"))

if (!isPlaceholder(site.phone)) {
  console.log(phoneDisplay(site.phone), whatsappLink(site.phone))
}
```
