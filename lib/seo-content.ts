import type { CountryCode, GlobalCompany } from "@/lib/global-data";

export const primaryKeywords = [
  "customer support", "customer service contact", "customer care", "complaint resolution",
  "customer support directory", "customer complaint help", "company customer support",
  "customer care number", "complaint letter generator", "refund complaint"
];

export const longTailKeywords = [
  "how to contact customer support", "how to file a complaint against a company",
  "how to request a refund", "how to cancel an online order",
  "how to escalate a customer complaint", "how to write a complaint email",
  "how to contact company customer care", "how to resolve a billing issue",
  "how to complain about a delayed delivery", "how to request a warranty replacement"
];

export const countrySeo: Record<CountryCode, {
  seoTitle: string; description: string; h1: string; intro: string[]; terminology: string;
  faqs: Array<[string, string]>;
}> = {
  us: {
    seoTitle: "Customer Support & Complaint Help in the USA",
    description: "Find official customer support in the USA, complaint steps, refund help and free tools for resolving customer service issues.",
    h1: "Customer Support & Complaint Help in the USA",
    intro: [
      "Find official customer service contacts and practical complaint guidance for companies serving customers in the United States.",
      "Start with the company’s official support channel, keep your case reference, and use the related refund, billing or delivery guide when you need to escalate."
    ],
    terminology: "US pages use terms such as customer service, ZIP code, refund and state or federal consumer agency where relevant.",
    faqs: [["How should I start a complaint in the USA?", "Contact the company through its official support channel, describe the issue clearly and save the case number before escalating."], ["Does ResolveNexa process US refunds?", "No. We provide independent guidance and links; only the company or payment provider can process a refund."]]
  },
  in: {
    seoTitle: "Customer Care & Complaint Resolution in India",
    description: "Find verified customer care links in India, grievance steps, refund guidance and complaint letter tools for common service issues.",
    h1: "Customer Care & Complaint Resolution in India",
    intro: [
      "Find official customer care and grievance links for companies serving consumers in India, with practical steps for refunds, failed transactions and delayed deliveries.",
      "Keep the complaint or docket number from the company. Eligible unresolved consumer grievances may also be taken to the Government of India’s National Consumer Helpline."
    ],
    terminology: "India pages use customer care, grievance officer, docket number, PIN code and consumer helpline where applicable.",
    faqs: [["Where can an unresolved consumer complaint be raised in India?", "After using the company’s grievance process, eligible matters can be raised through the official National Consumer Helpline portal."], ["Should I trust customer-care numbers in comments?", "No. Use contact details published on the company’s official website or app and verify the domain first."]]
  },
  gb: {
    seoTitle: "Customer Support & Consumer Complaint Help in the UK",
    description: "Find official UK customer support links, refund and cancellation help, and clear steps for escalating consumer complaints.",
    h1: "Customer Support & Consumer Complaint Help in the UK",
    intro: [
      "Use country-specific support information for organisations serving customers in the United Kingdom, including delivery, cancellation and refund routes.",
      "Write down what happened, the outcome you want and the company’s reference number. Check the relevant official regulator or ombudsman only after completing the company’s complaints process."
    ],
    terminology: "UK pages use customer service, postcode, parcel, complaints procedure and ombudsman where the official process supports those terms.",
    faqs: [["What should a UK complaint include?", "Include dates, reference numbers, a short account of the problem and the specific remedy you are requesting."], ["Is an ombudsman always the first step?", "Usually no. Most schemes expect you to complete the company’s formal complaints process first."]]
  },
  ca: {
    seoTitle: "Customer Support & Complaint Help in Canada",
    description: "Find official customer support in Canada, complaint escalation guidance, refund help and free customer service letter tools.",
    h1: "Customer Support & Complaint Help in Canada",
    intro: [
      "Browse official support destinations and complaint guidance for organisations serving customers in Canada.",
      "Use the company’s own service ticket or complaint process first. Keep receipts, tracking details and the final response before approaching a relevant provincial or federal body."
    ],
    terminology: "Canada pages use customer service, postal code, service ticket and provincial or federal complaint body where relevant.",
    faqs: [["How do I document a complaint in Canada?", "Keep the order or account reference, dates, receipts, screenshots and every service-ticket number."], ["Does a verified listing guarantee the process will not change?", "No. Verified means the detail was checked on the displayed date; always review the linked official source before submitting information."]]
  },
  au: {
    seoTitle: "Customer Support & Consumer Complaint Help in Australia",
    description: "Find official Australian customer support links, consumer complaint steps, refund guidance and free complaint letter tools.",
    h1: "Customer Support & Consumer Complaint Help in Australia",
    intro: [
      "Find official support and complaints information for businesses serving consumers in Australia, with practical refund, delivery and warranty guidance.",
      "Contact the business first and keep a written record. If the issue remains unresolved, identify the appropriate state, territory or industry complaint body from an official government source."
    ],
    terminology: "Australia pages use customer service, postcode, consumer guarantee and external dispute resolution where the official process supports those terms.",
    faqs: [["What evidence helps an Australian consumer complaint?", "Keep proof of purchase, dates, written messages, photos where relevant and the resolution you requested."], ["Is ResolveNexa a government consumer service?", "No. It is an independent guide that links to official company and government sources."]]
  }
};

