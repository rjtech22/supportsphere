import { Breadcrumbs } from "@/components/Breadcrumbs";

const pages = {
  about: { title: "About SupportSphere", description: "Why this independent global support guide exists and how information is verified.", sections: [
    ["Our purpose", "SupportSphere helps people find the correct official support destination and prepare a clear complaint. We are an independent information publisher, not a customer-care centre."],
    ["How listings are verified", "Listings are created from official company, government or regulator websites. Each verified listing displays a review date and links directly to the official source domain."],
    ["Editorial independence", "Advertisements, affiliate links and sponsored listings are labelled. Payment never changes which destination is presented as official support."]
  ] },
  contact: { title: "Contact", description: "Contact the SupportSphere editorial team or report incorrect information.", sections: [
    ["Editorial enquiries", "Before launch, replace hello@your-domain.com with an email address on your own domain. Do not send account passwords, OTPs, card numbers or identity documents."],
    ["Corrections", "Use the report button on a company page to identify an outdated or incorrect contact. Reports are stored only after Supabase is connected."],
    ["Company support", "We cannot access company accounts, orders or refunds. Use the official links on the relevant country-specific company page."]
  ] },
  privacy: { title: "Privacy Policy", description: "How SupportSphere handles analytics, reports and advertising data.", sections: [
    ["Information collected", "The site may collect standard server logs, page views, searches and click events. Correction reports may include details and an optional email address for editorial follow-up."],
    ["Analytics and advertising", "When configured, Google Analytics 4 measures usage and Google AdSense may use cookies or similar technologies. Add a consent platform where required for your visitors."],
    ["Data minimisation", "Never submit OTPs, passwords, payment credentials, full account numbers or sensitive identity documents."],
    ["Your choices", "Browser controls can block cookies or analytics. Contact the published domain email to request deletion of a submitted report."]
  ] },
  terms: { title: "Terms of Use", description: "Rules for using SupportSphere and its independent support guides.", sections: [
    ["Information service", "Content is general information. It does not create a customer-service relationship and is not legal, financial or professional advice."],
    ["Acceptable use", "Do not submit unlawful content, credentials, spam or malicious links. Automated activity that harms site availability is prohibited."],
    ["External links", "Official links lead to third-party websites governed by their own terms and privacy policies. Verify the destination domain before entering personal information."],
    ["Changes", "Support processes can change. A review date records the last check, not a permanent guarantee."]
  ] },
  disclaimer: { title: "Disclaimer & Safety", description: "Important independence, accuracy, security and monetization disclosures.", sections: [
    ["No company affiliation", "SupportSphere is independent and is not affiliated with, endorsed by or operated by listed companies unless explicitly stated."],
    ["Verification labels", "Verified means the displayed detail was checked against a cited official source on the shown date. Needs Review and Unverified information is never presented as verified."],
    ["Security warning", "No legitimate support guide needs your OTP, PIN, CVV or password. Never pay an unknown person to unlock a refund."],
    ["Commercial disclosure", "Advertisements, affiliate links and sponsored listings are clearly labelled. Preparation for ads does not mean an ad network has approved the site."]
  ] }
} as const;

export function StaticInfoPage({ page }: { page: keyof typeof pages }) { const item = pages[page]; return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: item.title }]} /><h1>{item.title}</h1><p>{item.description}</p></div></section><section className="section"><article className="shell prose-page">{item.sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}</article></section></>; }
export function staticInfoMetadata(page: keyof typeof pages) { return { title: pages[page].title, description: pages[page].description }; }
