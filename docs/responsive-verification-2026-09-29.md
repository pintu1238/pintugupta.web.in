# Responsive verification — September 29, 2026

## Scope

Approved update of the existing portfolio, preserving its colors, content, section order and visual style. Responsive changes are local working-tree changes on top of the deployed content update; this report is not a deployment claim.

## Breakpoint behavior

The 12 requested ranges are defined in `src/app/globals.css`. Exclusive upper bounds also cover fractional CSS pixels without gaps. The overlapping 361px boundary was resolved as approved: 321–360px, then 361–575px.

| Range | Maximum outer container | Hero | Project cards |
| --- | --- | --- | --- |
| 1920px+ | 1600px | Two columns | 3 |
| 1680–1919px | 1536px | Two columns | 3 |
| 1600–1679px | 1440px | Two columns | 3 |
| 1400–1599px | 1280px | Two columns | 3 |
| 1300–1399px | 1248px | Two columns | 3 |
| 1200–1299px | 1184px | Two columns | 3 |
| 992–1199px | 1104px | Two columns | 2 |
| 768–991px | 880px | Stacked | 2 |
| 576–767px | 704px | Stacked | 1 |
| 361–575px | 544px | Stacked | 1 |
| 321–360px | 360px | Stacked | 1 |
| 320px and below | 320px | Stacked | 1 |

Containers always shrink to the available width. Navigation switches to a scrollable menu below 992px; contact and About stack below 1200px; contact name/email fields remain side by side at 768px and above. Gallery layout is three cards per row at 1200px and above, two at tablet widths, one below 768px. Typewriter roles share an invisible sizing grid, preventing content jumps as words are typed/deleted.

## Verification performed

- Brave development preview and a separate `next start` production preview: 27 requested viewport widths each — 280, 320, 321, 360, 361, 390, 575, 576, 767, 768, 991, 992, 1024, 1199, 1200, 1299, 1300, 1399, 1400, 1536, 1599, 1600, 1679, 1680, 1919, 1920, 2560.
- The local Brave viewport adapter rounded the requested 321px and 361px widths to reported `innerWidth` values of 322px and 362px. Both selected the correct intended CSS bands. Fractional carousel boundaries are additionally covered by a regression test at 767.6px.
- After responsive layout/transition settling: no document horizontal overflow, no content-box overflow in the audited hero, headings, tabs, timeline, active project cards, About, gallery, contact and footer; interactive carousel cards matched the visual column count at every width.
- Visual screenshot checks at 320px, 768px, 992px and 1920px. Tablet light theme and restored dark theme checked.
- At 320px, Experience/Education controls fit within their container; education cards remain readable. At 576×320 landscape, the expanded menu scrolls and its final Contact/Resume links remain keyboard accessible.
- Fresh production browser console: no warnings or errors.
- `npm run lint`: passed. `npm test -- --run`: 20 tests across 9 files passed. Production compilation/TypeScript/static generation passed and the resulting build was served successfully for the production viewport audit.

## Regression evidence

Before changes, the tabs exceeded the 320px content area and the 280px page exceeded its viewport. Carousel tests first failed because the old 1024px threshold exposed three cards too early and rounded `innerWidth` did not agree with fractional CSS media queries. A further test reproduced blocked navigation when resize interrupted the last-to-first transition.

`src/components/ProjectsSection.test.tsx` now covers breakpoint changes, fractional widths, and interrupted wrap recovery, including canonical track position and disabled transition during the resize. All three new tests pass. A read-only code review found no blocking issue; its image-size alignment and resize assertion suggestions were applied.

## Repeat checks

Run `npm run lint`, `npm test -- --run`, and `npm run build`. Serve the build with `node node_modules/next/dist/bin/next start --port 3001`. Recheck the viewport matrix, both sides of each responsive boundary, menu access in short landscape, all carousel controls, and the contact form without sending an external test message.
