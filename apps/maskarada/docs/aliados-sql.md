-- Maskarada — Allies & Partners system
-- Run this in the Supabase SQL editor (https://supabase.com/dashboard/project/qyvokpribmbrosafntqa/sql)
-- after the testimonials SQL (docs/testimonials-sql.md).

-- ─── mk_aliados ───────────────────────────────────────────────────────
-- Sister orgs, vendors, and adjacent communities maškaráda is in dialogue
-- with. Submitted by anyone, curated by the team. Public-readable when
-- 'approved'.

create table if not exists mk_aliados (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null check (category in (
    'lgtbi_org',           -- LGTBI+ rights / community org
    'sex_positive',        -- sex-positive / education collective
    'kink_org',            -- kink/leather/fetish community
    'wellness',            -- therapy / wellness
    'craft',               -- local crafters (leather, rope, candles...)
    'media',               -- press, podcast, magazine
    'venue',               -- bars, clubs, performance spaces
    'other'
  )),
  scope text not null check (scope in ('py', 'latam', 'international')),
  city text,                  -- "Asunción", "São Paulo", etc
  country text,                -- "PY", "BR", "AR", etc
  description text,            -- 1-2 sentence tagline
  website text,
  instagram text,
  contact_email text,
  contact_phone text,
  relationship text,           -- free text: "cross-promotion", "shared event", "referral", "hosted at our space", "kindred community"
  status text not null default 'pending' check (status in ('pending', 'approved', 'archived')),
  created_at timestamptz default now()
);

create index if not exists idx_mk_aliados_status on mk_aliados (status);
create index if not exists idx_mk_aliados_category on mk_aliados (category);
create index if not exists idx_mk_aliados_scope on mk_aliados (scope);

-- RLS: matches mk_vendors pattern
alter table mk_aliados enable row level security;

create policy "Public can read approved aliados"
  on mk_aliados for select
  using (true);  -- client-side filters to status=approved (matches admin pattern)

create policy "Anyone can submit an aliado"
  on mk_aliados for insert
  with check (status = 'pending');

create policy "Anon can update aliado status (admin pattern)"
  on mk_aliados for update
  using (true)
  with check (true);

-- ─── mk_colaborar_suggestions ──────────────────────────────────────────
-- Catch-all for the missing orgs/vendors the community needs but
-- doesn't have. "We need an X in Paraguay — does anyone want to
-- start one?" Anyone can submit, public can read approved.

create table if not exists mk_colaborar_suggestions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in (
    'ally_missing',     -- an org/collective we wish existed
    'vendor_missing',   -- a product/service category we want but don't have
    'space_missing',    -- a venue we need
    'role_missing',     -- a community role we need (translator, photographer, etc.)
    'event_idea'        -- an event Kiki hasn't tried
  )),
  title text not null,
  description text not null,
  contact_optional text,        -- if you ARE this person and want to do it
  status text not null default 'open' check (status in ('open', 'claimed', 'in_progress', 'done', 'declined')),
  claimed_by text,
  claimed_at timestamptz,
  notes text,                   -- admin notes
  created_at timestamptz default now()
);

create index if not exists idx_mk_colaborar_status on mk_colaborar_suggestions (status);

alter table mk_colaborar_suggestions enable row level security;
create policy "Public can read open colabor suggestions"
  on mk_colaborar_suggestions for select
  using (true);
create policy "Anyone can suggest a collaboration"
  on mk_colaborar_suggestions for insert
  with check (true);
create policy "Anon can update colabor (admin pattern)"
  on mk_colaborar_suggestions for update
  using (true)
  with check (true);

-- Notes for Kiki when you run this:
--  1. mk_aliados is a curated directory. Anyone can suggest a new one
--     via /aliados/sugerir. Admin (service role) approves.
--  2. mk_colaborar_suggestions is for THINGS THAT DON'T EXIST YET.
--     A real example: "We need a queer therapy collective in
--     Asunción. Anyone interested in starting one?" — anyone can
--     claim it, the contact_optional field says "I could be that person."
--  3. The 'kind' enum covers 4 categories of missing-things.
--  4. Both tables match the existing admin pattern: anon can SELECT +
--     UPDATE, with the admin passcode as the only auth. To harden,
--     add a service_role key to env and tighten the policies.
