# Company review moderation

## One-time setup

1. Run `supabase/migrations/20261030_company_reviews.sql` in the project SQL editor.
2. Set `SUPABASE_SERVICE_ROLE_KEY` and a long random `REVIEW_SPAM_SECRET` in the server environment.
3. Keep the service-role key server-only. Never add it to a `NEXT_PUBLIC_` variable.

Public visitors cannot read or write the review tables directly. The public API validates submissions, stores them as `pending`, and returns only `approved` rows. Supabase RLS grants moderation access only when `public.is_admin()` is true.

## Moderation

The Supabase Table Editor can be used for the initial moderation workflow. Review `company_reviews` rows with `status = 'pending'`, remove personal information or reject the row, and approve only genuine, useful experiences. Do not edit a review in a way that changes the reviewer's meaning.

The authenticated endpoint is also available for a future admin UI:

- `GET /api/admin/reviews?status=pending`
- `PATCH /api/admin/reviews` with `{ "id": "…", "status": "approved" | "rejected", "moderationNote": "…" }`

Send the Supabase access token as `Authorization: Bearer <token>`. The endpoint uses the existing `admin_users` / `profiles` role check through RLS. It does not accept a service-role key from the browser.

Review reports are stored in `company_review_reports` and are visible only to admins. Investigate reports before changing or removing an approved review.

