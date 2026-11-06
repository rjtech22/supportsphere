# ResolveNexa Master SEO Audit

Audit date: 2026-11-06
Audited revision: `67f4d89` on `main`
Production site: https://resolvenexa.vercel.app/
Scope: read-only code, production crawl, responsive review, Google Search Console, and GA4 inspection.

## Executive assessment

ResolveNexa is technically healthy and substantially more complete than a typical early-stage directory. The production sitemap contains 181 canonical URLs; all 181 returned HTTP 2xx, had a title, meta description, one H1, matching canonical, parseable structured data, and at least one internal link during this audit. The production build generated 411 static pages and all available TypeScript, ESLint, internal-link, company-data, review-security, and i18n checks passed.

The overall SEO health is **Good, with one high-priority international URL consistency defect and several content/trust improvements**. The main technical defect is that locale-homepage hreflang URLs use trailing slashes (`/en/`, `/ta/`, `/hi/`, `/fr/`) while the canonical URLs omit them and the slashed URLs redirect. The largest quality risks are indexable but abbreviated non-English trust pages and relatively generic localized country/category content.

Google has begun discovering the site, but the data window is still very small. Search Console showed 5 clicks and 134 impressions for the available 2026-10-29 to 2026-11-03 period. These figures are verified account observations, not forecasts. Google was still processing the Pages indexing report, so indexed/not-indexed totals were unavailable.

## Verified inventory

| Item | Verified result |
|---|---:|
| Supported locales | English, Tamil, Hindi, French |
| Searchable country records | 249 |
| Countries with verified company listings | India, United States, United Kingdom, Canada, Australia |
| Verified company-country pages | 44 |
| English issue guides | 16 |
| Sitemap URLs | 181 |
| Sitemap language alternatives | 722 |
| Successful sitemap URL responses | 181 / 181 |
| Duplicate sitemap titles/descriptions | 0 / 0 groups |
| Canonical mismatches in sitemap crawl | 0 |
| H1 failures in sitemap crawl | 0 |
| JSON-LD parse failures | 0 |
| Orphan sitemap URLs | 0 |
| Confirmed broken official links | 0 |
| Official links reachable by automated check | 162 / 173 |
| Official links blocked by site security | 5 |
| Official links unavailable to the crawler | 6 |

## Top 10 priority issues

| Priority | Page/file | Verified issue | Evidence | Recommended solution | Code change? |
|---|---|---|---|---|---|
| P0 | `/en`, `/ta`, `/hi`, `/fr`; `lib/i18n.ts` and sitemap output | Homepage hreflang alternates use trailing-slash URLs that redirect to non-slash canonicals. | `/en/` returns 308 to `/en`; live canonical is `/en`; live hreflang and sitemap alternates use `/en/`. | Emit direct, canonical locale-home URLs in HTML and sitemap; retain `/` to `/en` redirect. | Yes |
| P1 | Localized `/ta|hi|fr/{about,contact,privacy,terms,disclaimer}`; `app/[locale]/[[...segments]]/page.tsx` | Indexable localized trust pages are abbreviated generic copy and are not equivalent to the detailed English policies. | These 15 URLs are in the sitemap; localized branch renders two short paragraphs. | Fully localize and legally review them, or temporarily noindex/exclude incomplete variants. | Yes + manual review |
| P1 | Localized country/category pages | Non-English pages are indexable but do not receive the deeper English-only country/category detail records. | English-specific content is selected only for `locale === "en"`. | Add factual translations from existing verified content; noindex only genuinely incomplete variants. | Yes + translation review |
| P1 | Contact and Privacy pages | No public editorial/privacy contact channel is currently offered. | Contact copy explicitly says no public editorial inbox; Privacy says a request route must be published before claiming availability. | Establish a monitored address or secure form and publish realistic handling terms. | Manual setup + code |
| P1 | Consent experience; `components/ConsentManager.tsx` | Users cannot reopen preferences after choosing; consent is binary and may not meet every target region's ad requirements. | Banner exposes accept/reject only and no persistent settings control. | Add a persistent preference control and use a certified CMP where required before personalized ads. | Yes + legal/manual |
| P1 | Six official source URLs | Automated crawler could not confirm six official URLs, including Canada Post, SBI, ICICI, and an HDFC PDF. | 6 network/server-error results; none returned a confirmed 404. | Manually inspect in a normal browser and replace only if the official owner confirms a current URL. | Possibly |
| P1 | `/en`; homepage component | Homepage HTML is about 246 KB because all 249 countries are rendered with other homepage content. | Production response size was 245,890 bytes. PSI API was quota-limited, so CWV impact is unproven. | Reduce initial rendered directory UI while preserving crawlable country access, or move full directory to the existing directory destination. | Yes |
| P2 | All 181 indexable pages; layout/page metadata | Live pages have OG/Twitter text metadata but no `og:image` or `twitter:image`. | Parent layout defines images; child metadata replaces nested OG/Twitter objects. | Merge or repeat the shared image fields in page metadata. | Yes |
| P2 | 35 URLs, especially Amazon US | Titles exceed 60 characters. This is a snippet heuristic, not a Google limit. | Amazon US had 36 impressions and 0 clicks; 35 crawled titles were longer than 60 characters. | Rewrite high-impression titles first while preserving intent and uniqueness. | Yes |
| P2 | Mobile header/search and global layout | A small mobile “Go” control is below the common 44px touch-target guideline; no skip-to-content link was found. | 390×844 visual test measured approximately 37×32 px; source search found no skip link. | Increase target size and add a visible-on-focus skip link. | Yes |