export const categorySeo: Record<string, { title: string; intro: string; faqs: Array<[string, string]>; keywords: string[] }> = {
  "e-commerce": { title: "E-commerce Customer Support", intro: "Find help for online orders, returns, refunds, account access and marketplace complaints. Check the order-linked support flow first because eligibility can depend on fulfilment status and seller policy.", keywords: ["online order support", "e-commerce refund complaint", "cancel online order"], faqs: [["What details should I keep for an online-order complaint?", "Keep the order number, seller name, payment record, delivery dates and screenshots of the listing or promised terms."], ["Can every online order be cancelled?", "No. Cancellation eligibility varies by seller, product and fulfilment stage; check the official order page."]] },
  electronics: { title: "Electronics Customer Support", intro: "Use official device support for troubleshooting, repair, replacement and warranty questions. Record the model, serial number, purchase date and diagnostic or repair reference.", keywords: ["electronics customer support", "device warranty complaint", "technical support contact"], faqs: [["What should I prepare before contacting electronics support?", "Have the model, serial number, proof of purchase, software version and a clear description of the fault."], ["Should I send a device password to support?", "No. Never send passwords, PINs or one-time codes through a complaint form."]] },
  telecom: { title: "Telecommunications Customer Support", intro: "Find official mobile, broadband and network support routes for billing, activation, coverage and service complaints. Save every service-request or complaint number.", keywords: ["telecom customer support", "mobile billing complaint", "broadband service complaint"], faqs: [["What information helps a telecom complaint?", "Include the affected service, billing period, dates, location at a broad level and previous service-request numbers."], ["When should a telecom complaint be escalated?", "Escalate through the provider’s published grievance process when first-line support has not resolved the documented issue."]] },
  banking: { title: "Banking Customer Support", intro: "Use verified bank channels for failed transfers, card disputes, billing errors and account complaints. Never disclose a PIN, CVV, password or OTP.", keywords: ["bank customer support", "failed transaction complaint", "billing dispute help"], faqs: [["What should I include in a bank transaction complaint?", "Include the date, amount, masked account details and transaction reference without sharing credentials."], ["Can ResolveNexa reverse a bank transaction?", "No. Only the bank or payment provider can investigate or reverse a transaction."]] },
  travel: { title: "Travel Customer Support", intro: "Find official help for bookings, cancellations, schedule changes, baggage and travel refunds. Keep the booking reference, fare conditions and written disruption notice.", keywords: ["travel customer support", "booking cancellation help", "travel refund complaint"], faqs: [["What should I check before cancelling travel?", "Review the fare or booking conditions, cancellation fee and refund method on the official booking page."], ["What evidence helps a travel refund request?", "Keep the booking confirmation, payment record, cancellation confirmation and any schedule-change notice."]] },
  "home-appliances": { title: "Home Appliance Customer Support", intro: "Find official warranty, installation and repair routes for household appliances. Record the model, serial number, proof of purchase and service visit details.", keywords: ["appliance customer support", "warranty repair complaint", "service centre help"], faqs: [["What details are needed for appliance warranty support?", "Prepare the model, serial number, purchase invoice, installation date and photos or error codes where useful."], ["Should I use an unknown local service number?", "Use a service centre or repair route linked from the manufacturer’s official website."]] },
  "courier-delivery": { title: "Courier & Delivery Customer Support", intro: "Find official tracking, missing parcel, damaged item and delivery complaint routes. Keep the tracking number, proof of posting and delivery evidence.", keywords: ["courier customer support", "missing parcel complaint", "delayed delivery help"], faqs: [["When should I report a missing parcel?", "Check tracking and the carrier’s stated delivery window first, then use its official missing-item route."], ["What evidence helps a damaged parcel claim?", "Keep the packaging, photographs, tracking details, proof of value and delivery date."]] },
  insurance: { title: "Insurance Customer Support", intro: "Find official policy servicing, claim and grievance routes. Use the insurer’s published complaint process and keep policy, claim and correspondence references.", keywords: ["insurance customer support", "insurance claim complaint", "policy grievance help"], faqs: [["What should an insurance complaint contain?", "Include the policy and claim references, dates, the decision or delay being challenged and the resolution requested."], ["Does ResolveNexa provide insurance advice?", "No. We provide general process guidance and links, not financial or legal advice."]] }
};

