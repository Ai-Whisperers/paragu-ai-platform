-- =============================================================================
-- Fun4Me - Phase 1: Community Features + Memberships
-- Adds: membership plans, enhanced profiles, member directory foundations
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. MEMBERSHIP PLANS
-- =============================================================================
CREATE TABLE IF NOT EXISTS membership_plans (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  price         BIGINT NOT NULL CHECK (price >= 0), -- in PYG
  duration_days INTEGER NOT NULL DEFAULT 30,
  features      JSONB NOT NULL DEFAULT '{}'::jsonb,
  color         TEXT DEFAULT '#9333EA', -- for UI badge
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_membership_plans_active ON membership_plans(is_active) WHERE is_active = true;

-- =============================================================================
-- 2. CUSTOMER MEMBERSHIPS
-- =============================================================================
CREATE TABLE IF NOT EXISTS customer_memberships (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id     UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  plan_id         UUID NOT NULL REFERENCES membership_plans(id),
  start_date      TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_date        TIMESTAMPTZ NOT NULL,
  auto_renew      BOOLEAN NOT NULL DEFAULT true,
  status          TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'expired', 'cancelled', 'trial')),
  payment_method  TEXT CHECK (payment_method IN ('bank_transfer', 'cod', 'bancard', 'gift_card')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_memberships_customer ON customer_memberships(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_memberships_active ON customer_memberships(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_customer_memberships_expiring ON customer_memberships(end_date) WHERE status = 'active';

CREATE TRIGGER trg_customer_memberships_updated_at
  BEFORE UPDATE ON customer_memberships
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 3. ENHANCED CUSTOMER PROFILES
-- =============================================================================
ALTER TABLE customers ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS display_name TEXT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS experience_level TEXT CHECK (
  experience_level IN ('curious', 'beginner', 'intermediate', 'advanced', 'expert')
);
ALTER TABLE customers ADD COLUMN IF NOT EXISTS roles TEXT[] DEFAULT '{}';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS kink_tags TEXT[] DEFAULT '{}';
ALTER TABLE customers ADD COLUMN IF NOT EXISTS profile_visibility TEXT NOT NULL DEFAULT 'members'
  CHECK (profile_visibility IN ('public', 'members', 'verified', 'private'));
ALTER TABLE customers ADD COLUMN IF NOT EXISTS show_in_directory BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS event_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS member_since TIMESTAMPTZ;

-- =============================================================================
-- 4. CUSTOMER PHOTOS (for profile galleries)
-- =============================================================================
CREATE TABLE IF NOT EXISTS customer_photos (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id   UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  image_url     TEXT NOT NULL,
  caption       TEXT,
  is_avatar     BOOLEAN NOT NULL DEFAULT false,
  is_private    BOOLEAN NOT NULL DEFAULT false,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customer_photos_customer ON customer_photos(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_photos_public ON customer_photos(customer_id) WHERE is_private = false;

-- =============================================================================
-- 5. SEED MEMBERSHIP PLANS
-- =============================================================================
INSERT INTO membership_plans (name, slug, description, price, duration_days, features, color, sort_order)
VALUES
  (
    'Explorador',
    'explorador',
    'Acceso básico a la comunidad',
    25000,
    30,
    '{"profile": true, "directory": false, "messaging": false, "event_discount": 0, "free_shipping": false}',
    '#9333EA',
    1
  ),
  (
    'Kinkster',
    'kinkster',
    'Para quienes viven el kink',
    50000,
    30,
    '{"profile": true, "directory": true, "messaging": true, "event_discount": 10, "free_shipping": false}',
    '#EC4899',
    2
  ),
  (
    'Patrocinador',
    'patrocinador',
    'Apoya la comunidad y obtene todos los beneficios',
    100000,
    30,
    '{"profile": true, "directory": true, "messaging": true, "event_discount": 20, "free_shipping": true, "priority_support": true}',
    '#F59E0B',
    3
  )
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 6. RLS POLICIES
-- =============================================================================
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_photos ENABLE ROW LEVEL SECURITY;

-- Membership plans: public read active
CREATE POLICY "membership_plans_public_read" ON membership_plans
  FOR SELECT USING (is_active = true);

-- Customer memberships: own data only
CREATE POLICY "customer_memberships_select_own" ON customer_memberships
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "customer_memberships_insert_own" ON customer_memberships
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

-- Customer photos: own CRUD
CREATE POLICY "customer_photos_select_own" ON customer_photos
  FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "customer_photos_insert_own" ON customer_photos
  FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "customer_photos_update_own" ON customer_photos
  FOR UPDATE USING (auth.uid() = customer_id) WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "customer_photos_delete_own" ON customer_photos
  FOR DELETE USING (auth.uid() = customer_id);

-- Public photos: visible in directory if not private
CREATE POLICY "customer_photos_public_read" ON customer_photos
  FOR SELECT USING (
    is_private = false
    AND EXISTS (
      SELECT 1 FROM customers c
      WHERE c.id = customer_photos.customer_id
      AND c.show_in_directory = true
    )
  );

-- Admin full access
CREATE POLICY "membership_plans_admin_all" ON membership_plans
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "customer_memberships_admin_all" ON customer_memberships
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');
CREATE POLICY "customer_photos_admin_all" ON customer_photos
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- =============================================================================
-- 7. STORAGE BUCKETS (requires Supabase storage — skip if not available)
-- =============================================================================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'profile-photos',
      'profile-photos',
      true,
      5242880,
      ARRAY['image/jpeg', 'image/png', 'image/webp']
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
END $$;

-- =============================================================================
-- 8. FUNCTION: Check if customer has active membership
-- =============================================================================
CREATE OR REPLACE FUNCTION get_active_membership(p_customer_id UUID)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'has_active', true,
    'plan_name', mp.name,
    'plan_slug', mp.slug,
    'features', mp.features,
    'end_date', cm.end_date
  ) INTO result
  FROM customer_memberships cm
  JOIN membership_plans mp ON mp.id = cm.plan_id
  WHERE cm.customer_id = p_customer_id
    AND cm.status = 'active'
    AND cm.end_date > now()
  LIMIT 1;

  IF result IS NULL THEN
    RETURN jsonb_build_object('has_active', false);
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