## Top 10 opportunities

These are hypotheses unless tied to the small Search Console sample.

1. Improve the existing Amazon US page snippet and content before making another Amazon URL; it already received 36 impressions.
2. Strengthen the existing complaint-escalation guide around the observed query “how to escalate issue in english” without creating a duplicate page.
3. Improve the warranty replacement guide around verified claim preparation, rejection, and escalation; “warranty replacement” already produced impressions.
4. Add fuller, reviewed Tamil/Hindi/French content to existing routes rather than creating new languages.
5. Expand verified country-specific guidance within the existing India, US, UK, Canada, and Australia hubs.
6. Make “no verified public direct phone/email” explicit where official companies provide self-service only; never infer a number.
7. Improve contextual links from company pages to their country/category hubs and from issue guides to relevant verified companies.
8. Develop official-source-backed content for payment failure, delivery tracking, refund delay, warranty rejection, and escalation within existing guide URLs.
9. Recheck French Amazon demand shown in historical impressions, but keep incomplete localized company pages noindex until useful translation and verified regional facts exist.
10. Build trust through a working correction/privacy contact route, transparent verification dates, and clear editorial methodology.

## What is working correctly

- Every sitemap URL resolved successfully and matched its canonical.
- Titles, descriptions, H1s, and structured data were present and unique across the sitemap crawl.
- Empty country/category combinations and incomplete translated company/guide variants are noindex and excluded from the sitemap.
- Company records are country-specific and carry verification dates and official source URLs.
- The site does not substitute one country's phone number across all regions.
- Search, no-result search, company search, guide search, and intent search returned the expected production results.
- Breadcrumbs are linked and have valid `BreadcrumbList` JSON-LD.
- `/`, `/en/`, legacy tools, 404s, and search result indexability behave intentionally.
- Mobile and desktop layouts had no horizontal overflow in visual checks.
- GA4 and Search Console are connected; consent defaults analytics and ads storage to denied.

## What should not be changed

- Do not index empty or unverified country-company/category combinations.
- Do not create separate pages for slight keyword variations when an existing guide satisfies the same intent.
- Do not copy a US or India contact number into another country page.
- Do not remove self-referencing canonicals or the current noindex rules for incomplete translated company/guide pages.
- Do not redirect unrelated retired pages to the homepage.
- Do not replace official-source-first content with scraped directory data.
- Do not promise AdSense approval, rankings, traffic, response times, refunds, or warranty outcomes.

## Verified Google performance snapshot

### Search Console

Available performance window: 2026-10-29 to 2026-11-03.

- 5 clicks, 134 impressions, 3.7% CTR, average position 30.2.
- Top countries by impressions: US 42, India 26, Brazil 19, Canada 9, Russia 7.
- India generated all 5 recorded clicks.
- `/en/us/companies/amazon`: 36 impressions, 0 clicks.
- `/en`: 8 impressions, 2 clicks.
- `/en/in`: 6 impressions, 1 click.
- Sitemap status: Success; 181 discovered pages.
- Pages indexing report: Google still processing; counts unavailable.

### GA4

Last-seven-day UI snapshot:

- 122 views, 13 active users, 292 events, 0 key events.
- Session source: Direct 25; Google organic 13; Search Console referral 1.
- These figures can include owner and QA activity and must not be interpreted as 13 external customers without filtering.

## 30-day roadmap

### Days 1–7

- Fix canonical homepage hreflang/sitemap alternate URLs.
- Manually verify the six inconclusive official source URLs.
- Decide whether to fully translate or temporarily noindex incomplete localized trust pages.
- Add a monitored correction/privacy contact channel.

### Days 8–14

- Improve Amazon US, escalation, complaint-email, refund, and warranty pages using verified sources and actual GSC queries.
- Add a persistent consent-preferences control and complete regional legal review.
- Correct OG/Twitter image metadata.

### Days 15–21

- Translate and review the existing non-English country/category content; do not create new URLs.
- Improve high-impression title snippets and contextual internal links.
- Reduce homepage payload while preserving crawlable country navigation.

### Days 22–30

- Re-crawl all sitemap URLs and re-run SEO/i18n/company audits.
- Review GSC week-over-week only after data settles; inspect indexing and URL Inspection for priority pages.
- Validate GA events in DebugView and define key events only for real business outcomes.

## Manual versus Codex work

Manual work: legal/privacy review, creating a monitored email or form, CMP/AdSense account choices, official-link verification when automated access is blocked, Search Console indexing requests, and native-language editorial approval.

Safe Codex work after approval: hreflang URL fix, metadata image merge, title refinements, accessibility controls, internal-link improvements, noindex/sitemap adjustments, content implementation from approved translations, automated regression tests, and report revalidation.

## Evidence and limitations

The audit used the current codebase, production crawl, project validation scripts, responsive browser inspection, and signed-in GSC/GA views. PageSpeed Insights returned HTTP 429 and Search Console had no Core Web Vitals field data; therefore this report makes no LCP, INP, or CLS claim. External source failures caused by 403, timeout, or server protection are marked inconclusive rather than broken.

Detailed evidence is in the companion reports in this folder.
