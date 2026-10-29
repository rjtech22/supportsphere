import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import type { Company } from "@/lib/data";

export function CompanyCard({ company }: { company: Company }) {
  return <article className="company-card"><div className="company-top"><span className={`company-logo ${company.accent}`}>{company.logoText}</span><span className="verified"><BadgeCheck size={14} /> Verified source</span></div><h3><Link href={`/company/${company.slug}`}>{company.name}</Link></h3><p>{company.summary}</p><div className="card-tags">{company.commonIssues.slice(0, 2).map((item) => <span key={item}>{item}</span>)}</div><Link className="card-link" href={`/company/${company.slug}`}>View support guide <ArrowRight size={16} /></Link></article>;
}
