CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. ENHANCE CUSTOMERS TABLE
-- =============================================================================
ALTER TABLE customers ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

-- =============================================================================
-- 2. CUSTOMER ADDRESSES
-- =============================================================================
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

CREATE INDEX IF NOT EXISTS idx_customer_addresses_customer ON customer_addresses(customer_id);

-- =============================================================================
-- 3. CI DOCUMENTS
-- =============================================================================
CREATE TABLE IF NOT EXISTS ci_documents (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id   UUID REFERENCES customers(id) ON DELETE CASCADE,
  ci_number     TEXT NOT NULL,
  full_name     TEXT,
  image_url     TEXT,
  selfie_url    TEXT,
  verified      BOOLEAN NOT NULL DEFAULT false,
  verified_by   UUID,
  verified_at   TIMESTAMPTZ,
  expires_at    TIMESTAMPTZ,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ci_documents_customer ON ci_documents(customer_id);
CREATE INDEX IF NOT EXISTS idx_ci_documents_ci_number ON ci_documents(ci_number);
CREATE INDEX IF NOT EXISTS idx_ci_documents_unverified ON ci_documents(verified) WHERE verified = false;

-- =============================================================================
-- 4. BLACKLIST
-- =============================================================================
CREATE TABLE IF NOT EXISTS blacklist (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ci_number     TEXT NOT NULL UNIQUE,
  full_name     TEXT,
  reason        TEXT NOT NULL,
  evidence_url  TEXT,
  blocked_by    UUID,
  blocked_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at    TIMESTAMPTZ,
  notes         TEXT
);

CREATE INDEX IF NOT EXISTS idx_blacklist_ci ON blacklist(ci_number);

-- =============================================================================
-- 5. BLACKLIST ATTEMPTS (audit log)
-- =============================================================================
CREATE TABLE IF NOT EXISTS blacklist_attempts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ci_number   TEXT NOT NULL,
  customer_id UUID,
  action      TEXT,
  reason      TEXT,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blacklist_attempts_ci ON blacklist_attempts(ci_number);

-- =============================================================================
-- 6. EVENTS
-- =============================================================================
DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS events (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title               TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  description         TEXT,
  short_desc          TEXT,
  date                TIMESTAMPTZ NOT NULL,
  end_date            TIMESTAMPTZ,
  venue               TEXT NOT NULL,
  venue_address       TEXT,
  city                TEXT NOT NULL DEFAULT 'Asunción',
  image_url           TEXT,
  max_capacity        INTEGER NOT NULL,
  status              event_status NOT NULL DEFAULT 'draft',
  is_featured         BOOLEAN NOT NULL DEFAULT false,
  entry_requires_ci   BOOLEAN NOT NULL DEFAULT true,
  organizer_name      TEXT DEFAULT 'Fun4Me Events',
  rules               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(status) WHERE status = 'published';

-- =============================================================================
-- 7. TICKET TYPES
-- =============================================================================
CREATE TABLE IF NOT EXISTS ticket_types (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id      UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT,
  price         BIGINT NOT NULL CHECK (price >= 0),
  quantity      INTEGER NOT NULL,
  sold          INTEGER NOT NULL DEFAULT 0,
  max_per_order INTEGER NOT NULL DEFAULT 5,
  sale_starts   TIMESTAMPTZ,
  sale_ends     TIMESTAMPTZ,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ticket_types_event ON ticket_types(event_id);

-- =============================================================================
-- 8. TICKETS (individual after purchase)
-- =============================================================================
CREATE TABLE IF NOT EXISTS tickets (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event_id        UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  ticket_type_id  UUID NOT NULL REFERENCES ticket_types(id),
  customer_id     UUID REFERENCES customers(id) ON DELETE SET NULL,
  holder_name     TEXT NOT NULL,
  holder_ci       TEXT,
  qr_code         TEXT UNIQUE,
  status          TEXT NOT NULL DEFAULT 'valid'
                  CHECK (status IN ('valid', 'used', 'cancelled', 'refunded', 'transferred')),
  checked_in_at   TIMESTAMPTZ,
  checked_in_by   UUID,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tickets_order ON tickets(order_id);
CREATE INDEX IF NOT EXISTS idx_tickets_event ON tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_tickets_holder_ci ON tickets(holder_ci);
CREATE INDEX IF NOT EXISTS idx_tickets_qr ON tickets(qr_code);
CREATE INDEX IF NOT EXISTS idx_tickets_valid ON tickets(status) WHERE status = 'valid';

-- =============================================================================
-- 9. NEWSLETTER SUBSCRIBERS
-- =============================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT NOT NULL UNIQUE,
  name        TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  subscribed  BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- =============================================================================
-- 10. STORAGE BUCKET: CI DOCUMENTS
-- =============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'ci-documents',
  'ci-documents',
  false,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- 11. RLS — NEW TABLES
-- =============================================================================
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ci_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE blacklist_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Customer addresses: own data only
CREATE POLICY "addresses_select_own" ON customer_addresses
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "addresses_insert_own" ON customer_addresses
  FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "addresses_update_own" ON customer_addresses
  FOR UPDATE USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "addresses_delete_own" ON customer_addresses
  FOR DELETE USING (auth.uid() = customer_id);

-- CI documents: own read/insert
CREATE POLICY "ci_select_own" ON ci_documents
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "ci_insert_own" ON ci_documents
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Events: public read published
CREATE POLICY "events_public_read" ON events
  FOR SELECT USING (status = 'published');

-- Ticket types: public read
CREATE POLICY "ticket_types_public_read" ON ticket_types
  FOR SELECT USING (true);

-- Tickets: own read
CREATE POLICY "tickets_select_own" ON tickets
  FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "tickets_insert_own" ON tickets
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Newsletter: self-insert
CREATE POLICY "newsletter_insert_self" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);
CREATE POLICY "newsletter_select_self" ON newsletter_subscribers
  FOR SELECT USING (email = current_setting('request.jwt.claims')::json->>'email');

-- Blacklist: no public access (admin only via service_role)
CREATE POLICY "blacklist_admin_all" ON blacklist
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "blacklist_attempts_admin_all" ON blacklist_attempts
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Admin full access policies for new tables
CREATE POLICY "customer_addresses_admin_all" ON customer_addresses
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "ci_documents_admin_all" ON ci_documents
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "events_admin_all" ON events
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "ticket_types_admin_all" ON ticket_types
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "tickets_admin_all" ON tickets
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "newsletter_admin_all" ON newsletter_subscribers
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- Storage policies for ci-documents
CREATE POLICY "ci_documents_auth_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'ci-documents'
    AND auth.role() = 'authenticated'
  );
CREATE POLICY "ci_documents_auth_read" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'ci-documents'
    AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.jwt()->>'role' = 'service_role')
  );
