export type CountryCode = "us" | "in" | "uk" | "ca" | "au";
export type VerificationStatus = "Verified" | "Needs Review" | "Unverified";

export const countries = [
  { code: "us" as const, name: "United States", flag: "US", primary: true },
  { code: "in" as const, name: "India", flag: "IN", primary: false },
  { code: "uk" as const, name: "United Kingdom", flag: "UK", primary: false },
  { code: "ca" as const, name: "Canada", flag: "CA", primary: false },
  { code: "au" as const, name: "Australia", flag: "AU", primary: false }
];

export const globalCategories = [
  { slug: "e-commerce", name: "E-commerce", icon: "EC", description: "Orders, returns, refunds and account help" },
  { slug: "electronics", name: "Electronics", icon: "EL", description: "Devices, repairs and technical support" },
  { slug: "telecom", name: "Telecom", icon: "TC", description: "Mobile, internet, billing and network issues" },
  { slug: "banking", name: "Banking", icon: "BK", description: "Cards, transfers, disputes and complaints" },
  { slug: "travel", name: "Travel", icon: "TR", description: "Tickets, cancellations and journey support" },
  { slug: "home-appliances", name: "Home Appliances", icon: "HA", description: "Warranty, repair and service requests" },
  { slug: "courier-delivery", name: "Courier & Delivery", icon: "CD", description: "Tracking, missing parcels and claims" },
  { slug: "insurance", name: "Insurance", icon: "IS", description: "Policies, claims and grievance routes" }
];

export type GlobalCompany = {
  slug: string;
  name: string;
  country: CountryCode;
  category: string;
  summary: string;
  logoText: string;
  officialWebsite: string;
  supportWebsite: string;
  phone?: string;
  email?: string;
  warranty?: string;
  refundCancellation?: string;
  complaintSteps: string[];
  escalation: string;
  verifiedAt: string;
  verificationStatus: VerificationStatus;
  sourceLinks: { label: string; url: string }[];
  commonIssues: string[];
};

