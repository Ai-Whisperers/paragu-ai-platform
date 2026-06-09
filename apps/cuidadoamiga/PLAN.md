# Cuidado Amiga v3.0 — Implementation Plan

> The complete plan to build all 20 features from the gap analysis.
> Scoped for 6-8 weeks of focused work. Builds on v2.0 (4 phases already shipped).
> This is the working plan — it lives with the code, not in a wiki.

## Constraints (do not violate)

1. **Ship each phase as a green build** — typecheck 0, lint 0, tests passing, build green, all 3 locales.
2. **Lang-Driven JSON** — every visible string lives in `content/{lang}/`. No exceptions.
3. **Strict TypeScript** — `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `.strict()` on Zod.
4. **Test-first for new business logic** — Zod schemas, server functions, content accessors. UI components can skip TDD (they have e2e).
5. **Don't add dependencies for one-time use** — if it's used in 1 place, copy-paste. If it's used in 3+ places, extract.
6. **Security headers + RLS invariant** — every new table, every new route, every new client-side call.
7. **Build the shared infrastructure FIRST** — the FilterBar, Chart wrappers, ArticleCard, etc. are used by 4+ features. Build once, use many.

## Build order (the actual sequence)

The 20 features are not all the same effort, and many depend on shared primitives. The plan is organized in 7 phases. Each phase is a working build, deployable independently.

```
Phase 5 (1-2 weeks)  : Foundational UI + data access
Phase 6 (1 week)     : Safety + transparency
Phase 7 (1-2 weeks)  : Statistics + data export
Phase 8 (1 week)     : Discovery (blog, methodology, sitemap expansion)
Phase 9 (1-2 weeks)  : Engagement (comments, subscriptions, per-country recursos)
Phase 10 (1-2 weeks) : Platform building (partners, public API, embed widget)
Phase 11 (1 week)    : Accessibility + a11y
```

Total: **6-8 weeks** at 1 engineer.

---

## Phase 5: Foundational UI + Data Access (the building blocks)

**Why first**: 13 of the 20 features depend on a search/filter system, a chart system, a country picker, a date picker, or a download button. Build these primitives once.

### 5.1 — Data layer extensions

**New Supabase tables** (migrations applied via `supabase/migrations/`):

```sql
-- Comments (used in Phase 9, declared now for stable types)
create table if not exists case_comments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  tipo text not null check (tipo in ('solidarity', 'info', 'correction', 'contact')),
  body text not null check (length(body) between 3 and 2000),
  pinned boolean not null default false,
  visible boolean not null default true,
  creado_en timestamptz not null default now()
);
create index case_comments_case_id_idx on case_comments(case_id, creado_en desc);

-- Reports on cases (used in Phase 6)
create table if not exists case_reports (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  user_id uuid references auth.users(id), -- null for anon
  motivo text not null check (motivo in ('factual_error', 'wrong_photo', 'wrong_person', 'fabricated', 'duplicate', 'other')),
  detalle text check (length(detalle) < 1000),
  estado text not null default 'pendiente' check (estado in ('pendiente', 'revisado', 'descartado')),
  creado_en timestamptz not null default now()
);

-- Email subscriptions (used in Phase 9)
create table if not exists email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  pais text not null, -- ISO 3166-1 alpha-2
  tema text not null check (tema in ('nuevos_casos', 'metodologia', 'informe_anual')),
  frecuencia text not null check (frecuencia in ('semanal', 'mensual')) default 'semanal',
  unsubscribe_token text not null unique default encode(gen_random_bytes(32), 'hex'),
  confirmado boolean not null default false,
  confirmado_en timestamptz,
  creado_en timestamptz not null default now()
);
create unique index email_subscriptions_unique on email_subscriptions(email, pais, tema) where confirmado = true;

