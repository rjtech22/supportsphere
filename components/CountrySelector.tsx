"use client";

import { useRouter } from "next/navigation";
import { Globe2 } from "lucide-react";
import { countries } from "@/lib/global-data";
import { trackEvent } from "@/lib/analytics";

export function CountrySelector({ value = "us", compact = false }: { value?: string; compact?: boolean }) {
  const router = useRouter();
  return <label className={`country-selector ${compact ? "compact" : ""}`}><Globe2 size={15} /><span className="sr-only">Country</span><select value={value} onChange={(event) => { const country = event.target.value; trackEvent("country_select", { country }); router.push(`/${country}/`); }}>{countries.map((country) => <option value={country.code} key={country.code}>{country.flag} · {country.name}</option>)}</select></label>;
}
