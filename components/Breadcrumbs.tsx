import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ locale = "en", items, currentPath }: { locale?: Locale; items: BreadcrumbItem[]; currentPath?: string }) {
  const homePath = localePath(locale);
  const canonicalCurrent = currentPath ? localePath(locale, currentPath) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ResolveNexa", item: `${siteConfig.url}${homePath}` },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `${siteConfig.url}${item.href}` : canonicalCurrent ? `${siteConfig.url}${canonicalCurrent}` : undefined
      }))
    ]
  };
  return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href={homePath}>ResolveNexa</Link>{items.map((item) => <span key={`${item.label}-${item.href || "current"}`}><ChevronRight size={13} />{item.href ? <Link href={item.href}>{item.label}</Link> : <b aria-current="page">{item.label}</b>}</span>)}</nav>{canonicalCurrent ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}</>;
}
