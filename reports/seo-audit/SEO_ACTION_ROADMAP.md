# ResolveNexa SEO Action Roadmap

Audit date: 2026-11-06
This is a recommendation plan only. No implementation is included.

## Prioritization rules

- P0: confirmed issue that can send inconsistent indexing signals.
- P1: meaningful content, trust, international, or monetization risk.
- P2: optimization with likely user/search value but no critical failure.
- P3: optional refinement or audit-tool quality improvement.

## P0 — Correct international URL signals

### 1. Align locale-home canonical and hreflang URLs

- **Affected URLs/files:** `/en`, `/ta`, `/hi`, `/fr`; `lib/i18n.ts:214-221`; sitemap generation.
- **Issue:** Alternate URLs contain trailing slashes and redirect to the non-slash canonicals.
- **Evidence:** `/en/` returns 308 to `/en`; live canonical is `/en`; HTML/sitemap alternate is `/en/`.
- **Recommended solution:** Emit `/en`, `/ta`, `/hi`, `/fr` directly for HTML hreflang, sitemap alternatives, and `x-default`. Keep `/` redirecting to `/en`.
- **Code changes required:** Yes.
- **Validation:** Crawl four homepages; compare canonical/hreflang/sitemap; inspect `/en/` redirect; rerun i18n tests and URL Inspection.

## P1 — Trust, content equivalence, and verified sources

### 2. Resolve localized trust-page quality

- **Affected URLs:** 15 Tamil/Hindi/French About, Contact, Privacy, Terms, and Disclaimer pages.
- **Issue/evidence:** Indexable sitemap pages contain abbreviated generic content rather than equivalent policy detail.
- **Recommended solution:** Fully translate and review; otherwise noindex and exclude incomplete variants until ready.
- **Code changes required:** Yes; legal/native-language review is manual.

### 3. Improve localized country/category depth

- **Affected URLs/files:** non-English country/category routes; `page.tsx:155-175`.
- **Issue/evidence:** English-only detail data is omitted from other indexable locales.
- **Recommended solution:** Translate approved verified material and official sources; do not generate country facts mechanically.
- **Code changes required:** Yes after editorial approval.

### 4. Establish a correction/privacy contact route

- **Affected URLs:** `/en/contact`, `/en/privacy` and localized equivalents.
- **Issue/evidence:** No public editorial/privacy request route exists.
- **Recommended solution:** Create a monitored, spam-protected route and publish accurate handling expectations.
- **Code changes required:** Manual account/process setup plus code/content.

### 5. Upgrade consent management

- **Affected component:** `components/ConsentManager.tsx`.
- **Issue/evidence:** Binary choice, no persistent reopen control, no granular preferences.
- **Recommended solution:** Add accessible preferences and use a suitable CMP where regional ad rules require it.
- **Code changes required:** Yes plus manual/legal configuration.

### 6. Manually verify inconclusive official links

- **Affected records:** SBI, HDFC Bank, ICICI Bank, Royal Mail, Canada Post and blocked official pages.
- **Issue/evidence:** 6 unavailable and 5 blocked responses; none confirmed broken.
- **Recommended solution:** Verify in a normal browser and change only confirmed stale URLs.
- **Code changes required:** Possibly; verification itself is manual.

### 7. Reduce homepage HTML weight safely

- **Affected URLs:** four locale homepages.
- **Issue/evidence:** `/en` HTML is about 246 KB, largely due to the 249-country directory.
- **Recommended solution:** Simplify initial rendering while retaining crawlable and accessible country discovery through an existing route or server-rendered directory strategy.
- **Code changes required:** Yes.

## P2 — Search snippets, sharing, UX, and measurement

### 8. Restore OG/Twitter images

- **Affected files:** localized layout and dynamic page metadata.
- **Evidence:** 181/181 crawled pages lack social image tags.
- **Solution:** Preserve shared image fields when generating child metadata.
- **Code changes required:** Yes.

### 9. Optimize actual-impression pages first

- **Affected URLs:** Amazon US, complaint-email, escalation, refund and warranty guides.
- **Evidence:** Amazon US 36 impressions/0 clicks; complaint email 10/0; escalation 7/0 in the early GSC sample.
- **Solution:** Improve existing title, description, introduction and FAQ for observed intent. Do not make duplicate URLs.
- **Code changes required:** Yes.

### 10. Refine long titles selectively

- **Affected URLs:** 35 titles above 60 characters.
- **Evidence:** Crawl measurement; no duplicates.
- **Solution:** Shorten only where readability and intent improve. Google has no strict 60-character title rule.
- **Code changes required:** Yes, selectively.

