# ResolveNexa Keyword-to-Content Map

**Audit date:** 2026-11-02  
**Scope:** existing routes, sitemap, metadata, page content, multilingual routing, keyword strategy, and internal linking.  
**Change boundary:** this report is the only file created. No website content, metadata, routes, database records, Git history, or deployment configuration were changed.

## Executive summary

- Every supplied keyword can be handled by an existing page or existing country/category/company template. **No new indexable page is immediately required.**
- The current static strategy generates **344 English keyword rows**: 321 conditional company rows across 44 company-country records plus 23 issue/tool rows.
- The strongest architecture is already present: generic problem query → guide, company-prefixed query → company-country page, template query → complaint tool, and country/category query → country category page.
- The main remaining risks are keyword overlap between several guide pages, category keywords that are defined but not passed into category metadata, generic related-guide links on category pages, and incomplete substantive translation on Tamil, Hindi, and French routes.
- The requested dynamic patterns for company warranty, billing, cancellation, generic refund help, and complaint help are not fully represented in `lib/keyword-strategy.ts`, even when verified content fields exist.
- The live sitemap contained **364 canonical URLs** at audit time: 176 company locale URLs, 64 guide locale URLs, no search-result URLs, and no legacy tool URLs. It contained 1,820 hreflang links (five alternatives per URL: `en`, `ta`, `hi`, `fr`, and `x-default`).
- No search volume, keyword difficulty, traffic forecast, or ranking improvement is claimed in this report.

## Source-state clarification

The request stated that the P0 changes were local and not pushed or deployed. At audit time, the repository and live site showed otherwise:

- Local `HEAD` and the local `origin/main` reference both pointed to commit `c19f5c2` (`Implement P0 SEO consolidation and content fixes`).
- The live root returned a permanent redirect to `/en`.
- All five legacy tool URLs returned direct 301 responses to their intended guide destinations.
- The live Amazon US, India banking, refund-not-received, complaint-email, and complaint-generator pages contained the P0 content and self-referencing canonicals.

No push or deployment was performed during this audit. The analysis below uses the checked-in local source plus read-only live HTTP verification.

## Current architecture and indexing model

| Area | Current behavior | SEO consequence |
|---|---|---|
| Homepage | `/` permanently redirects to `/en` | One canonical English homepage |
| Locales | `/en`, `/ta`, `/hi`, `/fr` | Four locale route families with hreflang and self-canonical URLs |
| Company pages | `/{locale}/{country}/companies/{slug}` | One country-specific company page should satisfy all verified company-support intents |
| Country categories | `/{locale}/{country}/categories/{category}` | Indexable only when that country/category has published company data |
| Guides | `/{locale}/guides/{slug}` | Generic issue and how-to intent belongs here |
| Complaint tool | `/{locale}/tools/complaint-letter` | All complaint-template variants should remain consolidated here |
| Search | `/{locale}/search` | Correctly `noindex`; useful for navigation, not a keyword landing page |
| Empty countries/categories | Renderable but `noindex` when no verified listings exist | Prevents empty worldwide coverage from becoming thin indexed pages |
| Sitemap | Published countries, useful category paths, verified companies, guides, tool, and static pages | Search and obsolete tool routes are excluded |

### Locale mapping rule

The English keyword list maps to the `/en/...` URLs below. Equivalent route structures exist for `/ta`, `/hi`, and `/fr`, but English keywords should not simply be copied into those locale strategies. Native Tamil, Hindi, and French keyword rows should be added only after the substantive body content is translated and the query wording is researched from real data.

---

## 1. Broad directory, contact, and complaint keywords

