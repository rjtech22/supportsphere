import type { Metadata } from "next";
import { AdminLoginForm } from "./form";
export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export default function AdminLoginPage() { return <section className="login-wrap"><div className="login-card"><span className="eyebrow">Secure administration</span><h1>Admin sign in</h1><p>Only Supabase users promoted to the <b>admin</b> role can access the dashboard.</p><AdminLoginForm /></div></section>; }
