# Portfolio reference visual audit

Reference: https://portfolio-nitinsingh.vercel.app/
Inspected: 2026-09-29 using live browser screenshots, rendered DOM, and computed styles.
Reviewer task: 01a0ed90-1bc8-73a1-9bd3-10adcc893239.
Implementation task: 01a0d13e-d90e-7951-9000-43a78a7ccc2e (Analyze portfolio website).

## Scope and status

Match typography, spacing, layout, theme, and interaction patterns. Keep Pintu Kumar's verified identity, portrait, resume, projects, experience, education, achievements, and links. Do not duplicate Nitin's personal content or invent records to match his counts. Different content lengths and record counts legitimately change total section/page heights.

Initial reference audit completed and measurements sent to implementation task. First local review at http://localhost:3000 completed while implementation was still changing through hot reload; follow-up corrections were sent. Verified results and pending differences are recorded below. This file is not a claim of final visual parity.

Measurements below are CSS pixels. Desktop observations use a 1280 x 720 viewport; the scrollbar reduces document content width to about 1269.6px. Mobile observations use 390 x 844 with content width about 380px. Small fractional dimensions depend on device scaling. Do not hard-code screenshot coordinates or total section heights.

## Typography and palette

| Element | Font | Desktop size / line-height | Weight / tracking |
| --- | --- | --- | --- |
| Body | DM Sans, Inter, sans-serif | 16 / 24 | 400 |
| Hero greeting | DM Sans | 20 / 28 | 600 |
| Animated role | Space Grotesk | 72 / 72 | 800, -0.03em; minimum height 1.25em |
| Hero secondary headline | Space Grotesk | 48 / 48 | 300 |
| Hero description | DM Sans | 20 / 32.5 | 400 |
| Hero CTA | DM Sans | 18 / 28 | 600 |
| Section title | Space Grotesk | 48 / 48 | 700, -0.02em |
| Section subtitle | DM Sans | 18 / 28 | 400 |
| Section badge | System monospace | 10.88 / 16.32 | 400, 0.2em, uppercase |
| Timeline title | Space Grotesk | 24 / 32 | 700 |
| Project title | Space Grotesk | 20 / 28 | 700 |
| Project description | DM Sans | 14 / 22.75 | 400 |
| About name | Space Grotesk | 30 / 36 | 700 |
| About first paragraph | DM Sans | 18 / 28 | 400 |
| About later paragraphs | DM Sans | 16 / 26 | 400 |
| Achievement title | Space Grotesk | 18 / 28 | 700 |
| Achievement description | DM Sans | 14 / 22.75 | 400 |
| Contact form title | Space Grotesk | 24 / 32 | 700 |
| Form fields | DM Sans | 16 / 24 | 400 |
| Desktop nav | DM Sans | 14 / 20 | 500 |

| Token | Dark | Light |
| --- | --- | --- |
| Page background | #0b0c0a | #f4f4f5 |
| Primary accent | #c6f432 | #dc2626 |
| Secondary accent | #5eead4 | #f87171 |
| Main text | #ecece7 | #18181b |
| Muted text | #ababa2 | #52525b |
| Surface | #1118279e | #ffffff |
| Strong surface | #111827d9 | #ffffff |
| Glass | #ffffff0d | #0000000a |
| Border | #ffffff1a | #e4e4e7 |
| Text on accent | #0b0c0a | #ffffff |

## Layout and spacing

- Order: navbar, hero, experience/education, projects, about, achievements, core skills strip, contact, footer. Navbar Skills targets achievements plus skills, not only the moving strip.
- Responsive outer containers have 24px horizontal padding. At 1440px the general container is 1280px wide. Navbar and timeline cap at 1024px. About/contact cap at 1152px. Do not use one 1180px cap everywhere.
- Desktop section vertical padding: hero 128px; experience 112px; projects 80px; about 112px; achievements/skills 80px; contact 80px. At mobile widths all are 80px.
- Some major sections are separated by a decorative divider with roughly 65px total space. Preserve dividers where shown rather than arbitrarily enlarging every section.
- Section heading block bottom margin 64px. Badge padding 4px 12px. Heading wrapper bottom margin 16px, horizontal title padding 16px. Subtitle max-width 672px. Gradient rule 80 x 4px with 20px top margin. Four 16px corner brackets sit 12px outside the heading. Large ghost labels are 96px on desktop and 60px on phones, at very low opacity.
- Page background includes ambient lime/cyan glow, grid, and small particles. Fixed reading progress line at top and active navigation highlight are visible.