| Search intent | Existing target URL | Primary keyword | Secondary keywords | Current status and action |
|---|---|---|---|---|
| Find a worldwide support directory | `/en` | `customer support directory` | `customer support`; `customer care`; `company customer support`; `complaint resolution` | Strong existing homepage. Keep it as the only generic directory landing page. |
| Find the correct official support channel | `/en/guides/how-to-contact-customer-support` | `how to contact customer support` | `customer service contact`; `how to contact company customer care`; `customer care number` | Existing guide fits. Make clear that a number is shown only when an official source publishes and verifies it. |
| File a company complaint | `/en/guides/how-to-file-a-customer-complaint` | `how to file a complaint against a company` | `customer complaint help`; `complaint resolution` | Existing guide fits. Keep generic complaint process here, not on the homepage. |
| Request a refund before or during processing | `/en/guides/how-to-request-a-refund` | `how to request a refund` | `refund complaint`; `return request rejected` | Existing guide includes a rejected-return section. Remove competing post-refund intent from its metadata. |
| Generate a complaint message | `/en/tools/complaint-letter` | `complaint letter generator` | `free complaint letter generator`; `customer complaint email template` | Existing tool fits and already has crawlable use-case sections. |

### Recommended homepage structure

- **H1:** `Find Customer Support and Resolve Your Complaints` — retain.
- **H2:** `Browse verified company support by country`.
- **H2:** `Find help for common customer support problems`.
- **H2:** `Create a complaint letter or follow-up email`.
- **FAQ:** How do I find an official company support channel?
- **FAQ:** Does ResolveNexa provide customer service or process refunds?
- **FAQ:** Why are some customer-care numbers not listed?
- **FAQ:** How are company support details verified?

---

## 2. Complaint, escalation, and email-writing cluster

| Search intent | Existing target URL | Primary keyword | Secondary keywords | Notes |
|---|---|---|---|---|
| File the first formal complaint | `/en/guides/how-to-file-a-customer-complaint` | `how to file a complaint against a company` | `customer complaint help`; `complaint resolution` | Owns first-complaint process and evidence collection. |
| Escalate an unresolved case | `/en/guides/how-to-escalate-customer-complaint` | `how to escalate a customer complaint` | `complaint escalation` | Do not target `customer support not responding` here because a dedicated page exists. |
| Follow up when support is silent | `/en/guides/customer-support-not-responding` | `customer support not responding` | `complaint follow-up email` as a contextual tool link, not the page's primary term | Owns unanswered-case intent. Link directly to the generator. |
| Write the email | `/en/guides/how-to-write-professional-complaint-email` | `how to write a complaint email` | `customer service escalation email` | Existing P0 content includes escalation-email guidance and submission records. |
| Generate the text | `/en/tools/complaint-letter` | `free complaint letter generator` | `customer complaint email template`; `complaint follow-up email`; `refund request email template`; `warranty claim letter`; `billing dispute letter` | Keep all modes consolidated into one tool. |

### Recommended H2 and FAQ topics

**Complaint guide**

- H2: Define the issue and requested resolution
- H2: Collect evidence and previous case references
- H2: Use the company's official complaint route
- H2: Know when the complaint should be escalated
- FAQ: What information should a customer complaint include?
- FAQ: Can ResolveNexa submit a complaint for me?

**Escalation guide**

- H2: Complete first-line support before escalating
- H2: Build a short case timeline
- H2: Use the company's formal grievance or appeal route
- H2: Check country and industry escalation eligibility
- FAQ: When should I escalate a customer complaint?
- FAQ: Should I create multiple support tickets?

**Complaint-email guide**

- H2: Write a subject line with the issue and reference
- H2: Explain the facts and previous contact
- H2: Ask for one clear resolution
- H2: Write an escalation email when the first case is unresolved
- H2: Keep proof of submission and follow-up
- FAQ: What should a complaint email subject contain?
- FAQ: What sensitive information should never be emailed?

**Complaint tool**

- H2: Generate a customer complaint email
- H2: Create a refund request or follow-up email
- H2: Create a warranty claim or billing dispute letter
- H2: Information to include and sensitive data to exclude
- FAQ: Does the tool upload what I type?
- FAQ: Can I edit the generated letter before sending it?

---

## 3. Refund, return, and cancellation cluster

