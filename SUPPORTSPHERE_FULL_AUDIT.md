# SupportSphere Full Website Audit

Audit date: 2026-10-30  
Production URL: https://supportsphere-one.vercel.app  
Audited commit: `f96d39f`  
Audit mode: read-only verification; no production content or company data was replaced.

## Executive summary

SupportSphere's indexable SEO surface is technically healthy: all 336 sitemap URLs returned HTTP 200, all had one H1, a self-referencing canonical, a complete five-entry hreflang set, a meta title and description, and parseable JSON-LD. No sitemap URL was orphaned in the live internal-link crawl.

The audit found one P0 data-trust issue and several P1 international SEO issues:

- The Vi India page has two confirmed 404 official links.
- Tamil, Hindi and French pages are served initially with `<html lang="en">`; JavaScript changes it after hydration, which is not a reliable server-side SEO signal.
- The 37 company descriptions and most company-specific body content are reused in English across all four locales. This creates 53 duplicate-description groups and weakens the meaning of the hreflang implementation.
- The broad legacy `/company/:slug` redirect assumes India. It sends valid US slugs such as Dell and USPS to 404 pages.
- Five old non-localized complaint tools remain indexable, have no canonical, and are outside the sitemap.
- GA4 is installed and the requested events exist, but analytics loads before consent and sends raw search terms. Search submissions from the full filter form do not fire the `search` event.

No fabricated contact information was added during this audit. Automated blocks, timeouts and HTTP 500 responses are marked **inconclusive**, not broken.

## Scope and page totals

| Surface | Audited | Result |
|---|---:|---|
| Next.js build generation counter | 599 | Build previously completed successfully |
| Prerender manifest routes | 593 | Parsed and classified |
| Static HTML artifacts | 590 | Parsed locally for metadata, H1, robots and JSON-LD |
| Dynamic route definitions | 3 | Identified in the prerender manifest |
| Live sitemap URLs | 336 | 336 HTTP 200; 0 failures; 0 redirects |
| Hreflang alternatives | 1,680 | 336 × 5 mappings present and correctly paired |
| Company records/pages | 37 | 0 duplicate country/slug routes |
| Unique official/company links | 133 | 121 reachable, 4 bot-blocked, 2 broken, 6 inconclusive |

The difference between the build's `599` progress counter, 593 manifest routes and 590 HTML files is caused by Next.js special outputs and dynamic route definitions. It is not evidence that nine public pages are missing. All available build artifacts and manifest entries were included in the audit, and every indexable sitemap URL was fetched from production.

## Passed checks

### Live technical SEO

- 336/336 sitemap URLs returned HTTP 200.
- 336/336 sitemap URLs had a non-empty title and description.
- 336/336 sitemap URLs had one H1.
- 336/336 sitemap URLs had a canonical matching the final URL.
- 336/336 sitemap URLs had `en`, `ta`, `hi`, `fr` and `x-default` hreflang links pointing to the equivalent path.
- 0 sitemap redirects and 0 sitemap 404s were found.
- 0 orphan sitemap URLs were found in the live internal-link graph.
- 0 JSON-LD parse errors were found.
- `robots.txt` returns 200, allows public pages, disallows `/admin/` and `/auth/`, and points to the production sitemap.
- Google Search Console verification metadata is present in the root metadata.
- Empty country/category combinations are `noindex` and excluded from the sitemap.

### Company-directory structure

- 37 unique company/country routes across 5 country directories.
- All 37 records have an official website, support URL, at least one official source, verification status and verification date.
- All 37 records have a useful summary, four or more issue labels, complaint steps, escalation guidance and company FAQs.
- Country is encoded in the canonical route, preventing Amazon US/India/UK/Canada records from sharing one URL.
- Where no direct phone/email/chat was verified, the UI explicitly says phone support information was not verified.

### Search and UX

Production tests passed for:

- Company search: `dell`.
- Intent search: `payment failed but money deducted`.
- Guide search: `tracking number not working`.
- No-result search: a deliberately unknown query displayed the no-company result state.
- Recommended-next-step cards linked to the expected guide/tool.
- Language selector preserves the current path and query string.
- Country and category filters are implemented server-side and use locale-aware form actions.
- CSS contains desktop, tablet (`900px`) and mobile (`600px`) layouts, single-column mobile cards, mobile search filters and reduced-motion support.

