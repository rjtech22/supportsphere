# ResolveNexa International SEO Report

Audit date: 2026-11-06

## Current architecture

- Languages: English (`en`), Tamil (`ta`), Hindi (`hi`), French (`fr`).
- Country records: 249 ISO-based countries/territories are searchable.
- Countries with verified company data: India (`in`), United States (`us`), United Kingdom (`gb`), Canada (`ca`), Australia (`au`).
- URL pattern: `/{locale}/{country}/companies/{company}` and `/{locale}/{country}/categories/{category}`.
- Indexable company pages: 44 English country-company URLs.
- Incomplete translated company and guide variants: noindex/follow and omitted from sitemap.
- Empty or unverified country-category combinations: noindex/follow and omitted from sitemap.

## Findings

### P0 — Locale-home hreflang and canonical URL forms differ

- **Affected URLs/files:** `/en`, `/ta`, `/hi`, `/fr`; `lib/i18n.ts:214-221`; sitemap generation.
- **Issue:** Hreflang and sitemap alternates point to slash-suffixed locale homepages that redirect, while canonicals omit the slash.
- **Evidence:** `/en/` returns 308 to `/en`; `/en` is canonical; rendered alternatives include `/en/`. The same pattern applies to the other locale homepages.
- **Recommendation:** Emit direct non-slash alternate URLs for all four locales and `x-default`; confirm sitemap and HTML match.
- **Code changes required:** Yes.

### P1 — Localized trust pages are indexable but not equivalent to English

- **Affected URLs:** `/ta|hi|fr/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`.
- **Affected file:** `app/[locale]/[[...segments]]/page.tsx:406-411`.
- **Issue:** Fifteen localized trust/legal routes contain only abbreviated generic copy while English pages contain detailed sections.
- **Evidence:** These localized URLs are included in the sitemap and are indexable; the rendering branch supplies two short paragraphs.
- **Recommendation:** Produce accurate native-language versions reviewed for meaning and legal sufficiency. Until complete, noindex and exclude the incomplete variants rather than presenting them as equivalent.
- **Code changes required:** Yes; native-language/legal review required.

### P1 — Indexable localized country/category content is shallower

- **Affected URLs:** Tamil, Hindi, and French country and active category routes.
- **Affected file:** `app/[locale]/[[...segments]]/page.tsx:155-175`.
- **Issue:** The detailed country and country-category records are selected only for English, leaving other indexable locales with more generic text.
- **Evidence:** Source conditions restrict `countryDetails` and `countryCategoryDetails` to `locale === "en"`.
- **Recommendation:** Translate existing verified English material and retain official links. Do not create country facts by substituting names. If a page is not useful without the missing depth, noindex it until reviewed.
- **Code changes required:** Yes plus editorial review.

### P1 — Translated company and guide pages are safe for indexing but weak for users

- **Affected URLs:** non-English company and guide routes.
- **Issue:** These routes are correctly noindex, but localized guide bodies reuse generic complaint/escalation content across unrelated intents. Localized company facts can remain English.
- **Evidence:** `app/[locale]/[[...segments]]/page.tsx:360` uses a shared localized guide fallback; i18n tests confirm noindex/follow and sitemap exclusion.
- **Recommendation:** Keep current noindex behavior. Improve these routes only with complete, intent-specific translations based on verified English source content; then enable indexing individually.
- **Code changes required:** Not urgently; content work before indexability.

### P2 — Country targeting is limited by verified data, not directory availability

- **Affected pages:** countries outside IN/US/GB/CA/AU.
- **Issue:** Users can select all countries, but only five have verified company listings. This is accurate but limits international organic coverage.
- **Evidence:** The data audit found verified company routes in five countries only; empty combinations are not indexed.
- **Recommendation:** Expand one company-country record at a time only after official regional sources are verified. Prioritize actual GSC demand rather than generating 249 empty page sets.
- **Code changes required:** Database/content additions later; not a technical fix.

### P3 — Open Graph locale is language-default based

- **Affected pages:** English UK, Canada, Australia and other country routes.
- **Issue:** Social metadata can report `en_US` because OG locale is based on language, not route country.
- **Evidence:** Source mapping uses locale only.
- **Recommendation:** Optionally map language-country pairs for social previews. Do not alter hreflang or canonical structure solely for this.
- **Code changes required:** Optional.

## Hreflang assessment

The page-level policy is conceptually sound:

- Equivalent translated home, country, category, trust, and tool routes expose language alternatives and `x-default`.
- English-only company and guide pages expose `en` plus `x-default`, avoiding false claims of translated equivalents.
- Country pages are not cross-linked as language-country equivalents merely because they share English. This avoids treating US and UK pages as interchangeable.

The one confirmed defect is the redirected trailing-slash form on locale homepages. The full-site audit script's demand for five alternatives on English-only pages is a test defect, not a production defect.

## Canonical and indexability assessment

- All 181 sitemap pages have matching self-canonicals.
- Search, incomplete translation, and empty/unverified routes are noindex/follow.
- The sitemap includes only active countries/categories and English company/guide pages.
- No automatic IP redirect was observed; users retain visible language and country controls.

## Country-by-country assessment

| Country | Verified pages | Strength | Main gap | Priority |
|---|---:|---|---|---|
| India | 21 | Broadest mix across e-commerce, banks, telecom, travel, electronics | Some official self-service-only brands and category content can be more issue-specific | P1 |
| United States | 18 | Strong global brand, courier, software, travel coverage | Amazon US has impressions but no clicks in the available sample | P1 |
| United Kingdom | 2 | Royal Mail and Amazon UK verified | Very narrow company coverage; Royal Mail links need manual recheck | P2 |
| Canada | 2 | Canada Post and Amazon Canada verified | Automated crawler could not confirm Canada Post URLs | P1 |
| Australia | 1 | Australia Post verified | Single-company coverage | P2 |

## Actual country performance observed

Search Console's available 2026-10-29 to 2026-11-03 sample showed:

- US: 42 impressions, 0 clicks.
- India: 26 impressions, 5 clicks.
- Brazil: 19 impressions, 0 clicks.
- Canada: 9 impressions, 0 clicks.
- Russia: 7 impressions, 0 clicks.

This is a very small early sample and does not establish stable demand or ranking. Historical impressions appeared for French Amazon Canada/UK routes that are now noindex; monitor whether those signals disappear before considering fully localized replacements.

## Recommendations that avoid duplicate content

1. Fix locale-home alternate URL forms.
2. Complete or noindex localized trust pages.
3. Translate existing country/category facts rather than creating new routes.
4. Keep incomplete company/guide translations noindex.
5. Expand verified countries only where an official regional support source exists.
6. Never use a universal customer-care number across countries.
7. Use Search Console country/query data to decide the next verified company-country record.

## Safe elements to preserve

- Current locale-first, country-second route structure.
- Self-referencing canonical policy.
- Noindex behavior for incomplete/empty pages.
- English-only indexability for company and guide pages until translations are complete.
- Visible selectors and absence of forced IP redirection.
