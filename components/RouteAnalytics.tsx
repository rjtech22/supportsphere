"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function RouteAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    const organicHosts = ["google.", "bing.com", "duckduckgo.com", "yahoo.", "ecosia.org", "yandex."];
    const referrerHost = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : "";
    const landingKey = "supportsphere_landing_tracked";
    if (!sessionStorage.getItem(landingKey) && organicHosts.some((host) => referrerHost.includes(host))) {
      trackEvent("organic_landing_view", { landing_page: pathname, search_engine: referrerHost });
      sessionStorage.setItem(landingKey, "1");
    }
    if (parts[2] === "companies" && parts[3]) trackEvent("company_view", { locale: parts[0], country: parts[1], company: parts[3] });
    else if (parts[1] === "companies" && parts[2]) trackEvent("company_view", { country: parts[0], company: parts[2] });
    else if (pathname.startsWith("/company/")) trackEvent("company_view", { company: parts[1] || "unknown" });
    if (parts[2] === "categories" && parts[3]) trackEvent("category_click", { locale: parts[0], country: parts[1], category: parts[3] });
    else if (parts[1] === "categories" && parts[2]) trackEvent("category_click", { country: parts[0], category: parts[2] });
    else if (pathname.startsWith("/category/")) trackEvent("category_click", { category: parts[1] || "unknown" });
    if (parts[1] === "guides" && parts[2]) trackEvent("guide_view", { locale: parts[0], guide: parts[2] });
  }, [pathname]);
  return null;
}
