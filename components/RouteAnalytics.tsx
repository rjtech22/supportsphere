"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function RouteAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[2] === "companies" && parts[3]) trackEvent("company_view", { locale: parts[0], country: parts[1], company: parts[3] });
    else if (parts[1] === "companies" && parts[2]) trackEvent("company_view", { country: parts[0], company: parts[2] });
    else if (pathname.startsWith("/company/")) trackEvent("company_view", { company: parts[1] || "unknown" });
    if (parts[2] === "categories" && parts[3]) trackEvent("category_click", { locale: parts[0], country: parts[1], category: parts[3] });
    else if (parts[1] === "categories" && parts[2]) trackEvent("category_click", { country: parts[0], category: parts[2] });
    else if (pathname.startsWith("/category/")) trackEvent("category_click", { category: parts[1] || "unknown" });
  }, [pathname]);
  return null;
}
