import { createHash, createHmac } from "node:crypto";
import type { NextRequest } from "next/server";

export const REVIEW_MIN_LENGTH = 40;
export const REVIEW_MAX_LENGTH = 1500;
export const REVIEW_LIMIT_PER_DAY = 3;

export function normalizeReviewBody(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function contentHash(companySlug: string, companyCountryCode: string, body: string) {
  return createHash("sha256")
    .update(`${companyCountryCode}:${companySlug}:${normalizeReviewBody(body).toLowerCase()}`)
    .digest("hex");
}

export function requestFingerprint(request: NextRequest) {
  const secret = process.env.REVIEW_SPAM_SECRET;
  if (!secret) throw new Error("REVIEW_SPAM_SECRET is not configured.");
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  return createHmac("sha256", secret).update(`${forwarded}|${userAgent}`).digest("hex");
}

export function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const allowed = new Set([new URL(request.url).origin]);
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) {
    try { allowed.add(new URL(configured).origin); } catch { /* Invalid configuration is not trusted. */ }
  }
  return allowed.has(origin);
}

export function looksUnsafe(value: string) {
  const links = value.match(/https?:\/\/|www\./gi)?.length || 0;
  const email = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(value);
  const repeated = /(.)\1{9,}/i.test(value);
  return links > 0 || email || repeated;
}

export function validStartedAt(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) return false;
  const elapsed = Date.now() - value;
  return elapsed >= 3000 && elapsed <= 2 * 60 * 60 * 1000;
}

