import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { CountrySelector } from "@/components/CountrySelector";
import { LanguageSelector } from "@/components/LanguageSelector";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  return (
      <header className="header">
        <div className="shell nav">
          <Link className="brand" href={localePath(locale)}><span className="brand-mark"><Image className="brand-logo" src="/supportsphere-logo.png" alt="" width={44} height={44} /></span><span>Support<span>Sphere</span></span></Link>
          <nav className="desktop-nav" aria-label="Main navigation"><Link href={localePath(locale, "/us")}>{d.nav.companies}</Link><Link href={localePath(locale, "/guides")}>{d.nav.guides}</Link><Link href={localePath(locale, "/tools/complaint-letter")}>{d.nav.tools}</Link><Link href={localePath(locale, "/about")}>{d.nav.about}</Link></nav>
          <LanguageSelector locale={locale} label={d.nav.language} />
          <CountrySelector locale={locale} compact />
          <Link className="nav-search" href={localePath(locale, "/search")} aria-label={d.nav.search}><Search size={18} /><span>{d.nav.search}</span></Link>
          <details className="mobile-menu"><summary aria-label="Open menu"><Menu size={21} /></summary><div><Link href={localePath(locale, "/search")}>{d.nav.search}</Link><Link href={localePath(locale, "/us")}>{d.nav.companies}</Link><Link href={localePath(locale, "/guides")}>{d.nav.guides}</Link><Link href={localePath(locale, "/tools/complaint-letter")}>{d.nav.tools}</Link><Link href={localePath(locale, "/about")}>{d.nav.about}</Link></div></details>
        </div>
      </header>
  );
}
