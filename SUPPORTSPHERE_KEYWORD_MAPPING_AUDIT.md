# ResolveNexa keyword strategy is connected, but the live code generates 191—not 171—keyword rows

**Audit date:** 2026-10-30  
**Scope:** keyword strategy, company/country mappings, issue and tool mappings, localized metadata, sitemap publication rules, and Search Console metric storage readiness.  
**Evidence basis:** repository code and the Search Console state already observed for `https://supportsphere-one.vercel.app/`. No Search Console query-performance export was available, so this report does not contain invented impressions, clicks, CTR, average position, search volume, or keyword difficulty.

> **Post-audit implementation update — 2026-10-30:** The P0/P1 fixes were applied locally after this audit. Unsupported `contact number` rows are no longer generated, reducing the current strategy from the audited 191 rows to **173 accurate rows**. Company metadata now mentions phone information only when a verified phone field exists. `language_code` was added to keyword research/schema, Search Console metric dimensions were extended, and the partial-intent guides/tool content were strengthened. The detailed tables below preserve the original audit evidence that led to those fixes.

## Executive summary

- The current code generates **191 keyword rows**, not 171: **148 base company combinations** (37 company-country records × 4), **20 optional verified-channel combinations**, and **23 issue/tool combinations**.
- All 37 company-country records map to the intended logical URL `/{country}/companies/{slug}`. In production, navigation and metadata add the locale, producing canonical URLs such as `/en/us/companies/dell`.
- All 23 issue/tool targets resolve to an existing guide or complaint tool. Six mappings are only partial intent matches and need stronger on-page sections, not new thin pages.
- The largest intent-quality problem is that every company receives a `[Company] contact number` keyword even when no verified number is stored. Eighteen company-country records currently fall into this group.
- Locale routes and hreflang exist for English, Tamil, Hindi, and French, but the keyword research structure itself is English-only. Native-language query research, language fields, and language-specific company copy are incomplete.
- Empty country/category pages are excluded from the sitemap or marked `noindex`; verified company publication has a source-and-date quality gate. The implementation is not intentionally producing thousands of indexable empty country/company pages.
- The database can store basic Search Console query rows, but it is only **partially ready**: it lacks a language dimension, device/search-type dimensions, a direct keyword-row relationship, and an ingestion process. CTR can be calculated from clicks and impressions but is not stored.

## Direct answers to the eight audit questions

### 1. Are the tracked keyword combinations connected to relevant pages?

**Mostly yes.** All generated rows have a non-empty `targetPage`, and every issue/tool path exists. Company rows are derived directly from the 37 company-country records, so they remain connected when a company is added to the source array. However, the reported count of 171 is stale: current source fields add 20 optional channel keywords, making the actual generated total 191.

### 2. Are company + country variants mapped correctly?

**Yes at the route level.** Each record maps to `/{ISO country code}/companies/{slug}` and is rendered as `/{locale}/{country}/companies/{slug}`. Amazon is correctly separated into US, India, UK, and Canada records. The stored keyword row does not include locale, so English is implicit rather than explicit; this becomes a limitation for native-language research and reporting.

### 3. Are issue keywords mapped to useful guides or tools?

**All 23 resolve, but six need better intent coverage.** The weaker mappings are `return request rejected`, generic `replacement request`, `card transaction issue`, `refund request email template`, `billing dispute letter`, and `customer service escalation email`. Existing pages/tools are useful, but their titles or sections do not always make the secondary intent prominent enough.

### 4. Are there duplicate or overlapping pages?

No clear indexable duplicate set was found in the active locale architecture. Several keyword phrases intentionally consolidate onto one page, which is preferable to creating thin near-duplicates. Legacy non-locale route files still exist, but permanent redirects send public requests to locale routes; this is a maintenance risk rather than confirmed indexable duplication. Refund and billing clusters should be monitored in Search Console for cannibalization once query data exists.

### 5. Are keywords used naturally in metadata and content?