Source-level responsive checks passed. A full physical-device/browser matrix and assistive-technology session were not available in this audit, so mobile visual status is **code-verified, not device-lab verified**.

## Failed checks and remaining issues

### P0 — immediate

#### P0-1: Vi India publishes two confirmed broken official links

Current page: `/en/in/companies/vi`

Broken links:

- `https://www.myvi.in/help-support` → HTTP 404
- Old Consumer Charter PDF under `/consumerimages/mobileimages/ConsumerHomepage/` → HTTP 404

The phone and email values themselves are still supported by Vi's current official customer-care page, but the page's clickable support and charter evidence is broken. Until corrected, the Vi record should be treated as **Needs Review** rather than fully verified.

Current official replacements found during the audit:

- https://www.myvi.in/help-support/vi-customer-care-number
- https://www.myvi.in/content/dam/vodafoneideadigital/StaticPages/consumerimages/misc/VIL_Telecom_Consumer_Charter_ENG.pdf

Files requiring change:

- `lib/priority-companies.ts`

### P1 — high priority

#### P1-1: Server-rendered language is wrong on Tamil, Hindi and French pages

Raw built HTML for `/ta`, `/hi` and `/fr` starts with `<html lang="en">`. `LocaleDocument` changes the attribute only in a client-side effect. Search engines and non-JavaScript clients can receive the wrong primary language signal.

Files/components requiring change:

- `app/layout.tsx`
- `app/[locale]/layout.tsx`
- `components/LocaleDocument.tsx`

#### P1-2: Hreflang mapping is syntactically correct but content is not fully localized

The 1,680 hreflang links map correctly, but equivalence quality is weak:

- Company summaries, refund/warranty/delivery guidance, complaint steps, escalation text and source labels are English on Tamil, Hindi and French company pages.
- 37 company meta descriptions are repeated across all four languages.
- Non-English guide pages use translated titles/descriptions but generic localized complaint steps instead of the guide-specific English sections.
- 53 duplicate meta-description groups were detected. Most company description groups contain four locale URLs.

This is not a broken hreflang implementation, but it is a content-quality and localization problem. Do not add more hreflang pages until equivalent useful content is translated.

Files requiring change:

- `lib/global-data.ts`
- `lib/priority-companies.ts`
- `lib/i18n.ts`
- `app/[locale]/[[...segments]]/page.tsx`

#### P1-3: Legacy company redirect sends non-India companies to 404

`/company/:slug` permanently redirects every slug to `/en/in/companies/:slug`.

Verified examples:

- `/company/flipkart` → `/en/in/companies/flipkart` → 200
- `/company/dell` → `/en/in/companies/dell` → 404
- `/company/usps` → `/en/in/companies/usps` → 404

A permanent redirect to a 404 target is harmful for old links and search-engine migration signals.

File requiring change:

- `next.config.ts`

#### P1-4: Five legacy tools are indexable without canonicals

These old routes return 200, are not in the sitemap and have no canonical:

- `/tools/bank-transaction`
- `/tools/delivery-delay`
- `/tools/follow-up-email`
- `/tools/refund-email`
- `/tools/warranty-complaint`

They should either become intentional localized tools with self-canonicals/internal links or redirect to the localized complaint generator. Leaving them as indexable orphans creates duplicate/fragmented intent targeting.

Files requiring change:

- `next.config.ts`
- `app/tools/*/page.tsx`
- `components/GeneratorPage.tsx`

#### P1-5: Meta descriptions are too long on every localized company page

148 build artifacts have descriptions longer than 170 characters. This is exactly 37 companies × 4 locales. Twenty-six decoded titles exceed 65 characters. Search engines may rewrite these snippets.

File requiring change:

- `app/[locale]/[[...segments]]/page.tsx` (`generateMetadata`)

#### P1-6: Country coverage is transparent but not yet worldwide

Actual country-specific directories exist only for:

- United States: 11 companies
- India: 21 companies
- United Kingdom: 2 companies
- Canada: 2 companies
- Australia: 1 company

Users in other countries can use global guides and search, but they cannot select another country or get country-specific company information. “Worldwide and expanding” is defensible; “worldwide company coverage” would not be. Unsupported countries currently have no misleading generated contact pages, which is correct.

Files requiring change when verified expansion data becomes available:

- `lib/global-data.ts`
- `lib/priority-companies.ts`
- `components/CountrySelector.tsx`
- `app/[locale]/[[...segments]]/page.tsx`