### 11. Improve accessibility controls

- **Affected layout:** header/search/global layout.
- **Evidence:** no skip link; mobile “Go” target approximately 37×32 px.
- **Solution:** Add skip-to-content and minimum touch sizing; shorten mobile placeholder while retaining a label.
- **Code changes required:** Yes.

### 12. Correct analytics semantics

- **Affected file:** `components/RouteAnalytics.tsx`.
- **Evidence:** category page view uses `category_click`.
- **Solution:** separate `category_view` and actual click events; validate all event parameters in DebugView.
- **Code changes required:** Yes.

### 13. Clarify self-service-only company pages

- **Affected URLs:** 11 company pages listed in `COMPANY_PAGES_AUDIT.md`.
- **Evidence:** official web/self-service exists but no stored direct channel.
- **Solution:** Clearly state that no verified public direct channel is included and direct users to official help. Do not add third-party numbers.
- **Code changes required:** Content change.

### 14. Prepare ad placements only after trust work

- **Affected canonical routes and `AdSlot` usage.
- **Evidence:** AdSense loader exists, but current canonical route inspection did not confirm live ad slots.
- **Solution:** After consent/trust readiness, add clearly labelled, low-disruption placements away from official action controls.
- **Code changes required:** Yes, later.

## P3 — Maintenance improvements

### 15. Fix audit-script hreflang false positives

- **Affected file:** `scripts/audit-full-site.mjs`.
- **Evidence:** script expects all locales on intentionally English-only pages; dedicated i18n test correctly passes.
- **Solution:** Encode route-specific alternate expectations.
- **Code changes required:** Yes, test tooling only.

### 16. Update GA property naming

- **Affected account:** GA4 property still displays “SupportSphere Website”.
- **Evidence:** signed-in GA administration UI.
- **Solution:** Rename property/stream to ResolveNexa for operator clarity; this has no ranking benefit.
- **Code changes required:** No; manual GA setting.

### 17. Consider country-aware OG locale

- **Affected metadata helper.**
- **Evidence:** English country pages use language-default `en_US`.
- **Solution:** Derive OG locale from supported language-country combinations if useful.
- **Code changes required:** Optional.

## 30-day implementation schedule

### Week 1 — Correctness and trust decisions

1. Fix and test locale-home alternate URL forms.
2. Manually inspect inconclusive official URLs.
3. Choose full translation versus temporary noindex for localized trust pages.
4. Establish an editorial/privacy contact process.

Success checks: 181 sitemap URLs still valid; no redirecting hreflang; canonical/hreflang tests pass; no official data changed without source proof.

### Week 2 — High-value existing pages

1. Improve Amazon US snippet/content from actual GSC queries.
2. Refine escalation, complaint-email, refund, and warranty guides.
3. Add contextual links, not new keyword-variant URLs.
4. Restore OG/Twitter images.

Success checks: unique metadata; one H1; unchanged canonical/indexability; all official claims sourced; internal links valid.

### Week 3 — International and UX quality

1. Translate approved country/category detail content.
2. Add consent-preference reopening.
3. Add skip link and larger touch targets.
4. Design a lighter homepage country-directory presentation.

Success checks: native-language editorial review; no empty pages indexed; mobile/desktop visual QA; no horizontal overflow.

### Week 4 — Measurement and validation

1. Correct event names and validate GA DebugView.
2. Re-run TypeScript, ESLint, build, internal-link, i18n, company, review, and production crawl checks.
3. Review GSC comparable periods only when enough data is available.
4. Check Pages indexing report, sitemap processing, and priority URL inspection.

Success checks: zero blocking audits; no new canonical/hreflang/robots regressions; report actual data only.

## Manual tasks

- Official-link checks blocked by security or timeouts.
- Native-language and legal review.
- Contact inbox/form ownership and operational process.
- Consent/CMP and AdSense account configuration.
- Search Console URL Inspection and indexing requests.
- GA property rename and DebugView verification.

## Codex-safe tasks after approval

- Hreflang/sitemap URL correction and regression tests.
- Metadata image merging and title refinements.
- Noindex/sitemap rules based on approved content readiness.
- Approved localized content implementation.
- Internal-link and accessibility improvements.
- Analytics event naming changes.
- Homepage payload refactor with crawlability tests.
- Automated audits and production build verification.

## Do not implement

- Do not create thousands of country/company combinations without verified data.
- Do not add phone numbers from third-party directories.
- Do not index incomplete translations.
- Do not split one intent into multiple near-duplicate guides.
- Do not change verified company policies or contacts for keyword reasons.
- Do not claim AdSense approval, rankings, or traffic growth in advance.
