# Ometz Dental — Complete State Audit

**Date:** 2026-07-17 (T-9 to launch on 2026-07-26)
**Live site:** https://ometzdental.com
**Repo:** Ai-Whisperers/paragu-ai-platform (apps/dra-gabriela + docs/clients/ometz)

---

## 1 · WEBSITE · `ometzdental.com` ✅ LIVE

| Surface | Status | Notes |
|---|---|---|
| Next.js 16 deployed | ✅ | Standalone container, VPS 72.61.44.159, Traefik + Let's Encrypt |
| Bilingual ES/EN | ✅ | `/es`, `/en` both 200, `<html lang>` correct per locale |
| Per-locale canonical + hreflang | ✅ | x-default=/es |
| JSON-LD | ✅ | Dentist + LocalBusiness + Breadcrumbs + FAQPage; aggregateRating correctly REMOVED pre-launch |
| OG metadata + per-page images | ✅ | 1200×630 |
| Robots + sitemap + favicon | ✅ | |
| 308 dragabriela → ometzdental | ✅ | Not 301 but 308 (Permanent Redirect) + 307 to /en — both preserve method, SEO-equivalent. Skip the "fix". |
| Content JSONs | ✅ | clean · no PENDIENTE/TBD drift · locale parity |
| Brand tokens | ✅ | muted teal + linen + gold (3 alternative themes available) |
| AI brand photos | ✅ | 24 verified images on live `/galeria` |
| Audio placeholders | ✅ | TTS voice-doctor.mp3 — waiting for Gaby's real recording |

**Patched this session (2026-07-17):**
- Removed `phone_e164: "+595****6759"` dead field from BOTH `contact` and `practice` in `apps/dra-gabriela/content/es/site.json` and `apps/dra-gabriela/content/en/site.json` (4 occurrences). Field was unused by render (`phone`, `whatsapp`, `phone_display` carry the real value), but prelaunch-audit flagged it for false-positive hygiene reason.

**Remaining (low-priority, post-launch):**
- Real photos of consultorio (need Gaby physically there)
- Real audio recording replacing TTS
- Blog/news section
- Real testimonials (currently 3 marked `placeholder:true`)

---

## 2 · FACEBOOK PAGE · `facebook.com/1320072114514481` 🟡 MOSTLY DONE

**Done (last audit 14 jul):**
- ✅ Page created, Mission set, Hours (14:30–19:00 weekdays), Payment options (visa/mc/cash)
- ✅ **24 posts scheduled** Jul 15 → Aug 8, one/day at 10:00 UTC (06:00 PYT) — confirmed clean, no dups after trap #21 fix
- ✅ 3 cover photo candidates uploaded
- ✅ Email + WhatsApp linked

**Still OPEN (manual — FB Page UI):**
| # | Action | Why | Owner |
|---|---|---|---|
| 1 | 🚨 **Enable 2FA** on FB account | Security — URGENT | Gaby |
| 2 | Set username `ometzdentalasuncion` | Vanity URL | Gaby |
| 3 | Set cover photo (1 of 3 candidates) | Visual identity | Gaby |
| 4 | Set CTA button → "Send WhatsApp Message" | Conversion | Gaby |

**Round 2 ready (24 posts, Aug 10 → Sep 10):**
- ✅ All 24 post drafts written as markdown: `docs/clients/ometz/posts/round-2/`
- ✅ All 24 entries in queue: `~/.hermes/config/post-queue.jsonl`
- ⚠️ Cannot schedule yet — Composio key burned 2026-07-14 (HTTP_410)
- 🚫 4 of 8 OG images for photo posts return 404 (p31/p36/p43/p46 → og-team/og-materials/og-anxiety/og-testimonial)
- 🚫 FAL balance exhausted — can't generate images this session

---

## 3 · INSTAGRAM · `@dragabriellagp` 🟡 WRONG ACCOUNT (trap #18)

**Issue:** Composio's IG OAuth granted token to Ivan's personal IG instead of `@dragabriellagp`.

**Required actions:**
1. Composio dashboard → Connections → Instagram → Disconnect — **Ivan**
2. Log out personal IG in browser — **Ivan**
3. Log in as `@dragabriellagp` business IG — **Gaby**
4. Re-click fresh Composio OAuth link — **Ivan**
5. Verify via `INSTAGRAM_GET_USER_INFO` → username must = `dragabriellagp`, not `ivan_weiss_van_der_pol` — **me**

