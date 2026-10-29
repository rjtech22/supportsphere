import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured, requireAdmin } from "@/lib/supabase/server";
import { saveAdPlacement } from "./actions";

export const metadata: Metadata = { title: "Operations dashboard", robots: { index: false, follow: false } };
export default async function OperationsPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login"); const auth = await requireAdmin(); if (!auth.user) redirect("/admin/login"); if (!auth.isAdmin) return <div className="login-wrap"><div className="login-card">Access denied.</div></div>;
  const [{ data: reminders }, { data: checks }, { data: daily }, { data: queries }, { data: ads }] = await Promise.all([
    auth.supabase.from("verification_reminders").select("*,company_country_support(summary)").eq("status", "open").order("due_at").limit(50),
    auth.supabase.from("link_checks").select("*").eq("is_working", false).order("checked_at", { ascending: false }).limit(50),
    auth.supabase.from("traffic_metrics_daily").select("*").order("metric_date", { ascending: false }).limit(30),
    auth.supabase.from("search_query_metrics").select("*").order("clicks", { ascending: false }).limit(20),
    auth.supabase.from("ad_placements").select("*").order("placement_key")
  ]);
  const totals = (daily || []).reduce((sum, row) => ({ users: sum.users + Number(row.organic_users || 0), clicks: sum.clicks + Number(row.clicks || 0), impressions: sum.impressions + Number(row.impressions || 0) }), { users: 0, clicks: 0, impressions: 0 });
  return <div className="admin-shell"><div className="admin-head"><div><span className="eyebrow">Safe automation</span><h1>Traffic, verification & ads</h1></div><Link className="button small" href="/admin">Core admin</Link></div><main className="admin-panel"><section><h2>30-day connected metrics</h2><div className="metric-grid"><div className="metric"><b>{totals.users}</b><span>Organic users</span></div><div className="metric"><b>{totals.clicks}</b><span>Search clicks</span></div><div className="metric"><b>{totals.impressions}</b><span>Search impressions</span></div><div className="metric"><b>{daily?.length || 0}</b><span>Imported days</span></div></div>{!daily?.length && <p className="section-note">No imported GA4/Search Console data yet. Add the server-only Google credentials and connect the scheduled importer before this dashboard reports live data.</p>}</section><hr/>
  <section><h2>Top Search Console queries</h2><div className="data-list">{queries?.map((item) => <div className="data-row" key={`${item.metric_date}-${item.query}-${item.country}`}><div><p>{item.query}</p><small>{item.country} · {item.clicks} clicks · {item.impressions} impressions</small></div></div>)}{!queries?.length && <p className="section-note">No Search Console rows imported.</p>}</div></section><hr/>
  <section><h2>Verification reminders</h2><p className="section-note">Automation creates reminders only. A human must verify official contact data before publishing.</p><div className="data-list">{reminders?.map((item) => <div className="data-row" key={item.id}><div><p>{item.reason}</p><small>Due {new Date(item.due_at).toLocaleDateString()}</small></div></div>)}{!reminders?.length && <p className="section-note">No overdue published records.</p>}</div></section><hr/>
  <section><h2>Broken official links</h2><div className="data-list">{checks?.map((item) => <div className="data-row" key={item.id}><div><p>{item.url}</p><small>HTTP {item.http_status || "error"} · checked {new Date(item.checked_at).toLocaleString()}</small></div></div>)}{!checks?.length && <p className="section-note">No failed link checks recorded.</p>}</div></section><hr/>
  <section><h2>Ad placement controls</h2><form action={saveAdPlacement} className="admin-form"><input name="placement_key" placeholder="top_banner" required/><input name="label" placeholder="Top banner" required/><input name="adsense_slot_id" placeholder="AdSense slot ID (after approval)"/><input name="page_pattern" defaultValue="*" required/><label><input name="enabled" type="checkbox"/> Enabled</label><button className="button small">Save placement</button></form><div className="data-list">{ads?.map((item) => <div className="data-row" key={item.id}><div><p>{item.label}</p><small>{item.placement_key} · {item.enabled ? "enabled" : "disabled"} · {item.adsense_slot_id || "no slot configured"}</small></div></div>)}</div></section></main></div>;
}
