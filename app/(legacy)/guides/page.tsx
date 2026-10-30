import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { guides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Customer Support, Refund & Complaint Guides",
  description: "Read practical customer support guides for complaints, refunds, cancellations, billing disputes, delayed deliveries and warranty requests.",
  alternates: { canonical: "/guides" },
  openGraph: { title: "Customer Support, Refund & Complaint Guides", description: "Practical, independent guides for resolving common customer service issues.", url: "/guides" }
};

export default function GuidesPage() {
  return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Guides" }]} /><span className="eyebrow">Customer support knowledge base</span><h1>Customer Support & Complaint Resolution Guides</h1><p>Original, step-by-step guidance for contacting support, requesting refunds, writing complaints and escalating unresolved issues.</p></div></section><section className="section"><div className="shell"><div className="guide-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><span className="guide-icon"><FileText /></span><div><span className="guide-label">{guide.category} · {guide.readTime}</span><h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><p>{guide.description}</p><Link className="inline-link" href={`/guides/${guide.slug}`}>Read guide <ArrowRight /></Link></div></article>)}</div></div></section></>;
}
