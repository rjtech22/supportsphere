# SupportSphere Global Country Expansion Report

Date: 2026-10-30

## Executive summary

SupportSphere now has a scalable ISO 3166-1 country catalog covering **249 officially assigned countries and territories**. The catalog is available to country selection, search, complaint templates, routing, and the database seed workflow. It includes alpha-2 and alpha-3 codes, English and native names, emoji flags, ISO 639-1 language codes and names, a default regional locale, and the subset of site UI locales supported by each market.

The implementation deliberately separates **country catalog support** from **published company-support data**:

- All 249 ISO entries can be selected and routed.
- Only markets containing verified company records are pre-rendered, shown as published markets, and included in the sitemap.
- Countries without verified company records display an explicit unavailable/not-verified state and are marked `noindex,follow`.
- No phone number, policy, company listing, or regional claim was copied from one country to another.

## Coverage

| Measure | Count |
|---|---:|
| ISO 3166-1 catalog entries | 249 |
| Previously implemented country records | 5 |
| Countries/territories added to the catalog | 244 |
| Countries with verified company support data | 5 |
| Countries with no verified company support data yet | 244 |
| Verified company-country records | 37 |
| Current sitemap URLs | 336 |
| Current sitemap language alternatives | 1,680 |
| Production build pages generated | 387 |

The package source also contains AC, TA, and XK. These were excluded because they are exceptionally reserved/user-assigned codes rather than officially assigned ISO 3166-1 entries.

## Published markets with verified data

| ISO code | Country | Verified company records |
|---|---|---:|
| US | United States | 11 |
| IN | India | 21 |
| GB | United Kingdom | 2 |
| CA | Canada | 2 |
| AU | Australia | 1 |

The old non-ISO `uk` route and data key were migrated to ISO `gb`. Permanent redirects preserve old `/uk/` and localized `/{locale}/uk/` links.

## Multi-country companies

- Amazon currently has separately sourced records for the United States, United Kingdom, Canada, and Australia.
- Every company-country record remains an independent data object, so contact details and policies are not inherited across countries.

## Implementation completed

### Country catalog and selection

- Added a complete data-driven ISO catalog in `lib/country-catalog.ts`.
- Replaced the fixed five-country type/list with the catalog.
- Added a searchable country selector using native datalist search and keyboard-accessible submission.
- Added country-name, alpha-2, alpha-3, and native-name normalization for routing/search.
- Added all-country selection to the complaint generator without claiming localized company coverage.

### Routing and empty-country handling

- Existing `/{locale}/{country}/...` architecture was retained.
- Kept safe bare-country redirects for published markets; every global canonical route uses `/{locale}/{country}` to avoid collisions between two-letter locale and country codes.
- Migrated United Kingdom routes from `uk` to `gb` with permanent redirects.
- Unsupported ISO countries resolve to an informative country page rather than a fake directory.
- Legacy ambiguous `/company/{slug}` URLs now go to global search instead of incorrectly forcing India and producing country mismatches.

### SEO safeguards

- Only five verified markets are generated as static country pages.
- Only country/category combinations with actual company records are pre-rendered.
- Unsupported-country pages are `noindex,follow`.
- Sitemap generation remains limited to canonical, useful pages with verified records.
- Canonical and language alternatives continue to use the locale-country URL.
- Empty/duplicate country-company pages were not generated.

### Database and admin architecture

- Extended `countries` with `iso3`, `flag`, `native_name`, `language_codes`, and `default_locale`.
- Kept company-country support, contacts, official sources, verification status, verification date, and publish status as independent relational records.
- Expanded the secure admin country action to accept the additional country metadata.
- Added `npm run seed:countries`, which validates an exact 249-row catalog before upserting it into Supabase.
- The seed requires server-only `SUPABASE_SERVICE_ROLE_KEY`; it is never exposed to the browser.

## Validation results

- `npm run typecheck`: passed after implementation.
- `npm run build`: passed.
- Next.js production output: 387 generated pages.
- Catalog assertion: exactly 249 entries.
- `npm audit`: 0 vulnerabilities at dependency installation time.
- ESLint is not currently runnable because the project uses ESLint 9 but has no `eslint.config.*` flat configuration. This is a pre-existing tooling issue, not a country-expansion failure.

## Remaining data and SEO work

### P0 — before database seeding

1. Apply the updated `supabase/schema.sql` to the configured Supabase project.
2. Set `SUPABASE_SERVICE_ROLE_KEY` only in a trusted local/CI environment and run `npm run seed:countries` once.
3. Never add the service-role key as a public Vercel environment variable.

### P1 — data expansion

1. Verify companies market by market before publishing new country-company records.
2. Add official support sources and a verification date to every new record.
3. Keep phone/email/contact data country-specific; do not use global fallback contact details.
4. Prioritize Singapore, UAE, New Zealand, Germany, France, Japan, South Korea, Brazil, Mexico, South Africa, and major EU markets based on real Search Console demand.

### P1 — international SEO

1. The UI supports English, Tamil, Hindi, and French, but some non-English company content still falls back to English. Do not add new hreflang languages until complete, reviewed translations exist.
2. The root HTML language emitted by the current shared layout should be made locale-aware in a future routing refactor; the page metadata already emits locale-specific content language and alternates.
3. Re-run the full live URL audit after deployment to confirm redirects, canonical tags, noindex pages, and sitemap fetches on Vercel.

### P2 — operations

1. Add an ESLint 9 flat configuration.
2. Add an admin bulk-import/status screen showing catalog countries, verified record count, and publication readiness.
3. Add a review queue for outdated company-country verification dates.

## Files changed

- `lib/country-catalog.ts` — complete ISO country catalog and normalization.
- `lib/global-data.ts` — scalable country type, published-market derivation, GB migration.
- `lib/priority-companies.ts` — Amazon UK migrated to GB.
- `lib/i18n.ts` — ISO country-name fallback and GB translation key.
- `lib/seo-content.ts` — GB SEO key.
- `components/CountrySelector.tsx` — searchable global selector.
- `components/LocalizedTemplateGenerator.tsx` — all-country complaint context.
- `app/[locale]/[[...segments]]/page.tsx` — scalable static generation, noindex unsupported countries, global search filter.
- `app/sitemap.ts` — verified-market-only sitemap.
- `app/globals.css` — searchable selector and unsupported-country state styling.
- `next.config.ts` — global country redirects, GB migration, safer legacy company redirect.
- `supabase/schema.sql` — ISO, language, flag, and locale columns.
- `app/admin/global/actions.ts` — extended secure country insertion.
- `scripts/seed-countries.mjs` — validated Supabase country seeder.
- `package.json`, `package-lock.json` — catalog dependency and seed command.

## Environment variables for the database seed

```text
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
```

Run:

```text
npm run seed:countries
```

Do not prefix the service-role key with `NEXT_PUBLIC_`.
