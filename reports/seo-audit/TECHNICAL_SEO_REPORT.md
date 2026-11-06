# ResolveNexa Technical SEO Report

Audit date: 2026-11-06
Production base: https://resolvenexa.vercel.app

## Validation summary

| Check | Result |
|---|---|
| TypeScript | Pass |
| ESLint | Pass |
| Production build | Pass; 411 static pages generated |
| Production sitemap crawl | 181/181 HTTP 2xx |
| Internal-link source check | Pass across 48 source files |
| i18n/SEO validation | Pass; 181 URLs and 722 alternatives |
| Company-data audit | Pass; 44 pages, 0 blocking issues |
| Review security audit | Pass; 12/12 checks |

## Findings

### P0 — Locale homepage alternates redirect instead of resolving directly

- **Affected URLs/files:** `/en`, `/ta`, `/hi`, `/fr`; `lib/i18n.ts:214-221`; `app/sitemap.ts`.
- **Exact issue:** The locale-home canonicals omit a trailing slash, while the rendered hreflang links and sitemap alternates include one.
- **Evidence:** `/en` has canonical `https://resolvenexa.vercel.app/en`; its `alternate` links point to `/en/`, `/ta/`, `/hi/`, and `/fr/`. `/en/` returns HTTP 308 to `/en`. Search Console also recorded separate historical signals for `/en` and `/en/`.
- **Recommendation:** Ensure metadata and sitemap serialization emit the exact canonical non-slash URLs. Keep the intentional root redirect `/` → `/en`. Regression-test all four homepages and `x-default`.
- **Code changes required:** Yes.

### P1 — External official links need manual verification

- **Affected pages:** SBI India, HDFC Bank India, ICICI Bank India, Royal Mail UK, Canada Post Canada and related source records in `lib/global-data.ts`.
- **Exact issue:** Six official URLs were unavailable to the automated crawler; five more returned 403.
- **Evidence:** 162/173 official URLs were reachable; 5 were security-blocked; 6 produced timeout, TypeError, or server-error responses. No tested official URL produced a confirmed 404.
- **Recommendation:** Open each inconclusive URL in a normal browser, confirm ownership and relevance, and change it only when an official replacement is verified. Do not classify 403 as broken.
- **Code changes required:** Only if an official replacement is confirmed.

### P2 — Missing social preview images on indexable pages

- **Affected files:** `app/[locale]/layout.tsx:13-20`; `app/[locale]/[[...segments]]/page.tsx:56-57`.
- **Exact issue:** The parent metadata defines OG/Twitter images, but child page metadata replaces the nested objects without preserving image fields.
- **Evidence:** All 181 crawled indexable pages contained OG/Twitter titles and descriptions but no `og:image` or `twitter:image`.
- **Recommendation:** Merge the shared social image fields into each generated metadata object and test representative routes.
- **Code changes required:** Yes.

### P2 — Long title candidates

- **Affected URLs:** 35 sitemap URLs, including `/en`, `/en/gb`, `/en/au`, several US company pages, and `/en/guides/customer-support-not-responding`.
- **Exact issue:** Titles exceed 60 characters. This is a display heuristic, not a technical violation or a Google limit.
- **Evidence:** Production crawl measured 35 titles over 60 characters; there were no duplicate titles.
- **Recommendation:** Prioritize titles with real impressions and low clicks, beginning with Amazon US. Preserve company, country, and intent terms naturally.
- **Code changes required:** Yes, selectively.

### P2 — Search and analytics event semantics need QA

- **Affected files:** `components/RouteAnalytics.tsx`, `components/SearchAnalytics.tsx`, `components/Analytics.tsx`.
- **Exact issue:** A category page view is emitted as `category_click`; this can confuse reporting. Live duplicate firing was not proven.
- **Evidence:** Static source inspection shows route-view logic calling the click-named event. Consent defaults are denied and GA is configured with IP anonymization.
- **Recommendation:** Rename to `category_view` or fire `category_click` only on an actual click. Validate all custom events in GA DebugView before using them for decisions.
- **Code changes required:** Yes.

### P3 — Audit script reports intended hreflang behavior as an error

- **Affected file:** `scripts/audit-full-site.mjs`.
- **Exact issue:** The full-site script expects five hreflang alternatives on English-only company and guide pages.
- **Evidence:** Those pages intentionally expose only `en` and `x-default`; `scripts/check-i18n.mjs` passes this behavior. The full-site script reports them as issues anyway.
- **Recommendation:** Teach the audit script the route-specific locale policy so future reports do not create false positives.
- **Code changes required:** Yes, audit tooling only.

### P3 — Social locale uses language defaults rather than country page region

- **Affected metadata helper:** locale-to-OG mapping used by dynamic metadata.
- **Exact issue:** An English UK or Australia country page can expose `en_US` in Open Graph locale metadata.
- **Evidence:** The mapping is locale-based, not route-country-based.
- **Recommendation:** Optionally derive OG locale from both language and country. This is social-preview semantics and not an hreflang defect.
- **Code changes required:** Optional.

## Checks that passed

### Titles, descriptions, headings

- Every sitemap URL has a title and meta description.
- No duplicate title or description groups were found.
- Every sitemap URL has exactly one meaningful H1.
- H1 and metadata are route-specific for company, guide, category, country, trust, and tool pages.

### Canonical and indexability

- All 181 sitemap URLs returned a self-referencing canonical matching the requested URL.
- Empty country/category combinations are noindex/follow.
- Incomplete localized company and guide variants are noindex/follow and excluded from sitemap.
- Search pages are noindex/follow.
- Unknown pages return 404; the tested generic 404 had `noindex` and no canonical.

### Redirects

- `/` → `/en` with 308.
- `/en/` → `/en` with 308.
- `/about` → `/en/about` with 308.
- Retired tool paths redirect permanently to the relevant existing guide, not the homepage.
- No redirect appeared inside the sitemap, and no tested redirect chain or loop was found.

### Robots and sitemap

`robots.txt` returned 200 and permits the public site while disallowing `/admin/` and `/auth/`. It declares the correct host and sitemap. `sitemap.xml` returned valid output with 181 URLs; Search Console marked it Success and reported 181 discovered pages.

### Structured data

- JSON-LD parsed successfully on all sitemap pages.
- Global organization data, home `WebSite`, company/guide `Article`, relevant `FAQPage`, and linked `BreadcrumbList` structures are present.
- FAQ rich-result display is not guaranteed and should not be presented as such.

### Open Graph and Twitter

Titles, descriptions, URL, locale, type, and Twitter card metadata are present. Only image fields are missing from page-level output.

## 404/500 and reliability results

- Sitemap URLs: 181 successful, 0 redirect responses, 0 client failures, 0 server failures.
- Tested unknown routes returned 404.
- No production 500 was found on a sitemap URL.
- External official-domain errors are documented separately and are not ResolveNexa server errors.

## Core Web Vitals limitation

PageSpeed Insights returned HTTP 429 and Search Console showed no Core Web Vitals field data. Representative HTML fetches were responsive in the audit environment, but those timings are not LCP, INP, or CLS. No CWV pass/fail claim is made.

## Source references

- Google title links: https://developers.google.com/search/docs/appearance/title-link
- Google canonicalization: https://developers.google.com/search/docs/crawling-indexing/canonicalization
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google snippets: https://developers.google.com/search/docs/appearance/snippet