-- Audit log for case reports (so mods can see who flagged what)
create table if not exists case_report_actions (
  id bigserial primary key,
  report_id uuid not null references case_reports(id) on delete cascade,
  moderator_id uuid not null references auth.users(id),
  accion text not null check (accion in ('revisado', 'descartado', 'edito_caso', 'elimino_caso')),
  nota text check (length(nota) < 500),
  creado_en timestamptz not null default now()
);
```

**Cases table extension** (add a `visible` flag so we can soft-hide without losing the row):

```sql
alter table cases add column if not exists visible boolean not null default true;
alter table cases add column if not exists estado_anterior text; -- for "revoked approval" tracking
```

**Indexes** (critical for the search/filter to be fast at scale):

```sql
create index if not exists cases_estado_pais_fecha_idx on cases(estado, pais, fecha);
create index if not exists cases_tipo_fecha_idx on cases(tipo, fecha) where estado = 'aprobado';
create index if not exists cases_pais_fecha_idx on cases(pais, fecha) where estado = 'aprobado';
create index if not exists cases_fulltext_idx on cases using gin (
  to_tsvector('spanish', coalesce(nombre, '') || ' ' || coalesce(descripcion, '') || ' ' || coalesce(ciudad, ''))
) where estado = 'aprobado';
```

### 5.2 — Shared UI primitives

**New components** (each becomes the workhorse for multiple features):

| Component | Used in | Notes |
|---|---|---|
| `components/ui/SearchInput.tsx` | 1, 2, 9, 10 | Debounced, debounce configurable, clears-to-X |
| `components/ui/FilterBar.tsx` | 1, 2, 7, 8 | Compound: `<FilterBar><Select/></FilterBar>`, URL-synced via `useFilterState` |
| `components/ui/Pagination.tsx` | 1, 2, 9 | Cursor-based, not page-based (faster at scale) |
| `components/ui/CountryPicker.tsx` | 1, 4, 7, 9 | Wraps the 20-country LATAM list, searchable, flag emoji |
| `components/ui/DateRangePicker.tsx` | 1, 2, 7 | Year-only for v1 (no day-level filtering for old cases) |
| `components/ui/StatCard.tsx` | 2, 9, 13 | `<StatCard value="47" label="Femicidios 2024" trend="+3" />` |
| `components/ui/DonutChart.tsx` | 2, 9 | SVG, no recharts, no D3, 4KB total |
| `components/ui/BarChart.tsx` | 2, 9 | Horizontal + vertical, SVG, animated |
| `components/ui/LineChart.tsx` | 2 | Time series, SVG, no animation |
| `components/ui/CSVExport.tsx` | 2, 10 | Server-side generated, signed URL, expires 1h |
| `components/ui/Tag.tsx` | 1, 5, 6 | Small label, multiple tones, optional close button |
| `components/ui/ShareButtons.tsx` | 3, 12 | Twitter/X, WhatsApp, Facebook, copy link |
| `components/ui/CopyButton.tsx` | 1, 9 | "Copied!" feedback, 2s |
| `components/ui/Alert.tsx` | 6, 20 | warning, danger, info, success variants |
| `components/ui/LoadingSpinner.tsx` | 1, 2, 9 | Inline + fullscreen variants |

**Why SVG, not recharts/D3**: 14KB vs 240KB, and the charts Cuidado Amiga needs are not complex. Recharts would be overkill.

**All 3 locales**: every component is locale-aware via the existing `getSite(lang)` accessor.

### 5.3 — Shared hooks

| Hook | Purpose | Used in |
|---|---|---|
| `lib/hooks/useFilterState.ts` | URL-synced filter state (pais, tipo, year, etc.) | 1, 2, 4, 7 |
| `lib/hooks/useDebounce.ts` | Debounce values for search input | 1, 2, 9 |
| `lib/hooks/useInfiniteScroll.ts` | Cursor pagination for case lists | 1, 2 |
| `lib/hooks/useCopyToClipboard.ts` | Copy text, show toast, 2s revert | 1, 9 |
| `lib/hooks/useGeolocation.ts` | Browser geolocation, with consent | 4, 12 |
| `lib/hooks/useShare.ts` | Web Share API, fallback to copy | 3, 12 |
| `lib/hooks/useUrlState.ts` | Generic URL state sync (basis for useFilterState) | 1, 7 |

### 5.4 — Server-side data helpers

`lib/data/cases.ts` (server-only):

```ts
export interface CaseFilters {
  pais?: string
  tipo?: 'femicidio' | 'abuso' | 'acoso'
  year?: number
  estado?: 'aprobado' | 'pendiente' | 'rechazado' // for admin
  q?: string
  victimAgeMin?: number
  victimAgeMax?: number
  hasPhoto?: boolean
  hasSources?: boolean
  limit?: number
  cursor?: string
}