### Navigation and hero

- Sticky nav outer padding 16px top and sides, inner max-width 1024px, radius 16px, padding 10px 20px desktop. Glass gradient and blur. Theme orb 44 x 44px. Links padding 6px 12px, 4px gap. Resume 14 / 20px with 10px 20px padding and 12px radius.
- Desktop hero columns are each 50% at large widths, aligned center. At medium widths copy uses 60% and visual 40%. Content has substantial top/bottom padding; do not force the entire hero to fit one screen.
- Greeting margin-bottom 8px; role margin-bottom 12px; combined role/headline block margin-bottom 24px; summary margin-bottom 32px. CTA gap 16px. CTA padding 16px 32px, radius 12px, icon gap 8px.
- Circular portrait: 224 x 224 CSS pixels desktop; scene 384 x 384. Scene scale 1.1 at large widths, 1.25 at >=1280px. Rendered portrait at 1280/1440 is 280px. Phone: portrait160px, scene320px, no scale. Portrait uses object-cover and a circular glow; concentric circular rings, orbiting dots, and small floating code labels surround it.
- Animated role types/deletes letters with blinking cursor, rather than swapping whole role strings at fixed intervals. Longer user role strings need responsive handling without distorting unrelated typography.

### Experience and education

- Heading-to-toggle gap64px; toggle-to-timeline gap64px. Toggle wrapper radius16px/padding12px; buttons16/24px padding16px32px, radius12px. Active selection lime-to-cyan gradient.
- Timeline max-width1024px, icons64px, gap32px between icon and card. Cards desktop padding32px, radius12px, lime left border4px. Sample closed reference cards are184px tall, but content drives height.
- Organization/location16/24px weight600, date16/24px weight500. Actual education selection swaps the timeline entries. Details expand on entry interaction.

### Projects

- Three cards at desktop, fewer at narrower breakpoints. Live reference has16 unique projects; user content count must follow verified records.
- At1280px a sample card is about386px wide, radius16px; inside padding32px desktop/24px phone. Track viewport has40px vertical padding and -16px horizontal margin. Title20/28px with40px icon tile and optional GitHub star badge.
- Technology tags have8px gaps. Long stacks collapse after the initial tags into a +N pill. Descriptions14/22.75px, clamped. Source/live links14/20px, footer border with16px top padding.
- Achievement callout is hidden at rest with max-height0 and opacity0. Preserve the reveal behavior for focused/active card interaction; do not make every card permanently taller.
- Side arrows about50px diameter, vertically centered, offset16px outward; visible on hover/focus. Dot8 x 8px; active dot32 x 8px. One dot per real project.
- Next-button behavior and changing active index were observed. Carousel also advances without a user click; exact timer cadence has not been measured.

### About, achievements, and skills

- About uses a1152px maximum bento grid,20px gaps, three desktop columns. Bio spans two columns and two rows; skills/interests stack in the right column. Padding32px for biography, radius16px. Paragraph gaps16px. Phone stacks all cards.
- Achievements use centered flex-wrap, not a left-aligned grid. Reference has three cards then two centered. Desktop gap32px, mobile24px; card width calc(33.333% - 24px) desktop, max448px. Do not invent five user achievements to copy its count.
- Achievement radius16px, image region192px high, object-cover, gradient over lower edge, icon tile at lower left. Body horizontal/bottom padding24px and top8px. Reference sample overall card347px high.
- Gap from achievements to skills96px. Skills heading uses the same heading treatment. Full-viewport skills marquee with24px vertical padding, edge masks, chips, continuous30-second animation. No extra four-category cards in reference.

