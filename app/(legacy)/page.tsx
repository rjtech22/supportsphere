import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Globe2, Mail, PackageCheck, ShieldCheck, Wrench } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { GlobalCompanyCard } from "@/components/GlobalCompanyCard";
import { AdSlot } from "@/components/AdSlot";
import { countries, globalCategories, globalCompanies } from "@/lib/global-data";
import { guides } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const problems = ["Refund not received", "Laptop warranty issue", "Courier parcel missing", "Bank transaction failed", "Customer support not responding"];
const faqs = [
  ["Is ResolveNexa a customer-care centre?", "No. ResolveNexa is an independent information publisher that links to official company support channels."],
  ["What does Verified mean?", "Verified means the displayed detail was checked against a cited official source on the shown review date."],
  ["Do the complaint tools upload my data?", "The template generators run locally in your browser. They do not require a paid API or ask for sensitive banking information."],
  ["Are sponsored listings official support?", "No. Sponsored and affiliate placements are clearly labelled and kept separate from official support information."]
];

export const metadata: Metadata = {
  title: { absolute: "Customer Support & Complaint Help | Find Company Support" },
  description: "Find company customer support information, complaint guides, refund help, and free complaint letter tools. Get help resolving customer service issues.",
  alternates: { canonical: "/" },
  openGraph: { title: "Customer Support & Complaint Help | Find Company Support", description: "Find official company support information, complaint guides, refund help and free complaint tools.", url: "/" },
  twitter: { card: "summary_large_image", title: "Customer Support & Complaint Help | Find Company Support", description: "Find official company support information, complaint guides, refund help and free complaint tools." }
};

export default function HomePage() {
  const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, potentialAction: { "@type": "SearchAction", target: `${siteConfig.url}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } };
  return <>
    <section className="hero"><div className="shell hero-grid"><div><span className="kicker"><Globe2 size={15} /> Global support resolution guide</span><h1>Find Customer Support and <em>Resolve Your Complaints</em></h1><p>Find the customer support information and resources you need to resolve issues with companies. Understand refund and cancellation processes, learn how to escalate complaints, and create professional complaint letters.</p><SearchBox /><div className="popular"><span>Try:</span>{problems.slice(0, 3).map((problem) => <Link href={`/search?q=${encodeURIComponent(problem)}`} key={problem}>{problem}</Link>)}</div></div><div className="hero-panel"><div className="hero-panel-head"><span>Supported countries</span><strong>5 markets</strong></div>{countries.map((country) => <Link className="country-row" href={`/${country.code}/`} key={country.code}><span className="country-code">{country.flag}</span><div><b>{country.name}</b><small>{globalCompanies.filter((item) => item.country === country.code).length} published companies</small></div><ArrowRight /></Link>)}<div className="safety-card"><ShieldCheck /><span><b>Official sources first</b><small>Verification status appears on every company page.</small></span></div></div></div></section>
    <section className="section soft"><div className="shell"><div className="section-head"><div><span className="eyebrow">Search for company support</span><h2>Browse verified company guides</h2><p className="section-note">Whether you are dealing with a billing issue, delayed delivery, warranty problem or poor customer service, start with the official support destination and a practical next step.</p></div><Link className="inline-link" href="/guides">Popular customer support guides <ArrowRight /></Link></div><div className="company-grid">{globalCompanies.slice(0, 6).map((company) => <GlobalCompanyCard company={company} key={`${company.country}-${company.slug}`} />)}</div></div></section>
    <section className="section"><div className="shell"><div className="section-head"><div><span className="eyebrow">Browse by category</span><h2>Find the right support path</h2></div></div><div className="category-grid">{globalCategories.map((category) => <Link className="category-card" href={`/us/categories/${category.slug}/`} key={category.slug}><span className="category-icon blue">{category.icon}</span><span><b>{category.name}</b><small>{category.description}</small></span><ArrowRight /></Link>)}</div></div></section>
    <section className="section soft"><div className="shell"><div className="section-head"><div><span className="eyebrow">Common customer problems</span><h2>Turn confusion into next steps</h2></div></div><div className="problem-grid">{problems.map((problem, index) => <Link href={`/search?q=${encodeURIComponent(problem)}`} className="problem-card" key={problem}><span>0{index + 1}</span><b>{problem}</b><ArrowRight /></Link>)}</div></div></section>
    <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP} />
    <section className="section"><div className="shell"><div className="section-head"><div><span className="eyebrow">Free complaint tools</span><h2>Write a clearer message in minutes</h2></div></div><div className="tool-grid"><Tool href="/en/tools/complaint-letter" icon={<FileText />} title="Complaint letter generator" text="Professional, polite or firm complaint letters."/><Tool href="/en/guides/refund-not-received" icon={<Mail />} title="Refund request help" text="Trace a pending refund and prepare a clear follow-up."/><Tool href="/en/guides/request-warranty-replacement" icon={<Wrench />} title="Warranty complaint help" text="Organise product, purchase and service details."/><Tool href="/en/guides/complain-about-delayed-delivery" icon={<PackageCheck />} title="Delivery delay help" text="Request tracking action or a delivery resolution."/></div></div></section>
    <section className="section soft"><div className="shell"><div className="section-head"><div><span className="eyebrow">Popular customer support guides</span><h2>Refund, cancellation and complaint help</h2></div><Link className="inline-link" href="/guides">View all guides <ArrowRight /></Link></div><div className="guide-grid">{guides.slice(0, 6).map((guide) => <article className="guide-card" key={guide.slug}><span className="guide-icon"><FileText /></span><div><span className="guide-label">{guide.category} · {guide.readTime}</span><h3><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p><Link className="inline-link" href={`/guides/${guide.slug}`}>Read guide <ArrowRight /></Link></div></article>)}</div></div></section>
    <section className="nch-band"><div className="shell"><div className="section-head"><div><span className="eyebrow light">Choose your country</span><h2>Support information changes by market.</h2><p>Open the correct country directory before using a phone number, email address or complaint procedure.</p></div></div><div className="country-grid">{countries.map((country) => <Link href={`/${country.code}/`} key={country.code}><span>{country.flag}</span><b>{country.name}</b><ArrowRight /></Link>)}</div></div></section>
    <section className="section"><div className="shell faq-wrap"><div><span className="eyebrow">Frequently asked</span><h2>Trust starts with clarity</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
  </>;
}

function Tool({ href, icon, title, text }: { href: string; icon: React.ReactNode; title: string; text: string }) { return <Link href={href} className="tool-card"><span>{icon}</span><h3>{title}</h3><p>{text}</p><b>Open free tool <ArrowRight size={15} /></b></Link>; }
