"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type CountryDirectoryItem = {
  code: string;
  iso2: string;
  flag: string;
  name: string;
};

const copy = {
  en: { label: "Search countries", placeholder: "Search by country name or ISO code", count: "countries shown", empty: "No country matches your search." },
  ta: { label: "நாடுகளைத் தேடுங்கள்", placeholder: "நாட்டின் பெயர் அல்லது ISO குறியீட்டால் தேடுங்கள்", count: "நாடுகள் காட்டப்படுகின்றன", empty: "உங்கள் தேடலுக்கு பொருந்தும் நாடு இல்லை." },
  hi: { label: "देश खोजें", placeholder: "देश के नाम या ISO कोड से खोजें", count: "देश दिखाए गए", empty: "आपकी खोज से कोई देश मेल नहीं खाता।" },
  fr: { label: "Rechercher un pays", placeholder: "Rechercher par nom de pays ou code ISO", count: "pays affichés", empty: "Aucun pays ne correspond à votre recherche." }
} as const;

export function CountryDirectory({ locale, items }: { locale: Locale; items: CountryDirectoryItem[] }) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const text = copy[locale];
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(locale);
    if (!normalized) return items;
    return items.filter((country) => country.name.toLocaleLowerCase(locale).includes(normalized) || country.iso2.toLowerCase().includes(normalized));
  }, [items, locale, query]);

  return <div className="country-directory">
    <label className="country-directory-search" htmlFor={inputId}>
      <Search size={18} aria-hidden="true" />
      <span className="sr-only">{text.label}</span>
      <input id={inputId} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.placeholder} autoComplete="off" />
    </label>
    <p className="country-directory-count" aria-live="polite">{filtered.length} {text.count}</p>
    {filtered.length > 0 ? <nav className="country-directory-grid" aria-label={text.label}>
      {filtered.map((country) => <Link className="country-directory-link" href={`/${locale}/${country.code}`} key={country.code}>
        <span aria-hidden="true">{country.flag}</span>
        <b>{country.name}</b>
        <small>{country.iso2}</small>
        <ArrowRight size={14} aria-hidden="true" />
      </Link>)}
    </nav> : <p className="country-directory-empty">{text.empty}</p>}
  </div>;
}
