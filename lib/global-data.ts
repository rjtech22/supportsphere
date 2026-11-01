import { priorityCompanies } from "@/lib/priority-companies";
import { allCountries, countryByCode } from "@/lib/country-catalog";

export type CountryCode = string;
export type VerificationStatus = "Verified" | "Needs Review" | "Unverified";

export const countries = allCountries;

export const globalCategories = [
  { slug: "e-commerce", name: "E-commerce", icon: "EC", description: "Orders, returns, refunds and account help" },
  { slug: "electronics", name: "Electronics", icon: "EL", description: "Devices, repairs and technical support" },
  { slug: "telecom", name: "Telecom", icon: "TC", description: "Mobile, internet, billing and network issues" },
  { slug: "banking", name: "Banking", icon: "BK", description: "Cards, transfers, disputes and complaints" },
  { slug: "travel", name: "Travel", icon: "TR", description: "Tickets, cancellations and journey support" },
  { slug: "home-appliances", name: "Home Appliances", icon: "HA", description: "Warranty, repair and service requests" },
  { slug: "courier-delivery", name: "Courier & Delivery", icon: "CD", description: "Tracking, missing parcels and claims" },
  { slug: "insurance", name: "Insurance", icon: "IS", description: "Policies, claims and grievance routes" }
  ,{ slug: "software-technology", name: "Software & Technology", icon: "ST", description: "Accounts, subscriptions, cloud products and technical help" }
  ,{ slug: "automotive", name: "Automotive", icon: "AU", description: "Vehicle support, service, warranty and roadside help" }
  ,{ slug: "healthcare", name: "Healthcare", icon: "HC", description: "Appointments, billing and patient support channels" }
  ,{ slug: "food-delivery", name: "Food & Delivery", icon: "FD", description: "Orders, missing items, refunds and delivery issues" }
  ,{ slug: "utilities", name: "Utilities", icon: "UT", description: "Electricity, gas, water, billing and service complaints" }
  ,{ slug: "other-services", name: "Other Services", icon: "OS", description: "Verified support routes for other customer services" }
];

export type GlobalCompany = {
  slug: string;
  name: string;
  country: CountryCode;
  category: string;
  summary: string;
  logoText: string;
  aliases?: string[];
  regions?: string[];
  supportTypes?: string[];
  officialWebsite: string;
  supportWebsite: string;
  phone?: string;
  tollFree?: string;
  technicalSupportPhone?: string;
  salesSupportPhone?: string;
  whatsapp?: string;
  email?: string;
  liveChat?: string;
  helpCenter?: string;
  supportHours?: string;
  warranty?: string;
  refundCancellation?: string;
  replacement?: string;
  deliveryTracking?: string;
  billingPayment?: string;
  complaintSteps: string[];
  escalation: string;
  verifiedAt: string;
  verificationStatus: VerificationStatus;
  sourceLinks: { label: string; url: string }[];
  commonIssues: string[];
  faqs?: { question: string; answer: string }[];
};

