# Portfolio action audit — 29 September 2026

Tested the shared working tree at `http://localhost:3000` in Brave, with a production smoke test at `https://pintuguptawebin.vercel.app/`. Each confirmed finding was sent separately to the **Analyze portfolio website** task as it was found. That task implemented the fixes; this task independently tested the browser behavior and added contact/carousel interaction coverage.

## Current result

Six frontend findings are fixed and verified locally. The production contact failure is now resolved and verified through a successful browser submission, HTTP 201 and exactly one matching database row. The contact repair redeployed the existing production baseline with a production-only database setting; the six local frontend fixes remain undeployed.

## Findings and retests

| ID | Finding | Result |
| --- | --- | --- |
| QA-01 | Skills navigation targeted certificates (`#achievements`) instead of technical skills (`#skills`). | Fixed in shared desktop/mobile navigation. Browser retest passed in both layouts. |
| QA-02 | Experience/Education tabs did not respond to arrow keys. | Added arrow/Home/End navigation, focus handling, tab/panel associations and roving tab order. Browser ArrowRight and Home retests passed; component tests cover the full keyboard behavior. |
| QA-03 | Saving light theme and reloading caused a React server/client hydration mismatch. | Deterministic hydration markup with persisted preference applied safely. Browser reload retained light theme with no warning/error logs. Storage failure and server rendering are covered by regression tests. |
| QA-04 | LMS Live Demo opened a Vercel `404 DEPLOYMENT_NOT_FOUND` page. | Removed the unavailable demo link; retained its working repository and Source Code links. No verified replacement deployment was available. Browser card retest passed. |
| QA-05 | Escape did not close the open mobile navigation. | Escape now closes the disclosure and restores focus to Open navigation. Browser retest from inside the menu passed. |
| QA-06 | A cancelled touch gesture left the carousel automatically paused indefinitely. | Cancellation now clears touch state. Hover, keyboard focus and touch pause states are independent. Original failing component test now passes, together with cancellation/hover/focus combinations. Physical-device touch was not exercised. |
| QA-07 | Production Send Message fails to save valid messages. | **Resolved in production.** Original requests failed with HTTP 500 and upstream Supabase REST 401; RLS was enabled without anonymous INSERT policies. Configured server-only Production `DATABASE_URL` and redeployed existing baseline `52bddad`. Coordinated browser submission then showed success and reset the form; Vercel logged HTTP 201 and an exact synthetic-only database query found one matching row. RLS/schema/source were unchanged and local frontend changes were excluded. See closure evidence below. |

## Browser action coverage

| Area | Checks | Result |
| --- | --- | --- |
| Main navigation | Experience/Education, Projects, About, Skills, Contact | All five desktop links checked; all five mobile links checked and close the menu. |
| Mobile menu | Open, close button, link dismissal, Escape and restored focus | Passed after QA-05. |
| Theme | Dark → light, persisted light reload, light → dark | Passed after QA-03. |
| Hero/About | View My Projects, Get In Touch, Let's connect | Correct section destinations. |
| Timeline | Both tabs; expand/collapse for both experience and both education entries | Passed. Keyboard focus/selection retested after QA-02. |
| Carousel selectors | All 16 project dots | Each activates the corresponding project. |
| Carousel navigation | Next, previous, wrap, keyboard | Browser next/previous wrap and right-arrow advance passed. Automated tests also exercise all 32 forward/backward steps, touch swipes and short drags. |
| Project actions | 15 GitHub icons, 15 Source Code links, HRMS and UniEats demos | All **32** remaining project-specific outbound actions clicked and opened the expected URL after retests. |
| More projects | View More on GitHub | Opens `github.com/pintu1238`. |
| Gallery | AWS certificate, hackathon photo, DevOps certificate | All three links opened their expected PDF/image tabs. |
| Copy | Email and phone | Exact public email/phone values observed in clipboard after clicking. |
| Social profiles | GitHub, LinkedIn, LeetCode, HackerRank | All four clicked and opened their profiles. LinkedIn/LeetCode rejected non-browser probes, but worked in the signed-in browser. |
| Location | Location card | Opens Google Maps for Ludhiana, Punjab. |
| Resume | Desktop and mobile Resume actions, asset URL/type | Both actions activated; mobile menu closes. Local and production assets return HTTP 200, `application/pdf`, 94,152 bytes. Completion of the operating-system save/download dialog was not verified. |
| Email launch links | Email Pintu icon and quick email link | Both `mailto:` destinations inspected and correct. No mail-client delivery test performed. |
| Contact validation | Empty/invalid email versus valid payload | Invalid email disables Send; valid payload enables it. |
| Local contact | Pending state, successful response, cleared form | Browser showed Sending, then success and empty fields. This verifies the local UI/service response; database persistence was not independently verified because a fresh process has no configured database URL. |
| Production contact | Valid browser submission and direct HTTP POST; coordinated post-repair browser submission | Original checks failed. After repair, browser success/reset, HTTP 201 and exactly one matching stored row verified; QA-07 closed. |
| Footer | Work, About, Contact, Back to top, name/brand | Correct hash destinations verified. |
| Responsive layout | 320px, 390px, 768px, 1200px, default desktop | No document horizontal overflow in inspected states. Settled carousel exposes one, two and three cards at phone/tablet/desktop widths. |

