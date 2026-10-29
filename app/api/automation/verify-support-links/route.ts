import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";
export const maxDuration = 60;

function authorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  return Boolean(secret && request.headers.get("authorization") === `Bearer ${secret}`);
}
function safeUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) return null;
    const host = url.hostname.toLowerCase();
    if (host === "localhost" || host === "0.0.0.0" || host === "::1" || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) return null;
    return url.toString();
  } catch { return null; }
}
async function check(url: string) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 12000);
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: controller.signal, headers: { "user-agent": "SupportSphere-LinkVerifier/1.0" } });
    if (response.status === 405 || response.status === 403) response = await fetch(url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { "user-agent": "SupportSphere-LinkVerifier/1.0", range: "bytes=0-1024" } });
    return { status: response.status, finalUrl: response.url, ok: response.ok || (response.status >= 300 && response.status < 400), error: null as string | null };
  } catch (error) { return { status: null, finalUrl: null, ok: false, error: error instanceof Error ? error.message.slice(0, 300) : "Request failed" }; }
  finally { clearTimeout(timer); }
}

export async function GET(request: NextRequest) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = createServiceClient();
  const [{ data: sources, error }, { data: stale }] = await Promise.all([
    db.from("official_sources").select("id,support_id,url").order("checked_at", { ascending: true, nullsFirst: true }).limit(40),
    db.from("company_country_support").select("id,verified_at").eq("published", true).lt("verified_at", new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10))
  ]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  let checked = 0; let broken = 0;
  for (const source of sources || []) {
    const url = safeUrl(source.url); const result = url ? await check(url) : { status: null, finalUrl: null, ok: false, error: "Unsafe or invalid URL" };
    await db.from("link_checks").upsert({ source_id: source.id, support_id: source.support_id, url: source.url, http_status: result.status, final_url: result.finalUrl, is_working: result.ok, error_message: result.error, checked_at: new Date().toISOString() }, { onConflict: "source_id" });
    await db.from("official_sources").update({ checked_at: new Date().toISOString() }).eq("id", source.id);
    checked++; if (!result.ok) broken++;
  }
  for (const item of stale || []) await db.from("verification_reminders").upsert({ support_id: item.id, reason: "Contact information has not been manually verified in 90 days", status: "open", due_at: new Date().toISOString() }, { onConflict: "support_id" });
  return NextResponse.json({ checked, broken, remindersCreated: stale?.length || 0, note: "Contacts are never auto-approved or auto-replaced." });
}
