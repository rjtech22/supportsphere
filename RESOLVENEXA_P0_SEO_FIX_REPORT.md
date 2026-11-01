# ResolveNexa P0 SEO Fix Report

**Completed:** 2026-11-01
**Scope:** legacy tool consolidation, homepage canonical verification/fix, and content improvements to four existing priority pages.
**Deployment status:** not pushed and not deployed.

## Result

The requested P0 fixes are implemented locally. Five orphan legacy tools now issue direct 301 redirects to the closest existing guide, the English homepage has one canonical indexable URL, locale routes remain available, and the four priority pages contain stronger practical guidance, official references, and contextual internal links.

No company pages, keyword clusters, or routes intended for indexing were added.

## 1. Legacy tool consolidation

The five legacy pages were browser-only specialized generators outside the localized sitemap and canonical architecture. Their useful intent is now preserved through the most relevant existing guide; every destination includes a link to the localized complaint-letter generator.

| Legacy URL | Direct 301 destination | Rationale |
|---|---|---|
| `/tools/refund-email` | `/en/guides/refund-not-received` | Closest missing-refund workflow and complaint-generator path |
| `/tools/delivery-delay` | `/en/guides/complain-about-delayed-delivery` | Existing delivery-delay evidence and resolution guide |
| `/tools/bank-transaction` | `/en/guides/resolve-billing-dispute` | Broadest existing transaction/billing dispute workflow |
| `/tools/warranty-complaint` | `/en/guides/request-warranty-replacement` | Existing warranty evidence, diagnostics and remedy guide |
| `/tools/follow-up-email` | `/en/guides/customer-support-not-responding` | Existing unanswered-case and escalation workflow |

Implementation details:

- Redirects explicitly use HTTP 301.
- Each redirect goes directly to a 200 destination; there is no redirect chain or homepage redirect.
- The five obsolete page modules were removed.
- Old references in legacy source components were replaced with current localized guide/tool links.
- The sitemap continues to exclude all five legacy URLs.

## 2. Homepage duplication and locale SEO

- `/` remains a permanent redirect to `/en`.
- `/en` is the single indexable English homepage.
- `/en` now outputs the exact self-referencing canonical `https://resolvenexa.vercel.app/en`.
- `/ta`, `/hi`, and `/fr` remain 200 indexable locale homepages with their own self-referencing canonicals.
- All locale homepages output `en`, `ta`, `hi`, `fr`, and `x-default` alternatives.
- The sitemap contains the slashless canonical homepage URL.
- Configured `NEXT_PUBLIC_SITE_URL` is normalized to remove trailing slashes before canonical, sitemap, structured-data and hreflang URL construction.

Next.js renders homepage hreflang targets with a trailing slash in HTML. Each one maps to the correct locale and is normalized by one permanent framework redirect to the slashless canonical URL. There is no cross-language mapping error and no redirect chain. Non-home canonical/hreflang URLs render without this homepage-only normalization.

## 3. Priority page improvements

### Amazon US

URL: `/en/us/companies/amazon`

- Added a clearer order-specific resolution sequence.
- Added practical split-shipment, tracking, return-confirmation, refund-status and prior-case steps.
- Added a delivered-but-missing FAQ.
- Replaced generic “first five guides” linking with issue-aware guide links based on the verified company record.
- Kept Amazon's official Customer Service, Returns Center and Your Orders sources.
- No phone number, email, timeline or policy was invented.

### India banking category

URL: `/en/in/categories/banking`

- Added safe first-party bank complaint steps.
- Added links to the existing failed-payment, duplicate-charge, billing-dispute, account-lock and escalation guides.
- Added the official RBI Complaint Management System and current RBI Ombudsman FAQ as country-specific escalation references.
- Clearly states that users must check eligibility and that ResolveNexa cannot decide or submit a complaint.

### Refund guide

URL: `/en/guides/refund-not-received`

- Added a practical refund timeline/evidence section.
- Clarified merchant-first and authenticated payment-provider escalation.
- Added contextual links to Amazon US support and India banking help.
- Added official country-specific reference examples from the US FTC and GOV.UK with a warning not to apply another country's rules.

### Complaint-email guide

URL: `/en/guides/how-to-write-professional-complaint-email`

- Added submission-record and case-reference guidance.
- Added contextual links to the verified company directory and complaint-escalation guide.
- Added the official US FTC sample customer complaint letter as a clearly labelled country-specific example.
- Retained the existing complaint-letter generator CTA.

## Official sources added or re-verified

- RBI Complaint Management System: `https://cms.rbi.org.in/`
- RBI Integrated Ombudsman Scheme FAQs: `https://old.rbi.org.in/commonman/english/scripts/faqs.aspx?id=3407`
- US FTC sample customer complaint letter: `https://consumer.ftc.gov/articles/sample-customer-complaint-letter`
- US FTC returns/refunds resolution guidance: `https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions`
- GOV.UK returns/refunds guidance: `https://www.gov.uk/accepting-returns-and-giving-refunds`
- Existing Amazon official Customer Service, Returns Center and Your Orders sources were retained.

## 4. QA results

| Check | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed |
| Static generation | 411/411 pages generated |
| Company data audit | 44 pages, 0 blocking issues |
| Five legacy redirects | All return 301 with the expected direct destination |
| Redirect destinations | All return 200 |
| Root homepage | 308 permanent redirect to `/en` |
| `/en`, `/ta`, `/hi`, `/fr` | All return 200 and are indexable |
| Homepage canonicals | Exact self-referencing slashless locale URLs |
| Hreflang | `en`, `ta`, `hi`, `fr`, and `x-default` present with correct locale mapping |
| Priority page canonicals | All self-referencing and indexable |
| Sitemap | Priority URLs present; five legacy tool URLs absent |
| Content assertions | Amazon, RBI, FTC and GOV.UK additions present in rendered production HTML |

The first two sandboxed build attempts encountered Windows `EPERM` errors while creating generated `.next` directories. The same production build was rerun outside the restricted sandbox and completed successfully. This was an environment filesystem restriction, not a TypeScript or application error.

## Files changed

### Routing and URL normalization

- `next.config.ts`
- `lib/site.ts`
- `lib/i18n.ts`

### Content and rendering

- `app/[locale]/[[...segments]]/page.tsx`
- `lib/global-data.ts`
- `lib/data.ts`
- `lib/seo-content.ts`
- `app/(legacy)/page.tsx`
- `app/(legacy)/guides/[slug]/page.tsx`

### Removed superseded pages

- `app/(legacy)/tools/refund-email/page.tsx`
- `app/(legacy)/tools/delivery-delay/page.tsx`
- `app/(legacy)/tools/bank-transaction/page.tsx`
- `app/(legacy)/tools/warranty-complaint/page.tsx`
- `app/(legacy)/tools/follow-up-email/page.tsx`

### Report

- `RESOLVENEXA_P0_SEO_FIX_REPORT.md`

## Remaining production step

Review the local diff, then approve a Git push/deployment if desired. No ranking or traffic improvement is claimed; Search Console performance must be monitored after deployment and recrawl.
