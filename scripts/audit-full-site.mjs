import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const baseUrl = process.env.AUDIT_BASE_URL || "https://supportsphere-one.vercel.app";
const locales = ["en", "ta", "hi", "fr"];

function filesUnder(directory, suffix) {
  const found = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...filesUnder(full, suffix));
    else if (entry.name.endsWith(suffix)) found.push(full);
  }
  return found;
}

function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), match[2]]));
}

function analyzeHtml(html, expectedUrl = "") {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const description = [...html.matchAll(/<meta[^>]+>/gi)].map((match) => attrs(match[0])).find((item) => item.name === "description")?.content || "";
  const canonical = [...html.matchAll(/<link[^>]+>/gi)].map((match) => attrs(match[0])).find((item) => item.rel === "canonical")?.href || "";
  const alternates = [...html.matchAll(/<link[^>]+>/gi)].map((match) => attrs(match[0])).filter((item) => item.rel === "alternate" && item.hreflang);
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const robots = [...html.matchAll(/<meta[^>]+>/gi)].map((match) => attrs(match[0])).find((item) => item.name === "robots")?.content || "";
  const anchors = [...html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)].map((match) => match[1]);
  let structuredDataErrors = 0;
  const structuredTypes = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1].replaceAll("&quot;", '"').replaceAll("&amp;", "&"));
      if (parsed?.["@type"]) structuredTypes.push(parsed["@type"]);
    } catch { structuredDataErrors += 1; }
  }
  return { expectedUrl, title, description, canonical, alternates, h1Count, robots, anchors, structuredDataErrors, structuredTypes };
}

function normalizeUrl(value) {
  try {
    const url = new URL(value, baseUrl);
    url.hash = ""; url.search = "";
    return url.href.endsWith("/") && url.pathname !== "/" ? url.href.slice(0, -1) : url.href;
  } catch { return value; }
}

async function mapLimit(values, limit, work) {
  const results = new Array(values.length); let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (cursor < values.length) { const index = cursor++; results[index] = await work(values[index], index); }
  }));
  return results;
}

async function fetchPage(url, timeoutMs = 15000) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "SupportSphere-Audit/1.0" } });
    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("text") || contentType.includes("json") || contentType.includes("xml") ? await response.text() : "";
    return { requestedUrl: url, finalUrl: response.url, status: response.status, contentType, body, error: "" };
  } catch (error) { return { requestedUrl: url, finalUrl: "", status: 0, contentType: "", body: "", error: error?.name || String(error) }; }
  finally { clearTimeout(timer); }
}

