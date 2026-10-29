# SupportSphere automation architecture audit

Date: 2026-10-30  
Scope: local implementation only. Nothing in this change set was pushed or deployed.

## Already complete before this audit

- Next.js App Router website with English, Tamil, Hindi and French locale routes.
- ISO 3166-1 catalog containing 249 countries and territories with a searchable country selector.
- Supabase schema with admin roles, countries, companies, country support records, contacts, official sources, guides/templates, reports, affiliates and sponsored listings.
- Secure Supabase password login and server-side admin authorization. There is no fake or fallback admin login.
- Canonicals, hreflang alternatives, structured data, robots and sitemap support.
- GA4 loader and product events including search, no-result search, company/guide views, generator use and official support clicks.
- AdSense publisher and slot environment-variable readiness. Approval is not assumed.

## Implemented in this change set

### Secure one-time administration

- Added `scripts/setup-admin.mjs` and `npm run setup:admin`.
- The script requires the Supabase service-role key plus a chosen email and a 12+ character password.
- It creates or resolves the Auth user and grants access in both `profiles` and `admin_users`.
- The service-role key is server-only and is never exposed through a `NEXT_PUBLIC_` variable.

### Database-driven publishing

- Added `lib/database-content.ts` as the public publication repository.
- Local verified content remains as a safe fallback.
- Database records override fallback records only when all of these are true:
  - country support record is published;
  - verification status is `verified`;
  - a verification date exists;
  - an official support URL exists;
  - at least one official source exists.
- Homepage, country pages, category pages, company pages, search, metadata and sitemap now consume the merged publication repository.
- Country pages are created by routing/data, not by manually adding a component for every country.
- Countries with no verified company data remain useful search destinations but are excluded from the indexable sitemap.

### Verification and broken-link automation

- Added a protected weekly Vercel Cron endpoint at `/api/automation/verify-support-links`.
- The endpoint checks a bounded batch of official-source URLs, records status/final URL/error and creates reminders for published records older than 90 days.
- Invalid, credential-bearing, localhost and private-network URLs are rejected.
- Automation never invents, replaces, verifies or publishes a phone number, email or policy.
- Added admin operations views for overdue verification records and failed official links.

### Analytics, traffic and monetization controls

- Added a consent banner and Google Consent Mode defaults. Analytics and advertising storage default to denied.
- AdSense script and ad-slot initialization wait for affirmative optional-cookie consent.
- Added data tables and an admin dashboard for imported organic users, Search Console clicks/impressions and top queries.
- The dashboard clearly shows an empty connection state and does not claim live Google data.
- Added database-backed ad placement controls. AdSense slot IDs remain disabled until the owner has approval and explicitly enables them.

## Database migration required before deployment

Run the appended section of `supabase/schema.sql` in the existing SupportSphere Supabase project. It adds:

- `verification_reminders`
- `link_checks`
- `traffic_metrics_daily`
- `search_query_metrics`
- `ad_placements`
- admin-only RLS policies for these tables

This migration was intentionally not applied to production in this task.

## Required server configuration

The exact variable names are documented in `.env.example`:

- `SUPABASE_SERVICE_ROLE_KEY` — server only; required by the cron and one-time bootstrap.
- `CRON_SECRET` — long random value used to authorize the cron endpoint.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` — temporary local values used only for `npm run setup:admin`; remove immediately afterward.
- Existing public Supabase URL/anon key and GA measurement ID remain required.
- `NEXT_PUBLIC_ADSENSE_CLIENT` and slot IDs must stay blank until AdSense approval.

Traffic dashboard import readiness variables:

- `GOOGLE_SEARCH_CONSOLE_SITE_URL`
- `GA4_PROPERTY_ID`
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`

The Google APIs importer is intentionally not activated without credentials and explicit access to the Search Console property and GA4 property. Until connected, traffic tables remain empty and the dashboard says so.

## Validation

- `npm run typecheck`: passed.
- Production compile: passed.
- Production static generation reached 194 of 389 pages with one worker, then Windows returned an `EPERM` directory-creation error in the generated build folder. This was a local filesystem/process lock, not a TypeScript or webpack compile failure. Generated build folders were removed after testing.
- No Git push and no deployment were performed.

## Safe launch sequence

1. Review this local diff.
2. Apply the appended Supabase migration.
3. Run the one-time admin bootstrap locally and remove the temporary password variables.
4. Add the server-only cron variables in Vercel.
5. Connect Google reporting credentials only after granting read-only access to GA4 and Search Console.
6. Run the production build in a clean shell/CI environment.
7. Approve push/deployment separately.
