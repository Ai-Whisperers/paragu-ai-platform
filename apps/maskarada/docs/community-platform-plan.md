# Maskarada → Community Platform: Audit + Plan

**Date:** 2026-06-15
**Author:** Erebus
**Status:** Phase 1 (foundation) shipped, Phase 2+ queued behind Kiki's content decisions.

---

## What we have today

### Current site (post-monorepo migration)

| Asset | Count | Notes |
|---|---|---|
| Pages | 14 | home, sobre, galeria, reglas, tienda, tienda/monai, faq, contacto, staff, entradas, admin, privacidad, 4× locale shells, api/health |
| Components | 5 | Navbar, Footer, WhatsAppFloat, Countdown, RevealOnScroll |
| API routes | 1 | `/api/health` (no real backend yet) |
| Supabase tables | 5 | `mk_tickets`, `mk_blocklist`, `mk_marketing_list`, `mk_capacity`, `mk_site_config` |
| Auth | None | admin passcode is a hardcoded literal (`maskarada2026`) |
| Content keys | 8 (es.json) | site, hero, howItWorks, experience, testimonials, eventDetails, nav, footer — all hardcoded |
| Public assets | 80 files, 41 MB | flyers (20), event photos (7), brand (4), event-2026-06-11 (9 curated), favicons, og, manifest, videos (3) |
| Supabase shared packages available | 18 | admin, analytics, api-helpers, auth, catalog, checkout, client-kit, commerce, content, hooks, i18n, loyalty, payments, product, sections, seo, theme, ui, ui-extras, whatsapp |
| Real existing vendor | 1 | Moñai Ropes (shibari ropes, 7 SKUs, owned by the monairopes@gmail.com that owns the photo drive) |
| Real existing channels | 2 | WhatsApp +595 981 200255, Instagram @maskarada.py |
| Real existing event | 1 | "Simón Dice" June 11 2026 (37 + 132 photos in Drive, 9 curated) |

### What "community platform" actually means

Reading the request literally: a website for a community of people who do BDSM/kink in Paraguay (and beyond), with these needs expressed:

1. **Discoverable catalog of activities** — what BDSM activities the community offers, with guides
2. **Best-practices and safety content** — initial guides into kink, safety tips, consent, aftercare
3. **Multi-vendor marketplace** — community members sell products (the Moñai rope example)
4. **Member onboarding** — how to join, first-event experience, dresscode, expectations
5. **Continuous presence** — not just one event per year; ongoing content + product catalog

This is the same shape as a content + commerce site, with the safety/education layer being what makes it unusual.

---

## Proposed architecture

A single Next.js 16 app with these top-level sections (one nav, one footer, one Supabase project):

```
HOME (/)
├── Hero — rotating between current event photo + curated atmosphere shots
├── "What is maškaráda" pitch
├── Upcoming events (from mk_events table — NEW)
├── Featured vendors (from mk_vendors table — NEW)
├── Latest community articles (from mk_articles — NEW)
└── All existing CTAs preserved

ACTIVITIES /actividadeS
├── Index of practice types (impact play, shibari, rope bondage, role play, etc.)
├── Detail page per activity: what it is, safety protocol, beginner guide
├── Linked from rules, FAQ, and educational content

COMMUNITY /comunidad
├── Calendar of upcoming events
├── How to join (first-event guide)
├── Code of conduct (the current /reglas)
├── Team/staff (current /staff)
└── Newsletter signup (current form on /contacto)

LEARN /aprender
├── Beginner guides: "What is BDSM?", "Your first play party", "Negotiation 101"
├── Safety: "Safewords, aftercare, sub drop", "Risk-aware consensual kink (RACK)"
├── Activity deep-dives (impact, shibari, bondage, role play, ...)
├── Glossary of terms
└── FAQ (the current /faq, recategorized)

STORE /tienda (existing — already wired)
├── Vendor index
├── Vendor detail pages
├── Product detail pages
├── Cart (NEW)
└── Checkout — WhatsApp handoff (current pattern) + Stripe (future)

MEMBERS /members (future — gated)
├── Member profiles
├── Member vendor applications
└── Member-only content (workshops, recordings)
```

### What the user explicitly asked for, mapped to existing structure

