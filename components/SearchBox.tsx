"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function SearchBox({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  function submit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    trackEvent("search", { search_term: value });
    router.push(`/search?q=${encodeURIComponent(value)}`);
  }
  return <form className={`search-box ${compact ? "compact" : ""}`} onSubmit={submit} role="search"><Search size={20} /><input aria-label="Search companies and support issues" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a company or issue — refund, delivery, recharge…" /><button type="submit">Search</button></form>;
}
