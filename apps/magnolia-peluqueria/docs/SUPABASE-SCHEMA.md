# Magnolia Peluquería — Supabase Schema

**Version:** 1.0 | Mayo 2026  
**Purpose:** Database design for Phase 1+ features

---

## 1. Overview

Supabase replaces the JSON content files for dynamic content management. The JSON files stay as fallback/dev defaults.

### Tables
1. `services` — Service listings and pricing
2. `promotions` — Active offers and discount codes
3. `gallery` — Photo gallery with tags
4. `testimonials` — Client reviews
5. `team` — Team member profiles
6. `bookings` — Appointment requests
7. `loyalty_cards` — Loyalty program tracking (Phase 2)
8. `gift_cards` — Gift card issuance (Phase 2)

---

## 2. Tables

### 2.1 `services`

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,          -- 'cortes' | 'coloracion' | 'tratamientos'
  name TEXT NOT NULL,
  description TEXT,
  price_gs INTEGER NOT NULL,      -- Price in Guaraníes (integer)
  duration_minutes INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write" ON services FOR ALL USING (
  auth.role() = 'service_role'
);
```

### 2.2 `promotions`

```sql
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  discount_code TEXT UNIQUE,      -- e.g. 'PRIMAVERA20'
  discount_percent INTEGER,        -- e.g. 20
  discount_gs INTEGER,            -- Alternative: fixed discount
  service_ids UUID[],              -- Applicable services (NULL = all)
  starts_at TIMESTAMPTZ NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  whatsapp_message TEXT,            -- Pre-filled WhatsApp message
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active" ON promotions FOR SELECT
  USING (is_active = true AND starts_at <= now() AND expires_at >= now());
CREATE POLICY "Admin write" ON promotions FOR ALL
  USING (auth.role() = 'service_role');
```

### 2.3 `gallery`

```sql
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  tags TEXT[],                     -- ['cortes', 'coloracion', 'ambiente', 'tratamientos']
  caption TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write" ON gallery FOR ALL
  USING (auth.role() = 'service_role');
```

### 2.4 `testimonials`

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_initials TEXT,            -- e.g. 'M.L.'
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service_type TEXT,               -- 'corte' | 'coloracion' | 'tratamiento'
  text TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write" ON testimonials FOR ALL
  USING (auth.role() = 'service_role');
```

### 2.5 `team`

```sql
CREATE TABLE team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,               -- 'Dueña' | 'Colorista' | 'Estilista'
  bio TEXT,
  specialties TEXT[],               -- ['Cortes', 'Coloración', 'Keratina']
  photo_url TEXT,
  years_experience INTEGER,
  languages TEXT[],                 -- ['Español', 'Inglés']
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE team ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON team FOR SELECT USING (is_active = true);
CREATE POLICY "Admin write" ON team FOR ALL
  USING (auth.role() = 'service_role');
```

### 2.6 `bookings`

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,       -- E.164 format: +595986106062
  client_email TEXT,
  service_id UUID REFERENCES services(id),
  service_name TEXT NOT NULL,       -- Denormalized for display
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,     -- '09:00', '09:30', ..., '18:30'
  notes TEXT,
  status TEXT DEFAULT 'pending'     -- 'pending' | 'confirmed' | 'cancelled'
  whatsapp_message_sent BOOLEAN DEFAULT false,
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- Clients can only see their own bookings (by phone)
CREATE POLICY "Client lookup" ON bookings FOR SELECT
  USING (client_phone = current_setting('request.jwt.claims', true)::json->>'phone');
-- Anyone can insert (public booking form)
CREATE POLICY "Public insert" ON bookings FOR INSERT WITH CHECK (true);
-- Admin only can update
CREATE POLICY "Admin write" ON bookings FOR UPDATE
  USING (auth.role() = 'service_role');
```

### 2.7 `loyalty_cards`

```sql
CREATE TABLE loyalty_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_phone TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  stamp_count INTEGER DEFAULT 0,
  stamps_total INTEGER DEFAULT 8,   -- 8 stamps = free service
  earned_free_service BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE loyalty_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Client lookup" ON loyalty_cards FOR SELECT
  USING (client_phone = current_setting('request.jwt.claims', true)::json->>'phone');
CREATE POLICY "Public insert" ON loyalty_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin write" ON loyalty_cards FOR ALL
  USING (auth.role() = 'service_role');
```

### 2.8 `gift_cards`

```sql
CREATE TABLE gift_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,       -- e.g. 'MGN-VK4M-9X2P'
  amount_gs INTEGER NOT NULL,
  purchaser_name TEXT NOT NULL,
  purchaser_phone TEXT NOT NULL,
  recipient_name TEXT,
  recipient_phone TEXT,
  status TEXT DEFAULT 'active',    -- 'active' | 'redeemed' | 'expired'
  redeemed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE gift_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read own" ON gift_cards FOR SELECT
  USING (purchaser_phone = current_setting('request.jwt.claims', true)::json->>'phone');
CREATE POLICY "Public insert" ON gift_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin write" ON gift_cards FOR ALL
  USING (auth.role() = 'service_role');
```

---

## 3. Row Level Security Summary

| Table | Public Read | Public Insert | Admin All |
|-------|-------------|---------------|-----------|
| services | ✅ active only | ❌ | ✅ |
| promotions | ✅ active only | ❌ | ✅ |
| gallery | ✅ active only | ❌ | ✅ |
| testimonials | ✅ active only | ❌ | ✅ |
| team | ✅ active only | ❌ | ✅ |
| bookings | Own via phone | ✅ | ✅ |
| loyalty_cards | Own via phone | ✅ | ✅ |
| gift_cards | Own via phone | ✅ | ✅ |

---

## 4. Edge Functions

### 4.1 Booking Confirmation
Triggered on `bookings` INSERT. Sends WhatsApp to Magnolia + confirmation to client.

### 4.2 Abandoned Booking Detection
Runs every 30 min. If booking status = 'pending' for >30 min → WhatsApp follow-up to client.

### 4.3 Promotion Expiry
Edge function on `expires_at` column. Auto-sets `is_active = false` when expired.

### 4.4 Gift Card Code Generator
Generates `MGN-XXXX-XXXX` format codes on INSERT.

---

## 5. Storage (Supabase Storage)

### Buckets
| Bucket | Public | Purpose |
|--------|--------|---------|
| `gallery` | ✅ | Photo gallery images |
| `team` | ✅ | Team profile photos |
| `bookings` | ❌ | Internal (booking receipts, etc.) |

```sql
-- Create buckets via Supabase dashboard or:
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('team', 'team', true);
```

---

## 6. Implementation Order

1. Run `services` table first (services page reads from it)
2. Run `promotions` table (Phase 1 revenue)
3. Run `gallery`, `testimonials`, `team` tables
4. Run `bookings` table (Phase 1 critical)
5. Run `loyalty_cards`, `gift_cards` (Phase 2)

---

*Document owner: Erebus — Ai-Whisperers*
*Last updated: Mayo 2026*