All 15 project repository destinations and the two remaining demo destinations also returned HTTP 200. Both certificates, their previews, the hackathon image and the resume returned HTTP 200 on local and production origins.

Some rapid browser automation clicks timed out while smooth scrolling or while a project icon was outside the viewport. They were retried after bringing the complete card into view, and every project-specific outbound control then opened its expected destination. Those tool/scroll timing failures were not classified as application bugs.

## Automated verification

- `npm test -- --run`: **47 tests passed across 16 files**.
- `npm run lint`: exit 0.
- `npm run build`: exit 0; Next.js 16.3.6 production compilation, TypeScript and static generation succeeded.
- The 32-transition carousel regression exceeded Vitest's default five-second timeout during a loaded parallel suite. Its explicit limit was set to 15 seconds; the complete suite then passed.

New coverage includes contact validation, pending duplicate prevention, success/reset, server failure and retry, network failure preserving the draft, bidirectional touch swipes, short-drag rejection, full carousel wrap cycles, and touch cancellation. Related implementation-task tests cover navigation, keyboard tabs, theme hydration/storage and overlapping carousel pause conditions.

## Scope and remaining work

Local component fixes are reviewable in the working tree. Existing README/gallery/media changes were already present and were preserved. No commit or deployment was performed by this audit.

Production storage authorization was repaired to resolve QA-07. Original runtime logs established an upstream Supabase REST 401; the deployment task's policy inspection established that RLS is enabled without an anonymous INSERT policy. The actual stored anonymous key was not verified and the upstream response body was not captured, so no specific PostgREST error code or sole cause of the original 401 is claimed.

The implementation task verified a strict-TLS connection to the Supabase PostgreSQL pooler using the Supabase CA, confirmed server-side INSERT privilege, and saved only Production `DATABASE_URL` as a Vercel secret. RLS remains enabled. The deployment task redeployed the existing production baseline `52bddad`, keeping unrelated pending frontend/gallery edits out of this repair. The existing source already supports the PostgreSQL path, so no source/schema/policy change was needed.

The implementation/deployment tasks coordinated exactly one verification marker, `CODEX_PROD_CONTACT_REPAIR_20260929_A71C` with synthetic `qa-contact-a71c@example.com`, followed by an exact-row check. This tester sent no duplicate.

### Production contact closure evidence

The implementation/deployment tasks provided the following coordinated evidence:

- Deployment `dpl_DpqkuTZMSdry84RFS8j4iTMkDJrt`: Ready, existing baseline `52bddad`, serving `pintuguptawebin.vercel.app`.
- Browser UI: “Message sent. I will get back to you soon.” and cleared form fields.
- Vercel log: one `POST /api/contact` returned **201** at `2026-09-29T16:17:38.917Z`.
- Read-only, parameterized database check scoped to the exact synthetic subject and email: **one row**, expected name and message matched, `created_at` `2026-09-29T16:17:40.560Z`.
- No unrelated rows were read or deleted; the labeled verification row was intentionally retained. No duplicate verification POST was sent.

QA-07 is closed. The remaining release work is deployment of the approved local frontend changes, followed by repeating QA-01 through QA-06 on the deployed URL. The production contact repair did not deploy those frontend changes.

The initial tester submissions used synthetic `portfolio-qa@example.com` and subjects `QA-20260929-local-contact` / `QA-20260929-production-contact`. One local submission returned success without independent persistence verification; two initial production attempts returned failure. The separate coordinated repair-verification submission and its confirmed retained database row are documented above.
