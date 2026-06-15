-- Supabase table for the digital photo consent model release form.
-- Run this in the Supabase SQL editor (https://supabase.com/dashboard/project/qyvokpribmbrosafntqa/sql)
-- after the vendor tables from docs/supabase-schema.md.

create table if not exists mk_photo_consents (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  signer_name text not null,
  signer_email text,
  signer_phone text,
  scope text not null check (scope in ('public_website', 'social_media', 'internal_only')),
  signed_at timestamptz default now(),
  ip_address text,
  notes text,
  revoked_at timestamptz
);
create index if not exists idx_mk_photo_consents_event on mk_photo_consents (event_id);
create index if not exists idx_mk_photo_consents_signer on mk_photo_consents (signer_name);

-- RLS: anyone can submit (insert) — that's the QR code at the door.
-- Only the admin (service role) can read.
alter table mk_photo_consents enable row level security;

create policy "Anyone can sign a photo consent"
  on mk_photo_consents for insert
  with check (true);

-- No SELECT policy on anon role — only the service role (admin UI)
-- can read the full consent list. Public users can sign; they can't
-- see who else signed. (If you want a public opt-out list, add a
-- separate revoked_at view; not in MVP.)
