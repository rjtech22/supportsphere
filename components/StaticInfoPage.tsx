import { Breadcrumbs } from "@/components/Breadcrumbs";

export const staticInfoPages = {
  about: { title: "About ResolveNexa", description: "Why this independent global support guide exists and how information is verified.", sections: [
    ["Our purpose", "ResolveNexa helps people find the correct official support destination and prepare a clear complaint. We are an independent information publisher, not a customer-care centre."],
    ["Editorial responsibility", "ResolveNexa selects topics, checks sources, writes guidance and decides corrections independently. Company inclusion, page order and verification labels are not sold to listed businesses."],
    ["How listings are verified", "Listings are created from official company, government or regulator websites. Each verified listing displays a review date and links directly to the official source domain."],
    ["What verified means", "Verified means the published contact or support detail was checked against the cited official source on the displayed date. Users should still open that source because company processes can change."],
    ["Corrections and rechecking", "ResolveNexa records source links and verification dates so outdated information can be reviewed. Readers can use the correction form on the Contact page or the report control on a company page. Submissions are checked against an official source before publication is changed."],
    ["Editorial independence", "Advertisements, affiliate links and sponsored listings are labelled and visually separated from support information. Payment never changes which destination is presented as official support."],
    ["Content updates", "High-use and time-sensitive company pages are prioritised for rechecking. A displayed review date records the latest completed source check; it is not a promise that a company will keep a channel or policy unchanged."]
  ] },
  contact: { title: "Contact", description: "Contact the ResolveNexa editorial team or report incorrect information.", sections: [
    ["Editorial enquiries", "Use the correction form below for source, accuracy, safety or editorial questions. ResolveNexa does not provide company customer service and cannot access an order or account."],
    ["Corrections", "Include the affected page URL, the detail that appears wrong and the current official source URL. Never include account credentials, order numbers, payment information or identity documents."],
    ["Company support", "ResolveNexa cannot access company accounts, orders, payments or refunds. Use the official links on the relevant country-specific company page."],
    ["Review reports", "Approved customer reviews can be reported through the report control shown with the review. That control is for review moderation, not company support or listing corrections."]
  ] },
  privacy: { title: "Privacy Policy", description: "How ResolveNexa handles analytics, reports and advertising data.", sections: [
    ["Analytics choices", "Google Analytics 4 is configured with analytics consent denied by default. The privacy control stores the visitor's optional-cookie choice in local browser storage and updates analytics and advertising consent when the visitor accepts or rejects."],
    ["Usage events", "When analytics consent is available, the site can measure page views, searches, guide and company views, complaint-tool use and clicks to official support links. These events are used to understand which information is useful."],
    ["Complaint letter generator", "The complaint draft is assembled in the browser from the text entered in the form. The current generator does not send the letter body to ResolveNexa; it records only a generator-use event when analytics is available."],
    ["Reviews and moderation", "A submitted company review is sent to the review API and stored for moderation. Pending or rejected reviews are not shown publicly. Review forms warn users not to submit contact details, account information, passwords or other personal data."],
    ["Advertising", "When enabled, advertisements are labelled and separated from official support links. Google AdSense may process device, cookie, consent and ad-interaction information under Google's own terms and privacy disclosures. Ad code remains disabled until the required publisher settings and consent configuration are complete."],
    ["Advertising consent", "Optional advertising storage, ad personalisation and ad-user-data consent are denied by default in the site consent signal. Personalised advertising for visitors in the EEA, the United Kingdom and Switzerland must also use a Google-certified consent management platform configured by the publisher."],
    ["Data minimisation", "Never submit OTPs, passwords, payment credentials, full account numbers or sensitive identity documents."],
    ["Correction and privacy requests", "Use the Contact page form and select the closest issue type. Do not place passwords, financial credentials, full account numbers or identity documents in a request."],
    ["Your choices", "Visitors can reject optional analytics and advertising through the privacy control. Browser storage and cookie controls can also remove a saved choice. The Privacy choices control in the footer reopens the preference banner."]
  ] },
  terms: { title: "Terms of Use", description: "Rules for using ResolveNexa and its independent support guides.", sections: [
    ["Information service", "Content is general information. It does not create a customer-service relationship and is not legal, financial or professional advice."],
    ["Acceptable use", "Do not submit unlawful content, credentials, spam or malicious links. Automated activity that harms site availability is prohibited."],
    ["User reviews", "Reviews must describe a genuine support experience and must not include personal information, abuse, impersonation, unlawful material or promotional spam. Submission does not guarantee publication; reviews are moderated first."],
    ["Complaint drafts", "The complaint generator provides editable wording based on user input. Users are responsible for checking facts, removing sensitive data and confirming the recipient and applicable company process before sending a draft."],
    ["External links", "Official links lead to third-party websites governed by their own terms and privacy policies. Verify the destination domain before entering personal information."],
    ["Accuracy and changes", "Support processes can change. A review date records the last check, not a permanent guarantee. ResolveNexa may correct, update or remove information when a cited source changes."],
    ["Commercial content", "Advertisements, affiliate links and sponsored placements are labelled and visually separated from official company support. Advertising does not purchase a verification label, ranking position or favourable editorial treatment."],
    ["Invalid advertising activity", "Visitors must not be asked or rewarded to click advertisements. Automated, repeated or incentivised ad interactions are prohibited and may be filtered or investigated by the advertising provider."]
  ] },
  disclaimer: { title: "Disclaimer & Safety", description: "Important independence, accuracy, security and monetization disclosures.", sections: [
    ["No company affiliation", "ResolveNexa is independent and is not affiliated with, endorsed by or operated by listed companies unless explicitly stated."],
    ["Verification labels", "Verified means the displayed detail was checked against a cited official source on the shown date. Needs Review and Unverified information is never presented as verified."],
    ["General guidance only", "Complaint, refund, warranty, banking and escalation content explains general preparation and routing. It is not legal, financial or professional advice and does not determine eligibility or a required outcome."],
    ["Third-party processes", "Companies, regulators and dispute-resolution bodies control their own websites, eligibility rules and decisions. ResolveNexa cannot submit a case, access an account, reverse a payment or guarantee a response."],
    ["Security warning", "No legitimate support guide needs your OTP, PIN, CVV or password. Never pay an unknown person to unlock a refund."],
    ["Commercial disclosure", "Advertisements, affiliate links and sponsored listings are clearly labelled and kept separate from official-support actions. Preparation for ads does not mean an ad network has approved the site."],
    ["Advertising independence", "Advertisers do not control ResolveNexa's verification status, source selection, complaint guidance or page order. ResolveNexa does not ask users to click advertisements to support the site."]
  ] }
} as const;

export function StaticInfoPage({ page }: { page: keyof typeof staticInfoPages }) { const item = staticInfoPages[page]; return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: item.title }]} /><h1>{item.title}</h1><p>{item.description}</p></div></section><section className="section"><article className="shell prose-page">{item.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</article></section></>; }
export function staticInfoMetadata(page: keyof typeof staticInfoPages) { return { title: staticInfoPages[page].title, description: staticInfoPages[page].description }; }
