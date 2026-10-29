import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { guides, getGuide } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const guide = getGuide((await params).slug); return guide ? { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` } } : {}; }
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug); if (!guide) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "HowTo", name: guide.title, description: guide.description, dateModified: guide.updatedAt, step: guide.sections.map((section, index) => ({ "@type": "HowToStep", position: index + 1, name: section.heading, text: section.body })) };
  return <><section className="detail-hero"><div className="shell"><Breadcrumbs items={[{ label: "Guides", href: "/search?q=guide" }, { label: guide.title }]} /><span className="eyebrow">{guide.category} guide · {guide.readTime}</span><h1>{guide.title}</h1><p>{guide.description}</p><div className="meta-row"><span className="meta-pill">Updated {guide.updatedAt}</span><span className="meta-pill">Independent guidance</span></div></div></section><section className="section"><div className="shell content-layout"><article className="content-card">{guide.sections.map((section, index) => <section key={section.heading}><h2>{index + 1}. {section.heading}</h2><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE} /><div className="warning-box">For eligible unresolved consumer grievances, use the <a href="https://consumerhelpline.gov.in/public/" target="_blank" rel="noopener noreferrer">official National Consumer Helpline portal <ExternalLink size={13} /></a>.</div></article><aside><div className="sidebar-card"><h3>Use this guide with</h3><ul><li><Link href="/search">Company support directory</Link></li><li><Link href="/tools/complaint-letter">Complaint letter generator</Link></li><li><Link href="/disclaimer">Safety disclaimer</Link></li></ul></div></aside></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></>;
}