export const countryCategoryDetails: Record<string, {
  title: string;
  paragraphs: string[];
  guideSlugs: string[];
  officialSources: Array<{ label: string; url: string; note: string }>;
}> = {
  "in:banking": {
    title: "Resolve a banking complaint in India",
    paragraphs: [
      "Start with the bank's authenticated app, official website, branch or published grievance channel. Record the transaction reference, date, amount, complaint number and the resolution requested, but never share a PIN, CVV, password or OTP.",
      "If the bank's own grievance process does not resolve an eligible complaint, review the current Reserve Bank of India Ombudsman eligibility and submission instructions before using the RBI Complaint Management System. ResolveNexa cannot decide eligibility or submit the complaint for you."
    ],
    guideSlugs: ["payment-failed-money-deducted", "duplicate-charge", "resolve-billing-dispute", "account-locked-support", "how-to-escalate-customer-complaint"],
    officialSources: [
      { label: "RBI Complaint Management System", url: "https://cms.rbi.org.in/", note: "Official RBI portal for eligible complaints against covered regulated entities." },
      { label: "RBI Integrated Ombudsman Scheme FAQs", url: "https://old.rbi.org.in/commonman/english/scripts/faqs.aspx?id=3407", note: "Official eligibility, filing and complaint-process guidance. Check the current version before acting." }
    ]
  }
};

export function companyKeywords(company: GlobalCompany) {
  return [`${company.name} customer support`, `${company.name} customer service contact`, `${company.name} complaint help`, `${company.name} refund help`, ...company.commonIssues.map((issue) => `${company.name} ${issue.toLowerCase()}`)];
}

export const seoKeywordMap = {
  homepage: [primaryKeywords[0], primaryKeywords[3], primaryKeywords[4], primaryKeywords[8]],
  countries: Object.fromEntries(Object.entries(countrySeo).map(([code, data]) => [code, [data.h1.toLowerCase(), `${code} customer service contact`, `${code} complaint help`]])),
  categories: Object.fromEntries(Object.entries(categorySeo).map(([slug, data]) => [slug, data.keywords])),
  articleThemes: longTailKeywords
};
