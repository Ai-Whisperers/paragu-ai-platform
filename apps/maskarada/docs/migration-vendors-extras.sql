-- Add to docs/supabase-schema.md as an extension.
-- Run in the Supabase SQL editor.

alter table mk_vendors
  add column if not exists category_label text,
  add column if not exists commission_pct numeric default 10,
  add column if not exists approved_at timestamptz;

-- Indexes for the vendor listing (when we wire DB vendors into /tienda)
create index if not exists idx_mk_vendors_status_created
  on mk_vendors (status, created_at desc);
