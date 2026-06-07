# Fun4Me — Complete Build Plan v1.0

## Domain: fun4me.paragu-ai.com (LIVE ✅)
## Stack: Next.js 16 + Supabase + Docker Swarm + Traefik

---

## OVERVIEW

| Phase | Title | Est. Hours | Status |
|-------|-------|-----------|--------|
| 0 | Fix Existing Bugs + Admin Auth | 8h | ❌ |
| 1 | User Account System | 12h | ❌ |
| 2 | CI Identification System | 10h | ❌ |
| 3 | Ticketing System | 16h | ❌ |
| 4 | Blacklist + Entry Verification | 10h | ❌ |
| 5 | Deployment + Testing | 4h | ❌ |
| **Total** | | **60h** | |

---

## PHASE 0: FIX EXISTING BUGS (8h)

### Critical Bugs

| # | Bug | Fix | Hours |
|---|-----|-----|-------|
| 0.1 | Checkout does NOT save orders to Supabase | Create API route `POST /api/orders` that writes to `orders` + `order_items` tables. Replace client-side sessionStorage submission | 3h |
| 0.2 | Admin panel has ZERO auth protection | Add middleware.ts that checks Supabase session on `/admin/*` routes. Redirect to `/login` if not authenticated | 1.5h |
| 0.3 | Login page wired but admin layout doesn't use it | Admin layout needs to show sidebar only when authenticated. Add auth check at layout level | 0.5h |
| 0.4 | Product images not showing in cart | CartItem interface uses `image_url` but products store `images[]`. Fix cart store to read `images[0]` | 0.5h |
| 0.5 | Free shipping threshold inconsistent | Normalize to single constant (300,000 Gs) across all files | 0.25h |
| 0.6 | Cart hydration mismatch | Add `mounted` state guard in cart-drawer and carrito page | 0.5h |
| 0.7 | Nested interactive elements (button inside Link) | Fix ProductCard — move "Add to cart" button outside Link | 0.5h |
| 0.8 | Newsletter signup does nothing | Wire to a Supabase `newsletter_subscribers` table | 0.5h |
| 0.9 | Footer "Ayuda" links are dead | Add actual route pages for Envios, Devoluciones, FAQ, Privacidad (pages exist but content is stub) | 0.5h |

---

## PHASE 1: USER ACCOUNT SYSTEM (12h)

### 1.1 Supabase Schema — User Profiles (1h)

Extend the existing `customers` table (already linked to `auth.users`). New migration `002_user_profiles.sql`:

```sql
-- Add columns to customers table
ALTER TABLE customers ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;
  -- preferences: {newsletter: bool, dark_mode: bool, sms_notifications: bool}
ALTER TABLE customers ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

-- Addresses as separate table (replaces JSONB)
CREATE TABLE IF NOT EXISTS customer_addresses (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  label       TEXT DEFAULT 'Principal',
  full_name   TEXT NOT NULL,
  phone       TEXT,
  street      TEXT NOT NULL,
  city        TEXT NOT NULL,
  neighborhood TEXT,
  is_default  BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 1.2 User Auth Pages (3h)

- **Signup page** — `/registro` — email + password + name + phone + DOB. Auto-create `customers` row on signup via Supabase `on_auth_user_created` trigger
- **Login page** — `/iniciar-sesion` — already exists at `/(auth)/login/page.tsx`. Enhance with redirect support, "forgot password" link
- **Forgot password** — `/recuperar-contrasena`
- **Account page** — `/cuenta` — tabbed layout:
  - **Profile** — edit name, email, phone, DOB, avatar
  - **Addresses** — CRUD multiple addresses with "set as default"
  - **Orders** — order history with status tracking
  - **Preferences** — newsletter, notifications toggle
  - **CI/ID** — upload and manage identification document

### 1.3 User Menu in Header (1h)

- Show login/register when not authenticated
- Show user avatar + dropdown (Mi Cuenta, Mis Pedidos, Cerrar Sesión) when authenticated
- Persist session via Supabase cookies

### 1.4 Checkout with User Data (3h)

- If user is logged in: auto-fill name, email, phone, saved addresses
- Guest checkout: still works, but with prompt: "Creá una cuenta para guardar tus datos"
- After purchase: option to save address to account
- Logged-in users get order confirmation linked to their account
- Guest checkout auto-creates account if they provide email (optional)

### 1.5 Trigger: Auto-create customer profile (1h)

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.customers (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 1.6 Frontend Auth Provider (2h)

- Create `AuthContext` that wraps the app
- Provides: `user`, `profile`, `signIn`, `signUp`, `signOut`, `updateProfile`
- All authenticated pages use this context

### 1.7 Profile API Routes (1h)

- `GET /api/profile` — fetch current user + profile
- `PUT /api/profile` — update profile fields
- `GET /api/addresses` — list addresses
- `POST /api/addresses` — create address
- `PUT /api/addresses/[id]` — update address
- `DELETE /api/addresses/[id]` — delete address

---

## PHASE 2: CI IDENTIFICATION SYSTEM (10h)

### 2.1 Schema — `ci_documents` table (1h)

Migration `003_ci_system.sql`:

```sql
CREATE TABLE ci_documents (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id   UUID REFERENCES customers(id) ON DELETE CASCADE,
  ci_number     TEXT NOT NULL,           -- Cédula de Identidad (e.g. "5.123.456")
  full_name     TEXT NOT NULL,           -- Name as it appears on CI
  image_url     TEXT,                    -- CI photo/scan (stored in Supabase Storage)
  selfie_url    TEXT,                    -- Optional: selfie for verification
  verified      BOOLEAN NOT NULL DEFAULT false,
  verified_by   UUID,                    -- admin who verified
  verified_at   TIMESTAMPTZ,
  expires_at    TIMESTAMPTZ,             -- Verification expires after 1 year
  notes         TEXT,                    -- Admin notes
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ci_documents_customer ON ci_documents(customer_id);
CREATE INDEX idx_ci_documents_ci_number ON ci_documents(ci_number);
CREATE INDEX idx_ci_documents_unverified ON ci_documents(verified) WHERE verified = false;

-- CI Storage bucket (private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ci-documents',
  'ci-documents',
  false,           -- private
  10485760,        -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;
```

### 2.2 CI Upload Flow (3h)

**In user profile /cuenta section:**
- Upload CI image (front + back) with crop preview
- Enter CI number manually (text field)
- Enter full name as it appears on CI
- Optional: upload selfie holding CI
- Submit for admin verification
- Status badge: "No verificada" (gray) → "Pendiente" (yellow) → "Verificada" (green) → "Rechazada" (red)

### 2.3 CI Verification Admin Panel (3h)

**New admin page: `/admin/verificaciones`**
- List of all CI submissions sorted by date
- Each item shows: CI image thumbnail, CI number, full name, customer info
- Admin actions: Verify (approve), Reject (with reason)
- Search by CI number, customer name, status
- Sort by date, status

### 2.4 CI in Checkout (2h)

**For ticket purchases (REQUIRED):**
- Checkout enforces CI upload + verification before proceeding
- If user has verified CI on file → auto-attach to order
- If not → show upload form inline, must complete before payment
- Block purchase if CI is blacklisted

**For toy purchases (OPTIONAL):**
- Checkout offers CI as optional field
- If provided, attach to order for age verification record
- If not provided, age gate (DOB) is sufficient

### 2.5 CI Blacklist Check (1h)

- Before order submission: check CI number against `blacklist` table
- If blacklisted: show error "No se puede procesar tu pedido. Contactanos para más información."
- Block both toys and tickets if CI is blacklisted

---

## PHASE 3: TICKETING SYSTEM (16h)

### 3.1 Schema — Events + Tickets (3h)

Migration `004_ticketing.sql`:

```sql
-- EVENTS
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed');

CREATE TABLE events (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL UNIQUE,
  description     TEXT,
  short_desc      TEXT,
  date            TIMESTAMPTZ NOT NULL,
  end_date        TIMESTAMPTZ,              -- multi-day events
  venue           TEXT NOT NULL,             -- venue name/address
  venue_address   TEXT,
  city            TEXT NOT NULL DEFAULT 'Asunción',
  image_url       TEXT,
  max_capacity    INTEGER NOT NULL,
  status          event_status NOT NULL DEFAULT 'draft',
  is_featured     BOOLEAN NOT NULL DEFAULT false,
  entry_requires_ci BOOLEAN NOT NULL DEFAULT true,
  organizer_name  TEXT DEFAULT 'Fun4Me Events',
  rules           TEXT,                      -- event rules in Spanish
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_active ON events(status) WHERE status = 'published' AND date > now();

-- TICKET TYPES
CREATE TABLE ticket_types (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,                 -- "General", "VIP", "Early Bird"
  description TEXT,
  price       BIGINT NOT NULL CHECK (price >= 0),
  quantity    INTEGER NOT NULL,              -- total available
  sold        INTEGER NOT NULL DEFAULT 0,
  max_per_order INTEGER NOT NULL DEFAULT 5,
  sale_starts TIMESTAMPTZ,
  sale_ends   TIMESTAMPTZ,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ticket_types_event ON ticket_types(event_id);

-- TICKET TABLE (individual tickets after purchase)
CREATE TABLE tickets (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  ticket_type_id  UUID NOT NULL REFERENCES ticket_types(id),
  customer_id     UUID REFERENCES customers(id) ON DELETE SET NULL,
  holder_name     TEXT NOT NULL,             -- name of person attending
  holder_ci       TEXT,                      -- CI of attendee (required)
  qr_code         TEXT UNIQUE,               -- unique QR code for entry
  status          TEXT NOT NULL DEFAULT 'valid'
                  CHECK (status IN ('valid', 'used', 'cancelled', 'refunded', 'transferred')),
  checked_in_at   TIMESTAMPTZ,
  checked_in_by   UUID,                      -- staff/agent who scanned
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tickets_order ON tickets(order_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_tickets_holder_ci ON tickets(holder_ci);
CREATE INDEX idx_tickets_qr ON tickets(qr_code);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_valid ON tickets(status) WHERE status = 'valid';

-- BLACKLIST
CREATE TABLE blacklist (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ci_number     TEXT NOT NULL UNIQUE,
  full_name     TEXT,
  reason        TEXT NOT NULL,               -- why they were blacklisted
  evidence_url  TEXT,                        -- image evidence if any
  blocked_by    UUID,                        -- admin who blocked
  blocked_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at    TIMESTAMPTZ,                 -- optional expiry
  notes         TEXT
);

CREATE INDEX idx_blacklist_ci ON blacklist(ci_number);

-- RLS policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE blacklist ENABLE ROW LEVEL SECURITY;

-- Public read for published events
CREATE POLICY "events_public_read" ON events
  FOR SELECT USING (status = 'published');

-- Public read for ticket types
CREATE POLICY "ticket_types_public_read" ON ticket_types
  FOR SELECT USING (true);

-- Customers can see their own tickets
CREATE POLICY "tickets_own_select" ON tickets
  FOR SELECT USING (auth.uid() = customer_id);

-- Blacklist: only admins can read/write
CREATE POLICY "blacklist_admin_all" ON blacklist
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
```

### 3.2 Event Pages (3h)

- **Events list** — `/eventos` — grid of upcoming events with date, venue, image, price range, "Comprar entradas" button
- **Event detail** — `/eventos/[slug]` — full description, date/time, venue, rules, ticket types with pricing grid, progress bar showing availability
- **Past events** section showing gallery
- Featured event carousel on homepage
- Calendar view option

### 3.3 Ticket Purchase Flow (4h)

1. User selects event → sees ticket types
2. Selects quantity per type (max per order enforced)
3. **REQUIRED if CI ticket**: each ticket needs attendee name + CI number
4. Goes to checkout (reuse existing checkout flow with modifications)
5. **CI enforcement**: if event requires CI, user must have verified CI on file (see Phase 2)
6. Payment: transfer or COD
7. On payment confirmation:
   - Generate unique QR code per ticket (UUID + event slug + ticket type + salt)
   - Save tickets to Supabase
   - Send confirmation with QR codes (on-page + download)
8. Order confirmation page shows all tickets with QR codes

### 3.4 QR Code Generation (2h)

- Use `qrcode` npm package (or server-side: `qrcode` library)
- QR content: `{ticket_id}:{event_id}:{ci_number}` signed with HMAC
- Display QR on ticket confirmation page with download option
- QR includes: event name, date, holder name, ticket type for easy scanning

### 3.5 Entry Verification System (3h)

**Admin/mobile entry page: `/admin/ingreso`**
- Designed for mobile use at door
- Input field for CI number OR QR scanner (manual QR code text entry)
- On scan/enter:
  - Show ticket details: event name, holder name, ticket type
  - Green "Válido" with checkmark
  - Red "Ya usado" if already checked in
  - Red "Cancelado" if cancelled
  - Yellow "Falsificado" if QR doesn't match any ticket
- "Confirmar ingreso" button marks ticket as `used`, stores `checked_in_at` and `checked_by`
- Search by CI number: shows all tickets for that person for today's event
- Blacklist check: auto-flash red if CI is blacklisted

### 3.6 Admin: Event Management (1h)

**Enhance existing admin panel with:**
- `/admin/eventos` — list all events with status badges
- `/admin/eventos/nuevo` — create event form
- `/admin/eventos/[id]` — edit event + manage ticket types
- `/admin/eventos/[id]/entradas` — view all tickets sold, mark as used/cancelled
- `/admin/eventos/[id]/asistentes` — attendee list with CI, name, ticket type, checked-in status

---

## PHASE 4: BLACKLIST + ENTRY VERIFICATION (10h)

### 4.1 Blacklist Admin Panel (3h)

**`/admin/lista-negra`:**
- Table: CI number, full name, reason, blocked date, expires, status
- Add to blacklist: CI number (required), name, reason (required), evidence upload, expiry date
- Search/filter by CI number, name
- Bulk import CI numbers
- Remove from blacklist with audit log
- Blacklist stats: total blocked, active, expired

### 4.2 Blacklist Check in Order Flow (2h)

- Server-side API `POST /api/check-blacklist`:
  - Takes CI number
  - Returns `{ blacklisted: true, reason: string }` or `{ blacklisted: false }`
- Called during:
  - Ticket checkout (REQUIRED check)
  - Toy checkout (if CI is provided)
- If blacklisted: show custom error message, block order submission
- Log blocked attempts: `blacklist_attempts` table for audit

### 4.3 Blacklist Audit Table (1h)

```sql
CREATE TABLE blacklist_attempts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ci_number   TEXT NOT NULL,
  customer_id UUID REFERENCES customers(id),
  action      TEXT NOT NULL,  -- 'blocked_order', 'blocked_ticket'
  reason      TEXT,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### 4.4 1-Click QR Entry from Dashboard (2h)

- Standalone entry page (no login needed, just a access code shared with door staff)
- `/admin/ingreso/[event-slug]` — pre-filtered to one event
- Fullscreen mode for phones/tablets at door
- Works offline-cached with Service Worker
- Scanning sound on valid entry (beep for valid, buzz for invalid)

### 4.5 Report: Event Attendance (2h)

- `/admin/eventos/[id]/reporte`:
  - Total tickets sold vs capacity
  - Checked-in count vs sold
  - Ticket type breakdown
  - Blacklisted attempts during this event
  - Export as CSV

---

## PHASE 5: DEPLOYMENT + TESTING (4h)

### 5.1 Domain Cleanup (0.5h)
- Ensure `metadataBase` in layout.tsx points to `https://fun4me.paragu-ai.com` (currently fun4me.sunstein.cloud)
- All URLs, OG images, canonical tags consistent

### 5.2 Supabase Migration (0.5h)
- Run new migrations (002-004) in order
- Apply RLS policies
- Create storage buckets

### 5.3 Rebuild + Deploy (1h)
- `pnpm build` — verify no errors
- `docker build -t fun4me:prod .`
- `docker stack deploy -c docker-compose.yml fun4me`
- Verify site accessible at fun4me.paragu-ai.com

### 5.4 Manual QA Checklist (2h)

**User Accounts:**
- [ ] Signup creates customer profile
- [ ] Login redirects to account page
- [ ] Edit profile saves correctly
- [ ] Add/manage addresses
- [ ] Order history shows past orders

**CI System:**
- [ ] Upload CI image works
- [ ] Admin can verify/reject CI
- [ ] Verified CI shows green badge
- [ ] Rejected CI shows reason

**Ticketing:**
- [ ] Event list shows published events
- [ ] Ticket purchase with CI works
- [ ] QR code generates and displays
- [ ] Entry verification page scans/validates QR
- [ ] Used ticket shows "ya usado"

**Blacklist:**
- [ ] Admin can add CI to blacklist
- [ ] Blacklisted CI blocked from ticket purchase
- [ ] Blacklisted CI blocked from toy purchase if provided
- [ ] Blacklist removal works

**Existing Bugs (Phase 0):**
- [ ] Checkout saves to Supabase
- [ ] Admin routes protected
- [ ] Cart images show correctly
- [ ] Free shipping threshold consistent

---

## NAVIGATION & SITEMAP

New pages to add:

```
/                                     Homepage (existing)
/registro                             User signup
/iniciar-sesion                       User login (existing, enhance)
/recuperar-contrasena                 Forgot password
/cuenta                               Account dashboard
/cuenta/datos                         Profile edit
/cuenta/direcciones                   Addresses
/cuenta/pedidos                       Order history
/cuenta/ci                            CI document upload
/eventos                              Events list
/eventos/[slug]                       Event detail + ticket purchase
/eventos/[slug]/confirmacion          Post-purchase ticket + QR
/admin/verificaciones                 CI verification queue
/admin/eventos                        Event management
/admin/eventos/nuevo                  Create event
/admin/eventos/[id]                   Edit event
/admin/eventos/[id]/entradas          Manage tickets
/admin/eventos/[id]/asistentes        Attendee list
/admin/eventos/[id]/reporte           Attendance report
/admin/ingreso                        Entry verification (all events)
/admin/ingreso/[event-slug]           Entry verification (single event)
/admin/lista-negra                    Blacklist management
```

---

## TECH DECISIONS

| Area | Decision |
|------|----------|
| Auth | Supabase Auth (currently enabled) + AuthContext provider |
| QR | `qrcode` npm package (generates QR as SVG/PNG) |
| Storage | Supabase Storage (ci-documents bucket, private) |
| Checkout API | Next.js API routes with Supabase server client |
| Entry UI | Mobile-first PWA, standalone page with access code |
| Blacklist check | Server-side API, called from checkout flow |
| CI verification | Manual admin approval (automated OCR can be Phase 6) |
| Ticket QR format | `ticket_id:event_id:ci_number` HMAC-signed |
