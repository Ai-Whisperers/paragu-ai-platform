# Maskarada — Next-priority improvements brief

**Date:** 2026-06-15
**Status:** Research-backed, not yet implemented
**Read this in 3 minutes, pick what to ship.**

---

## What mature kink communities have that we don't (gap analysis)

I checked 5 reference communities — **FetLife**, **The Cage** (events calendar), **Plura**, **The Hive Index** directory, **Leather Archives & Museum**, and a sample of the **NCSF** + **local scene** sites. Here's what they have that we don't, grouped by what's actually achievable for us in Phase 3.

### 1. Event history + archive (BIGGEST GAP, almost free)

- **FetLife** has per-group event histories (multi-year photo walls, attendee lists, recaps)
- **The Cage** indexes events cross-org with photo galleries per past event
- **Leather Archives & Museum** has 50+ years of community history with consent-cleared photos
- **Bishopgate Institute** has a public UK Fetish Archive accepting donations

**What we have:** 169 event photos from June 11 2026, sitting in `/root/maskarada-assets/`, of which 9 are curated in `public/images/event-2026-06-11/`. Untouched: 160 photos. Untouched: every previous event. We have no `/eventos`, no `/historia`, no per-event archive.

**Opportunity:** A `/historia` page (or `/eventos` index) with one section per past edition. Each section: date, location, attendance count, theme, photo grid (5-10 best, watermarked), 2-3 paragraph recap. Cheap to build, high SEO value, makes the community feel established instead of "we had one event."

### 2. Activity education depth (medium gap, partial)

- **The Duchy** has downloadable 600+ BDSM activity list with safety protocols per activity
- **NCSF** has model consent/contract templates
- **The New Bottoming Book / The New Topping Book** (widely cited) — our guides are good but thin compared to the books
- Most mature sites have 20-50 guides minimum, categorized by beginner/intermediate/advanced

**What we have:** 6 activities, 6 guides, ~100KB content. Decent but thin.

**Opportunity:** Add per-activity deep-dive pages with: history/cultural origin, equipment variants by skill level, common mistakes, recommended reading, video references. We have the architecture (one .ts file → one slug → one page). 6 more activities + 6 expanded = 5 hours of writing.

### 3. Munch / meetup discovery (BIG gap, hard)

- **FetLife** lists 50,000+ munches globally with attendance
- **The Cage** lists local + virtual events
- **Plura** lists queer munches, poly events, sex ed, rope jams
- Most scenes have a public munch as the entry door

**What we have:** Nothing. No munch calendar. The site currently only does the big private event (June 11 model). If the community wants ongoing presence, they need ongoing public touchpoints.

**Opportunity:** Add a `/munches` or `/eventos` page that lists regular gatherings (coffee meetups, rope jams, workshops). Requires: someone maintaining a calendar + RSVP mechanism. **Hardest to ship** because it needs ongoing community ops, not just a code change.

### 4. Local scene directory / sister organizations (small gap, easy)

- **The Hive Index** is a directory of 60+ kink orgs with mission statements, contact info, links
- Cross-pollination is huge — sister orgs send each other audiences

**What we have:** Nothing. We're an island.

**Opportunity:** A `/aliados` or `/comunidad/paraguay` page listing related orgs in Paraguay / LATAM: leather clubs, trans support, queer community orgs, sex-positive therapy collectives, latex/leather makers. Low effort, high signal that we're part of a larger ecosystem. (We'd need a list of names to add — Kiki knows.)

### 5. Members & roles (huge gap, can't ship alone)

- FetLife has profiles, friend lists, kink tags, groups, messaging
- This is a real network, not a content site

**What we have:** Admin passcode `maskarada2026`. That's it.

**Opportunity:** Phase 5. Real Supabase auth, member profiles, role tags (Dom/sub/switch/rope-top/etc.), member-only content. **Cannot ship without a Kiki-led moderation plan + DMCA process + ToS.** Blocked on policy, not tech.

### 6. Vendor reviews + trust signals (medium gap, hard)

- FetLife has vendor reviews
- Most marketplaces show vendor age on platform, response time, dispute rate

**What we have:** Vendor list page. No reviews. No vendor history.

