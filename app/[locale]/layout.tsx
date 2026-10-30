import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { RouteAnalytics } from "@/components/RouteAnalytics";
import { AdSenseLoader, ConsentManager } from "@/components/ConsentManager";
import { isLocale, locales } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Customer Support & Complaint Help | Find Company Support", template: "%s | SupportSphere" },
  description: siteConfig.description,
  icons: { icon: [{ url: "/supportsphere-logo.png", type: "image/png" }], apple: "/supportsphere-logo.png" },
  openGraph: { type: "website", siteName: siteConfig.name, images: [{ url: "/supportsphere-logo.png", width: 1536, height: 1536, alt: "SupportSphere logo" }] },
  twitter: { card: "summary", images: ["/supportsphere-logo.png"] },
  robots: { index: true, follow: true },
  verification: { google: "hG0c5NX2RN807fAn_eRqbFY96MRqNWsyvrRKDZit18s" }
};

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  const adsense = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const organizationLd = { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: `${siteConfig.url}/supportsphere-logo.png`, description: siteConfig.description };
  return <html lang={locale} dir="ltr" suppressHydrationWarning><body><Header locale={locale} /><main>{children}</main><Footer locale={locale} /><Analytics /><RouteAnalytics /><ConsentManager /><AdSenseLoader client={adsense} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} /></body></html>;
}
