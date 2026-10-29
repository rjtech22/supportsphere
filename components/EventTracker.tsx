"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export function EventTracker({ name, params }: { name: AnalyticsEvent; params: Record<string, string> }) {
  const serialized = JSON.stringify(params);
  useEffect(() => { trackEvent(name, JSON.parse(serialized)); }, [name, serialized]);
  return null;
}
