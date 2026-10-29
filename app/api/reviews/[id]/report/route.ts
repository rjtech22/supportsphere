import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/service";
import { isSameOrigin, requestFingerprint, validStartedAt } from "@/lib/reviews";

const reportSchema = z.object({
  reason: z.enum(["personal_information", "spam", "abuse", "fake_or_misleading", "other"]),
  details: z.string().trim().max(500).optional().or(z.literal("")),
  website: z.string().max(0),
  startedAt: z.number()
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "Invalid review." }, { status: 400 });
  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = reportSchema.safeParse(input);
  if (!parsed.success || !validStartedAt(parsed.data?.startedAt)) return NextResponse.json({ error: "Please review the report and try again." }, { status: 400 });
  try {
    const db = createServiceClient();
    const { data: review } = await db.from("company_reviews").select("id").eq("id", id).eq("status", "approved").maybeSingle();
    if (!review) return NextResponse.json({ error: "Review was not found." }, { status: 404 });
    const { error } = await db.from("company_review_reports").insert({
      review_id: id,
      reason: parsed.data.reason,
      details: parsed.data.details || null,
      reporter_hash: requestFingerprint(request),
      status: "new"
    });
    if (error?.code === "23505") return NextResponse.json({ message: "You already reported this review." }, { status: 200 });
    if (error) return NextResponse.json({ error: "Could not submit the report." }, { status: 503 });
    return NextResponse.json({ message: "Report submitted for moderation." }, { status: 202 });
  } catch { return NextResponse.json({ error: "Could not submit the report." }, { status: 503 }); }
}

