-- =============================================================================
-- Cuidado Amiga — Supabase schema
--
-- Inherited from Ai-Whisperers/cuidadoamiga-fork (commit 30bafef, Phase 1).
-- The single consolidated schema replaces the 6 incremental schema_v*.sql
-- files in the original repo.
--
-- Security model: see header comments in cuiddo-amiga-fork's supabase/schema.sql
-- Public (anon) can read only `estado='aprobado'` cases and insert cases with
-- `estado='pendiente'`. Moderators + owners have scoped access via the
-- `moderators` table. Atomic state transitions via `tally_case_votes()`.
-- =============================================================================

create extension if not exists "pgcrypto";

-- 1. moderators — explicit role table
create table if not exists moderators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'mod' check (role in ('mod', 'owner')),
  display_name text,
  country text,
  created_at timestamptz default now()
);
alter table moderators enable row level security;
create policy "mods read moderators" on moderators for select to authenticated using (true);
create policy "owners manage moderators" on moderators for all to authenticated
  using (exists (select 1 from moderators m where m.user_id = auth.uid() and m.role = 'owner'))
  with check (exists (select 1 from moderators m where m.user_id = auth.uid() and m.role = 'owner'));

-- 2. cases
create table if not exists cases (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  victima text,
  fecha date not null,
  tipo text not null check (tipo in ('femicidio', 'abuso', 'acoso')),
  pais text not null,
  ciudad text,
  descripcion text,
  foto_url text,
  fuentes text[] default '{}',
  proceso_judicial text check (proceso_judicial in ('en_proceso', 'cerrado')),
  lat double precision not null,
  lng double precision not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'aprobado', 'rechazado')),
  creado_at timestamptz default now(),
  actualizado_at timestamptz default now()
);
create index if not exists cases_estado_idx on cases(estado);
create index if not exists cases_tipo_idx on cases(tipo);
create index if not exists cases_pais_idx on cases(pais);
create index if not exists cases_ciudad_idx on cases(ciudad);
create index if not exists cases_fecha_idx on cases(fecha desc);
alter table cases enable row level security;
create policy "public read approved" on cases for select using (estado = 'aprobado');
create policy "public insert pendiente" on cases for insert with check (estado = 'pendiente');
create policy "mods read all cases" on cases for select to authenticated
  using (exists (select 1 from moderators m where m.user_id = auth.uid()));

-- 3. validaciones — 3-moderator approval
create table if not exists validaciones (
  id uuid default gen_random_uuid() primary key,
  caso_id uuid not null references cases(id) on delete cascade,
  moderadora_id uuid not null references auth.users(id),
  decision text not null check (decision in ('aprobado', 'rechazado')),
  motivo_rechazo text,
  created_at timestamptz default now(),
  unique(caso_id, moderadora_id)
);
create index if not exists validaciones_caso_idx on validaciones(caso_id);
create index if not exists validaciones_moderadora_idx on validaciones(moderadora_id);
alter table validaciones enable row level security;
create policy "mods read validaciones" on validaciones for select to authenticated
  using (exists (select 1 from moderators m where m.user_id = auth.uid()));
create policy "mods insert own validacion" on validaciones for insert to authenticated
  with check (
    moderadora_id = auth.uid()
    and exists (select 1 from moderators m where m.user_id = auth.uid())
  );

-- 4. tally_case_votes — atomic state transition
create or replace function tally_case_votes(p_caso_id uuid) returns void
language plpgsql security definer as $$
declare
  v_approvals int;
  v_rejections int;
  v_current_estado text;
begin
  select estado into v_current_estado from cases where id = p_caso_id;
  if v_current_estado is null or v_current_estado <> 'pendiente' then return; end if;
  select
    count(*) filter (where decision = 'aprobado'),
    count(*) filter (where decision = 'rechazado')
  into v_approvals, v_rejections
  from validaciones where caso_id = p_caso_id;
  if v_rejections >= 1 then
    update cases set estado = 'rechazado', actualizado_at = now() where id = p_caso_id;
  elsif v_approvals >= 3 then
    update cases set estado = 'aprobado', actualizado_at = now() where id = p_caso_id;
  end if;
end; $$;

create or replace function trg_tally_after_validacion() returns trigger
language plpgsql as $$
begin
  perform tally_case_votes(new.caso_id);
  return new;
end; $$;

drop trigger if exists validaciones_tally on validaciones;
create trigger validaciones_tally
  after insert on validaciones
  for each row execute function trg_tally_after_validacion();

-- 5. solicitudes_moderadoras
create table if not exists solicitudes_moderadoras (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  mail text not null,
  pais text not null,
  organizacion text,
  motivo text not null,
  como_se_entero text not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'aprobada', 'rechazada')),
  creado_at timestamptz default now()
);
alter table solicitudes_moderadoras enable row level security;
create policy "mods read solicitudes" on solicitudes_moderadoras for select to authenticated
  using (exists (select 1 from moderators m where m.user_id = auth.uid()));
create policy "public insert solicitud" on solicitudes_moderadoras for insert with check (true);

-- 6. case_edits — audit log
create table if not exists case_edits (
  id uuid default gen_random_uuid() primary key,
  case_id uuid not null references cases(id) on delete cascade,
  moderator_id uuid not null references auth.users(id),
  changes jsonb not null,
  reason text,
  created_at timestamptz default now()
);
create index if not exists case_edits_case_idx on case_edits(case_id);
alter table case_edits enable row level security;
create policy "mods read case_edits" on case_edits for select to authenticated
  using (exists (select 1 from moderators m where m.user_id = auth.uid()));
create policy "mods insert case_edits" on case_edits for insert to authenticated
  with check (
    moderator_id = auth.uid()
    and exists (select 1 from moderators m where m.user_id = auth.uid())
  );
