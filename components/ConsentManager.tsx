"use client";

import { useEffect, useState } from "react";

type Choice = "granted" | "denied";
const key = "supportsphere-consent-v1";

function apply(choice: Choice) {
  const win = window as typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  win.dataLayer ||= [];
  win.gtag ||= (...args: unknown[]) => { win.dataLayer!.push(args); };
  win.gtag("consent", "update", {
    analytics_storage: choice, ad_storage: choice, ad_user_data: choice, ad_personalization: choice
  });
  window.dispatchEvent(new CustomEvent("supportsphere:consent", { detail: choice }));
}

export function ConsentManager() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(key) as Choice | null;
    if (saved) apply(saved); else setOpen(true);
  }, []);
  function choose(choice: Choice) { localStorage.setItem(key, choice); apply(choice); setOpen(false); }
  if (!open) return null;
  return <aside className="consent-banner" role="dialog" aria-label="Privacy choices" aria-live="polite"><div><b>Privacy choices</b><p>Allow analytics and advertising cookies to help us measure useful pages and support the site. You can continue with optional cookies disabled.</p></div><div className="consent-actions"><button className="secondary-button" onClick={() => choose("denied")}>Reject optional</button><button className="button small" onClick={() => choose("granted")}>Accept</button></div></aside>;
}

export function AdSenseLoader({ client }: { client?: string }) {
  useEffect(() => {
    if (!client) return;
    const load = (choice: Choice | null) => {
      if (choice !== "granted" || document.querySelector(`script[data-supportsphere-ads]`)) return;
      const script = document.createElement("script"); script.async = true; script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      script.dataset.supportsphereAds = "true"; document.head.appendChild(script);
    };
    load(localStorage.getItem(key) as Choice | null);
    const listener = (event: Event) => load((event as CustomEvent<Choice>).detail);
    window.addEventListener("supportsphere:consent", listener);
    return () => window.removeEventListener("supportsphere:consent", listener);
  }, [client]);
  return null;
}
