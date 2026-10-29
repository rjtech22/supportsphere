import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleAlert } from "lucide-react";
import type { GlobalCompany } from "@/lib/global-data";

export function GlobalCompanyCard({ company }: { company: GlobalCompany }) {
  const verified = company.verificationStatus === "Verified";
  return <article className="company-card"><div className="company-top"><span className="company-logo blue">{company.logoText}</span><span className={`verified ${verified ? "" : "needs-review"}`}>{verified ? <BadgeCheck size={14} /> : <CircleAlert size={14} />}{company.verificationStatus}</span></div><h3><Link href={`/${company.country}/companies/${company.slug}/`}>{company.name}</Link></h3><p>{company.summary}</p><div className="card-tags">{company.commonIssues.slice(0, 2).map((item) => <span key={item}>{item}</span>)}</div><Link className="card-link" href={`/${company.country}/companies/${company.slug}/`}>View support guide <ArrowRight size={16} /></Link></article>;
}
