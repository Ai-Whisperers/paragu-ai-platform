-- Maskarada — Photo upload system
-- Run this in the Supabase SQL editor after docs/testimonials-sql.md and docs/aliados-sql.md.

-- ─── mk_photo_submissions ──────────────────────────────────────────────
-- Anyone (anon) can submit a link to a Google Drive / Dropbox / etc.
-- folder with photos from an event. Admin reviews, downloads the good
-- ones, uploads to Supabase Storage (mk_photos bucket), and publishes
-- to the event's /galeria/[slug] page.

create table if not exists mk_photo_submissions (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,                -- /galeria/2026-06-11-simondice, etc.
  submitter_name text not null,
  submitter_email text,                     -- optional, private
  submitter_whatsapp text,                  -- optional, for follow-up
  source_url text not null,                 -- the Drive / Dropbox / etc. URL
  source_type text,                         -- "google_drive" | "dropbox" | "onedrive" | "instagram" | "other"
  photo_count_estimate int,                 -- best guess of how many photos
  context text,                             -- "estaba en la Zona Cuerdas", etc.
  status text not null default 'pending' check (status in (
    'pending', 'downloading', 'curating', 'published', 'rejected', 'archived'
  )),
  reviewed_at timestamptz,
  reviewed_by text,
  rejection_reason text,
  internal_notes text,                      -- team's running notes on this submission
  created_at timestamptz default now()
);

create index if not exists idx_mk_photo_submissions_status on mk_photo_submissions (status);
create index if not exists idx_mk_photo_submissions_event on mk_photo_submissions (event_slug);

-- RLS: anon can insert, anon can read own (matched by email). Admin reads all.
alter table mk_photo_submissions enable row level security;
create policy "Anyone can submit photos"
  on mk_photo_submissions for insert
  with check (status = 'pending');
create policy "Anyone can read submissions (filtered client-side)"
  on mk_photo_submissions for select
  using (true);
create policy "Anon can update submissions (admin pattern)"
  on mk_photo_submissions for update
  using (true)
  with check (true);

-- ─── mk_photos ────────────────────────────────────────────────────────
-- The curated photo archive. Once admin pulls a batch of photos
-- from a submission, each accepted photo gets a row here.
-- The actual file is in Supabase Storage under the `mk_photos` bucket.

create table if not exists mk_photos (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,               -- path inside the mk_photos bucket
  event_slug text not null,                -- which event this photo is from
  submitted_by_submission uuid references mk_photo_submissions(id) on delete set null,
  caption text,                             -- short description (1 line)
  context text,                             -- zone, time, vibe
  people_identified text[],                 -- array of names/pseudonyms of people in the photo (empty by default)
  width int,
  height int,
  taken_at timestamptz,                     -- when the photo was taken (from EXIF if available)
  status text not null default 'pending' check (status in (
    'pending', 'approved', 'rejected', 'archived'
  )),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_mk_photos_event on mk_photos (event_slug);
create index if not exists idx_mk_photos_status on mk_photos (status);

alter table mk_photos enable row level security;
create policy "Approved photos are public"
  on mk_photos for select
  using (true);  -- client-side filters to status=approved
create policy "Anon can update photo status (admin pattern)"
  on mk_photos for update
  using (true)
  with check (true);

-- ─── Storage bucket (run this in the Supabase dashboard Storage section) ─
-- Create a public bucket called `mk_photos`.
-- Folder structure: /{event_slug}/{filename.jpg}
-- Public-readable so the website can serve them directly.

-- Notes for Kiki:
--  1. The /api/photos/submit endpoint writes a row to mk_photo_submissions.
--     Status is 'pending'. The team reviews in /admin/photos.
--  2. /admin/photos lets you mark a submission as "downloading" → admin
--     manually downloads from the source URL → uploads to Storage
--     (mk_photos/{event_slug}/) → creates a row in mk_photos for each →
--     marks submission "published".
--  3. The /galeria/[event-slug] page reads from mk_photos WHERE
--     event_slug = X AND status = 'approved', ordered by taken_at.
--  4. We do NOT automatically scrape Google Drive — public-link scraping
--     works but most photographers keep their folders private. The
--     "paste a link" UX is the lightest-weight way to get the URLs.
--     When a photographer shares "this folder", paste the URL, the team
--     opens it in a browser, downloads what they want, uploads to
--     Supabase Storage.
--  5. The /subir-fotos/[event-slug] page is a public form. No login.
--  6. Per-event galleries: /galeria/[event-slug] (new in Phase 4.10).
