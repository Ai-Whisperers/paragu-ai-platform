# Supabase schema additions — Maskarada community platform

The monorepo app `apps/maskarada` uses the shared Supabase project `qyvokpribmbrosafntqa`. The Phase 1 launch only needed the `mk_tickets` / `mk_blocklist` / `mk_marketing_list` / `mk_capacity` / `mk_site_config` tables, which were already in place.

Phase 2 introduces 4 new tables for the community platform features. **These need to be created manually in the Supabase SQL editor** before the corresponding features can write to them.

## How to run these

1. Open https://supabase.com/dashboard/project/qyvokpribmbrosafntqa/sql
2. Paste each block, run
3. Verify with `select * from mk_vendors limit 1;` (will be empty)

## Schema

### mk_vendors (vendor applications + approved vendor directory)

```sql
create table if not exists mk_vendors (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  description text,
  category text not null check (category in (
    'ropes', 'impact', 'sensory', 'leather', 'apparel', 'wellness', 'workshops', 'media', 'other'
  )),
  owner_name text not null,
  owner_email text not null,
  owner_phone text not null,
  instagram text,
  website text,
  logo_url text,
  product_count text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'suspended')),
  commission_pct numeric default 10,
  created_at timestamptz default now(),
  approved_at timestamptz
);
create index if not exists idx_mk_vendors_status on mk_vendors (status);
create index if not exists idx_mk_vendors_slug on mk_vendors (slug);

-- RLS: public can read approved vendors, anyone can submit applications
alter table mk_vendors enable row level security;

create policy "Public can read approved vendors"
  on mk_vendors for select
  using (status = 'approved');

create policy "Anyone can apply (insert with status=pending)"
  on mk_vendors for insert
  with check (status = 'pending');
```

### mk_events (calendar of upcoming + past events)

```sql
create table if not exists mk_events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  subtitle text,
  event_date timestamptz not null,
  end_date timestamptz,
  address text,
  address_maps_url text,
  description text,
  dresscode text,
  ticket_url text,
  capacity int,
  hero_image text,
  status text not null default 'upcoming' check (status in ('upcoming', 'past', 'cancelled')),
  featured boolean default false,
  created_at timestamptz default now()
);
create index if not exists idx_mk_events_date on mk_events (event_date desc);
create index if not exists idx_mk_events_status on mk_events (status);

alter table mk_events enable row level security;
create policy "Events are public to read"
  on mk_events for select using (true);
-- Writes via service role only (admin)
```

### mk_articles (learn section + blog)

```sql
create table if not exists mk_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body_markdown text not null,
  category text not null check (category in (
    'foundations', 'safety', 'communication', 'logistics', 'glossary', 'community', 'events', 'editorial'
  )),
  author text,
  read_minutes int default 5,
  hero_image text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_mk_articles_pub on mk_articles (published, published_at desc);
create index if not exists idx_mk_articles_category on mk_articles (category);

alter table mk_articles enable row level security;
create policy "Published articles are public"
  on mk_articles for select using (published = true);
-- Writes via service role only (admin)
```

### mk_activities (catalog of kink practices)

```sql
create table if not exists mk_activities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  emoji text,
  tagline text,
  short_desc text,
  long_desc text,
  physical_risk text check (physical_risk in ('low', 'medium', 'high')),
  consent_complexity text check (consent_complexity in ('low', 'medium', 'high')),
  beginner_friendly boolean default false,
  duration text,
  equipment text[],
  safety_notes text[],
  beginner_tips text[],
  related_activities text[],
  order_index int default 0,
  published boolean default true,
  created_at timestamptz default now()
);
create index if not exists idx_mk_activities_order on mk_activities (order_index);

alter table mk_activities enable row level security;
create policy "Activities are public to read"
  on mk_activities for select using (published = true);
-- Writes via service role only
```

## Initial seed data

The `lib/activities.ts` and `lib/guides.ts` files contain the canonical content for 6 activities + 6 guides. Until Phase 3 (when these are stored in the DB for admin editing), they're rendered directly from the TS files. The SQL tables above are for when we want to make them admin-editable later.

For Phase 2 launch, **the `lib/*.ts` content is sufficient** — the SQL tables are forward-compatibility.

## Vendor application flow (current)

1. User fills out `/tienda/aplicar`
2. Form writes to `mk_vendors` with `status='pending'` (if Supabase URL is configured and table exists; otherwise form succeeds silently for UX testing)
3. Admin reviews applications via Supabase dashboard (no admin UI yet — Phase 4 will add this)
4. Admin sets `status='approved'` → vendor becomes visible on `/tienda` (currently the public listing only shows Moñai from the local TS file; approved vendors from DB will be added in Phase 3)

## Setup env vars

For the form to actually persist to Supabase, the monorepo needs:

```
NEXT_PUBLIC_SUPABASE_URL=https://qyvokpribmbrosafntqa.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<from ~/.hermes/.env>
```

Currently neither is set in the deploy env. The form works in a "graceful no-op" mode (success state always shows) so the UX is testable. Once env vars are added to the Docker build context (via `docker-compose.yml` env block), the form will start persisting.

**To set up env vars for the Docker service:**

```yaml
# in apps/maskarada/docker-compose.yml — add to web service:
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_SUPABASE_URL=https://qyvokpribmbrosafntqa.supabase.co
  - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
```

Plus a `.env` file at the project root or in `apps/maskarada/` (not committed, in `.gitignore`) with the actual values.
