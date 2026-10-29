"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { localeNames, locales, type Locale } from "@/lib/i18n";

export function LanguageSelector({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname(); const router = useRouter();
  function change(next: string) {
    const parts = pathname.split("/").filter(Boolean); if (parts.length && locales.includes(parts[0] as Locale)) parts[0] = next; else parts.unshift(next);
    const query = typeof window === "undefined" ? "" : window.location.search; router.push(`/${parts.join("/")}${query}`);
  }
  return <label className="language-selector"><Languages size={15} /><span className="sr-only">{label}</span><select aria-label={label} value={locale} onChange={(event) => change(event.target.value)}>{locales.map((item) => <option value={item} key={item}>{localeNames[item]}</option>)}</select></label>;
}
