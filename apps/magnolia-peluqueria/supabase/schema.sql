-- Magnolia Peluquería — Supabase Schema
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql/new

-- ══════════════════════════════════════════════════════
-- BOOKINGS
-- ══════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.bookings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone       TEXT NOT NULL,
  service     TEXT NOT NULL,
  preferred_date TEXT,
  notes       TEXT,
  source      TEXT DEFAULT 'website',
  status      TEXT DEFAULT 'pending'
              CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  metadata    JSONB DEFAULT '{}'
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Auto-create admin notification on new booking
CREATE OR REPLACE FUNCTION public.notify_on_booking()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  PERFORM pg_notify(
    'new_booking',
    json_build_object(
      'id', NEW.id,
      'client_name', NEW.client_name,
      'phone', NEW.phone,
      'service', NEW.service,
      'preferred_date', NEW.preferred_date,
      'created_at', NEW.created_at
    )::text
  );
  RETURN NEW;
END; $$;
CREATE TRIGGER on_new_booking
  AFTER INSERT ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.notify_on_booking();

-- RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read/update for service role" ON public.bookings
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow insert for anon" ON public.bookings
  FOR INSERT WITH CHECK (true);

COMMENT ON TABLE public.bookings IS 'Reservaciones de turnos Magnolia';

-- ══════════════════════════════════════════════════════
-- PROMOTIONS
-- ══════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.promotions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  subtitle    TEXT,
  badge       TEXT,
  description TEXT,
  wa_message  TEXT,
  is_active   BOOLEAN DEFAULT true,
  expires_at  TIMESTAMPTZ,
  color       TEXT DEFAULT 'secondary'
              CHECK (color IN ('secondary','amber','primary')),
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for anon" ON public.promotions
  FOR SELECT USING (true);
CREATE POLICY "Allow write for service role" ON public.promotions
  FOR ALL USING (auth.role() = 'service_role');

-- Seed default promotions (will be skipped if rows exist)
INSERT INTO public.promotions (title, subtitle, badge, wa_message, color, sort_order)
SELECT 'Descuento Primera Visita', '20% off en tu primer corte con nosotras', 'Solo nuevas clientas',
  '¡Hola! Quiero usar el descuento de primera visita 🎉', 'secondary', 1
WHERE NOT EXISTS (SELECT 1 FROM public.promotions LIMIT 1);

INSERT INTO public.promotions (title, subtitle, badge, wa_message, color, sort_order)
SELECT 'Combo Novia', 'Peinado + Maquillaje + Tratamiento para tu día especial',
  'Combo del mes',
  '¡Hola! Quiero consultar por el Combo Novia 💍', 'amber', 2
WHERE NOT EXISTS (SELECT 1 FROM public.promotions WHERE title LIKE '%Novia%');

COMMENT ON TABLE public.promotions IS 'Promociones activas Magnolia';

-- ══════════════════════════════════════════════════════
-- SITE_CONTENT  (key-value overrides for non-code edits)
-- ══════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.site_content (
  key    TEXT PRIMARY KEY,
  value  JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for anon" ON public.site_content
  FOR SELECT USING (true);
CREATE POLICY "Allow write for service role" ON public.site_content
  FOR ALL USING (auth.role() = 'service_role');

-- Seed key business info
INSERT INTO public.site_content (key, value) VALUES
  ('business', '{"phone":"+595 986 106 062","whatsapp":"595986106062","address":"Asunción, Paraguay","hours":"Mar-Sáb: 9:00 - 19:00","instagram":"magnolia_peluqueria"}'),
  ('cta_message', '{"default":"Hola! Quiero reservarme un turno 🪄"}')
ON CONFLICT (key) DO NOTHING;

COMMENT ON TABLE public.site_content IS 'CMS content overrides para Magnolia';

-- ══════════════════════════════════════════════════════
-- GALLERY_IMAGES  (real photos from salon)
-- ══════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src         TEXT NOT NULL,
  alt         TEXT NOT NULL,
  tag         TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE TRIGGER gallery_images_updated_at
  BEFORE UPDATE ON public.gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Index for querying by tag
CREATE INDEX IF NOT EXISTS idx_gallery_images_tag ON public.gallery_images(tag);

-- Index for display order
CREATE INDEX IF NOT EXISTS idx_gallery_images_order ON public.gallery_images(display_order);

-- RLS
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for anon" ON public.gallery_images
  FOR SELECT USING (true);
CREATE POLICY "Allow write for service role" ON public.gallery_images
  FOR ALL USING (auth.role() = 'service_role');

-- Seed default gallery images (will be skipped if rows exist)
INSERT INTO public.gallery_images (src, alt, tag, display_order) VALUES
  ('/images/gallery/balayage-1.jpg', 'Balayage experto', 'color', 1),
  ('/images/gallery/corte-bob.jpg', 'Corte moderno', 'corte', 2),
  ('/images/gallery/keratina.jpg', 'Tratamiento capilar', 'tratamiento', 3),
  ('/images/gallery/rubio-platinado.jpg', 'Coloración profesional', 'color', 4),
  ('/images/gallery/mechas-naturales.jpg', 'Mechas naturales', 'color', 5),
  ('/images/gallery/peinado-novia.jpg', 'Estilizado elegante', 'estilizado', 6),
  ('/images/gallery/color-bronce.jpg', 'Trabajo de Tinte', 'color', 7),
  ('/images/gallery/corte-masculino.jpg', 'Corte caballero', 'corte', 8),
  ('/images/gallery/ombre.jpg', 'Ombre natural', 'color', 9)
ON CONFLICT DO NOTHING;

COMMENT ON TABLE public.gallery_images IS 'Fotos reales del salón Magnolia';