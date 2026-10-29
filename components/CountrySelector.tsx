"use client";

import { useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import { countries } from "@/lib/global-data";
import { trackEvent } from "@/lib/analytics";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function CountrySelector({ locale = "en", value = "us", compact = false }: { locale?: Locale; value?: string; compact?: boolean }) {
  const router = useRouter();
  const d = getDictionary(locale);
  return <label className={`country-selector ${compact ? "compact" : ""}`}><Globe2 size={15} /><span className="sr-only">{d.nav.country}</span><select aria-label={d.nav.country} value={value} onChange={(event) => { const country = event.target.value; trackEvent("country_select", { country, locale }); router.push(localePath(locale, `/${country}`)); }}>{countries.map((country) => <option value={country.code} key={country.code}>{country.flag} · {d.countries[country.code]}</option>)}</select></label>;
}
