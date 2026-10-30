import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, BadgeCheck, ExternalLink } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReportForm } from "@/components/ReportForm";
import { TrackedLink } from "@/components/TrackedLink";
import { companies, getCategory, getCompany } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() { return companies.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const company = getCompany((await params).slug);
  if (!company) return {};
  const title = `${company.name} customer support: official help and complaint links`;
  return { title, description: company.summary, alternates: { canonical: `/company/${company.slug}` }, openGraph: { title, description: company.summary, url: `/company/${company.slug}` } };
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const company = getCompany((await params).slug);
  if (!company) notFound();
  const category = getCategory(company.category);
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: `${company.name} customer support guide`, description: company.summary, dateModified: company.verifiedAt, author: { "@type": "Organization", name: siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name }, mainEntityOfPage: `${siteConfig.url}/company/${company.slug}` };
  return <><section className="detail-hero"><div className="shell"><Breadcrumbs items={[{ label: category?.name || company.category, href: `/category/${company.category}` }, { label: company.name }]} /><div className="meta-row"><span className="meta-pill"><BadgeCheck size={12} /> Source checked {company.verifiedAt}</span><span className="meta-pill">Official domain: {company.officialDomain}</span></div><h1>{company.name} support guide</h1><p>{company.summary}</p></div></section><section className="section"><div className="shell content-layout"><article className="content-card"><h2>Official support links</h2><p>These destinations are hosted on the company or government organisation’s official domain. Check the domain before entering personal information.</p>{company.officialLinks.map((link) => <TrackedLink className="official-link" href={link.url} eventName="official_support_click" params={{ company: company.slug, link_label: link.label }} key={link.url}><span>{link.label}<small>{new URL(link.url).hostname}</small></span><ExternalLink /></TrackedLink>)}<div className="warning-box"><AlertTriangle size={21} /><span><b>Do not share OTPs or banking credentials.</b><br/>This site does not provide support by phone and never asks for payment to connect you to an agent.</span></div><h2>Common issues</h2><ul>{company.commonIssues.map((item) => <li key={item}>{item}</li>)}</ul><h2>Recommended steps</h2><ol>{company.steps.map((item) => <li key={item}>{item}</li>)}</ol><h2>When the first complaint is unresolved</h2><p>Reply or follow up using the original complaint reference. If the company’s grievance path is exhausted and the issue is eligible, review the <a href="https://consumerhelpline.gov.in/public/" target="_blank" rel="noopener noreferrer">National Consumer Helpline</a>.</p><AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE} /><ReportForm pageUrl={`/company/${company.slug}`} /></article><aside><div className="sidebar-card"><h3>Source verification</h3><p>{company.sourceNote}</p><p>Last reviewed: <b>{company.verifiedAt}</b></p></div><div className="sidebar-card"><h3>Related guides</h3><ul><li><Link href="/guides/how-to-file-a-customer-complaint">File a strong complaint</Link></li><li><Link href="/guides/refund-not-received-checklist">Refund not received</Link></li><li><Link href="/tools/complaint-letter">Create a complaint letter</Link></li></ul></div><Link className="inline-link" href={`/category/${company.category}`}>More {category?.name} companies <ArrowRight /></Link></aside></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