**Generally yes for English.** Company metadata uses customer service, customer support, contact number, and help center terms naturally; guide titles, descriptions, sections, and FAQ content align with the main problem phrases. The main exception is `contact number` on companies without a verified number. Non-English metadata translates UI labels, but company-specific summaries and keyword research are not consistently native-language content.

### 6. Is the site generating low-quality or empty country/company pages?

**Not through the sitemap publication path.** The sitemap includes only active countries, useful categories with companies, and verified company records with official sources. Country/category pages without verified listings are marked `noindex`. Dynamic database records require published status, verification, a verification date, a support URL, and an official source before public merge. A remaining risk is publishing the same English company copy under multiple language URLs.

### 7. Is native-language SEO research missing?

**Yes.** The keyword rows are English-only and have no `language` field. Tamil, Hindi, and French routes exist, but there is no native-query dataset, no locale-specific keyword-to-page mapping, and no Search Console language segmentation. Company-specific custom FAQs are English-only; other locales fall back to generic translated FAQs. Additional supported country languages are catalog metadata, not implemented SEO locales.

### 8. Is the database ready for verified Search Console metrics?

**Partially.** `search_query_metrics` stores date, query, page, country, clicks, impressions, and position. CTR is derivable as `clicks / impressions`. Missing pieces are `language`, `device`, `search_type`, a nullable relation to `seo_keywords`, and an importer/sync status. `seo_keywords` itself has no fields for clicks, impressions, CTR, position, or language. No live query-performance data was available during this audit.

## Count reconciliation

| Component | Formula | Current count |
|---|---:|---:|
| Company-country records | Static verified records | 37 |
| Base company keywords | 37 × customer service/support/contact number/help center | 148 |
| Optional channel keywords | Toll-free, live chat, and email fields present in source data | 20 |
| Issue/tool keywords | Explicit rows in `issueKeywords` | 23 |
| **Actual generated keyword rows** | 148 + 20 + 23 | **191** |
| Previously stated total | User-provided baseline | 171 |
| **Difference** | Current code vs baseline | **+20** |

The +20 difference is explained by optional verified-channel rows and should be reflected in any dashboard or documentation that still displays 171.

## Company + country mapping audit

Each row below groups the four base phrases—`customer service`, `customer support`, `contact number`, and `help center`—plus any optional verified-channel phrase shown. The group covers all **168 company keyword rows** without repeating the same URL four to seven times.