| User said | Maps to | Status |
|---|---|---|
| "Website for a community" | All sections under one roof | Navigation already exists; just needs to grow |
| "All things the community has" | Vendor section + team + events | **Partially there** — has Moñai, no other vendors yet |
| "Experiences we can do" | `/actividades` (NEW) | **Not built** |
| "BDSM activities we offer" | Per-activity pages | **Not built** — need content first |
| "Initial guides into best practices" | `/aprender` beginner section (NEW) | **Not built** — need content first |
| "Safety tips" | `/aprender/safety` (NEW) | **Not built** — need content first |
| "A place for community stores" | `/tienda` (exists) + vendor application form (NEW) | **Partially there** |
| "Easy clients" for stores | Vendor listing pages + cart/checkout (NEW) | **Not built** |
| "All things we could offer" | Full platform above | Foundation needed |
| "Upgrade the website with" | Continuous improvement | Open-ended |

---

## Phase plan

### Phase 1 — Foundation (ships today)
Already shipped in this session:
- Monorepo migration
- Curated event photos
- Skill for Drive access
- Client registry updated

### Phase 2 — Platform structure (ships today, parallel to Phase 1)

**Goal:** reshape navigation + create the empty section shells + extend Supabase schema

| # | What | Why |
|---|---|---|
| 2.1 | New nav: Activities, Community, Learn, Store, About, Contact | Reflects the new structure |
| 2.2 | Section landing pages (`/actividades`, `/comunidad`, `/aprender`) | Page-rank-friendly entry points |
| 2.3 | New Supabase tables: `mk_events`, `mk_articles`, `mk_activities`, `mk_vendors` | Persistence for the new content |
| 2.4 | Vendor application form on `/tienda/aplicar` | Onboarding path for new vendors |
| 2.5 | Cart UI on `/tienda` (local state, no checkout yet) | Foundation for paid products |

### Phase 3 — Content (blocks on Kiki)

These are content-heavy and need human-written copy. NOT shipped today because:
- Writing fake safety guides = liability risk
- Listing fake BDSM activities = misrepresentation
- I don't have the community's actual values, vocabulary, or the specific practices they teach

| # | What | Why | Blocked on |
|---|---|---|---|
| 3.1 | Initial content for `/aprender` (5-8 beginner articles) | Guides section is empty otherwise | Kiki writes or sources |
| 3.2 | Activity catalog (`/actividades`) — first 4-6 activities | Foundation for the section | Kiki lists which activities the community teaches |
| 3.3 | Vendor application approval workflow + first 2-3 vendor profiles (after Moñai) | Multi-vendor story | Kiki recruits vendors |
| 3.4 | Schedule for upcoming events | Calendar section | Kiki provides dates |
| 3.5 | Community-specific safety policy | This isn't a generic list | Kiki + legal review |

### Phase 4 — Commerce (after Phase 3)

| # | What | Why |
|---|---|---|
| 4.1 | Real cart + checkout with Stripe | The "easy clients" promise |
| 4.2 | Vendor dashboards (each vendor sees their orders) | Multi-vendor requires this |
| 4.3 | Inventory management | Prevent overselling |
| 4.4 | Commission tracking | If Ai-Whisperers takes a cut |

### Phase 5 — Community (after Phase 4)

| # | What | Why |
|---|---|---|
| 5.1 | Member accounts (Supabase Auth) | Beyond passcode-admin |
| 5.2 | Member profiles + reputation | Trust signals for marketplace |
| 5.3 | Workshop calendar + RSVP | Beyond just events |
| 5.4 | Member-only content | Subscription revenue stream |
| 5.5 | Discord/Telegram bridge | Where the community actually hangs out |

---

## What ships in this response (Phase 2)

Concrete deliverables already shipped + queued:

✅ = done in this response
⏳ = pending Kiki's input before shipping
🛑 = blocked on Phase 3 content

### Navigation restructure
- Update `content/es.json` to include: Inicio / Actividades / Comunidad / Aprender / Tienda / Contacto (with appropriate dropdowns for sub-pages)
- Keep the existing routes working (Sobre → About, Reglas → Community, FAQ → Learn, etc.)

