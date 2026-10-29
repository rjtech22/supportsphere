import Link from "next/link";
export default function NotFound() { return <section className="login-wrap"><div className="login-card"><span className="eyebrow">404</span><h1>Page not found</h1><p>The guide may have moved or is not published yet.</p><Link className="button" href="/">Return home</Link></div></section>; }
