# ResolveNexa Review Production Check

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
| Supabase Auth users | BLOCKED | Production contains `0` Auth users, `0` active `admin_users` rows and `0` admin profiles. No legitimate identity exists to authenticate the admin API. |
| Application admin sign-in UI | MISSING | The repository contains the admin review API and Supabase browser client, but no `/admin/login`, sign-up or session UI. |
| Rejected review visibility | PASS | Production contains one rejected QA row; Dell's public page shows the empty approved-review state. |
| Approved review display | BLOCKED | There is no genuine approved production review. Fake QA content was not approved merely to exercise the UI. |
| Approved count and rating average | LOCAL PASS | The UI now derives count and average only from the approved-only API response. This necessary code change is local and has not been pushed or deployed. |
| Desktop Dell page | PASS | Live desktop DOM exposes the complete accessible form, country/rating/date fields, privacy warning and empty approved-review state. |
| Mobile review layout | CODE PASS | At `600px` and below, the form fields and summary stack to one column. A physical mobile-device submission was not performed. |
| Production build after local UI change | PASS | Next.js production build completed successfully and generated 384 static pages. |

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
| Admin queue with legitimate admin bearer token | Not run | BLOCKED: no Auth/admin identity exists |

## Supabase access-control result

- RLS is enabled on the review table.
- `anon` has no table privileges.
- `authenticated` has SELECT/UPDATE/DELETE table grants, but the only RLS policy permits them when `public.is_admin()` is true.
- Ordinary authenticated users therefore cannot read, modify or delete review rows through Supabase.
- Public submissions use the validated server endpoint and the service key; visitors never receive that key.
- Review reports use the same admin-only RLS condition.

## Remaining limitations

1. **No application admin identity or sign-in UI is configured.** Production counts are `auth.users = 0`, active `admin_users = 0`, and admin `profiles = 0`; the codebase also has no admin login/session route. Dashboard/SQL moderation works, but `/api/admin/reviews` cannot be tested end to end until the real site owner creates a legitimate Auth identity, explicitly promotes it, and uses an approved secure sign-in/token flow.
2. **24-hour rate limit was not exhausted.** Duplicate and unsafe-content checks were tested. Creating multiple additional production rows solely to force the three-per-day limit was avoided.
3. **Report-review flow needs a genuine approved review.** The QA review was intentionally rejected and never made public, so the public report button was not submitted against fake content.
4. **Approved-review rendering cannot be proven in production yet.** There are no genuine approved reviews. The API and client code both consume only approved rows, and rejected content is confirmed hidden.
5. **Physical mobile-device testing remains outstanding.** Responsive CSS was inspected and the production desktop form was verified; no physical mobile submission was made.
6. **Approved count/average UI is not deployed.** The local implementation passed the production build, but this report update and UI change remain unpushed as requested.

## Exact legitimate administrator setup

Do not create a placeholder or fake administrator. Use the real site owner's email and a password known only to that owner.

1. The application currently has no login/sign-up UI. In **Supabase → Authentication → Users**, choose **Add user → Send invitation** for the legitimate site owner's real email. The owner must open the invitation and set their own password; do not invent or retain a password on their behalf.
2. Copy the resulting Auth user UUID and verify that the email belongs to the intended owner.
3. In Supabase SQL Editor, run this once with that exact UUID:

```sql
insert into public.admin_users (user_id, active)
values ('REAL_AUTH_USER_UUID', true)
on conflict (user_id) do update set active = excluded.active;
```

4. Confirm exactly one intended row exists:

```sql
select au.user_id, au.active, u.email
from public.admin_users au
join auth.users u on u.id = au.user_id
where au.active;
```

5. Choose one secure authentication path before using the admin API:
   - continue moderating through the protected Supabase dashboard; or
   - implement and deploy a secure owner-only admin login/session UI; or
   - use a local trusted Supabase client to sign in as the owner and obtain a short-lived access token for API verification.
6. Never put the service-role key in a browser or use it as the admin bearer token.
7. Call `GET /api/admin/reviews?status=pending` with `Authorization: Bearer <access-token>`; expect `200` for the promoted owner.
8. Call the same endpoint with a normal authenticated user; expect `403`.
9. Moderate one genuine pending review with `PATCH /api/admin/reviews`, then confirm it appears only after approval. Reject test, abusive or privacy-violating submissions.
10. Deactivate access by setting `active = false`; do not delete Auth identities merely to revoke admin rights.

Do not make all authenticated users administrators.

## Files inspected

- `supabase/migrations/20261030_company_reviews.sql`
- `supabase/schema.sql`
- `app/api/reviews/route.ts`
- `app/api/reviews/[id]/report/route.ts`
- `app/api/admin/reviews/route.ts`
- `components/CompanyReviews.tsx`
- `app/globals.css`
- `lib/reviews.ts`
- `.env.example`

## Final status

The public production review pipeline is working: submit, validate, store pending, hide from public display, and moderate to rejected. A legitimate Auth/admin identity is still required before authenticated admin API verification and real-review approval can be completed. The approved-only count/average UI change builds successfully but remains local pending approval to push and deploy.
