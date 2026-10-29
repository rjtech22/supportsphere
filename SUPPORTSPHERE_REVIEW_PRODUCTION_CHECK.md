# SupportSphere Review Production Check

Audit date: 2026-10-30  
Production site: `https://supportsphere-one.vercel.app`  
Scope: Dell company review UI, Vercel configuration, Supabase storage, moderation, validation and access controls.

## Executive result

**Production review submission is operational.** The Supabase migration is applied, the required server-only Vercel secrets are configured, the corrected production deployment is ready, and the live review API connects successfully.

A clearly labelled QA review was accepted as `pending`, remained absent from the public API, and was then changed to `rejected`. Test content was never approved or displayed publicly. No secret value is included in this report, frontend code or test output.

## Verified production checks

| Check | Result | Evidence |
|---|---|---|
| Dell review UI deployed | PASS | Live Dell page includes the review form. |
| Review migration applied | PASS | `company_reviews` and `company_review_reports` are available in the production Supabase project. |
| Vercel server variables | PASS | `SUPABASE_SERVICE_ROLE_KEY` and `REVIEW_SPAM_SECRET` are present in Production. |
| Correct service key deployed | PASS | The full Supabase backend key was stored as a write-only Vercel secret and a new Production deployment completed successfully. |
| Production review GET | PASS | `GET /api/reviews?company=dell&country=us` returned `200` with `{"reviews":[]}`. |
| Production submission | PASS | A same-origin QA submission returned `202` and the moderation-required message. |
| Stored review fields | PASS | Supabase stored Dell/US, reviewer country US, optional rating, hashes and `status = 'pending'`. No raw IP column is used. |
| Pending review hidden publicly | PASS | Public GET remained `{"reviews":[]}` after submission. |
| Duplicate prevention | PASS | Repeating the exact QA review returned `409`. |
| Link/email spam validation | PASS | A review containing a URL returned `400`. |
| Moderation state change | PASS | The QA row was changed from `pending` to `rejected`; it was never approved. |
| RLS enabled | PASS | `pg_class.relrowsecurity` is true for `company_reviews`. |
| Anonymous direct access | PASS | Anon has no SELECT, INSERT, UPDATE or DELETE table privileges. |
| Authenticated direct insert | PASS | Authenticated users have no direct INSERT privilege. |
| Admin-only modification policy | PASS | Review and report policies use `is_admin()` for both `USING` and `WITH CHECK`. |
| Public PATCH/DELETE | PASS | Public review endpoint does not implement update or delete methods. |

## Endpoint results

| Test | Actual | Result |
|---|---:|---|
| Approved-review GET after deployment | 200 | PASS |
| Valid QA submission | 202 | PASS |
| Pending QA review public visibility | 0 public rows | PASS |
| Exact duplicate submission | 409 | PASS |
| Review containing a URL | 400 | PASS |
| POST without same-origin header | 403 | PASS |
| Invalid/short review POST | 400 | PASS |
| Public PATCH | 405 | PASS |
| Public DELETE | 405 | PASS |
| Admin queue without bearer token | 401 | PASS |

## Supabase access-control result

- RLS is enabled on the review table.
- `anon` has no table privileges.
- `authenticated` has SELECT/UPDATE/DELETE table grants, but the only RLS policy permits them when `public.is_admin()` is true.
- Ordinary authenticated users therefore cannot read, modify or delete review rows through Supabase.
- Public submissions use the validated server endpoint and the service key; visitors never receive that key.
- Review reports use the same admin-only RLS condition.

## Remaining limitations

1. **No application admin identity is configured.** Supabase Authentication currently has no promoted SupportSphere admin user. Dashboard/SQL moderation works, but `/api/admin/reviews` cannot be tested end to end with an administrator bearer token until an Auth user is created and added to `admin_users`.
2. **24-hour rate limit was not exhausted.** Duplicate and unsafe-content checks were tested. Creating multiple additional production rows solely to force the three-per-day limit was avoided.
3. **Report-review flow needs a genuine approved review.** The QA review was intentionally rejected and never made public, so the public report button was not submitted against fake content.
4. **Mobile backend behavior is shared and operational.** Responsive styles are present, but a physical mobile-device submission was not performed in this audit.

## Optional admin activation

When an administrator account is wanted:

1. Create the intended user in Supabase Authentication.
2. Add only that user's UUID to `public.admin_users` with `active = true`.
3. Sign in and verify `/api/admin/reviews` lists pending reviews.
4. Verify a normal authenticated user receives no review-table access.

Do not make all authenticated users administrators.

## Files inspected

- `supabase/migrations/20261030_company_reviews.sql`
- `supabase/schema.sql`
- `app/api/reviews/route.ts`
- `app/api/reviews/[id]/report/route.ts`
- `app/api/admin/reviews/route.ts`
- `components/CompanyReviews.tsx`
- `lib/reviews.ts`
- `.env.example`

## Final status

The public production review pipeline is working: submit, validate, store pending, hide from public display, and moderate to rejected. The remaining optional setup is an application admin Auth identity for the admin API/dashboard workflow.
