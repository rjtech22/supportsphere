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

type OfficialSource = { label: string; url: string; note: string };

export const countrySupportDetails: Record<CountryCode, {
  title: string;
  paragraphs: string[];
  checklist: string[];
  officialSources: OfficialSource[];
  faqs: Array<[string, string]>;
}> = {
  us: {
    title: "Choose the correct complaint route in the United States",
    paragraphs: [
      "Start with the company that sold or supplied the product or service. Use its official support or complaint channel, describe the issue and requested outcome, and keep the case number and response.",
      "Outside help depends on the issue. State consumer offices handle different local matters, the CFPB accepts complaints about covered financial products, and the FCC accepts communications complaints. The FTC records reports and publishes consumer guidance but does not resolve each individual dispute."
    ],
    checklist: ["Order, account or transaction reference", "Receipt, contract or billing statement", "Dates, screenshots and previous case numbers", "A short description of the outcome requested"],
    officialSources: [
      { label: "FTC: solving problems with a business", url: "https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions", note: "Official federal consumer guidance for documenting and escalating problems with a business." },
      { label: "CFPB complaint process", url: "https://www.consumerfinance.gov/complaint/process/", note: "Official process for complaints about eligible consumer financial products and services." },
      { label: "FCC Consumer Complaints Center", url: "https://consumercomplaints.fcc.gov/hc/en-us", note: "Official communications complaint portal. Review the issue categories before filing." },
      { label: "USA.gov state consumer protection offices", url: "https://www.usa.gov/state-consumer", note: "Official directory of state and territory consumer protection offices." }
    ],
    faqs: [["Does one US agency handle every customer complaint?", "No. The correct route depends on the product, service, state and issue. Start with the company, then use the official agency whose scope matches the complaint."], ["What should I save after contacting support?", "Keep the case number, submission date, representative or channel used, promised action and any written response."]]
  },
  in: {
    title: "Prepare and escalate a consumer complaint in India",
    paragraphs: [
      "Use the company's authenticated app, official website, published grievance channel or branch first. Keep the order, transaction or service reference and every complaint or docket number.",
      "If the issue remains unresolved, select a route that matches the sector. The National Consumer Helpline provides a general grievance platform; RBI and TRAI publish separate processes for eligible banking and telecom matters."
    ],
    checklist: ["Order, transaction, policy or service reference", "Invoice, receipt or payment record", "Screenshots and earlier complaint or docket numbers", "A clear remedy requested without passwords, PINs, CVVs or OTPs"],
    officialSources: [
      { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in/public/", note: "Government of India consumer grievance and information portal." },
      { label: "RBI Complaint Management System", url: "https://cms.rbi.org.in/", note: "Official RBI portal for eligible complaints against covered regulated entities." },
      { label: "TRAI grievance redressal mechanism", url: "https://trai.gov.in/consumer-info/telecom/grievance-redressal-mechanism", note: "Official telecom provider complaint and appellate guidance." }
    ],
    faqs: [["Should I contact a regulator before the company?", "Use the company's published complaint or grievance process first unless an official source for your issue instructs otherwise."], ["What information should never be included?", "Never share a password, PIN, CVV, OTP or full payment credential in a customer complaint."]]
  },
  gb: {
    title: "Find the right consumer complaint path in the United Kingdom",
    paragraphs: [
      "Begin with the trader or service provider's formal complaints procedure. State what happened, the outcome you want and the evidence you hold, then keep the final response or deadlock communication if one is provided.",
      "The next route varies by sector and nation. Citizens Advice provides consumer guidance, the Financial Ombudsman Service covers eligible financial complaints, and Ofcom explains communications and postal complaint routes."
    ],
    checklist: ["Order, booking, account or parcel reference", "Proof of purchase and relevant terms", "Complaint history and the company's final response", "The specific refund, repair, correction or other outcome requested"],
    officialSources: [
      { label: "GOV.UK consumer rights", url: "https://www.gov.uk/consumer-protection-rights", note: "Official starting point for consumer protection information and advice routes." },
      { label: "Citizens Advice consumer service", url: "https://www.citizensadvice.org.uk/about-us/information/contact-the-consumer-service/", note: "Consumer advice and guidance for relevant problems in England and Wales; check the page for nation-specific alternatives." },
      { label: "Financial Ombudsman Service", url: "https://www.financial-ombudsman.org.uk/consumers/log-ombudsman-connect/how-to-complain", note: "Official guidance for eligible unresolved complaints about financial businesses." },
      { label: "Ofcom complaints", url: "https://www.ofcom.org.uk/make-a-complaint", note: "Official routes for communications, postal and other issues within Ofcom's remit." }
    ],
    faqs: [["Is an ombudsman the first step for a UK complaint?", "Usually not. Follow the company's formal complaint process and review the relevant scheme's current acceptance rules before escalating."], ["Why should I keep the final response?", "It records the company's position and may be requested by an appropriate dispute-resolution service."]]
  },
  ca: {
    title: "Route a consumer complaint correctly in Canada",
    paragraphs: [
      "Contact the business through its official support or complaint process and keep the service ticket, receipt, screenshots and written response.",
      "Consumer protection responsibilities can be federal, provincial, territorial or sector-specific. Use the Office of Consumer Affairs complaint roadmap to identify the right level; CCTS handles eligible telecom and TV complaints, while financial institutions have their own complaint procedures."
    ],
    checklist: ["Order, account, tracking or service-ticket reference", "Receipt, agreement or billing record", "Province or territory and dates relevant to the issue", "The company's response and the outcome requested"],
    officialSources: [
      { label: "Canada consumer complaint roadmap", url: "https://ised-isde.canada.ca/site/office-consumer-affairs/en/complaint-roadmap", note: "Official federal roadmap explaining how to direct a consumer complaint." },
      { label: "Provincial and territorial consumer affairs offices", url: "https://ised-isde.canada.ca/site/office-consumer-affairs/en/federal-provincial-and-territorial-consumer-affairs-offices", note: "Official directory of consumer affairs offices across Canada." },
      { label: "CCTS telecom complaints", url: "https://www.ccts-cprst.ca/for-consumers/telecom-complaints/", note: "Independent complaint-resolution service for eligible phone, internet and TV issues." },
      { label: "Financial Consumer Agency of Canada", url: "https://www.canada.ca/en/financial-consumer-agency/corporate/contact-us.html", note: "Official financial consumer information; FCAC states that individual complaints must be raised with the financial institution." }
    ],
    faqs: [["Why does province or territory matter?", "Many consumer matters are handled under provincial or territorial systems, while some sectors use federal or independent complaint bodies."], ["Does FCAC resolve an individual bank complaint?", "FCAC provides information and supervises federal obligations, but its official page directs consumers to their financial institution to resolve an individual complaint."]]
  },
  au: {
    title: "Choose an Australian consumer or industry complaint route",
    paragraphs: [
      "Raise the problem with the business first and keep proof of purchase, dates, photos where relevant and the written complaint outcome.",
      "The appropriate next step may be a state or territory consumer agency or an industry dispute-resolution scheme. ACCC guidance links to local consumer help, AFCA covers eligible financial complaints and the TIO handles eligible phone and internet complaints."
    ],
    checklist: ["Receipt, invoice, booking or account reference", "Photos, messages and service records relevant to the issue", "The business complaint and response", "The remedy requested and any safety or urgency concerns"],
    officialSources: [
      { label: "ACCC: where to go for consumer help", url: "https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/where-to-go-for-consumer-help", note: "Official guidance and state or territory consumer protection contacts." },
      { label: "Australian Financial Complaints Authority", url: "https://www.afca.org.au/make-a-complaint", note: "Independent service for eligible complaints about member financial firms." },
      { label: "Telecommunications Industry Ombudsman", url: "https://www.tio.com.au/", note: "Independent complaint service for eligible phone and internet problems." }
    ],
    faqs: [["Does the ACCC resolve every individual dispute?", "No. Its guidance explains that state or territory agencies and industry schemes may be the appropriate source of individual help."], ["What should I do before using an ombudsman?", "Raise the issue through the business's complaint process and check the scheme's current scope and requirements."]]
  }
};

export const categorySeo: Record<string, { title: string; intro: string; metaDescription: string; faqs: Array<[string, string]>; keywords: string[] }> = {
  "e-commerce": { title: "E-commerce Customer Support", intro: "Find help for online orders, returns, refunds, account access and marketplace complaints. Check the order-linked support flow first because eligibility can depend on fulfilment status and seller policy.", metaDescription: "Find verified online order, return, refund and account support routes", keywords: ["online order support", "e-commerce refund complaint", "cancel online order"], faqs: [["What details should I keep for an online-order complaint?", "Keep the order number, seller name, payment record, delivery dates and screenshots of the listing or promised terms."], ["Can every online order be cancelled?", "No. Cancellation eligibility varies by seller, product and fulfilment stage; check the official order page."]] },
  electronics: { title: "Electronics Customer Support", intro: "Use official device support for troubleshooting, repair, replacement and warranty questions. Record the model, serial number, purchase date and diagnostic or repair reference.", metaDescription: "Find verified electronics support for devices, repairs and warranty issues", keywords: ["electronics customer support", "device warranty complaint", "technical support contact"], faqs: [["What should I prepare before contacting electronics support?", "Have the model, serial number, proof of purchase, software version and a clear description of the fault."], ["Should I send a device password to support?", "No. Never send passwords, PINs or one-time codes through a complaint form."]] },
  telecom: { title: "Telecommunications Customer Support", intro: "Find official mobile, broadband and network support routes for billing, activation, coverage and service complaints. Save every service-request or complaint number.", metaDescription: "Find verified telecom support for mobile, broadband, billing and network issues", keywords: ["telecom customer support", "mobile billing complaint", "broadband service complaint"], faqs: [["What information helps a telecom complaint?", "Include the affected service, billing period, dates, location at a broad level and previous service-request numbers."], ["When should a telecom complaint be escalated?", "Escalate through the provider’s published grievance process when first-line support has not resolved the documented issue."]] },
  banking: { title: "Banking Customer Support", intro: "Use verified bank channels for failed transfers, card disputes, billing errors and account complaints. Never disclose a PIN, CVV, password or OTP.", metaDescription: "Find verified bank support for failed transactions, billing disputes and account complaints", keywords: ["bank customer support", "failed transaction complaint", "billing dispute help"], faqs: [["What should I include in a bank transaction complaint?", "Include the date, amount, masked account details and transaction reference without sharing credentials."], ["Can ResolveNexa reverse a bank transaction?", "No. Only the bank or payment provider can investigate or reverse a transaction."]] },
  travel: { title: "Travel Customer Support", intro: "Find official help for bookings, cancellations, schedule changes, baggage and travel refunds. Keep the booking reference, fare conditions and written disruption notice.", metaDescription: "Find verified travel support for bookings, cancellations, baggage and refunds", keywords: ["travel customer support", "booking cancellation help", "travel refund complaint"], faqs: [["What should I check before cancelling travel?", "Review the fare or booking conditions, cancellation fee and refund method on the official booking page."], ["What evidence helps a travel refund request?", "Keep the booking confirmation, payment record, cancellation confirmation and any schedule-change notice."]] },
  "home-appliances": { title: "Home Appliance Customer Support", intro: "Find official warranty, installation and repair routes for household appliances. Record the model, serial number, proof of purchase and service visit details.", metaDescription: "Find verified appliance support for warranty, installation and repair issues", keywords: ["appliance customer support", "warranty repair complaint", "service centre help"], faqs: [["What details are needed for appliance warranty support?", "Prepare the model, serial number, purchase invoice, installation date and photos or error codes where useful."], ["Should I use an unknown local service number?", "Use a service centre or repair route linked from the manufacturer’s official website."]] },
  "courier-delivery": { title: "Courier Customer Support", intro: "Find official tracking, missing parcel, damaged item and delivery complaint routes. Keep the tracking number, proof of posting and delivery evidence.", metaDescription: "Find verified courier support for tracking, missing parcels and delivery complaints", keywords: ["courier customer support", "missing parcel complaint", "delayed delivery help"], faqs: [["When should I report a missing parcel?", "Check tracking and the carrier’s stated delivery window first, then use its official missing-item route."], ["What evidence helps a damaged parcel claim?", "Keep the packaging, photographs, tracking details, proof of value and delivery date."]] },
  insurance: { title: "Insurance Customer Support", intro: "Find official policy servicing, claim and grievance routes. Use the insurer’s published complaint process and keep policy, claim and correspondence references.", metaDescription: "Find verified insurance support for policy, claim and grievance issues", keywords: ["insurance customer support", "insurance claim complaint", "policy grievance help"], faqs: [["What should an insurance complaint contain?", "Include the policy and claim references, dates, the decision or delay being challenged and the resolution requested."], ["Does ResolveNexa provide insurance advice?", "No. We provide general process guidance and links, not financial or legal advice."]] },
  "software-technology": { title: "Software & Technology Support", intro: "Find official account, subscription, billing and technical support routes for software and online services. Keep error messages, account references and existing case numbers, but never share a password or one-time code.", metaDescription: "Find verified software support for accounts, subscriptions, billing and technical issues", keywords: ["software customer support", "software account support", "subscription billing help"], faqs: [["What should I prepare before contacting software support?", "Record the product or service name, account email, error message, billing date and any existing case reference. Never share a password or one-time code."], ["Where should I request account or subscription help?", "Use the company’s official signed-in help centre or support page and choose the route that matches account access, billing or technical support."]] }
};

export const categoryGuideSlugs: Record<string, string[]> = {
  "e-commerce": ["how-to-request-a-refund", "how-to-cancel-an-online-order", "package-delivered-not-received"],
  electronics: ["request-warranty-replacement", "account-locked-support", "customer-support-not-responding"],
  telecom: ["resolve-billing-dispute", "account-locked-support", "customer-support-not-responding"],
  banking: ["payment-failed-money-deducted", "duplicate-charge", "resolve-billing-dispute"],
  travel: ["how-to-cancel-an-online-order", "refund-not-received", "complain-about-delayed-delivery"],
  "home-appliances": ["request-warranty-replacement", "customer-support-not-responding", "how-to-file-a-customer-complaint"],
  "courier-delivery": ["complain-about-delayed-delivery", "package-delivered-not-received", "tracking-number-not-working"],
  insurance: ["how-to-file-a-customer-complaint", "how-to-escalate-customer-complaint", "customer-support-not-responding"],
  "software-technology": ["account-locked-support", "resolve-billing-dispute", "customer-support-not-responding"],
  automotive: ["request-warranty-replacement", "how-to-file-a-customer-complaint", "customer-support-not-responding"],
  healthcare: ["resolve-billing-dispute", "how-to-file-a-customer-complaint", "customer-support-not-responding"],
  "food-delivery": ["package-delivered-not-received", "refund-not-received", "payment-failed-money-deducted"],
  utilities: ["resolve-billing-dispute", "customer-support-not-responding", "how-to-escalate-customer-complaint"],
  "other-services": ["how-to-contact-customer-support", "how-to-file-a-customer-complaint", "how-to-escalate-customer-complaint"]
};

type CountryCategoryDetail = {
  title: string;
  paragraphs: string[];
  sections: Array<{ heading: string; body: string }>;
  guideSlugs: string[];
  officialSources: OfficialSource[];
};

const categoryWorkflows: Record<string, Array<{ heading: string; body: string }>> = {
  "e-commerce": [
    { heading: "Identify who controls the order", body: "Check whether the item was sold by the marketplace, a third-party seller or a separate retailer. Use the support route attached to the order so the complaint reaches the party that can inspect payment, fulfilment and return records." },
    { heading: "Prepare an order evidence pack", body: "Keep the order number, seller name, payment record, promised delivery date, listing screenshots and every support case reference. State whether you need delivery, cancellation, return, replacement or refund help." }
  ],
  electronics: [
    { heading: "Separate troubleshooting from a warranty request", body: "Record the model, serial number, purchase date, software version, error message and diagnostics already attempted. Use only troubleshooting or repair routes linked from the manufacturer's official website." },
    { heading: "Document repair and replacement history", body: "Keep proof of purchase, diagnostic results, service-centre job sheets and previous repair references. Ask support to confirm the next available remedy under the applicable published policy without assuming that replacement is automatic." }
  ],
  telecom: [
    { heading: "Classify the telecom problem", body: "Separate network or service faults from recharge, activation, SIM, billing or account-access issues. Record the affected service, dates, broad location and every complaint or service-request number." },
    { heading: "Use the provider's escalation path", body: "Start with the provider's official complaint centre and retain the acknowledgement. If unresolved, use the appellate or external route shown by the relevant official regulator rather than an unverified contact." }
  ],
  banking: [
    { heading: "Identify the transaction state", body: "Check whether a payment is pending, reversed, completed or duplicated in the authenticated app or statement. Save the transaction reference, date, amount and merchant details without sharing a PIN, CVV, password or OTP." },
    { heading: "Follow the institution complaint ladder", body: "Raise the issue through the bank or payment provider's official grievance route and keep the complaint number. Use an external ombuds or regulator only after checking its current scope, eligibility and required prior steps." }
  ],
  travel: [
    { heading: "Identify the booking party", body: "Confirm whether the booking was made directly with the travel supplier or through a platform. Keep the booking reference, fare or cancellation terms, payment record and any schedule-change notice." },
    { heading: "Request a specific travel outcome", body: "State whether you need rebooking, cancellation, a status update or a refund review. Preserve written confirmations and avoid assuming that one supplier's policy applies to another booking." }
  ],
  "home-appliances": [
    { heading: "Prepare appliance and installation details", body: "Record the model, serial number, purchase invoice, installation date, error code and previous service-visit references. Use an authorised service route linked from the manufacturer's official website." },
    { heading: "Track the repair case", body: "Keep the job sheet, technician notes, parts status and promised next step. Ask the company to confirm whether repair, replacement or another remedy is available under its published terms." }
  ],
  "courier-delivery": [
    { heading: "Read the latest tracking event", body: "Confirm the tracking number, service used, sender details and latest scan. Separate a tracking-data problem from a delayed, damaged, missing or delivered-but-not-received parcel." },
    { heading: "Check who must open the case", body: "Some carrier enquiries or claims must be started by the sender or account holder. Review the carrier's official instructions, keep proof of posting or purchase and save photos or delivery evidence where relevant." }
  ],
  "software-technology": [
    { heading: "Choose account, billing or technical support", body: "Use the signed-in help centre where available and record the product, account email, error message, billing date and existing case number. Never share a password, recovery code or one-time code." },
    { heading: "Preserve a reproducible technical record", body: "Note the device, operating system, app or browser version, exact error and steps already tried. For subscription disputes, keep the invoice and cancellation or renewal confirmation." }
  ]
};

const categorySources = {
  usConsumer: [
    { label: "FTC consumer guidance", url: "https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions", note: "Official guidance for documenting and escalating a problem with a business." },
    { label: "USA.gov state consumer offices", url: "https://www.usa.gov/state-consumer", note: "Official directory for state and territory consumer protection help." }
  ],
  usFinance: [
    { label: "CFPB complaint process", url: "https://www.consumerfinance.gov/complaint/process/", note: "Official complaint process for eligible consumer financial products and services." },
    { label: "USA.gov state consumer offices", url: "https://www.usa.gov/state-consumer", note: "Official state and territory consumer office directory." }
  ],
  indiaConsumer: [
    { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in/public/", note: "Government of India consumer grievance and information portal." }
  ],
  indiaBanking: [
    { label: "RBI Complaint Management System", url: "https://cms.rbi.org.in/", note: "Official RBI portal for eligible complaints against covered regulated entities." },
    { label: "RBI Ombudsman FAQs", url: "https://old.rbi.org.in/commonman/english/scripts/faqs.aspx?id=3407", note: "Official eligibility and filing guidance; check the current scheme before acting." }
  ],
  indiaTelecom: [
    { label: "TRAI grievance redressal mechanism", url: "https://trai.gov.in/consumer-info/telecom/grievance-redressal-mechanism", note: "Official provider complaint-centre and appellate guidance." },
    { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in/public/", note: "Government of India consumer grievance and information portal." }
  ],
  ukConsumer: [
    { label: "GOV.UK consumer rights", url: "https://www.gov.uk/consumer-protection-rights", note: "Official consumer protection information and nation-specific advice routes." },
    { label: "Citizens Advice consumer service", url: "https://www.citizensadvice.org.uk/about-us/information/contact-the-consumer-service/", note: "Consumer guidance for relevant problems; review the page for the correct nation-specific service." }
  ],
  ukCourier: [
    { label: "Ofcom complaints", url: "https://www.ofcom.org.uk/make-a-complaint", note: "Official routes for postal and communications complaints within Ofcom's remit." },
    { label: "GOV.UK consumer rights", url: "https://www.gov.uk/consumer-protection-rights", note: "Official consumer protection information and advice routes." }
  ],
  canadaConsumer: [
    { label: "Canada consumer complaint roadmap", url: "https://ised-isde.canada.ca/site/office-consumer-affairs/en/complaint-roadmap", note: "Official guidance for identifying the correct complaint route." },
    { label: "Provincial and territorial consumer offices", url: "https://ised-isde.canada.ca/site/office-consumer-affairs/en/federal-provincial-and-territorial-consumer-affairs-offices", note: "Official directory of local consumer affairs offices." }
  ],
  australiaConsumer: [
    { label: "ACCC consumer help", url: "https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/where-to-go-for-consumer-help", note: "Official guidance and links to state and territory consumer agencies." }
  ]
} satisfies Record<string, OfficialSource[]>;

function categoryDetail(title: string, lead: string, category: keyof typeof categoryWorkflows, guideSlugs: string[], officialSources: OfficialSource[]): CountryCategoryDetail {
  return {
    title,
    paragraphs: [lead, "Use only the verified company listings on this page for country-specific support. A regulator or consumer body may have a limited remit, so check its official scope before submitting a complaint."],
    sections: categoryWorkflows[category],
    guideSlugs,
    officialSources
  };
}

export const countryCategoryDetails: Record<string, CountryCategoryDetail> = {
  "us:e-commerce": categoryDetail("Resolve an online-order problem in the United States", "Start with the order-linked support flow and identify the seller or marketplace responsible for fulfilment, cancellation, return or refund review.", "e-commerce", categoryGuideSlugs["e-commerce"], categorySources.usConsumer),
  "us:electronics": categoryDetail("Resolve an electronics support problem in the United States", "Use the manufacturer's official US product-support route and prepare device, purchase and diagnostic details before requesting repair or warranty help.", "electronics", categoryGuideSlugs.electronics, categorySources.usConsumer),
  "us:banking": categoryDetail("Resolve a banking or payment complaint in the United States", "Raise the issue through the financial institution's official dispute or complaint channel and keep all transaction and case references.", "banking", categoryGuideSlugs.banking, categorySources.usFinance),
  "us:travel": categoryDetail("Resolve a US travel booking or refund problem", "Check whether the airline, accommodation provider or booking platform controls the reservation, then use its official US support route with the booking terms and disruption evidence.", "travel", categoryGuideSlugs.travel, categorySources.usConsumer),
  "us:courier-delivery": categoryDetail("Resolve a US parcel delivery problem", "Use the carrier's official US tracking and claims guidance and confirm whether the sender or recipient must start the enquiry.", "courier-delivery", categoryGuideSlugs["courier-delivery"], categorySources.usConsumer),
  "us:software-technology": categoryDetail("Resolve a US software account, billing or technical issue", "Use the provider's official signed-in support route where available and separate account recovery, subscription billing and technical troubleshooting.", "software-technology", categoryGuideSlugs["software-technology"], categorySources.usConsumer),
  "in:e-commerce": categoryDetail("Resolve an e-commerce order complaint in India", "Use the order-linked seller or marketplace support flow, save the complaint or ticket number, and keep payment, delivery and listing evidence.", "e-commerce", categoryGuideSlugs["e-commerce"], categorySources.indiaConsumer),
  "in:electronics": categoryDetail("Resolve electronics warranty or repair support in India", "Use the brand's official India support or authorised service-centre route and prepare the invoice, serial number and service history.", "electronics", categoryGuideSlugs.electronics, categorySources.indiaConsumer),
  "in:telecom": categoryDetail("Resolve a mobile or broadband complaint in India", "Raise the issue with the telecom provider's official complaint centre and retain the service-request or docket number before reviewing its appellate route.", "telecom", categoryGuideSlugs.telecom, categorySources.indiaTelecom),
  "in:banking": categoryDetail("Resolve a banking complaint in India", "Start with the bank's authenticated app, official website, branch or published grievance channel and record the transaction and complaint references.", "banking", ["payment-failed-money-deducted", "duplicate-charge", "resolve-billing-dispute", "account-locked-support", "how-to-escalate-customer-complaint"], categorySources.indiaBanking),
  "in:travel": categoryDetail("Resolve an India travel booking or cancellation problem", "Identify whether IRCTC, a carrier, accommodation provider or booking platform controls the transaction, then use its official India support route.", "travel", categoryGuideSlugs.travel, categorySources.indiaConsumer),
  "in:home-appliances": categoryDetail("Resolve appliance warranty or repair support in India", "Use the manufacturer's official India service route and keep the purchase invoice, installation details, model, serial number and service job sheets.", "home-appliances", categoryGuideSlugs["home-appliances"], categorySources.indiaConsumer),
  "in:courier-delivery": categoryDetail("Resolve a courier or parcel complaint in India", "Check the latest tracking scan and use the carrier's official India complaint route with the article or consignment number and proof of posting.", "courier-delivery", categoryGuideSlugs["courier-delivery"], categorySources.indiaConsumer),
  "gb:e-commerce": categoryDetail("Resolve an online-order complaint in the United Kingdom", "Contact the trader or marketplace through its formal support route and keep the order terms, payment record and written response.", "e-commerce", categoryGuideSlugs["e-commerce"], categorySources.ukConsumer),
  "gb:courier-delivery": categoryDetail("Resolve a UK parcel delivery complaint", "Confirm whether the retailer, sender or postal operator must open the case, then use the operator's official complaint process with tracking and delivery evidence.", "courier-delivery", categoryGuideSlugs["courier-delivery"], categorySources.ukCourier),
  "ca:e-commerce": categoryDetail("Resolve an online-order complaint in Canada", "Use the merchant or marketplace's official Canadian support flow and record the order, seller, payment, delivery and service-ticket details.", "e-commerce", categoryGuideSlugs["e-commerce"], categorySources.canadaConsumer),
  "ca:courier-delivery": categoryDetail("Resolve a Canadian parcel delivery complaint", "Use the carrier's official Canadian tracking or claims route and check whether the sender or recipient is required to submit the enquiry.", "courier-delivery", categoryGuideSlugs["courier-delivery"], categorySources.canadaConsumer),
  "au:courier-delivery": categoryDetail("Resolve an Australian parcel delivery complaint", "Contact the retailer, sender or carrier through the applicable official route and preserve tracking, proof-of-purchase and delivery evidence.", "courier-delivery", categoryGuideSlugs["courier-delivery"], categorySources.australiaConsumer)
};

export const guideIntentClusters = [
  { title: "Contact and complaint", slugs: ["how-to-contact-customer-support", "how-to-file-a-customer-complaint", "how-to-write-professional-complaint-email", "how-to-escalate-customer-complaint", "customer-support-not-responding"] },
  { title: "Refunds and cancellations", slugs: ["how-to-request-a-refund", "refund-not-received", "how-to-cancel-an-online-order"] },
  { title: "Delivery and tracking", slugs: ["complain-about-delayed-delivery", "package-delivered-not-received", "tracking-number-not-working"] },
  { title: "Payments and accounts", slugs: ["payment-failed-money-deducted", "duplicate-charge", "resolve-billing-dispute", "account-locked-support"] },
  { title: "Warranty and replacement", slugs: ["request-warranty-replacement"] }
] as const;

export const guideEnhancements: Record<string, Array<{ heading: string; body: string; bullets?: string[] }>> = {
  "how-to-contact-customer-support": [{ heading: "Match the channel to the issue", body: "Use an order-linked, signed-in or product-specific support route where available. General social profiles and search-result phone numbers may not reach the team that can access the case.", bullets: ["Use account recovery for sign-in problems", "Use order support for delivery, return or cancellation issues", "Use billing or dispute support for payment problems", "Use product support for diagnostics, repair or warranty questions"] }],
  "how-to-file-a-customer-complaint": [{ heading: "Separate facts from assumptions", body: "Give the company a short timeline of what happened, the evidence you hold and the specific outcome requested. Avoid unsupported accusations because they make the case harder to investigate." }],
  "how-to-write-professional-complaint-email": [{ heading: "Make the complaint easy to investigate", body: "Put the order or case reference near the top, describe one main issue, list the key dates and ask for one clear next step. Attach copies rather than original documents and remove unnecessary personal data." }],
  "how-to-request-a-refund": [{ heading: "Confirm who took the payment", body: "The seller, marketplace, travel supplier or payment provider may have different roles. Start with the party shown on the order or statement and use the official refund or order-support route." }],
  "how-to-cancel-an-online-order": [{ heading: "Record the order stage before cancelling", body: "Check whether the order is awaiting confirmation, processing, shipped or already delivered. Save the cancellation request and the resulting status because the available next step can change with fulfilment." }],
  "complain-about-delayed-delivery": [{ heading: "Separate seller and carrier actions", body: "The carrier can explain tracking events, while the seller or sender may control replacement, refund or claim decisions. Keep both parties' case references and avoid opening conflicting requests without checking the order terms." }],
  "resolve-billing-dispute": [{ heading: "Identify the exact disputed line", body: "Record the invoice date, service period, amount, tax or fee label and why it appears incorrect. A precise line-item dispute is easier to investigate than a general statement that the bill is wrong." }],
  "customer-support-not-responding": [{ heading: "Audit the contact trail before escalating", body: "List each channel used, submission date, case number and promised response. Send a concise follow-up through an official route and carry the same evidence into the formal complaint instead of starting over." }],
  "refund-not-received": [{ heading: "Identify the refund status", body: "Ask whether the refund was requested, approved, issued or reversed and record any refund reference. The correct follow-up differs when the merchant has not issued the refund versus when a payment provider is still processing it." }],
  "package-delivered-not-received": [{ heading: "Preserve delivery evidence", body: "Save the tracking page, delivery timestamp, photo or signature information and the result of safe checks with household members or the delivery location. Use the seller and carrier routes that apply to the shipment." }],
  "tracking-number-not-working": [{ heading: "Validate the reference before escalating", body: "Check for copied spaces or characters, confirm the carrier and ask the sender whether the label has been handed over. Do not assume a tracking error means the parcel is lost." }],
  "payment-failed-money-deducted": [{ heading: "Check whether an order was created", body: "Compare the merchant order history with the bank or payment-app transaction status. Avoid repeated payment attempts until you know whether the first transaction is pending, reversed or completed." }],
  "duplicate-charge": [{ heading: "Compare pending and settled entries", body: "Two entries can represent an authorisation and a later settled charge rather than two completed payments. Record the dates, amounts and merchant descriptors before starting a duplicate-charge dispute." }],
  "account-locked-support": [{ heading: "Use only the official recovery path", body: "Open the provider's website or app directly, review recovery email or phone details carefully and treat unfamiliar changes as a possible account-compromise issue. Never share a password or one-time code with a support contact." }]
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