| Keyword group | Search intent | Target page URL | Country | Language | Current implementation status | Missing content | Recommended action |
|---|---|---|---|---|---|---|---|
| USPS + 4 base phrases | Company support | `/en/us/companies/usps` | US | English explicit; ta/hi/fr route copies | Connected | Native-language research | Retain one country page; add locale-specific query rows only after research |
| India Post + 4 base phrases | Company support | `/en/in/companies/india-post` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Add verified Tamil/Hindi query mappings without changing official facts |
| Flipkart + 4 base phrases | Company support | `/en/in/companies/flipkart` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored, but contact-number keyword is generated | Make the phone-status section explicit and mark the keyword `needs-verification` until an official number exists |
| Jio + 4 base phrases | Company support | `/en/in/companies/jio` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Do not imply a number; prioritize official app/chat/contact routes |
| State Bank of India + 4 base phrases | Company support | `/en/in/companies/sbi` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Keep official grievance routes prominent; downgrade contact-number row pending verification |
| LG India + 4 base phrases | Company support | `/en/in/companies/lg-india` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Add only an officially sourced India number if verified |
| IRCTC + 4 base phrases | Company support | `/en/in/companies/irctc` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Emphasize official ticket/refund channels; do not target a number as if present |
| Royal Mail + 4 base phrases | Company support | `/en/gb/companies/royal-mail` | GB | English explicit; ta/hi/fr route copies | Connected | Native-language research not material for core GB intent | Retain mapping and monitor query/page match in Search Console |
| Canada Post + 4 base phrases | Company support | `/en/ca/companies/canada-post` | CA | English explicit; ta/hi/fr route copies | Connected | French-Canada intent is not separately researched | Add Canadian French research before claiming native coverage |
| Australia Post + 4 base phrases | Company support | `/en/au/companies/australia-post` | AU | English explicit; ta/hi/fr route copies | Connected | No local-language gap for primary audience | Retain mapping and validate impressions after data connection |
| Dell + 4 base phrases | Company support | `/en/us/companies/dell` | US | English explicit; ta/hi/fr route copies | Connected | Native-language route copy remains mixed | Keep US phone data scoped to US and translate only editorial copy |
| Amazon + 4 base phrases | Company support | `/en/us/companies/amazon` | US | English explicit; ta/hi/fr route copies | Partial | No verified public phone stored | Make contact-channel status explicit; do not reuse other-country contact data |
| Apple + 4 base phrases + live chat | Company support | `/en/us/companies/apple` | US | English explicit; ta/hi/fr route copies | Connected | Native-language research | Retain US scope and official channel citations |
| Samsung + 4 base phrases + live chat | Company support | `/en/us/companies/samsung` | US | English explicit; ta/hi/fr route copies | Connected | Native-language research | Retain US scope; monitor live-chat keyword separately |
| Microsoft + 4 base phrases | Company support | `/en/us/companies/microsoft` | US | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Focus page on product-specific official support entry points |
| Google + 4 base phrases | Company support | `/en/us/companies/google` | US | English explicit; ta/hi/fr route copies | Partial | No universal verified phone stored | Explain product-specific support rather than implying one Google number |
| HP + 4 base phrases | Company support | `/en/us/companies/hp` | US | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Keep official device/support workflow; verify before adding a number |
| Lenovo + 4 base phrases | Company support | `/en/us/companies/lenovo` | US | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Add only official US contact information with source/date |
| PayPal + 4 base phrases + live chat | Company support | `/en/us/companies/paypal` | US | English explicit; ta/hi/fr route copies | Connected | Country-specific account flows may vary | Keep phone and chat explicitly US-scoped |
| Adobe + 4 base phrases + live chat | Company support | `/en/us/companies/adobe` | US | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Target official chat/help-center intent; downgrade number keyword |
| Amazon India + 4 base phrases | Company support | `/en/in/companies/amazon` | IN | English explicit; ta/hi/fr route copies | Partial | No verified public phone stored | Keep separate from Amazon US/UK/CA; add native India-language research |
| Amazon UK + 4 base phrases | Company support | `/en/gb/companies/amazon` | GB | English explicit; ta/hi/fr route copies | Partial | No verified public phone stored | Keep UK-specific policies and channels; do not merge with US page |
| Amazon Canada + 4 base phrases | Company support | `/en/ca/companies/amazon` | CA | English explicit; ta/hi/fr route copies | Partial | No verified public phone; French-Canada research missing | Add French-Canada editorial/query research before targeting French intent |
| Meesho + 4 base phrases | Company support | `/en/in/companies/meesho` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Make app/help-center route primary; research Hindi/Tamil queries |
| Myntra + 4 base phrases | Company support | `/en/in/companies/myntra` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Avoid unsupported number claims; expand verified return/refund guidance |
| AJIO + 4 base phrases + support email | Company support | `/en/in/companies/ajio` | IN | English explicit; ta/hi/fr route copies | Partial | Email is covered, phone is not | Preserve verified email; downgrade contact-number row |
| Nykaa + 4 base phrases + toll-free + support email | Company support | `/en/in/companies/nykaa` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Keep channel-specific keywords tied to cited official data |
| HDFC Bank + 4 base phrases + toll-free | Company support | `/en/in/companies/hdfc-bank` | IN | English explicit; ta/hi/fr route copies | Connected | Number is grievance-specific, not a universal label | Qualify the number’s purpose in title-adjacent content |
| ICICI Bank + 4 base phrases + toll-free | Company support | `/en/in/companies/icici-bank` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Retain official-source/date evidence |
| Axis Bank + 4 base phrases + toll-free | Company support | `/en/in/companies/axis-bank` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Retain official-source/date evidence |
| Paytm + 4 base phrases | Company support | `/en/in/companies/paytm` | IN | English explicit; ta/hi/fr route copies | Partial | No verified phone stored | Focus on official in-app/help channels; downgrade number keyword |
| PhonePe + 4 base phrases | Company support | `/en/in/companies/phonepe` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Keep numbers country-scoped and cite grievance policy |
| Google Pay India + 4 base phrases + toll-free + live chat | Company support | `/en/in/companies/google-pay` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Keep India-only scope explicit in metadata and copy |
| Airtel India + 4 base phrases + toll-free | Company support | `/en/in/companies/airtel` | IN | English explicit; ta/hi/fr route copies | Connected | Short codes depend on network context | Explain availability/context beside each number |
| Vi India + 4 base phrases + toll-free + support email | Company support | `/en/in/companies/vi` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Preserve operator/network qualifiers |
| BSNL + 4 base phrases + toll-free + support email | Company support | `/en/in/companies/bsnl` | IN | English explicit; ta/hi/fr route copies | Connected | Multiple service-specific numbers need clear labels | Keep service labels and avoid one-number simplification |
| Xiaomi India + 4 base phrases + toll-free + live chat + support email | Company support | `/en/in/companies/xiaomi-india` | IN | English explicit; ta/hi/fr route copies | Connected | Native-language research | Retain all channels only while official sources remain current |

