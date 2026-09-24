# Full-Stack Developer Portfolio Design

## Goal

Build a polished, original portfolio for a Full Stack Developer, AI Engineer, and Machine Learning Engineer using the visual language of the supplied reference: dark glass surfaces, neon lime/cyan accents, ambient grid backgrounds, motion-led hero content, and card-based storytelling.

The portfolio must use placeholder-safe content until the owner supplies a verified name, photo, contact details, and project links. Reference-person identity, contact information, and biography must not be published as if they belong to the owner.

## Stack and boundaries

- Frontend: Next.js App Router, React, TypeScript, CSS modules/global CSS, and `lucide-react` icons.
- Backend: Node.js, Express, and `pg` against Supabase PostgreSQL.
- Database: one `contact_messages` table for portfolio contact submissions.
- Frontend and backend run as separate processes in development. Next.js uses port 3000 and Express uses port 4000.
- The frontend owns presentation and local UI state. The backend owns validation, persistence, CORS, and health checks.
- No authentication or admin dashboard is included in this first slice; contact records are write-only from the public UI and can be inspected through Supabase.

## Experience design

1. Sticky navigation with theme toggle, section links, and resume CTA.
2. Hero section with rotating role text, concise positioning copy, CTA buttons, and a CSS-built profile/orbit visual that does not require a private photo.
3. Experience/Education section with tabs, timeline cards, and expandable detail text.
4. Featured Projects section with a three-card responsive carousel, technology chips, GitHub/live-demo links, dot navigation, and keyboard controls.
5. About section with biography, skills, and interests cards.
6. Achievements section with certificate placeholders that can later be replaced by real images.
7. Technical stack section with grouped skill chips.
8. Contact section with copy-to-clipboard contact cards and a validated form that submits to `POST /api/contact`.
9. Footer with internal navigation, location placeholder, and scroll-to-top action.

## Visual system

- Default theme: deep charcoal/green-black background with lime-to-cyan gradients.
- Light theme: warm off-white background with coral/red accent treatment.
- Use a responsive container capped near 1180px, generous vertical rhythm, rounded 20–28px surfaces, subtle borders, backdrop blur, and accessible focus states.
- Ambient grid, blurred radial glows, orbit rings, and scroll-reveal transitions are CSS/React effects only; avoid heavy animation dependencies.
- Respect `prefers-reduced-motion` by disabling nonessential transitions and marquee-like motion.

## Data model

```sql
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
```

The API accepts `{ name, email, subject?, message }`, trims values, enforces name/message length limits, validates email format, and returns a safe success/error payload without exposing database details.

## Quality requirements

- All portfolio content is centralized in typed data modules.
- Contact validation is covered by unit tests before implementation.
- Project carousel and role rotation are deterministic and testable.
- `npm run lint`, `npm test`, and `npm run build` must pass before completion.
- No credentials are committed. `.env.local` is ignored and `.env.example` documents required variables.