export async function searchCases(filters: CaseFilters): Promise<{ cases: Case[]; nextCursor: string | null }>
export async function getCaseStats(filters: CaseFilters): Promise<{ total: number; byPais: Record<string, number>; byTipo: Record<string, number>; byYear: Record<number, number> }>
export async function getCaseStatsByCountry(pais: string): Promise<{ total: number; byYear: Record<number, number>; byTipo: Record<string, number> }>
export async function getCaseStatsByState(pais: string, estado: string): Promise<{ total: number; sources: number; openCases: number }>
```

**Performance targets**:
- `searchCases()` with no filters: < 200ms at 5000 cases
- `getCaseStats()`: < 500ms (caches for 1h with stale-while-revalidate)
- Full-text search: < 300ms (uses the GIN index)

### 5.5 — Tests added in Phase 5

- Unit tests for `searchCases()` with each filter combination
- Unit tests for `getCaseStats()` with various scopes
- Unit tests for `useFilterState()` URL state sync
- Unit tests for `useDebounce()` timing behavior
- Component tests for `CountryPicker` (renders all 20 LATAM countries)
- Component tests for `FilterBar` (URL state updates on change)

**Effort**: 8-10 days
**Deliverable**: `pnpm typecheck/lint/test/build` all green. The primitives are documented in `components/ui/INDEX.md`. A 5-minute smoke test page at `/dev/components` (gated behind `NEXT_PUBLIC_DEV_PREVIEW=true` env) where Sofía can see all primitives in one place.

---

## Phase 6: Safety + Transparency (Priority 1: trust signals)

### 6.1 — Survivor-safe exit button (Feature 5.20)

A persistent "Exit site" button that:
- Renders in a fixed corner of every public page
- On click or `Ctrl+E`, replaces history with Google
- Replaced via `<form action="https://google.com">` with `target="_self"` (no JS required for the security-critical path)
- Does not show in admin or login pages

**Files**:
- `components/shared/ExitButton.tsx`
- `content/{lang}/safety.json` (new file: tooltip + keyboard shortcut hint + footer disclaimer)
- Update `middleware.ts` matcher to allow `?safe=1` to be set in URL and disable ExitButton for screen-recordings (so the QR code in prensa guides works)
- Keyboard handler in `app/[lang]/layout.tsx`

**Test**:
- E2E: visit page, press Ctrl+E, verify history replaced with google.com
- E2E: tap button, verify same

**Effort**: 1 day

### 6.2 — Transparency page `/transparencia` (Feature 1.4)

A single page that:
- Lists all sources ever submitted (anonymized URL hashes, no full URLs)
- Shows audit log of moderator decisions (last 100, anonymized moderator display name)
- Methodology: how cases are approved
- Bias disclaimer
- Annual report card placeholder

**Files**:
- `app/[lang]/transparencia/page.tsx`
- `content/{lang}/transparencia.json`
- `components/transparencia/SourceList.tsx` (paginated)
- `components/transparencia/AuditLog.tsx` (paginated)
- `app/api/public/stats/route.ts` (returns transparency numbers, cacheable)

**RLS**: the public endpoint reads only `cases` where `estado='aprobado'` and `case_edits` where `visible=true` (a new column we'll add for moderator private notes). Moderator display names come from the `moderators` table where `public_name=true`.

**Effort**: 3 days

### 6.3 — "Report this case" button (Feature 2.6)

On every `/casos/[id]` page:
- "Reportar error" link in the case footer
- Form: motivo (radio: error factual / foto incorrecta / persona equivocada / caso falso / duplicado / otro) + detalle (textarea)
- Anonymous-friendly (no login required, just email)
- Submits to `case_reports` table
- Routes to a "case reports" tab in the admin panel
- Mods can mark as `revisado` (with note) or `descartado`

**Files**:
- `components/caso/ReportCaseButton.tsx`
- `app/api/case-reports/route.ts`
- `app/[lang]/casos/[id]/page.tsx` (add the button)
- `app/[lang]/admin/page.tsx` (add new "Reportes" tab)
- `app/api/admin/case-reports/route.ts` (list + action)
- New content key: `home.case.reportError` in all 3 locales

**Test**:
- Unit: Zod validation of motivo + detalle
- E2E: report a case, log in as mod, see it in admin

**Effort**: 2 days

### 6.4 — Hidden admin URL + 2FA support stub

The current admin URL is `/es/admin` — predictable. Add a config-driven `ADMIN_PATH` env var so Sofía can rename it to anything (`/es/dirigente-2024`). The login page also gains a "remember this device" option (30 days, signed cookie) so Sofía doesn't have to re-authenticate 20 times a day.

**Files**:
- `lib/env.ts` (new: typed env validation with Zod, fails fast at startup)
- Update `middleware.ts` to use `ADMIN_PATH`
- Update `content/es/admin.json` (and pt/en) for login form additions
- `lib/auth.ts` (new: cookie signing/verifying with HMAC, 30-day TTL)

**Test**:
- Unit: env validation
- Unit: HMAC cookie round-trip
- E2E: login with remember-me, restart server, still logged in

**Effort**: 2 days

### 6.5 — Sentry / error monitoring wire-up

Right now `lib/sentry.ts` is a stub. This phase:
- Installs `@sentry/nextjs` as a dep
- Configures `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- Adds `withSentryConfig` to `next.config.ts`
- Sets `SENTRY_DSN` placeholder in `.env.example`
- Adds Sentry alerts in `lib/sentry.ts`:
  - `captureError()` for any caught error
  - `captureMessage()` for the case-submission, vote, and edit paths
  - Sensitive data filtering (no `victima` field, no `sources`, no email)
- Adds `/api/health` to Sentry breadcrumbs

**Test**:
- Throw in a test, verify Sentry captures it (mocked Sentry in test)
- E2E: trigger a server error, verify breadcrumb appears

**Effort**: 2 days

**Phase 6 total**: 10 days, all green-build, 3 locales.

---

## Phase 7: Statistics + Data Export (the credibility page)

### 7.1 — `/data` page (Feature 1.2)

A real statistics page, server-rendered, cacheable:

**Top section**:
- 4 stat cards: total approved, total countries, total this year, total this month
- Time-series line chart: cases by year (last 10 years)
- Country breakdown: top 10 countries with bar chart

**Middle section**:
- Type breakdown: donut chart (femicidio / abuso / acoso)
- Judicial state breakdown: 2-bar chart (en_proceso / cerrado)
- Geographic map (mini-map with cases colored by type)

**Bottom section**:
- "By country" — clickable list of 20 countries, each → `/data/[pais]`
- CSV download button (Feature 2.x — full export)
- "Cite this data" modal with BibTeX + APA + Chicago formats

**Files**:
- `app/[lang]/data/page.tsx`
- `app/[lang]/data/[pais]/page.tsx` (per-country detail)
- `components/data/StatsOverview.tsx`
- `components/data/CasesByYearChart.tsx`
- `components/data/TopCountriesChart.tsx`
- `components/data/TypeBreakdownChart.tsx`
- `components/data/MiniMap.tsx`
- `components/data/CiteModal.tsx`
- `content/{lang}/data.json` (new file)
- `app/api/public/stats/route.ts` (cacheable, 1h)

