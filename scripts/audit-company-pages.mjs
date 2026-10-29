import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../lib/global-data.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const module = { exports: {} };
vm.runInNewContext(compiled, { module, exports: module.exports, URL }, { filename: "global-data.js" });

const { globalCompanies } = module.exports;
const errors = [];
const notices = [];
const routes = new Set();

for (const company of globalCompanies) {
  const route = `/${company.country}/companies/${company.slug}`;
  if (routes.has(route)) errors.push(`${route}: duplicate canonical route`);
  routes.add(route);
  if (company.verificationStatus !== "Verified") errors.push(`${route}: not verified`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(company.verifiedAt)) errors.push(`${route}: invalid verification date`);
  if (!company.summary || company.summary.length < 80) errors.push(`${route}: summary is too short`);
  if (!company.officialWebsite?.startsWith("https://")) errors.push(`${route}: missing HTTPS official website`);
  if (!company.supportWebsite?.startsWith("https://")) errors.push(`${route}: missing HTTPS support website`);
  if (!company.sourceLinks?.length) errors.push(`${route}: no official sources`);
  for (const sourceLink of company.sourceLinks || []) {
    if (!sourceLink.url.startsWith("https://")) errors.push(`${route}: non-HTTPS source ${sourceLink.url}`);
  }
  if ((company.commonIssues || []).length < 4) errors.push(`${route}: fewer than four common issues`);
  if ((company.complaintSteps || []).length < 4) errors.push(`${route}: incomplete complaint steps`);
  if (!company.escalation || company.escalation.length < 60) errors.push(`${route}: thin escalation guidance`);
  if (!company.phone && !company.liveChat && !company.email) notices.push(`${route}: official web/self-service only; no verified direct phone, chat or email published`);
  if (!company.refundCancellation && !company.warranty) notices.push(`${route}: no refund/cancellation or warranty section (may be inapplicable)`);
  if (!company.faqs?.length) notices.push(`${route}: uses localized generic FAQs; company-specific English FAQs not yet added`);
}

console.log(`Audited ${globalCompanies.length} company pages across ${new Set(globalCompanies.map((item) => item.country)).size} country directories.`);
console.log(`Indexable canonical company routes: ${routes.size}`);
console.log(`Blocking data issues: ${errors.length}`);
for (const error of errors) console.log(`ERROR ${error}`);
console.log(`Non-blocking content notices: ${notices.length}`);
for (const notice of notices) console.log(`NOTICE ${notice}`);

if (errors.length) process.exitCode = 1;
