import fs from "node:fs";

for (const locale of ["en", "ta", "hi", "fr"]) {
  const html = fs.readFileSync(`.next/server/app/${locale}.html`, "utf8");
  const canonical = html.match(/rel="canonical" href="([^"]+)/)?.[1];
  const hreflang = (html.match(/hrefLang=/g) || []).length;
  const h1 = (html.match(/<h1/g) || []).length;
  if (canonical !== `https://resolvenexa.vercel.app/${locale}`) throw new Error(`${locale}: bad canonical ${canonical}`);
  if (hreflang !== 5) throw new Error(`${locale}: expected 5 hreflang links, got ${hreflang}`);
  if (h1 !== 1) throw new Error(`${locale}: expected one H1, got ${h1}`);
  if (!html.includes("language-selector")) throw new Error(`${locale}: language selector missing`);
  console.log(`${locale}: canonical, hreflang, H1 and selector OK`);
}

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
if (!/<lastmod>\d{4}-\d{2}-\d{2}T00:00:00\.000Z<\/lastmod>/.test(sitemap)) throw new Error("Verified content dates are missing from sitemap lastmod");
console.log(`sitemap: ${urls} indexable URLs and ${alternatives} valid language alternatives OK`);
