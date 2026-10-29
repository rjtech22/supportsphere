import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { RouteAnalytics } from "@/components/RouteAnalytics";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "SupportSphere — Find support. Resolve issues. Get answers.", template: "%s | SupportSphere" },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: siteConfig.name, title: "SupportSphere", description: siteConfig.description, url: "/" },
  twitter: { card: "summary_large_image", title: "SupportSphere", description: siteConfig.description },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return <html lang="en"><body><Header /><main>{children}</main><Footer /><Analytics /><RouteAnalytics />{adsense && <Script async strategy="afterInteractive" src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense}`} crossOrigin="anonymous" />}</body></html>;
}