| Search intent | Existing target URL | Primary keyword | Secondary keywords | Content decision |
|---|---|---|---|---|
| Ask for an eligible refund | `/en/guides/how-to-request-a-refund` | `how to request a refund` | `refund complaint`; `return request rejected` | Pre-refund and rejected-return intent. |
| Trace an initiated or missing refund | `/en/guides/refund-not-received` | `refund not received` | `refund status help` | Post-refund intent. Keep separate from requesting a refund. |
| Cancel an online order | `/en/guides/how-to-cancel-an-online-order` | `how to cancel an online order` | `how to cancel an order`; `cancel online order` | One page covers the close variants. |
| Draft refund correspondence | `/en/tools/complaint-letter` | `refund request email template` | `refund complaint letter` if retained in future research | Tool intent, not refund-policy guidance. |

### Cannibalization fix required

`lib/data.ts` currently assigns `refund not received` to both the request-a-refund guide and the dedicated refund-not-received guide. The request-a-refund page should retain `how to request a refund`, `refund complaint`, and `return request rejected`; the dedicated page should exclusively own `refund not received`, `refund status help`, `refund pending`, and `processed refund missing`.

### Recommended priority headings

**Request-a-refund guide**

- H1: How to Request a Refund
- H2: Check the official refund or return policy
- H2: Start from the original order or account
- H2: Respond when a return request is rejected
- H2: Save confirmation and track the request
- FAQ: What evidence should I keep for a refund complaint?
- FAQ: What should I do if a return request is rejected?

**Refund-not-received guide**

- H1: Refund Not Received: What to Do
- H2: Confirm whether the merchant initiated the refund
- H2: Check the original payment method
- H2: Ask for the refund or trace reference
- H2: Build a refund timeline before escalating
- FAQ: How long should a refund take?
- FAQ: What if the merchant says the refund is complete?

**Cancellation guide**

- H1: How to Cancel an Online Order
- H2: Check the current fulfilment status
- H2: Review cancellation exceptions and fees
- H2: Cancel through the signed-in order page
- H2: Confirm refund and future subscription charges separately
- FAQ: Can every order be cancelled before delivery?
- FAQ: Does cancelling a subscription automatically create a refund?

---

## 4. Delivery and tracking cluster

| Search intent | Existing target URL | Primary keyword | Secondary keywords | Content boundary |
|---|---|---|---|---|
| Delayed, undelivered, or broadly missing parcel | `/en/guides/complain-about-delayed-delivery` | `how to complain about a delayed delivery` | `order not delivered`; `delayed delivery complaint`; `delayed delivery help`; `missing parcel complaint` | Use when tracking does not confirm delivery. |
| Marked delivered but missing | `/en/guides/package-delivered-not-received` | `package says delivered but not received` | `missing package support` | Use only when the official status says delivered. |
| Invalid or inactive tracking | `/en/guides/tracking-number-not-working` | `tracking number not working` | `tracking not updating`; `parcel tracking help` | Owns tracking-system intent. |

### Recommended headings and FAQs

**Delayed-delivery guide**

- H2: Check official tracking and service alerts
- H2: Decide whether to contact the seller or carrier
- H2: Report an order that has not arrived
- H2: Request a trace, replacement, or eligible refund
- FAQ: Who should I contact for a delayed retail order?
- FAQ: What evidence helps a missing-parcel complaint?

**Delivered-but-missing guide**

- H2: Review proof of delivery and safe-place details
- H2: Check household, reception, and approved delivery locations
- H2: Contact the responsible seller or carrier
- H2: Document the missing-package case
- FAQ: Should I contact the seller or carrier first?
- FAQ: Should I publish my delivery address publicly?

**Tracking guide**

- H2: Confirm the carrier and tracking-number format
- H2: Allow for the first carrier scan
- H2: Check whether a replacement tracking number was issued
- H2: Report a persistent tracking failure
- FAQ: Does tracking work immediately after a label is created?
- FAQ: Should I use a third-party tracking website?

---

## 5. Banking, payments, billing, and account-access cluster