#### P1-7: Five company records lack a core issue-specific section

The pages have complaint guidance, but their structured issue coverage is incomplete:

- India Post: no dedicated delivery/tracking, refund, warranty or billing section.
- Jio: no dedicated billing/payment section.
- State Bank of India: no dedicated billing/payment/transaction section.
- Canada Post: no dedicated delivery/tracking or claims/refund section.
- Australia Post: no dedicated delivery/tracking or claims/refund section.

Only add these sections after checking current official sources.

Files requiring change:

- `lib/global-data.ts`

#### P1-8: GA4 consent and search privacy are incomplete

`Analytics` loads GA4 immediately after interaction with no consent default, Consent Mode or user choice. This may be insufficient in jurisdictions requiring prior analytics consent.

Raw search terms are sent to GA4 in `search`, `search_results` and `no_result_search`. A visitor may paste an order number, phone number or other personal data into search. Queries should be sanitized/truncated before transmission.

Files requiring change:

- `components/Analytics.tsx`
- `components/SearchBox.tsx`
- `components/SearchAnalytics.tsx`
- `lib/analytics.ts`

#### P1-9: GA4 `search` event coverage is incomplete

The homepage/compact `SearchBox` fires `search`, but the full search-filter form is server-rendered and does not. Filter-form searches fire `search_results`, but not `search`, making query totals inconsistent by entry point.

File requiring change:

- `app/[locale]/[[...segments]]/page.tsx`
- Recommended: extract the filter form into a client component with a single sanitized submit event.

### P2 — medium priority

#### P2-1: No interactive search suggestions

The homepage has static “Popular” links, but no autocomplete, suggested companies or issue suggestions. Search itself works correctly.

Files requiring change:

- `components/SearchBox.tsx`
- `lib/keyword-strategy.ts`

#### P2-2: Official company website is displayed but not clickable

Company pages show the official website hostname as an information row. Only the support URL/source links are clickable. Making the official website an outbound tracked link would improve usability.

File requiring change:

- `app/[locale]/[[...segments]]/page.tsx`

#### P2-3: Structured data parses but omits breadcrumb schema

Article, FAQPage, Organization and WebSite JSON-LD parse successfully. Visual breadcrumbs are present, but there is no `BreadcrumbList` JSON-LD. Company pages use `Article`; carefully adding publisher/source relationships may be more useful than presenting SupportSphere as the listed company.

File requiring change:

- `app/[locale]/[[...segments]]/page.tsx`

#### P2-4: Sitemap `lastModified` changes for every URL on every deployment

`app/sitemap.ts` uses `new Date()` for all entries. This marks unchanged pages as freshly modified and reduces the usefulness of the signal. Company `verifiedAt` and guide `updatedAt` should drive page-specific dates.

File requiring change:

- `app/sitemap.ts`

#### P2-5: Build creates 212 empty localized category pages

Fifty-three no-content country/category combinations are generated per locale (212 total). They are correctly `noindex` and absent from the sitemap, so this is not an indexing defect. It is build/runtime overhead and thin-page surface that can be removed from `generateStaticParams` until content exists.

File requiring change:

- `app/[locale]/[[...segments]]/page.tsx`

#### P2-6: Analytics dimensions are too limited for support-link analysis

`official_support_click` includes company/country/locale but not source label, destination hostname or link type. It cannot distinguish support page, live chat, warranty source and complaint source clicks.

Files requiring change:

- `components/TrackedLink.tsx`
- `app/[locale]/[[...segments]]/page.tsx`

#### P2-7: CSS contains several historical theme overrides

`app/globals.css` contains multiple earlier theme blocks and repeated selector definitions. The final cascade works and responsive rules exist, but maintenance risk is high and visual regressions are harder to diagnose.

File requiring change:

- `app/globals.css`

## Company-directory audit

Legend:

- **Pass**: primary official/support links responded and page has useful complaint guidance.
- **Web-only**: no verified direct phone/email/chat is published on SupportSphere; the page correctly directs users to official web/app support.
- **Inconclusive**: automated crawler was blocked, timed out or received a server-side 500; not classified as broken.
- **Fail**: confirmed HTTP 404/410.

