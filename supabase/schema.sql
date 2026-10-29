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
  language_code text not null default 'en', target_country text not null default 'global', target_page text not null,
  keyword_role text not null check (keyword_role in ('primary','secondary')),
  search_volume integer check (search_volume is null or search_volume >= 0), competition text,
  metric_source text, content_status text not null default 'planned' check (content_status in ('published','planned','needs_verification')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(keyword,target_country,target_page)
);
alter table public.seo_keywords add column if not exists language_code text not null default 'en';
alter table public.seo_keywords drop constraint if exists seo_keywords_keyword_target_country_target_page_key;
create unique index if not exists seo_keywords_locale_target_key on public.seo_keywords(keyword,language_code,target_country,target_page);

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
('us','United States',true),('in','India',false),('gb','United Kingdom',false),('ca','Canada',false),('au','Australia',false)
on conflict (code) do update set name = excluded.name;

-- Create an Auth user, then grant admin access explicitly:
-- insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');

-- Safe operations: reminders and link checks never auto-publish or replace contact data.
create table if not exists public.verification_reminders (
  id uuid primary key default gen_random_uuid(), support_id uuid not null unique references public.company_country_support(id) on delete cascade,
  reason text not null, status text not null default 'open' check (status in ('open','resolved','dismissed')),
  due_at timestamptz not null default now(), resolved_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.link_checks (
  id uuid primary key default gen_random_uuid(), source_id uuid not null unique references public.official_sources(id) on delete cascade,
  support_id uuid references public.company_country_support(id) on delete cascade, url text not null, http_status integer,
  final_url text, is_working boolean not null default false, error_message text, checked_at timestamptz not null default now()
);
create table if not exists public.traffic_metrics_daily (
  id uuid primary key default gen_random_uuid(), metric_date date not null unique, organic_users integer not null default 0,
  organic_sessions integer not null default 0, impressions integer not null default 0, clicks integer not null default 0,
  source text not null default 'google', imported_at timestamptz not null default now()
);
create table if not exists public.search_query_metrics (
  id uuid primary key default gen_random_uuid(), metric_date date not null, query text not null, page text not null default '', country text not null default '',
  language_code text not null default '', device text not null default '', search_type text not null default 'web', seo_keyword_id uuid references public.seo_keywords(id) on delete set null,
  clicks integer not null default 0, impressions integer not null default 0, position numeric, imported_at timestamptz not null default now(), unique(metric_date,query,page,country,language_code,device,search_type)
);
alter table public.search_query_metrics add column if not exists language_code text not null default '';
alter table public.search_query_metrics add column if not exists device text not null default '';
alter table public.search_query_metrics add column if not exists search_type text not null default 'web';
alter table public.search_query_metrics add column if not exists seo_keyword_id uuid references public.seo_keywords(id) on delete set null;
alter table public.search_query_metrics drop constraint if exists search_query_metrics_metric_date_query_page_country_key;
create unique index if not exists search_query_metrics_dimensions_key on public.search_query_metrics(metric_date,query,page,country,language_code,device,search_type);
create table if not exists public.search_console_import_runs (
  id uuid primary key default gen_random_uuid(), property_url text not null, start_date date not null, end_date date not null,
  status text not null default 'running' check (status in ('running','completed','failed')),
  rows_imported integer not null default 0, error_message text, started_at timestamptz not null default now(), completed_at timestamptz
);
create table if not exists public.ad_placements (
  id uuid primary key default gen_random_uuid(), placement_key text not null unique, label text not null, adsense_slot_id text,
  page_pattern text not null default '*', enabled boolean not null default false, updated_at timestamptz not null default now()
);
alter table public.verification_reminders enable row level security;
alter table public.link_checks enable row level security;
alter table public.traffic_metrics_daily enable row level security;
alter table public.search_query_metrics enable row level security;
alter table public.search_console_import_runs enable row level security;
alter table public.ad_placements enable row level security;
drop policy if exists "admins manage verification reminders" on public.verification_reminders;
create policy "admins manage verification reminders" on public.verification_reminders for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins read link checks" on public.link_checks;
create policy "admins read link checks" on public.link_checks for select using (public.is_admin());
drop policy if exists "admins read traffic metrics" on public.traffic_metrics_daily;
create policy "admins read traffic metrics" on public.traffic_metrics_daily for select using (public.is_admin());
drop policy if exists "admins read search metrics" on public.search_query_metrics;
create policy "admins read search metrics" on public.search_query_metrics for select using (public.is_admin());
drop policy if exists "admins manage search console imports" on public.search_console_import_runs;
create policy "admins manage search console imports" on public.search_console_import_runs for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins manage ad placements" on public.ad_placements;
create policy "admins manage ad placements" on public.ad_placements for all using (public.is_admin()) with check (public.is_admin());

-- Moderated company reviews. Keep this block in sync with
-- supabase/migrations/20261030_company_reviews.sql.
create table if not exists public.company_reviews (
  id uuid primary key default gen_random_uuid(), company_slug text not null check (company_slug ~ '^[a-z0-9-]+$'),
  company_country_code text not null check (company_country_code ~ '^[a-z]{2}$'), reviewer_country_code text not null check (reviewer_country_code ~ '^[a-z]{2}$'),
  display_name text check (display_name is null or char_length(display_name) between 2 and 60), rating smallint check (rating is null or rating between 1 and 5),
  review_body text not null check (char_length(review_body) between 40 and 1500), experience_date date,
  status text not null default 'pending' check (status in ('pending','approved','rejected')), content_hash text not null, submitter_hash text not null,
  moderation_note text, moderated_by uuid references auth.users(id) on delete set null, moderated_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(company_slug,company_country_code,content_hash)
);
create table if not exists public.company_review_reports (
  id uuid primary key default gen_random_uuid(), review_id uuid not null references public.company_reviews(id) on delete cascade,
  reason text not null check (reason in ('personal_information','spam','abuse','fake_or_misleading','other')),
  details text check (details is null or char_length(details) <= 500), reporter_hash text not null,
  status text not null default 'new' check (status in ('new','reviewing','resolved','rejected')),
  reviewed_by uuid references auth.users(id) on delete set null, reviewed_at timestamptz, created_at timestamptz not null default now(), unique(review_id,reporter_hash)
);
create index if not exists company_reviews_public_lookup on public.company_reviews(company_slug,company_country_code,created_at desc) where status='approved';
create index if not exists company_reviews_moderation_queue on public.company_reviews(status,created_at asc);
create index if not exists company_reviews_rate_limit on public.company_reviews(submitter_hash,created_at desc);
create index if not exists company_review_reports_queue on public.company_review_reports(status,created_at asc);
alter table public.company_reviews enable row level security;
alter table public.company_review_reports enable row level security;
drop policy if exists "admins manage company reviews" on public.company_reviews;
create policy "admins manage company reviews" on public.company_reviews for all using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins manage company review reports" on public.company_review_reports;
create policy "admins manage company review reports" on public.company_review_reports for all using (public.is_admin()) with check (public.is_admin());
revoke all on public.company_reviews from anon, authenticated;
revoke all on public.company_review_reports from anon, authenticated;
grant select, update, delete on public.company_reviews to authenticated;
grant select, update, delete on public.company_review_reports to authenticated;