export const globalCompanies: GlobalCompany[] = [
  {
    slug: "usps", name: "USPS", country: "us", category: "courier-delivery", logoText: "USPS",
    summary: "Official United States Postal Service help for tracking, missing mail, delivery and account issues.",
    officialWebsite: "https://www.usps.com/", supportWebsite: "https://www.usps.com/help/contact-us.htm", phone: "1-800-275-8777",
    refundCancellation: "Refund and claim eligibility depends on the USPS service purchased. Use the official contact and claims routes.",
    complaintSteps: ["Check the latest tracking status on USPS.com.", "Use the official online help form for the specific issue.", "Keep the tracking number and case confirmation.", "Escalate through the channel provided in the case response."],
    escalation: "Use the official USPS contact page to route delivery, technical, Postal Store or claims issues to the correct team.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "USPS Contact Us", url: "https://www.usps.com/help/contact-us.htm" }, { label: "USPS Email Us", url: "https://emailus.usps.com/s/" }],
    commonIssues: ["Missing mail", "Tracking not updating", "Package delivery", "USPS.com account"]
  },
  {
    slug: "india-post", name: "India Post", country: "in", category: "courier-delivery", logoText: "IP",
    summary: "Official Department of Posts routes for tracking, delivery complaints and postal-service grievances.",
    officialWebsite: "https://www.indiapost.gov.in/", supportWebsite: "https://www.indiapost.gov.in/contactus", phone: "1800 266 6868",
    complaintSteps: ["Keep the consignment or article number ready.", "Check the official tracking result.", "Register the complaint through India Post's official route.", "Save the acknowledgement number for follow-up."],
    escalation: "India Post publishes complaint-registration guidelines and circle-level escalation information on its official website.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "India Post Contact Us", url: "https://www.indiapost.gov.in/contactus" }, { label: "Complaint guidelines", url: "https://www.indiapost.gov.in/grievance-redressal/guidelines" }],
    commonIssues: ["Article not delivered", "Tracking delay", "Damaged article", "Postal complaint"]
  },
  {
    slug: "flipkart", name: "Flipkart", country: "in", category: "e-commerce", logoText: "FK",
    summary: "Official help centre for orders, deliveries, returns, refunds and account issues in India.",
    officialWebsite: "https://www.flipkart.com/", supportWebsite: "https://www.flipkart.com/helpcentre",
    refundCancellation: "Open the relevant order in the signed-in account to see the available cancellation, return or refund option.",
    complaintSteps: ["Sign in to the account used for the order.", "Open the relevant order and select Help.", "Use the support option shown for that order.", "Keep screenshots and the case reference."],
    escalation: "Continue through the official order-linked support flow. Avoid social accounts or numbers that are not linked by Flipkart.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Flipkart Help Centre", url: "https://www.flipkart.com/helpcentre" }],
    commonIssues: ["Refund pending", "Return request", "Order not delivered", "Account access"]
  },
  {
    slug: "jio", name: "Jio", country: "in", category: "telecom", logoText: "JIO",
    summary: "Official support for Jio mobile, JioHome, recharge, SIM and network issues in India.",
    officialWebsite: "https://www.jio.com/", supportWebsite: "https://www.jio.com/help/contact-us",
    complaintSteps: ["Use MyJio or the official Help page.", "Run the relevant troubleshooting flow.", "Open Contact Us or live chat if unresolved.", "Keep the service-request number."],
    escalation: "Use the complaint docket number when following the official Jio grievance and appellate process.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Jio Help", url: "https://www.jio.com/help/" }, { label: "Contact JioCare", url: "https://www.jio.com/help/contact-us" }],
    commonIssues: ["Recharge issue", "Network problem", "Lost SIM", "Broadband request"]
  },
  {
    slug: "sbi", name: "State Bank of India", country: "in", category: "banking", logoText: "SBI",
    summary: "Official SBI complaint routes for accounts, cards, transactions and digital banking issues in India.",
    officialWebsite: "https://sbi.co.in/", supportWebsite: "https://crcf.sbi.co.in/ccf/",
    complaintSteps: ["Do not share a PIN, OTP, CVV or banking password.", "Keep the transaction reference, date and amount ready.", "Use SBI's official complaint form or authenticated support channel.", "Save the complaint number and follow the published escalation route."],
    escalation: "Use the complaint reference when following SBI's official grievance process. Check the latest escalation details on SBI's official domain.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "SBI complaint form", url: "https://crcf.sbi.co.in/ccf/" }, { label: "SBI official website", url: "https://sbi.co.in/" }],
    commonIssues: ["Failed transaction", "Card issue", "Digital banking", "Complaint escalation"]
  },
  {
    slug: "lg-india", name: "LG India", country: "in", category: "home-appliances", logoText: "LG",
    summary: "Official LG India support for troubleshooting, warranty, repair and service requests.",
    officialWebsite: "https://www.lg.com/in/", supportWebsite: "https://www.lg.com/in/support/contact-us/",
    warranty: "Warranty eligibility depends on the product, purchase date and applicable LG terms. Keep the invoice, model and serial number ready.",
    complaintSteps: ["Find the model and serial number on the product.", "Review official troubleshooting for that model.", "Book service through LG India's official support route.", "Keep the service-request confirmation and proof of purchase."],
    escalation: "Follow up with the official service-request reference through LG India's support channel.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "LG India Support", url: "https://www.lg.com/in/support/" }, { label: "LG India Contact Us", url: "https://www.lg.com/in/support/contact-us/" }, { label: "LG repair request", url: "https://www.lg.com/in/support/product-support/repair-request/" }],
    commonIssues: ["Product fault", "Warranty help", "Repair booking", "Service status"]
  },
  {
    slug: "irctc", name: "IRCTC", country: "in", category: "travel", logoText: "IR",
    summary: "Official IRCTC routes for e-ticketing queries, cancellations, TDR and railway ticket refund issues.",
    officialWebsite: "https://www.irctc.co.in/", supportWebsite: "https://equery.irctc.co.in/",
    refundCancellation: "Cancellation, TDR and refund eligibility depend on the ticket status, timing and applicable railway rules shown in the official account.",
    complaintSteps: ["Keep the PNR and transaction ID ready.", "Check the ticket status in the IRCTC account.", "Use the applicable cancellation or TDR option.", "Raise an official eQuery if the issue remains unresolved."],
    escalation: "Use the official eQuery reference for follow-up and avoid sharing account credentials outside IRCTC's official domains.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "IRCTC official website", url: "https://www.irctc.co.in/" }, { label: "IRCTC eQuery", url: "https://equery.irctc.co.in/" }],
    commonIssues: ["Ticket cancellation", "Refund pending", "TDR filing", "Booking issue"]
  },
  {
    slug: "royal-mail", name: "Royal Mail", country: "uk", category: "courier-delivery", logoText: "RM",
    summary: "Official Royal Mail help for tracking, lost items, postage, refunds and delivery support in the United Kingdom.",
    officialWebsite: "https://www.royalmail.com/", supportWebsite: "https://www.royalmail.com/help", phone: "03457 740 740",
    refundCancellation: "Refund routes vary between personal postage, business accounts and shop orders. Use the official help topic that matches the purchase.",
    complaintSteps: ["Track the item through Royal Mail first.", "Review the official topic for lost, delayed or damaged mail.", "Use the contact form or support route for that service.", "Keep the case reference and proof of posting."],
    escalation: "Royal Mail routes general, business and Click & Drop support separately. Use the official form for the service purchased.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Royal Mail Help", url: "https://www.royalmail.com/help" }, { label: "Royal Mail support options", url: "https://help.parcel.royalmail.com/hc/en-gb/articles/115003806094-Contact-Support" }],
    commonIssues: ["Lost item", "Delayed delivery", "Tracking status", "Postage refund"]
  },
  {
    slug: "canada-post", name: "Canada Post", country: "ca", category: "courier-delivery", logoText: "CP",
    summary: "Official Canada Post support for tracking, mail delivery, lost packages, claims and service tickets.",
    officialWebsite: "https://www.canadapost-postescanada.ca/", supportWebsite: "https://www.canadapost-postescanada.ca/cpc/en/support.page", phone: "1-866-607-6301",
    complaintSteps: ["Check tracking and current service alerts.", "Choose the official help topic matching the issue.", "Open a service ticket through the directed channel.", "Keep the closed service-ticket number if appealing to the ombudsman."],
    escalation: "Canada Post states that customer service should be contacted before an appeal to the ombudsman.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Canada Post Support", url: "https://www.canadapost-postescanada.ca/cpc/en/support.page" }],
    commonIssues: ["Package not arrived", "Delivered but missing", "Damaged parcel", "Mail delivery"]
  },
  {
    slug: "australia-post", name: "Australia Post", country: "au", category: "courier-delivery", logoText: "AP",
    summary: "Official Australia Post help for parcels, tracking, delivery options, complaints and feedback.",
    officialWebsite: "https://auspost.com.au/", supportWebsite: "https://auspost.com.au/help/", phone: "13 76 78",
    complaintSteps: ["Choose the parcel or service topic on the official help page.", "Use the online enquiry form or official contact option.", "Keep the submission acknowledgement.", "Follow the complaints and feedback process if unresolved."],
    escalation: "Australia Post publishes online, phone, in-store and written complaint routes on its official complaints page.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Australia Post Help", url: "https://auspost.com.au/help/" }, { label: "Complaints and feedback", url: "https://auspost.com.au/about-us/corporate-information/complaints-and-feedback" }],
    commonIssues: ["Parcel delayed", "Delivered parcel issue", "Tracking", "Complaint or feedback"]
  }
];

export const getCountry = (code: string) => countries.find((item) => item.code === code);
export const getGlobalCompany = (country: string, slug: string) => globalCompanies.find((item) => item.country === country && item.slug === slug);
export const companiesForCountry = (country: string) => globalCompanies.filter((item) => item.country === country);