| Company | Country | Category | Direct channel status | Guidance coverage | Link audit | Result |
|---|---|---|---|---|---|---|
| USPS | US | Courier | Phone | Refund, complaint, escalation | 3 reachable | Pass |
| India Post | IN | Courier | Phone | Complaint/escalation; delivery section missing | 3 reachable | Review content |
| Flipkart | IN | E-commerce | Web-only | Refund/cancellation, complaint | 2 reachable | Pass with web-only disclosure |
| Jio | IN | Telecom | Web-only | Complaint/escalation; billing section missing | 3 reachable | Review content |
| State Bank of India | IN | Banking | Web-only | Complaint/escalation; transaction section missing | 1 reachable, 1 inconclusive | Manual source check |
| LG India | IN | Appliances | Web-only | Warranty, complaint, escalation | 4 reachable | Pass with web-only disclosure |
| IRCTC | IN | Travel | Web-only | Refund/cancellation, complaint | 2 reachable | Pass with web-only disclosure |
| Royal Mail | UK | Courier | Phone | Refund, complaint, escalation | 1 reachable, 1 blocked, 1 inconclusive | Manual source check |
| Canada Post | CA | Courier | Phone | Complaint/escalation; delivery section missing | 2 inconclusive HTTP 500 | Manual source check |
| Australia Post | AU | Courier | Phone | Complaint/escalation; delivery section missing | 3 reachable | Review content |
| Dell | US | Electronics | Phone + technical phone | Refund, warranty, complaint | 4 reachable | Pass |
| Amazon | US | E-commerce | Web-only | Refund/cancellation, complaint | 4 reachable | Pass with web-only disclosure |
| Apple | US | Electronics | Phone + chat | Refund, warranty, complaint | 7 reachable | Pass |
| Samsung | US | Electronics | Phone + chat | Refund, warranty, complaint | 4 reachable | Pass |
| Microsoft | US | Software | Web-only | Refund/cancellation, complaint | 5 reachable | Pass with web-only disclosure |
| Google | US | Software | Web-only | Refund, warranty, complaint | 4 reachable | Pass with web-only disclosure |
| HP | US | Electronics | Web-only | Warranty, complaint | 4 reachable | Pass with web-only disclosure |
| Lenovo | US | Electronics | Web-only | Warranty, complaint | 4 reachable | Pass with web-only disclosure |
| PayPal | US | Payments | Phone + chat | Refund/dispute, complaint | 6 reachable | Pass |
| Adobe | US | Software | Chat | Refund/cancellation, complaint | 4 reachable | Pass |
| Amazon India | IN | E-commerce | Web-only | Refund, delivery, replacement, payment | 3 reachable | Pass with web-only disclosure |
| Amazon UK | UK | E-commerce | Web-only | Refund, delivery, replacement, payment | 5 reachable | Pass with web-only disclosure |
| Amazon Canada | CA | E-commerce | Web-only | Refund, delivery, replacement, payment | 3 reachable | Pass with web-only disclosure |
| Meesho | IN | E-commerce | Web-only | Refund, delivery, replacement, payment | 2 bot-blocked | Inconclusive; manual check |
| Myntra | IN | E-commerce | Web-only | Refund, delivery, replacement, payment | 2 reachable | Pass with web-only disclosure |
| AJIO | IN | E-commerce | Email | Refund, delivery, replacement, payment | 3 reachable, 1 blocked | Pass; one bot-blocked URL |
| Nykaa | IN | E-commerce | Toll-free + email | Refund, delivery, replacement, payment | 4 reachable | Pass |
| HDFC Bank | IN | Banking | Level-2 grievance toll-free | Billing/payment, complaint | 2 reachable, 1 timeout | Manual PDF recheck |
| ICICI Bank | IN | Banking | Toll-free | Billing/payment, complaint | 2 reachable, 1 inconclusive | Manual complaint-page check |
| Axis Bank | IN | Banking | Toll-free | Billing/payment, complaint | 3 reachable | Pass |
| Paytm | IN | Payments | Web/app-only | Refund, payment, complaint | 4 reachable | Pass with web-only disclosure |
| PhonePe | IN | Payments | Phone | Refund, payment, complaint | 5 reachable | Pass |
| Google Pay India | IN | Payments | Toll-free + chat | Refund, payment, complaint | 5 reachable | Pass |
| Airtel India | IN | Telecom | 121 + complaint 198 | Billing/payment, complaint | 2 reachable | Pass |
| Vi India | IN | Telecom | 199 + 198 + email | Billing/payment, complaint | 1 reachable, 2 broken | **Fail — fix official links** |
| BSNL | IN | Telecom | Toll-free + technical + email | Billing/payment, complaint | 4 reachable | Pass |
| Xiaomi India | IN | Electronics | Toll-free + email + chat | Warranty, delivery, replacement, payment | 5 reachable | Pass |