| Search intent | Existing target URL | Primary keyword | Secondary keywords | Content boundary |
|---|---|---|---|---|
| Failed transaction with debit | `/en/guides/payment-failed-money-deducted` | `payment failed but money deducted` | `failed transaction complaint` | Owns failed/pending transaction intent. |
| Genuine duplicate charge | `/en/guides/duplicate-charge` | `duplicate charge` | `charged twice`; `duplicate card transaction` | Do not use broad `billing dispute` as a target here. |
| General incorrect or disputed billing | `/en/guides/resolve-billing-dispute` | `billing dispute` | `how to resolve a billing issue`; `card transaction issue`; `billing dispute help` | Broad billing and transaction-routing page. |
| Locked account or sign-in recovery | `/en/guides/account-locked-support` | `account locked` | `account access issue`; `cannot sign in` | Security and recovery intent. |
| Country-specific bank directory | `/en/{country}/categories/banking` | `{country} bank customer support` | `{country} failed transaction complaint`; `{country} billing dispute help` | Category intent must include the country to avoid competing with generic issue guides. |
| Draft a dispute letter | `/en/tools/complaint-letter` | `billing dispute letter` | `customer complaint email template` | Tool intent only. |

### Cannibalization fixes required

- Remove `billing dispute` from the duplicate-charge guide's keyword metadata; keep it on `/resolve-billing-dispute`.
- Remove broad `card transaction issue` from the failed-payment guide; keep it on `/resolve-billing-dispute`, which can route pending, reversed, unauthorized, and duplicate transactions.
- Keep country-category terms country-modified. Generic failed-payment, duplicate-charge, billing-dispute, and account-lock queries belong to the dedicated guides.

### Recommended headings and FAQs

**Failed-payment guide**

- H2: Check whether the payment is pending, reversed, or completed
- H2: Record the merchant and payment-provider references
- H2: Contact the merchant and payment provider in the correct order
- H2: Escalate using the original case reference
- FAQ: Should I repeat the payment immediately?
- FAQ: What transaction information is safe to share?

**Duplicate-charge guide**

- H2: Compare pending and settled transaction records
- H2: Check the merchant order history
- H2: Request a merchant correction in writing
- H2: Use the official card or account dispute route
- FAQ: Is a pending authorization always a duplicate charge?
- FAQ: Which transaction should I dispute?

**Billing-dispute guide**

- H2: Identify the disputed billing or card transaction type
- H2: Check for renewals, partial refunds, and pending authorizations
- H2: Contact the biller with masked evidence
- H2: Use the payment-provider dispute route when appropriate
- FAQ: Should I upload a complete bank statement?
- FAQ: When should I contact the bank instead of the merchant?

---

## 6. Warranty, repair, and replacement cluster

| Search intent | Existing target URL | Primary keyword | Secondary keywords | Notes |
|---|---|---|---|---|
| Request warranty service or replacement | `/en/guides/request-warranty-replacement` | `how to request a warranty replacement` | `device warranty complaint`; `warranty repair complaint`; `service centre help` | One guide can route repair, replacement, and non-warranty paths. |
| Draft a warranty claim | `/en/tools/complaint-letter` | `warranty claim letter` | `customer complaint email template` | Functional template intent. |
| Find company-specific warranty support | `/en/{country}/companies/{company}` | `{company} warranty help` | `{company} repair support`; `{company} service centre help` | Generate only when `warranty` or `replacement` is verified. |

### Recommended headings and FAQs

- H1: How to Request a Warranty Replacement
- H2: Check the official warranty terms and coverage
- H2: Prepare proof of purchase, model, and serial number
- H2: Complete safe official diagnostics
- H2: Separate warranty and non-warranty replacement routes
- H2: Request the remedy supported by the verified terms
- FAQ: Is proof of purchase required for warranty service?
- FAQ: How do I verify an official service centre?

---

## 7. Category keyword map

Category phrases should target existing country-category templates, not new generic category pages. Use the form `/{locale}/{country}/categories/{slug}` and add the country name naturally to title, H1, description, and copy.

