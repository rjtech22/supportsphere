import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return <footer className="footer"><div className="shell footer-grid"><div><Link className="brand footer-brand" href={localePath(locale)}><span className="brand-mark"><Image className="brand-logo" src="/resolvenexa-logo.png" alt="" width={44} height={44} /></span><span>Resolve<span>Nexa</span></span></Link><p>{d.footer.tagline}</p></div><div><strong>{d.footer.explore}</strong><Link href={localePath(locale, "/search")}>{d.nav.search}</Link><Link href={localePath(locale, "/guides")}>{d.nav.guides}</Link><Link href={localePath(locale, "/us")}>{d.countries.us}</Link><Link href={localePath(locale, "/in")}>{d.countries.in}</Link><Link href={localePath(locale, "/tools/complaint-letter")}>{d.nav.tools}</Link></div><div><strong>{d.footer.company}</strong><Link href={localePath(locale, "/about")}>{d.nav.about}</Link><Link href={localePath(locale, "/contact")}>{d.footer.contact}</Link><Link href={localePath(locale, "/privacy-policy")}>{d.footer.privacy}</Link><Link href={localePath(locale, "/terms")}>{d.footer.terms}</Link></div><div><strong>{d.footer.safety}</strong><p>{d.footer.safetyText}</p><Link href={localePath(locale, "/disclaimer")}>{d.footer.disclaimer}</Link></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.legalName}</span><span>{d.footer.independent}</span></div></footer>;
}