const baseCompanies: GlobalCompany[] = [
  {
    slug: "usps", name: "USPS", country: "us", category: "courier-delivery", logoText: "USPS",
    summary: "Official United States Postal Service help for tracking, missing mail, delivery and account issues.",
    officialWebsite: "https://www.usps.com/", supportWebsite: "https://www.usps.com/help/contact-us.htm", phone: "1-800-275-8777",
    refundCancellation: "Refund and claim eligibility depends on the USPS service purchased. Use the official contact and claims routes.",
    complaintSteps: ["Check the latest tracking status on USPS.com.", "Use the official online help form for the specific issue.", "Keep the tracking number and case confirmation.", "Escalate through the channel provided in the case response."],
    escalation: "Use the official USPS contact page to route delivery, technical, Postal Store or claims issues to the correct team.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "USPS Contact Us", url: "https://www.usps.com/help/contact-us.htm" }, { label: "USPS Email Us", url: "https://emailus.usps.com/s/" }],
    commonIssues: ["Missing mail", "Tracking not updating", "Package delivery", "USPS.com account"],
    faqs: [{ question: "How do I report missing mail to USPS?", answer: "Start with USPS tracking and the official missing-mail or Email Us route that matches the item. Keep the tracking number and case confirmation." }, { question: "Which USPS number is listed for general customer care?", answer: "USPS lists 1-800-275-8777 on its official Contact Us page. Service-specific hours and routes are also listed there." }, { question: "How do I follow up on a USPS claim or complaint?", answer: "Use the original case or claim reference and the service-specific contact option shown on USPS Contact Us." }]
  },
  {
    slug: "india-post", name: "India Post", country: "in", category: "courier-delivery", logoText: "IP",
    summary: "Official Department of Posts routes for tracking, delivery complaints and postal-service grievances.",
    officialWebsite: "https://www.indiapost.gov.in/", supportWebsite: "https://www.indiapost.gov.in/contactus", phone: "1800 266 6868",
    complaintSteps: ["Keep the consignment or article number ready.", "Check the official tracking result.", "Register the complaint through India Post's official route.", "Save the acknowledgement number for follow-up."],
    escalation: "India Post publishes complaint-registration guidelines and circle-level escalation information on its official website.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "India Post Contact Us", url: "https://www.indiapost.gov.in/contactus" }, { label: "Complaint guidelines", url: "https://www.indiapost.gov.in/grievance-redressal/guidelines" }],
    commonIssues: ["Article not delivered", "Tracking delay", "Damaged article", "Postal complaint"],
    faqs: [{ question: "What information is needed for an India Post complaint?", answer: "Keep the article or consignment number, booking details, dates and proof of the problem ready before registering the complaint." }, { question: "Where should I register an India Post delivery complaint?", answer: "Use the complaint route linked from the official India Post website and save the acknowledgement number." }, { question: "How do I escalate an unresolved India Post complaint?", answer: "Follow the official grievance guidelines and circle-level escalation route with the original acknowledgement number." }]
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
    commonIssues: ["Refund pending", "Return request", "Order not delivered", "Account access"],
    faqs: [{ question: "How do I contact Flipkart about an order?", answer: "Sign in to Flipkart Help Centre, open the affected order and use the support option displayed for that purchase." }, { question: "Where can I check a Flipkart refund or return?", answer: "Open the order in the signed-in account. Its order-help flow shows the available return, replacement or refund status." }, { question: "Does ResolveNexa publish a Flipkart phone number?", answer: "No verified general customer-care number is displayed here. Use the official order-linked Help Centre to avoid impersonation scams." }]
  },
  {
    slug: "jio", name: "Jio", country: "in", category: "telecom", logoText: "JIO",
    summary: "Official support for Jio mobile, JioHome, recharge, SIM and network issues in India.",
    officialWebsite: "https://www.jio.com/", supportWebsite: "https://www.jio.com/help/contact-us",
    complaintSteps: ["Use MyJio or the official Help page.", "Run the relevant troubleshooting flow.", "Open Contact Us or live chat if unresolved.", "Keep the service-request number."],
    escalation: "Use the complaint docket number when following the official Jio grievance and appellate process.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Jio Help", url: "https://www.jio.com/help/" }, { label: "Contact JioCare", url: "https://www.jio.com/help/contact-us" }],
    commonIssues: ["Recharge issue", "Network problem", "Lost SIM", "Broadband request"],
    faqs: [{ question: "How do I contact JioCare for a service issue?", answer: "Use MyJio or the official Jio Help and Contact Us pages, choose the affected service and keep the service-request number." }, { question: "What should I do for a failed Jio recharge?", answer: "Check the recharge and payment status in MyJio, then use the official support flow with the transaction reference if it remains unresolved." }, { question: "How do I escalate a Jio complaint?", answer: "Use the complaint docket number when following Jio's official grievance and appellate process." }]
  },
  {
    slug: "sbi", name: "State Bank of India", country: "in", category: "banking", logoText: "SBI",
    summary: "Official SBI complaint routes for accounts, cards, transactions and digital banking issues in India.",
    officialWebsite: "https://sbi.co.in/", supportWebsite: "https://crcf.sbi.co.in/ccf/",
    complaintSteps: ["Do not share a PIN, OTP, CVV or banking password.", "Keep the transaction reference, date and amount ready.", "Use SBI's official complaint form or authenticated support channel.", "Save the complaint number and follow the published escalation route."],
    escalation: "Use the complaint reference when following SBI's official grievance process. Check the latest escalation details on SBI's official domain.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "SBI complaint form", url: "https://crcf.sbi.co.in/ccf/" }, { label: "SBI official website", url: "https://sbi.co.in/" }],
    commonIssues: ["Failed transaction", "Card issue", "Digital banking", "Complaint escalation"],
    faqs: [{ question: "How do I register an SBI transaction complaint?", answer: "Use SBI's official complaint form or authenticated banking channel with the transaction reference, date and amount." }, { question: "What banking details should never be shared with support?", answer: "Never share an OTP, PIN, CVV or banking password. Use only SBI's official domains and authenticated channels." }, { question: "How do I follow up on an SBI complaint?", answer: "Keep the complaint number and use SBI's published grievance route for the next escalation level." }]
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
    commonIssues: ["Product fault", "Warranty help", "Repair booking", "Service status"],
    faqs: [{ question: "What should I prepare before booking LG India service?", answer: "Have the model, serial number, purchase invoice and a clear description of the fault ready." }, { question: "Where can I request an LG India repair?", answer: "Use LG India's official repair-request page or Contact Us route and save the service-request confirmation." }, { question: "Does every LG repair qualify for warranty service?", answer: "No. Eligibility depends on the product, purchase date, issue and applicable warranty terms reviewed by LG." }]
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
    commonIssues: ["Ticket cancellation", "Refund pending", "TDR filing", "Booking issue"],
    faqs: [{ question: "What details are useful for an IRCTC ticket complaint?", answer: "Keep the PNR, transaction ID, journey date and the cancellation or TDR status ready." }, { question: "Where do I raise an unresolved IRCTC refund query?", answer: "Use the official IRCTC eQuery portal and save its reference for follow-up." }, { question: "Does every cancelled ticket receive the same refund?", answer: "No. Eligibility and deductions depend on ticket status, timing and the railway rules shown in the official account." }]
  },
  {
    slug: "royal-mail", name: "Royal Mail", country: "gb", category: "courier-delivery", logoText: "RM",
    summary: "Official Royal Mail help for tracking, lost items, postage, refunds and delivery support in the United Kingdom.",
    officialWebsite: "https://www.royalmail.com/", supportWebsite: "https://www.royalmail.com/help", phone: "03457 740 740",
    refundCancellation: "Refund routes vary between personal postage, business accounts and shop orders. Use the official help topic that matches the purchase.",
    complaintSteps: ["Track the item through Royal Mail first.", "Review the official topic for lost, delayed or damaged mail.", "Use the contact form or support route for that service.", "Keep the case reference and proof of posting."],
    escalation: "Royal Mail routes general, business and Click & Drop support separately. Use the official form for the service purchased.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Royal Mail Help", url: "https://www.royalmail.com/help" }, { label: "Royal Mail support options", url: "https://help.parcel.royalmail.com/hc/en-gb/articles/115003806094-Contact-Support" }],
    commonIssues: ["Lost item", "Delayed delivery", "Tracking status", "Postage refund"],
    faqs: [{ question: "How do I report a lost or delayed Royal Mail item?", answer: "Track the item first, then open the official help topic for lost or delayed mail and use the service-specific contact route." }, { question: "What evidence helps a Royal Mail complaint?", answer: "Keep the tracking number, proof of posting, purchase details and any prior case reference." }, { question: "Which Royal Mail phone number is verified here?", answer: "Royal Mail's official support information lists 03457 740 740 for customer support. Check the official help page for current availability." }]
  },
  {
    slug: "canada-post", name: "Canada Post", country: "ca", category: "courier-delivery", logoText: "CP",
    summary: "Official Canada Post support for tracking, mail delivery, lost packages, claims and service tickets.",
    officialWebsite: "https://www.canadapost-postescanada.ca/", supportWebsite: "https://www.canadapost-postescanada.ca/cpc/en/support.page", phone: "1-866-607-6301",
    complaintSteps: ["Check tracking and current service alerts.", "Choose the official help topic matching the issue.", "Open a service ticket through the directed channel.", "Keep the closed service-ticket number if appealing to the ombudsman."],
    escalation: "Canada Post states that customer service should be contacted before an appeal to the ombudsman.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Canada Post Support", url: "https://www.canadapost-postescanada.ca/cpc/en/support.page" }],
    commonIssues: ["Package not arrived", "Delivered but missing", "Damaged parcel", "Mail delivery"],
    faqs: [{ question: "How do I open a Canada Post service ticket?", answer: "Start from Canada Post Support, choose the issue that matches the mail or parcel and follow the directed service-ticket route." }, { question: "What should I save after contacting Canada Post?", answer: "Keep the tracking number, submission details and service-ticket number, including the closed ticket if an ombudsman appeal becomes eligible." }, { question: "When can I appeal to the Canada Post ombudsman?", answer: "Canada Post states that customer service should be contacted first. Follow the official appeal eligibility and process after that route is completed." }]
  },
  {
    slug: "australia-post", name: "Australia Post", country: "au", category: "courier-delivery", logoText: "AP",
    summary: "Official Australia Post help for parcels, tracking, delivery options, complaints and feedback.",
    officialWebsite: "https://auspost.com.au/", supportWebsite: "https://auspost.com.au/help/", phone: "13 76 78",
    complaintSteps: ["Choose the parcel or service topic on the official help page.", "Use the online enquiry form or official contact option.", "Keep the submission acknowledgement.", "Follow the complaints and feedback process if unresolved."],
    escalation: "Australia Post publishes online, phone, in-store and written complaint routes on its official complaints page.",
    verifiedAt: "2026-10-29", verificationStatus: "Verified",
    sourceLinks: [{ label: "Australia Post Help", url: "https://auspost.com.au/help/" }, { label: "Complaints and feedback", url: "https://auspost.com.au/about-us/corporate-information/complaints-and-feedback" }],
    commonIssues: ["Parcel delayed", "Delivered parcel issue", "Tracking", "Complaint or feedback"],
    faqs: [{ question: "How do I contact Australia Post about a parcel?", answer: "Choose the parcel or service topic in Australia Post Help and use the online enquiry or official contact option shown." }, { question: "Which Australia Post phone number is verified here?", answer: "Australia Post's official help information lists 13 76 78. Check the official page for current hours and service routing." }, { question: "How do I escalate an Australia Post complaint?", answer: "Use the official complaints and feedback process with the tracking details and prior submission acknowledgement." }]
  },
  {
    slug: "dell", name: "Dell", country: "us", category: "electronics", logoText: "DELL",
    aliases: ["Dell Technologies", "Dell customer service", "Dell technical support"], regions: ["United States"], supportTypes: ["phone", "chat", "warranty", "repair", "order support"],
    summary: "Official Dell US support for laptops, desktops, drivers, diagnostics, warranty coverage, repairs, orders and returns.",
    officialWebsite: "https://www.dell.com/en-us", supportWebsite: "https://www.dell.com/support/home/en-us", helpCenter: "https://www.dell.com/support/home/en-us",
    technicalSupportPhone: "1-800-624-9896", phone: "1-800-624-9897",
    warranty: "Use the Service Tag on Dell Support to check coverage, run diagnostics and open a service request. Dell's US limited-hardware-warranty page lists separate numbers for hardware warranty support and customer service.",
    refundCancellation: "For an order purchased directly from Dell, open Order Support to check status, invoices and the return options available for that order. Retailer purchases follow the retailer's return process.",
    complaintSteps: ["Find the Service Tag or Dell order number.", "Use Dell Support to run diagnostics or open the matching order-support route.", "Record the service-request or return authorization number.", "Follow up through the same official case so the history remains attached."],
    escalation: "If the first response does not resolve the issue, reopen or follow up on the existing Dell service request and include the Service Tag, diagnostics result and requested remedy.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "Dell Support Home", url: "https://www.dell.com/support/home/en-us" }, { label: "Dell US contact options", url: "https://www.dell.com/en-us/shop/lp/contact-us" }, { label: "Dell limited hardware warranty", url: "https://www.dell.com/en-us/legal/lp/art-limited-hardware-warranties" }],
    commonIssues: ["Laptop or desktop fault", "Drivers and diagnostics", "Warranty coverage", "Repair status", "Order return"],
    faqs: [{ question: "What should I have ready before contacting Dell support?", answer: "Have the Service Tag or order number ready. Dell uses it to identify the device, warranty coverage and available service options." }, { question: "Where can I check a Dell warranty?", answer: "Open Dell Support Home, identify the product with its Service Tag and review Support Services for the current coverage." }, { question: "How do I escalate an unresolved Dell repair?", answer: "Follow up on the existing official service request and include the case number, diagnostic result and the resolution you are requesting." }]
  },
  {
    slug: "amazon", name: "Amazon", country: "us", category: "e-commerce", logoText: "AMZ",
    aliases: ["Amazon.com", "Amazon customer service", "Amazon refund"], regions: ["United States"], supportTypes: ["chat", "self-service", "returns", "refunds", "delivery"],
    summary: "Official Amazon.com help for orders, delivery, returns, replacements, refunds, account access and marketplace purchases in the United States.",
    officialWebsite: "https://www.amazon.com/", supportWebsite: "https://www.amazon.com/gp/help/customer/display.html?nodeId=508510", helpCenter: "https://www.amazon.com/gp/help/customer/display.html?nodeId=508510",
    refundCancellation: "Open Your Orders to cancel an eligible order, start a return or replacement, and view the option offered for the item. Return eligibility and refund timing vary by item, seller, condition, payment method and the stage of fulfillment.",
    replacement: "Open Your Orders and choose the item-specific return or replacement option when one is offered. The available remedy depends on the item, seller, condition and order status.",
    deliveryTracking: "Track the shipment from Your Orders. If tracking says delivered but the package is missing, use the order-specific delivery help route and follow Amazon's checks before requesting further support.",
    billingPayment: "Use the affected order or transaction in Your Orders to review charges, payment status and refund progress. Keep the order number and payment method ready when contacting support.",
    complaintSteps: ["Sign in to the Amazon account used for the purchase and open Your Orders.", "Select the affected order so Amazon can show the options available for that item, seller and fulfilment status.", "For delivery issues, record the latest tracking event and check whether the order was split into multiple shipments.", "For a return or refund, save the return confirmation, refund status and any reference displayed in the order.", "If the first contact does not resolve the issue, return to the same order and quote the previous case or chat details."],
    escalation: "Return to the affected order in Customer Service and provide the order number, the action already taken, the previous case or chat details and the exact resolution requested. For a third-party seller order, use the seller-contact and marketplace resolution options shown in that order rather than assuming Amazon handled fulfilment.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "Amazon Customer Service", url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=508510" }, { label: "Amazon Returns Center", url: "https://www.amazon.com/returns" }, { label: "Amazon Your Orders", url: "https://www.amazon.com/gp/css/order-history" }],
    commonIssues: ["Package not delivered", "Return an item", "Refund status", "Cancel an order", "Marketplace seller issue"],
    faqs: [{ question: "How do I contact Amazon about a specific order?", answer: "Sign in, open Your Orders, select the order and choose the help option shown for that purchase. Available contact options depend on the issue." }, { question: "Where can I check an Amazon refund?", answer: "Use Your Returns or the return and refund status shown in the order. Processing time varies by return, payment method and financial institution." }, { question: "What should I check when an Amazon package shows delivered but is missing?", answer: "Open the order's official tracking details, check the recorded delivery location and any split shipments, then use the order-specific delivery help option if the package is still missing." }, { question: "Can every Amazon order be cancelled?", answer: "No. The order page shows whether cancellation is still available. If shipment has progressed, a return may be the available route instead." }]
  },
  {
    slug: "apple", name: "Apple", country: "us", category: "electronics", logoText: "APL",
    aliases: ["Apple Support", "iPhone support", "Mac support"], regions: ["United States"], supportTypes: ["phone", "chat", "repair", "warranty", "refunds"],
    summary: "Official Apple US support for iPhone, Mac, iPad, Apple Account, subscriptions, App Store refunds, warranty coverage and repairs.",
    officialWebsite: "https://www.apple.com/", supportWebsite: "https://support.apple.com/en-us/106932", helpCenter: "https://support.apple.com/", liveChat: "https://getsupport.apple.com/", phone: "1-800-275-2273",
    warranty: "Check coverage on Apple's official coverage page. Apple states that warranty-backed repairs are provided by Apple or an Apple Authorized Service Provider; service options depend on the product and coverage.",
    refundCancellation: "Use Apple's official refund-request flow for eligible App Store and media purchases. Subscriptions can be changed or cancelled from the Apple Account subscription settings.",
    complaintSteps: ["Choose the affected product or service on Apple Support.", "Sign in when needed so Apple can show device and purchase-specific options.", "Save the support case or repair ID.", "Follow up through My Support or the same official case."],
    escalation: "Use the existing Apple case or repair ID when reconnecting with Apple Support. For repair disputes, retain the coverage result, service estimate and repair-status history.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "Contact Apple Support", url: "https://support.apple.com/en-us/106932" }, { label: "Apple service and repair", url: "https://support.apple.com/repair" }, { label: "Apple coverage check", url: "https://checkcoverage.apple.com/" }, { label: "Request an Apple refund", url: "https://reportaproblem.apple.com/" }],
    commonIssues: ["Apple Account access", "iPhone or Mac technical issue", "Repair status", "Warranty coverage", "App Store refund"],
    faqs: [{ question: "How do I start an Apple repair?", answer: "Use Apple Service and Repair, select the product and follow the available service options. Keep the repair ID for status checks." }, { question: "How can I check Apple warranty coverage?", answer: "Use Apple's official coverage-check page and enter the device serial number." }, { question: "Where do I request an App Store refund?", answer: "Use Apple's Report a Problem service. Eligibility is determined by Apple for the purchase and circumstances." }]
  },
  {
    slug: "samsung", name: "Samsung", country: "us", category: "electronics", logoText: "SAM",
    aliases: ["Samsung Electronics", "Samsung Care", "Samsung repair"], regions: ["United States"], supportTypes: ["phone", "chat", "text", "repair", "order support"],
    summary: "Official Samsung US support for phones, TVs, appliances, accounts, orders, product registration, warranty and repair service.",
    officialWebsite: "https://www.samsung.com/us/", supportWebsite: "https://www.samsung.com/us/support/contact/", helpCenter: "https://www.samsung.com/us/support/", liveChat: "https://www.samsung.com/us/support/contact/", phone: "1-800-726-7864", supportHours: "Phone: 8 AM–9 PM ET Monday–Friday; 8 AM–6 PM ET Saturday–Sunday. Chat and text availability is shown on the official contact page.",
    warranty: "Register or identify the Samsung product, review its warranty status and use the official contact page to request service. Available repair methods depend on the product and location.",
    refundCancellation: "For Samsung.com orders, use Order Help to track the order, review trade-in questions and see the available cancellation or return route.",
    complaintSteps: ["Sign in or identify the product model and serial number.", "Choose product support, Order Help or Request a repair.", "Save the ticket, repair or order-support reference.", "Use the official contact page to follow up with the reference."],
    escalation: "Reconnect through Samsung's official contact page and provide the existing ticket, repair request or order number plus the requested resolution.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "Samsung US Contact Us", url: "https://www.samsung.com/us/support/contact/" }, { label: "Samsung US Support", url: "https://www.samsung.com/us/support/" }, { label: "Samsung repair service", url: "https://www.samsung.com/us/support/service/" }],
    commonIssues: ["Phone or TV support", "Appliance repair", "Samsung account", "Order or trade-in", "Warranty service"],
    faqs: [{ question: "What details help Samsung support identify a product?", answer: "Have the model and serial number ready. Signing in and registering the product can show more specific troubleshooting and service options." }, { question: "How do I request a Samsung repair?", answer: "Open the official contact page and choose Request a repair. The available walk-in, mail-in or on-site option depends on the product and location." }, { question: "How do I follow up on a Samsung complaint?", answer: "Use the official contact route with the existing ticket, repair request or order number and state the unresolved outcome." }]
  },
  {
    slug: "microsoft", name: "Microsoft", country: "us", category: "software-technology", logoText: "MS",
    aliases: ["Microsoft Support", "Microsoft 365", "Windows support", "Xbox support"], regions: ["United States"], supportTypes: ["self-service", "chat", "callback", "subscription", "billing"],
    summary: "Official Microsoft support for Windows, Microsoft 365, Outlook, OneDrive, accounts, subscriptions, billing and eligible refunds.",
    officialWebsite: "https://www.microsoft.com/en-us/", supportWebsite: "https://support.microsoft.com/contactus", helpCenter: "https://support.microsoft.com/",
    refundCancellation: "Manage subscriptions from the Microsoft account used for the purchase. Microsoft shows cancellation and refund eligibility during the official cancellation flow; purchases billed by another app store or retailer must be managed with that provider.",
    complaintSteps: ["Sign in with the Microsoft account connected to the product or purchase.", "Use Contact Microsoft Support and describe the affected product and issue.", "Choose an offered support option such as self-help, chat or callback.", "Save the request number and follow up through the same account."],
    escalation: "If self-help does not resolve the issue, select Contact Support in the official flow. Business administrators should open a service request in the Microsoft 365 admin center.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "Contact Microsoft Support", url: "https://support.microsoft.com/contactus" }, { label: "Microsoft account help", url: "https://support.microsoft.com/en-us/accounts-billing/manage/microsoft-account-help" }, { label: "Microsoft subscription refund policy", url: "https://support.microsoft.com/en-us/accounts-billing/subscriptions/microsoft-subscription-refund-policy" }],
    commonIssues: ["Microsoft account sign-in", "Windows activation", "Microsoft 365 billing", "Cancel a subscription", "Request a refund"],
    faqs: [{ question: "How do I reach a Microsoft support agent?", answer: "Open Contact Microsoft Support, describe the problem and select Contact Support if self-help does not resolve it. The available option may include chat or callback." }, { question: "How do I cancel a Microsoft subscription?", answer: "Sign in to Services & subscriptions with the purchasing account, select Manage and follow the cancellation flow." }, { question: "Does cancelling always create a Microsoft refund?", answer: "No. Eligibility depends on the subscription, purchase channel, timing and country. The official cancellation flow shows whether a refund is available." }]
  },
  {
    slug: "google", name: "Google", country: "us", category: "software-technology", logoText: "G",
    aliases: ["Google Support", "Google Store", "Pixel support", "Google account help"], regions: ["United States"], supportTypes: ["help center", "account recovery", "store returns", "device warranty"],
    summary: "Official Google help routes for Google Accounts and products, plus Google Store orders, Pixel devices, returns, refunds and warranty support.",
    officialWebsite: "https://www.google.com/", supportWebsite: "https://support.google.com/", helpCenter: "https://support.google.com/store/?hl=en",
    warranty: "For Google Store hardware, use the product-specific Help Center and repair or warranty route shown for the device. Coverage and service options depend on the product, purchase location and warranty status.",
    refundCancellation: "Google Store return eligibility is shown in the order and official returns guidance. Most Store items have a stated return window, but exceptions and product-specific rules apply; track the return and refund in the official order flow.",
    complaintSteps: ["Open the Help Center for the affected Google product.", "Sign in with the account connected to the service or Store order.", "Use the Contact us option shown after selecting the issue, when available.", "Keep the order, repair or support reference for follow-up."],
    escalation: "Google does not publish one universal support channel for every product. Continue through the affected product's official Help Center and use the contact option displayed for the signed-in account and issue.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "Google Help", url: "https://support.google.com/" }, { label: "Google Store Help", url: "https://support.google.com/store/?hl=en" }, { label: "Google Store returns guide", url: "https://support.google.com/store/answer/15611890?hl=en" }],
    commonIssues: ["Google Account access", "Google Store order", "Pixel repair", "Return or refund status", "Product-specific support"],
    faqs: [{ question: "Is there one Google customer-care number for every product?", answer: "No. Google routes support by product and issue. Start in the official Help Center for the affected service or device." }, { question: "How do I contact Google Store support?", answer: "Open Google Store Help, sign in, select the order or issue and use the Contact us option offered for that case." }, { question: "Where can I track a Google Store refund?", answer: "Use the return and refund status options in Google Store Help or the original order. Timing depends on the item, return processing and payment method." }]
  },
  {
    slug: "hp", name: "HP", country: "us", category: "electronics", logoText: "HP",
    aliases: ["HP Support", "Hewlett-Packard", "HP printer support", "HP laptop repair"], regions: ["United States"], supportTypes: ["diagnostics", "warranty", "repair", "virtual agent", "case support"],
    summary: "Official HP US support for laptops, desktops, printers, drivers, diagnostics, warranty checks, repair requests and repair status.",
    officialWebsite: "https://www.hp.com/us-en/home.html", supportWebsite: "https://support.hp.com/us-en", helpCenter: "https://support.hp.com/us-en",
    warranty: "Use HP's official Warranty Check with the country of purchase and serial number. For repair, run HP diagnostics first; a failure ID can help start the repair process.",
    complaintSteps: ["Identify the product and serial number.", "Run the official HP diagnostic or troubleshooting tool for the symptom.", "Use Contact HP Support or the repair center if the issue remains.", "Keep the case, failure ID or service-order number."],
    escalation: "Follow up through Contact HP Support with the existing case or service-order number, diagnostic failure ID, warranty result and requested resolution.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "HP Support US", url: "https://support.hp.com/us-en" }, { label: "HP warranty check", url: "https://support.hp.com/us-en/check-warranty" }, { label: "HP repair center", url: "https://support.hp.com/us-en/help/repair" }],
    commonIssues: ["Printer not working", "Laptop hardware fault", "Drivers and software", "Warranty check", "Repair status"],
    faqs: [{ question: "How do I check an HP warranty?", answer: "Use HP's official Warranty Check and enter the serial number and country or region of purchase." }, { question: "What should I do before requesting an HP repair?", answer: "Run the relevant HP diagnostic tool. If it returns a failure ID, keep that code with the product and serial numbers." }, { question: "How do I follow an HP repair?", answer: "Use HP's repair-status option with the service-order number and the requested identifying information." }]
  },
  {
    slug: "lenovo", name: "Lenovo", country: "us", category: "electronics", logoText: "LEN",
    aliases: ["Lenovo Support", "ThinkPad support", "Lenovo warranty"], regions: ["United States"], supportTypes: ["drivers", "diagnostics", "warranty", "repair", "contact support"],
    summary: "Official Lenovo US support for laptops, desktops, tablets, drivers, diagnostics, warranty lookup, repairs and repair status.",
    officialWebsite: "https://www.lenovo.com/us/en/", supportWebsite: "https://support.lenovo.com/us/en/", helpCenter: "https://support.lenovo.com/us/en/",
    warranty: "Use Lenovo Warranty Lookup with the device serial number. Support options and repair coverage depend on the identified product and current warranty or service entitlement.",
    complaintSteps: ["Identify the device with its serial number or product selector.", "Use Troubleshoot & Diagnose or find the matching drivers and documentation.", "Open Contact Us or the repair route for unresolved hardware issues.", "Keep the case or repair reference and check its status online."],
    escalation: "Return to Lenovo Support with the serial number and existing case or repair reference. Include diagnostic results and the remedy requested.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "Lenovo Support US", url: "https://support.lenovo.com/us/en/" }, { label: "Lenovo warranty lookup", url: "https://pcsupport.lenovo.com/us/en/warranty-lookup" }, { label: "Lenovo Contact Us", url: "https://support.lenovo.com/us/en/contact-us" }],
    commonIssues: ["Laptop troubleshooting", "Drivers and BIOS", "Warranty lookup", "Repair request", "Repair status"],
    faqs: [{ question: "How do I check a Lenovo warranty?", answer: "Use Lenovo's official Warranty Lookup and enter or detect the device serial number." }, { question: "Where can I find Lenovo drivers?", answer: "Identify the product on Lenovo Support and open Drivers & Software for that exact model and operating system." }, { question: "How do I escalate a Lenovo repair issue?", answer: "Follow up through Lenovo Support with the serial number, existing repair or case reference, diagnostic evidence and requested remedy." }]
  },
  {
    slug: "paypal", name: "PayPal", country: "us", category: "banking", logoText: "PP",
    aliases: ["PayPal customer service", "PayPal Resolution Center", "PayPal dispute"], regions: ["United States"], supportTypes: ["chat", "phone", "message center", "disputes", "claims"],
    summary: "Official PayPal US help for account access, payments, refunds, unauthorized activity, disputes, claims and account limitations.",
    officialWebsite: "https://www.paypal.com/us/home", supportWebsite: "https://www.paypal.com/us/cshelp/contact-us", helpCenter: "https://www.paypal.com/us/cshelp/personal", liveChat: "https://www.paypal.com/us/cshelp/contact-us", phone: "888-221-1161",
    refundCancellation: "A completed payment generally requires contacting the seller for a refund. For an eligible purchase problem or unauthorized transaction, use the Resolution Center. A payment can be cancelled only when the transaction details show a Cancel option.",
    complaintSteps: ["Sign in and open the Resolution Center.", "Select the transaction and the reason that matches the problem.", "Upload requested evidence and monitor messages and deadlines.", "If eligible and unresolved, escalate the dispute to a claim before the displayed deadline."],
    escalation: "PayPal's official guidance says a dispute may be escalated to a claim when it is not resolved. Monitor the Resolution Center because deadlines and evidence requests apply to each case.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "PayPal Contact Us", url: "https://www.paypal.com/us/cshelp/contact-us" }, { label: "Open a PayPal dispute", url: "https://www.paypal.com/us/cshelp/article/how-do-i-open-a-dispute-with-a-seller-help160" }, { label: "Escalate a dispute to a claim", url: "https://www.paypal.com/us/cshelp/article/how-do-i-escalate-a-paypal-dispute-to-a-claim-help367" }, { label: "Report unauthorized activity", url: "https://www.paypal.com/us/cshelp/article/how-do-i-report-an-unauthorized-transaction-or-account-activity-help136" }],
    commonIssues: ["Payment pending or declined", "Refund not received", "Unauthorized transaction", "Open a dispute", "Account limitation"],
    faqs: [{ question: "How do I contact PayPal customer service?", answer: "Open PayPal Contact Us and select the issue. Available options may include the PayPal Assistant, live chat or a call." }, { question: "How do I dispute a PayPal payment?", answer: "Open the Resolution Center, select Report a Problem, choose the transaction and follow the issue-specific steps." }, { question: "When should I escalate a PayPal dispute?", answer: "If the seller does not resolve the problem, review the case in the Resolution Center and escalate before the deadline shown for that dispute." }]
  },
  {
    slug: "adobe", name: "Adobe", country: "us", category: "software-technology", logoText: "ADB",
    aliases: ["Adobe Support", "Creative Cloud support", "Adobe subscription"], regions: ["United States"], supportTypes: ["account support", "chat", "subscription", "billing", "cancellation"],
    summary: "Official Adobe support for Creative Cloud and Acrobat installation, accounts, plans, payments, subscription cancellation and refund eligibility.",
    officialWebsite: "https://www.adobe.com/", supportWebsite: "https://helpx.adobe.com/contact.html", helpCenter: "https://helpx.adobe.com/support.html", liveChat: "https://helpx.adobe.com/contact.html",
    refundCancellation: "Subscriptions purchased directly from Adobe can be managed in the Adobe account. Refunds and fees depend on the plan type and cancellation timing; subscriptions purchased through Apple, Google, Microsoft or another provider must be cancelled with that provider.",
    complaintSteps: ["Sign in to the Adobe account that owns the product or plan.", "Open Contact Adobe Support and select the product, plan or payment issue.", "Save the chat or case reference and any cancellation confirmation.", "Follow up through the same Adobe account if the issue remains unresolved."],
    escalation: "Use the existing support case or chat reference and provide the plan name, billing date and requested resolution. Do not publish or share license keys in public forums.",
    verifiedAt: "2026-10-30", verificationStatus: "Verified",
    sourceLinks: [{ label: "Contact Adobe Support", url: "https://helpx.adobe.com/contact.html" }, { label: "Adobe Help Center", url: "https://helpx.adobe.com/support.html" }, { label: "Cancel an Adobe subscription", url: "https://helpx.adobe.com/account/individual/subscriptions-and-plans/renewals-and-cancellations/cancel-adobe-subscription.html" }],
    commonIssues: ["Creative Cloud installation", "Adobe account access", "Billing charge", "Cancel a subscription", "Refund eligibility"],
    faqs: [{ question: "How do I contact Adobe support?", answer: "Open Adobe's official contact page, sign in and select the affected product, plan or payment issue to see the available support option." }, { question: "How do I cancel an Adobe plan?", answer: "For a plan bought directly from Adobe, sign in, open Plans and payment, choose Manage plan and follow Cancel your plan." }, { question: "Does cancelling an Adobe subscription always create a refund?", answer: "No. Refunds and possible fees depend on the plan, purchase channel and cancellation timing shown in the official cancellation flow." }]
  }
];

