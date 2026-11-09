# facelit-site

facelit.in migrated from WordPress to Next.js (App Router) on Vercel.

**How it works:** `scripts/scrape.mjs` snapshotted every live URL (226) into `content/pages/*.json` (exact SEO head + body HTML)
and mirrored theme/uploads assets to `public/wp-content/...` (same paths, so old asset URLs keep working; jpg/png converted to webp
by `scripts/webp.mjs`, old extensions rewritten in `next.config.ts`). `app/[[...slug]]/route.ts` serves each page as static HTML
(no React hydration, which is what keeps Lighthouse mobile high). To edit copy, edit the JSON `bodyHtml` / `head` of that page.

- Leads: `app/api/{booking,whatsapp-go,call-go}` -> `lib/lead.ts` -> Resend. Honeypot field `website`.
- `proxy.ts`: `/?p=ID` -> 301 slug. `next.config.ts`: `/feed`, `/tag/*` -> `/blog/`, `trailingSlash: true`.
- Schema: MedicalBusiness/LocalBusiness for the 3 clinics in `lib/clinics.ts` (location pages + home).
- Check parity with live: `npm run build && npm start` then `node scripts/verify.mjs http://localhost:3000`.

## Deploy
1. Vercel env vars: see `.env.example` (`RESEND_API_KEY` is required).
2. Review on the *.vercel.app URL: run Lighthouse mobile, submit a test lead, check the email arrives.
3. Domains: add facelit.in + www.facelit.in in Vercel, then set DNS to the values Vercel shows. Keep WordPress for 1 week.
4. Search Console: submit https://facelit.in/sitemap.xml, watch Coverage.
