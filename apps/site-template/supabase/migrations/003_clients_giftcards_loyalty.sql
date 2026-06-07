-- Magnolia Peluquería — Clients, Gift Cards, Loyalty
-- Migration 003

-- ═══ CLIENTS (phone-based identity, no password) ═══
CREATE TABLE IF NOT EXISTS public.clients (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone       TEXT UNIQUE NOT NULL,
  name        TEXT,
  email       TEXT,
  notes       TEXT,
  tier        TEXT DEFAULT 'bronce' CHECK (tier IN ('bronce','plata','oro')),
  visits      INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Index for phone lookups
CREATE INDEX IF NOT EXISTS idx_clients_phone ON public.clients(phone);

-- RLS
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for service role" ON public.clients
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow insert for anon" ON public.clients
  FOR INSERT WITH CHECK (true);

-- ═══ DIGITAL GIFT CARDS ═══
CREATE TABLE IF NOT EXISTS public.gift_cards (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code            TEXT UNIQUE NOT NULL,
  token           UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  amount_gs       INTEGER NOT NULL,
  balance_gs      INTEGER NOT NULL,
  buyer_phone     TEXT,
  buyer_name      TEXT,
  recipient_phone TEXT,
  recipient_name  TEXT,
  message         TEXT,
  design          TEXT DEFAULT 'rose',
  status          TEXT DEFAULT 'active'
                  CHECK (status IN ('active','partial','redeemed','expired','cancelled')),
  stripe_session_id TEXT,
  expires_at      TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TRIGGER gift_cards_updated_at
  BEFORE UPDATE ON public.gift_cards
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE INDEX IF NOT EXISTS idx_gift_cards_code ON public.gift_cards(code);
CREATE INDEX IF NOT EXISTS idx_gift_cards_token ON public.gift_cards(token);
CREATE INDEX IF NOT EXISTS idx_gift_cards_buyer_phone ON public.gift_cards(buyer_phone);
CREATE INDEX IF NOT EXISTS idx_gift_cards_recipient_phone ON public.gift_cards(recipient_phone);

ALTER TABLE public.gift_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read by token" ON public.gift_cards
  FOR SELECT USING (true);
CREATE POLICY "Allow insert for service role" ON public.gift_cards
  FOR INSERT WITH CHECK (auth.role() = 'service_role' OR true);
CREATE POLICY "Allow update for service role" ON public.gift_cards
  FOR UPDATE USING (auth.role() = 'service_role');

-- ═══ GIFT CARD REDEMPTIONS (audit trail) ═══
CREATE TABLE IF NOT EXISTS public.gift_card_redemptions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gift_card_id  UUID REFERENCES public.gift_cards(id) ON DELETE CASCADE,
  client_id     UUID REFERENCES public.clients(id),
  amount_gs     INTEGER NOT NULL,
  service       TEXT,
  redeemed_by   TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gc_redemptions_gift_card ON public.gift_card_redemptions(gift_card_id);
CREATE INDEX IF NOT EXISTS idx_gc_redemptions_client ON public.gift_card_redemptions(client_id);

ALTER TABLE public.gift_card_redemptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for service role" ON public.gift_card_redemptions
  FOR ALL USING (auth.role() = 'service_role');

-- ═══ LOYALTY TRANSACTIONS ═══
CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id   UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  points      INTEGER NOT NULL,
  reason      TEXT,
  booking_id  UUID REFERENCES public.bookings(id),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_loyalty_client ON public.loyalty_transactions(client_id);

ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for service role" ON public.loyalty_transactions
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow insert for service role" ON public.loyalty_transactions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ═══ CLIENT VISITS ═══
CREATE TABLE IF NOT EXISTS public.client_visits (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id   UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  booking_id  UUID REFERENCES public.bookings(id),
  services    TEXT[],
  total_gs    INTEGER,
  paid_via    TEXT,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_client_visits_client ON public.client_visits(client_id);

ALTER TABLE public.client_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for service role" ON public.client_visits
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow insert for service role" ON public.client_visits
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ═══ CLIENT PROMO CLAIMS ═══
CREATE TABLE IF NOT EXISTS public.client_promo_claims (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id     UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  promo_slug    TEXT NOT NULL,
  claimed_at    TIMESTAMPTZ DEFAULT now(),
  used_at       TIMESTAMPTZ,
  UNIQUE(client_id, promo_slug)
);

CREATE INDEX IF NOT EXISTS idx_promo_claims_client ON public.client_promo_claims(client_id);

ALTER TABLE public.client_promo_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read for service role" ON public.client_promo_claims
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow insert for anon" ON public.client_promo_claims
  FOR INSERT WITH CHECK (true);

COMMENT ON TABLE public.clients IS 'Clientes de Magnolia — identidad por teléfono';
COMMENT ON TABLE public.gift_cards IS 'Tarjetas de regalo digitales con token de acceso';
COMMENT ON TABLE public.gift_card_redemptions IS 'Auditoría de redenciones de gift cards';
COMMENT ON TABLE public.loyalty_transactions IS 'Transacciones de puntos de lealtad';
COMMENT ON TABLE public.client_visits IS 'Registro de visitas de clientes';
COMMENT ON TABLE public.client_promo_claims IS 'Promociones reclamadas por clientes';