const globalSeoExpansionCompanies: GlobalCompany[] = [
  {
    slug: "walmart", name: "Walmart", country: "us", category: "e-commerce", logoText: "WMT",
    aliases: ["Walmart customer service", "Walmart.com support", "Walmart refund"], regions: ["United States"], supportTypes: ["phone", "chat", "orders", "returns", "refunds", "delivery"],
    summary: "Official Walmart US help for online orders, store purchases, delivery problems, returns, refunds, cancellations and account support.",
    officialWebsite: "https://www.walmart.com/", supportWebsite: "https://www.walmart.com/help/", helpCenter: "https://www.walmart.com/help/", phone: "1-800-925-6278", liveChat: "https://www.walmart.com/help?chatBot=open",
    refundCancellation: "Use Purchase History to request an eligible cancellation, return or refund. The option and timing shown by Walmart depend on the order status, item and fulfillment method.",
    replacement: "Open Purchase History and select the item to see the available return or replacement route. Do not send an item to an address supplied outside Walmart's official flow.",
    deliveryTracking: "Check tracking in Purchase History. If an order is marked delivered but is missing, follow Walmart's Order Not Received steps and use official help with the order number.",
    billingPayment: "Review the affected order in Purchase History for charges, adjustments and refund status. Keep the order number and payment method ready for support.",
    complaintSteps: ["Sign in and open Purchase History.", "Select the affected order and the issue-specific help option.", "Use Walmart Help chat or the officially published phone number if self-service does not resolve it.", "Save the case, chat transcript and requested resolution."],
    escalation: "Reconnect through Walmart Help with the order number and prior case details. Explain the unresolved issue, evidence already supplied and the specific remedy requested.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "Walmart Help", url: "https://www.walmart.com/help/" }, { label: "Walmart corporate contact", url: "https://corporate.walmart.com/about/contact" }, { label: "Order not received", url: "https://www.walmart.com/help/article/order-not-received/af24f9d61b5143d9973f95c9d5bc3140" }, { label: "Walmart refunds", url: "https://www.walmart.com/help/article/refunds/a86a0400e237444cb9a5f3c3ce500d1b" }],
    commonIssues: ["Refund not received", "Order delivered but missing", "Cancel an order", "Return or replacement", "Account and payment issue"],
    faqs: [{ question: "How do I contact Walmart customer service?", answer: "Use Walmart Help or the customer-service number published on Walmart's corporate contact page: 1-800-925-6278." }, { question: "What should I do when Walmart says delivered but the order is missing?", answer: "Check Purchase History and follow Walmart's official Order Not Received steps before contacting support with the order number." }, { question: "Where can I check a Walmart refund?", answer: "Open Purchase History and the affected order. Walmart's refund guide explains that timing varies by return and payment method." }]
  },
  {
    slug: "ebay", name: "eBay", country: "us", category: "e-commerce", logoText: "EBAY",
    aliases: ["eBay customer service", "eBay buyer support", "eBay refund"], regions: ["United States"], supportTypes: ["contact flow", "returns", "refunds", "item not received", "buyer protection"],
    summary: "Official eBay US help for purchases, returns, refunds, items not received, account issues and case escalation.",
    officialWebsite: "https://www.ebay.com/", supportWebsite: "https://www.ebay.com/help/-/contact-ebay/contact-ebay?id=4379", helpCenter: "https://www.ebay.com/help/home",
    refundCancellation: "Open Purchase history and choose the order-specific return, cancellation or refund route. Available remedies and deadlines depend on the listing, seller response and eBay case status.",
    replacement: "Contact the seller from the order when an item is wrong, damaged or incomplete. If it is not resolved, use the return or eBay Money Back Guarantee route offered for that purchase.",
    deliveryTracking: "Check the order's delivery details in Purchase history. If the estimated delivery date has passed, open an Item Not Received request from the order and follow the response deadline shown by eBay.",
    complaintSteps: ["Sign in and open Purchase history.", "Select the affected transaction and the matching help route.", "Message the seller or open the available request with evidence.", "Use eBay's case flow before the deadline shown on the request."],
    escalation: "Use the existing order request or case in eBay Help. Keep communication on eBay and provide the order number, tracking and evidence already submitted.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "Contact eBay", url: "https://www.ebay.com/help/-/contact-ebay/contact-ebay?id=4379" }, { label: "eBay returns and refunds", url: "https://www.ebay.com/help/returns-refunds" }, { label: "Item not received", url: "https://www.ebay.com/help/buying/returns-refunds/item-not-received?id=4042" }],
    commonIssues: ["Item not received", "Return request", "Refund status", "Seller not responding", "Account access"],
    faqs: [{ question: "Does eBay publish one general customer-service phone number here?", answer: "No static general number is listed on this page because eBay routes contact through its signed-in, issue-specific Contact eBay flow." }, { question: "How do I report an eBay item not received?", answer: "Open Purchase history, select the order and use the Item Not Received request after the estimated delivery date has passed." }, { question: "How do I escalate an unresolved eBay purchase?", answer: "Open the existing request or case and use the escalation option offered by eBay before the displayed deadline." }]
  },
  {
    slug: "fedex", name: "FedEx", country: "us", category: "courier-delivery", logoText: "FDX",
    aliases: ["FedEx customer service", "FedEx tracking support", "FedEx claim"], regions: ["United States"], supportTypes: ["phone", "tracking", "delivery", "claims", "virtual support"],
    summary: "Official FedEx US help for shipment tracking, delivery exceptions, packages marked delivered, missing shipments and claims.",
    officialWebsite: "https://www.fedex.com/en-us/home.html", supportWebsite: "https://www.fedex.com/en-us/customer-support.html", helpCenter: "https://www.fedex.com/en-us/customer-support.html", phone: "1-800-463-3339",
    deliveryTracking: "Track the shipment on FedEx.com. If it says delivered but is missing, follow FedEx's delivered-package checks and use the official support or claims route with the tracking number.",
    complaintSteps: ["Check the latest tracking details and delivery photo or notes when available.", "Use FedEx Customer Support for the specific shipment issue.", "If loss or damage may qualify, use the official claims route.", "Keep the tracking number, case or claim number and evidence."],
    escalation: "Follow up through FedEx Customer Support using the tracking and existing case or claim number. Claims have shipment-specific eligibility and documentation requirements.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "FedEx Customer Support", url: "https://www.fedex.com/en-us/customer-support.html" }, { label: "Contact FedEx", url: "https://www.fedex.com/en-us/customer-support/contact.html" }, { label: "Delivered but missing package", url: "https://www.fedex.com/en-us/customer-support/faqs/receiving/tracking-questions/fedex-says-delivered-but-no-package.html" }, { label: "FedEx claims", url: "https://www.fedex.com/en-us/customer-support/claims.html" }],
    commonIssues: ["Tracking not updating", "Package marked delivered but missing", "Delayed shipment", "Lost or damaged package", "File a claim"],
    faqs: [{ question: "What is the official FedEx US customer-service number?", answer: "FedEx's official US contact page lists 1-800-463-3339 for general customer support." }, { question: "What should I do if FedEx says delivered but no package arrived?", answer: "Follow FedEx's official delivered-package checks, then contact support with the tracking number if it remains missing." }, { question: "Where do I file a FedEx claim?", answer: "Use the official FedEx claims page and follow the shipment-specific eligibility and evidence requirements." }]
  },
  {
    slug: "ups", name: "UPS", country: "us", category: "courier-delivery", logoText: "UPS",
    aliases: ["UPS customer service", "UPS tracking support", "UPS claim"], regions: ["United States"], supportTypes: ["phone", "tracking", "delivery", "claims"],
    summary: "Official UPS US support for tracking, delivery changes, missing or damaged packages and shipment claims.",
    officialWebsite: "https://www.ups.com/us/en/home", supportWebsite: "https://www.ups.com/us/en/support/contact-us", helpCenter: "https://www.ups.com/us/en/support", phone: "1-800-742-5877",
    deliveryTracking: "Use UPS tracking for the latest scan and delivery details. For a missing or damaged shipment, follow the official support and claim route available for the tracking number.",
    complaintSteps: ["Check UPS tracking and delivery details.", "Use the issue-specific option on UPS Support or Contact Us.", "Start a claim when the shipment and requester are eligible.", "Save the tracking, support and claim references."],
    escalation: "Follow up through UPS Contact Us with the tracking number and any existing claim reference. Some claims must be started by the shipper, so follow the eligibility shown in the official flow.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "UPS Contact Us", url: "https://www.ups.com/us/en/support/contact-us" }, { label: "File a UPS claim", url: "https://www.ups.com/us/en/support/file-a-claim" }],
    commonIssues: ["Tracking not updating", "Package marked delivered but missing", "Delivery change", "Lost package", "Damaged shipment claim"],
    faqs: [{ question: "What is the official UPS US customer-service number?", answer: "UPS's official US Contact Us page lists 1-800-742-5877." }, { question: "How do I report a missing UPS package?", answer: "Check tracking first, then use UPS Support or the official claim route when the shipment is eligible." }, { question: "Who can file a UPS claim?", answer: "Eligibility depends on the shipment and account relationship. Follow the official claim flow; in some cases the shipper must start the claim." }]
  },
  {
    slug: "dhl-express", name: "DHL Express", country: "us", category: "courier-delivery", logoText: "DHL",
    aliases: ["DHL customer service", "DHL Express tracking", "DHL support"], regions: ["United States"], supportTypes: ["phone", "chat", "WhatsApp", "tracking", "delivery"],
    summary: "Official DHL Express US help for international express tracking, delivery questions, shipment support, returns and contact options.",
    officialWebsite: "https://www.dhl.com/us-en/home.html", supportWebsite: "https://www.dhl.com/us-en/home/express/help-and-support/contact-dhl-express.html", helpCenter: "https://www.dhl.com/us-en/home/express/help-and-support.html", phone: "1-800-225-5345", whatsapp: "+1-480-418-5011", liveChat: "https://www.dhl.com/us-en/home/express/help-and-support/contact-dhl-express.html",
    deliveryTracking: "Track the shipment through DHL Express and use the official contact route for a delivery exception or missing update. Keep the waybill number ready.",
    complaintSteps: ["Check tracking with the DHL Express waybill number.", "Use the official phone, chat or WhatsApp option published for the US.", "Describe the latest scan, delivery issue and requested action.", "Save the case reference and follow up through the same official channel."],
    escalation: "Reconnect through DHL Express contact support with the waybill and prior case reference. Shipment investigations and claims depend on the sender, service and shipment documents.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "Contact DHL Express US", url: "https://www.dhl.com/us-en/home/express/help-and-support/contact-dhl-express.html" }, { label: "DHL Express shipping FAQ", url: "https://www.dhl.com/us-en/home/ship/shipping-faq.html" }, { label: "DHL sending and returns FAQ", url: "https://www.dhl.com/us-en/home/express/help-and-support/frequently-asked-questions/sending-and-returns.html" }],
    commonIssues: ["Tracking not updating", "International delivery delay", "Delivery exception", "Change delivery", "Return shipment"],
    faqs: [{ question: "What is the official DHL Express US phone number?", answer: "DHL's official US contact page lists 1-800-225-5345 for DHL Express support." }, { question: "Does DHL Express US offer WhatsApp support?", answer: "The official DHL Express US contact page publishes WhatsApp support at +1-480-418-5011." }, { question: "What do I need before contacting DHL?", answer: "Keep the DHL Express waybill number, latest tracking status and a clear description of the requested action ready." }]
  },
  {
    slug: "airbnb", name: "Airbnb", country: "us", category: "travel", logoText: "ABNB",
    aliases: ["Airbnb customer service", "Airbnb refund", "Airbnb support"], regions: ["United States"], supportTypes: ["phone", "message", "reservations", "refunds", "Resolution Center"],
    summary: "Official Airbnb US help for reservations, cancellations, refunds, host or guest communication, safety concerns and Resolution Center requests.",
    officialWebsite: "https://www.airbnb.com/", supportWebsite: "https://www.airbnb.com/help/article/1542", helpCenter: "https://www.airbnb.com/help", phone: "+1-415-800-5959", liveChat: "https://www.airbnb.com/help/article/1542",
    refundCancellation: "Open the reservation to review the applicable cancellation terms and refund status. Eligibility depends on the reservation, cancellation policy and documented issue; use Airbnb's official support or Resolution Center route.",
    billingPayment: "Review the reservation receipt and transaction in your Airbnb account. Use the reservation-specific support flow for duplicate charges, payment problems or refund status.",
    complaintSteps: ["Open the affected reservation in the Airbnb account.", "Message the host or guest in Airbnb when appropriate and keep the record on-platform.", "Use Contact Airbnb Support or the Resolution Center for the matching issue.", "Save the support case and upload evidence only through official Airbnb channels."],
    escalation: "Return to the existing Airbnb support case with the reservation code, prior messages and requested resolution. For urgent safety issues, use the urgent support option shown by Airbnb.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "Contact Airbnb Support", url: "https://www.airbnb.com/help/article/1542" }, { label: "Airbnb Resolution Center", url: "https://www.airbnb.com/help/article/248" }, { label: "Airbnb refund timing", url: "https://www.airbnb.com/help/article/311" }, { label: "Airbnb cancellation policy help", url: "https://www.airbnb.com/help/article/544" }],
    commonIssues: ["Reservation cancellation", "Refund not received", "Host not responding", "Payment issue", "Property or safety concern"],
    faqs: [{ question: "How do I contact Airbnb customer service?", answer: "Use Contact Airbnb Support from the official Help Center. Airbnb also lists +1-415-800-5959 in its official contact article." }, { question: "Where can I request money through Airbnb?", answer: "Use Airbnb's Resolution Center for eligible reservation-related money requests and keep communication on the platform." }, { question: "How do I check an Airbnb refund?", answer: "Open the reservation and review the refund details. Airbnb's official refund-timing article explains that timing varies by payment method." }]
  },
  {
    slug: "booking-com", name: "Booking.com", country: "us", category: "travel", logoText: "BKG",
    aliases: ["Booking.com customer service", "Booking.com refund", "Booking support"], regions: ["United States"], supportTypes: ["message", "booking-specific phone", "cancellation", "refunds", "property support"],
    summary: "Official Booking.com help for reservations, cancellations, refunds, property communication, payment questions and booking-specific support.",
    officialWebsite: "https://www.booking.com/", supportWebsite: "https://www.booking.com/customer-service.html", helpCenter: "https://www.booking.com/customer-service.html",
    refundCancellation: "Open the booking confirmation or Booking.com account to review the reservation's cancellation and refund terms. Fees and eligibility depend on the property's policy and booking conditions.",
    billingPayment: "Use the affected reservation and official Customer Service route for payment or refund questions. Keep the booking number and PIN private and share them only through Booking.com's official flow.",
    complaintSteps: ["Open the reservation in the Booking.com account or confirmation.", "Contact the property through Booking.com when the issue concerns the stay or property.", "Use Booking.com Customer Service for unresolved reservation, payment or refund issues.", "Save messages and the case reference without posting the booking PIN publicly."],
    escalation: "Continue through the existing Booking.com reservation and support case. Provide the booking number through the secure official flow, prior messages and the specific resolution requested.",
    verifiedAt: "2026-11-01", verificationStatus: "Verified",
    sourceLinks: [{ label: "Booking.com Customer Service", url: "https://www.booking.com/customer-service.html" }, { label: "Booking.com terms", url: "https://www.booking.com/content/terms.en-gb.html" }],
    commonIssues: ["Cancel a booking", "Refund not received", "Property not responding", "Payment question", "Booking confirmation issue"],
    faqs: [{ question: "Does Booking.com use one public phone number for every reservation?", answer: "Booking.com routes support through the reservation and Customer Service page, where booking-specific local or international call options may be shown." }, { question: "How do I cancel a Booking.com reservation?", answer: "Open the booking confirmation or account and use the cancellation option shown for that reservation. The property's terms determine fees and eligibility." }, { question: "How do I follow up on a Booking.com refund?", answer: "Use the affected reservation and official Customer Service route with the existing case details; timing depends on the reservation and payment flow." }]
  }
];

export const globalCompanies: GlobalCompany[] = [...baseCompanies, ...priorityCompanies, ...globalSeoExpansionCompanies];

export const publishedCountryCodes = [...new Set(globalCompanies.map((company) => company.country))];
export const publishedCountries = publishedCountryCodes
  .map((code) => countryByCode.get(code))
  .filter((country): country is NonNullable<typeof country> => Boolean(country))
  .sort((a, b) => Number(b.primary) - Number(a.primary) || a.name.localeCompare(b.name));

export const getCountry = (code: string) => countryByCode.get(code.toLowerCase());
export const getGlobalCompany = (country: string, slug: string) => globalCompanies.find((item) => item.country === country && item.slug === slug);
export const companiesForCountry = (country: string) => globalCompanies.filter((item) => item.country === country);
