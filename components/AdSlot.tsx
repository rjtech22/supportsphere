"use client";

import { useEffect } from "react";

export function AdSlot({ slot, format = "auto" }: { slot?: string; format?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && process.env.NEXT_PUBLIC_GOOGLE_CERTIFIED_CMP_CONFIGURED === "true";
  const configured = enabled && /^ca-pub-\d{16}$/.test(client || "") && /^\d+$/.test(slot || "");
  useEffect(() => {
    if (!configured) return;
    const render = () => { if (localStorage.getItem("resolvenexa-consent-v1") !== "granted") return; try { ((window as typeof window & { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({}); } catch { /* AdSense can retry. */ } };
    render(); window.addEventListener("resolvenexa:consent", render); return () => window.removeEventListener("resolvenexa:consent", render);
  }, [configured]);
  if (!configured) return null;
  return <aside className="ad-wrap" aria-label="Advertisement"><span>Advertisement</span><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slot} data-ad-format={format} data-full-width-responsive="true" /></aside>;
}