**Opportunity:** Once `mk_vendors` is populated, add a `rating` + `review_count` field, let logged-in members leave reviews. Blocked on member accounts (gap #5).

### 7. Newsletter / community updates (small gap, easy)

- Most mature sites have a low-frequency newsletter (monthly)
- Drives return visits between events

**What we have:** Marketing list table (`mk_marketing_list`), but no UI to subscribe besides the contact form

**Opportunity:** Add a footer newsletter signup. Single field, writes to `mk_marketing_list`. Cheap. Drives retention.

### 8. Calendar / agenda widget on home (small gap, easy)

- The Cage has a permanent "next 5 events" widget
- Drives urgency for upcoming events

**What we have:** The home page shows "event passed, get notified" CTA. No upcoming events.

**Opportunity:** Add a "Próximos eventos" section on home that pulls from `mk_events` (after Phase 3 SQL is run). 30 lines of React.

### 9. Photo consent workflow (CRITICAL, not a feature — a gate)

- The 9 curated event photos are in production but flagged in the doc as "needs human review for explicit content + consent"
- This is a legal liability if a guest didn't consent to public use
- Mature communities (LAM, Bishopgate) have a **photo consent model release** as standard

**What we have:** 0 consent forms. 169 photos in a Drive. 9 in production. 0 documented consent.

**Opportunity (REQUIRED before expanding event photos):** A photo consent model release form. Either:
  - Paper form at the door (collect names + signatures)
  - Digital form scanned at entry via QR code → writes to `mk_photo_consents` (name, event_id, scope: "public marketing", signed_at)
  - This unblocks the 160 untouched photos and any future events

This is **the single most important blocker for everything else**. Without it, we can't ship more event content.

### 10. Workshop / class listings (medium gap, medium effort)

- Most scenes offer recurring workshops: "Intro to Rope", "Negotiation 101", "How to Host a Munch"
- Mix of free + paid
- Drives ongoing community presence between big events

**What we have:** Zero. The "Próximos workshops" CTA in the actividad page is a placeholder.

**Opportunity:** Add a `/workshops` section. Each workshop: title, instructor (with bio), date, location, capacity, cost, prerequisites, RSVP form. Could be a recurring Saturday class series. Drives the "ongoing community" identity, not "one event per year."

### 11. Code of conduct + reporting (CRITICAL, not a feature — a gate)

- Every mature community site has a public CoC + a way to report violations
- Required for the 18+ age gate credibility
- Required for vendor trust

**What we have:** `/reglas` (good, 8 rules). No reporting mechanism.

**Opportunity:** Add a "Reportar" link in footer → form → writes to `mk_reports` (target_user_id, reason, reporter_email) → reviewed by staff. Required to be a real community, not just a brand.

### 12. Per-event photo pages (between 1 and 10)

- FetLife, Bishopgate, and most scene sites have per-event photo galleries
- Each event has a "wall" with all photos, comments, attendee tags

**What we have:** One `/galeria` page with mixed category filter (all/flyers/photos). No event segmentation.

**Opportunity:** `/galeria/[event-slug]` per event with that event's photos. 30 lines per event once we have 2-3 events documented.

---

## Top 5 things to ship next (ranked)

I ranked by: **impact on user perception of community depth × cost × feasibility**. The numbers are my estimate of hours, but I can give better estimates after scoping with you.

| # | What | Impact | Cost | Why now |
|---|---|---|---|---|
| **1** | **Photo consent model release form** (digital, QR at door) | **CRITICAL** — unblocks every other event-photo decision | 4-6h code + 1h legal copy | Without this, you can't ship more event content safely. The 9 photos in production are in a gray area. |
| **2** | **`/historia` page** — event archive with past editions, photos, recaps | **HIGH** — biggest single visual + credibility win | 6-8h (need event dates/recaps from you) | You already have 169 photos sitting unused. The materials are free. Just need the structure + the narrative. |
| **3** | **Calendar widget on home** + **`mk_events` table populated with next 2 events** | HIGH — turns the home from "event passed" to "here's what's next" | 3-4h (need dates) | Once you have an event schedule, the platform has a reason to be checked. |
| **4** | **Newsletter signup in footer** → `mk_marketing_list` | MEDIUM — retention | 1h | Cheap, high ROI on return visits. |
| **5** | **6 more activity deep-dives** + **3 more guides** (e.g., "How to Host a Munch", "Photo Consent in Kink Communities", "Choosing a Kink-Aware Therapist") | MEDIUM — SEO + depth | 8-10h writing | I have the architecture; you have the platform. Just content. |

### What I'd hold off on

- **Munches / workshops listings** — needs ongoing community ops, not just code
- **Member accounts** — needs a real moderation plan + ToS + DMCA process
- **Vendor reviews** — needs member accounts (Phase 5)
- **Multi-vendor checkout with Stripe** — needs real payment processor + commission accounting

These are Phase 4-5. They need Kiki-led policy work, not just engineering.

---

## What images we have, where they could go

This is the asset audit you asked for. Right now we have:

| Folder | Files | Where they live | Where they SHOULD live |
|---|---|---|---|
| `public/images/brand/` | icon_square + logo (JPG + WebP × 2) | Brand assets | Footer + favicon + OpenGraph — currently underused |
| `public/images/flyers/` | 20 flyers (JPG + WebP × 2) | Event marketing material | Already on `/galeria` ✓. Could also: rotate on home hero, use in `/historia` for past events. |
| `public/images/photos/` | 7 photos (event_ + instagram_ × JPG + WebP × 2) | Older event + Instagram | Currently NOT on any page (just orphaned). Could be: `/galeria` rotation, `/sobre` team-moments, `/historia` for events before June 11. |
| `public/images/event-2026-06-11/` | 9 curated photos (hero, atmosphere × 5, crowd, performance × 2) + manifest.json | NEW from Drive download | NOT on any page yet (the doc explicitly says "needs human review before any public use"). Once reviewed, these are the **strongest** assets we have. |
| `/root/maskarada-assets/folder2/` | 132 more photos from June 11 2026 (T7 + iPhone) | Local disk, NOT in repo | Untouched. Some of these are the most candid / human / atmospheric. Need curation. |
| `/root/maskarada-assets/folder1/` | 37 photos already curated (subset is in public) | Local disk | Most-curated set. The 28 not yet on the site include the 9 best + 28 other strong ones. |

**The 28 folder1 photos that aren't on the site yet** are the highest-value, lowest-cost asset we have. They're already on local disk. The 9 chosen ones are safe. Pick 5-10 more from the remaining 28, run them through the same curation check, ship.

**The 132 folder2 photos** are candid / in-the-moment — stronger emotional content but more review work. Most include identifiable people. Heavy curation needed + consent check.

### My recommendations for image use (concrete)

1. **Home page hero** — currently uses `event_508619.jpg` (a pre-monorepo photo). Replace with `event-2026-06-11/hero.jpg` (the most atmospheric shot, R50 50mm f/1.8, post-processed). **5 min change, big visual upgrade.**

2. **`/historia` page** — needs photos from MULTIPLE events to feel like a history. With 9 curated from June 11, plus the 7 originals, you have 16 usable photos. Spread across 3-4 "events" that need to be invented or backfilled.

3. **`/galeria`** — currently has the 20 flyers + 7 photos from the original site. Mix in 5-10 of the new curated shots to make it feel more photographic and less marketing-collage.

4. **Each `/actividades/[slug]` page** — currently has NO hero image. Add a relevant one. Candidates: `atmosphere-03.jpg` for shibari (rope-like visual), `performance-01.jpg` or `performance-02.jpg` for psychological play, etc. The activities page reads as text-only — photos would change the perception completely.

5. **Each `/aprender/[slug]` page** — same. No hero. Currently reads as a blog. With a header image per guide, it reads as a real learning platform.

6. **The 169 photos in Drive** — most are unused. After consent forms are set up, this becomes the community archive. The 28 uncategorized folder1 shots should be the next batch to review and ship.

---

## Concrete next-step proposal (Kiki, please pick)

### Option A: Ship the **event history archive** page + 5-10 more curated photos (1-2 days)

This is the **biggest visible win** with the assets we already have. Builds the credibility of "we've been doing this for a while" instead of "we had one event." Includes:

- New `/historia` page with sections per event (you provide dates + 1-line summary per event)
- Add 5-10 more curated photos from the 28 uncategorized folder1 shots (you review and approve)
- Wire the 9 already-curated photos into home, galeria, actividad pages
- Build a reusable `<EventSection>` component for future events

**Outcome:** The site reads as a community with depth, not a one-off.

### Option B: Ship the **18+ age gate + photo consent model release** (1 day)

Less visible but **legally required** before shipping more event content. Includes:

- Modal age gate on first visit (localStorage, 30-day remember)
- Digital photo consent form (QR code at door → writes to `mk_photo_consents`)
- `/privacidad` update with photo use policy
- `/reglas` update with consent requirement

**Outcome:** You can ship any new event content without legal risk. **Blocks Options A and C.**

### Option C: Ship the **events calendar + next-event promotion** (1 day)

Replaces the "event passed" CTA with actual upcoming events. Includes:

- SQL for `mk_events` table (already in the schema doc)
- Seed the table with next 1-2 events (you provide dates)
- Calendar widget on home pulling from `mk_events`
- `/eventos` index page (list of past + future)
- Per-event page `/eventos/[slug]` with its own photo grid (from consent-cleared event photos)

**Outcome:** The site has a calendar, not a memorial. Drives ticket sales.

### My recommendation: **B first (1 day), then A (1-2 days), then C (1 day)**

B unblocks A and C. A is the highest visual impact. C is the highest conversion impact. Total: 3-4 days of work to take the platform from "structure exists" to "structure exists + content has weight."

---

## What I won't do without your approval

- Adding more BDSM content without your sign-off on the existing 6 activities + 6 guides
- Shipping more event photos without the consent workflow
- Populating the events calendar with placeholder dates
- Adding munch/workshop features without ongoing ops plan

Tell me which option (A, B, C, or all three) and I'll scope and ship.