| Category template | Primary keyword | Secondary keywords | Current coverage |
|---|---|---|---|
| `/en/{country}/categories/e-commerce` | `{country} online order support` | `{country} e-commerce refund complaint`; `{country} cancel online order` | Verified e-commerce records exist in the US, India, UK, and Canada. |
| `/en/{country}/categories/electronics` | `{country} electronics customer support` | `{country} device warranty complaint`; `{country} technical support contact` | Verified records exist in the US and India. |
| `/en/{country}/categories/telecom` | `{country} telecom customer support` | `{country} mobile billing complaint`; `{country} broadband service complaint` | Verified records currently exist in India. |
| `/en/{country}/categories/banking` | `{country} bank customer support` | `{country} failed transaction complaint`; `{country} billing dispute help` | Verified records exist in the US and India. |
| `/en/{country}/categories/travel` | `{country} travel customer support` | `{country} booking cancellation help`; `{country} travel refund complaint` | Verified records exist in the US and India. |
| `/en/{country}/categories/home-appliances` | `{country} appliance customer support` | `{country} warranty repair complaint`; `{country} service centre help` | One verified India record (LG India). Thinness should be monitored before expanding. |
| `/en/{country}/categories/courier-delivery` | `{country} courier customer support` | `{country} missing parcel complaint`; `{country} delayed delivery help` | Verified records exist in all five published countries. |
| Conditional future `/en/{country}/categories/insurance` | `{country} insurance customer support` | `{country} insurance claim complaint`; `{country} policy grievance help` | No verified insurance company records. Correctly absent from the sitemap today. Do not publish until verified country-specific data exists. |

### Category template gap

`lib/seo-content.ts` defines the category keyword arrays, but the localized category metadata branch does not pass those arrays to the metadata helper. The current H1 format is also only `{Category} — {Country}`. After approval, the category template should use:

- **H1:** `{Category} Customer Support in {Country}`
- **H2:** `Verified {category} companies in {Country}`
- **H2:** `Resolve common {category} problems`
- **H2:** `Official complaint and escalation routes`
- **FAQ:** What information should I prepare before contacting a {category} company?
- **FAQ:** How do I escalate an unresolved {category} complaint in {Country}?

The related-guide section currently uses the first three dictionary guides for most categories. It should instead use a deterministic category-to-guide map.

---

## 8. Dynamic company keyword template

All company-specific keywords should stay on the single verified company-country page:

`/{locale}/{country}/companies/{slug}`

Do not create separate company refund, delivery, warranty, billing, cancellation, number, or complaint pages.

### Requested dynamic pattern map

| Supplied pattern | Existing destination | Rule |
|---|---|---|
| `[Company] customer support` | Company-country page | Publish for every verified company-country record. |
| `[Company] customer service contact` | Company-country page | Use when at least one verified official contact channel exists. |
| `[Company] complaint help` | Company-country page | Use when verified complaint steps exist. |
| `[Company] refund help` | Company-country page | Use only when verified refund information exists. |
| `[Company] + refund` | Company-country page | Map the actual company-prefixed refund phrase to the conditional refund section. |
| `[Company] + delivery` | Company-country page | Map only when verified delivery/tracking information exists. |
| `[Company] + warranty` | Company-country page | Map only when verified warranty or replacement information exists. |
| `[Company] + billing` | Company-country page | Map only when verified billing/payment information exists. |
| `[Company] + cancellation` | Company-country page | Map only when verified cancellation information exists. |

### Recommended template rules

| Keyword pattern | Publish condition | Recommended role |
|---|---|---|
| `[Company] customer service` | Every verified company-country record | Primary |
| `[Company] customer support` | Every verified company-country record | Secondary |
| `[Company] customer service contact` | At least one verified official contact channel | Secondary |
| `[Company] help center` | Verified support/help-center URL exists | Secondary |
| `[Company] contact number` / `[Company] customer care number` | Verified phone, toll-free, technical, or sales number exists | Secondary; never generate unconditionally |
| `[Company] complaint help` | Verified complaint steps exist | Secondary |
| `[Company] complaint escalation` | Verified complaint steps and escalation text exist | Secondary |
| `[Company] refund help` / `[Company] refund not received` | `refundCancellation` exists | Secondary |
| `[Company] cancellation help` | `refundCancellation` includes a verified cancellation path | Secondary |
| `[Company] delivery help` / `[Company] tracking not updating` | `deliveryTracking` exists | Secondary |
| `[Company] package delivered but not received` | `deliveryTracking` contains a verified delivered-but-missing process | Secondary |
| `[Company] warranty help` / `[Company] repair support` | `warranty` or `replacement` exists | Secondary |
| `[Company] billing help` / `[Company] payment issue` | `billingPayment` exists | Secondary |
| `[Company] support email` | Verified official email exists | Secondary |
| `[Company] live chat support` | Verified official live-chat URL exists | Secondary |
| `[Company] toll-free number` | Verified toll-free field exists | Secondary |

