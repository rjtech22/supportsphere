import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return <footer className="footer"><div className="shell footer-grid"><div><Link className="brand footer-brand" href="/"><span className="brand-mark">SS</span><span>Support<span>Sphere</span></span></Link><p>Find support. Resolve issues. Get answers across five countries.</p></div><div><strong>Explore</strong><Link href="/search">Search</Link><Link href="/guides">Support guides</Link><Link href="/us/">United States</Link><Link href="/in/">India</Link><Link href="/tools/complaint-letter">Complaint tools</Link></div><div><strong>Company</strong><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div><div><strong>Safety</strong><p>Never share an OTP, PIN, CVV or password with anyone claiming to provide support.</p><Link href="/disclaimer">Disclaimer</Link></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.legalName}</span><span>Independent. Not affiliated with listed companies.</span></div></footer>;
}
