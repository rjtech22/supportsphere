"use client";

import { useEffect } from "react";

export function AdSlot({ slot, format = "auto" }: { slot?: string; format?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  useEffect(() => {
    if (!client || !slot) return;
    const render = () => { if (localStorage.getItem("resolvenexa-consent-v1") !== "granted") return; try { ((window as typeof window & { adsbygoogle?: unknown[] }).adsbygoogle ||= []).push({}); } catch { /* AdSense can retry. */ } };
    render(); window.addEventListener("resolvenexa:consent", render); return () => window.removeEventListener("resolvenexa:consent", render);
  }, [client, slot]);
  if (!client || !slot) return <aside className="ad-placeholder" aria-label="Advertisement placeholder"><span>Advertisement</span><p>Reserved ad placement</p></aside>;
  return <aside className="ad-wrap" aria-label="Advertisement"><span>Advertisement</span><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slot} data-ad-format={format} data-full-width-responsive="true" /></aside>;
}