### Current implementation gap

The current generator already handles customer service, customer support, help center, conditional contact number, toll-free, live chat, email, refund-not-received, delivery/tracking, support-not-responding, and complaint escalation. It does **not** currently generate the requested generic patterns for:

- `[Company] customer service contact`
- `[Company] complaint help`
- `[Company] refund help`
- `[Company] warranty help`
- `[Company] billing help`
- `[Company] cancellation help`

These should be added only as conditional rows tied to verified fields. They do not require new URLs.

### Recommended company page headings

- **H1:** `{Company} Customer Service & Support — {Country}`
- **H2:** Official support channels
- **H2:** Verified phone, chat, email, or help-centre options — render only available channels
- **H2:** Common customer issues
- **H2:** Refund and cancellation help — conditional
- **H2:** Delivery and tracking help — conditional
- **H2:** Warranty, repair, or replacement help — conditional
- **H2:** Billing and payment support — conditional
- **H2:** How to file and escalate a complaint
- **H2:** Official sources and last verification date
- **FAQ:** How do I contact {Company} customer support in {Country}?
- **FAQ:** Does {Company} publish an official phone number for {Country}?
- **FAQ:** How do I follow up on an unresolved {Company} case?
- **FAQ:** How do I check a {Company} refund/delivery/warranty issue? — only when the relevant verified field exists

### Country and locale safeguards

- Include the country in the title, H1, description, canonical, and breadcrumb.
- Do not reuse one country's phone numbers, policies, or contact routes for another country.
- Keep factual company data in one verified record; localize only editorial explanation and UI labels.
- Do not put English keyword arrays on Tamil, Hindi, or French pages as if they were native research.
- Add a locale keyword row only after the page's substantive content is genuinely translated.

---

## 9. Cannibalization and overlap risks

| Overlap | Current risk | Recommended ownership |
|---|---|---|
| `refund not received` on request-a-refund and dedicated refund page | High | Dedicated refund-not-received page only |
| `customer support not responding` on escalation and dedicated no-response page | High | Dedicated no-response page; escalation page owns `how to escalate` |
| `billing dispute` on duplicate-charge and billing-dispute pages | High | Billing-dispute page; duplicate page owns `duplicate charge` |
| `card transaction issue` on failed-payment and billing-dispute pages | Medium | Billing-dispute page as broad router; failed-payment page owns failed debit |
| `missing parcel help` on delayed and delivered-but-missing pages | Medium | Delayed page for undelivered/lost; delivered-but-missing page only for delivered scan |
| `cancel online order` on e-commerce category and cancellation guide | Medium | Generic term → cancellation guide; country-modified category term → country category page |
| `failed transaction complaint` on banking category and failed-payment guide | Medium | Generic term → issue guide; country-modified term → country banking category |
| Complaint email guide vs complaint generator | Low when intent is clear | Informational writing query → guide; template/generator query → tool |
| Company issue terms vs generic issue guides | Low when company prefix is present | Company-prefixed query → company-country page; generic query → guide |
| English keywords across `/ta`, `/hi`, `/fr` | High quality risk | Native-language research and complete translation before promotion |

---

## 10. Current content gaps

### P0-quality gaps in existing templates

1. **Category keywords are not wired into category metadata.** The keyword arrays exist in `lib/seo-content.ts`, but the category metadata branch does not use them.
2. **Category H1s are too generic.** `{Category} — {Country}` should become `{Category} Customer Support in {Country}`.
3. **Most category related-guide blocks are generic.** They use the first three guides rather than guides matched to the category intent.
4. **Four guide metadata overlaps remain.** Refund, no-response/escalation, duplicate-charge/billing-dispute, and failed-payment/card-transaction ownership should be separated.
5. **Dynamic company keyword coverage is incomplete.** Verified warranty, billing, and cancellation fields are rendered but are not represented in the research-row generator.

