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
  category: "contact" | "complaint" | "email" | "refund" | "cancellation" | "delivery" | "warranty" | "billing" | "escalation";
  readTime: string;
  updatedAt: string;
  keywords: string[];
  sections: { heading: string; body: string; bullets?: string[] }[];
  officialSources?: Array<{ label: string; url: string; note: string }>;
  example?: string;
  faqs: Array<[string, string]>;
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
    slug: "how-to-contact-customer-support", title: "How to Contact Customer Support", category: "contact", readTime: "6 min", updatedAt: "2026-10-29",
    description: "Find the right official customer service contact and prepare the information needed for a useful response.",
    keywords: ["how to contact customer support", "customer service contact", "company customer support"],
    sections: [
      { heading: "Find the official support channel", body: "Start on the company’s official website or signed-in app. Use its Contact, Help or Support section instead of numbers copied from comments, forums or advertisements." },
      { heading: "Choose the channel that matches the issue", body: "Order-linked chat is often best for a purchase, while a formal complaint form is better for an unresolved case. Use emergency or fraud channels only for the purpose stated by the company." },
      { heading: "Prepare a concise summary", body: "Give support enough information to locate the case without exposing credentials.", bullets: ["Order, booking or masked account reference", "Date, amount and affected product or service", "What happened and what you already tried", "The specific resolution you want"] },
      { heading: "Keep a record", body: "Save the case number, transcript, promised response time and any follow-up date. This record makes later escalation clearer." }
    ],
    example: "Example: Order 1234 was due on 20 October but has not arrived. Tracking has not changed since 18 October. Please confirm the parcel status or the available refund process.",
    faqs: [["What is the safest way to find customer support?", "Use the company’s official website or app and verify the domain before entering personal information."], ["Should I share an OTP with support?", "No. Never share an OTP, PIN, CVV or password with anyone claiming to provide support."]]
  },
  {
    slug: "how-to-file-a-customer-complaint", title: "How to File a Complaint Against a Company", category: "complaint", readTime: "7 min", updatedAt: "2026-10-29",
    description: "Use an evidence-first process to file a company complaint, request a clear remedy and escalate when appropriate.",
    keywords: ["how to file a complaint against a company", "customer complaint help", "complaint resolution"],
    sections: [
      { heading: "Define the problem and remedy", body: "Write one sentence explaining what went wrong and one sentence stating the remedy you want, such as delivery, repair, correction, cancellation or an eligible refund." },
      { heading: "Collect evidence", body: "A complete complaint is easier to review.", bullets: ["Receipt, invoice or contract", "Order, account or transaction reference", "Screenshots, photographs or correspondence", "Dates and previous complaint numbers"] },
      { heading: "Submit through the official complaints route", body: "Use the company’s published complaint or grievance channel. Avoid posting sensitive details publicly and keep the acknowledgement." },
      { heading: "Escalate by country and sector", body: "Complete the company’s process before approaching an applicable regulator, ombudsman or consumer body. Rules differ by country and sector; use an official government source." }
    ],
    example: "Example: I reported the billing error under case 5678 on 12 October. The duplicate charge remains. Please reverse the duplicate amount and confirm the correction in writing.",
    faqs: [["How long should a complaint be?", "Keep it focused: the facts, evidence, previous case number and requested resolution are more useful than a long narrative."], ["Can ResolveNexa file the complaint for me?", "No. The tools help you prepare text, but you submit it to the company’s official channel."]]
  },
  {
    slug: "how-to-write-professional-complaint-email", title: "How to Write a Professional Complaint Email", category: "email", readTime: "7 min", updatedAt: "2026-11-01",
    description: "Write a clear complaint email with a useful subject line, evidence, requested outcome and follow-up deadline.",
    keywords: ["how to write a complaint email", "professional complaint email", "customer service email"],
    sections: [
      { heading: "Use a searchable subject line", body: "Include the issue and reference, for example: Refund pending — order 1234. This helps the message reach the correct case." },
      { heading: "Open with the essential facts", body: "State the purchase or service, date and problem in the first paragraph. Keep emotion separate from the facts." },
      { heading: "List evidence and previous contact", body: "Mention attachments and earlier case numbers. Do not attach identity documents or full financial details unless the verified official process specifically requires them." },
      { heading: "Ask for one clear outcome", body: "Request a realistic remedy and written confirmation. Add a reasonable follow-up date without making unsupported legal threats." },
      { heading: "Write an escalation email when the first case is unresolved", body: "Use a subject such as Escalation request — case 1234. Summarise the original complaint, dates, promised action and the remedy still required. Send it only to an escalation address or form published by the company, and keep the original case reference in the thread." },
      { heading: "Keep a submission record", body: "Save the sent message, attachments and confirmation screen. If the company provides a case number, use that same reference for follow-ups instead of opening duplicate cases." }
    ],
    officialSources: [{ label: "US FTC sample customer complaint letter", url: "https://consumer.ftc.gov/articles/sample-customer-complaint-letter", note: "A US government example of the facts, requested resolution and records that make a complaint easier to review. Requirements differ by country." }],
    example: "Subject: Refund pending — order 1234. I received confirmation on 10 October that a refund was initiated, but it has not reached the original payment method. Please confirm the refund reference and expected completion date.",
    faqs: [["Should a complaint email be firm or polite?", "Be calm and specific. A firm request can still be professional and evidence-based."], ["What should I avoid attaching?", "Do not send passwords, OTPs, full card numbers or unnecessary identity documents."]]
  },
  {
    slug: "how-to-request-a-refund", title: "How to Request a Refund", category: "refund", readTime: "6 min", updatedAt: "2026-10-29",
    description: "Check eligibility, document the transaction and send a clear refund request through the official company channel.",
    keywords: ["how to request a refund", "refund complaint", "return request rejected"],
    sections: [
      { heading: "Check the applicable refund policy", body: "Review the policy for the product, service, fare or subscription and note any deadline, return requirement or fee." },
      { heading: "Use the original order or account", body: "Start the request from the signed-in purchase record where possible so the company can verify the transaction." },
      { heading: "State the reason and requested amount", body: "Include the order reference, date, amount, reason and preferred remedy supported by the policy." },
      { heading: "Respond to a rejected return request", body: "Ask for the exact policy reason and the evidence used to reject the request. Compare it with the policy that applied on the purchase date, provide missing proof, and use the company’s official appeal or complaint route if the decision appears inconsistent." },
      { heading: "Track the refund", body: "Save the confirmation and expected timeline. If marked processed, request the refund reference and check the original payment method without sharing full banking details." }
    ],
    example: "Example: Please refund the eligible amount for order 1234 to the original payment method. The return was accepted on 14 October under return reference R-55.",
    faqs: [["Where should a refund normally be sent?", "It commonly returns to the original payment method, but the official policy and payment arrangement control the process."], ["What if a processed refund is missing?", "Ask the merchant for the refund reference, then contact the payment provider through its verified official channel."]]
  },
  {
    slug: "how-to-cancel-an-online-order", title: "How to Cancel an Online Order", category: "cancellation", readTime: "5 min", updatedAt: "2026-10-29",
    description: "Check cancellation eligibility, cancel through the official order page and save confirmation of any refund.",
    keywords: ["how to cancel an online order", "order cancellation guide", "cancel purchase"],
    sections: [
      { heading: "Check fulfilment status", body: "Cancellation may depend on whether the seller has accepted, packed or shipped the order. Open the official order page for the current options." },
      { heading: "Review fees and exceptions", body: "Personalised, perishable, digital or time-sensitive products may follow different rules. Read the policy that applied when you bought the item." },
      { heading: "Cancel inside the account", body: "Use the company’s app or website so the request produces a timestamp and cancellation reference." },
      { heading: "Confirm future charges and refund", body: "Save the cancellation status, refund amount and expected return method. For subscriptions, separately confirm that renewal is disabled." }
    ],
    example: "Example: I cancelled order 1234 before dispatch and received cancellation reference C-88. Please confirm the refund amount and expected completion date.",
    faqs: [["Can an order always be cancelled before delivery?", "No. Eligibility depends on the seller, item and fulfilment stage shown in the official order flow."], ["Is cancelling a subscription the same as requesting a refund?", "No. Stopping renewal and requesting a refund are often separate actions."]]
  },
  {
    slug: "how-to-escalate-customer-complaint", title: "How to Escalate a Customer Complaint", category: "escalation", readTime: "7 min", updatedAt: "2026-10-29",
    description: "Escalate an unresolved customer complaint with a case history, clear remedy and the correct country or industry route.",
    keywords: ["how to escalate a customer complaint", "complaint escalation", "formal complaint escalation"],
    sections: [
      { heading: "Complete first-line support", body: "Give the company a fair opportunity to resolve the issue and keep the original case number and response." },
      { heading: "Use the formal grievance route", body: "Look for complaints, grievance, escalation or appeals on the official website. Include the earlier case number so the history is visible." },
      { heading: "Create a short case timeline", body: "List the important dates, promises, responses and evidence. Avoid resending unrelated material." },
      { heading: "Identify external escalation carefully", body: "The correct regulator, ombudsman or consumer body depends on country and sector. Use an official government or scheme website and check eligibility before filing." }
    ],
    example: "Example: Case 5678 was opened on 1 October and followed up on 8 and 15 October. The issue remains unresolved. I request a written review and the remedy described below.",
    faqs: [["When should I escalate a complaint?", "Escalate when the published response period has passed or the first response does not address the documented issue."], ["Should I threaten legal action?", "Avoid unsupported threats. State the facts and use the applicable official escalation process."]]
  },
  {
    slug: "complain-about-delayed-delivery", title: "How to Complain About a Delayed Delivery", category: "delivery", readTime: "6 min", updatedAt: "2026-10-29",
    description: "Check tracking, identify the responsible seller or carrier, and request a clear resolution for a delayed delivery.",
    keywords: ["how to complain about a delayed delivery", "delivery complaint", "missing parcel help"],
    sections: [
      { heading: "Check tracking and service alerts", body: "Use the carrier’s official tracking page and note the last scan, delivery estimate and any weather or service notice." },
      { heading: "Contact the correct party", body: "For many retail purchases, the seller remains the best first contact. For a parcel you sent, use the carrier’s claims or missing-item route." },
      { heading: "Provide delivery evidence", body: "Include the order and tracking references, promised date, delivery address confirmation without publishing it, and any safe-place or access detail." },
      { heading: "Request a specific resolution", body: "Ask for an updated delivery date, trace, replacement or eligible refund based on the seller or carrier policy." }
    ],
    example: "Example: Tracking 1234 has shown the same depot scan since 18 October, and the promised date was 20 October. Please start a trace and confirm the next step.",
    faqs: [["Who should I contact for a delayed retail order?", "Start with the seller’s official order support unless its policy directs you to the carrier."], ["What if tracking says delivered but nothing arrived?", "Check the carrier’s official delivered-but-missing steps, household members and approved safe places before reporting it."]]
  },
  {
    slug: "request-warranty-replacement", title: "How to Request a Warranty Replacement", category: "warranty", readTime: "7 min", updatedAt: "2026-10-29",
    description: "Prepare proof of purchase, product details and fault evidence for an official warranty repair or replacement request.",
    keywords: ["how to request a warranty replacement", "warranty complaint", "product replacement request"],
    sections: [
      { heading: "Check the warranty terms", body: "Confirm the warranty period, covered faults, exclusions and whether the seller or manufacturer handles the request." },
      { heading: "Record product and purchase details", body: "Prepare the model, serial number, purchase date, invoice and a concise description of the fault." },
      { heading: "Follow official diagnostics", body: "Complete safe troubleshooting requested by the manufacturer and record error codes or service outcomes." },
      { heading: "Separate warranty and non-warranty replacements", body: "A damaged, incorrect or unwanted delivery may follow the seller’s return policy instead of the manufacturer warranty. Use the warranty route only for covered product faults; otherwise open the relevant return, delivery or order-support process." },
      { heading: "Request the available remedy", body: "Ask for repair, replacement or another remedy supported by the warranty and applicable consumer rules. Keep shipment and service references." }
    ],
    example: "Example: Product model X, serial ending 4321, purchased on 2 May, has stopped powering on after official troubleshooting. Please confirm the warranty service or replacement process.",
    faqs: [["Is an invoice always needed?", "Proof-of-purchase requirements vary; check the official warranty terms and prepare the best available purchase record."], ["Should I send the product to an address found in a comment?", "No. Use only an address or service route published by the official manufacturer or seller."]]
  },
  {
    slug: "resolve-billing-dispute", title: "How to Resolve a Billing Dispute", category: "billing", readTime: "7 min", updatedAt: "2026-10-29",
    description: "Document an incorrect charge, contact the biller and use the appropriate bank or service complaint route without exposing credentials.",
    keywords: ["billing dispute", "how to resolve a billing issue", "billing dispute help", "incorrect charge complaint"],
    sections: [
      { heading: "Identify the disputed charge", body: "Record the date, amount, merchant or service, invoice line and why it appears incorrect." },
      { heading: "Check for a simple explanation", body: "Review credits, taxes, renewal terms, partial refunds, pending authorisations and household purchases before raising a dispute." },
      { heading: "Identify the card transaction type", body: "Separate a pending authorisation, reversed payment, duplicate charge, incorrect amount and unrecognised transaction. Each can require a different merchant or bank workflow; use the authenticated fraud route immediately for a transaction you do not recognise." },
      { heading: "Contact the biller in writing", body: "Use the official billing-support channel, attach the relevant statement section with sensitive numbers masked, and request a correction." },
      { heading: "Use the payment-provider route when appropriate", body: "If the biller does not resolve an eligible card or account dispute, contact the bank through its official channel and follow its deadlines. Rules differ by country and payment type." }
    ],
    example: "Example: Invoice 1234 includes a duplicate charge of 49.00 dated 15 October. Please remove the duplicate and issue a corrected invoice.",
    faqs: [["Should I publish a bank statement with my complaint?", "No. Share only what the verified official process requires and mask account or card numbers."], ["Is a pending card authorisation always a completed charge?", "No. Check the transaction status and ask the bank through its official channel when uncertain."]]
  },
  {
    slug: "customer-support-not-responding", title: "What to Do When Customer Support Does Not Respond", category: "escalation", readTime: "6 min", updatedAt: "2026-10-29",
    description: "Follow up an unanswered support case, document the timeline and move to the company’s formal escalation route.",
    keywords: ["customer support not responding", "unanswered complaint", "follow up customer service"],
    sections: [
      { heading: "Check the stated response time", body: "Confirm whether the company gave a service level or expected reply date and allow for weekends or required verification." },
      { heading: "Send one useful follow-up", body: "Reply in the same case thread with the reference, original date, unresolved issue and requested next action." },
      { heading: "Try a second official channel", body: "If the first channel is unavailable, use another contact method published by the company while quoting the original reference." },
      { heading: "Escalate with the full timeline", body: "Use the formal grievance or appeals route and list each contact date. If external escalation becomes appropriate, use an official country and sector source." }
    ],
    example: "Example: I am following up on case 5678 opened on 1 October. The stated response period has passed. Please confirm ownership of the case and the expected resolution date.",
    faqs: [["Should I open many duplicate tickets?", "Usually no. Duplicate tickets can fragment the history; follow up the original case unless the channel instructs otherwise."], ["Can I use the free follow-up tool?", "Yes. It creates editable text in your browser without requiring payment or login."]]
  },
  {
    slug: "refund-not-received", title: "Refund Not Received: What to Do", category: "refund", readTime: "8 min", updatedAt: "2026-11-01",
    description: "Trace a missing refund with the merchant, refund reference and original payment provider without exposing sensitive account details.",
    keywords: ["refund not received", "refund pending", "refund status help", "processed refund missing"],
    sections: [
      { heading: "Confirm the merchant's refund status", body: "Open the original order or account and confirm whether the refund is requested, approved or processed. Save the date, amount and reference shown." },
      { heading: "Check the original payment method", body: "Refunds normally follow the original payment route unless the official policy says otherwise. Check the correct card, bank account, wallet or store balance." },
      { heading: "Request the refund reference", body: "If the merchant says the refund was processed, ask for the trace, retrieval or refund reference that the payment provider can use. Do not share an OTP, PIN or full card number." },
      { heading: "Build a short refund timeline", body: "Record the purchase date, cancellation or return date, refund approval date, promised timeline, amount and every case reference. This separates a delayed merchant action from a payment-provider posting delay." },
      { heading: "Escalate through verified channels", body: "Follow up with the merchant case first. If the refund remains missing, contact the original payment provider through its authenticated app, website or number printed on the card. Use a regulator or consumer body only when its official eligibility rules cover the issue." }
    ],
    officialSources: [
      { label: "US FTC: returns, refunds and other resolutions", url: "https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions", note: "US consumer guidance on checking policies, keeping documents and asking the business for a clear resolution." },
      { label: "GOV.UK: accepting returns and giving refunds", url: "https://www.gov.uk/accepting-returns-and-giving-refunds", note: "UK-specific statutory guidance. Do not apply its deadlines to purchases governed by another country." }
    ],
    example: "Example: Refund R-123 for order O-456 was marked processed on 18 October, but it is not visible on the original payment method. Please provide the refund trace reference and confirm the amount.",
    faqs: [["How long should a refund take?", "There is no universal period. Use the timeline shown by the merchant and payment provider for that transaction."], ["What if the merchant says the refund is complete?", "Ask for the official refund or trace reference, then contact the original payment provider through its verified channel."]]
  },
  {
    slug: "package-delivered-not-received", title: "Package Says Delivered but Not Received", category: "delivery", readTime: "7 min", updatedAt: "2026-10-30",
    description: "Check delivery evidence, safe locations and household receipt before opening a missing-package case with the seller or carrier.",
    keywords: ["package says delivered but not received", "delivered package missing", "missing package support", "order not received"],
    sections: [
      { heading: "Review the official tracking record", body: "Check the delivery time, location note, photo or signature in the seller or carrier's official tracking page." },
      { heading: "Check likely receipt locations", body: "Check approved safe places, reception, parcel lockers and household members without publishing your address or access details." },
      { heading: "Contact the responsible party", body: "For a retail order, start with the seller's order-support flow unless its policy directs you to the carrier. A sender may need to open the carrier claim." },
      { heading: "Document the missing-package report", body: "Provide the order and tracking references, promised and recorded delivery times, and the resolution requested. Keep the case number." }
    ],
    example: "Example: Tracking T-123 shows delivered at 14:20, but the parcel is not at the approved location and no household member received it. Please open a delivery investigation.",
    faqs: [["Should I contact the seller or carrier first?", "For a retail purchase, the seller is often the best first contact unless the official order page says otherwise."], ["Should I post my delivery address publicly?", "No. Share address details only inside the verified official support process when required."]]
  },
  {
    slug: "tracking-number-not-working", title: "Tracking Number Not Working", category: "delivery", readTime: "6 min", updatedAt: "2026-10-30",
    description: "Check the carrier, format and first scan before reporting an invalid or inactive parcel tracking number.",
    keywords: ["tracking number not working", "invalid tracking number", "tracking not updating", "parcel tracking help"],
    sections: [
      { heading: "Confirm the carrier and number", body: "Copy the tracking number from the official order or dispatch notice and open the carrier website linked by the seller." },
      { heading: "Allow for the first carrier scan", body: "A label can be created before the parcel is physically accepted. Check the seller's dispatch status and any stated activation period." },
      { heading: "Check for a replacement tracking number", body: "International hand-offs, returns or re-shipments can create a new reference. Review the signed-in order and official messages." },
      { heading: "Report persistent tracking failure", body: "Contact the seller or carrier with the order, tracking reference and dispatch date. Ask whether the parcel was handed over and request a trace when appropriate." }
    ],
    example: "Example: Tracking T-123 has shown no valid result since the dispatch notice on 18 October. Please confirm the carrier, hand-over date and correct active tracking reference.",
    faqs: [["Does a tracking number work immediately?", "Not always. A label may exist before the carrier records its first physical scan."], ["Can I use a third-party tracking website?", "Use the carrier or seller's official tracking link first to reduce phishing and incorrect-status risk."]]
  },
  {
    slug: "payment-failed-money-deducted", title: "Payment Failed but Money Was Deducted", category: "billing", readTime: "8 min", updatedAt: "2026-10-30",
    description: "Document a failed payment debit, check the transaction status and raise the issue safely with the merchant and payment provider.",
    keywords: ["payment failed but money deducted", "failed transaction money debited", "payment pending", "card transaction issue"],
    sections: [
      { heading: "Check whether the payment is pending or completed", body: "Review the merchant order and authenticated bank, card or wallet transaction. A pending authorization is not always a completed charge." },
      { heading: "Record both transaction references", body: "Save the merchant order reference and the payment-provider transaction reference, plus the date and amount. Mask account and card numbers in evidence." },
      { heading: "Raise the issue in the correct order", body: "Ask the merchant whether an order was created. If no order exists or the merchant cannot resolve the debit, use the payment provider's official dispute or failed-transaction route." },
      { heading: "Escalate with the original case", body: "Keep every ticket number and follow the provider's published grievance process. Country, payment rail and provider rules determine any external escalation route." }
    ],
    example: "Example: Payment P-123 for 49.00 was debited on 18 October, but order O-456 is marked failed. Please confirm whether the payment was captured and provide the reversal or dispute reference.",
    faqs: [["Should I make the payment again immediately?", "First confirm whether the original debit is pending or completed and whether an order was created to avoid a possible duplicate charge."], ["What details are safe to share?", "Share transaction references, date and amount through an authenticated channel, but never an OTP, PIN, CVV or password."]]
  },
  {
    slug: "duplicate-charge", title: "How to Dispute a Duplicate Charge", category: "billing", readTime: "7 min", updatedAt: "2026-10-30",
    description: "Compare transaction states, contact the merchant and dispute a genuine duplicate charge through the official payment-provider route.",
    keywords: ["duplicate charge", "charged twice", "duplicate card transaction", "charged twice complaint"],
    sections: [
      { heading: "Compare the two transaction records", body: "Check dates, amounts, merchant names and whether one entry is only a pending authorization rather than a settled duplicate." },
      { heading: "Check the merchant account", body: "Confirm whether two orders, subscriptions or invoices were created. Cancel or refund the extra order through the merchant when possible." },
      { heading: "Request a correction in writing", body: "Use the merchant's official billing channel, identify both references and request reversal of the duplicate while keeping the valid transaction." },
      { heading: "Use the official dispute route", body: "If the merchant cannot correct a settled duplicate, contact the bank or payment provider through its authenticated dispute process and observe its evidence and deadline rules." }
    ],
    example: "Example: Transactions P-123 and P-124 show the same merchant and amount for one order. Please reverse the duplicate P-124 and confirm the correction in writing.",
    faqs: [["Is a pending authorization a duplicate charge?", "Not necessarily. Compare pending and settled status before opening a duplicate-charge dispute."], ["Should I dispute both transactions?", "Identify the valid purchase and dispute only the genuinely incorrect duplicate unless the provider instructs otherwise."]]
  },
  {
    slug: "account-locked-support", title: "Account Locked: Safe Recovery Steps", category: "contact", readTime: "7 min", updatedAt: "2026-10-30",
    description: "Recover a locked customer account through official identity and security channels without sharing passwords or one-time codes.",
    keywords: ["account locked", "customer account recovery", "cannot sign in", "account access issue"],
    sections: [
      { heading: "Use the official sign-in page", body: "Open the company website or app directly and use its password reset, unlock or account-recovery option. Avoid links sent by unknown contacts." },
      { heading: "Check security notifications", body: "Review official messages for suspicious access, verification requests or a reason for the lock. Do not approve a login you did not initiate." },
      { heading: "Use verified account support", body: "If self-service recovery fails, open the company's official help center and choose account access or security support. Never send a password or one-time code." },
      { heading: "Secure the account after recovery", body: "Change reused passwords, review contact methods and sessions, and enable the company's official multi-factor authentication option when available." }
    ],
    example: "Example: My account was locked after an unrecognized sign-in alert. The official recovery flow does not complete. Please open an account-access case and state the verification steps required.",
    faqs: [["Will support ask for my password or OTP?", "Legitimate support should not ask you to reveal a password, PIN or one-time code."], ["What if the recovery email is unfamiliar?", "Stop and use the official security or account-compromise route from the company's own website or app."]]
  }
];

export const siteIndex = [
  ...companies.map((item) => ({ type: "company" as const, slug: item.slug, title: item.name, description: item.summary, href: `/company/${item.slug}`, keywords: [item.category, ...item.commonIssues] })),
  ...guides.map((item) => ({ type: "guide" as const, slug: item.slug, title: item.title, description: item.description, href: `/guides/${item.slug}`, keywords: [item.category] }))
];

export const getCategory = (slug: string) => categories.find((item) => item.slug === slug);
export const getCompany = (slug: string) => companies.find((item) => item.slug === slug);
export const getGuide = (slug: string) => guides.find((item) => item.slug === slug);