function compile(url) {
  return ts.transpileModule(fs.readFileSync(new URL(url, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
}

function loadCompanies() {
  const priorityModule = { exports: {} };
  vm.runInNewContext(compile("../lib/priority-companies.ts"), { module: priorityModule, exports: priorityModule.exports }, { filename: "priority-companies.js" });
  const dataModule = { exports: {} };
  const require = (id) => {
    if (id === "@/lib/priority-companies") return priorityModule.exports;
    if (id === "@/lib/country-catalog") return { allCountries: [], countryByCode: new Map() };
    throw new Error(`Unexpected import ${id}`);
  };
  vm.runInNewContext(compile("../lib/global-data.ts"), { module: dataModule, exports: dataModule.exports, require, URL }, { filename: "global-data.js" });
  return dataModule.exports.globalCompanies;
}

const htmlFiles = filesUnder(path.join(root, ".next", "server", "app"), ".html");
const localPages = htmlFiles.map((file) => ({ file: path.relative(root, file).replaceAll("\\", "/"), ...analyzeHtml(fs.readFileSync(file, "utf8")) }));
const prerender = JSON.parse(fs.readFileSync(path.join(root, ".next", "prerender-manifest.json"), "utf8"));
const localSummary = {
  buildHtmlArtifacts: localPages.length,
  prerenderManifestRoutes: Object.keys(prerender.routes).length,
  dynamicRouteDefinitions: Object.keys(prerender.dynamicRoutes).length,
  missingTitle: localPages.filter((page) => !page.title).length,
  missingDescription: localPages.filter((page) => !page.description).length,
  missingCanonical: localPages.filter((page) => !page.canonical).length,
  multipleOrMissingH1: localPages.filter((page) => page.h1Count !== 1).length,
  noindexPages: localPages.filter((page) => page.robots.toLowerCase().includes("noindex")).length,
  structuredDataParseErrors: localPages.reduce((sum, page) => sum + page.structuredDataErrors, 0)
};

const companies = loadCompanies();
const companyRoutes = new Set(); const duplicateCompanyRoutes = [];
for (const company of companies) { const route = `/${company.country}/companies/${company.slug}`; if (companyRoutes.has(route)) duplicateCompanyRoutes.push(route); companyRoutes.add(route); }
const companySummary = {
  count: companies.length,
  countries: Object.fromEntries([...new Set(companies.map((company) => company.country))].map((country) => [country, companies.filter((company) => company.country === country).length])),
  categories: Object.fromEntries([...new Set(companies.map((company) => company.category))].map((category) => [category, companies.filter((company) => company.category === category).length])),
  duplicateRoutes: duplicateCompanyRoutes,
  missingPhoneEmailChat: companies.filter((company) => !company.phone && !company.tollFree && !company.technicalSupportPhone && !company.email && !company.liveChat && !company.whatsapp).map((company) => `${company.country}/${company.slug}`),
  missingRefundDeliveryWarrantyBilling: companies.filter((company) => !company.refundCancellation && !company.deliveryTracking && !company.warranty && !company.billingPayment).map((company) => `${company.country}/${company.slug}`),
  missingCountryRegion: companies.filter((company) => !company.regions?.length).map((company) => `${company.country}/${company.slug}`),
  missingFaqs: companies.filter((company) => !company.faqs?.length).map((company) => `${company.country}/${company.slug}`),
  shortSummary: companies.filter((company) => company.summary.length < 80).map((company) => `${company.country}/${company.slug}`)
};

const sitemapResponse = await fetchPage(`${baseUrl}/sitemap.xml`);
const sitemapUrls = [...sitemapResponse.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].replaceAll("&amp;", "&"));
const livePages = await mapLimit(sitemapUrls, 12, async (url) => {
  const response = await fetchPage(url);
  const html = response.status >= 200 && response.status < 400 ? analyzeHtml(response.body, url) : null;
  return { ...response, html };
});

const sitemapSet = new Set(sitemapUrls.map(normalizeUrl));
const inbound = new Map(sitemapUrls.map((url) => [normalizeUrl(url), 0]));
for (const page of livePages) for (const href of page.html?.anchors || []) {
  const normalized = normalizeUrl(href);
  if (sitemapSet.has(normalized) && normalized !== normalizeUrl(page.requestedUrl)) inbound.set(normalized, (inbound.get(normalized) || 0) + 1);
}

const hreflangIssues = [];
for (const page of livePages) {
  if (!page.html) continue;
  const parsed = new URL(page.requestedUrl); const parts = parsed.pathname.split("/").filter(Boolean); const locale = locales.includes(parts[0]) ? parts[0] : ""; const suffix = `/${parts.slice(1).join("/")}`;
  const expected = Object.fromEntries([...locales.map((item) => [item, normalizeUrl(`${baseUrl}/${item}${suffix}`)]), ["x-default", normalizeUrl(`${baseUrl}/en${suffix}`)]]);
  const actual = Object.fromEntries(page.html.alternates.map((item) => [item.hreflang, normalizeUrl(item.href)]));
  const invalid = Object.entries(expected).filter(([lang, url]) => actual[lang] !== url);
  if (!locale || invalid.length || page.html.alternates.length !== 5) hreflangIssues.push({ url: page.requestedUrl, count: page.html.alternates.length, invalid });
}

const titleGroups = new Map(); const descriptionGroups = new Map();
for (const page of livePages) if (page.html) {
  const titleKey = page.html.title; const descKey = page.html.description;
  titleGroups.set(titleKey, [...(titleGroups.get(titleKey) || []), page.requestedUrl]);
  descriptionGroups.set(descKey, [...(descriptionGroups.get(descKey) || []), page.requestedUrl]);
}
const duplicateTitles = [...titleGroups.entries()].filter(([key, urls]) => key && urls.length > 1);
const duplicateDescriptions = [...descriptionGroups.entries()].filter(([key, urls]) => key && urls.length > 1);
const liveSummary = {
  sitemapStatus: sitemapResponse.status,
  sitemapUrls: sitemapUrls.length,
  successful: livePages.filter((page) => page.status >= 200 && page.status < 300).length,
  redirects: livePages.filter((page) => normalizeUrl(page.requestedUrl) !== normalizeUrl(page.finalUrl)).map((page) => ({ from: page.requestedUrl, to: page.finalUrl, status: page.status })),
  failures: livePages.filter((page) => page.status < 200 || page.status >= 400).map((page) => ({ url: page.requestedUrl, status: page.status, error: page.error })),
  missingTitle: livePages.filter((page) => page.html && !page.html.title).map((page) => page.requestedUrl),
  missingDescription: livePages.filter((page) => page.html && !page.html.description).map((page) => page.requestedUrl),
  canonicalMismatch: livePages.filter((page) => page.html && normalizeUrl(page.html.canonical) !== normalizeUrl(page.finalUrl)).map((page) => ({ url: page.requestedUrl, final: page.finalUrl, canonical: page.html.canonical })),
  h1Issues: livePages.filter((page) => page.html && page.html.h1Count !== 1).map((page) => ({ url: page.requestedUrl, h1: page.html.h1Count })),
  hreflangIssues,
  structuredDataErrors: livePages.filter((page) => page.html?.structuredDataErrors).map((page) => ({ url: page.requestedUrl, errors: page.html.structuredDataErrors })),
  duplicateTitleGroups: duplicateTitles.length,
  duplicateDescriptionGroups: duplicateDescriptions.length,
  orphanUrls: [...inbound.entries()].filter(([url, count]) => count === 0 && !/^https:\/\/[^/]+\/(en|ta|hi|fr)$/.test(url)).map(([url]) => url)
};

const contactLinks = [...new Set(companies.flatMap((company) => [company.officialWebsite, company.supportWebsite, company.helpCenter, company.liveChat, ...company.sourceLinks.map((source) => source.url)].filter(Boolean)))];
const contactResults = await mapLimit(contactLinks, 8, async (url) => {
  const response = await fetchPage(url, 20000);
  const statusClass = response.status >= 200 && response.status < 400 ? "reachable" : [401, 403, 405, 429].includes(response.status) ? "blocked" : [404, 410].includes(response.status) ? "broken" : "unavailable";
  return { url, status: response.status, finalUrl: response.finalUrl, statusClass, error: response.error };
});
const contactStatusByUrl = new Map(contactResults.map((item) => [item.url, item]));
const companyRows = companies.map((company) => {
  const urls = [company.officialWebsite, company.supportWebsite, company.helpCenter, company.liveChat, ...company.sourceLinks.map((source) => source.url)].filter(Boolean);
  const linkHealth = [...new Set(urls)].map((url) => contactStatusByUrl.get(url)).filter(Boolean);
  const channels = [company.phone && `phone ${company.phone}`, company.tollFree && `toll-free ${company.tollFree}`, company.technicalSupportPhone && `technical ${company.technicalSupportPhone}`, company.email && `email ${company.email}`, company.whatsapp && `WhatsApp ${company.whatsapp}`, company.liveChat && "live chat"].filter(Boolean);
  const guidance = [company.refundCancellation && "refund/cancellation", company.deliveryTracking && "delivery/tracking", company.warranty && "warranty/repair", company.replacement && "replacement", company.billingPayment && "billing/payment", company.complaintSteps?.length && "complaint", company.escalation && "escalation"].filter(Boolean);
  return {
    name: company.name, country: company.country, category: company.category, route: `/${company.country}/companies/${company.slug}`,
    officialWebsite: company.officialWebsite, supportWebsite: company.supportWebsite, channels, guidance,
    linkHealth: { reachable: linkHealth.filter((item) => item.statusClass === "reachable").length, blocked: linkHealth.filter((item) => item.statusClass === "blocked").length, broken: linkHealth.filter((item) => item.statusClass === "broken").length, unavailable: linkHealth.filter((item) => item.statusClass === "unavailable").length },
    verificationStatus: company.verificationStatus, verifiedAt: company.verifiedAt
  };
});

const robotsResponse = await fetchPage(`${baseUrl}/robots.txt`);
const searchChecks = [
  ["company", `${baseUrl}/en/search?q=dell`, "Dell"],
  ["intent", `${baseUrl}/en/search?q=payment%20failed%20but%20money%20deducted`, "Payment Failed but Money Was Deducted"],
  ["guide", `${baseUrl}/en/search?q=tracking%20number%20not%20working`, "Tracking Number Not Working"],
  ["no-result", `${baseUrl}/en/search?q=zzzxxyy-no-company`, "No verified company match yet"]
];
const searchResults = await mapLimit(searchChecks, 4, async ([name, url, marker]) => { const response = await fetchPage(url); return { name, status: response.status, markerFound: response.body.includes(marker) }; });

const report = {
  generatedAt: new Date().toISOString(), baseUrl, commit: process.env.AUDIT_COMMIT || "f96d39f",
  localSummary, companySummary, companyRows, liveSummary,
  officialLinks: {
    total: contactResults.length,
    reachable: contactResults.filter((item) => item.statusClass === "reachable").length,
    blocked: contactResults.filter((item) => item.statusClass === "blocked"),
    broken: contactResults.filter((item) => item.statusClass === "broken"),
    unavailable: contactResults.filter((item) => item.statusClass === "unavailable")
  },
  robots: { status: robotsResponse.status, body: robotsResponse.body }, searchResults,
  duplicateTitleSamples: duplicateTitles.slice(0, 10).map(([title, urls]) => ({ title, count: urls.length, urls: urls.slice(0, 4) })),
  duplicateDescriptionSamples: duplicateDescriptions.slice(0, 10).map(([description, urls]) => ({ description, count: urls.length, urls: urls.slice(0, 4) }))
};

console.log(JSON.stringify(report, null, 2));