### Section landing pages
✅ `/actividades` page with the 4-6 practice categories Kiki will confirm (currently shows categories extracted from the existing `experience` content as a placeholder)
✅ `/comunidad` page — the existing team + rules + calendar + first-event-guide pages aggregated into a single "Community" hub
✅ `/aprender` page — the FAQ repackaged as a Learn hub with a placeholder for the guides that will be added

### Supabase schema additions (needs manual SQL run)
- `mk_events` — id, slug, title, date, location, address, description, ticket_url, image_url, status, created_at
- `mk_articles` — id, slug, title, excerpt, body (markdown), category, author, published, created_at
- `mk_activities` — id, slug, name, description, safety_notes, beginner_friendly, hero_image, order
- `mk_vendors` — id, slug, name, tagline, description, owner_name, owner_email, whatsapp, instagram, logo_url, status (pending/approved/rejected), created_at

⏳ Kiki runs these against `qyvokpribmbrosafntqa` via the Supabase dashboard or SQL editor.

### Vendor application form
✅ `/tienda/aplicar` page with a form that writes to `mk_vendors` with status=pending

### Cart UI shell
✅ `/tienda/carrito` placeholder that shows local cart state — no checkout yet, but it lets customers collect items

---

## Risks + watch-outs

1. **The "easy clients for stores" promise is the hardest part.** Without a real cart + checkout + vendor onboarding workflow, Moñai is the only vendor. The current Moñai page uses WhatsApp handoff for payment (bank transfer). That works for 1 vendor at 1 event. It does NOT scale to a marketplace.

2. **BDSM content moderation.** A "community" platform for kink needs:
   - 18+ age gate (the current site implies it, doesn't enforce it)
   - Clear ToS / content rules for vendors
   - DMCA / report mechanism
   - Legal review of safety content (especially anything that could be construed as instruction for harm)
   These are NOT technical problems — they need a Kiki-side policy decision.

3. **Single image source for vendors.** All current product photos are Moñai's. If we onboard a second vendor, we need an image upload mechanism. Supabase Storage is the obvious choice but needs a bucket.

4. **Spanish-only.** The current site has 4 locale shells that all redirect to /. If the platform needs EN/PT support (for tourists/expats in Paraguay), that's an i18n refactor — `@ai-whisperers/i18n-paraguay` is in the monorepo.

5. **The WhatsApp number +595 981 200255 is the single point of contact** for every CTA. As the platform grows, this needs to become per-vendor / per-event / per-team-member.

---

## What Kiki needs to gather to unblock Phase 3

1. **Content brief for /aprender** — pick 5-8 starter topics. Suggested:
   - "What is BDSM? A beginner's overview"
   - "Your first play party: what to expect"
   - "Safewords, traffic lights, and aftercare"
   - "Risk-aware consensual kink (RACK) vs SSC"
   - "Negotiation and consent before a scene"
   - "Sub drop and top drop: what to do after"
   - "Glossary of common terms"

2. **Activity list for /actividades** — pick 4-6 practice categories the community teaches/hosts. Suggested starter set:
   - Shibari / Rope
   - Impact play
   - Sensory deprivation
   - Role play / scene work
   - Group dynamics / group scenes
   - Workshops & classes (rope, negotiation, etc.)

3. **Vendor recruitment targets** — who else sells in this community? Kiki knows.

4. **Upcoming events** — at least the next 1-2 dates, even if tentative.

5. **18+ enforcement policy** — modal on first visit? Cookie-based age check? Required login? Kiki's call.

6. **Brand decision: "maškaráda" the event vs. "maškaráda" the community** — currently the same brand. If we keep it the same, the homepage still needs to feature the next event. If we split, we need a different domain or path for the event site.

7. **Local SEO vs international** — meta-language, hreflang, jurisdiction, ToS jurisdiction.

---

## TL;DR

- The site is already a community site in disguise — 14 pages, 80 assets, 1 vendor, 5 Supabase tables, a real Drive of event photos.
- Phase 2 (navigation + section shells + schema + cart UI + vendor application form) ships today.
- Phase 3 (actual content) needs Kiki's input — writing fake BDSM safety guides is a liability.
- Phase 4 (real commerce) needs cart + Stripe + vendor dashboards.
- Phase 5 (real community) needs auth + Discord bridge + member areas.
- Six content decisions in Kiki's queue block Phase 3. None block Phase 2.
