# ResolveNexa Content Quality Report

Audit date: 2026-11-06

## Scope and method

The audit reviewed all 181 indexable sitemap URLs through a production crawl and inspected the corresponding route/data implementation. Rendered word-count heuristics include navigation/footer text and therefore were not used alone to label a page thin. Search intent, unique route data, official sources, headings, FAQ coverage, and indexability were considered together.

## Content inventory

| Page group | Indexable URLs | Assessment |
|---|---:|---|
| Locale homepages | 4 | Useful global discovery; large initial payload |
| Country pages | 20 | Useful listings; non-English versions need more depth |
| Category pages | 72 | Unique metadata and active listings; localized depth varies |
| Company pages | 44 | Verified country-company data and official sources |
| English issue guides | 16 | Clear intent ownership and internal linking |
| Guide hub | 1 | Useful discovery hub |
| Complaint tool | 4 | Functional localized tool |
| Trust pages | 20 | English strong; 15 localized pages abbreviated |

## Findings

### P1 — Localized trust content is materially incomplete

- **Affected URLs/file:** `/ta|hi|fr/{about,contact,privacy,terms,disclaimer}`; `app/[locale]/[[...segments]]/page.tsx:406-411`.
- **Issue:** The translated pages are much shorter and less specific than their English equivalents.
- **Evidence:** The source renders two generic paragraphs for each localized trust page; the URLs are indexable and in the sitemap.
- **Recommendation:** Translate and review the complete English policies or temporarily noindex incomplete variants.
- **Code changes required:** Yes after approved translations.

### P1 — Localized country/category copy lacks the English detail layer

- **Affected pages/file:** non-English country/category routes; `page.tsx:155-175`.
- **Issue:** Useful English country and category details are not supplied in Tamil, Hindi, or French.
- **Evidence:** Detailed records are gated to English in source.
- **Recommendation:** Translate only the existing verified facts, FAQs, and guidance. Do not mechanically change country names in generic copy.
- **Code changes required:** Yes.

### P1 — Public correction/contact path is weak

- **Affected URLs:** `/en/contact`, `/en/privacy`.
- **Issue:** Users are told to verify information, but no public editorial inbox or privacy request route is available.
- **Evidence:** The Contact page says no public editorial inbox is published; the Privacy page acknowledges a request route must be published before claiming it exists.
- **Recommendation:** Establish a monitored and spam-protected contact method, then clearly define its purpose and expected handling.
- **Code changes required:** Manual service setup and page update.

### P1 — Several company pages rely only on official self-service routes

- **Affected pages:** Flipkart, Amazon US/India/UK/Canada, Google US, Meesho, Myntra, Paytm, eBay, Booking.com.
- **Issue:** No verified direct phone/email/chat field is published in the current record. This is not missing data to guess; it is a content-clarity opportunity.
- **Evidence:** Company audit produced 11 notices for official web/self-service-only records.
- **Recommendation:** State plainly that no verified public direct channel is included and explain how to use the official help flow. Add a direct channel only when an official source publishes it.
- **Code changes required:** Content refinement only.

### P2 — High-impression pages need snippet/content refinement before new URLs

- **Affected pages:** `/en/us/companies/amazon`, `/en/guides/how-to-escalate-customer-complaint`, `/en/guides/how-to-write-complaint-email`, warranty/refund guides.
- **Issue:** Existing pages have impressions but limited clicks in a very small sample.
- **Evidence:** Amazon US had 36 impressions/0 clicks; complaint-email 10/0; escalation 7/0. “Warranty replacement” and escalation-related queries appeared.
- **Recommendation:** Refine the existing title/introduction/FAQ to answer the exact intent. Do not create separate near-duplicate articles.
- **Code changes required:** Yes, after query review.

### P2 — Homepage country directory is useful but visually/content-heavy

- **Affected URL:** `/en` and localized homepages.
- **Issue:** Rendering the full 249-country directory makes the response large and can dilute the immediate primary action.
- **Evidence:** Production HTML was approximately 246 KB.
- **Recommendation:** Preserve crawlable global discovery but simplify initial presentation or link to an existing full directory view. Avoid client-only hiding that removes crawlable links.
- **Code changes required:** Yes.

### P2 — Some category/company issue sections are inapplicable or absent

- **Affected pages:** India Post, Jio, SBI, Canada Post, Australia Post and related company templates.
- **Issue:** The company audit noted no refund/warranty/delivery/billing section on five records. These topics may not apply.
- **Evidence:** Automated company audit notices.
- **Recommendation:** Add only applicable verified guidance; otherwise explicitly direct users to the relevant official complaint/service route instead of forcing a generic section.
- **Code changes required:** Only with verified source evidence.

## Search intent ownership

The current architecture largely avoids cannibalization:

- Company name/contact intent → country-company page.
- Broad category intent → country-category page.
- Refund, delivery, tracking, payment, billing, cancellation, warranty, support response, and escalation intents → dedicated guide pages.
- Complaint drafting intent → complaint generator and complaint-email guide, with different functional intent.

Potential overlap should be managed through internal linking rather than new pages:

- Refund guide vs company refund sections.
- Billing dispute vs payment-failed guide.
- Customer-support-not-responding vs complaint escalation.
- Complaint-email guide vs complaint generator.

Company pages should summarize the issue and link to the deeper guide; guides should remain company-neutral and link to verified relevant companies/categories.

## Missing useful information opportunities

These are recommendations, not claims that every page needs every section:

- A concise “what to prepare” checklist on issue guides.
- Clear evidence/document lists for refunds, delivery disputes, billing, and warranty claims.
- Escalation steps that distinguish company escalation from regulator/legal options without making legal promises.
- Explicit “official source last verified” explanation near contact data.
- More issue-specific FAQs on high-impression pages.
- Native-language equivalents of approved English guidance.

## Keyword opportunity hypotheses

No search-volume or difficulty data was available. Hypotheses based on current structure and actual early queries include:

- `[company] official customer support`
- `[company] customer service phone number` only when an official number exists
- `[company] refund not received`
- `[company] tracking not updating`
- `package delivered but not received`
- `payment failed money deducted`
- `warranty replacement request`
- `customer complaint escalation`
- `complaint email template`

These should map to existing pages. New URLs are not recommended for minor wording variants.

## Content that should remain noindex

- Empty/unverified country-category pages.
- Incomplete translated company pages.
- Incomplete translated issue-guide pages.
- Search result pages.

## Evidence limitations

The crawl verified all indexable URLs and source implementation. It did not independently re-authorize every corporate policy. Official links were tested for reachability, but 403/timeouts are inconclusive. Company facts should continue to be changed only against official sources.
