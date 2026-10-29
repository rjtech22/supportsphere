"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function RouteAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/company/")) trackEvent("company_view", { company: pathname.split("/")[2] || "unknown" });
    if (pathname.startsWith("/category/")) trackEvent("category_click", { category: pathname.split("/")[2] || "unknown" });
  }, [pathname]);
  return null;
}