### P1 content gaps

1. **Tamil, Hindi, and French guides are not full translations.** They show translated titles/descriptions but replace the English issue-specific body with generic complaint and escalation steps.
2. **Non-English company pages retain English company H1/body facts.** Metadata titles are localized, but the rendered company H1 and substantive sections are largely English.
3. **Company-to-guide linking is only partly intent-aware.** Billing links only to the failed-payment guide, cancellation is grouped under refund, and complaint-email/escalation links are not consistently included.
4. **Guide-to-company recommendations use broad array order.** They should prefer records with matching verified fields and country/category relevance.
5. **Home category links go to the noindex search page.** This is acceptable for UX, but country pages and company pages must provide the crawlable links to category URLs.

### P2 conditional gaps

1. **Insurance cluster has no verified company-country data.** Do not create or index insurance category pages until official regional sources are available.
2. **Additional country/category combinations require verified companies.** Do not create empty pages merely because all countries are selectable.
3. **Native keyword datasets are missing.** Search Console query data should guide Tamil, Hindi, and French phrase selection instead of literal translation.

---

## 11. Internal linking recommendations

### Homepage

- Link broad contact intent to `/en/guides/how-to-contact-customer-support`.
- Link complaint-resolution intent to `/en/guides/how-to-file-a-customer-complaint`.
- Keep the eight homepage issue links pointed at their existing specific guides.
- Add crawlable links from active country panels to the relevant country-category pages; keep search filters for UX only.

### Category pages

Use a deterministic map:

- E-commerce → cancellation, refund request, refund not received, delivered-not-received.
- Electronics → warranty replacement, account locked, customer support not responding.
- Telecom → billing dispute, failed payment, account locked, escalation.
- Banking → failed payment, duplicate charge, billing dispute, account locked, escalation.
- Travel → cancellation, refund not received, complaint escalation.
- Home appliances → warranty replacement, complaint escalation.
- Courier & delivery → delayed delivery, delivered-but-missing, tracking number not working.
- Insurance → claim and grievance guides only after verified insurance content exists.

### Company pages

- `refundCancellation` → request-a-refund, refund-not-received, and cancellation guide where applicable.
- `deliveryTracking` → delayed-delivery, delivered-but-missing, and tracking guide.
- `billingPayment` → failed-payment, duplicate-charge, and billing-dispute guide.
- `warranty` or `replacement` → warranty replacement guide.
- complaint/escalation → customer-support-not-responding, complaint-email, and escalation guide.
- Always preserve the country selector and related companies in the same region or category.

### Guide pages

- Add links to country-category directories that match the issue.
- Prefer related companies whose verified fields match the guide intent.
- Add a visible path back to the complaint generator where a message/template is the next action.
- Avoid linking generic guides to one company unless the relationship is useful and clearly labelled as an example.

---

## 12. Prioritized implementation roadmap

### P0 — important existing-page and template improvements

1. Remove `refund not received` from the request-a-refund metadata and keep it exclusively on the dedicated missing-refund page.
2. Remove `customer support not responding` from the escalation guide metadata and keep it on the dedicated no-response page.
3. Remove `billing dispute` from the duplicate-charge metadata; remove broad `card transaction issue` from failed-payment metadata.
4. Wire each category's keyword array into localized category metadata and change the H1/title pattern to `{Category} Customer Support in {Country}`.
5. Replace generic first-three guide links on category pages with the category-to-guide map above.
6. Add conditional company keyword rows for complaint help, refund help, cancellation, warranty, and billing using only verified data fields.

### P1 — high-value content gaps without new URLs

1. Translate the full guide sections and FAQs for Tamil, Hindi, and French; do not promote localized keywords until the body is complete.
2. Localize company H1s and editorial section labels while preserving one factual verified company data source.
3. Expand company-to-guide linking so every verified issue field routes to the correct specific guides.
4. Improve guide-to-company matching using issue fields, category, and country instead of array order.
5. Add native-language keyword rows with `languageCode` only after real query research or reviewed native-language wording.

### P2 — optional future content

