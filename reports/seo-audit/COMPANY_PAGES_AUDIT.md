# ResolveNexa Company Pages Audit

Audit date: 2026-11-06
Verified company-country pages: 44

## Overall result

The company-data audit passed with zero blocking issues. All 44 company routes have a unique company-country identity, verified date, official sources, metadata, canonical, H1, structured data, and internal links. Production crawling found no duplicate route, duplicate title group, canonical mismatch, JSON-LD parse error, or failed sitemap response.

Thirty-three records include at least one populated direct-channel field in the current data model. Eleven records intentionally rely on official web/self-service routes because no verified direct field is stored. This is safer than guessing a phone number.

## Page inventory

| Country | Company pages | Categories represented |
|---|---:|---|
| United States | 18 | Courier, e-commerce, electronics, software, payments, travel |
| India | 21 | Courier, e-commerce, telecom, banking/payments, travel, electronics, appliances |
| United Kingdom | 2 | Courier, e-commerce |
| Canada | 2 | Courier, e-commerce |
| Australia | 1 | Courier |

## Company-by-company result

“Pass” means the route and stored data passed the automated data/SEO checks; it does not mean every possible support channel exists.

| Country | Company URL | Result | Verified note / follow-up |
|---|---|---|---|
| US | `/en/us/companies/usps` | Pass | Refund/warranty/billing sections are not forced where inapplicable. |
| US | `/en/us/companies/dell` | Pass | Country-specific official sources retained. |
| US | `/en/us/companies/amazon` | Pass | Official self-service only in stored direct-channel fields; 36 GSC impressions/0 clicks merits snippet review. |
| US | `/en/us/companies/apple` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/samsung` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/microsoft` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/google` | Pass | Official web/self-service only in stored direct-channel fields. |
| US | `/en/us/companies/hp` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/lenovo` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/paypal` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/adobe` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/walmart` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/ebay` | Pass | Official self-service only; homepage returned 403 to automated checker, not a confirmed broken link. |
| US | `/en/us/companies/fedex` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/ups` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/dhl-express` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/airbnb` | Pass | Official sources and verified channels present. |
| US | `/en/us/companies/booking-com` | Pass | Official self-service only in stored direct-channel fields. |
| India | `/en/in/companies/india-post` | Pass | No generic refund/warranty/billing section; add only applicable verified help. |
| India | `/en/in/companies/flipkart` | Pass | Official self-service only in stored direct-channel fields. |
| India | `/en/in/companies/jio` | Pass | No generic delivery/warranty section; service-specific support is more appropriate. |
| India | `/en/in/companies/sbi` | Pass | Complaint-form URL was inconclusive in automated external check; manual browser verification required. |
| India | `/en/in/companies/lg-india` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/irctc` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/amazon-india` | Pass | Official self-service only in stored direct-channel fields. |
| India | `/en/in/companies/meesho` | Pass | Official self-service only; official site returned 403 to crawler, not confirmed broken. |
| India | `/en/in/companies/myntra` | Pass | Official self-service only in stored direct-channel fields. |
| India | `/en/in/companies/ajio` | Pass | Official homepage returned 403 to crawler, not confirmed broken. |
| India | `/en/in/companies/nykaa` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/hdfc-bank` | Pass | Official grievance PDF timed out; manually recheck before changing. |
| India | `/en/in/companies/icici-bank` | Pass | Complaint URL was inconclusive; manually recheck before changing. |
| India | `/en/in/companies/axis-bank` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/paytm` | Pass | Official self-service only in stored direct-channel fields. |
| India | `/en/in/companies/phonepe` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/google-pay-india` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/airtel-india` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/vi` | Pass | Current official support and telecom-charter sources retained. |
| India | `/en/in/companies/bsnl` | Pass | Official sources and verified channels present. |
| India | `/en/in/companies/xiaomi-india` | Pass | Official sources and verified channels present. |
| UK | `/en/gb/companies/royal-mail` | Pass | One support URL blocked and one unavailable to crawler; manual normal-browser check required. |
| UK | `/en/gb/companies/amazon-uk` | Pass | Official self-service only in stored direct-channel fields. |
| Canada | `/en/ca/companies/canada-post` | Pass | Official pages returned server errors to crawler; manually verify; no confirmed 404. |
| Canada | `/en/ca/companies/amazon-canada` | Pass | Official self-service only in stored direct-channel fields. |
| Australia | `/en/au/companies/australia-post` | Pass | No generic refund/warranty/billing section; add only applicable verified help. |

## Findings

### P1 — Inconclusive official sources need manual verification

- **Affected records:** SBI, HDFC Bank, ICICI Bank, Royal Mail, Canada Post; `lib/global-data.ts`.
- **Issue:** Six URLs could not be confirmed by automated requests; five additional official pages blocked the checker.
- **Evidence:** External link audit: 162 reachable, 5 blocked, 6 unavailable, 0 confirmed broken.
- **Recommendation:** Verify in a normal browser and against the official domain. Replace only confirmed stale URLs.
- **Code changes required:** Only when a replacement is verified.

### P1 — Self-service-only records need explicit user guidance

- **Affected pages:** the 11 pages marked “official self-service only” above.
- **Issue:** Users searching for a number may not understand why none is shown.
- **Evidence:** Company audit emitted notices because no direct phone/email/chat field is present.
- **Recommendation:** Explain that ResolveNexa has not verified a public direct channel and link to the official sign-in/help flow. Never fill the gap with third-party numbers.
- **Code changes required:** Content refinement.

### P2 — Amazon US snippet opportunity

- **Affected URL:** `/en/us/companies/amazon`.
- **Issue:** The page already attracts impressions but no clicks in the small available sample.
- **Evidence:** Search Console: 36 impressions, 0 clicks.
- **Recommendation:** Review title/description against the actual queries; emphasize official help routes and country specificity without claiming a phone number.
- **Code changes required:** Yes, after query analysis.

### P2 — Issue coverage should remain applicability-based

- **Affected pages:** India Post, Jio, SBI, Canada Post, Australia Post.
- **Issue:** Automated audit notes missing generic refund/warranty/delivery/billing sections.
- **Evidence:** Five informational audit notices.
- **Recommendation:** Add a section only when it matches the service and is supported by an official source. A verified complaint/tracking/service route is better than boilerplate.
- **Code changes required:** Optional and source-dependent.

## SEO and linking assessment

- Titles/descriptions are unique across all company routes.
- Company pages self-canonicalize and are English-only indexable.
- Incomplete translated variants are noindex/follow and excluded from sitemap.
- Company pages link to relevant country/category context and issue guides.
- Breadcrumbs use canonical linked URLs and structured data.
- No verified company facts should be replaced merely to increase keyword density.

## Safety requirements to preserve

- Show phone numbers only when an official source supports them.
- Keep verification dates and source URLs visible.
- Do not infer refund, warranty, cancellation, or working-hour terms.
- Keep country-company records independent; do not reuse a number globally.
- Treat 403/timeouts as inconclusive, not stale.
