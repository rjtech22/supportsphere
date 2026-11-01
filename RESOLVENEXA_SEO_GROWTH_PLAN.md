# ResolveNexa SEO Growth Opportunity Audit

**Audit date:** 2026-11-01
**Scope:** audit and recommendations only; no production code, database, metadata, routes, or deployment changes were made.
**Production property reviewed:** `https://resolvenexa.vercel.app/`

## Executive summary

ResolveNexa's technical SEO foundation is substantially in place, but the property is too new for statistically reliable keyword decisions. Google Search Console currently contains only two days of actual performance data (2026-10-29 to 2026-10-30), with **1 click, 6 impressions, 16.7% CTR, and 2.5 average position** in the last-28-day view. The previous 28 days contain no data.

The first useful page-level signals are Amazon US at position 6, the India banking category at position 15, the refund guide at position 27, and the professional complaint-email guide at position 30. Each has only one impression, so these are discovery signals—not proven opportunities yet.

The highest-value next phase is therefore:

1. establish repeatable Search Console data ingestion/export;
2. remove index fragmentation from legacy tools and confirm the root-to-`/en` consolidation;
3. strengthen the few pages already receiving impressions;
4. improve issue-aware internal linking and weak company content;
5. delay broad country expansion until official country-specific sources are verified;
6. avoid promoting Tamil, Hindi, and French company pages until their substantive company content is genuinely localized.

## Evidence and data quality

### Google Search Console actual data

Search Console was reviewed while signed in to the verified URL-prefix property. The UI reported **Last update: 11 hours ago**.

| Metric | Last 28 days | Previous 28 days | Interpretation |
|---|---:|---:|---|
| Clicks | 1 | 0 | One early organic click |
| Impressions | 6 | 0 | Discovery has started, but sample is extremely small |
| CTR | 16.7% | 0% | Not stable enough for optimization decisions |
| Average position | 2.5 | No data | Aggregate is dominated by navigational/site queries |

The chart contained actual data only for 2026-10-29 and 2026-10-30. A 28-day percentage comparison would therefore be misleading.

### Visible queries

| Query | Clicks | Impressions | Position | Assessment |
|---|---:|---:|---:|---|
| `site:vercel.app` | 0 | 2 | 2.0 | Navigational/operator-style query, not a target customer-support keyword |
| Long exclusion query beginning `"lgindiasupport.com" -site:...` | 0 | 1 | 2.0 | Research/operator query, not a reusable content signal |

Three of the six property impressions are not exposed as visible query rows, most likely because of Search Console privacy thresholds. No target high-intent query has enough visible data to call “working” yet.

### Visible pages

| Page | Clicks | Impressions | Position | Opportunity status |
|---|---:|---:|---:|---|
| `https://resolvenexa.vercel.app/en` | 1 | 3 | 1.7 | Early branded/home discovery |
| `https://resolvenexa.vercel.app/` | 0 | 2 | 2.0 | Check consolidation after the permanent redirect |
| `https://resolvenexa.vercel.app/en/us/companies/amazon` | 0 | 1 | 6.0 | Early page-1 signal; too little data for CTR conclusions |
| `https://resolvenexa.vercel.app/en/in/categories/banking` | 0 | 1 | 15.0 | Early position 5–30 opportunity |
| `https://resolvenexa.vercel.app/en/guides/refund-not-received` | 0 | 1 | 27.0 | Early position 5–30 opportunity |
| `https://resolvenexa.vercel.app/en/guides/how-to-write-professional-complaint-email` | 0 | 1 | 30.0 | Early position 5–30 opportunity |

Do not sum page-table rows to reconstruct the property total; Search Console's aggregation and privacy behavior can differ by dimension.

### Country performance

| Country | Clicks | Impressions | Previous-period clicks/impressions |
|---|---:|---:|---:|
| India | 1 | 2 | 0 / 0 |
| United States | 0 | 2 | 0 / 0 |
| Japan | 0 | 1 | 0 / 0 |
| Singapore | 0 | 1 | 0 / 0 |

International discovery has technically started, including Japan and Singapore, but the sample is not large enough to justify new country pages.

### API/integration status

The repository contains placeholders for `GOOGLE_SEARCH_CONSOLE_SITE_URL`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, but no configured local values, Google API client dependency, or ingestion job. Search Console API access is therefore **not configured in the inspected workspace**.

For repeatable reporting, either:

- enable the Google Search Console API in a Google Cloud project, create a service account, grant its email access to the exact Search Console property, store the credentials only in server-side secrets, and implement a scheduled importer; or
- export the Performance report as CSV with **Last 28 days compared with previous 28 days**, including Queries, Pages, Countries, Devices, and Dates.

