import fs from "node:fs";

for (const locale of ["en", "ta", "hi", "fr"]) {
  const html = fs.readFileSync(`.next/server/app/${locale}.html`, "utf8");
  const canonical = html.match(/rel="canonical" href="([^"]+)/)?.[1];
  const hreflang = (html.match(/hrefLang=/g) || []).length;
  const h1 = (html.match(/<h1/g) || []).length;
  if (canonical !== `https://resolvenexa.vercel.app/${locale}`) throw new Error(`${locale}: bad canonical ${canonical}`);
  if (hreflang !== 0) throw new Error(`${locale}: homepage HTML should defer hreflang to the exact Link response header`);
  if (h1 !== 1) throw new Error(`${locale}: expected one H1, got ${h1}`);
  if (!html.includes("language-selector")) throw new Error(`${locale}: language selector missing`);
  console.log(`${locale}: canonical, H1 and selector OK`);
}

const routesManifest = JSON.parse(fs.readFileSync(".next/routes-manifest.json", "utf8"));
const localeHeader = routesManifest.headers.find((item) => item.headers?.some((header) => header.key.toLowerCase() === "link"));
const linkValue = localeHeader?.headers.find((header) => header.key.toLowerCase() === "link")?.value || "";
for (const alternateLocale of ["en", "ta", "hi", "fr"]) {
  if (!linkValue.includes(`<https://resolvenexa.vercel.app/${alternateLocale}>; rel="alternate"; hreflang="${alternateLocale}"`)) throw new Error(`${alternateLocale}: direct canonical homepage is missing from the hreflang Link header`);
}
if (!linkValue.includes('<https://resolvenexa.vercel.app/en>; rel="alternate"; hreflang="x-default"')) throw new Error("x-default homepage is missing from the hreflang Link header");
console.log("locale homepages use direct canonical URLs in the hreflang Link response header");

for (const locale of ["ta", "hi", "fr"]) {
  for (const route of ["about", "contact", "privacy-policy", "terms", "disclaimer"]) {
    const html = fs.readFileSync(`.next/server/app/${locale}/${route}.html`, "utf8");
    if (!html.includes('name="robots" content="noindex, follow"')) throw new Error(`${locale}/${route}: incomplete localized trust page must be noindex,follow`);
    if ((html.match(/hrefLang=/g) || []).length !== 0) throw new Error(`${locale}/${route}: incomplete localized trust page should not publish hreflang alternatives`);
  }
}
console.log("localized trust variants are noindex and excluded from language alternatives");

for (const locale of ["ta", "hi", "fr"]) {
  for (const route of ["us/companies/amazon", "guides/refund-not-received"]) {
    const html = fs.readFileSync(`.next/server/app/${locale}/${route}.html`, "utf8");
    const canonical = html.match(/rel="canonical" href="([^"]+)/)?.[1];
    if (canonical !== `https://resolvenexa.vercel.app/${locale}/${route}`) throw new Error(`${locale}/${route}: bad canonical ${canonical}`);
    if (!html.includes('name="robots" content="noindex, follow"')) throw new Error(`${locale}/${route}: incomplete localization must be noindex,follow`);
    if ((html.match(/hrefLang=/g) || []).length !== 0) throw new Error(`${locale}/${route}: noindex localization should not publish hreflang alternatives`);
  }
  console.log(`${locale}: incomplete company and guide variants are noindex with self-canonicals`);
}

for (const route of ["us/companies/amazon", "guides/refund-not-received"]) {
  const html = fs.readFileSync(`.next/server/app/en/${route}.html`, "utf8");
  if ((html.match(/hrefLang=/g) || []).length !== 2) throw new Error(`en/${route}: expected en and x-default hreflang only`);
}

const sitemap = fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8");
const urls = (sitemap.match(/<url>/g) || []).length;
const alternatives = (sitemap.match(/hreflang=/g) || []).length;
if (urls < 150) throw new Error(`Expected at least 150 useful sitemap URLs, got ${urls}`);
if (!sitemap.includes("/en/in/companies/sbi") || !sitemap.includes('hreflang="x-default"')) throw new Error("English company sitemap examples missing");
if (sitemap.includes("/ta/in/companies/sbi") || sitemap.includes("/fr/guides/refund-not-received")) throw new Error("Incomplete localized company or guide URL leaked into sitemap");
if (sitemap.includes("/ta/privacy-policy") || sitemap.includes("/fr/contact")) throw new Error("Incomplete localized trust URL leaked into sitemap");
if (sitemap.includes('hreflang="en" href="https://resolvenexa.vercel.app/en/"')) throw new Error("Homepage sitemap hreflang should not redirect through a trailing-slash URL");
const englishHomeEntry = (sitemap.split("<url>").find((entry) => entry.includes("<loc>https://resolvenexa.vercel.app/en</loc>")) || "");
if (englishHomeEntry.includes("hreflang=")) throw new Error("Homepage hreflang belongs in the exact Link response header until Next.js can serialize non-redirecting root-locale sitemap alternatives");
if (!/<lastmod>\d{4}-\d{2}-\d{2}T00:00:00\.000Z<\/lastmod>/.test(sitemap)) throw new Error("Verified content dates are missing from sitemap lastmod");
console.log(`sitemap: ${urls} indexable URLs and ${alternatives} valid language alternatives OK`);