## Issue and tool keyword mapping audit

| Keyword | Search intent | Target page URL | Country | Language | Current implementation status | Missing content | Recommended action |
|---|---|---|---|---|---|---|---|
| refund not received | Refund/return | `/en/guides/refund-not-received` | Global | English explicit | Connected | Native-language keyword rows | Keep one focused guide and add measured locale variants later |
| refund status help | Refund/return | `/en/guides/refund-not-received` | Global | English explicit | Connected | No separate status-check schema | Keep consolidated; strengthen status-check subsection if queries appear |
| return request rejected | Refund/return | `/en/guides/how-to-request-a-refund` | Global | English explicit | Partial | No prominent rejected-return recovery section | Add a dedicated H2 and practical escalation steps to the existing guide |
| how to request a refund | Refund/return | `/en/guides/how-to-request-a-refund` | Global | English explicit | Connected | Native-language research | Retain as the primary query for this page |
| how to cancel an order | Refund/return | `/en/guides/how-to-cancel-an-online-order` | Global | English explicit | Connected | Country/company policy differences | Keep guidance generic and link to official company policy pages |
| replacement request | Refund/return | `/en/guides/request-warranty-replacement` | Global | English explicit | Partial | Generic replacement intent is broader than warranty | Rename the keyword to warranty replacement or add non-warranty routing text |
| order not delivered | Delivery | `/en/guides/complain-about-delayed-delivery` | Global | English explicit | Connected | None material | Keep consolidated with delayed-delivery complaint intent |
| package says delivered but not received | Delivery | `/en/guides/package-delivered-not-received` | Global | English explicit | Connected | None material | Retain as primary intent |
| delayed delivery complaint | Delivery | `/en/guides/complain-about-delayed-delivery` | Global | English explicit | Connected | None material | Retain consolidation; avoid duplicate page |
| missing package support | Delivery | `/en/guides/package-delivered-not-received` | Global | English explicit | Connected | Phrase is broad | Clarify delivered-vs-lost package routing in the introduction |
| tracking number not working | Delivery | `/en/guides/tracking-number-not-working` | Global | English explicit | Connected | None material | Retain focused guide |
| payment failed but money deducted | Banking/payment | `/en/guides/payment-failed-money-deducted` | Global | English explicit | Connected | Country-specific dispute timing cannot be generalized | Keep factual and link to provider/bank rules |
| duplicate charge | Banking/payment | `/en/guides/duplicate-charge` | Global | English explicit | Connected | None material | Retain focused guide |
| billing dispute | Banking/payment | `/en/guides/resolve-billing-dispute` | Global | English explicit | Connected | Native-language research | Retain as primary intent |
| card transaction issue | Banking/payment | `/en/guides/resolve-billing-dispute` | Global | English explicit | Partial | Too broad for one billing-dispute page | Add routing for pending, reversed, unauthorized, and duplicate transactions |
| account locked | Banking/payment | `/en/guides/account-locked-support` | Global | English explicit | Connected | Intent also applies to non-financial accounts | Keep safe recovery guidance broad; avoid bank-only metadata |
| free complaint letter generator | Complaint tool | `/en/tools/complaint-letter` | Global | English explicit | Connected | None material | Retain as primary tool query |
| refund request email template | Complaint tool | `/en/tools/complaint-letter` | Global | English explicit | Partial | Refund mode exists but is not the page’s primary H1 | Add crawlable mode explanation and anchored section; do not create a thin duplicate |
| customer complaint email template | Complaint tool | `/en/tools/complaint-letter` | Global | English explicit | Connected | None material | Retain as strong secondary query |
| complaint follow-up email | Complaint tool | `/en/tools/complaint-letter` | Global | English explicit | Connected | Follow-up mode needs crawlable example guidance | Add a concise explanatory section outside client-only output |
| warranty claim letter | Complaint tool | `/en/tools/complaint-letter` | Global | English explicit | Partial | Warranty mode exists but is weak in static metadata | Add warranty mode to on-page headings/FAQ |
| billing dispute letter | Complaint tool | `/en/tools/complaint-letter` | Global | English explicit | Partial | Bank transaction mode exists; exact billing-dispute intent is not prominent | Add a billing-dispute use-case section and safe evidence checklist |
| customer service escalation email | Complaint tool | `/en/guides/how-to-write-professional-complaint-email` | Global | English explicit | Partial | Escalation-specific subject/body guidance is not prominent | Add an escalation-email H2 or map to the escalation guide if it better matches |

