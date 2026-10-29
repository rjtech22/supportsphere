-- Run this in Supabase SQL Editor after creating a project.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'viewer' check (role in ('viewer', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  slug text unique not null,
  name text not null,
  summary text not null default '',
  official_domain text not null,
  official_links jsonb not null default '[]'::jsonb,
  common_issues jsonb not null default '[]'::jsonb,
  support_steps jsonb not null default '[]'::jsonb,
  verified_at date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  article_type text not null check (article_type in ('complaint', 'refund', 'cancellation', 'general')),
  body jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  verified_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.monetization_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  link_type text not null check (link_type in ('affiliate', 'sponsored')),
  disclosure text not null,
  company_id uuid references public.companies(id) on delete cascade,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.information_reports (
  id uuid primary key default gen_random_uuid(),
  page_url text not null,
  issue_type text not null,
  details text not null,
  reporter_email text,
  status text not null default 'new' check (status in ('new', 'reviewing', 'resolved', 'rejected')),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.companies enable row level security;
alter table public.articles enable row level security;
alter table public.monetization_links enable row level security;
alter table public.information_reports enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

drop policy if exists "public read categories" on public.categories;
create policy "public read categories" on public.categories for select using (true);
drop policy if exists "public read published companies" on public.companies;
create policy "public read published companies" on public.companies for select using (published or public.is_admin());
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles" on public.articles for select using (published or public.is_admin());
drop policy if exists "public read active monetization" on public.monetization_links;
create policy "public read active monetization" on public.monetization_links for select using (active or public.is_admin());
drop policy if exists "public submit reports" on public.information_reports;
create policy "public submit reports" on public.information_reports for insert with check (status = 'new');

create policy "admins manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage companies" on public.companies for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage articles" on public.articles for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage monetization" on public.monetization_links for all using (public.is_admin()) with check (public.is_admin());
create policy "admins review reports" on public.information_reports for select using (public.is_admin());
create policy "admins update reports" on public.information_reports for update using (public.is_admin()) with check (public.is_admin());
create policy "users read own profile" on public.profiles for select using (id = auth.uid());
create policy "admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- After creating your first Auth user, promote only that known user:
-- insert into public.profiles (id, role) values ('YOUR_AUTH_USER_UUID', 'admin')
-- on conflict (id) do update set role = 'admin';

-- Global, country-specific extension tables.
create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(), code text unique not null check (code ~ '^[a-z]{2}$'),
    name text not null, iso3 text, flag text, native_name text, language_codes jsonb not null default '[]'::jsonb,
    default_locale text not null default 'en', is_active boolean not null default true, is_primary boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

  alter table public.countries add column if not exists iso3 text;
  alter table public.countries add column if not exists flag text;
  alter table public.countries add column if not exists native_name text;
  alter table public.countries add column if not exists language_codes jsonb not null default '[]'::jsonb;
  alter table public.countries add column if not exists default_locale text not null default 'en';

alter table public.companies add column if not exists logo_url text;
alter table public.companies add column if not exists base_category_slug text;

create table if not exists public.company_country_support (
  id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
  country_id uuid not null references public.countries(id) on delete cascade, verification_status text not null default 'needs_review' check (verification_status in ('verified','needs_review','unverified')),
  summary text not null default '', warranty_information text, refund_cancellation_information text, complaint_procedure jsonb not null default '[]'::jsonb,
  escalation_procedure text, grievance_information text, verified_at date, published boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(company_id,country_id)
);

create table if not exists public.support_contacts (
  id uuid primary key default gen_random_uuid(), support_id uuid not null references public.company_country_support(id) on delete cascade,
  contact_type text not null check (contact_type in ('phone','email','support_url','complaint_url','chat','address')),
  label text not null, value text not null, is_official boolean not null default false, sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

-- Global directory expansion: every published contact can carry its own source and review date.
alter table public.companies add column if not exists aliases jsonb not null default '[]'::jsonb;
alter table public.companies add column if not exists regions jsonb not null default '[]'::jsonb;
alter table public.company_country_support add column if not exists support_hours text;
alter table public.company_country_support add column if not exists availability text;
alter table public.company_country_support add column if not exists common_issues jsonb not null default '[]'::jsonb;
alter table public.company_country_support add column if not exists support_types jsonb not null default '[]'::jsonb;
alter table public.company_country_support add column if not exists replacement_information text;
alter table public.company_country_support add column if not exists delivery_tracking_information text;
alter table public.company_country_support add column if not exists billing_payment_information text;
alter table public.company_country_support add column if not exists faq_items jsonb not null default '[]'::jsonb;
alter table public.support_contacts add column if not exists source_url text;
alter table public.support_contacts add column if not exists verified_at date;
alter table public.support_contacts drop constraint if exists support_contacts_contact_type_check;
alter table public.support_contacts add constraint support_contacts_contact_type_check check (contact_type in ('phone','toll_free','technical_phone','sales_phone','whatsapp','email','support_url','complaint_url','help_center','chat','address','hours'));

create table if not exists public.official_sources (
  id uuid primary key default gen_random_uuid(), support_id uuid not null references public.company_country_support(id) on delete cascade,
  label text not null, url text not null, checked_at timestamptz, notes text, created_at timestamptz not null default now()
);

create table if not exists public.complaint_templates (
  id uuid primary key default gen_random_uuid(), slug text unique not null, name text not null,
  template_type text not null check (template_type in ('complaint','refund','warranty','delivery','bank','followup')),
  country_id uuid references public.countries(id) on delete set null, subject_template text not null, body_template text not null,
  published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.affiliate_links (
  id uuid primary key default gen_random_uuid(), affiliate_name text not null, destination_url text not null,
  country_id uuid references public.countries(id) on delete set null, category_id uuid references public.categories(id) on delete set null,
  disclosure_text text not null, status text not null default 'inactive' check (status in ('active','inactive')),
  click_count bigint not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.sponsored_listings (
  id uuid primary key default gen_random_uuid(), company_id uuid references public.companies(id) on delete cascade,
  country_id uuid references public.countries(id) on delete cascade, category_id uuid references public.categories(id) on delete set null,
  label text not null default 'Sponsored', destination_url text not null, starts_at timestamptz not null, ends_at timestamptz not null,
  price numeric(12,2), currency text, status text not null default 'inactive' check (status in ('active','inactive')),
  click_count bigint not null default 0, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table if not exists public.reported_information (
  id uuid primary key default gen_random_uuid(), support_id uuid references public.company_country_support(id) on delete set null,
  page_url text not null, issue_type text not null, details text not null, reporter_email text,
  status text not null default 'new' check (status in ('new','reviewing','resolved','rejected')),
  created_at timestamptz not null default now(), reviewed_at timestamptz
);

create table if not exists public.seo_keywords (
  id uuid primary key default gen_random_uuid(), keyword text not null, search_intent text not null,
  target_country text not null default 'global', target_page text not null,
  keyword_role text not null check (keyword_role in ('primary','secondary')),
  search_volume integer check (search_volume is null or search_volume >= 0), competition text,
  metric_source text, content_status text not null default 'planned' check (content_status in ('published','planned','needs_verification')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(keyword,target_country,target_page)
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade, active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.countries enable row level security;
alter table public.company_country_support enable row level security;
alter table public.support_contacts enable row level security;
alter table public.official_sources enable row level security;
alter table public.complaint_templates enable row level security;
alter table public.affiliate_links enable row level security;
alter table public.sponsored_listings enable row level security;
alter table public.reported_information enable row level security;
alter table public.seo_keywords enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.admin_users where user_id = auth.uid() and active) or exists(select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

create policy "public read countries" on public.countries for select using (is_active or public.is_admin());
create policy "public read published country support" on public.company_country_support for select using (published or public.is_admin());
create policy "public read official contacts" on public.support_contacts for select using (is_official or public.is_admin());
create policy "public read official sources" on public.official_sources for select using (true);
create policy "public read templates" on public.complaint_templates for select using (published or public.is_admin());
create policy "public read active affiliates" on public.affiliate_links for select using (status = 'active' or public.is_admin());
create policy "public read active sponsored" on public.sponsored_listings for select using (status = 'active' and now() between starts_at and ends_at or public.is_admin());
create policy "public submit reported information" on public.reported_information for insert with check (status = 'new');

create policy "admins manage countries" on public.countries for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage country support" on public.company_country_support for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage support contacts" on public.support_contacts for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage official sources" on public.official_sources for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage complaint templates" on public.complaint_templates for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage affiliate links" on public.affiliate_links for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage sponsored listings" on public.sponsored_listings for all using (public.is_admin()) with check (public.is_admin());
create policy "admins review reported information" on public.reported_information for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage seo keywords" on public.seo_keywords for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read admin users" on public.admin_users for select using (public.is_admin());

insert into public.countries (code,name,is_primary) values
('us','United States',true),('in','India',false),('uk','United Kingdom',false),('ca','Canada',false),('au','Australia',false)
on conflict (code) do update set name = excluded.name;

-- Create an Auth user, then grant admin access explicitly:
-- insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
