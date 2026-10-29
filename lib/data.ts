export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
};

export type OfficialLink = {
  label: string;
  url: string;
  kind: "support" | "complaint" | "tracking";
};

export type Company = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  logoText: string;
  accent: string;
  verifiedAt: string;
  officialDomain: string;
  officialLinks: OfficialLink[];
  commonIssues: string[];
  steps: string[];
  sourceNote: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: "complaint" | "refund" | "cancellation";
  readTime: string;
  updatedAt: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
};

export const categories: Category[] = [
  { slug: "courier", name: "Courier", description: "Tracking, delivery delays and postal complaints", icon: "PK", accent: "orange" },
  { slug: "e-commerce", name: "E-commerce", description: "Orders, returns, refunds and account help", icon: "EC", accent: "purple" },
  { slug: "telecom", name: "Telecom", description: "Mobile, broadband, recharge and SIM support", icon: "TC", accent: "blue" },
  { slug: "banks", name: "Banks", description: "Cards, UPI, transactions and grievance routes", icon: "BK", accent: "green" },
  { slug: "appliances", name: "Appliances", description: "Warranty, repair and service requests", icon: "AP", accent: "rose" },
  { slug: "travel", name: "Travel", description: "Tickets, cancellations, refunds and journeys", icon: "TR", accent: "yellow" }
];

export const companies: Company[] = [
  {
    slug: "india-post",
    name: "India Post",
    category: "courier",
    summary: "Official routes for mail tracking, delivery complaints and postal-service grievances.",
    logoText: "IP",
    accent: "orange",
    verifiedAt: "2026-10-29",
    officialDomain: "indiapost.gov.in",
    officialLinks: [
      { label: "India Post contact and complaints", url: "https://www.indiapost.gov.in/contactus", kind: "support" },
      { label: "Complaint registration guidelines", url: "https://www.indiapost.gov.in/grievance-redressal/guidelines", kind: "complaint" }
    ],
    commonIssues: ["Article not delivered", "Tracking not updated", "Damaged article", "Postal service complaint"],
    steps: ["Keep the consignment or article number ready.", "Check the official tracking result before filing a complaint.", "Use the complaint route listed on India Post's official website.", "Save the acknowledgement or complaint number for follow-up."],
    sourceNote: "Links verified against the Department of Posts official website."
  },
  {
    slug: "flipkart",
    name: "Flipkart",
    category: "e-commerce",
    summary: "Official help centre for orders, deliveries, returns, refunds and account issues.",
    logoText: "FK",
    accent: "purple",
    verifiedAt: "2026-10-29",
    officialDomain: "flipkart.com",
    officialLinks: [{ label: "Flipkart Help Centre", url: "https://www.flipkart.com/helpcentre", kind: "support" }],
    commonIssues: ["Order not delivered", "Return request", "Refund pending", "Account access"],
    steps: ["Sign in to the account used for the order.", "Open the relevant order and choose Help.", "Use chat or the support option shown for that order.", "Keep screenshots and the case reference until resolution."],
    sourceNote: "Flipkart's official safety guidance directs customers to its Help Centre."
  },
  {
    slug: "jio",
    name: "Jio",
    category: "telecom",
    summary: "Official Jio support for mobile, JioHome, recharge, SIM and network issues.",
    logoText: "JI",
    accent: "blue",
    verifiedAt: "2026-10-29",
    officialDomain: "jio.com",
    officialLinks: [
      { label: "Jio Help & Support", url: "https://www.jio.com/help/", kind: "support" },
      { label: "Contact JioCare", url: "https://www.jio.com/help/contact-us", kind: "complaint" }
    ],
    commonIssues: ["Recharge not reflected", "Network issue", "Lost SIM", "JioFiber service request"],
    steps: ["Use MyJio or the official Jio Help page.", "Run the relevant troubleshooting flow.", "Open Contact Us or live chat if self-service does not resolve it.", "Keep the service-request number for escalation."],
    sourceNote: "Support paths verified on Jio's official Help and Contact pages."
  },
  {
    slug: "sbi",
    name: "State Bank of India",
    category: "banks",
    summary: "Official complaint route for SBI accounts, cards, transactions and digital banking.",
    logoText: "SBI",
    accent: "green",
    verifiedAt: "2026-10-29",
    officialDomain: "sbi.co.in",
    officialLinks: [
      { label: "SBI Customer Request & Complaint Form", url: "https://crcf.sbi.co.in/ccf/", kind: "complaint" },
      { label: "SBI official website", url: "https://sbi.co.in/", kind: "support" }
    ],
    commonIssues: ["Failed transaction", "Card issue", "UPI dispute", "Complaint escalation"],
    steps: ["Do not share PIN, OTP, CVV or internet-banking password.", "Collect the transaction reference and relevant date.", "Use SBI's official complaint form or logged-in channel.", "Retain the complaint number and follow the bank's escalation matrix."],
    sourceNote: "Complaint route verified against SBI's official grievance policy and website."
  },
  {
    slug: "lg-india",
    name: "LG India",
    category: "appliances",
    summary: "Official support for product troubleshooting, warranty, repair and service requests.",
    logoText: "LG",
    accent: "rose",
    verifiedAt: "2026-10-29",
    officialDomain: "lg.com",
    officialLinks: [
      { label: "LG India Support", url: "https://www.lg.com/in/support/", kind: "support" },
      { label: "LG India Contact Us", url: "https://www.lg.com/in/support/contact-us/", kind: "complaint" },
      { label: "LG repair request", url: "https://www.lg.com/in/support/product-support/repair-request/", kind: "tracking" }
    ],
    commonIssues: ["Product not working", "Warranty help", "Repair booking", "Service status"],
    steps: ["Find the model and serial number on the product.", "Review official troubleshooting for that model.", "Book service using LG's official repair request.", "Keep the request confirmation and proof of purchase."],
    sourceNote: "Support and repair links verified on LG India's official website."
  },
  {
    slug: "irctc",
    name: "IRCTC",
    category: "travel",
    summary: "Official routes for e-ticketing queries, cancellations, TDR and refund issues.",
    logoText: "IR",
    accent: "yellow",
    verifiedAt: "2026-10-29",
    officialDomain: "irctc.co.in",
    officialLinks: [
      { label: "IRCTC official website", url: "https://www.irctc.co.in/", kind: "support" },
      { label: "IRCTC eQuery", url: "https://equery.irctc.co.in/", kind: "complaint" }
    ],
    commonIssues: ["Ticket cancellation", "Refund pending", "TDR filing", "Login or booking issue"],
    steps: ["Keep the PNR and transaction ID ready.", "Check the ticket status in your IRCTC account.", "Use the cancellation or TDR option applicable to the booking.", "Raise a query through the official eQuery channel if unresolved."],
    sourceNote: "The eQuery route is referenced in IRCTC's official terms and conditions."
  }
];

