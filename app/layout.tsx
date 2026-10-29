import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { RouteAnalytics } from "@/components/RouteAnalytics";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Customer Support & Complaint Help | Find Company Support", template: "%s | SupportSphere" },
  description: siteConfig.description,
  openGraph: { type: "website", locale: "en_US", siteName: siteConfig.name, title: "SupportSphere", description: siteConfig.description, url: "/" },
  twitter: { card: "summary_large_image", title: "SupportSphere", description: siteConfig.description },
  robots: { index: true, follow: true },
  verification: { google: "hG0c5NX2RN807fAn_eRqbFY96MRqNWsyvrRKDZit18s" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const organizationLd = { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/icon.svg`, description: siteConfig.description };
  return <html lang="en" suppressHydrationWarning><body>{children}<Analytics /><RouteAnalytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />{adsense && <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`} crossOrigin="anonymous" />}</body></html>;
}