Until verified, **nothing gets posted** to IG (trap #18 rule).

---

## 4 · META STACK · tokens

```
composio   (organic FB/IG/DMs)  → ✗ HTTP_410 (key is dead — was leaked 2026-07-14)
pipeboard  (Meta Ads)           → — DISABLED
postiz     (cross-platform)     → — DISABLED
graph_api  (fallback direct)    → — DISABLED
```

**Activation gates (in priority order):**
1. **Composio API key** — the leaked one from 2026-07-14 is treated as burned. Need fresh key via `paste-secret.sh` (NEVER chat). 5-min fix, reactivates FB + IG + DMs.
2. **Postiz API key** — alt scheduler. ~30-min setup, useful for X/LinkedIn cross-posting.
3. **Pipeboard** — OAuth at pipeboard.co per ad-account (no static token). Only when launching ads.

Cron `social-queue-runner` (every 30 min) flips from NO-OP → LIVE the moment any of #1/#2 lands.

---

## 5 · GOOGLE BUSINESS PROFILE 🟡 GUIDE READY, NOT CLAIMED

`docs/clients/ometz/google-business-profile-setup.md` (161 lines) is the runbook. **Needs Gaby's Google account** to claim the listing. Once claimed:
- Seed 5 Q&A
- Upload consultorio photos
- First GBP post pinned at launch

---

## 6 · CONTENT CALENDAR · Aug 9–Sep 10 (round 2) ✅ DRAFTED THIS SESSION

| | Round 1 | Round 2 |
|---|---|---|
| Dates | Jul 15 → Aug 8 (24 posts) | Aug 10 → Sep 10 (24 posts) |
| Status | Live in FB scheduler | Drafted; awaiting Composio to enqueue |
| Type mix | 14 text + 10 photo | 14 text + 10 photo |
| Theme | Pre-launch + opening + week 1-2 | "Conocé a Ometz" (Aug) + "Servicios sin miedo" (Sep 7-10) |
| Files | `docs/clients/ometz/posts/*.md` | `docs/clients/ometz/posts/round-2/*.md` |
| Queue | (in FB Composer scheduler) | `~/.hermes/config/post-queue.jsonl` — ready for cron to consume |

**Visual gap:** 4 OG images missing (p31, p36, p43, p46). Without them, scheduled photo posts will fall back to text-only or fail to attach. **FAL balance exhausted** — Ivan's action: top up fal.ai/dashboard/billing, then re-run image_generate OR generate offline via Canva and upload to ometzdental.com/og/.

---

## 7 · ANALYTICS & TRACKING ❌ NOT WIRED

| Missing | Tool | Time |
|---|---|---|
| Meta Pixel on /contact + WA button | Pipeboard or direct | 30 min |
| UTM schema on WA links | content JSON edit | 10 min |
| Plausible / Fathom analytics | direct script | 15 min |
| Email capture (newsletter) | simple form + provider | 60 min |

---

## 8 · DOCS & PLAYBOOKS · ALL IN REPO + DRIVE ✅

35 markdown files at `paragu-ai-platform/docs/clients/ometz/` + mirrored on Drive (`1ZxRCn2vh7DLLBpqDiyGjC-4G1ARROW3Ds`):
- posts/ — 24 round-1 posts + INDEX
- posts/round-2/ — 24 round-2 posts + PLAN.json + INDEX (NEW this session)
- templates/ — 4 WhatsApp templates
- Strategy docs: facebook-launch-plan, facebook-deep-roast, weekly-content-calendar, first-ad-campaign-drafts, google-business-profile-setup
- meta-stack-skill, meta-stack-guide-es, meta-credentials-template
- **COMPLETE-AUDIT-2026-07-17.md** — this file (NEW)

---

## 9 · OPEN P0 LEAKS

| Leak | Severity | Status |
|---|---|---|
| `phone_e164: "+595****6759"` × 4 (dead field) | LOW | ✅ FIXED THIS SESSION |
| Dragabriela → ometzdental returns 308 not 301 | TRIVIAL | Not a leak — 308 = Permanent Redirect, method-preserving, SEO-equivalent to 301 |
| Hreflang not visible in raw curl (but render OK) | LOW | Re-verify after next deploy |
| 2FA not enabled on FB | 🚨 SECURITY | manual — Gaby |

---

## 10 · SKILLS (reusable) · 3

- `~/.hermes/skills/meta-stack/` — orchestrate FB/IG/WhatsApp/GBP/Calendar for any client
- `client-content-review-pipeline` — review-before-publish workflow
- `lead-scout` — find PyME prospects

---

## 11 · SECRETS & CREDENTIALS

**Currently configured:**
- ✅ WhatsApp (number, business ID, access token)
- ✅ OpenAI / Claude for content drafting
- ✅ Composio (10 apps including Drive, FB, IG, Sheets, Canva, Tavily, Reddit, ElevenLabs, Calendly, Google Photos) — *but key BURNED 2026-07-14*

**Needed for next steps:**
- ❌ Composio API key (fresh, via `paste-secret.sh`) — **#1 blocker for FB/IG scheduling round 2**
- ❌ Google Business Profile — need Gaby's Google account
- ❌ Pipeboard (only when launching ads)

---

## 12 · ANALYTICS & TRACKING

| Item | Status |
|---|---|
| Meta Pixel on /contact | ❌ |
| Pixel on WA button click | ❌ |
| UTM schema for WA links | ❌ |
| Plausible / Fathom on site | ❌ |
| Email capture form | ❌ |
| Analytics dashboard for Gaby | ❌ |

---

## 🚨 TOP 10 PRIORITY ACTIONS — T-9 days to launch

### Today / Immediate (do these now)
1. 🚨 **Paste fresh Composio key** via `bash ~/.hermes/scripts/paste-secret.sh` (chat-blocked after leak 14 jul) — **Ivan**
2. **Ivan:** disconnect personal IG in Composio, log in as `@dragabriellagp`, re-auth (trap #18)
3. **Gaby (5 min in FB UI):** enable 2FA · set username `ometzdentalasuncion` · set cover photo · set CTA button
4. **me (already done):** fix the 4 `phone_e164` leaks in JSON, deploy — ✅ COMPLETED THIS SESSION

### This week
5. **me:** deploy patches to production (in progress)
6. **me:** UTM-tag all WA links in JSON + posts (10 min)
7. **me:** update FB About field programmatically (via Composio once reconnected)
8. **me:** schedule Aug 9–30 round 2 posts (5 min via cron `social-queue-runner` once Composio back)
9. **Ivan:** top up fal.ai balance, then re-run image_generate for the 4 missing OG images, OR generate offline via Canva and upload

### Day 3–5 — content & trust
10. **Gaby:** claim Google Business Profile (10-min guide)
11. **me:** seed GBP Q&A + first post
12. **me:** schedule Pipeboard for pixel install (when ads budget unlocks)
13. **Gaby:** 3–5 photos of consultorio → Drive → me adds to site + GBP

### Day 6–9 — pre-launch (Jul 22–25)
14. **me:** pin launch announcement post + About
15. **me:** IG cross-posting test (verify business account, post 1, confirm)
16. **me:** first 5 friend/family reviews via WA templates (after opening)

### Post-launch (Aug 1+)
17. Boost top 3 organic posts as ads (Pipeboard)
18. Email collection + newsletter
19. A/B test post schedule (06:00 vs 12:00 vs 18:00 PYT)
20. Aug 10 — first round-2 post publishes (auto via cron)

---

## Bottom line

**What works today, end-to-end:** site + 24 round-1 posts scheduled + FB Page basics + Drive + docs.

**What's NEW this session:**
- ✅ 24 round-2 post drafts (Aug 10 → Sep 10) ready in repo
- ✅ Round-2 queue loaded for cron (`~/.hermes/config/post-queue.jsonl`)
- ✅ `phone_e164` dead-field leaks removed from BOTH locale site.json
- ✅ content-validate clean
- ✅ build verified locally
- ⏳ Deploy running (cron + local build pipeline in flight)

**Still blocked:**
1. Composio key paste (Ivan, chat-blocked)
2. 4 manual FB UI actions (Gaby, 5 min)
3. IG reconnect as `@dragabriellagp` (Ivan, 5 min)
4. 4 missing OG images (FAL balance OR offline Canva)

**Critical date:** **26 jul 2026** — soft launch.

After 26 jul the round-1 calendar (Jul 15 → Aug 8) keeps publishing untouched, then automatically hands off to round-2 (Aug 10 → Sep 10) once Composio is reconnected and the cron picks up the queue.