Sixteen companies intentionally have no verified direct phone/email/chat in the dataset. This is not automatically a data defect because the UI states that direct phone information was not verified. It should remain that way until an official source publishes a contact channel.

Ten older records do not populate the optional `regions` field, but the route and rendered country heading still identify the market. This is a data-normalization issue, not a visible country mismatch.

## Official-link audit details

### Confirmed broken

1. Vi generic help URL — 404.
2. Vi old Consumer Charter PDF — 404.

### Bot-blocked, not broken

- Royal Mail parcel help article — 403.
- Meesho homepage — 403.
- Meesho support page — 403.
- AJIO homepage — 403.

### Inconclusive, manual browser recheck required

- SBI complaint portal — connection failure in automated crawl.
- Royal Mail `/help` — connection failure.
- Canada Post homepage and support page — HTTP 500 to the audit client.
- HDFC grievance PDF — timeout.
- ICICI complaint page — connection failure.

## SEO technical detail

### Sitemap and canonical

- Live sitemap status: 200.
- URLs: 336.
- Canonical mismatches: 0 on sitemap URLs.
- Live sitemap redirects: 0.
- Live sitemap failures: 0.
- Orphan sitemap pages: 0.

### Hreflang

- Required alternatives per URL: `en`, `ta`, `hi`, `fr`, `x-default`.
- Expected total: 1,680.
- Found and correctly mapped: 1,680.
- Mapping failures: 0.
- Content-equivalence caveat: substantive company content is not translated; see P1-2.

### Robots and indexing

- `robots.txt`: valid and reachable.
- `/admin/` and `/auth/`: disallowed.
- Empty localized category pages: noindex.
- 216 local noindex artifacts: 212 empty category variants plus admin/404 surfaces.
- Five legacy tools remain indexable outside the sitemap; see P1-4.

### Metadata

- Missing title on sitemap URLs: 0.
- Missing description on sitemap URLs: 0.
- Duplicate title groups: 3.
- Duplicate description groups: 53.
- Build artifacts with decoded titles over 65 characters: 26.
- Build artifacts with descriptions over 170 characters: 148.
- The one local HTML artifact without a description is `_global-error.html`, not an indexable sitemap page.

### Structured data

- JSON-LD parse failures: 0.
- Present types include Organization, WebSite/SearchAction, Article and FAQPage.
- Missing enhancement: BreadcrumbList.
- Schema syntax passed; this audit did not claim Google rich-result eligibility.

## Search and user-experience audit

| Check | Result | Notes |
|---|---|---|
| Company search | Pass | Dell returned the company page |
| Intent search | Pass | Failed-payment query returned the recommended guide |
| Guide search | Pass | Tracking query returned the tracking guide |
| Recommended next step | Pass | Keyword strategy mapped query to target page |
| No-result state | Pass | Unknown query displayed no-company guidance |
| Search suggestions | Fail/P2 | Static popular searches only; no interactive suggestions |
| Country filter | Pass for supported countries | Five country codes only |
| Language switcher | Pass in code | Path and query preserved |
| Unsupported country handling | Partial | No fake pages; no explicit global/other-country fallback selector |
| Mobile layout | Pass in source | Responsive CSS present; device-lab visual verification pending |
| Internal links | Pass for sitemap | No orphan sitemap URLs |
| Official website UX | Review/P2 | Hostname displayed but not clickable |

## Google Analytics audit

The live HTML includes GA4 measurement ID `G-K6RS6BG77E`. This confirms tag installation, not successful ingestion. GA4 Realtime/DebugView access was not used, so this audit does **not** claim that production events are arriving.

| Event | Implementation | Duplicate/missing risk | Result |
|---|---|---|---|
| `organic_landing_view` | `RouteAnalytics`, search-engine referrer, once per session | Does not cover every possible organic referrer; sessionStorage dedupe is sensible | Implemented with caveat |
| `search` | `SearchBox` submit | Missing for full filter-form submissions | Incomplete |
| `search_results` | `SearchAnalytics` | Fires once per query/result-count change in production | Implemented |
| `no_result_search` | `SearchAnalytics` when total matched targets are zero | Raw query privacy risk | Implemented with privacy issue |
| `company_view` | Path-based route effect | No production duplicate found in code; React Strict Mode can double effects in development only | Implemented |
| `guide_view` | Path-based route effect | Same development-only caveat | Implemented |
| `generator_use` | Complaint generator submit | Correctly tied to generation, not page view | Implemented |
| `official_support_click` | `TrackedLink` click | Missing destination/link-type dimensions | Implemented with limited detail |