Never expose the private key in frontend code, logs, or reports.

### Indexing status

Search Console's Page indexing report currently says **“Processing data, please check again in a day or so.”** No reliable indexed/excluded counts are available yet. Code-level checks show:

- empty country and category pages are `noindex,follow`;
- search-result pages are `noindex,follow`;
- `/admin/` and `/auth/` are disallowed in `robots.txt`;
- the sitemap publishes only active countries, categories with companies, verified company records with sources, localized guides, and core public pages;
- five legacy tool routes remain an index-fragmentation risk because they are outside the sitemap and were previously confirmed as indexable without canonicals.

## Top 10 prioritized actions

Each action below is a recommendation only.

| Priority | Existing page URL | Actual query/data | Problem | Recommended change | Expected SEO benefit | Evidence/source |
|---|---|---|---|---|---|---|
| P0 | Property-wide | 1 click, 6 impressions; previous period 0/0 | The sample is too small and there is no repeatable API/export pipeline | Configure read-only Search Console API ingestion or a disciplined weekly CSV export; preserve query, page, country, device, date, clicks, impressions, CTR, and position | Enables evidence-led prioritization and prevents speculative content expansion | Live Search Console Performance report; `.env.example`; `package.json` |
| P0 | `/tools/refund-email`, `/tools/delivery-delay`, `/tools/bank-transaction`, `/tools/warranty-complaint`, `/tools/follow-up-email` | No GSC row yet | Five legacy indexable orphan tools overlap guide/generator intent and lack canonical consolidation | After validation, permanently redirect each to the closest localized guide/tool or explicitly noindex it; do not maintain duplicate intent pages | Reduces index fragmentation and concentrates signals | `SUPPORTSPHERE_FULL_AUDIT.md`; `next.config.ts`; `app/(legacy)/tools/` |
| P0 | `https://resolvenexa.vercel.app/` and `/en` | Root: 0 clicks/2 impressions/position 2; `/en`: 1/3/1.7 | Both URLs still appear in performance data even though `/` is configured to redirect to `/en` | Confirm live 308/301 behavior, canonical to `/en`, and Google-selected canonical in URL Inspection; monitor until root drops from performance/index coverage | Consolidates homepage/brand signals | Live Search Console pages; `next.config.ts` permanent root redirect |
| P1 | `/en/us/companies/amazon` | 0 clicks, 1 impression, position 6 | First non-home company page is close to top results but has too little exposure and no visible target query | Improve the existing page only: clearer issue navigation, concise country-specific steps, official-source citations, and intent-specific links to refund/delivery guides; do not add an unverified phone number | Better relevance and engagement for Amazon support intents | Live GSC page row; `lib/global-data.ts`; company audit notice |
| P1 | `/en/in/categories/banking` | 0 clicks, 1 impression, position 15 | Category page has an early mid-page signal but needs stronger task-oriented entry points | Add concise links to failed-payment, duplicate-charge, account-lock, card-dispute guides and relevant verified Indian bank pages; keep one category URL | Improves topical depth and crawl paths for banking-support intent | Live GSC page row; `lib/seo-content.ts`; dynamic category renderer |
| P1 | `/en/guides/refund-not-received` | 0 clicks, 1 impression, position 27 | Guide is discovered but lacks enough measured query context and company-specific paths | Strengthen the existing guide with decision steps, evidence checklist, payment-method branches, and links to companies that have verified refund content | Better match for generic refund-help searches without creating thin variants | Live GSC page row; `lib/data.ts`; `lib/keyword-strategy.ts` |
| P1 | `/en/guides/how-to-write-professional-complaint-email` | 0 clicks, 1 impression, position 30 | Early long-form/tool intent is visible, but guide-to-generator and company escalation paths can be clearer | Add direct, contextual links to the complaint generator and verified company escalation sections; keep template variations on this one page | Strengthens complaint-email/tool intent and conversion path | Live GSC page row; guide renderer; complaint generator route |
| P1 | All 44 company pages, especially India Post, Jio, SBI, Canada Post, Australia Post | 23 content notices; 5 records lack an issue-specific section | Generic or missing task sections weaken usefulness; absence of a public phone is not itself an error | Add only category-relevant, officially sourced sections: delivery/claims for postal companies, billing/recharge for Jio, transaction/card escalation for SBI | Increases content usefulness and long-tail coverage without fabricated contacts | `npm run audit:companies`; `lib/global-data.ts` |
| P1 | Company and guide templates | No reliable query-level data yet | Related guides use the first five dictionary entries; related companies use broad category/country slicing, not issue relevance | Generate related links from verified issue fields, guide category, country, and user intent; keep links deterministic and useful | Improves crawl depth, topical clusters, and user navigation | `app/[locale]/[[...segments]]/page.tsx` related-link logic |
| P2 | Tamil, Hindi, and French company URLs; future country-company URLs | No locale query data; 44 verified records in only 5 countries | Substantive company summaries/issue sections remain English on non-English routes; broad expansion would create weak equivalents | Research native queries from real GSC data and localize substantive content before promoting those URLs; add new country-company records only after official regional sources are verified | Builds trustworthy international coverage and avoids duplicate/thin localization | `lib/i18n.ts`; company renderer; `SUPPORTSPHERE_FULL_AUDIT.md` |

