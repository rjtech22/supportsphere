"use client";

import { FormEvent, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import { allCountries, normalizeCountryCode } from "@/lib/country-catalog";
import { trackEvent } from "@/lib/analytics";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function CountrySelector({ locale = "en", value = "us", compact = false }: { locale?: Locale; value?: string; compact?: boolean }) {
  const router = useRouter();
  const d = getDictionary(locale);
  const id = useId();
  const selected = allCountries.find((country) => country.code === value);
  const [query, setQuery] = useState(selected?.name || "United States");
  function navigate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const country = normalizeCountryCode(query);
    if (!country) return;
    trackEvent("country_select", { country, locale });
    router.push(localePath(locale, `/${country}`));
  }
  return <form className={`country-selector searchable ${compact ? "compact" : ""}`} onSubmit={navigate}>
    <Globe2 size={15} aria-hidden="true" />
    <label className="sr-only" htmlFor={`country-search-${id}`}>{d.nav.country}</label>
    <input id={`country-search-${id}`} list={`resolvenexa-country-list-${id}`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search country" autoComplete="off" />
    <datalist id={`resolvenexa-country-list-${id}`}>{allCountries.map((country) => <option value={country.name} key={country.code}>{country.flag} {country.iso2}</option>)}</datalist>
    <button type="submit" aria-label={`Open ${query}`}>Go</button>
  </form>;
}
