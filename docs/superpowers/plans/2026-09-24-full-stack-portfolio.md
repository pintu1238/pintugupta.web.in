# Full-Stack Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an original, responsive portfolio for a Full Stack Developer / AI Engineer / Machine Learning Engineer with a Next.js frontend, Express backend, and Supabase PostgreSQL contact persistence.

**Architecture:** A Next.js App Router frontend renders typed portfolio data and owns theme, carousel, tabs, scroll-reveal, and form UX. A separate Express API on port 4000 validates and inserts contact submissions through `pg`; the database schema is applied through a small migration script. Development runs both services with `concurrently`.

**Tech Stack:** Next.js, React, TypeScript, Express, `pg`, Supabase PostgreSQL, Vitest, ESLint, `lucide-react`, CSS, and `tsx`.

**Spec:** `docs/superpowers/specs/2026-09-24-full-stack-portfolio-design.md`

## Global Constraints

- Frontend uses Next.js App Router and TypeScript.
- Backend uses Node.js and Express on port 4000.
- Database access uses `DATABASE_URL`; credentials must never be hardcoded or committed.
- Content stays placeholder-safe until the owner provides verified personal details.
- `npm run lint`, `npm test`, and `npm run build` must pass before completion.
- Respect `prefers-reduced-motion` and provide keyboard-visible focus states.

### Task 1: Project foundation and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `server/.env.example`

**Interfaces:**
- Produces npm scripts `dev`, `dev:frontend`, `dev:backend`, `build`, `start`, `lint`, `test`, and `db:migrate`.
- Produces a Vitest environment able to test TypeScript modules and server validation.

- [ ] **Step 1: Write configuration files and scripts.**
- [ ] **Step 2: Install runtime and development dependencies with `npm install`.**
- [ ] **Step 3: Run `npm test -- --run` and confirm the empty harness is callable.**
- [ ] **Step 4: Run `npm run lint` and confirm the configured lint command is callable.**

### Task 2: Portfolio data and pure domain behavior

**Files:**
- Create: `src/data/portfolio.ts`
- Create: `src/lib/portfolio.ts`
- Create: `src/lib/portfolio.test.ts`

**Interfaces:**
- `getProjectPage(projects, page, pageSize)` returns `{ items, page, pageCount }`.
- `getNextIndex(current, count, direction)` returns a wrapped carousel index.
- `roleRotator` data contains safe placeholder roles and no reference-person contact data.

- [ ] **Step 1: Write failing tests for page boundaries and carousel wrapping.**
- [ ] **Step 2: Run `npm test -- --run src/lib/portfolio.test.ts` and verify failure because functions are absent.**
- [ ] **Step 3: Implement the typed data and pure helpers.**
- [ ] **Step 4: Run the focused test and verify it passes.**
- [ ] **Step 5: Add all visible section data: hero, experience, education, projects, skills, achievements, interests, and contact placeholders.**

### Task 3: Express API and database migration

**Files:**
- Create: `server/db.js`
- Create: `server/validation.js`
- Create: `server/validation.test.js`
- Create: `server/routes/contact.js`
- Create: `server/index.js`
- Create: `server/migrations/001_create_contact_messages.sql`
- Create: `scripts/migrate.js`

**Interfaces:**
- `validateContactPayload(payload)` returns `{ ok: true, value }` or `{ ok: false, errors }`.
- `POST /api/contact` accepts `{ name, email, subject?, message }` and returns HTTP 201 with `{ ok: true }` on insert.
- `GET /api/health` returns `{ ok: true, service: 'portfolio-api' }`.

- [ ] **Step 1: Write failing validation tests for required fields, invalid email, trimming, and length limits.**
- [ ] **Step 2: Run `npm test -- --run server/validation.test.js` and verify the expected failure.**
- [ ] **Step 3: Implement validation and the Express route with parameterized SQL.**
- [ ] **Step 4: Run the focused tests and verify they pass.**
- [ ] **Step 5: Add the SQL migration and migration runner using `DATABASE_URL` without logging its value.**
- [ ] **Step 6: Run `npm run db:migrate` with the user-provided connection string supplied only through the process environment; verify the migration exits successfully or report the concrete database error.**

### Task 4: Frontend shell, theme, and global visual system

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/components/ThemeProvider.tsx`
- Create: `src/components/SectionHeading.tsx`
- Create: `src/components/ScrollReveal.tsx`

**Interfaces:**
- `ThemeProvider` exposes `theme` and `toggleTheme` through a React context and persists only the theme preference.
- `SectionHeading` accepts `eyebrow`, `title`, and `description`.
- `ScrollReveal` progressively applies a visible class through IntersectionObserver and is inert under reduced motion.

- [ ] **Step 1: Write the shell test for the section heading text and theme provider initial state.**
- [ ] **Step 2: Run the focused test and verify it fails before component implementation.**
- [ ] **Step 3: Implement layout metadata, theme context, base CSS, grid background, gradients, cards, buttons, chips, responsive breakpoints, and focus states.**
- [ ] **Step 4: Run the focused test and verify it passes.**

### Task 5: Interactive portfolio sections

**Files:**
- Create: `src/components/PortfolioNav.tsx`
- Create: `src/components/Hero.tsx`
- Create: `src/components/ExperienceSection.tsx`
- Create: `src/components/ProjectsSection.tsx`
- Create: `src/components/AboutSection.tsx`
- Create: `src/components/AchievementsSection.tsx`
- Create: `src/components/SkillsSection.tsx`
- Create: `src/components/ContactSection.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- `ProjectsSection` uses `getProjectPage` and `getNextIndex` and exposes accessible previous/next/dot controls.
- `ContactSection` posts JSON to `${NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}/api/contact`, shows field errors, loading state, and success/failure status.
- `ExperienceSection` toggles `experience`/`education` and expands one timeline item at a time.

- [ ] **Step 1: Write focused tests for carousel wrapping and contact request state.**
- [ ] **Step 2: Run them and verify they fail for missing components/behavior.**
- [ ] **Step 3: Implement the sections using typed data, semantic headings, and keyboard-accessible controls.**
- [ ] **Step 4: Run focused tests and verify they pass.**
- [ ] **Step 5: Add reduced-motion CSS and mobile layout adjustments.**

### Task 6: Integration verification and handoff

**Files:**
- Modify: `.env.example`
- Modify: `README.md`

- [ ] **Step 1: Add setup instructions for `DATABASE_URL`, `NEXT_PUBLIC_API_URL`, migration, and both dev processes.**
- [ ] **Step 2: Run `npm test -- --run` and record the complete result.**
- [ ] **Step 3: Run `npm run lint` and record the complete result.**
- [ ] **Step 4: Run `npm run build` and record the complete result.**
- [ ] **Step 5: Start frontend/backend locally and verify the home page, `/api/health`, and contact validation through the browser/HTTP client without exposing credentials.**
