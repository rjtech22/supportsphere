"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function SearchBox({ locale = "en", compact = false }: { locale?: Locale; compact?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const d = getDictionary(locale);
  function submit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    trackEvent("search", { search_term: value });
    router.push(`${localePath(locale, "/search")}?q=${encodeURIComponent(value)}`);
  }
  return <form className={`search-box ${compact ? "compact" : ""}`} onSubmit={submit} role="search"><Search size={20} /><input aria-label={d.home.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} placeholder={d.home.searchPlaceholder} /><button type="submit">{d.home.searchButton}</button></form>;
}
