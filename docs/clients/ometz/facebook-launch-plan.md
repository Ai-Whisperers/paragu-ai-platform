# Facebook Page — Launch Plan, Pre-Launch Checklist, 30/60/90-Day Roadmap

**Client:** Ometz Dental · Dra. Gabriella González Pane
**Page ID:** `1320072114514481`
**Page URL:** https://www.facebook.com/1320072114514481
**Launch target:** 26 jul 2026 (12 days from this audit)
**Doc date:** 2026-07-14
**Author:** Erebus (auto-generated from FB page audit)

---

## Current state (post auto-fix on 2026-07-14)

| Field | Value | Status |
|---|---|---|
| Name | Ometz Dental - Dra. Gabriella González Pane | ✅ |
| Username | empty | ❌ Manual fix needed |
| Phone | `+595****6759` (masked) | ⚠️ FB-side display choice, can't override via API |
| Email | doctora.gabi@ometzdental.com.py | ✅ |
| Website | https://ometzdental.com/ | ✅ |
| About | "Te escucho. Rehabilitación oral, segunda opinión y planificación en Asunción. 20 años de experiencia. Español + English." | ✅ |
| Description | "Odontología conservadora y rehabilitación oral en Asunción. Segunda opinión escrita, planificación detallada, estética dental. Dra. Gabriella González Pane — 20 años de experiencia. Bilingüe (Español + English). Auditores de la Guerra del Chaco 617, Mburucuyá." | ✅ |
| Fan count | 0 | — |
| Followers | 0 | — |
| Cover photo | empty | ❌ Manual fix needed (photo uploaded, awaiting selection) |
| Profile picture | present (50×50 thumb) | ✅ |
| Posts published | 2 (welcome + photo) | ✅ |
| Scheduled posts | 6 (next 6 days) | ✅ |
| Business hours | Mon–Fri 14:00–19:00 | ⚠️ Off by 30 min from site (14:30) — manual fix needed |
| CTA button | not set | ❌ Manual fix needed |
| Services | not listed | ❌ Manual fix needed |
| Founded year | not set | ❌ Manual fix needed |
| Mission | not set | ❌ Manual fix needed |
| Parking / Payment options | not set | ❌ Manual fix needed |
| Verification status | not_verified | 🟡 Pending Meta Business Verification (paso 4) |
| Instagram linked | ❌ Currently Composio is connected to a personal IG (`ivan_weiss_van_der_pol`), NOT `@dragabriellagp` | ❌ Reconnect needed |
| Reviews | 0 | — |

---

## Part 1 — Pre-launch manual tasks (5 min, do today)

These can't be done via API because Composio doesn't expose those tools for Facebook. **Each one is a 30-sec click in Page Settings.**

