import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Globe2 } from "lucide-react";
import { CountrySelector } from "@/components/CountrySelector";
import { GlobalCompanyCard } from "@/components/GlobalCompanyCard";
import { SearchBox } from "@/components/SearchBox";
import { companiesForCountry, countries, getCountry, globalCategories } from "@/lib/global-data";

export function generateStaticParams() { return countries.map(({ code }) => ({ country: code })); }
export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> { const country = getCountry((await params).country); return country ? { title: `Customer support and complaint guides in ${country.name}`, description: `Find official company support links and original complaint guides for consumers in ${country.name}.`, alternates: { canonical: `/${country.code}/` } } : {}; }

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const country = getCountry((await params).country); if (!country) notFound(); const companies = companiesForCountry(country.code);
  return <><section className="page-hero country-hero"><div className="shell"><span className="kicker"><Globe2 size={15} /> {country.name} support directory</span><h1>Customer support in {country.name}</h1><p>Country-specific official support destinations, complaint procedures and practical resolution guides.</p><div className="country-hero-tools"><CountrySelector value={country.code} /><SearchBox compact /></div></div></section><section className="section"><div className="shell"><div className="section-head"><div><span className="eyebrow">Published directory</span><h2>Verified company guides</h2></div><span className="section-note">{companies.length} published for {country.name}</span></div><div className="company-grid">{companies.map((company) => <GlobalCompanyCard company={company} key={company.slug} />)}</div>{!companies.length && <div className="empty">No verified company pages published for this country yet.</div>}</div></section><section className="section soft"><div className="shell"><div className="section-head"><div><span className="eyebrow">Browse locally</span><h2>Categories in {country.name}</h2></div></div><div className="category-grid">{globalCategories.map((category) => <Link className="category-card" href={`/${country.code}/categories/${category.slug}/`} key={category.slug}><span className="category-icon blue">{category.icon}</span><span><b>{category.name}</b><small>{category.description}</small></span><ArrowRight /></Link>)}</div></div></section></>;
}
