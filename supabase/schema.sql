-- Carte Google Avis — schéma MVP
-- À exécuter dans le SQL Editor du projet Supabase.

create extension if not exists "pgcrypto";

create table if not exists public.merchants (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  slug text unique not null,
  google_review_url text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint merchants_business_name_not_blank check (length(trim(business_name)) > 0),
  constraint merchants_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint merchants_google_review_url_https check (google_review_url ~ '^https://')
);

create table if not exists public.scans (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid not null references public.merchants(id) on delete cascade,
  created_at timestamptz not null default now(),
  user_agent text,
  referer text
);

create index if not exists scans_merchant_id_idx on public.scans(merchant_id);
create index if not exists scans_created_at_idx on public.scans(created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists merchants_set_updated_at on public.merchants;
create trigger merchants_set_updated_at
before update on public.merchants
for each row execute function public.set_updated_at();

-- Toutes les opérations de ce MVP passent par le serveur Next.js avec la clé
-- service_role. Aucune table n'est directement accessible depuis le navigateur.
alter table public.merchants enable row level security;
alter table public.scans enable row level security;

-- Donnée de démonstration. Remplacer l'URL depuis le dashboard avant production.
insert into public.merchants (business_name, slug, google_review_url, is_active)
values (
  'La Table de Camille',
  'la-table-de-camille',
  'https://g.page/r/placeholder/review',
  true
)
on conflict (slug) do update set
  business_name = excluded.business_name,
  google_review_url = excluded.google_review_url,
  is_active = excluded.is_active;