### Contact and footer

- Contact main max-width1152px, two desktop columns,48px gap. Reference column552px at1280. Left contact cards padding24px, radius16px,16px vertical gaps, approximate106px height.
- Form outer padding32px, radius16px. Name/email share row >=768,16px gap; other fields full width. Form vertical field spacing24px. Inputs padding12px16px and radius8px; icon-bearing inputs add left padding40px. Textarea about146px high. Full-width send button18/28px, padding16px32px, radius12px.
- Name, email, message required; subject optional. Submit disabled initially. Email/phone expose copy actions. No messages were submitted to the reference.
- Social icons and direct email CTA below. Footer has identity, Work/About/Contact, back-to-top, copyright, and user location; preserve user destinations.

## Responsive evidence

- Phone390px: H1 36/40px (minimum45px block), secondary headline24/32px, greeting18/28px, summary18/29.25px. All hero copy centered. CTAs stack and remain content width (~242px and202px for reference labels), not full-width.
- H2:30/36px phone;36/40 at640px;48/48 at768px and above.
- Navbar collapses below1024px. Header contains theme and menu; Resume moves into menu. Mobile links18/28px, padding10px16px. Mobile nav expands the sticky navigation region and pushes following content down.
- At1440px: general container1280px, hero role72/72, portrait rendered280px. Avoid inferring intermediate role font sizes from a screenshot caught during a resize/type animation; inspect settled state when validating tablet.
- Reference phone screenshot had no horizontal content overflow. Restore any temporary viewport overrides after checks.

## Follow-up acceptance checks

1. Use the same viewport, theme, scroll/section, loaded fonts, and settled animation state for reference/local comparison.
2. Verify hero, timeline, first and advanced project slides, About, achievements, skills, contact, footer, and expanded mobile menu.
3. Check responsive layouts at390,768,1024,1440. Different text is expected; compare metrics, alignment, line height, column widths, and component geometry.
4. Verify local education/details, theme switch, carousel controls/dots, menu open/close, correct anchors, resume, user links, copy actions, and local form validation. Do not submit to reference or contact real people for testing.
5. Track only new actionable differences and send precise corrections to implementation task. Do not edit its code concurrently. Do not claim exact visual parity until local browser comparison is completed.

## Additional user requirement: cafe project

The implementation task relayed the user's explicit requirement to include https://cafe-websites-five.vercel.app/ in Projects. Source readback confirmed the `UniEats — Campus Food Operations` record in `src/data/portfolio.ts`, with demo `https://cafe-websites-five.vercel.app` and source `https://github.com/pintu1238/cafe-websites`. During the pending local visual review, navigate the carousel to this card, verify its rendered text and accessible demo/source destinations, and verify the demo opens the intended cafe website. Source presence is confirmed; rendered card/link verification is still pending.

The user also directly requested project-specific copy at the same approximate length as neighboring cards. The live homepage was opened successfully and showed UniEats cafeteria/menu discovery, cuisine categories, favorites, cart, order navigation, pickup messaging, and cafeteria partner navigation. Sent this 30-word description to the implementation task: "A campus cafeteria platform for discovering food outlets, browsing menus and placing pickup orders. Includes cuisine filters, favorites, cart checkout, order tracking and dedicated workflows for students and cafeteria partners." Preserve the existing card typography and clamping. Opening the demo confirms its identity, not end-to-end checkout behavior; no orders were placed.

## First local preview review

Verified in the local browser at 1280px, 390px, and 768px:

- Preview loads without a build overlay. Personal portrait is present. Main declared font families and desktop hero typography match the measured reference; portrait rendered280px.
- Extra PK header brand was initially visible because of a CSS cascade conflict. Reported it; subsequent DOM and screenshot confirmed it is now hidden.
- Desktop cards385.86px wide with32px padding,20/28px titles and14/22.75px descriptions. About max1152px/gap20px, Contact columns552px/gap48px.
- UniEats exact requested copy is rendered. Its demo points to https://cafe-websites-five.vercel.app/ and source to https://github.com/pintu1238/cafe-websites.
- Carousel has16 dots; desktop3 visible cards, phone1, tablet2. Dot15 selects UniEats, next selects LMS16, next wraps correctly to project1. Settled slide geometry is correct. Do not confuse a screenshot during a600ms transition with a permanent alignment bug.
- Phone390px and tablet768px have no document horizontal overflow. Mobile nav opens and closes when a section link is selected. Resume appears in mobile menu.
- Footer, social, email and resume destinations point to Pintu's records. Contact send button now starts disabled. No contact form submission performed.

Reported for the next implementation pass, not yet verified fixed:

1. Phone header outer12px padding vs reference16px. Expanded mobile navigation combines header/menu into one panel with left-aligned links; reference uses a separate panel8px below with centered links.
2. Phone390px scene280px vs reference320px, portrait160px in both. Local project title18/25px vs reference20/28px due max399 override.
3. Tablet768px Contact incorrectly retains two columns; reference one column until1024. Name/email should be two fields per row at768 and above.
4. Settled reference at768 has hero60/60px and portrait224px; local48/48px and201.6px due0.9scale. User's longer role strings can justify a stable two-line block, but should not cause content jumping.
5. Literal0 GitHub star badges in source should be removed or backed by verified repository data.
6. Contact phone padding16px vs reference24px; desktop helper below value makes contact cards taller. Form heading arrangement also differs (local icon/left alignment vs reference centered text).
7. Desktop About reference bio761.325px/right370.675px vs local754.66px/right377.34px. Tablet nested .aboutSide already provides two side cards, so its top-level single-column wrapper is not itself a failure.

Achievement images were awaiting a separate asset task during the first pass. The completed review below supersedes those pending findings.

## Final local visual review

Completed against http://localhost:3000/ on September 29, 2026. Final feedback sent to the implementation task. No remaining blocking visual discrepancy was found in the inspected desktop1280/1024, phone390 and tablet768 layouts.

- Previously reported header, expanded menu, phone scene/project title, tablet hero/contact, contact padding, About columns and static star-count issues are resolved. Desktop About now has three equal370.66px columns with biography spanning761.33px; tablet side cards344.8px each. Contact is709.6px single-column at768, with name/email314px each. Tablet hero60/60px with224px portrait; phone scene320px with160px portrait.
- Phone header16px inset; expanded menu is a separate rounded panel with8px gap,12px padding and centered links. Selecting a section closes it. Phone project titles20/28px and contact cards24px padding.
- All five gallery images load. Desktop uses centered3+2 arrangement; tablet2+2+1; phone stacks all five. Certificates use contain fitting and illustrations cover fitting. Both original certificate PDF URLs and resume return200 with application/pdf. AI-edited illustrations are clearly labeled.
- Final polish verified after reload: short GALLERY ghost label; stage image object-position50%20% keeps both foreground heads visible; skills uses one horizontal flex row, with duplicate sets on the same vertical coordinate for looping.
- No document horizontal overflow at inspected widths. No browser warning/error output in the final inspected session. Both theme palettes match the measured reference tokens.
- Form validation disables Send for invalid email and enables it with valid required fields. Reviewer did not submit a message. Reload cleared review-only form values and restored disabled Send. Implementation task separately reports a successful temporary end-to-end contact test and cleanup; this is its report, not an independently repeated reviewer test.
- UniEats card15 renders the exact30-word project-specific description above, with correct cafe demo and repository links. All16 carousel dots,3/2/1 visible-card behavior and last-to-first wrap were verified in the earlier completed local pass. The earlier rendered-card verification pending note is resolved.

Personal content length naturally changes line breaks and section heights. A stable two-line hero role area accommodates the user's longer titles; certificates preserve readable uncropped content. These intentional content differences mean this review does not claim screenshot-identical output. No production deployment was reviewed. Companion review and feedback are complete; pause the review heartbeat rather than repeatedly requesting cosmetic changes.
