# ResolveNexa Performance & UX Report

Audit date: 2026-11-06

## Tested experiences

- Homepage, company page, guide, complaint tool, search results, and error routes.
- Desktop viewport: 1440×900.
- Mobile viewport: 390×844.
- Search behavior: company, issue intent, guide, and no-result queries.
- Source inspection for scripts, consent, accessibility, and analytics.

## Verified positives

- No horizontal overflow at tested desktop or mobile widths.
- Desktop navigation and mobile menu switch correctly.
- One H1 was present on every indexable crawled page.
- Search and country controls remained usable on mobile.
- Desktop company grid rendered in three columns; mobile content stacked cleanly.
- Search behavior tests returned 200 and the expected result/no-result markers.
- Focus-visible and reduced-motion CSS rules exist.
- Images inspected have appropriate descriptive or empty decorative alt text.
- Production HTML responses were successful and responsive in the audit environment.

## Findings

### P1 — Homepage response is large

- **Affected URLs:** `/en`, `/ta`, `/hi`, `/fr`.
- **Issue:** Rendering all 249 country links with the rest of the homepage produces a large HTML document.
- **Evidence:** `/en` response measured 245,890 bytes. Representative company/guide pages measured about 92–94 KB.
- **Recommendation:** Reduce the initial directory presentation or use an existing dedicated directory destination while preserving crawlable country discovery and accessible search.
- **Code changes required:** Yes.

### P1 — Consent controls need a persistent preference entry point

- **Affected component:** `components/ConsentManager.tsx`.
- **Issue:** After accept/reject, users have no obvious way to revisit the decision; the dialog does not expose granular categories.
- **Evidence:** Static and visual UI review.
- **Recommendation:** Add a footer/settings control, accessible dialog semantics, and region-appropriate consent management.
- **Code changes required:** Yes.

### P2 — Small mobile touch target

- **Affected control:** mobile country/search “Go” action in the header/home control area.
- **Issue:** The tested target was approximately 37×32 px, below the common 44×44 px touch-target guideline.
- **Evidence:** 390×844 visual measurement.
- **Recommendation:** Increase padding/minimum size without widening the mobile layout.
- **Code changes required:** Yes.

### P2 — No skip-to-content link

- **Affected layout/header components.**
- **Issue:** Keyboard users must traverse repeated navigation before main content.
- **Evidence:** No skip-link implementation was found during source search or keyboard-oriented review.
- **Recommendation:** Add a visible-on-focus skip link targeting the main content container.
- **Code changes required:** Yes.

### P2 — Mobile search placeholder is visually clipped

- **Affected search input:** homepage/header search at 390 px width.
- **Issue:** Long placeholder text is truncated. Functionality remains intact.
- **Evidence:** Mobile screenshot inspection.
- **Recommendation:** Use shorter mobile placeholder copy or responsive text while retaining an accessible label.
- **Code changes required:** Yes.

### P2 — Analytics event name does not match behavior

- **Affected component:** `components/RouteAnalytics.tsx`.
- **Issue:** A category route view is logged as `category_click`.
- **Evidence:** Static source inspection.
- **Recommendation:** Separate view and click events and validate parameters in GA DebugView.
- **Code changes required:** Yes.

### P2 — CSS contains legacy/overlapping theme layers

- **Affected global stylesheet.**
- **Issue:** The stylesheet is roughly 63 KB and contains repeated overrides/media sections from redesign iterations.
- **Evidence:** Source size and structure inspection. No visual break was found.
- **Recommendation:** Remove only demonstrably unused rules after route-by-route visual regression testing; do not perform a blind rewrite.
- **Code changes required:** Optional.

## Performance measurements and limitations

Representative production fetches in the audit environment:

| Route | HTML size | Observed fetch range |
|---|---:|---:|
| `/en` | 245,890 bytes | 61–363 ms |
| Amazon US company | 93,826 bytes | 59–80 ms |
| Warranty guide | 91,866 bytes | 49–76 ms |
| Complaint tool | 60,364 bytes | 46–132 ms |

These timings are network/server observations, not Core Web Vitals. PageSpeed Insights returned HTTP 429, and Search Console had no field CWV data. LCP, INP, and CLS are therefore unverified.

## Search and navigation assessment

- Intent-based search, company search, guide search, and no-result paths passed.
- Search result pages correctly use noindex/follow.
- Country and language selectors are visible and do not force IP redirects.
- Breadcrumbs are clickable and use canonical URLs.
- Footer trust links remain visible.
- No broken internal link was found by the source checker or production crawl.

## Accessibility basics

Working:

- Visible focus styling.
- Reduced-motion handling.
- Semantic headings and one H1.
- Form labels/ARIA labels on principal controls.
- Responsive layout without overflow.

Needs improvement:

- Skip link.
- Mobile target size.
- Consent-dialog focus and preference reopening.
- Continued manual screen-reader and keyboard testing; automated/source review is not a WCAG conformance audit.

## UX conclusion

The current site is readable, responsive, and functional. The most valuable performance/UX work is reducing homepage payload, improving consent control, and fixing small accessibility interaction gaps. No severe broken UI was observed.
