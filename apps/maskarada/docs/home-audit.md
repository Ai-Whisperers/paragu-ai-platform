# Home page audit — what should stay, what should split out

**Date:** 2026-06-15
**Status:** Analysis only, no code changes yet

---

## Current state of `/` (9 sections, ~67KB rendered)

The home page is doing **too much**. It currently mixes:

| § | Section | Should be on home? | Where it actually belongs |
|---|---|---|---|
| 1 | **Hero** (countdown + event date) | ✅ Yes — this is the home's job |
| 2 | **"La Experiencia"** (3 cards: misterio / kink / música) | ❌ No | Replaced by the activities section (§5) — or move to `/sobre` |
| 3 | **"Lo Que Dicen"** (testimonials) | ⚠️ Maybe | Either drop (we don't have real ones yet) or move to `/sobre` |
| 4 | **"El Evento"** (date/location/dresscode/age) | ❌ No | Belongs on `/eventos` — we already have that page |
| 5 | **Actividades** (6-card grid of activities) | ⚠️ Maybe | Could be a "featured" subset (3-4 cards), rest goes to `/actividades` |
| 6 | **Aprender** (3-card grid of guides) | ⚠️ Maybe | Same as above — featured subset on home, full list on `/aprender` |
| 7 | **Tienda de la comunidad** (vendor CTA) | ❌ No | Belongs on `/tienda` — we have that page |
| 8 | **"¿Listo para la experiencia?"** (final CTA → /entradas) | ⚠️ Maybe | Keep as the closing CTA but conditional on upcoming eventos (when no evento coming, hide it) |
| 9 | **"Seguinos en Instagram"** | ❌ No | Move to footer (already there) and the `/comunidad` page |

## What's missing from home but should be there

| Section | Why it belongs on home |
|---|---|
| **Próximos eventos** (already added in last session ✓) | This is the "what's coming" hook. Currently 1 line of context + 5 events. Could be more prominent. |
| **Encuentros (recurring)** | Should mention alongside eventos. The "ongoing presence" of the community. |
| **Historia — featured event** | One line + photo teaser pointing to `/historia` |
| **Join us / about** (one paragraph) | Currently buried. Should be a 3-sentence "what is maškaráda" above the fold |
| **Statistics / social proof** | 18+ months of community, X events, X attendees, X vendors. Even rough numbers help. |

## Recommended home page structure (6 sections max)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HERO (above the fold)                                       │
│    - Brand mark                                                 │
│    - "Comunidad de kink y exploración consciente"               │
│    - Próximos eventos: 1-line summary + 1 primary CTA            │
│    - Or: "Sin eventos próximos" + "Sumate a la lista"            │
│    - Single primary CTA: "Ver próximos eventos"                 │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 2. UPCOMING EVENTS WIDGET (already exists ✓)                   │
│    - Next 5 events: 1 formal + 4 recurring                     │
│    - Calendar subscribe link                                    │
│    - Two CTAs: /eventos (formal) / /encuentros (recurring)      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 3. WHAT IS MAŠKARÁDA (NEW)                                     │
│    - 3-sentence pitch                                           │
│    - "Comunidad desde 2025. 4 ediciones. 1 munch mensual."     │
│    - 4 mini-cards: Eventos / Encuentros / Aprender / Tienda     │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 4. FEATURED ACTIVITIES (subset, 4 cards)                       │
│    - 4 of the 6 activities                                     │
│    - "Ver todas las actividades →"                               │
│    - Goes to /actividades                                       │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 5. RECENT HISTORY (one event teaser)                            │
│    - The featured event (Simón Dice)                            │
│    - One photo + one paragraph recap                            │
│    - "Ver archivo histórico →" → /historia                      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ 6. COMMUNITY PULSE (stats + community CTA)                     │
│    - Numbers: 4 ediciones, 7 personas en el staff, 1 vendor,  │
│      6 actividades, 6 guías                                     │
│    - "Sumate a la comunidad" → /comunidad                       │
│    - "Anotate para no perderte nada" (newsletter)               │
└─────────────────────────────────────────────────────────────┘
```

That's 6 sections instead of 9. Each section is shorter, with one clear purpose, one primary CTA.

## Nav audit — what we have vs. what we need

**Current nav (10 items):**
```
Inicio / Actividades / Comunidad / Aprender / Historia / Eventos / Encuentros / Tienda / 🛒 Carrito / Contacto
```

### Problems with current nav

1. **10 items is too many** for a top nav. Industry rule of thumb: 5-7 primary + 1 cart/basket.
2. **Order is not by user journey.** Newcomer journey is usually: see what → learn how → meet people → show up. Current order doesn't reflect that.
3. **Some items are entry points, others are deep cuts.** "Comunidad" and "Aprender" are sub-sections of the same domain.
4. **"Carrito" with emoji in the nav is ugly.** Better as a small icon button separate from the main nav.
5. **No "Sobre"** — the about page is buried under `/comunidad` but it deserves prominence.

### Recommended nav restructure (7 primary items)

```
[ 🎭 maškaráda ]  Eventos  Comunidad  Aprender  Tienda  Sobre  [🔍 Search] [🛒 (3)]
```

Translated:
1. **Inicio** (logo) — `/`
2. **Eventos** — `/eventos` (consolidated from current Eventos + Encuentros, with sub-tabs inside)
3. **Comunidad** — `/comunidad` (one page, well-organized)
4. **Aprender** — `/aprender`
5. **Tienda** — `/tienda` (no /tienda/carrito in main nav — cart becomes an icon button with badge)
6. **Sobre** — `/sobre` (the existing about page, now in main nav)
7. **Contacto** — `/contacto` (or merge into /sobre)

### Why consolidate Eventos + Encuentros

The current split (formal eventos vs recurring gatherings) is too fine-grained for a top-level nav. Most users don't care about the taxonomy — they want "what's happening". Better UX:
- **Single `/eventos` page** with two sub-tabs or two sections: "Próximos formales" + "Encuentros regulares"
- The calendar widget on home already shows both kinds
- The iCal feed already exports both

### Recommended page structure (single source of truth)

```
/                        Inicio (home, 6 sections as above)
/eventos                 ALL events in one place (tabbed: Próximos · Encuentros · Pasados)
/eventos/[slug]          Formal evento detail
/encuentros/[slug]       Encuentro detail (could redirect from /eventos or live alongside)
/comunidad               Community hub (reglas + primera-fiesta + team + apply-as-vendor + aliados)
/aprender                 Learn hub
/aprender/[slug]         Guide detail
/actividades              Activity catalog
/actividades/[slug]      Activity detail
/historia                 Event archive
/historia/[slug]          Past event detail
/tienda                   Vendor listing
/tienda/aplicar          Vendor application form
/tienda/monai            Moñai product page
/contacto                 Contact (could merge into /sobre)
/sobre                    About maškaráda
/entradas                 Ticket purchase (keep — it's the only transactional page)
/consentimiento           Photo consent (linked from /historia)
/reglas                   Code of conduct (linked from /comunidad, NOT in main nav)
/privacidad               Privacy (in footer, NOT in main nav)
/staff                    Team (linked from /comunidad, NOT in main nav)
/galeria                  Photo gallery (consider deprecating — replaced by /historia)
```

### What to drop from main nav (move to footer or page-level)

- ~~Actividades~~ (consolidate into /aprender or /comunidad as a section)
- ~~Aprender~~ (consolidate into /comunidad)
- ~~Historia~~ (consolidate into /eventos as a "Pasados" tab)
- ~~Encuentros~~ (consolidate into /eventos as a sub-tab)
- ~~Carrito~~ (icon button in nav, badge for count)
- ~~Contacto~~ (consolidate into /sobre)

### What to add to main nav

- **Sobre** — currently buried under /comunidad, deserves top-nav prominence
- **Search** — findability is a real problem with 30+ pages. A simple search bar that searches titles of actividades, guías, eventos, vendors, history.

## What to split into separate pages (the user's question)

Sections currently on home that should become their own pages (or are already separate pages):

| Currently on home | Should be (or already is) | Status |
|---|---|---|
| "El Evento" (§4) | `/eventos` | ✅ Already exists — **drop from home** |
| "Lo Que Dicen" testimonials (§3) | Drop OR move to `/sobre` | ⚠️ We have no real testimonials — the 4 quotes are made up. **Drop from home** until you have real ones. |
| "La Experiencia" 3 cards (§2) | Replaced by activities section. **Drop or merge**. | ⚠️ The 3 cards are vestigial — the actividades section (§5) is the real version. |
| "Tienda de la comunidad" (§7) | `/tienda` | ✅ Already exists — **drop from home** |
| Hero (§1) | Stays on home, slim down | ✅ Keep but shrink |
| Upcoming events widget | Stays on home | ✅ Keep, currently on home |
| Actividades teasers (§5) | Slim to 4 cards, "ver todas →" | ⚠️ Slim it |
| Aprender teasers (§6) | Slim to 3 cards, "ver todas →" | ⚠️ Slim it |
| "Listo para la experiencia?" (§8) | Conditional CTA at bottom | ⚠️ Keep but make conditional (only show if there are upcoming eventos) |
| Instagram (§9) | Move to footer / /comunidad | ❌ Drop from home, already in footer |

## Concrete diff (what would change)

| Action | What | Effort |
|---|---|---|
| **Drop from home** | "La Experiencia" (§2) | 5 min — remove the section |
| **Drop from home** | "El Evento" (§4) — already at /eventos | 5 min |
| **Drop from home** | "Lo Que Dicen" (§3) — testimonials are fake | 5 min |
| **Drop from home** | "Tienda de la comunidad" (§7) — already at /tienda | 5 min |
| **Drop from home** | Instagram (§9) — already in footer | 5 min |
| **Move from home** | "Final CTA" (§8) → conditional, bottom of / | 15 min |
| **Add to home** | New "What is maškaráda" section with stats | 30 min |
| **Add to home** | History featured event (Simón Dice teaser) | 30 min |
| **Slim home** | Actividades from 6 cards → 4 cards | 15 min |
| **Slim home** | Aprender from 3 → 3 (keep, they're already few) | 5 min |
| **Restructure nav** | Reduce from 10 to 7 items, move Carrito to icon button, add Sobre | 30 min |
| **Consolidate /eventos + /encuentros** | Merge into single page with sub-tabs (data model unchanged) | 1-2h |
| **Add search** | Top nav search that filters /actividades, /aprender, /eventos, /tienda | 2-3h |
| **Total estimated** | | **~5-6 hours** |

## My recommended order (3 batches)

### Batch 1 — "Slim the home" (1 hour)
Drop §2, §3, §4, §7, §9 from home (5 sections removed, page goes from 67KB to ~30KB). Add the new "What is maškaráda" section. Add a history featured event teaser. Result: home becomes a clean 6-section page with 1 CTA per section.

### Batch 2 — "Restructure the nav" (30 min)
Reduce to 7 items. Add Sobre to main nav. Move Carrito to icon button. Move Reglas, Staff, Privacidad, Galeria to footer or page-level links (not main nav). Update `content/es.json`.

### Batch 3 — "Consolidate eventos + encuentros" (2-3 hours)
Merge `/eventos` and `/encuentros` into a single `/eventos` page with sub-tabs (Upcoming · Recurring · Past). Update all links pointing to the old routes (only 2-3 places). Decide whether `/encuentros` becomes a 301 redirect or stays as a sub-page.

After batch 3, the site has:
- 6 sections on home (down from 9)
- 7 primary nav items (down from 10)
- 1 consolidated events page (down from 2)

## What I will NOT do without your sign-off

- Drop the testimonials section (might be useful once you have real ones)
- Merge /eventos with /encuentros without explicit approval (some users may have linked to /encuentros)
- Add a search bar (requires index of all content; could be heavy)
- Move staff, reglas, privacidad off the main nav (they're not in the main nav today; this is preventive)

## What about the "less" principle?

The home page is a **landing page**. Its job is to answer three questions in 5 seconds:
1. **What is this?** (community of kink in Paraguay)
2. **What can I do here?** (events, learning, marketplace, community)
3. **What's next?** (upcoming events, signup, calendar)

The current home tries to be a **content showcase** — it previews everything. That makes it long, slow, and confusing. Slimming it to a landing page is the right move.

A landing page with 6 sections, 1 CTA per section, and 1 clear "what's next" is more effective than a 9-section showcase. The detail lives on the dedicated pages.

---

**Pick what to ship:**
- **A. Slim the home page** (Batch 1) — biggest single impact, 1 hour
- **B. Restructure the nav** (Batch 2) — 30 min
- **C. Consolidate eventos + encuentros** (Batch 3) — 2-3 hours
- **D. Add a search bar** (separate batch) — 2-3 hours
- **All of the above** (sequentially) — total ~6-7 hours
- **None — leave the home as-is** — I overstepped
