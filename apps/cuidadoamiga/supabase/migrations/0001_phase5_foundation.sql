-- =============================================================================
-- Migration 0001 — Phase 5: Foundational data layer
-- Adds: case_comments, case_reports, case_report_actions, email_subscriptions
-- Plus: cases extensions (visible, estado_anterior, organization_id, approvals_required)
-- Plus: indexes for the search/filter workhorse
-- =============================================================================

-- Enable required extensions (Supabase has these on by default, but be explicit)
create extension if not exists "citext";
create extension if not exists "pg_trgm";
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. case_comments (declared now for stable types; UI in Phase 9)
-- ----------------------------------------------------------------------------
create table if not exists case_comments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  tipo text not null check (tipo in ('solidarity', 'info', 'correction', 'contact')),
  body text not null check (length(body) between 3 and 2000)),
  pinned boolean not null default false,
  visible boolean not null default true,
  creado_en timestamptz not null default now()
);
create index if not exists case_comments_case_id_idx on case_comments(case_id, creado_en desc);
create index if not exists case_comments_user_id_idx on case_comments(user_id);
alter table case_comments enable row level security;

-- Public can read only visible comments on approved cases
create policy "public read visible comments on approved cases"
  on case_comments for select
  using (
    visible = true
    and exists (
      select 1 from cases
      where cases.id = case_comments.case_id
        and cases.estado = 'aprobado'
        and cases.visible = true
    )
  );

-- Users can insert their own comments
create policy "users insert their own comments"
  on case_comments for insert
  with check (auth.uid() = user_id);

-- Users can delete their own comments (mod can delete any)
create policy "users delete their own comments"
  on case_comments for delete
  using (auth.uid() = user_id);

-- Mods can update visibility / pinned status
create policy "mods update comment status"
  on case_comments for update
  using (
    exists (select 1 from moderators where user_id = auth.uid() and role in ('mod', 'owner'))
  );

-- ----------------------------------------------------------------------------
-- 2. case_reports (anonymous-friendly, for the "Report this case" feature)
-- ----------------------------------------------------------------------------
create table if not exists case_reports (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null, -- null for anon
  motivo text not null check (motivo in ('factual_error', 'wrong_photo', 'wrong_person', 'fabricated', 'duplicate', 'other')),
  detalle text check (length(coalesce(detalle, '')) < 1000),
  estado text not null default 'pendiente' check (estado in ('pendiente', 'revisado', 'descartado')),
  email_contacto citext, -- optional, for follow-up
  creado_en timestamptz not null default now()
);
create index if not exists case_reports_case_id_idx on case_reports(case_id, estado, creado_en desc);
create index if not exists case_reports_estado_idx on case_reports(estado, creado_en desc) where estado = 'pendiente';
alter table case_reports enable row level security;

-- Anyone can insert (anon-friendly)
create policy "anyone can report a case"
  on case_reports for insert
  with check (true);

-- Mods read all
create policy "mods read all reports"
  on case_reports for select
  using (
    exists (select 1 from moderators where user_id = auth.uid() and role in ('mod', 'owner'))
  );

-- Mods update
create policy "mods update reports"
  on case_reports for update
  using (
    exists (select 1 from moderators where user_id = auth.uid() and role in ('mod', 'owner'))
  );

-- ----------------------------------------------------------------------------
-- 3. case_report_actions (audit log for "what did the mod do with this report")
-- ----------------------------------------------------------------------------
create table if not exists case_report_actions (
  id bigserial primary key,
  report_id uuid not null references case_reports(id) on delete cascade,
  moderator_id uuid not null references auth.users(id),
  accion text not null check (accion in ('revisado', 'descartado', 'edito_caso', 'elimino_caso')),
  nota text check (length(coalesce(nota, '')) < 500),
  creado_en timestamptz not null default now()
);
create index if not exists case_report_actions_report_id_idx on case_report_actions(report_id, creado_en desc);
alter table case_report_actions enable row level security;

