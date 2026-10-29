-- Moderated company reviews. Public visitors never access these tables directly;
-- the application API returns only approved, sanitized fields.
create table if not exists public.company_reviews (
  id uuid primary key default gen_random_uuid(),
  company_slug text not null check (company_slug ~ '^[a-z0-9-]+$'),
  company_country_code text not null check (company_country_code ~ '^[a-z]{2}$'),
  reviewer_country_code text not null check (reviewer_country_code ~ '^[a-z]{2}$'),
  display_name text check (display_name is null or char_length(display_name) between 2 and 60),
  rating smallint check (rating is null or rating between 1 and 5),
  review_body text not null check (char_length(review_body) between 40 and 1500),
  experience_date date,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  content_hash text not null,
  submitter_hash text not null,
  moderation_note text,
  moderated_by uuid references auth.users(id) on delete set null,
  moderated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_slug, company_country_code, content_hash)
);

create table if not exists public.company_review_reports (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.company_reviews(id) on delete cascade,
  reason text not null check (reason in ('personal_information','spam','abuse','fake_or_misleading','other')),
  details text check (details is null or char_length(details) <= 500),
  reporter_hash text not null,
  status text not null default 'new' check (status in ('new','reviewing','resolved','rejected')),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (review_id, reporter_hash)
);

create index if not exists company_reviews_public_lookup
  on public.company_reviews(company_slug, company_country_code, created_at desc)
  where status = 'approved';
create index if not exists company_reviews_moderation_queue
  on public.company_reviews(status, created_at asc);
create index if not exists company_reviews_rate_limit
  on public.company_reviews(submitter_hash, created_at desc);
create index if not exists company_review_reports_queue
  on public.company_review_reports(status, created_at asc);

alter table public.company_reviews enable row level security;
alter table public.company_review_reports enable row level security;

-- No anon/authenticated SELECT or INSERT policy is intentional. Public traffic
-- goes through validated server routes; the service role bypasses RLS there.
drop policy if exists "admins manage company reviews" on public.company_reviews;
create policy "admins manage company reviews" on public.company_reviews
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage company review reports" on public.company_review_reports;
create policy "admins manage company review reports" on public.company_review_reports
  for all using (public.is_admin()) with check (public.is_admin());

revoke all on public.company_reviews from anon, authenticated;
revoke all on public.company_review_reports from anon, authenticated;
grant select, update, delete on public.company_reviews to authenticated;
grant select, update, delete on public.company_review_reports to authenticated;

