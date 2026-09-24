# Full-Stack AI Portfolio

An original neon/glass portfolio starter for a Full Stack Developer, AI Engineer, and Machine Learning Engineer.

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

All visible portfolio content lives in `src/data/portfolio.ts`. Replace the placeholder identity, social links, projects, work history, education, achievements, photo, and contact details before publishing.

## Verification

```bash
npm test -- --run
npm run lint
npm run build
```