## Duplicate and overlapping intent review

| Cluster | Finding | Risk | Action |
|---|---|---|---|
| Refund not received vs request a refund | Distinct post-refund and pre-refund intents | Low | Keep separate and cross-link |
| Delayed delivery terms | Two phrases intentionally map to one guide | Low | Correct consolidation; do not split |
| Delivered-not-received terms | Two phrases intentionally map to one guide | Low | Correct consolidation; clarify lost-package boundary |
| Billing dispute vs card transaction issue | One broad secondary phrase maps to a narrower guide | Medium | Expand routing content before considering a separate page |
| Complaint template variants | Six phrases share one tool | Medium | Keep one functional tool but add crawlable mode sections |
| Company contact number | Generated for all companies regardless of phone availability | High | Derive this row only when a verified phone/toll-free/technical number exists, or mark it `needs-verification` |
| Legacy non-locale routes | Old page files coexist with permanent redirects | Low–medium maintenance risk | Remove only after confirming redirects and internal links in a separate safe change |

## Native-language SEO gaps

1. `KeywordResearchRow` has no language or locale field.
2. All 191 keyword strings are English.
3. Tamil, Hindi, and French paths receive localized UI metadata, but company-specific summary/source content remains partly English.
4. English-only company FAQ data is replaced by generic translated FAQs on non-English routes, reducing company-specific usefulness.
5. French-Canada, Hindi-India, and Tamil-India query intent is not modeled separately.
6. The 249-country catalog does not mean the site supports native SEO for all country languages; only `en`, `ta`, `hi`, and `fr` routes exist.

Recommended model extension without recreating the database:

- Add nullable `language_code` (BCP 47 or supported locale) to `seo_keywords`.
- Keep one verified company record as the factual source; attach language-specific editorial keyword rows to the same canonical country/company entity.
- Publish a translated company page only when the editorial content is actually translated and useful; otherwise avoid claiming native-language completeness.
- Import real Search Console queries first, then promote recurring native-language phrases into reviewed keyword rows.

## Search Console metric readiness

