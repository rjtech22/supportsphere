import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { countryByCode } from "@/lib/country-catalog";
import { getPublishedCompany } from "@/lib/database-content";
import { createServiceClient } from "@/lib/supabase/service";
import { REVIEW_LIMIT_PER_DAY, REVIEW_MAX_LENGTH, REVIEW_MIN_LENGTH, contentHash, isSameOrigin, looksUnsafe, normalizeReviewBody, requestFingerprint, validStartedAt } from "@/lib/reviews";

export const dynamic = "force-dynamic";

const querySchema = z.object({
  company: z.string().regex(/^[a-z0-9-]+$/),
  country: z.string().regex(/^[a-z]{2}$/)
});

const submissionSchema = z.object({
  companySlug: z.string().regex(/^[a-z0-9-]+$/),
  companyCountryCode: z.string().regex(/^[a-z]{2}$/),
  reviewerCountryCode: z.string().regex(/^[a-z]{2}$/),
  displayName: z.string().trim().min(2).max(60).optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5).nullable(),
  reviewBody: z.string().min(REVIEW_MIN_LENGTH).max(REVIEW_MAX_LENGTH),
  experienceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  website: z.string().max(0),
  startedAt: z.number()
});

function unavailable() {
  return NextResponse.json({ error: "Reviews are temporarily unavailable." }, { status: 503 });
}

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) return NextResponse.json({ error: "Invalid company review query." }, { status: 400 });
  try {
    const { data, error } = await createServiceClient()
      .from("company_reviews")
      .select("id,display_name,rating,review_body,reviewer_country_code,experience_date,created_at")
      .eq("company_slug", parsed.data.company)
      .eq("company_country_code", parsed.data.country)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) return unavailable();
    return NextResponse.json({ reviews: data || [] }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
  } catch { return unavailable(); }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const parsed = submissionSchema.safeParse(input);
  if (!parsed.success || !validStartedAt(parsed.data?.startedAt)) return NextResponse.json({ error: "Please review the form and try again." }, { status: 400 });
  const review = parsed.data;
  const body = normalizeReviewBody(review.reviewBody);
  if (looksUnsafe(body)) return NextResponse.json({ error: "Remove links, email addresses or repeated spam text before submitting." }, { status: 400 });
  if (!countryByCode.has(review.reviewerCountryCode)) return NextResponse.json({ error: "Choose a valid country." }, { status: 400 });
  if (review.experienceDate && review.experienceDate > new Date().toISOString().slice(0, 10)) return NextResponse.json({ error: "Experience date cannot be in the future." }, { status: 400 });
  const company = await getPublishedCompany(review.companyCountryCode, review.companySlug);
  if (!company) return NextResponse.json({ error: "Company page was not found." }, { status: 404 });

  try {
    const db = createServiceClient();
    const fingerprint = requestFingerprint(request);
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await db.from("company_reviews").select("id", { count: "exact", head: true }).eq("submitter_hash", fingerprint).gte("created_at", since);
    if ((count || 0) >= REVIEW_LIMIT_PER_DAY) return NextResponse.json({ error: "Submission limit reached. Please try again later." }, { status: 429 });
    const { error } = await db.from("company_reviews").insert({
      company_slug: review.companySlug,
      company_country_code: review.companyCountryCode,
      reviewer_country_code: review.reviewerCountryCode,
      display_name: review.displayName || null,
      rating: review.rating,
      review_body: body,
      experience_date: review.experienceDate || null,
      status: "pending",
      content_hash: contentHash(review.companySlug, review.companyCountryCode, body),
      submitter_hash: fingerprint
    });
    if (error?.code === "23505") return NextResponse.json({ error: "This review has already been submitted." }, { status: 409 });
    if (error) return unavailable();
    return NextResponse.json({ message: "Thank you. Your review was submitted for moderation and is not public yet." }, { status: 202 });
  } catch { return unavailable(); }
}