**Test**:
- Unit: data computation for each chart
- E2E: visit /data, click country, see per-country page

**Effort**: 5 days

### 7.2 — CSV export (Feature 1.2 cont.)

Server-side CSV generation, signed URL, expires in 1 hour:
- `GET /api/public/export.csv?pais=AR&year=2024` (optional filters)
- Columns: id, fecha, nombre, victima, tipo, pais, ciudad, estado_judicial, fuentes (joined), url_caso
- Capped at 10,000 rows per request (deeper exports = contact us)
- Rate-limited: 10 per hour per IP

**Files**:
- `app/api/public/export.csv/route.ts`
- `lib/csv.ts` (RFC 4180-compliant generator, no external dep)
- `content/{lang}/data.json` add `export` key

**Test**:
- Unit: CSV escaping (commas, quotes, newlines in fields)
- E2E: download CSV, parse, verify shape

**Effort**: 1 day

### 7.3 — Per-country detail page (Feature 4.15)

`/data/[pais]` (e.g. `/data/AR`):
- Same as `/data` but scoped
- Big country flag + name
- Time series for that country
- Top cities
- State-level breakdown (if data has `estado` field)
- "More data on this country" → resources for that country → `/recursos/AR`

**Files**:
- `app/[lang]/data/[pais]/page.tsx`
- `app/[lang]/data/[pais]/estado/[estado]/page.tsx` (optional state drilldown)
- `components/data/CountryStats.tsx`

**Effort**: 2 days

**Phase 7 total**: 8 days.

---

## Phase 8: Discovery (blog, methodology, expanded sitemap)

### 8.1 — Blog (`/blog`, Feature 3.9)

MDX-based blog, not a CMS:
- Posts stored as `content/{lang}/blog/{slug}.mdx`
- Frontmatter: title, excerpt, date, author, category, tags, lang
- Categories: `legal`, `estadisticas`, `metodologia`, `opinion`
- Listing: `/blog` (paginated, 10 per page)
- Detail: `/blog/[slug]`
- Tag pages: `/blog/tag/[tag]`
- Author pages: `/blog/autor/[slug]`

**Components**:
- `components/blog/ArticleCard.tsx`
- `components/blog/ArticleHeader.tsx`
- `components/blog/TableOfContents.tsx` (auto-generated from `<h2>` tags)
- `components/blog/AuthorCard.tsx`
- `components/blog/RelatedPosts.tsx`
- `components/blog/RssLink.tsx`

**MDX**:
- Use `next-mdx-remote` for server-side compile
- Custom components: `<Callout>`, `<Stat>`, `<Pullquote>`, `<Tweet>`, `<Figure>`
- Code blocks with Shiki (built into Next 16)
- Syntax highlighting: spanish + bash + json + sql (covers all our use cases)
- Auto-generate heading IDs (rehype-slug)
- Auto-add anchor links to headings (rehype-autolink-headings)

**RSS**:
- `/blog/rss.xml` via `app/[lang]/blog/rss.xml/route.ts`
- 25 most recent posts in the requested lang
- Atom + RSS 2.0 formats

**Files**:
- `app/[lang]/blog/page.tsx` (list)
- `app/[lang]/blog/[slug]/page.tsx` (detail)
- `app/[lang]/blog/tag/[tag]/page.tsx` (tag)
- `app/[lang]/blog/autor/[slug]/page.tsx` (author)
- `app/[lang]/blog/rss.xml/route.ts`
- `app/[lang]/blog/sitemap.xml/route.ts` (extend existing)
- `lib/mdx.ts` (compile, frontmatter, reading time)
- `lib/rss.ts`
- `content/{lang}/blog/` (3 seed posts × 3 locales = 9 MDX files)

**Seed content** (3 posts in each lang, 9 total):
1. "Cómo verificamos los casos" (methodology)
2. "Por qué no mostramos datos de menores" (policy)
3. "Mujeres que se atrevieron: 5 casos de femicidio que cambiaron la ley" (case-driven)

**Test**:
- Unit: frontmatter parser, reading-time calc
- E2E: visit blog, click post, see content, see related posts

**Effort**: 5 days

### 8.2 — Methodology + about pages (Feature 3.10)

6 new pages, all server-rendered, all 3 locales:

| Page | Purpose | Effort |
|---|---|---|
| `/sobre` | Who runs Cuidado Amiga. The team. The funding. The politics. | 0.5 day |
| `/metodologia` | Detailed methodology (separate from `/como-funciona` which is the user-facing version) | 1 day |
| `/financiamiento` | Transparency: who funds, who doesn't, budget | 0.5 day |
| `/contacto` | 3 separate forms: press, academic, general → 3 different inboxes | 1 day |
| `/legal` | Terms, privacy, data retention, complaint mechanism | 1 day |
| `/glosario` | Glossary of terms | 0.5 day |

