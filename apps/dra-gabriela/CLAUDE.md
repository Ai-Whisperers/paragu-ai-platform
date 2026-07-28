# dra-gabriela (Ometz Dental) — client-scoped agent instructions

Rebrand of the prior IOA / Instituto de Odontología Avanzada site. Client: **Dra. Gabriella González Pane**. Deploy target inherits repo default (Hostinger + Traefik). Inherits palette / no-gradient / pnpm / port rules from `paragu-ai-platform/CLAUDE.md`. This file overrides only where the client differs.

## Canonical facts (do not re-derive, do not re-ask)

- **Practice email**: `DrGabriellaGonzalez@ometzdental.com` — the ONLY email. Never re-introduce `doctora.gabi@ometzdental.com.py` (deprecated).
- **Base consultation price**: `Gs 125.000` (EN: `PYG 125,000`). This is the ONLY price ever rendered on the site. Everything else → `"Cotización en consulta"` / `"Quoted at consultation"`.
- **WhatsApp**: `+595 981 146 759` (`c.business.whatsapp`, `c.business.whatsappMessage`).
- **Hours**: Mon–Fri 14:30–19:00.
- **Address**: Auditores de la Guerra del Chaco 617, Asunción.
- **Doctor headline copy**: "Twenty years of active practice in Asunción…" / "Veinte años de práctica en Asunción…" — do NOT re-introduce "conservadora" / "conservative".

## Content shape (schema surprises, keep in mind)

- **No `business.json` file exists.** Business data lives inside `content/{es,en}/site.json` at `.business.*` — reached via `getContent(locale)`.
- Locale JSON basenames use their language:
  - ES: `nosotros.json`, `contacto.json`, `precios.json`, `segunda-opinion.json`, `primera-visita.json`
  - EN: `about.json`, `contact.json`, `pricing.json`, `second-opinion.json`, `first-visit.json`
- Email plumbing spans **7 files** (all now canonical):
  1. `content/es/site.json` (`email`, `email_display`)
  2. `content/en/site.json` (`email`, `email_display`)
  3. `content/es/contacto.json` (contact-methods entry)
  4. `content/en/contact.json` (contact-methods entry)
  5. `content/es/ld-localbusiness.json` (schema.org `email`)
  6. `content/en/ld-localbusiness.json` (schema.org `email`)
  7. `components/sections/CtaBanner.tsx` (email-fallback block, 4 occurrences — safe with `replace_all: true`)

## Routing decisions (canonical URLs, do not rename again)

- Consultation-info page canonical routes: **`/en/first-visit`** and **`/es/primera-visita`**. Fold consultation-price fact here.
- **Deprecated**: `/en/pricing` and `/es/precios` — these MUST be `redirect()` shells that send visitors to `/first-visit` / `/primera-visita`. Do not resurrect them as real pages.
- `/es/contacto` re-exports `/en/contact/page.tsx` — one edit covers both locales.

## Home layout order (canonical, per Ivan's handwritten notes)

1. Hero — left-column image **carousel synced to phrase rotator**.
2. MeetDoctor.
3. "How I work" — three numbered step cards, number + title ONLY (strip body copy). This block ALSO includes the CTA buttons ("See contact details" + "Book your consultation"). "Book a consultation" block is merged into this one; do not add a separate booking block.
4. "Hear from the Doctor" — voice-letter block with empty `<audio>` slot + ES letter (EN translation TBD). Verbatim ES text lives in `content/es/home.json` under a stable key; do not paraphrase.
5. Services / bundles — cards are **WhatsApp deep-links** (per-treatment ES/EN canned message). No price render. The `Number(b.priceGs).toLocaleString("es-PY")` branch in `Services.tsx` is dead — do NOT re-enable.
6. Blog teaser / "Casos de éxito" ("Documented experiences" in EN) — placeholder MDX `draft: true` until real cases are drafted.
7. CTA banner.
8. **REMOVED**: TestimonialsHonest — do not re-add.

### Hero carousel image list (canonical, shipped assets under `apps/dra-gabriela/public/images/`)

- `hero/dra-gp-hero-2.png`
- `hero/dra-gp-hero-3.png`
- `hero-candid/dra-gp-laugh.webp`
- `hero-candid/dra-gp-goodbye.webp`
- `team-atmosphere/waiting-room.webp`
- `team-atmosphere/bookshelf.webp`

Portrait for `/about` / `/nosotros` is `/images/team/dra-gp-portrait-v2.webp` (from source IMG_0919). Identity anchor for any Gemini regens: `portraits/03-editorial-couch-portrait.jpg` (IMG_0918).

## Section-level rules

- **`/second-opinion`** — hero button-group has ONLY the WhatsApp branch. No See-contact fallback, no See-pricing link. Footer CTA "See pricing" sub-link at `page.tsx:154` is intentionally left in place (out of scope of the hero prune).
- **`/about` (`/nosotros`)** — Credentials block sits ABOVE the "¿Hablamos?" CTA. Do not swap back.
- **`/contact` (`/contacto`)** — standalone WhatsApp box (was L57-66) is removed. Contact path = hero + email; the WhatsApp CTA already sits inside the hero.
- **Pricing** (any surface) — only the base consultation renders a Gs number. Everything else uses `priceLabel: "Cotización en consulta"` / `"Quoted at consultation"`. When touching `pricing/page.tsx`, gate the Gs render on `priceLabel` absence.
- **`site.json` `.business.priceRange` / `.priceRange_short` & `ld-localbusiness.json` `priceRange`** — update to reflect the single consultation price (`Gs 125.000` / `PYG 125,000`) — no upper bound.

## Gradient sweep (queue — must reach zero before shipping)

The parent CLAUDE.md palette rule forbids gradients. Known violations to remove/replace with solid `#7834C0` / `#AF7AC9` / `#D2AE3F` / `#4C2C73` / `#7D60A4`:

- `components/sections/MeetDoctor.tsx` L39 (`bg-gradient-to-t`), L64/L68 (`gradient-text` utility uses).
- `components/sections/Services.tsx` L35-46 `SERVICE_COLOR` map (all four entries are `from-X to-Y`); consumed at L75 (`bg-gradient-to-br ${color}`).
- `components/sections/CtaBanner.tsx` L17/L27/L28 (`radial-gradient(...)` inline styles), L20 (`bg-gradient-hero`), L35 (`animate-shimmer` uses a `bg-gradient-to-r` under the hood).
- `PageHero` `variant="gradient"` uses (e.g. `second-opinion` hero) — swap to a solid tone.

## Asset pipeline notes

- Source of truth for original DCIM: `/data/media/dra-gabriela/dcim-2025-07-22/100CANON/` (frozen).
- Curated Gemini reference pack: `/data/media/dra-gabriela/gaby-best-for-gemini/` (see its README for tiers and brand guardrails).
- ImageMagick retouch pipeline (matches `bookshelf.webp` output): `-crop +repage -resize <target> -quality 82 webp:<out>`.
- IMG_0295 → "D — oral rehabilitation" card lives at `/images/services/oral-rehabilitation.webp` (target).

## Autonomy / confirm rules (from parent + user global)

- Do NOT ask engineering-preference questions. Pick a default and continue.
- Confirm ONLY for destructive/shared-state actions: branch delete, force push, credential rotation, external messages, `rm -rf`.
- Persist any new "always X" directive from Ivan into this file the same turn.
