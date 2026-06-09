# Fun4Me — Upgrade Plan: Store → Full Kink Community Platform

> **Date:** 2026-05-03
> **Repo:** github.com/Ai-Whisperers/paragu-ai-platform/tree/main/apps/fun4me
> **Domain:** fun4me.paragu-ai.com
> **Stack:** Next.js 16 + Supabase + Docker Swarm + Traefik

---

## Part 1: Current State (Codebase Audit)

### What EXISTS today

**Storefront (working):**
- 27 routes: home, categories, products, cart, checkout, search, blog, events, kink pages, pages (about, contact, FAQ, privacy, terms, shipping, returns)
- 54 products across 6 categories (vibradores, lenceria, lubricantes, anales, BDSM, sets)
- Guest and authenticated checkout
- Age verification gate
- WhatsApp CTAs, coupon input, trust badges, newsletter signup
- Blog with 6 posts, categories
- Wishlist, recently-viewed, product comparer, product quiz
- Dark mode, privacy mode toggle, quick-exit button

**Database (already has:**
| Table | Purpose |
|-------|---------|
| categories | Product categories (6 active) |
| products | 54 products with stock, pricing in PYG |
| kink_categories | Kink taxonomy (beginner/intermediate/advanced) |
| product_kinks | Junction: products ↔ kinks |
| customers | User profiles linked to auth.users |
| orders + order_items | Order management with status flow |
| shipping_zones | Delivery zones (Asunción, Gran Asunción, Interior) |
| payment_transactions | Payment tracking |
| bank_transfer_receipts | Payment proof uploads |
| coupons | Discount codes |
| site_settings | Config |
| customer_addresses | Saved addresses |
| ci_documents | ID verification for age compliance |
| blacklist + blacklist_attempts | Security system |
| **events** | Event listings with dates, venues, capacity |
| **ticket_types** | Per-event ticket tiers (name, price, qty) |
| **tickets** | Individual tickets with QR codes, check-in |
| newsletter_subscribers | Email subscribers |

**Already built for events/ticketing:**
- `events` table with full schema (dates, venue, capacity, CI requirement)
- `ticket_types` table (multiple tiers per event, pricing, quantities)
- `tickets` table (QR codes, check-in, status tracking, transfer)
- `POST /api/checkout` already handles order creation for products
- Event listing page at `/eventos` (reads from Supabase)
- Event detail page at `/eventos/[slug]` (display + buy tickets)
- Ticket confirmation page `/eventos/[slug]/confirmacion`
- Admin CRUD for events in the admin panel
- `validate_ticket_qr()` SQL function for QR check-in
- `upcoming_events` and `ci_verification_queue` SQL views

**Admin panel (fully built):**
- Dashboard, products CRUD, categories CRUD, orders CRUD
- Coupons, kinks, events, announcements, blacklist
- Verification queue for CI documents

**Missing for a full community platform:**
- ❌ User profiles (kinks, interests, photos, about me)
- ❌ Memberships/subscriptions (monthly tiers)
- ❌ Community forums / discussion groups
- ❌ Private messaging between members
- ❌ Event calendar with recurring events
- ❌ Online courses / educational content
- ❌ Venue/dungeon management
- ❌ RSVP system beyond ticket sales
- ❌ Membership cards/digital badges
- ❌ Ratings/reviews for members
- ❌ Notification system (in-app + WhatsApp)
- ❌ Payment gateway integration (Bancard/MercadoPago)
- ❌ Community guidelines + moderation tools

---

## Part 2: Global Market Research

### Top Kink Platforms & Their Revenue Models

| Platform | Type | Users/Revenue | Revenue Streams |
|----------|------|--------------|-----------------|
| **FetLife** | Social network | 12.6M users, freemium | Premium membership ($5/mo), no ads, no paid promotion |
| **Lovehoney** | Ecommerce | £87M revenue (2021) | Product sales, own brand (400+ products), wholesale |
| **Kink.com** | Content studio | ~$20-30M est. | Subscriptions ($39/mo), per-scene purchases, Kink AI |
| **Stockroom (Mr S Leather)** | Ecommerce | ~$10-15M est. | Product sales, BDSM gear, in-store experiences |
| **Recon** | Dating app | ~500K users | Premium subscriptions, location-based |
| **KinkD** | Dating app | ~1M downloads | Freemium, virtual gifts, premium |
| **Subspace (VR)** | VR platform | Early stage | Subscription, VR content sales |
| **Kink University** | Education | Niche | Course sales, video library subscription |
| **Wasteland Weekends** | Events | Regional | Ticket sales, vendor fees, sponsorships |
| **Dark Odyssey** | Events | National US | Ticket sales ($200-500/event), camping, workshops |

### Global Revenue Models for Kink Communities

**1. Ecommerce (proven, immediate)**
- Product sales: 30-50% margin on sex toys, lingerie, gear
- Own-brand products: 60-70% margin (Lovehoney has 400+ own-brand)
- Subscription boxes: $30-80/mo recurring (e.g., KinkBox, monthly themed crate)

**2. Memberships/Subscriptions (high margin)**
- FetLife: $5/mo premium ($60/yr per paying user)
- Tiers: Free (basic), Premium ($5), VIP ($15), Patron ($30/mo)
- Features: private messaging, advanced search, photo galleries, event discounts

**3. Events & Ticketing (community anchor)**
- Workshop tickets: $10-30/person
- Parties/play parties: $20-50/person (with CI/age verification)
- Weekend retreats: $100-500 (includes lodging + workshops)
- TICKETING IS THE KILLER FEATURE for building community in PY

**4. Education (growing rapidly)**
- Online courses: $20-100/course (rope bondage, impact play, safety)
- Certification programs: $200-500 (safety, consent, dungeon monitor training)
- Kink University model: video library at $15/mo

**5. Content (requires production)**
- Tutorial videos, podcasts, written guides
- Only if community reaches critical mass

### LATAM Market: Paraguay Specific

**Key facts:**
- FetLife has Spanish language support — search for Paraguay groups likely exists
- No known dedicated kink store in Paraguay beyond Fun4Me
- Asuncion has underground kink scene — runs through WhatsApp/Telegram
- Payment challenge: MercadoPago may restrict adult products. Bancard (PY) is primary
- Paraguay GDP/capita ~$6,000 — pricing must be accessible
- WhatsApp is the dominant communication channel (not email, not in-app chat)

**LATAM Kink Landscape:**
- Fetish Week Argentina (Buenos Aires) — annual event, draws regional crowd
- No dedicated LATAM kink ecommerce platform identified
- Brazil has larger scene (São Paulo, Rio) but Portuguese-speaking
- Spanish-language kink content is underserved globally
- Cross-border event potential: Asuncion as hub for PY + AR + BR border region

---

## Part 3: Payment Processor Strategy

### The Critical Challenge

Adult/kink products face payment restrictions globally. In Paraguay specifically:

| Processor | Adult OK? | PY Availability | Notes |
|-----------|-----------|-----------------|-------|
| **Bancard (Visa/MC)** | Yes (with merchant code) | Yes | Dominant in PY. Need correct MCC (5969 — adult retail). Apply early (weeks). |
| **MercadoPago** | Restricted | Yes | Explicitly blocks adult products. Used for non-adult items only. |
| **Stripe** | Restricted | Available via LATAM | Has a "restricted business" list including adult — may work with prior approval |
| **PayPal** | No | Limited in PY | Flat no for adult |
| **Cryptocurrency** | Yes | Yes | Low adoption in PY but works for events/ticketing |
| **Bank Transfer** | Yes | Yes | Already implemented. Low friction, manual verification. |
| **Cash on Delivery** | Yes | Yes | Already in schema. Standard in PY. |

**Strategy:**
1. **Phase 0**: Bank transfer + COD (already done) — launch with these
2. **Phase 1**: Apply for Bancard merchant account (MCC 5969) — takes 2-6 weeks
3. **Phase 2**: Offer MercadoPago for NON-adult items (gift cards, event tickets, courses)
4. **Phase 3**: Crypto option (USDT on TRC-20) for privacy-conscious members
5. **Always offer**: Bank transfer + COD as fallbacks

**For memberships/subscriptions specifically:**
- Use Bancard recurring billing (subscription API available)
- Or: prepaid codes (3mo, 6mo, 12mo) sold as products in the store
- Crypto recurring via stablecoins

---

## Part 4: The Upgrade Plan — 6 Phases

### Phase 0: Deploy Current State (Week 1)

**What:** Get the current store live with all existing features

1. Docker build + push to Swarm
2. Verify SSL + Traefik routing
3. Test checkout flow end-to-end
4. Commit all pending changes and push

**Exit:** fun4me.paragu-ai.com is live with products, cart, checkout, blog, events

---

### Phase 1: Community Foundation (Weeks 2-4)

**Core: User Profiles + Memberships**

**1. Enhanced User Profiles** (5 days)
- Profile pages: bio, kinks (from kink_categories table), experience level
- Photo galleries (private/public settings)
- Social links (FetLife, Instagram)
- "Kink resume" — years active, roles, certifications
- Privacy settings (who can see what)

**2. Membership Tiers** (3 days)
- New table: `membership_plans` (name, price PYG, features JSONB)
- New table: `customer_memberships` (customer_id, plan_id, start/end, auto_renew)
- What each tier gets:
  - Free: browse store, buy products, view events
  - Explorer ($25k PYG/mo ≈ $3.50 USD): create profile, event discounts, private messaging
  - Kinkster ($50k PYG/mo ≈ $7 USD): all above + access to members-only events, course discounts
  - Patron ($100k PYG/mo ≈ $14 USD): everything + digital badge, priority support, free shipping

**3. Member Directory** (2 days)
- Browse/search members by kink, location, role (within privacy settings)
- Profile cards with kink tags
- Respect privacy — only visible to logged-in + verified + paid members

**Database additions:**
```sql
CREATE TABLE membership_plans (
  id UUID PK,
  name TEXT, slug TEXT UNIQUE,
  price BIGINT, -- in PYG
  duration_days INTEGER,
  features JSONB,
  is_active BOOLEAN
);

CREATE TABLE customer_memberships (
  id UUID PK,
  customer_id UUID REFERENCES customers(id),
  plan_id UUID REFERENCES membership_plans(id),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT true,
  status TEXT CHECK (status IN ('active', 'expired', 'cancelled')),
  payment_method TEXT
);

ALTER TABLE customers ADD COLUMN bio TEXT;
ALTER TABLE customers ADD COLUMN experience_level TEXT;
ALTER TABLE customers ADD COLUMN kink_roles TEXT[]; -- dom/sub/switch/rope_bunny/etc
ALTER TABLE customers ADD COLUMN profile_visibility TEXT DEFAULT 'members';
ALTER TABLE customers ADD COLUMN display_name TEXT;
```

---

### Phase 2: Events & Ticketing Upgrade (Weeks 5-7)

**Already have:** events, ticket_types, tickets tables + basic pages

**What to add:**

**1. Full Event Calendar** (3 days)
- Month view + list view toggle
- Filter by: type (party, workshop, munch, play party), venue, date range
- Recurring events support (weekly munches, monthly parties)
- Google Calendar export
- "Interested" button (non-binding RSVP to gauge interest)

**2. Ticketing Upgrade** (3 days)
- QR code generation for purchased tickets (using QR libraries)
- Check-in app (admin scans QR at door via phone camera)
- Waitlist when tickets sell out
- Refund/cancellation policy and self-service
- Transfer ticket to another member

**3. Venue Management** (2 days)
- New table: `venues` (name, address, capacity, amenities, rules)
- Venue gallery, accessibility info
- Venue availability calendar for organizers
- Dungeon/play space listings with equipment inventory

**4. Event Check-in App** (2 days)
- Mobile-responsive admin page at `/admin/checkin`
- QR scanner (camera API) + manual CI number entry
- Marks ticket as used, prevents re-entry
- Emergency contact list visible to check-in staff

**Database additions:**
```sql
CREATE TABLE venues (
  id UUID PK,
  name TEXT, slug TEXT UNIQUE,
  address TEXT, city TEXT DEFAULT 'Asunción',
  capacity INTEGER,
  amenities TEXT[], -- parking, changing rooms, showers, play equipment
  rules TEXT,
  image_url TEXT,
  is_active BOOLEAN
);

CREATE TABLE event_categories (
  id UUID PK, name TEXT, slug TEXT UNIQUE,
  description TEXT, color TEXT -- for calendar display
);

ALTER TABLE events ADD COLUMN venue_id UUID REFERENCES venues(id);
ALTER TABLE events ADD COLUMN category_id UUID REFERENCES event_categories(id);
ALTER TABLE events ADD COLUMN is_recurring BOOLEAN;
ALTER TABLE events ADD COLUMN recurring_pattern TEXT; -- 'weekly', 'monthly', 'first_friday'
ALTER TABLE events ADD COLUMN minimum_age INTEGER DEFAULT 18;
ALTER TABLE events ADD COLUMN dress_code TEXT;
ALTER TABLE events ADD COLUMN requires_id BOOLEAN;
ALTER TABLE events ADD COLUMN organizer_id UUID REFERENCES customers(id);
ALTER TABLE events ADD COLUMN interested_count INTEGER DEFAULT 0;
```

---

### Phase 3: Community Features (Weeks 8-11)

**1. Discussion Forums/Groups** (5 days)
- Group creation with topics, rules, and membership
- Threaded discussions with categories
- Pin important posts (safety rules, code of conduct)
- Moderation tools: flag, hide, warn, ban
- Only visible to logged-in members; some groups restricted to verified

**2. Private Messaging** (3 days)
- DM between members (in-app only, no email)
- Read receipts, block user, report
- Group messaging for event organizers
- **DO NOT BUILD:** real-time chat server. Use Supabase Realtime (built-in) or simple polling

**3. Community Guidelines & Trust System** (2 days)
- Code of conduct (consent, confidentiality, no photography without permission)
- Member reporting and review system
- Verified member badge (CI verified)
- Event attendance tracking (builds "x events attended" reputation)
- Organizer rating after events

**4. Event Host Tools** (3 days)
- Member dashboard for event organizers
- Guest list management, check-in kiosk mode
- Attendee demographics (anonymous — count by role, age range)
- Post-event feedback collection

**Database additions:**
```sql
CREATE TABLE groups (
  id UUID PK, name TEXT, slug TEXT UNIQUE,
  description TEXT, rules TEXT,
  category TEXT, -- support, education, social, play
  is_private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES customers(id),
  member_count INTEGER DEFAULT 0,
  image_url TEXT
);

CREATE TABLE group_members (
  group_id UUID REFERENCES groups(id),
  customer_id UUID REFERENCES customers(id),
  role TEXT DEFAULT 'member', -- member, moderator, admin
  joined_at TIMESTAMPTZ,
  PRIMARY KEY (group_id, customer_id)
);

CREATE TABLE group_posts (
  id UUID PK, group_id UUID REFERENCES groups(id),
  author_id UUID REFERENCES customers(id),
  title TEXT, content TEXT,
  is_pinned BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
);

CREATE TABLE messages (
  id UUID PK,
  sender_id UUID REFERENCES customers(id),
  recipient_id UUID REFERENCES customers(id),
  content TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ
);

CREATE TABLE member_reviews (
  id UUID PK,
  reviewer_id UUID REFERENCES customers(id),
  reviewed_id UUID REFERENCES customers(id),
  event_id UUID REFERENCES events(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ,
  UNIQUE(reviewer_id, reviewed_id, event_id)
);
```

---

### Phase 4: Education & Content (Weeks 12-14)

**1. Kink Education Platform** (5 days)
- Structured courses with modules and videos
- Categories: Rope Bondage 101, Impact Play Safety, BDSM Negotiation, Aftercare
- Progress tracking (which modules completed)
- Downloadable guides (PDF) for premium members
- Quiz/assessment for certification

**2. Content Library** (3 days)
- Articles, guides, tutorials
- Tags by kink, experience level, role (Dom, sub, switch)
- Series: "Kink of the Week" — explore a different fetish weekly
- Resource directory: kink-friendly therapists, lawyers, doctors in PY

**3. Expert/Educator Profiles** (2 days)
- Verified educator badges
- Course creation tools (upload video, write text, set price)
- Booking system for 1-on-1 coaching sessions

**Database additions:**
```sql
CREATE TABLE courses (
  id UUID PK, title TEXT, slug TEXT UNIQUE,
  description TEXT, level TEXT,
  instructor_id UUID REFERENCES customers(id),
  price BIGINT, -- 0 for free, PYG for paid
  image_url TEXT,
  is_published BOOLEAN
);

CREATE TABLE course_modules (
  id UUID PK, course_id UUID REFERENCES courses(id),
  title TEXT, content TEXT,
  video_url TEXT, sort_order INTEGER,
  duration_minutes INTEGER
);

CREATE TABLE course_enrollments (
  customer_id UUID REFERENCES customers(id),
  course_id UUID REFERENCES courses(id),
  progress FLOAT DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  enrolled_at TIMESTAMPTZ,
  PRIMARY KEY (customer_id, course_id)
);
```

---

### Phase 5: Monetization Expansion (Weeks 15-17)

**1. Subscription Box** (3 days)
- Monthly kink crate: curated products + educational materials
- 3 tiers: Starter ($80k), Explorer ($150k), Deluxe ($300k) PYG
- Integration with existing product catalog
- Skip month, cancel anytime
- **Validate first:** pre-sell 20 boxes before building

**2. Affiliate/Ambassador Program** (2 days)
- Commission on referred sales (10-15%)
- Discount code for ambassadors
- Content creator program (blog/video contributors get store credit)
- **Validate:** only if there's organic referral already

**3. Event Host Partnership** (2 days)
- Platform fee on event ticket sales (5-10% for hosts)
- Premium listing / promoted events
- Venue booking commission (if Fun4Me owns/rents a space)

**4. Ecommerce Expansion** (3 days)
- Add more product categories (gear, rope, restraints, impact toys)
- Own-brand products (higher margin)
- Wholesale to other LATAM stores
- Delivery to whole Paraguay (not just Asuncion)

**Database additions:**
```sql
CREATE TABLE subscription_boxes (
  id UUID PK, name TEXT, slug TEXT UNIQUE,
  description TEXT, price BIGINT,
  image_url TEXT, is_active BOOLEAN,
  products JSONB -- list of product IDs included
);

CREATE TABLE customer_subscriptions (
  id UUID PK, customer_id UUID REFERENCES customers(id),
  box_id UUID REFERENCES subscription_boxes(id),
  status TEXT, -- active, paused, cancelled
  next_billing_date TIMESTAMPTZ,
  shipping_address_id UUID REFERENCES customer_addresses(id),
  created_at TIMESTAMPTZ
);

CREATE TABLE affiliate_links (
  id UUID PK, customer_id UUID REFERENCES customers(id),
  code TEXT UNIQUE, commission_rate FLOAT,
  clicks INTEGER DEFAULT 0, conversions INTEGER DEFAULT 0,
  revenue_generated BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ
);
```

---

### Phase 6: Scale & Polish (Weeks 18-20)

**1. Mobile App** (PWA first, then native)
- PWA: already have Next.js + service worker (sw.js exists)
- Push notifications for event reminders, messages, order updates

**2. Advanced Moderation**
- Auto-moderation rules (keyword filters, spam detection)
- Appeal system for bans
- Community-elected moderation council

**3. Analytics Dashboard**
- Revenue breakdown by stream (store, events, memberships, courses)
- User growth, retention, churn
- Event attendance rates
- Marketing attribution

**4. Internationalization**
- Spanish (done) + English + Portuguese (for Brazil border)
- Pricing in PYG + USD + BRL toggle

---

## Part 5: Revenue Projections

### Year 1 Conservative Estimate

| Stream | Monthly Revenue (PYG) | Monthly Revenue (USD) |
|--------|----------------------|----------------------|
| Ecommerce (54 products, 30 orders/mo) | 15,000,000 | ~$2,100 |
| Membership (100 paid members @ avg 40k) | 4,000,000 | ~$570 |
| Events/Ticketing (2 events/mo, 30 tickets @ 50k avg) | 3,000,000 | ~$430 |
| Courses/Education | 1,000,000 | ~$140 |
| **Total** | **23,000,000** | **~$3,240/mo** |

**Year 1 total: ~$39,000 USD** (conservative, assuming small starting community)

### Year 2 Target

| Stream | Monthly Revenue | Notes |
|--------|-----------------|-------|
| Ecommerce (growing catalog) | $4,000 | More products, own brand |
| Memberships | $2,000 | 400 members |
| Events | $2,000 | 2 big events/mo + weekly munches |
| Education | $1,000 | Course sales + coach bookings |
| Subscription boxes | $500 | 30 boxes/mo |
| **Total** | **~$9,500/mo** | **~$114,000/yr** |

---

## Part 6: Costs & Funding

### Monthly Operating Costs

| Item | Cost (USD/mo) |
|------|---------------|
| VPS (existing Swarm, shared) | ~$20 |
| Supabase (Free tier or $25 Pro) | $0-25 |
| Domains | ~$1 |
| WhatsApp (free for now) | $0 |
| Payment gateway fees (3-5%) | $100-200 (scales with revenue) |
| Warehouse/shipping supplies | varies |
| **Total** | **~$50-250/mo** |

### One-Time Development Costs (if outsourced)

Everything here assumes **I (the AI agent)** build it. If hiring a PY dev:

| Phase | Estimated Hours | PY Rate ($15-25/h) |
|-------|----------------|--------------------|
| Phase 0-1 (Foundation) | 80h | $1,200-2,000 |
| Phase 2 (Events) | 60h | $900-1,500 |
| Phase 3 (Community) | 100h | $1,500-2,500 |
| Phase 4 (Education) | 60h | $900-1,500 |
| Phase 5 (Monetization) | 40h | $600-1,000 |
| Phase 6 (Polish) | 40h | $600-1,000 |
| **Total** | **380h** | **$5,700-9,500** |

### Funding Strategy (no outside investment needed)

**Bootstrapped approach (recommended):**
1. Launch Phase 0 NOW — ecommerce makes money from day 1
2. Reinvest 50% of store profits into Phase 1-2
3. Memberships fund Phase 3-4
4. Events fund Phase 5-6

**Alternative: Pre-sell memberships** — sell 50 discounted lifetime memberships at $50 each = $2,500 to fund initial development

**Alternative: Event pre-sale** — sell tickets to the first 3 events before building the ticketing system = validates demand + raises cash

---

## Part 7: What NOT to Build (Anti-Roadmap)

| Feature | Why NOT | Alternative |
|---------|---------|-------------|
| Mobile native app | $50K+ to build, low priority | PWA works fine |
| Real-time chat (WebSocket) | Complex, expensive to maintain | Supabase Realtime or simple DB polling |
| Video streaming platform | Content creation is a separate business | YouTube unlisted videos + embeds |
| Dating app features | Different product, different regulations | Let FetLife be FetLife |
| AI chatbot | Gimmick at this stage | WhatsApp human support |
| CRM | Overengineered | Supabase queries + admin panel |
| Complex loyalty tiers | Need 500+ customers first | Simple "points = store credit" |

---

## Part 8: Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Payment processor blocks adult | High | Critical | Multiple fallbacks (bank transfer, COD, crypto) |
| VPS can't handle growth | Medium | Medium | Docker Swarm already scales horizontally |
| Low community engagement in PY | Medium | High | Start with events (IRL) to build trust |
| Competitor emerges in LATAM | Low | Medium | First-mover advantage, local community |
| Legal issues (Paraguay obscenity laws) | Low | High | Age verification + CI checks + consent-first branding |
| Content moderation failures | Medium | High | Clear guidelines + reporting system from day 1 |
| "Kink community" attracts bad actors | Medium | High | CI verification for events, blacklist, reporting |

---

## Part 9: Immediate Next Steps

### This Week — Phase 0

- [x] Fix domain URLs (sunstein.cloud → paragu-ai.com) — DONE
- [ ] Deploy current site to fun4me.paragu-ai.com
- [ ] Test full checkout flow (create product, add to cart, checkout)
- [ ] Create 3 sample events with ticket types
- [ ] Verify Supabase migrations applied

### Week 2 — Phase 1 Start

- [ ] Build membership_plans table + admin CRUD
- [ ] Build membership checkout flow (buy a plan)
- [ ] Enhance user profile page (bio, kinks, photo)
- [ ] Build member directory with privacy controls
- [ ] Apply for Bancard merchant account (MCC 5969)

### Week 3 — Phase 1 Complete

- [ ] Membership discount on products
- [ ] Membership badge in store/events
- [ ] Auto-expire/renew memberships (cron job)
- [ ] Payment flow for memberships (bank transfer first)

### Week 4 — Phase 2 Start

- [ ] Build venues table + admin management
- [ ] Event calendar with month/list views
- [ ] QR code generation on ticket purchase
- [ ] Check-in app (mobile-first)

---

## Part 10: Technical Architecture Notes

### Current Stack (already working)

```
User → Cloudflare (DNS/SSL) → VPS → Traefik → fun4me_web:3000
```

- Next.js 16.2.2 (App Router)
- Supabase (PostgreSQL + Auth + Storage)
- Tailwind CSS v4 + shadcn/ui
- Zustand (cart state)
- Docker Swarm (2 replicas, 512MB limit each)

### Upgrade Architecture

```
Same infra — NO additional services needed until 10,000+ users.
All community features use existing Supabase tables.
```

**For real-time messaging:** Supabase Realtime (built-in, free up to 2M messages/mo)
**For QR scanning:** Camera API (browser-native, no extra service)
**For recurring events:** Cron job in Next.js itself (API route + Vercel Cron or Docker cron)
**For file uploads:** Supabase Storage (already set up with `product-images`, `receipts`, `ci-documents` buckets)

No Redis, no WebSocket server, no additional infrastructure. Everything fits in the existing Docker Swarm.

---

## Summary

**Fun4Me already has ~70% of the infrastructure for a full kink community platform.** The ecommerce, auth, admin panel, events, and ticketing tables are built. What's missing is the social layer (profiles, messaging, forums) and monetization (memberships, education, subscription boxes).

**The fastest path to revenue:**
1. Deploy what exists NOW (takes hours, not days)
2. Sell products → revenue today
3. Build memberships → recurring revenue next month
4. Events + ticketing → higher-value transactions
5. Education → highest-margin product

**No outside funding needed.** Phase 0 ecommerce revenue funds Phase 1-2. Community revenue funds everything after.

**Total development time: ~20 weeks** (full-time agent), or **~380 hours** (outsourced).
