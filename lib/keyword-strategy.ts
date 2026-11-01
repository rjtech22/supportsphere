import { globalCompanies } from "@/lib/global-data";

export type SearchIntent = "company-support" | "refund-return" | "delivery" | "banking-payment" | "complaint-tool";
export type KeywordRole = "primary" | "secondary";
export type ContentStatus = "published" | "planned" | "needs-verification";

export type KeywordResearchRow = {
  keyword: string;
  searchIntent: SearchIntent;
  languageCode: "en" | "ta" | "hi" | "fr";
  targetCountry: string;
  targetPage: string;
  targetTitle: string;
  role: KeywordRole;
  searchVolume: number | null;
  competition: string | null;
  metricSource: string | null;
  contentStatus: ContentStatus;
};

const published = (keyword: string, searchIntent: SearchIntent, targetPage: string, targetTitle: string, role: KeywordRole = "primary", targetCountry = "global"): KeywordResearchRow => ({
  keyword, searchIntent, languageCode: "en", targetCountry, targetPage, targetTitle, role,
  searchVolume: null, competition: null, metricSource: null, contentStatus: "published"
});

const issueKeywords: KeywordResearchRow[] = [
  published("refund not received", "refund-return", "/guides/refund-not-received", "Refund Not Received: What to Do"),
  published("refund status help", "refund-return", "/guides/refund-not-received", "Refund Not Received: What to Do", "secondary"),
  published("return request rejected", "refund-return", "/guides/how-to-request-a-refund", "How to Request a Refund", "secondary"),
  published("how to request a refund", "refund-return", "/guides/how-to-request-a-refund", "How to Request a Refund"),
  published("how to cancel an order", "refund-return", "/guides/how-to-cancel-an-online-order", "How to Cancel an Online Order"),
  published("replacement request", "refund-return", "/guides/request-warranty-replacement", "How to Request a Warranty Replacement"),
  published("order not delivered", "delivery", "/guides/complain-about-delayed-delivery", "How to Complain About a Delayed Delivery"),
  published("package says delivered but not received", "delivery", "/guides/package-delivered-not-received", "Package Says Delivered but Not Received"),
  published("delayed delivery complaint", "delivery", "/guides/complain-about-delayed-delivery", "How to Complain About a Delayed Delivery"),
  published("missing package support", "delivery", "/guides/package-delivered-not-received", "Package Says Delivered but Not Received", "secondary"),
  published("tracking number not working", "delivery", "/guides/tracking-number-not-working", "Tracking Number Not Working"),
  published("payment failed but money deducted", "banking-payment", "/guides/payment-failed-money-deducted", "Payment Failed but Money Was Deducted"),
  published("duplicate charge", "banking-payment", "/guides/duplicate-charge", "How to Dispute a Duplicate Charge"),
  published("billing dispute", "banking-payment", "/guides/resolve-billing-dispute", "How to Resolve a Billing Dispute"),
  published("card transaction issue", "banking-payment", "/guides/resolve-billing-dispute", "How to Resolve a Billing Dispute", "secondary"),
  published("account locked", "banking-payment", "/guides/account-locked-support", "Account Locked: Safe Recovery Steps"),
  published("free complaint letter generator", "complaint-tool", "/tools/complaint-letter", "Free Customer Complaint Letter Generator"),
  published("refund request email template", "complaint-tool", "/tools/complaint-letter", "Free Customer Complaint Letter Generator", "secondary"),
  published("customer complaint email template", "complaint-tool", "/tools/complaint-letter", "Free Customer Complaint Letter Generator"),
  published("complaint follow-up email", "complaint-tool", "/tools/complaint-letter", "Free Customer Complaint Letter Generator", "secondary"),
  published("warranty claim letter", "complaint-tool", "/tools/complaint-letter", "Free Customer Complaint Letter Generator", "secondary"),
  published("billing dispute letter", "complaint-tool", "/tools/complaint-letter", "Free Customer Complaint Letter Generator", "secondary"),
  published("customer service escalation email", "complaint-tool", "/guides/how-to-write-professional-complaint-email", "How to Write a Professional Complaint Email")
];

const companyKeywords: KeywordResearchRow[] = globalCompanies.flatMap((company) => {
  const page = `/${company.country}/companies/${company.slug}`;
  const base = [
    published(`${company.name} customer service`, "company-support", page, `${company.name} Customer Care & Support`, "primary", company.country),
    published(`${company.name} customer support`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country),
    published(`${company.name} help center`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country)
  ];
  if (company.phone || company.tollFree || company.technicalSupportPhone || company.salesSupportPhone) {
    base.push(published(`${company.name} contact number`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country));
  }
  if (company.tollFree) base.push(published(`${company.name} toll-free number`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country));
  if (company.liveChat) base.push(published(`${company.name} live chat support`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country));
  if (company.email) base.push(published(`${company.name} support email`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country));
  if (company.refundCancellation) {
    base.push(published(`${company.name} refund not received`, "refund-return", page, `${company.name} Customer Care & Support`, "secondary", company.country));
  }
  if (company.deliveryTracking) {
    base.push(published(`${company.name} package delivered but not received`, "delivery", page, `${company.name} Customer Care & Support`, "secondary", company.country));
    base.push(published(`${company.name} tracking not updating`, "delivery", page, `${company.name} Customer Care & Support`, "secondary", company.country));
  }
  if (company.complaintSteps.length && company.escalation) {
    base.push(published(`${company.name} customer support not responding`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country));
    base.push(published(`${company.name} complaint escalation`, "company-support", page, `${company.name} Customer Care & Support`, "secondary", company.country));
  }
  return base;
});

export const keywordResearch: KeywordResearchRow[] = [...companyKeywords, ...issueKeywords];

export function findKeywordTargets(query: string, limit = 5) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const terms = normalized.split(/\s+/).filter((term) => term.length > 2);
  const scored = keywordResearch.map((row) => {
    const keyword = row.keyword.toLowerCase();
    let score = keyword === normalized ? 100 : keyword.includes(normalized) || normalized.includes(keyword) ? 60 : 0;
    for (const term of terms) if (keyword.includes(term)) score += 8;
    return { row, score };
  }).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  return scored.filter(({ row }) => !seen.has(row.targetPage) && seen.add(row.targetPage)).slice(0, limit).map(({ row }) => row);
}
