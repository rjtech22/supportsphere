import Link from "next/link";
import { Menu, Search, ShieldCheck } from "lucide-react";
import { CountrySelector } from "@/components/CountrySelector";

export function Header() {
  return (
    <>
      <div className="notice"><div className="shell notice-inner"><span><ShieldCheck size={14} /> Independent guide · Official links first</span><Link href="/disclaimer">Read our verification policy</Link></div></div>
      <header className="header">
        <div className="shell nav">
          <Link className="brand" href="/"><span className="brand-mark">SS</span><span>Support<span>Sphere</span></span></Link>
          <nav className="desktop-nav" aria-label="Main navigation"><Link href="/us/">Companies</Link><Link href="/guides">Guides</Link><Link href="/tools/complaint-letter">Complaint tools</Link><Link href="/about">About</Link></nav>
          <CountrySelector compact />
          <Link className="nav-search" href="/search" aria-label="Search"><Search size={18} /><span>Search</span></Link>
          <details className="mobile-menu"><summary aria-label="Open menu"><Menu size={21} /></summary><div><Link href="/search">Search</Link><Link href="/us/">Companies</Link><Link href="/guides">Guides</Link><Link href="/tools/complaint-letter">Tools</Link><Link href="/about">About</Link></div></details>
        </div>
      </header>
    </>
  );
}
