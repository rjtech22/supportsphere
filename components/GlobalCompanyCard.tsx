import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleAlert } from "lucide-react";
import type { GlobalCompany } from "@/lib/global-data";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function GlobalCompanyCard({ company, locale = "en" }: { company: GlobalCompany; locale?: Locale }) {
  const verified = company.verificationStatus === "Verified";
  const d = getDictionary(locale); const href = localePath(locale, `/${company.country}/companies/${company.slug}`);
  const summary = d.companySummaries[company.slug] || company.summary;
  return <article className="company-card"><div className="company-top"><span className="company-logo blue">{company.logoText}</span><span className={`verified ${verified ? "" : "needs-review"}`}>{verified ? <BadgeCheck size={14} /> : <CircleAlert size={14} />}{d.company.verified}</span></div><h3><Link href={href}>{company.name}</Link></h3><p>{summary}</p><Link className="card-link" href={href}>{d.company.viewGuide} <ArrowRight size={16} /></Link></article>;
}