CREATE POLICY "ci_documents_admin_all" ON storage.objects
  FOR ALL USING (
    bucket_id = 'ci-documents'
    AND auth.jwt()->>'role' = 'service_role'
  );

-- =============================================================================
-- 12. TRIGGER: AUTO-CREATE CUSTOMER PROFILE ON SIGNUP
-- =============================================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.customers (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =============================================================================
-- 13. FUNCTION: CHECK BLACKLIST
-- =============================================================================
CREATE OR REPLACE FUNCTION is_ci_blacklisted(p_ci_number TEXT)
RETURNS JSONB AS $$
DECLARE
  b blacklist%ROWTYPE;
BEGIN
  SELECT * INTO b FROM blacklist
  WHERE ci_number = p_ci_number
    AND (expires_at IS NULL OR expires_at > now());

  IF NOT FOUND THEN
    RETURN jsonb_build_object('blacklisted', false);
  END IF;

  RETURN jsonb_build_object(
    'blacklisted', true,
    'reason', b.reason,
    'blocked_at', b.blocked_at,
    'expires_at', b.expires_at
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- 14. FUNCTION: TICKET QR CODE (generated on app side, validators here)
-- =============================================================================
CREATE OR REPLACE FUNCTION validate_ticket_qr(p_qr_code TEXT)
RETURNS JSONB AS $$
DECLARE
  t tickets%ROWTYPE;
  e events%ROWTYPE;
BEGIN
  SELECT * INTO t FROM tickets WHERE qr_code = p_qr_code;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Entrada no encontrada');
  END IF;

  SELECT * INTO e FROM events WHERE id = t.event_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Evento no encontrado');
  END IF;

  IF t.status = 'used' THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Entrada ya utilizada');
  END IF;

  IF t.status = 'cancelled' THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Entrada cancelada');
  END IF;

  IF t.status != 'valid' THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Estado de entrada inválido');
  END IF;

  RETURN jsonb_build_object(
    'valid', true,
    'ticket_id', t.id,
    'event_title', e.title,
    'event_date', e.date,
    'holder_name', t.holder_name,
    'holder_ci', t.holder_ci,
    'status', t.status
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- 15. VIEWS
-- =============================================================================
CREATE OR REPLACE VIEW upcoming_events AS
SELECT
  e.*,
  json_agg(
    json_build_object(
      'id', tt.id,
      'name', tt.name,
      'price', tt.price,
      'available', tt.quantity - tt.sold,
      'max_per_order', tt.max_per_order
    )
  ) AS ticket_types
FROM events e
LEFT JOIN ticket_types tt ON tt.event_id = e.id
WHERE e.status = 'published' AND e.date > now()
GROUP BY e.id
ORDER BY e.date ASC;

CREATE OR REPLACE VIEW ci_verification_queue AS
SELECT
  cd.*,
  c.full_name AS customer_name,
  c.email AS customer_email,
  c.phone AS customer_phone
FROM ci_documents cd
LEFT JOIN customers c ON cd.customer_id = c.id
WHERE cd.verified = false
ORDER BY cd.created_at ASC;
