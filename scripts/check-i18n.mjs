import fs from "node:fs";

for (const locale of ["en", "ta", "hi", "fr"]) {
  const html = fs.readFileSync(`.next/server/app/${locale}.html`, "utf8");
  const canonical = html.match(/rel="canonical" href="([^"]+)/)?.[1];
  const hreflang = (html.match(/hrefLang=/g) || []).length;
  const h1 = (html.match(/<h1/g) || []).length;
  if (canonical !== `https://supportsphere-one.vercel.app/${locale}/`) throw new Error(`${locale}: bad canonical ${canonical}`);
  if (hreflang !== 5) throw new Error(`${locale}: expected 5 hreflang links, got ${hreflang}`);
  if (h1 !== 1) throw new Error(`${locale}: expected one H1, got ${h1}`);
  if (!html.includes("language-selector")) throw new Error(`${locale}: language selector missing`);
  console.log(`${locale}: canonical, hreflang, H1 and selector OK`);
}

const sitemap = fs.readFileSync(".next/server/app/sitemap.xml.body", "utf8");
const urls = (sitemap.match(/<url>/g) || []).length;
const alternatives = (sitemap.match(/hreflang=/g) || []).length;
if (urls < 150) throw new Error(`Expected at least 150 useful sitemap URLs, got ${urls}`);
if (alternatives !== urls * 5) throw new Error(`Expected ${urls * 5} sitemap language alternatives, got ${alternatives}`);
if (!sitemap.includes("/ta/in/companies/sbi") || !sitemap.includes('hreflang="x-default"')) throw new Error("Localized sitemap examples missing");
console.log(`sitemap: ${urls} URLs and ${alternatives} language alternatives OK`);
