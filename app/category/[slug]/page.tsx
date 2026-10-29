import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyCard } from "@/components/CompanyCard";
import { categories, companies, getCategory } from "@/lib/data";

export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const category = getCategory((await params).slug);
  if (!category) return {};
  return { title: `${category.name} customer support guides`, description: category.description, alternates: { canonical: `/category/${category.slug}` } };
}
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = getCategory((await params).slug);
  if (!category) notFound();
  const items = companies.filter((company) => company.category === category.slug);
  return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: category.name }]} /><span className="eyebrow">Service category</span><h1>{category.name} support guides</h1><p>{category.description}. Every starter listing links to an official support destination.</p></div></section><section className="section"><div className="shell"><div className="company-grid">{items.map((company) => <CompanyCard company={company} key={company.slug} />)}</div>{!items.length && <div className="empty">No published companies in this category yet.</div>}</div></section></>;
}
