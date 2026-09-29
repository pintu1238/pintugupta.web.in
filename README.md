# Full-Stack AI Portfolio

Pintu Kumar's portfolio for Full Stack Development, AI Engineering and Machine Learning, with a reference-matched neon/glass layout.

## Stack

- Next.js App Router + React + TypeScript
- Node.js + Express API
- Supabase PostgreSQL via `pg`
- Vitest for unit tests

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env` in the project root from `.env.example` and fill in your private Supabase connection string. Do not commit it.

   ```env
   DATABASE_URL=postgresql://postgres:<password>@<project-ref>.supabase.co:5432/postgres
   NEXT_PUBLIC_API_URL=http://localhost:4000
   PORT=4000
   FRONTEND_ORIGIN=http://localhost:3000
   ```

3. Apply the contact table migration:

   ```bash
   npm run db:migrate
   ```

4. Start the frontend and API together:

   ```bash
   npm run dev
   ```

   - Frontend: `http://localhost:3000`
   - API health: `http://localhost:4000/api/health`

## Content customization

Personal content lives in `src/data/portfolio.ts`, sourced from the supplied resume and public GitHub repositories. The project carousel contains 16 projects: three from the resume, HRMS.sh, and twelve selected GitHub projects, including UniEats.

The original resume is served at `/Pintu_Kumar_Resume.pdf`; the supplied portrait is `/pintu-kumar.jpg`. Resume education dates are preserved as supplied. Update them here when they change.

The three-card gallery combines two original certificates and a supplied hackathon photo with the user's reported Top 10 result. Certificate previews link to the original PDFs. The On Stage and Community & Curiosity illustrations are no longer displayed; original media provenance and certificate dates are documented in `docs/portfolio-media-handoff-2026-09-29.md`.

On Vercel, `/api/*` is served by the API functions in `api/`. Outside Vercel, the frontend proxies `/api/*` to Express on port 4000 by default. For separate production hosting, set `API_INTERNAL_URL` to the backend URL before building, or use `NEXT_PUBLIC_API_URL` for direct browser-to-API requests. Keep the PostgreSQL connection string on the backend only.

## Contact email notifications

Contact submissions are saved to `contact_messages`, then an email notification is awaited over authenticated Gmail SMTP (TLS, port 465). Configure these **server-only Production environment variables** in Vercel and redeploy:

- `SMTP_USER`: Gmail sender account.
- `SMTP_PASS`: that account's Google App Password, stored as a Secret (never your normal Google password; never commit it).
- `CONTACT_NOTIFICATION_TO`: `pintugupta99880@gmail.com`.

The sender and recipient may differ. Visitors' email addresses are used only as Reply-To; the recipient cannot be controlled by the form. Email contains plain text, and no SMTP credentials are exposed to the browser. Use the same variables in an ignored local `.env` to enable notifications in Express.

If email settings are absent, storage still works without notification. If SMTP fails, the saved message remains available in Supabase and the API still returns success to prevent duplicate submissions. Check Vercel runtime logs for `Contact saved; email notification failed.` Notifications are best-effort, with no automatic retry or historical backfill. Gmail acceptance is logged separately and is not a guarantee of inbox placement; check Spam as well.

## Responsive layout

The 12 screen-size bands in `src/app/globals.css` cover extra-small phones through ultra-wide desktops. Project cards use 1 column below 768px, 2 up to 1199px, and 3 from 1200px. Menu, hero, gallery and form layouts scale independently for readability. The 361px boundary belongs to the 361–575px band.

Browser checks, breakpoint coverage and regression details are in `docs/responsive-verification-2026-09-29.md`.

## Verification

```bash
npm test -- --run
npm run lint
npm run build
```
