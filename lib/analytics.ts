export type AnalyticsEvent =
  | "search"
  | "search_results"
  | "no_result_search"
  | "organic_landing_view"
  | "guide_view"
  | "category_click"
  | "country_select"
  | "generator_use"
  | "generator_copy"
  | "company_view"
  | "official_support_click"
  | "affiliate_click"
  | "sponsored_listing_click"
  | "report_incorrect_info";

export function trackEvent(name: AnalyticsEvent, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", name, params);
}