## Priority findings

### P0 — measurement and index consolidation

#### P0.1 Search Console data pipeline is not operational

The database/schema work is prepared for metrics, but the inspected application has no Search Console API client or importer. Until at least several weeks of query/page data are available, content decisions should use “verification candidate” status rather than “SEO opportunity” certainty.

**Required export if API access is not added:** Search Console → Performance → Search results → Compare → Last 28 days to previous period → Export Google Sheets/CSV. Include separate Query, Page, Country, Device, and Date tabs.

#### P0.2 Legacy tools can split issue intent

The five old tool URLs are not in the current sitemap and are not redirected in `next.config.ts`. They overlap with the localized complaint generator and guides. The exact destination must be chosen by intent; do not redirect every tool blindly to the homepage.

Suggested mapping for later implementation review:

| Legacy URL | Candidate destination |
|---|---|
| `/tools/refund-email` | `/en/guides/refund-not-received` or `/en/tools/complaint-letter` with refund mode |
| `/tools/delivery-delay` | existing delivery/tracking guide matching its content |
| `/tools/bank-transaction` | existing failed-payment/billing-dispute guide |
| `/tools/warranty-complaint` | existing warranty/replacement guide |
| `/tools/follow-up-email` | professional complaint-email guide or complaint generator |

#### P0.3 Root and localized homepage need crawl consolidation monitoring

The code has a permanent `/` → `/en` redirect, yet both URLs have impressions. This can be normal shortly after migration, but URL Inspection should confirm Google's selected canonical. No new alternate homepage should be created.

### P1 — pages already showing early impressions

#### Amazon US

Position 6 from one impression is the strongest non-home signal. The page should remain the single canonical target for Amazon US customer-service, support, refund, delivery, tracking, and escalation variants. Improve sections and internal links instead of generating separate keyword pages. Because the record currently uses official self-service routes, do not add a universal phone number unless Amazon publishes and the source is recorded.

#### India banking category

Position 15 indicates Google has discovered the category. Its best growth path is task navigation: failed payment, money deducted, duplicate charge, account locked, card dispute, and complaint escalation. Link those tasks to the existing guides and verified bank records.

#### Refund and complaint-email guides

Positions 27 and 30 show early discovery. These guides should become the definitive generic-intent pages. Company-prefixed versions should continue to resolve to the relevant company page, preventing cannibalization.

### P1 — weak company content

The company audit passed all 44 records with zero blocking data issues, but reported 23 non-blocking notices. Eighteen notices indicate official web/self-service only. That is acceptable when the company does not publish a verified direct channel; the page should state this clearly and guide the user through the official flow.

Five records need category-specific content review:

| URL | Missing signal | Recommended content review |
|---|---|---|
| `/en/in/companies/india-post` | No refund/warranty/delivery/billing section detected | Add official tracking, delivery complaint, loss/damage claim, and escalation steps if supported by India Post sources |
| `/en/in/companies/jio` | No issue-specific section detected | Add official recharge/billing, network, SIM, and grievance steps if documented |
| `/en/in/companies/sbi` | No issue-specific section detected | Add official failed transaction, card dispute, account access, and grievance escalation flows |
| `/en/ca/companies/canada-post` | No issue-specific section detected | Add official tracking, missing parcel, delivery claim, and escalation guidance |
| `/en/au/companies/australia-post` | No issue-specific section detected | Add official tracking, delayed/missing item, compensation/claim, and complaint guidance |

Every added factual statement should include an official source and a refreshed verification date.

### P1 — internal linking opportunities

Current company pages show the first five localized guide entries rather than guides matched to the company's issues. Current guide pages select related companies broadly by category. Replace this later with deterministic mappings:

- `refundCancellation` → refund guide;
- `deliveryTracking` → missing-delivery/tracking guides;
- `billingPayment` → failed-payment/billing-dispute guides;
- `warranty` or `replacement` → warranty/replacement guides;
- country and category → closest verified company records;
- complaint escalation → complaint-email guide and generator.

