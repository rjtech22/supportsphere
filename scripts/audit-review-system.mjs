import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const schema = read("supabase/migrations/20261030_company_reviews.sql");
const api = read("app/api/reviews/route.ts");
const reportApi = read("app/api/reviews/[id]/report/route.ts");
const adminApi = read("app/api/admin/reviews/route.ts");
const companyPage = read("app/[locale]/[[...segments]]/page.tsx");

const checks = [
  ["reviews table exists", schema.includes("create table if not exists public.company_reviews")],
  ["review reports table exists", schema.includes("create table if not exists public.company_review_reports")],
  ["RLS enabled", schema.includes("alter table public.company_reviews enable row level security")],
  ["anonymous access revoked", schema.includes("revoke all on public.company_reviews from anon, authenticated")],
  ["admin policy exists", schema.includes('create policy "admins manage company reviews"')],
  ["public API filters approved reviews", api.includes('.eq("status", "approved")')],
  ["new reviews are pending", api.includes('status: "pending"')],
  ["duplicate content is hashed", api.includes("contentHash(")],
  ["submission rate limit exists", api.includes("REVIEW_LIMIT_PER_DAY")],
  ["review reporting checks approved status", reportApi.includes('.eq("status", "approved")')],
  ["admin moderation uses bearer auth and RLS", adminApi.includes("Authorization: authorization")],
  ["company pages render reviews", companyPage.includes("<CompanyReviews")]
];

const failed = checks.filter(([, passed]) => !passed);
for (const [name, passed] of checks) console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
if (failed.length) process.exit(1);
console.log(`Review security audit passed: ${checks.length}/${checks.length}`);

