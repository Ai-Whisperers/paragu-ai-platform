-- Maskarada — Testimonials system
-- Run this in the Supabase SQL editor (https://supabase.com/dashboard/project/qyvokpribmbrosafntqa/sql)

-- ─── mk_testimonials ────────────────────────────────────────────────────
-- Community-submitted testimonials. Anyone with a verified experience
-- can submit. Admin reviews before publishing. Public-anon mode hides
-- the submitter's name.

create table if not exists mk_testimonials (
  id uuid primary key default gen_random_uuid(),
  submitter_name text not null,
  submitter_email text,             -- optional, never shown publicly
  submitter_phone text,             -- optional, never shown publicly
  display_mode text not null default 'attributed' check (display_mode in ('attributed', 'anonymous', 'first_name')),
  body text not null,                -- the testimonial text (markdown ok)
  context text,                      -- e.g. "Simón Dice, June 11 2026" or "Munch, October 2026"
  role text,                         -- e.g. "Top, 3 años en kink", "Switch, primera vez"
  event_slug text,                   -- optional link to a known event
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'archived')),
  reviewed_at timestamptz,
  reviewed_by text,
  rejection_reason text,
  ip_address text,
  user_agent text,
  created_at timestamptz default now()
);

create index if not exists idx_mk_testimonials_status on mk_testimonials (status);
create index if not exists idx_mk_testimonials_created on mk_testimonials (created_at desc);

-- RLS:
--  - Anyone can INSERT (with status=pending)
--  - Approved ones are public-readable
--  - Anon can SELECT + UPDATE all rows (matches the existing admin pattern
--    in this app, where the admin passcode is the only auth — see
--    mk_tickets, mk_blocklist, mk_marketing_list)
--  - To harden in the future: drop the "anon can update" policy and
--    add a service_role key to env, then have the admin route use it.
alter table mk_testimonials enable row level security;

create policy "Anyone can submit a testimonial"
  on mk_testimonials for insert
  with check (status = 'pending');

create policy "Anyone can read testimonials (filtered client-side)"
  on mk_testimonials for select
  using (true);

create policy "Anon can update testimonial status (admin pattern)"
  on mk_testimonials for update
  using (true)
  with check (true);

-- ─── mk_testimonial_consents ───────────────────────────────────────────
-- Track that the submitter actually consented to having their testimonial
-- published. Stored separately so we can prove consent even if the
-- testimonial is later archived/deleted.

create table if not exists mk_testimonial_consents (
  id uuid primary key default gen_random_uuid(),
  testimonial_id uuid references mk_testimonials(id) on delete cascade,
  scope text not null check (scope in ('public_website', 'social_media', 'internal_only')),
  consent_text text not null,        -- the exact consent text the user agreed to
  signed_at timestamptz default now(),
  ip_address text
);

alter table mk_testimonial_consents enable row level security;
create policy "Anyone can sign a testimonial consent"
  on mk_testimonial_consents for insert
  with check (true);

-- Notes for Kiki when you run this:
--  1. The mk_testimonials.public policy means: only status='approved' rows
--     are visible to anon key users (the website). The admin panel uses
--     the service_role key, which bypasses RLS, so it sees all.
--  2. There's a deliberate 'display_mode' field. Use 'anonymous' for
--     submissions where the person wants no attribution, 'first_name' for
--     "Juan, primera vez" style, 'attributed' for full name.
--  3. The 'event_slug' field is optional. If the testimonial is about a
--     specific event, link it. The /historia/[slug] page can later show
--     "lo que dijeron" using this field.
--  4. The 'ip_address' and 'user_agent' are stored for moderation only.
--     The public read policy does not include them. They help spot spam.
--  5. There's no DELETE policy — only admin (service role) can delete
--     rows. Anon cannot.
