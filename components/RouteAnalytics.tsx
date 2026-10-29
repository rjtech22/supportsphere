"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function RouteAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts[1] === "companies" && parts[2]) trackEvent("company_view", { country: parts[0], company: parts[2] });
    else if (pathname.startsWith("/company/")) trackEvent("company_view", { company: parts[1] || "unknown" });
    if (parts[1] === "categories" && parts[2]) trackEvent("category_click", { country: parts[0], category: parts[2] });
    else if (pathname.startsWith("/category/")) trackEvent("category_click", { category: parts[1] || "unknown" });
  }, [pathname]);
  return null;
}