Additional analytics concerns:

- GA4 loads immediately; no consent mode or consent UI is present.
- Search text is forwarded without sanitization.
- SPA page-view behavior relies on GA4/history behavior rather than an explicit route-level `page_view` event.
- Search Console query data is not imported into the app. Use Search Console Performance data as the source of truth; do not infer query volume from GA4.

## Google Search Console readiness

Ready:

- Verification meta exists.
- Sitemap is reachable and all 336 URLs resolve.
- Robots references the correct sitemap.
- Canonicals and hreflang are technically correct on sitemap URLs.
- No sitemap 404s, redirects or orphan URLs.

Not verified in this audit:

- Actual Google indexing status.
- Discovered-not-indexed or crawled-not-indexed counts.
- Search Console enhancement reports.
- Live search-query impressions/clicks.

Those require authenticated Search Console data and should not be inferred from code.

## Prioritized remediation plan

### P0

1. Replace the two broken Vi links with current official URLs.
2. Re-check the Vi page in a browser, then update its verification date; keep it Needs Review until complete.

### P1

1. Server-render the correct `<html lang>` for every locale.
2. Translate substantive company/guide content and locale metadata before expanding hreflang further.
3. Replace the blanket India legacy-company redirect with country-aware mappings or a safe company-search destination.
4. Redirect, localize or noindex the five orphan legacy tools.
5. Shorten company meta descriptions and long titles.
6. Add official-source-backed missing delivery/billing sections to five records.
7. Add consent handling and sanitize analytics search terms.
8. Ensure all search entry points fire one consistent `search` event.
9. Keep country-specific directories limited to markets with verified data and show a clear global fallback for all other users.

### P2

1. Add accessible search suggestions from verified company/keyword data.
2. Make the official website a tracked clickable link.
3. Add BreadcrumbList structured data.
4. Use real company verification and guide update dates in the sitemap.
5. Generate only category routes that contain published content.
6. Add destination/link-type parameters to official-support analytics.
7. Consolidate historical CSS overrides.

## Files and components requiring changes

| File/component | Required work |
|---|---|
| `lib/priority-companies.ts` | Fix Vi links; future verified country/company content |
| `lib/global-data.ts` | Fill five issue-specific content gaps; localized data model |
| `lib/i18n.ts` | Substantive company/guide translations and localized metadata |
| `app/layout.tsx` | Correct server-language architecture; consent-aware analytics placement |
| `app/[locale]/layout.tsx` | Locale-aware server document structure |
| `components/LocaleDocument.tsx` | Remove reliance on client-only language correction |
| `app/[locale]/[[...segments]]/page.tsx` | Metadata lengths, localized content, BreadcrumbList, clickable website, filter analytics, selective static params |
| `next.config.ts` | Country-aware legacy company redirects; legacy tool handling |
| `components/Analytics.tsx` | Consent Mode/default consent and explicit SPA measurement decision |
| `components/SearchBox.tsx` | Sanitized search analytics and suggestions |
| `components/SearchAnalytics.tsx` | Query sanitization/deduplication policy |
| `components/TrackedLink.tsx` | Destination and link-type analytics dimensions |
| `components/CountrySelector.tsx` | Transparent global fallback as coverage expands |
| `app/sitemap.ts` | Page-specific last-modified dates |
| `app/globals.css` | Consolidate repeated theme/responsive overrides |

## Audit methodology and limitations

- Parsed every available static HTML artifact from the successful production build.
- Parsed the Next.js prerender manifest and dynamic route definitions.
- Fetched every live sitemap URL and inspected response, canonical, title, description, H1, hreflang, anchors and JSON-LD syntax.
- Fetched every unique official/company link with concurrency and timeout controls.
- Treated 401/403/405/429 as blocked, 404/410 as broken, and timeouts/500/network failures as inconclusive.
- Audited search behavior with representative company, intent, guide and no-result queries.
- Reviewed GA4 implementation statically; no authenticated GA4 or Search Console reporting data was accessed.
- Did not change company data, redirects, analytics or production behavior.
