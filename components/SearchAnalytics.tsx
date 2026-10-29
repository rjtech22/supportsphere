"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function SearchAnalytics({ query, resultCount }: { query: string; resultCount: number }) {
  useEffect(() => {
    const searchTerm = query.trim();
    if (!searchTerm) return;
    trackEvent("search_results", { search_term: searchTerm, result_count: resultCount });
    if (resultCount === 0) trackEvent("no_result_search", { search_term: searchTerm });
  }, [query, resultCount]);
  return null;
}
