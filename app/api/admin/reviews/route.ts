import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

export const dynamic = "force-dynamic";

function adminClient(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const authorization = request.headers.get("authorization");
  if (!url || !key || !authorization?.startsWith("Bearer ")) return null;
  return {
    token: authorization.slice(7),
    db: createClient(url, key, { global: { headers: { Authorization: authorization } }, auth: { persistSession: false } })
  };
}

export async function GET(request: NextRequest) {
  const admin = adminClient(request);
  if (!admin) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const status = request.nextUrl.searchParams.get("status") || "pending";
  if (!new Set(["pending", "approved", "rejected"]).has(status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  const { data, error } = await admin.db.from("company_reviews").select("*").eq("status", status).order("created_at", { ascending: true }).limit(100);
  if (error) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  return NextResponse.json({ reviews: data || [] });
}

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["approved", "rejected"]),
  moderationNote: z.string().trim().max(500).optional().or(z.literal(""))
});

export async function PATCH(request: NextRequest) {
  const admin = adminClient(request);
  if (!admin) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid moderation update." }, { status: 400 });
  const { data: authData } = await admin.db.auth.getUser(admin.token);
  if (!authData.user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { error } = await admin.db.from("company_reviews").update({
    status: parsed.data.status,
    moderation_note: parsed.data.moderationNote || null,
    moderated_by: authData.user.id,
    moderated_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }).eq("id", parsed.data.id);
  if (error) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  return NextResponse.json({ message: `Review ${parsed.data.status}.` });
}

