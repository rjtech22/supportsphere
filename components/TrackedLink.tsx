"use client";

import type { ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export function TrackedLink({ href, eventName, params, className, children }: { href: string; eventName: AnalyticsEvent; params: Record<string, string>; className?: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => trackEvent(eventName, params)}>{children}</a>;
}
