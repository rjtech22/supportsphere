"use client";

import Image from "next/image";
import { useState } from "react";

function companyDomain(officialWebsite: string) {
  try {
    return new URL(officialWebsite).hostname.replace(/^www\./, "");
  } catch {
    return officialWebsite.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
  }
}

export function CompanyLogo({ name, logoText, officialWebsite }: { name: string; logoText: string; officialWebsite: string }) {
  const [failed, setFailed] = useState(false);
  const domain = companyDomain(officialWebsite);
  const logoUrl = `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(`https://${domain}`)}&sz=128`;

  return <span className="company-logo company-logo-brand">
    {!failed ? <Image className="company-logo-image" src={logoUrl} alt={`${name} logo`} width={64} height={64} sizes="64px" onError={() => setFailed(true)} /> : <span className="company-logo-fallback" aria-label={`${name} logo`}>{logoText}</span>}
  </span>;
}