| Requirement | Current state | Gap |
|---|---|---|
| Query | Stored in `search_query_metrics.query` | Ready |
| Impressions | Stored | Ready |
| Clicks | Stored | Ready |
| CTR | Not stored | Calculate from clicks/impressions, guarding zero impressions |
| Average position | Stored as `position` | Ready |
| Date | Stored as `metric_date` | Ready |
| Page | Stored | Ready |
| Country | Stored | Ready |
| Language | Not stored | Add `language_code` or infer cautiously from query/page locale |
| Device | Not stored | Add device dimension if requested from Search Console API |
| Search type | Not stored | Add web/image/video/news dimension if imported |
| Link to planned keyword | No foreign key or deterministic mapping status | Add nullable `seo_keyword_id` plus match method/confidence |
| Import freshness/status | Only `imported_at`; no sync run table | Add import-run status, source property, range, and error log |

Observed Search Console state is limited to property/sitemap/indexing setup. The sitemap was accepted and pages were discovered, but no query-performance export was available for this audit. Therefore no keyword is labeled as ranking, gaining impressions, or receiving clicks.

## Priority actions

### P0 — Correct misleading intent state

1. Update the documented keyword total from 171 to **191**, or remove optional rows from the tracked total intentionally.
2. Stop treating `[Company] contact number` as `published` when the company record has no verified phone/toll-free/technical number.
3. Add a language dimension before importing Tamil, Hindi, French, or future native-language research.

### P1 — Improve intent coverage without creating duplicate pages

1. Add focused sections for rejected returns, generic replacement routing, card transaction types, and escalation email writing.
2. Add crawlable sections for refund, warranty, billing, and follow-up modes on the complaint generator page.
3. Make non-English company pages fully useful before promoting native-language keywords.
4. Add deterministic matching between Search Console query rows and `seo_keywords`.

### P2 — Measure and maintain

1. Add a scheduled Search Console import with date, page, country, device, and search type.
2. Calculate CTR at query time or expose a guarded database view.
3. Review cannibalization only after real query/page data exists.
4. Keep the existing sitemap verification gate and noindex behavior for empty countries/categories.

## Files and components requiring changes

- [`lib/keyword-strategy.ts`](lib/keyword-strategy.ts): conditional contact-number rows; add language-aware research model or adapter.
- [`app/[locale]/[[...segments]]/page.tsx`](app/%5Blocale%5D/%5B%5B...segments%5D%5D/page.tsx): avoid unconditional contact-number metadata and improve locale-specific company copy.
- [`lib/i18n.ts`](lib/i18n.ts): add genuinely researched native-language metadata/content, not keyword substitutions.
- [`lib/data.ts`](lib/data.ts): strengthen the six partial-intent guide sections.
- [`components/GeneratorPage.tsx`](components/GeneratorPage.tsx) and [`components/TemplateGenerator.tsx`](components/TemplateGenerator.tsx): expose crawlable descriptions for each supported template mode.
- [`supabase/schema.sql`](supabase/schema.sql): additive fields/tables for language, device, search type, keyword linkage, and import-run status.
- [`app/sitemap.ts`](app/sitemap.ts): no immediate defect found; preserve verified-source filtering when language publication rules are tightened.
- [`next.config.ts`](next.config.ts): legacy redirects are working design evidence; remove old routes only in a separately verified cleanup.

## Evidence and limitations

- Primary evidence: [`lib/keyword-strategy.ts`](lib/keyword-strategy.ts), [`lib/global-data.ts`](lib/global-data.ts), [`lib/priority-companies.ts`](lib/priority-companies.ts), [`lib/data.ts`](lib/data.ts), [`app/[locale]/[[...segments]]/page.tsx`](app/%5Blocale%5D/%5B%5B...segments%5D%5D/page.tsx), [`app/sitemap.ts`](app/sitemap.ts), [`lib/database-content.ts`](lib/database-content.ts), [`lib/i18n.ts`](lib/i18n.ts), [`supabase/schema.sql`](supabase/schema.sql), and [`next.config.ts`](next.config.ts).
- This was a code and configuration audit, not a live ranking audit.
- Official contact values were not re-researched on the web in this pass; the audit checked whether mappings use the project’s verified-source model and whether keyword claims match available fields.
- Search Console performance metrics were unavailable, so this report makes no ranking or traffic-improvement promise.