**Contact forms** route to:
- `general` → `cuidadoamiga@proton.me` (Sofía's personal)
- `press` → `press@cuidadoamiga.com` (new email, forward to Sofía)
- `academic` → `academic@cuidadoamiga.com` (new email, forward to Sofía)

**Files**:
- 6 page components
- 6 content files
- `app/api/contact/route.ts` (with honeypot + rate limit)
- `components/contact/ContactForm.tsx` (variant: general / press / academic)

**Effort**: 5 days (can be parallelized across team if needed)

### 8.3 — Search engine for the whole site (Feature 8)

A simple in-site search that indexes:
- Blog posts (title + excerpt + body)
- Methodology / about pages
- Cases (name, country, description)
- Resources (name, country)

**Why not Algolia/DocSearch**: cost + 3rd party. The site is small enough that we can build a simple in-Postgres search using the GIN index we already added.

**API**: `GET /api/search?q=...&type=blog|case|page&lang=es&limit=10`

**UI**:
- `/buscar?q=...` — full results page
- Cmd+K (Ctrl+K) global search modal (powered by the same API)
- `components/shared/CommandK.tsx` — keyboard-first, no mouse needed

**Files**:
- `app/api/search/route.ts`
- `app/[lang]/buscar/page.tsx`
- `components/shared/CommandK.tsx` (renders in layout)
- `lib/search.ts` (parses query, calls RPC `search_unified(query, lang)`)

**RPC** (Postgres function, the workhorse):

```sql
create or replace function search_unified(query text, p_lang text, p_limit int default 10)
returns table (kind text, id text, title text, excerpt text, url text, score real) as $$
begin
  return query
  with normalized as (select websearch_to_tsquery(p_lang, query) as q)
  select 'blog' as kind, slug as id, title, excerpt, '/blog/' || slug as url,
         ts_rank(title_tsv, q) + ts_rank(body_tsv, q) as score
  from blog_posts, normalized
  where (title_tsv || body_tsv) @@ q and lang = p_lang
  union all
  select 'case', id::text, nombre, descripcion, '/casos/' || id::text,
         similarity(nombre, query) as score
  from cases, normalized
  where estado = 'aprobado' and visible = true
  order by score desc
  limit p_limit;
end;
$$ language plpgsql stable;
```

**Test**:
- Unit: query parser
- E2E: type in Cmd+K, see results, click, navigate

**Effort**: 5 days

**Phase 8 total**: 15 days (long because of the blog + search).

---

## Phase 9: Engagement (comments, subscriptions, per-country recursos)

### 9.1 — Public comments (Feature 2.5)

This is the riskiest feature. Build it disabled-by-default. Sofía enables per-case.

**Moderation**:
- All comments require account (Supabase Auth, email magic link)
- First 3 comments from new users go to a queue (mod approves before public)
- After 3 approved comments, automatic (still visible to mods, can be hidden)
- Mods can hide any comment at any time, no reason required
- Mods can ban a user
- User can delete own comments

**UI**:
- `components/comments/CommentList.tsx` (paginated, 20 per page)
- `components/comments/CommentForm.tsx`
- `components/comments/CommentCard.tsx` (with type icon: 🤝 / ℹ️ / ✏️ / 📧)
- `components/comments/ModerationMenu.tsx` (mod-only)
- `app/api/comments/route.ts` (POST)
- `app/api/comments/[id]/route.ts` (DELETE)
- `app/api/admin/comments/route.ts` (list pending)

**Anti-abuse**:
- 1 comment per user per case per 5 minutes
- All comments go through sanitization
- No URLs in comments from new users (anti-spam)
- New users can't include contact info in their first 3 comments (regex check)
- IP rate limit: 10 comments per hour

**Schema**:
- Already declared in Phase 5
- Add `banned_users` table

```sql
create table if not exists banned_users (
  user_id uuid primary key references auth.users(id),
  ban_reason text,
  banned_by uuid references auth.users(id),
  banned_at timestamptz not null default now(),
  expires_at timestamptz -- null = permanent
);
```

**Effort**: 7 days (the moderation UI is the long part)

### 9.2 — Email subscription (Feature 2.7)

Weekly digest, Sunday 6pm local time, per-country + per-topic.

**Sign-up flow**:
- `/suscribirse` (separate from `/recursos`)
- Form: country, topic, email, frequency
- Double opt-in: send email with confirmation link
- Resend template for confirmation + digest + unsubscribe

**Digest content** (auto-generated):
- New cases approved in last 7 days, by country
- 1-2 most-viewed cases of the week
- 1 blog post if published

**Email templates** (use react-email):
- `emails/ConfirmSubscription.tsx`
- `emails/WeeklyDigest.tsx`
- `emails/UnsubscribeConfirmation.tsx`
- Render via `@react-email/render` → send via Resend

**Cron** (in the Paragu-AI monorepo's cron system):
- Weekly: aggregate new cases, render digest, send to confirmed subscribers
- Daily: retry failed subscriptions, cleanup unconfirmed (>30 days)

**Files**:
- `app/[lang]/suscribirse/page.tsx`
- `app/api/subscriptions/route.ts` (POST: create + send confirm)
- `app/api/subscriptions/confirm/route.ts` (GET: token-based confirm)
- `app/api/subscriptions/unsubscribe/route.ts` (GET: token-based unsub)
- `emails/ConfirmSubscription.tsx`
- `emails/WeeklyDigest.tsx`
- `emails/UnsubscribeConfirmation.tsx`
- `lib/digest.ts` (aggregation logic)
- New content file: `content/{lang}/suscribirse.json`

**Effort**: 5 days

### 9.3 — Per-country resources (Feature 2.8)

SEO-targeted per-country landing pages:
- `/recursos/AR` (Argentina): flag + 144 number + local organizations + nearby moderator profile
- 20 pages, one per LATAM country
- Each page has a "Denunciar aquí" CTA that opens a country-specific form

**Schema**:
- New column on `recursos_latam.json`: `denuncia_url` (optional, if country has an official online form)
- New column: `moderador_pais` (the local moderator's first name + contact)

**Components**:
- `components/recursos/CountryHero.tsx`
- `components/recursos/ServiceList.tsx` (grouped by type: legal, psychological, shelter, hotline)
- `components/recursos/EmergencyBanner.tsx` (already exists, refactor)

**Files**:
- `app/[lang]/recursos/page.tsx` (existing — becomes a country picker + featured)
- `app/[lang]/recursos/[pais]/page.tsx` (new)
- `content/_shared/recursos-latam.json` (extend with `denuncia_url`, `moderador_pais`, per-service categories)
- `components/recursos/CountryPicker.tsx` (the big flag-based picker on `/recursos`)

**Test**:
- Unit: 20 countries, each page renders
- E2E: visit `/recursos/AR`, see Argentina-specific content

**Effort**: 4 days

### 9.4 — "Resources near you" `/recursos/cerca` (Feature 2.8 cont.)

Uses browser geolocation, returns the 3 nearest resources:
- Consent prompt
- Reverse-geocode the coordinates to country
- Show that country's resources
- Don't store the coordinates
- Show disclaimer about IP-based geolocation fallback

**Files**:
- `app/[lang]/recursos/cerca/page.tsx`
- `lib/hooks/useGeolocation.ts` (declared in Phase 5)
- `lib/geo/reverse.ts` (uses Nominatim, same as the case map)

**Effort**: 2 days

**Phase 9 total**: 18 days (longest phase).

---

## Phase 10: Platform Building (partners, public API, embed)

### 10.1 — Public read-only API (Feature 4.14)

`GET /api/v1/cases?pais=AR&year=2024&limit=100&cursor=...`

- Returns JSON, RFC-compliant pagination (cursor, next, prev)
- Rate-limited: 60 req/min per IP (anonymous), 600/min (with API key)
- API key issuance: request via `/partners/aplicar`, manually approved by Sofía
- CORS-friendly: `Access-Control-Allow-Origin: *` (this is public read-only data)
- Response includes: case data, sources, related cases
- `Cache-Control: public, max-age=300` (5 min)
- OpenAPI spec at `/api/v1/openapi.json` (generated from Zod schemas)
- Docs at `/api-docs` (Scalar — modern Swagger alternative, 80KB, framework-agnostic)

**Files**:
- `app/api/v1/cases/route.ts`
- `app/api/v1/cases/[id]/route.ts`
- `app/api/v1/stats/route.ts`
- `app/api/v1/openapi.json/route.ts`
- `app/[lang]/api-docs/page.tsx`
- `lib/api/auth.ts` (API key validation, HMAC-signed)
- `lib/api/pagination.ts` (cursor encoding)
- `lib/api/rate-limit.ts` (Upstash-backed, env-gated)

**Test**:
- Unit: pagination
- Unit: API key validation
- E2E: anonymous request → 200, no key needed
- E2E: rate limit fires at 61st request

**Effort**: 5 days

### 10.2 — Partner accounts (Feature 4.13)

A different role than moderator:
- A "partner" org gets 1-3 seats
- Can bulk-upload cases via CSV (200 max per upload)
- Cases from partners skip 1 of the 3 moderation approvals (org is trusted)
- Co-branded page: `/partners/[slug]` lists the org + their contributed cases
- Org gets a public API key with higher rate limits

**Schema**:
```sql
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  website text,
  logo_url text,
  description text,
  contact_email citext not null,
  approved boolean not null default false,
  approved_at timestamptz,
  approved_by uuid references auth.users(id),
  creado_en timestamptz not null default now()
);

create table if not exists organization_members (
  organization_id uuid references organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'contributor')),
  primary key (organization_id, user_id)
);

alter table cases add column if not exists organization_id uuid references organizations(id);
alter table cases add column if not exists approvals_required int default 3; -- 2 for partner cases
```

**Files**:
- `app/[lang]/partners/page.tsx` (listing of current partners)
- `app/[lang]/partners/aplicar/page.tsx` (apply form)
- `app/[lang]/partners/[slug]/page.tsx` (org profile)
- `app/api/partners/route.ts` (apply)
- `app/api/partners/upload/route.ts` (CSV bulk upload)
- `app/[lang]/admin/page.tsx` (add "Organizaciones" tab)
- `components/partners/PartnerCard.tsx`
- `components/partners/BulkUpload.tsx`
- `lib/csv-import.ts` (parse + validate + insert)

**Test**:
- Unit: CSV import (good + bad data)
- Unit: organization permissions
- E2E: apply → mod approves → org can upload → case requires only 2 votes

**Effort**: 7 days

### 10.3 — Embeddable map widget (Feature 3.12)

The viral growth mechanism. Two pieces:

**A — iframe embed** (`/embed` route):
- Minimal map, no nav, no footer
- URL params: `?pais=AR&tipo=femicidio&year=2024`
- Width-responsive (100% of container)
- "View on Cuidado Amiga" overlay
- No third-party analytics (GDPR-friendly)
- CORS-friendly (`X-Frame-Options: ALLOWALL` for this route specifically)

**B — JS widget** (`/widget.js`):
- 30KB minified + gzipped
- Drop-in `<script src="https://cuidadoamiga.com/widget.js" data-pais="AR">` 
- Renders a small map (300x200) at the script location
- Click → opens Cuidado Amiga in a new tab
- No React, no Leaflet in the bundle — vanilla JS, SVG-based mini-map
- Rate-limited by referrer (5 widgets per page max)

**Files**:
- `app/[lang]/embed/page.tsx`
- `app/widget.js/route.ts` (returns JS with right CORS headers)
- `lib/embed/widget-renderer.ts` (no React, no Leaflet, just SVG)
- `components/embed/EmbedMap.tsx` (the React version for `/embed` page)
- `content/{lang}/embed.json` (the small copy on the embed)

**Test**:
- Unit: widget renderer (no React)
- E2E: visit `/embed?pais=AR`, see map; load widget.js in a test page, see map

**Effort**: 5 days

**Phase 10 total**: 17 days.

---

## Phase 11: Accessibility + Polish

### 11.1 — Dark mode + high contrast (Feature 5.18)

- All design tokens already defined (Phase 0 of v2.0)
- Add `data-theme="dark"` / `data-theme="high-contrast"` on `<html>`
- Toggle in navbar, persisted in `localStorage`
- Respects `prefers-color-scheme` on first visit
- All 3 locales (the toggle is universal)
- Charts re-render with dark colors

**Files**:
- `components/shared/ThemeToggle.tsx`
- `lib/hooks/useTheme.ts`
- `app/[lang]/layout.tsx` (set initial class on `<html>`)
- `app/globals.css` (dark mode tokens, currently empty)

**Test**:
- E2E: toggle theme, reload, theme persisted
- Visual: axe-core audit on both modes

**Effort**: 3 days

### 11.2 — Screen-reader optimization (Feature 5.17)

Already partially done. What's missing:
- Map: full text alternative (`<map-fallback>` visible to SRs, hidden from sighted)
- Each case: "view as text" toggle (already in case detail, but make it a default alternative)
- Tables on `/data`: `<caption>`, `<th scope="...">`, ARIA-sortable headers
- All interactive elements: focus visible (3px outline, brand color)
- Skip-to-content link (already there, verify it works)
- All form errors: `aria-describedby`, `aria-invalid`
- Live regions: mod vote count, new case published, etc.

**Test**:
- axe-core audit on every page (CI gate, fails PR if score < 95)
- E2E: navigate with screen reader (VoiceOver script)

**Effort**: 4 days

### 11.3 — Performance audit (per-page budgets)

Per-page budgets:
- Home: 150KB JS, 50KB CSS
- Map-heavy: 250KB JS (Leaflet)
- Blog: 100KB JS, 30KB CSS
- Admin: 300KB JS
- Data: 200KB JS (charts)

**Tools**:
- `@next/bundle-analyzer` — already supported, just wire it
- Lighthouse CI in GitHub Actions
- `lighthouse-ci.json` with assertions
- Fails PR if any page exceeds budget

**Files**:
- `lighthouserc.json`
- `.github/workflows/lighthouse.yml`
- `next.config.ts` wire bundle-analyzer

**Effort**: 2 days

### 11.4 — PWA (lightweight)

The site should be installable. Not a full PWA — just:
- `manifest.json`
- `app/icons/{192,512}` 
- Service worker for offline-fallback (only for static pages, NOT for /admin)

**Files**:
- `app/manifest.json` (already `app/manifest.ts`)
- `public/sw.js`
- `app/icons/`

**Effort**: 2 days

### 11.5 — Yearly report (auto-generated PDF)

Once a year, auto-generate a PDF report from the year's data:
- Cover with stats
- Methodology page
- Per-country breakdown
- "Thanks to moderators" page
- Press kit linked

**Tools**: `@react-pdf/renderer` (server-side, 200KB). Render once on demand, cached on CDN.

**Files**:
- `app/[lang]/informe/[year]/page.tsx` (HTML preview)
- `app/api/informe/[year]/pdf/route.ts` (PDF)
- `lib/pdf/report.tsx` (the React PDF template)

**Effort**: 3 days (mostly template design)

**Phase 11 total**: 14 days.

---

## Cross-cutting work (during all phases)

### Documentation

- `README.md` (Phase 0 already has it, update after each phase)
- `CONTRIBUTING.md` (new — for partner orgs + open-source contributors)
- `ARCHITECTURE.md` (new — diagram + decision log)
- `LIBREF.md` (new — auto-generated from Zod schemas, the canonical API docs)
- `ROADMAP.md` (this file, kept up to date)

### CI hardening

- `dependabot.yml` — weekly pnpm audit
- `actionlint` — workflow linter
- Per-PR preview deployments (Vercel already gives this; just enable)
- Bundle size tracking (already in Phase 11.3)

### Monitoring

- Sentry (Phase 6.5)
- Uptime monitoring (Better Stack free tier, alerts to Telegram)
- Plausible analytics (privacy-friendly, no cookies, GDPR-clean)
- Search Console + Bing Webmaster Tools

### Security

- Annual third-party pen test (recommend HackerOne or similar)
- CSP report-uri endpoint
- Quarterly `pnpm audit` review
- RLS policy review after every new table (3-eyes principle)

---

## Total effort

| Phase | Days | New routes | New tables | New dependencies |
|---|---|---|---|---|
| 5: Foundational | 8-10 | 0 | 4 | 0 (all in-house) |
| 6: Safety + transparency | 10 | 5 | 0 | @sentry/nextjs |
| 7: Statistics + export | 8 | 4 | 0 | 0 |
| 8: Discovery | 15 | 12 | 1 (blog_posts) | next-mdx-remote, shiki, scalar |
| 9: Engagement | 18 | 8 | 1 (banned_users) | @react-email/render, resend (already), @upstash/ratelimit |
| 10: Platform | 17 | 6 | 3 (orgs, org_members, etc) | @upstash/ratelimit |
| 11: A11y + polish | 14 | 4 | 0 | @react-pdf/renderer |
| **Total** | **90-95 days** | **39 new routes** | **9 new tables** | **~7 new deps** |

**At 1 engineer, 5 days/week, that's 18-19 weeks of work.** Realistic: 6 months with 1 person, 3 months with 2 (parallelize Phase 8 + 9).

---

## Milestone targets

| Milestone | Date (from start) | Public impact |
|---|---|---|
| M1: Phase 5 done | Week 2 | Foundation is ready. The site is still the same, but the codebase is ready to grow. |
| M2: Phase 6 done | Week 4 | Site has the survivor exit button, transparencia page, and case reporting. Trust signals go up. |
| M3: Phase 7 done | Week 6 | `/data` is live. Researchers start citing Cuidado Amiga. |
| M4: Phase 8 done | Week 9 | Blog launches with 3 seed posts. SEO starts to compound. |
| M5: Phase 9 done | Week 12 | Comments + email digest. Community forms. |
| M6: Phase 10 done | Week 16 | Public API. Partners start integrating. Embed widget starts spreading. |
| M7: Phase 11 done | Week 18 | A11y score 95+. Dark mode. PWA. Yearly report live. |

---

## Risk register

| Risk | Phase | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| **Comments attract hate speech** | 9 | High | Reputation | Mod queue for first 3 comments per user, profanity filter, ban tool, no thread replies |
| **Public API gets scraped by bots** | 10 | Medium | Server cost | Rate limiting, CAPTCHAs for high-traffic endpoints, hot-link detection |
| **Sitemap gets too big (>50K cases)** | 5+ | Low | SEO penalty | Sitemap index file, paginated child sitemaps |
| **Latency in /data page at 50K cases** | 7 | Medium | Bad UX | Materialized view + cron refresh, 1h cache |
| **Spanish NLP for full-text search is wrong for Kichwa/Quechua/Maya** | 8 | Low | Bad search | Allow language hint per case, fall back to ILIKE |
| **PDF report auto-generation has wrong stats** | 11 | Medium | Embarrassment | 2-eyes review before publishing, test with known data |
| **Partner uploads bad data** | 10 | Medium | Reputation | Strict Zod, mod approval for first 3 uploads, audit log |
| **Map widget on 3rd-party site with our case data has wrong attribution** | 10 | Low | Legal | Mandatory attribution in widget UI, license in widget.js |
| **Email digest deliverability issues** | 9 | High | Bounce rate | SPF/DKIM/DMARC setup, Resend's deliverability tools, sunset unengaged (>90d no open) |
| **Geolocation consent UX confusing** | 9.4 | Low | Users dismiss | Plain language, "What's this?" tooltip, fall back to country picker |

---

## Success metrics (12 months post-launch)

- **Cases**: 500+ approved cases (from ~50 today)
- **Countries**: All 20 LATAM countries with at least 1 case (currently 8)
- **Traffic**: 50K unique visitors/month
- **Citations**: 10+ academic papers citing the data
- **Press**: Featured in 3+ major media outlets
- **Partners**: 5+ partner organizations
- **Subscribers**: 1,000+ email subscribers
- **Comments**: 50+ comments/week (after Phase 9)
- **API usage**: 100+ API requests/day (after Phase 10)
- **Embeds**: 20+ sites using the embed widget
- **A11y score**: 95+ on all pages
- **Lighthouse**: 90+ on all pages
- **Build**: 0 TS errors, 0 lint errors, 100+ tests passing
- **Bugs in production**: < 5 P0/P1 issues per month

---

## Open questions (for Sofía + Kiki)

1. **Branding**: is the rose/violet color scheme final, or do you want a rebrand with a designer? (Phase 11.1 decision)
2. **Comments**: keep the aggressive mod queue for first 3 comments, or let everything through with report-button? (Phase 9.1 decision)
3. **Email subscription frequency**: weekly, monthly, or both? (Phase 9.2 decision)
4. **Partner approval**: Sofía approves all partner orgs personally, or do we need a 2-person rule? (Phase 10.2 decision)
5. **PDF reports**: do we generate yearly, or on-demand? (Phase 11.5 decision)
6. **Public API key issuance**: do we require email verification, or instant issuance? (Phase 10.1 decision)
7. **Dark mode**: do we lead with dark or light by default? (Phase 11.1 decision)
8. **Yearly report**: PDF only, or also an HTML longform? (Phase 11.5 decision)

These 8 questions can be answered in 1 meeting. After that, the plan is executable as-is.