This should be implemented in shared data/logic, not hardcoded page by page.

### P1 — keyword cannibalization risks

| Risk | Current assessment | Recommendation |
|---|---|---|
| Generic issue guide vs company page | Architecture is conceptually correct | Generic query → guide; company-prefixed query → company page |
| Legacy tool vs localized guide/generator | Confirmed structural risk | Redirect/noindex after intent mapping |
| `/` vs `/en` | Early duplicate performance visibility | Confirm redirect/canonical and monitor |
| Tamil/Hindi/French pages with English company copy | Localization-quality risk | Do not promote until substantive content is localized |
| Near-duplicate country/company pages | Currently controlled by verified-data gate | Continue publishing only materially country-specific records |

### P2 — country and company expansion

ResolveNexa supports 249 selectable countries but has 44 verified company-country records across five countries: India, United States, United Kingdom, Canada, and Australia. Empty countries are selectable but not added to the indexable sitemap, which is the correct behavior.

Potential verification queues—not approved page creation—include:

- Amazon Australia, if official Australia-specific support and policy sources are verified;
- country-specific FedEx, UPS, and DHL Express records where official regional support differs;
- eBay, Airbnb, and Booking.com country pages only where contact flow, policy, or escalation content is materially different;
- additional UK, Canada, Australia, and India records for existing global brands based on real Search Console demand and official sources.

Japan and Singapore each produced one impression, but that is not enough evidence to prioritize either market.

### P2 — brand/domain presentation

The visible query `site:vercel.app` and the use of a `vercel.app` hostname can make Google display infrastructure branding while site-name signals settle. A verified custom domain is a brand/CTR improvement candidate, not a guaranteed ranking improvement. If adopted later, it requires a controlled migration: permanent redirects, canonical/hreflang/sitemap updates, a new Search Console property, and monitoring—never a casual hostname switch.

## Pages that should not be indexed

| Page type | Current state | Recommendation |
|---|---|---|
| Search-result pages | `noindex,follow` | Keep |
| Empty country pages | `noindex,follow`, excluded from sitemap | Keep until verified listings or substantial unique guidance exists |
| Empty country/category pages | `noindex,follow`, excluded from sitemap | Keep |
| Admin/auth | blocked in robots | Keep; also retain authentication and page-level controls |
| Five legacy tool routes | Indexability/canonical risk | Redirect or noindex after content-intent review |
| Non-English company pages with mostly English substantive copy | Currently indexable via hreflang | Review quality; consider temporary noindex only if they do not provide a genuinely localized user experience |

## What is already working

- 44 company-country records pass the publication audit with zero blocking data issues.
- Only verified companies with official sources enter the sitemap.
- Country-specific canonical paths separate records such as Amazon US, India, UK, and Canada.
- Canonical and hreflang generation is centralized.
- Empty country/category pages and search pages are noindexed.
- Generic issue keywords map to existing guides/tools rather than thousands of thin variants.
- Company issue keywords are conditional on content fields.
- Search Console and GA4 are connected at the property/tag level.
- Organic impressions and one click have started.

## Files and components reviewed

- `.env.example` — optional Search Console/GA4 reporting placeholders.
- `package.json` — no Google Search Console API client or import script.
- `app/sitemap.ts` — verified-data sitemap gate and localized alternatives.
- `app/robots.ts` — admin/auth crawl restrictions.
- `next.config.ts` — root, locale, legacy route redirects.
- `app/[locale]/[[...segments]]/page.tsx` — metadata, noindex rules, company/category/guide rendering, and related links.
- `lib/global-data.ts` and `lib/priority-companies.ts` — 44 verified company-country source records.
- `lib/keyword-strategy.ts` — company and issue keyword-to-page mappings.
- `lib/i18n.ts` — locale paths, translated UI, canonical and hreflang alternatives.
- `lib/seo-content.ts` — category search intent and keyword clusters.
- `SUPPORTSPHERE_FULL_AUDIT.md` — prior technical crawl and legacy-tool findings.
- `SUPPORTSPHERE_KEYWORD_MAPPING_AUDIT.md` — keyword mapping and localization/data-model findings.
- `SUPPORTSPHERE_GLOBAL_COMPANY_SEO_PLAN.md` — verified high-intent company expansion work.

## Decision gate before implementation

Do not create new pages from this audit alone. Re-evaluate after either:

1. at least 28 complete days of Search Console data; or
2. a minimum dataset with enough impressions to identify repeated queries/pages without privacy suppression.

At that point, prioritize pages that repeatedly rank in positions 5–30, have meaningful impressions, and clearly match an existing user need. Until then, implement only low-risk consolidation, verified content quality, and internal-link improvements after approval.
