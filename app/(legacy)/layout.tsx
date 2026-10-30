import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import { RouteAnalytics } from "@/components/RouteAnalytics";
import { AdSenseLoader, ConsentManager } from "@/components/ConsentManager";
import { siteConfig } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Customer Support & Complaint Help | Find Company Support", template: "%s | ResolveNexa" },
  description: siteConfig.description,
  icons: { icon: [{ url: "/resolvenexa-logo.png", type: "image/png" }], apple: "/resolvenexa-logo.png" },
  openGraph: { type: "website", locale: "en_US", siteName: siteConfig.name, images: [{ url: "/resolvenexa-logo.png", width: 1536, height: 1536, alt: "ResolveNexa logo" }] },
  twitter: { card: "summary", images: ["/resolvenexa-logo.png"] },
  robots: { index: true, follow: true },
  verification: { google: "hG0c5NX2RN807fAn_eRqbFY96MRqNWsyvrRKDZit18s" }
};

export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const organizationLd = { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/resolvenexa-logo.png`, description: siteConfig.description };
  return <html lang="en" suppressHydrationWarning><body>{children}<Analytics /><RouteAnalytics /><ConsentManager /><AdSenseLoader client={adsense} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} /></body></html>;
}