export const guides: Guide[] = [
  {
    slug: "how-to-file-a-customer-complaint",
    title: "How to file a customer complaint that gets acted on",
    description: "A clear evidence-first process for raising and escalating a service complaint.",
    category: "complaint",
    readTime: "6 min",
    updatedAt: "2026-10-29",
    sections: [
      { heading: "Start with the official channel", body: "Use the company's own app, website or support page. Avoid numbers copied from comments, search ads or unverified directories." },
      { heading: "Prepare a clean evidence pack", body: "A short, complete complaint is easier to route.", bullets: ["Order, account or transaction reference", "Exact date and amount", "Screenshots or receipts", "What happened and the resolution requested"] },
      { heading: "Save the acknowledgement", body: "Record the ticket, docket or complaint number and the promised response time." },
      { heading: "Escalate if unresolved", body: "Use the company's grievance process first. Eligible consumer grievances can then be raised through the Government of India's National Consumer Helpline portal." }
    ]
  },
  {
    slug: "refund-not-received-checklist",
    title: "Refund not received: a practical checklist",
    description: "Check the refund trail, collect evidence and escalate without sharing sensitive banking data.",
    category: "refund",
    readTime: "5 min",
    updatedAt: "2026-10-29",
    sections: [
      { heading: "Confirm the refund status", body: "Check whether the merchant says initiated, processed or completed and note the stated timeline." },
      { heading: "Match the payment method", body: "Refunds normally return to the original method. Check the relevant card, bank, UPI or wallet statement." },
      { heading: "Request the reference", body: "Ask the merchant for the refund reference or ARN when applicable, then contact the payment provider through its official channel." },
      { heading: "Escalate with dates", body: "State the order ID, refund initiation date, amount and reference. Never publish full card or bank-account details." }
    ]
  },
  {
    slug: "order-service-cancellation-guide",
    title: "Order and service cancellation guide",
    description: "Reduce avoidable charges by checking eligibility, evidence and confirmation before cancelling.",
    category: "cancellation",
    readTime: "4 min",
    updatedAt: "2026-10-29",
    sections: [
      { heading: "Read the applicable policy", body: "Cancellation windows and charges vary by product, fare, subscription and fulfilment stage." },
      { heading: "Cancel inside the logged-in account", body: "Use the official app or website so the action is tied to your account and produces a record." },
      { heading: "Capture the confirmation", body: "Save the cancellation ID, timestamp, refund amount and expected completion date." },
      { heading: "Stop future billing separately", body: "For subscriptions, verify renewal is disabled. If an autopay mandate is involved, review it in the bank or payment app as a separate step." }
    ]
  }
];

export const siteIndex = [
  ...companies.map((item) => ({ type: "company" as const, slug: item.slug, title: item.name, description: item.summary, href: `/company/${item.slug}`, keywords: [item.category, ...item.commonIssues] })),
  ...guides.map((item) => ({ type: "guide" as const, slug: item.slug, title: item.title, description: item.description, href: `/guides/${item.slug}`, keywords: [item.category] }))
];

export const getCategory = (slug: string) => categories.find((item) => item.slug === slug);
export const getCompany = (slug: string) => companies.find((item) => item.slug === slug);
export const getGuide = (slug: string) => guides.find((item) => item.slug === slug);
