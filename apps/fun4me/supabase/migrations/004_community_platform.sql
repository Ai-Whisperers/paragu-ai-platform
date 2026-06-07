-- =============================================================================
-- Fun4Me - Phase 2-4: Full Community Platform
-- Venues, Event upgrades, Forums, Messaging, Education, Profiles
-- =============================================================================

-- =============================================================================
-- 1. VENUES
-- =============================================================================
CREATE TABLE IF NOT EXISTS venues (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  address     TEXT,
  city        TEXT NOT NULL DEFAULT 'Asunción',
  capacity    INTEGER,
  amenities   TEXT[] DEFAULT '{}',
  rules       TEXT,
  image_url   TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_venues_slug ON venues(slug);

-- =============================================================================
-- 2. EVENT CATEGORIES
-- =============================================================================
CREATE TABLE IF NOT EXISTS event_categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  color       TEXT DEFAULT '#9333EA',
  icon        TEXT DEFAULT 'calendar',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_event_categories_slug ON event_categories(slug);

-- Add new columns to events
ALTER TABLE events ADD COLUMN IF NOT EXISTS venue_id UUID REFERENCES venues(id) ON DELETE SET NULL;
ALTER TABLE events ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES event_categories(id) ON DELETE SET NULL;
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS recurring_pattern TEXT CHECK (
  recurring_pattern IS NULL OR recurring_pattern IN ('daily', 'weekly', 'biweekly', 'monthly', 'first_friday')
);
ALTER TABLE events ADD COLUMN IF NOT EXISTS minimum_age INTEGER NOT NULL DEFAULT 18;
ALTER TABLE events ADD COLUMN IF NOT EXISTS dress_code TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS organizer_id UUID REFERENCES customers(id) ON DELETE SET NULL;
ALTER TABLE events ADD COLUMN IF NOT EXISTS interested_count INTEGER NOT NULL DEFAULT 0;

-- =============================================================================
-- 3. EVENT RSVPs (non-ticketed interest)
-- =============================================================================
CREATE TABLE IF NOT EXISTS event_rsvps (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'interested'
              CHECK (status IN ('interested', 'going', 'maybe', 'not_going')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(event_id, customer_id)
);

CREATE INDEX IF NOT EXISTS idx_event_rsvps_event ON event_rsvps(event_id);

-- =============================================================================
-- 4. COMMUNITY GROUPS / FORUMS
-- =============================================================================
CREATE TABLE IF NOT EXISTS community_groups (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  rules         TEXT,
  category      TEXT DEFAULT 'social',
  image_url     TEXT,
  is_private    BOOLEAN NOT NULL DEFAULT false,
  requires_verified_ci BOOLEAN NOT NULL DEFAULT false,
  requires_membership TEXT, -- slug of minimum membership
  created_by    UUID REFERENCES customers(id) ON DELETE SET NULL,
  member_count  INTEGER NOT NULL DEFAULT 0,
  post_count    INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_community_groups_slug ON community_groups(slug);

CREATE TABLE IF NOT EXISTS group_members (
  group_id    UUID NOT NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  role        TEXT NOT NULL DEFAULT 'member'
              CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, customer_id)
);

CREATE TABLE IF NOT EXISTS group_posts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id    UUID NOT NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  author_id   UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  is_pinned   BOOLEAN NOT NULL DEFAULT false,
  is_announcement BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_group_posts_group ON group_posts(group_id, created_at DESC);

CREATE TABLE IF NOT EXISTS group_post_replies (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id     UUID NOT NULL REFERENCES group_posts(id) ON DELETE CASCADE,
  author_id   UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  parent_id   UUID REFERENCES group_post_replies(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_group_post_replies_post ON group_post_replies(post_id, created_at);

-- =============================================================================
-- 5. PRIVATE MESSAGING
-- =============================================================================
CREATE TABLE IF NOT EXISTS message_threads (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant1 UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  participant2 UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(participant1, participant2)
);

CREATE INDEX IF NOT EXISTS idx_message_threads_p1 ON message_threads(participant1, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_message_threads_p2 ON message_threads(participant2, last_message_at DESC);

CREATE TABLE IF NOT EXISTS messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id   UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id   UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  read        BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(thread_id, read) WHERE read = false;

-- =============================================================================
-- 6. EDUCATION / COURSES
-- =============================================================================
CREATE TABLE IF NOT EXISTS courses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT,
  short_desc    TEXT,
  level         TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'all')),
  category      TEXT DEFAULT 'general',
  instructor_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  price         BIGINT NOT NULL DEFAULT 0 CHECK (price >= 0),
  image_url     TEXT,
  video_url     TEXT,
  duration_minutes INTEGER,
  is_published  BOOLEAN NOT NULL DEFAULT false,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published) WHERE is_published = true;

CREATE TABLE IF NOT EXISTS course_modules (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id       UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  content         TEXT,
  video_url       TEXT,
  duration_minutes INTEGER,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  is_free         BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_course_modules_course ON course_modules(course_id, sort_order);

CREATE TABLE IF NOT EXISTS course_enrollments (
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  progress    FLOAT NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed   BOOLEAN NOT NULL DEFAULT false,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  PRIMARY KEY (customer_id, course_id)
);

-- =============================================================================
-- 7. MEMBER REVIEWS (event attendee ratings)
-- =============================================================================
CREATE TABLE IF NOT EXISTS member_reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  reviewed_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  event_id    UUID REFERENCES events(id) ON DELETE SET NULL,
  rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(reviewer_id, reviewed_id, event_id)
);

CREATE INDEX IF NOT EXISTS idx_member_reviews_reviewed ON member_reviews(reviewed_id);

-- =============================================================================
-- 8. SEED DATA: Event categories
-- =============================================================================
INSERT INTO event_categories (name, slug, description, color, icon, sort_order) VALUES
  ('Fiesta', 'fiesta', 'Fiestas y eventos sociales', '#EC4899', 'music', 1),
  ('Taller', 'taller', 'Talleres educativos y workshops', '#9333EA', 'book-open', 2),
  ('Munch', 'munch', 'Encuentros casuales en público', '#F59E0B', 'coffee', 3),
  ('Play Party', 'play-party', 'Eventos de juego supervisados', '#EF4444', 'zap', 4),
  ('Charla', 'charla', 'Charlas y paneles educativos', '#3B82F6', 'message-square', 5),
  ('Retiro', 'retiro', 'Retiros y fines de semana completos', '#10B981', 'sun', 6)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- 9. RLS POLICIES
-- =============================================================================
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_post_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_reviews ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "venues_public_read" ON venues FOR SELECT USING (is_active = true);
CREATE POLICY "event_categories_public_read" ON event_categories FOR SELECT USING (true);
CREATE POLICY "community_groups_public_read" ON community_groups FOR SELECT USING (is_active = true AND is_private = false);
CREATE POLICY "courses_public_read" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "course_modules_public_read" ON course_modules FOR SELECT USING (true);

-- Authenticated own data
CREATE POLICY "event_rsvps_select_own" ON event_rsvps FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "event_rsvps_insert_own" ON event_rsvps FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "event_rsvps_update_own" ON event_rsvps FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "group_members_select_own" ON group_members FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "group_posts_select" ON group_posts FOR SELECT USING (true);
CREATE POLICY "group_post_replies_select" ON group_post_replies FOR SELECT USING (true);
CREATE POLICY "messages_select" ON messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM message_threads WHERE id = messages.thread_id AND (participant1 = auth.uid() OR participant2 = auth.uid()))
);
CREATE POLICY "course_enrollments_select_own" ON course_enrollments FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "course_enrollments_insert_own" ON course_enrollments FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "member_reviews_select" ON member_reviews FOR SELECT USING (true);

-- Admin all
CREATE POLICY "venues_admin_all" ON venues FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "event_categories_admin_all" ON event_categories FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "event_rsvps_admin_all" ON event_rsvps FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "community_groups_admin_all" ON community_groups FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "group_members_admin_all" ON group_members FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "group_posts_admin_all" ON group_posts FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "group_post_replies_admin_all" ON group_post_replies FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "message_threads_admin_all" ON message_threads FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "messages_admin_all" ON messages FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "courses_admin_all" ON courses FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "course_modules_admin_all" ON course_modules FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "course_enrollments_admin_all" ON course_enrollments FOR ALL USING ('service_role' = 'service_role');
CREATE POLICY "member_reviews_admin_all" ON member_reviews FOR ALL USING ('service_role' = 'service_role');