-- Mods read all
create policy "mods read report actions"
  on case_report_actions for select
  using (
    exists (select 1 from moderators where user_id = auth.uid() and role in ('mod', 'owner'))
  );

-- Mods insert
create policy "mods insert report actions"
  on case_report_actions for insert
  with check (
    auth.uid() = moderator_id
    and exists (select 1 from moderators where user_id = auth.uid() and role in ('mod', 'owner'))
  );

-- ----------------------------------------------------------------------------
-- 4. email_subscriptions
-- ----------------------------------------------------------------------------
create table if not exists email_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email citext not null,
  pais text not null,
  tema text not null check (tema in ('nuevos_casos', 'metodologia', 'informe_anual')),
  frecuencia text not null check (frecuencia in ('semanal', 'mensual')) default 'semanal',
  unsubscribe_token text not null unique default encode(gen_random_bytes(32), 'hex'),
  confirmado boolean not null default false,
  confirmado_en timestamptz,
  creado_en timestamptz not null default now()
);
create unique index if not exists email_subscriptions_unique
  on email_subscriptions(email, pais, tema) where confirmado = true;
create index if not exists email_subscriptions_confirmado_pais_idx
  on email_subscriptions(pais, tema) where confirmado = true;
alter table email_subscriptions enable row level security;

-- Anyone can subscribe (no auth needed for sign-up form)
create policy "anyone can create a subscription"
  on email_subscriptions for insert
  with check (true);

-- No one reads other people's subscriptions; we use the unsubscribe token to fetch
-- (handled in API routes via service role)

-- ----------------------------------------------------------------------------
-- 5. Cases table extensions
-- ----------------------------------------------------------------------------
alter table cases add column if not exists visible boolean not null default true;
alter table cases add column if not exists estado_anterior text;
alter table cases add column if not exists organization_id uuid;
alter table cases add column if not exists approvals_required int default 3;

-- Backfill approvals_required for existing cases
update cases set approvals_required = 3 where approvals_required is null;

-- ----------------------------------------------------------------------------
-- 6. Indexes for search/filter (the workhorse of Phase 7 /data page)
-- ----------------------------------------------------------------------------
create index if not exists cases_estado_pais_fecha_idx
  on cases(estado, pais, fecha);
create index if not exists cases_tipo_fecha_idx
  on cases(tipo, fecha) where estado = 'aprobado';
create index if not exists cases_pais_fecha_idx
  on cases(pais, fecha) where estado = 'aprobado';
create index if not exists cases_fulltext_idx
  on cases using gin (
    to_tsvector('spanish',
      coalesce(nombre, '') || ' ' ||
      coalesce(descripcion, '') || ' ' ||
      coalesce(ciudad, '')
    )
  ) where estado = 'aprobado' and visible = true;

-- Trigram index for fuzzy name search (used in the search input)
create index if not exists cases_nombre_trgm_idx
  on cases using gin (nombre gin_trgm_ops) where estado = 'aprobado';

-- ----------------------------------------------------------------------------
-- 7. Stats RPC (used by /data page and the API export)
-- ----------------------------------------------------------------------------
create or replace function get_case_stats(
  p_pais text default null,
  p_year int default null
)
returns json
language sql
stable
as $$
  with filtered as (
    select * from cases
    where estado = 'aprobado' and visible = true
      and (p_pais is null or pais = p_pais)
      and (p_year is null or extract(year from fecha) = p_year)
  )
  select json_build_object(
    'total', (select count(*) from filtered),
    'byPais', (select json_object_agg(pais, count) from (select pais, count(*) from filtered group by pais) s),
    'byTipo', (select json_object_agg(tipo, count) from (select tipo, count(*) from filtered group by tipo) s),
    'byYear', (select json_object_agg(year, count) from (
      select extract(year from fecha)::int as year, count(*) from filtered group by 1
    ) s),
    'byJudicial', (select json_object_agg(coalesce(proceso_judicial, 'no_especificado'), count) from (
      select coalesce(proceso_judicial, 'no_especificado'), count(*) from filtered group by 1
    ) s)
  );
$$;