| # | Task | Where | Time | Why it matters |
|---|---|---|---|---|
| 1 | Set **username** → `ometzdentalasuncion` (or pick another) | Page Settings → Username | 30s | Clean URL `facebook.com/ometzdentalasuncion`. Only 1 attempt per 14 days, so choose wisely. |
| 2 | Fix **business hours** → Mon–Fri **14:30–19:00** (not 14:00) | Page Settings → Hours | 30s | Sync with website. Off by 30 min — confuses visitors + hurts NAP consistency for Google. |
| 3 | Add **CTA button** → "Send WhatsApp Message" with URL `https://wa.me/595981146759?text=Hola%20Dra.%20Gaby%2C%20me%20interesar%C3%ADa%20agendar%20una%20consulta.` | Page Settings → Add Button | 1m | Conversion path. Without it, visitors bounce. |
| 4 | Set **cover photo** → pick the C-triptych I uploaded (photo id `122097174117400612`) | Page Settings → Cover Photo → "Choose from uploaded photos" | 1m | Page looks bare without it. |
| 5 | Fill **About section**: founded=2006, mission="Odontología conservadora con planificación primero. Tratamos a cada paciente como nos gustaría ser tratados.", parking="Estacionamiento en la calle", payment_options="Efectivo, Transferencia bancaria, Pagopar, Bancard" | Page Settings → About → "Additional information" / "More info" | 2m | Local SEO ranking factor; visitors trust pages with full info. |
| 6 | Add **Services** (Page → Services tab → Add): Segunda opinión escrita, Rehabilitación oral, Odontología conservadora, Estética dental, Planificación de tratamiento | Page → Services | 5m | Service catalog helps search & shows up in "Services near me" |
| 7 | Verify phone: temporarily unmask by going Page Settings → Contact Info → enter the full number with country code (`+595981146759`), then save. The mask only disappears when FB re-saves. | Page Settings → Contact Info | 30s | FB masks by default; explicit save may force unmask. If still masked after, accept it (it's an FB privacy choice). |

**Time total:** ~10 minutes. All in one sitting.

---

## Part 2 — Content prep (this week)

### A. Draft 10 more posts, queued for the next 14 days

I scheduled 6 posts. Need 10 more to cover through launch (26 jul) + first week post-launch. Themes:

| # | Date | Topic | Format | Image |
|---|---|---|---|---|
| 7 | Jul 21 | "Conoce a Dra. Gabriella" — bio with headshot | Photo | `og-home.png` or `D-coat-headshot.png` |
| 8 | Jul 22 | "Lo que necesitás traer a tu primera consulta" — checklist | Text only | — |
| 9 | Jul 23 | "Cómo se planifica un caso complejo" — workflow explainer | Photo | `og-process.png` |
| 10 | Jul 24 | "Mitos sobre la endodoncia" — myth-busting carousel | Carousel (album) | 3-4 AI-generated images |
| 11 | Jul 25 | "Mañana abrimos 🎉" — countdown | Photo | `og-home.png` |
| 12 | Jul 26 | "ABRIMOS HOY" — grand opening | Photo + offer | special opening banner |
| 13 | Jul 27 | First patient day recap | Text | — |
| 14 | Jul 28 | "Cómo es el consultorio" — interior photos | Carousel | actual photos from Gaby |
| 15 | Jul 29 | "Lo que dice la primera paciente" — first review/testimonial | Photo | testimonial quote graphic |
| 16 | Jul 30 | Educational: "5 señales de que necesitás una segunda opinión" | Text | — |

**Action for me:** generate drafts when you say "draft 10 more posts". I'll batch-create them via `FACEBOOK_CREATE_POST` + `FACEBOOK_CREATE_PHOTO_POST` with `scheduled_publish_time`.

### B. Visual assets to create

| Asset | Spec | Purpose | Status |
|---|---|---|---|
| Profile picture | 720×720 px PNG | FB Page profile (current looks generic) | ⚠️ Verify it shows Gaby clearly; current is a small PNG, may need refresh |
| Cover photo | 851×315 px (FB) — 1640×856 px (mobile safe area) | Page banner | ✅ C-triptych uploaded, awaiting selection |
| Per-service header images | 1200×630 px | Open Graph + FB link preview | ✅ Already have `og-services-*.png` for each service |
| Testimonial graphic templates | 1080×1080 px | Quote cards for FB + IG | ❌ Need Canva template — propose 2 designs |
| Price-list graphic | 1080×1350 px (4:5 vertical) | Carousel or single post | ❌ Need design |
| Opening banner | 1640×856 px | Grand opening announcement | ❌ Need design |
| FAQ carousel | 1080×1080 px × 6 slides | Top FAQs | ❌ Need design |
| "Meet Gaby" intro video | 30-60 sec | First impression | ❌ Need Gaby to film |

### C. Templates for ongoing content

I can generate a "weekly content calendar" template that repeats every week:

| Day | Time | Type | Topic | Asset |
|---|---|---|---|---|
| Mon | 10:00 UTC | Text | Motivational quote (es) | — |
| Tue | 10:00 UTC | Photo | Patient education (es) | rotating service image |
| Wed | 10:00 UTC | Text | FAQ of the week | — |
| Thu | 10:00 UTC | Photo | Bilingual post (en) | rotating service image |
| Fri | 10:00 UTC | Text | Testimonial or case study | — |
| Sat | — | (rest) | — | — |
| Sun | — | (rest) | — | — |

After 2 weeks we review what's working + double down.

---

## Part 3 — Things we need BEFORE we can post effectively

### 1. Real patient photos

The 20 AI-generated photos in `ometz-batch-01` are good for layout but visitors want to see the actual place. Need:

| What | How | Deadline |
|---|---|---|
| 3-5 photos of the actual consultorio | Gaby takes with phone (good light, no filters) | Before Jul 22 |
| 1 short video walkthrough (15-30 sec) | Gaby films, shows waiting room + consultorio | Before Jul 24 |
| 1 Gaby headshot (close-up, friendly) | Professional photographer OR phone with portrait mode | Before Jul 21 |
| 1 Gaby with patient (with consent) — for testimonial posts | After first patients consent | Aug 1 |

### 2. Brand assets

| Asset | Spec | Purpose | Status |
|---|---|---|---|
| Logo | SVG + PNG | All FB posts | ✅ Already in `/public/` |
| Color palette | HEX codes | Visual consistency | ✅ `tokens.json` |
| Brand fonts | DM Serif Display + Inter + Caveat | Text overlays | ✅ Loaded |
| Icon set | SVG | Stories, highlights | ❌ Need a small set (tooth, calendar, WhatsApp, "20 años" badge, אומץ mark) |

### 3. WhatsApp Business catalog (linked from FB)

| Item | Status |
|---|---|
| WhatsApp Business account connected to `+595981146759` | ⚠️ In pre-launch per `site.json` (whatsapp_business_note) |
| Quick replies configured | ❌ Need: greeting, hours, address, appointment request |
| Catalog of services | ❌ Need at least: Segunda opinión (Gs 300.000), Consulta inicial (Gs 200.000), Plan de tratamiento |

### 4. Messenger auto-reply

When someone DMs the FB Page (now that we have `pages_messaging` scope):

| Trigger | Reply |
|---|---|
| First contact | "Hola 👋 Soy la asistente virtual de Ometz Dental. ¿Querés agendar una consulta o tenés una pregunta? Respondé con: 1) Consulta, 2) Segunda opinión, 3) Hablar con Dra. Gaby" |
| Outside business hours | "Ahora estamos fuera de horario. Te respondemos mañana a las 9am. Para urgencias dentales en Asunción: Hospital de Clínicas (teléfono) o Cruz Roja Paraguay (teléfono)." |

**To set up:** in Page Inbox → Automations → "Instant reply" + "Away message". Composio can probably help, but Page Inbox UI is fastest.

### 5. Testimonial collection process

After launch, you need a steady stream of testimonials. Process:

| When | Ask | Format |
|---|---|---|
| End of first appointment | "¿Puedo compartir tu caso (sin nombre) en mis redes como ejemplo anónimo?" | Verbal consent |
| 1 week post-treatment | Send WhatsApp: "Hola [name], ¿cómo te fue con el tratamiento? Si querés compartir tu experiencia, podés mandarme un audio de 30 seg y lo editamos juntos." | Audio testimonial |
| 1 month post-treatment | Ask: "¿Te importaría escribir 2-3 frases sobre tu experiencia? Las puedo usar en mi página (con tu nombre o anónimo, como prefieras)." | Written testimonial, optionally with photo |
| Every quarter | Email all patients with completed treatments: "¿Podrías dejar una reseña en Google? Toma 2 minutos." | Google review |

**Goal:** 1 testimonial/week in the first 3 months. 12 by end of October.

### 6. Facebook Reviews strategy

Reviews on FB Page are different from Google reviews. Need to enable + seed.

| Task | How | When |
|---|---|---|
| Enable Reviews tab | Page Settings → Templates and Tabs → Add Tab → Reviews | Now |
| Disable Reviews if you want to control the moment | Same area — toggle off | Optional |
| First 5 reviews | Ask 5 friends/family who are NOT patients to leave 5-star reviews (organic, FB allows this without being a "real patient") — gives the Page a non-zero baseline | Week 1 |
| Real patient reviews | Same as testimonial collection above, but pushed to FB Reviews (instead of just WhatsApp) | Week 4+ |

### 7. Pixel + tracking setup

The Meta Pixel + Conversions API for ad tracking (needed BEFORE running any ads):

| Component | Status | Action |
|---|---|---|
| Meta Pixel ID | ❌ Not set | Create in Meta Events Manager (in Paso 5 of client handbook) |
| Conversions API token | ❌ Not set | Same |
| Pixel installed on ometzdental.com | ❌ Not installed | Inject base code in `app/layout.tsx` |
| CAPI server-side events | ❌ Not implemented | Optional (only for serious ad scaling) |
| Standard events configured | ❌ | Need: `Lead`, `Contact`, `Schedule` |

**Note:** site already has placeholder code in `app/layout.tsx` that fires `PageView` if `NEXT_PUBLIC_META_PIXEL` env var is set. So once we have a Pixel ID, just set the env var.

### 8. Ad account prep (do NOT run ads yet)

| Task | Status | When |
|---|---|---|
| Connect Meta Ad Account to FB Page | ❌ | After Meta Business Verification (paso 4) |
| Set billing | ❌ | Same |
| Create seed audiences | ❌ | Pre-launch (so they're warm when ads start) |
| Create 3 ad creatives | ❌ | Pre-launch |
| Set budget cap | ❌ | Pre-launch ($5/day max to start) |

**Seed audiences to build now (no ad spend):**
1. Website visitors (pixel + cookie-based — needs pixel installed)
2. Email list (we don't have one yet, will after launch)
3. Lookalike of IG followers (when IG is connected)
4. Interest-based: "dentistry", "Asunción", "Mburucuyá", "second opinion dental"

---

## Part 4 — First 30 days post-launch

### Goals

| Metric | Day 7 | Day 30 |
|---|---|---|
| Page followers | 30 | 150 |
| Avg post reach | 100 | 500 |
| Total WhatsApp clicks from FB | 5 | 30 |
| Comments received | 5 | 25 |
| DMs received | 2 | 10 |
| Reviews (FB) | 1 | 5 |
| Patient bookings attributed to FB | 1 | 8 |

### Daily routine (Mon-Fri, 15 min)

| Time | Action | Tool |
|---|---|---|
| 09:00 | Reply to overnight comments + DMs | FB Page Inbox |
| 12:30 | Quick check-in: any new reviews? pin a top comment? | Page Inbox |
| 18:00 | Reply to EOD comments + DMs | FB Page Inbox |
| Any | Save best-performing post to a "winning posts" doc for later reference | Notes |

### Weekly review (Sunday, 30 min)

| Question | Source |
|---|---|
| Which post got the most reach? | FB Page Insights |
| Which post got the most engagement? | Same |
| Did we hit our 5 posts/week target? | Calendar |
| What topics got the most comments? | Export comments |
| Are we on track for the 30-day goals? | Spreadsheet |

### Monthly content themes

| Month | Theme | Examples |
|---|---|---|
| Aug | "Conocé a Ometz" — faces, place, process | Meet Gaby video, office tour, "what to expect on first visit" |
| Sep | "Servicios sin miedo" — anti-anxiety focus | Sedation explainer, "I'm scared of the dentist" testimonial |
| Oct | "Casos resueltos" — before/after (with consent) | Case study with photos, "how we planned this case" |
| Nov | "Prevención" — education | "5 things to check before choosing a dentist", flossing myths |
| Dec | "Fin de año" — gifts, year-end | "Use your insurance before Dec 31", "gift a second opinion for someone who needs it" |

---

## Part 5 — First 60 days post-launch

### Expand channels

| Channel | Status | Goal by Day 60 |
|---|---|---|
| Instagram (@dragabriellagp) | ❌ Not connected to Composio yet | Connected, 5 posts, 50 followers |
| Facebook Reviews | ❌ Not enabled | Enabled, 5+ reviews |
| WhatsApp Business catalog | ❌ Not set up | 3 services listed with prices |
| Google Business Profile | ❌ Not claimed | Claimed, 10 photos, hours, description |

### Build email list (the most valuable asset)

| Trigger | Action |
|---|---|
| First appointment booked | Add to list "Pacientes Ometz" |
| End of treatment | Send "How was your experience?" + ask for testimonial |
| Quarterly | Send newsletter: 1 educational topic + 1 special offer |

**Tools to consider (cheapest first):**
- Resend.com (free up to 100 contacts) — already in MCP catalog
- Mailchimp (free up to 500 contacts)
- Buttondown (paid, indie-friendly)

### First paid ad (Day 60, ONLY if organic is hitting goals)

| Detail | Spec |
|---|---|
| Budget | $5/day ($150/month) |
| Audience | Asunción 25-65 + interest in "dentistry", "dental implants", "second opinion" |
| Creative | Best-performing organic post (boost it) |
| Goal | WhatsApp clicks |
| Optimization | Run for 7 days, check CPL (cost per lead), pause if > $5/lead |

---

## Part 6 — First 90 days post-launch

### Scale what works

| If... | Then... |
|---|---|
| Posts at 1pm get 2x reach than 10am | Reschedule all future posts to 1pm |
| Carousel posts outperform single-image | Move to 70% carousel / 30% photo+text |
| DMs convert to WhatsApp (then to appointments) | Set up auto-reply that pushes to WhatsApp |
| Testimonials with photos convert 5x better than text-only | Make testimonial-with-photo the default ask |

### Goal: 150 followers, 50 patient bookings from FB, 30 reviews

### Quarterly review

| Question | When |
|---|---|
| Are we hitting our goals? | End of month 3 |
| Is the ROI positive? | Calculate: (revenue from FB-sourced patients) - (time + ad spend) |
| Should we hire a part-time social media manager? | If daily FB management is taking >1 hr/day |

---

## Part 7 — Risks to watch

| Risk | Mitigation |
|---|---|
| Gaby burns out on content creation | Batch-create 1 month at a time. Use `social-draft.sh es` to auto-generate drafts, she approves |
| Negative review appears on FB | Respond publicly within 24h, take it to DMs to resolve. Never delete (FB may penalize) |
| Competitor opens next door | Monitor via FB search for "dentista asunción" weekly. Differentiate on "planificación + segunda opinión escrita" (unique) |
| Personal data leak in DMs (patient sends photo of X-ray with name) | Set up auto-reply: "Por favor no envíes datos personales aquí. Te paso a WhatsApp donde ciframos los mensajes." |
| Algorithm change reduces organic reach | Diversify: email list, Google Business Profile, IG, even TikTok. Never depend on one channel |
| Patient shares a photo without consent (good outcome, but legal issue) | Always get written consent BEFORE publishing any patient photo. Use a simple form: "Autorizo a Ometz Dental a usar mi imagen en redes sociales" |
| Account hacked | Enable 2FA on `weissvanderpol@gmail.com` NOW (Pipeboard shows 2FA not enabled — that's the email that manages the Page) |
| Imposter account created | Set up Meta Brand Rights (https://www.facebook.com/help/contact/260749603972188) — protects the name "Ometz Dental" |

---

## Part 8 — Decisions for Gaby (need answers)

| Question | Default if no answer |
|---|---|
| Will Gaby personally respond to DMs, or do we use an assistant? | Assistant first 60 days, Gaby for medical questions |
| Will the FB page use her personal name or stay as brand? | Stay as brand "Ometz Dental" |
| Are there taboo topics she does NOT want posted? (e.g., specific procedures she doesn't do, political views) | Ask before launch |
| Is there a partner dentist she wants to refer overflow cases to? | None — refer to Hospital de Clínicas for emergencies |
| Does she want to be in Reels / short-form video? | Yes, but filmed sparingly (1/month max) |
| Does she accept payments in USD or only PYG? | PYG only (per website) |

---

## Part 9 — Items I'm tracking for you

| Item | Owner | Deadline | Status |
|---|---|---|---|
| 10 more scheduled posts (Jul 21-30) | Erebus | Jul 20 | Pending — say "draft 10 more posts" |
| WhatsApp Business quick replies | Ivan (manual in WA app) | Jul 22 | Pending |
| Facebook Reviews enabled | Ivan (Page Settings) | Jul 21 | Pending |
| Meta Pixel + Conversions API installed | Erebus (after Meta App is created in paso 5) | Jul 25 | Pending |
| Google Business Profile claimed + populated | Ivan (manual in Google) | Jul 23 | Pending |
| 2FA on Facebook account | Ivan (Settings → Security) | NOW | ⚠️ URGENT — Pipeboard shows not enabled |
| Personal IG connection replaced with `@dragabriellagp` | Ivan (disconnect + reconnect) | Jul 21 | Pending — say "resend IG" |
| Per-service FAQ carousel design | Designer | Jul 25 | Pending |
| "Meet Gaby" intro video | Gaby | Jul 24 | Pending |
| Opening banner design | Designer | Jul 24 | Pending |
| First 5 FB reviews (friends/family) | Ivan + Gaby | Week 1 post-launch | Pending |
| Meta Business Verification submitted | Ivan (via paso 4 of handbook) | NOW | Pending |
| Brand assets audit (icons, testimonial templates) | Designer | Jul 26 | Pending |

---

## Version

- **v1.0** · 2026-07-14 · Created by Erebus from FB page audit
- **Next review:** after launch (Jul 27)
- **Maintenance:** add new items here as they're discovered. Cross-reference `ometz-self-manage` skill for site-related items.

---

*This doc lives in `docs/clients/ometz/facebook-launch-plan.md` and is the canonical reference for everything FB-related for Ometz Dental.*
