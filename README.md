# SupportSphere

Production-ready Next.js MVP for global customer-support discovery, complaint-resolution tools, SEO content, monetization placements and analytics.

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

The verified public seed content works without Supabase. Published database records and public report workflows activate after Supabase is configured.

## Supabase

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local` and Vercel.
4. Keep service-role credentials server-side and use the protected automation endpoint only through Vercel Cron.

The public website has no administrator login or dashboard route. Row Level Security protects database writes.

## Google Analytics 4

Create a GA4 web data stream and set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`. Page views and custom events are ready, including search, country selection, category clicks, company views, official-support clicks, generator usage, affiliate clicks, sponsored clicks and incorrect-information reports.

## AdSense and commercial links

Ad placements are labelled and remain placeholders until approval. Once approved, set `NEXT_PUBLIC_ADSENSE_CLIENT` plus the slot variables in `.env.example`. There is no public administrator dashboard or login flow.

## Vercel deployment

1. Push this folder to a GitHub repository.
2. Import it at https://vercel.com/new.
3. Add the environment variables from `.env.example`.
4. Set `NEXT_PUBLIC_SITE_URL` to the final `https://` domain.
5. Deploy, then add the custom domain in Vercel.

## Google Search Console

1. Add the final domain as a Domain property in Google Search Console.
2. Verify it with the DNS TXT record provided by Google.
3. Submit `https://YOUR_DOMAIN/sitemap.xml`.
4. Inspect the homepage and request indexing after checking canonical URLs.

## Quality commands

```powershell
npm run typecheck
node scripts/check-links.mjs
npm run build
```
