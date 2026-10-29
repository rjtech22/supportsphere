import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { guides } from "@/lib/data";
import { countries, globalCompanies } from "@/lib/global-data";

export const metadata: Metadata = { title: "Search global customer support guides", description: "Search country-specific company support, complaint, refund and cancellation guides.", robots: { index: false, follow: true } };
const index = [
  ...globalCompanies.map((item) => ({ type: "company", title: item.name, description: item.summary, href: `/${item.country}/companies/${item.slug}/`, country: countries.find((country) => country.code === item.country)?.name || item.country, keywords: [item.category, ...item.commonIssues] })),
  ...guides.map((item) => ({ type: "guide", title: item.title, description: item.description, href: `/guides/${item.slug}`, country: "Global", keywords: [item.category] }))
];
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) { const query = ((await searchParams).q || "").trim().toLowerCase(); const results = query ? index.filter((item) => [item.title, item.description, item.country, ...item.keywords].join(" ").toLowerCase().includes(query)) : index; return <><section className="page-hero"><div className="shell"><span className="eyebrow">Global directory search</span><h1>Find support and next steps</h1><p>Search by company, country or issue. Company results open the correct country-specific page.</p><SearchBox compact /></div></section><section className="section"><div className="shell"><div className="section-head"><h2>{query ? `Results for “${query}”` : "Published guides"}</h2><span className="section-note">{results.length} result{results.length === 1 ? "" : "s"}</span></div><div className="search-results">{results.map((item) => <Link className="search-result" href={item.href} key={`${item.type}-${item.href}`}><div><span className="guide-label">{item.country}</span><h2>{item.title}</h2><p>{item.description}</p></div><span>{item.type} <ArrowRight size={14} /></span></Link>)}{!results.length && <div className="empty">No published result found. Try a broader term such as refund, delivery, bank or complaint.</div>}</div></div></section></>; }