1. Publish insurance category pages only after verified insurance company-country records and official claim/grievance sources exist.
2. Add more country-category coverage only where at least one useful, verified company listing exists.
3. Use Search Console query/page data to decide whether any new guide intent is genuinely distinct; do not split pages based only on wording variants.
4. Consider a global category landing page only if real query data shows generic category intent that is not satisfied by country/category and guide pages. None is required from the supplied list today.

---

## 13. Pages that should NOT be created

Do not create the following pages or equivalent variants:

- `/customer-support`, `/customer-care`, `/customer-support-directory`, or `/company-customer-support` — the homepage already owns directory intent.
- `/customer-service-contact`, `/customer-care-number`, or `/how-to-contact-company-customer-care` — the contact-support guide owns this intent.
- `/complaint-resolution` or `/customer-complaint-help` — the file-a-complaint guide owns this intent.
- `/refund-status-help`, `/refund-pending`, or `/processed-refund-missing` — the refund-not-received guide owns these variants.
- `/return-request-rejected` — add/retain the section on the request-a-refund guide.
- `/order-not-delivered`, `/delayed-delivery-complaint`, or `/missing-parcel-complaint` — the delayed-delivery guide owns this intent.
- `/missing-package-support` or `/delivered-package-missing` — the delivered-but-not-received guide owns this intent.
- `/failed-transaction-complaint` or `/money-deducted-after-failed-payment` — the failed-payment guide owns this intent.
- `/billing-dispute-help` or `/card-transaction-issue` — the billing-dispute guide owns this broad intent.
- `/customer-service-escalation-email` — the professional complaint-email guide owns this intent.
- Separate refund-email, follow-up-email, warranty-letter, or billing-letter pages — the single complaint generator already supports these use cases, and the former legacy tool URLs are redirected.
- Generic `/categories/{slug}` pages now — use existing country-category templates until real data justifies a global category layer.
- An insurance category page without verified country-specific insurance company data.
- Per-company pages such as `/amazon-refund`, `/amazon-delivery`, `/dell-warranty`, or `/paypal-complaint` — keep these as sections on the country-specific company page.
- Country/company pages that reuse another country's contact details or policies.

---

## Evidence and limitations

### Reviewed local sources

- `lib/keyword-strategy.ts` — explicit issue/tool rows and conditional company keyword generation.
- `lib/seo-content.ts` — homepage, country, and category clusters.
- `lib/data.ts` — 16 guide records, metadata keywords, sections, FAQs, and official-source examples.
- `lib/global-data.ts` and `lib/priority-companies.ts` — 44 verified static company-country records and conditional issue fields.
- `app/[locale]/[[...segments]]/page.tsx` — route rendering, metadata, indexability, H1/H2 structure, internal linking, and locale behavior.
- `app/sitemap.ts`, `app/robots.ts`, and `next.config.ts` — sitemap filtering, robots rules, canonical route families, and permanent redirects.
- `lib/i18n.ts` — English, Tamil, Hindi, and French metadata and UI dictionaries.
- `RESOLVENEXA_P0_SEO_FIX_REPORT.md` and `RESOLVENEXA_SEO_GROWTH_PLAN.md` — prior P0 verification and evidence limitations.

### Read-only live verification

- `https://resolvenexa.vercel.app/` → permanent redirect to `/en`.
- `https://resolvenexa.vercel.app/en` → 200 with self-canonical metadata.
- `https://resolvenexa.vercel.app/sitemap.xml` → 200, 364 unique URLs, 1,820 hreflang links.
- `https://resolvenexa.vercel.app/robots.txt` → 200.
- Amazon US, India banking, refund-not-received, complaint-email, and complaint-generator pages → 200 with self-canonicals.
- Five legacy tool URLs → direct 301 redirects to their intended current guides.

### Limitations

- Supabase can add published company records at runtime; this audit used the 44 static verified records plus the database merge rules, not a privileged database export.
- Search Console query data was not refreshed for this report, so priority is based on architecture, existing content, and cannibalization risk rather than current ranking performance.
- Search volume and keyword difficulty were not available and were not invented.
- Official company contact facts were not replaced or expanded during this analysis.

