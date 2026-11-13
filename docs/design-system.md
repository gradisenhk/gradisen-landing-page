# Gradisen design system

Version 1, 11 November 2026.

This applies to the current site and to the multipage build described in
[gradisen-multipage.md](plans/gradisen-multipage.md). Tokens live in
`tailwind.config.js`; this document is the rulebook for how they are used. If a
page needs a pattern that is not here, add it here first, then build it.

## 1. Principles

1. The product is the subject. Photography, screens and copy carry the page;
   the surrounding interface stays quiet.
2. One primary action per view. Amber is reserved for the thing you want
   clicked.
3. Say it once. A label that repeats its content is removed, not restyled.
4. Nothing decorative without a job. If an element can be deleted without
   losing information, delete it.

## 2. Foundations

### Colour

| Token | Value | Use | Limits |
| --- | --- | --- | --- |
| `brand.primary` | `#F59E0B` | Primary action fill, section rule, active nav, one accent per block | Never small body text on white |
| `brand.primaryDark` | `#D97706` | Hover for primary actions | Hover only |
| `text.primary` | `#111827` | Headings, button label on amber | |
| `text.secondary` | `#4B5563` | Body copy | |
| `text.muted` | `#6B7280` | Metadata, hints | |
| `border` / `border.dark` | `#E5E7EB` / `#D1D5DB` | Card borders, inputs | |
| `surface` | `#FFFFFF` | Unused: content no longer sits in cards | |
| `band` | `#F8F9FA` | Alternating section band | |
| `background.tertiary` | `#F3F4F6` | CVP band | Frozen |
| `footer` | `#3A3E3E` | Footer, scrolled header | |

Contrast, measured:

- White on amber is 2.15:1. It fails AA for any text size. Use ink
  (`#111827`, 7.6:1) for labels on amber, or keep amber for large display
  type and icons.
- Amber on `#3A3E3E` is 5.4:1. Amber text and icons are fine on the dark
  chrome; amber copy on white is not.

Defined but unused tokens: `brand.secondary`, `brand.accent`, `surface.dark`,
`surface.light`, `border.light`, `text.disabled`, `font.mono`,
`animate-scanline`. Do not adopt one without a real consumer; prefer deleting
it.

### Typography

Declared stack is Inter, then the system sans. No webfont is loaded, so the
site currently renders in the platform system font. Keeping it that way is
fine; loading Inter later means adding it with `display: swap` and rechecking
the hero.

| Role | Classes | Notes |
| --- | --- | --- |
| Hero and page `h1` | `text-[2.25rem]/[1.35] font-medium tracking-tight sm:text-[3rem]/[1.35]` | Line height must be bound to the size, `/1.35`; a separate `leading-*` loses at breakpoints |
| Section `h2` | `text-3xl md:text-4xl font-bold` | Centred, followed by the 12 × 4 px rule |
| Subsection `h3` | `text-xl md:text-2xl font-bold` | Left aligned or centred with its block |
| Card title | `font-semibold`, one step larger than body | Never bold plus italic |
| Body | `text-base leading-relaxed text-text-secondary` | Cards may use `text-sm` |
| Meta | `text-xs text-text-muted` | Hints, captions, timestamps |
| Role label | `text-sm font-semibold uppercase tracking-wide text-brand-primary` | Allowed only for 2 to 4 word role and column labels |

CVP headings (`text-4xl md:text-5xl`) are frozen with that section.

Uppercase is allowed for short role and column labels, never for headlines,
buttons or body copy, and never in a kicker above a headline.

### Layout and spacing

- Section shell: `<section className="px-4 py-20">`, inner
  `mx-auto max-w-6xl`. The hero is the only full-bleed, full-height block.
- Vertical rhythm: `mt-8` from a block title to its content, `mt-12` to
  `mt-16` between major blocks. List rows use `py-8` with a `border-b`.
- Fixed header is 64 px; anchor targets need `scroll-margin-top: 5rem`
  (already global for `section[id]`).
- Page width stops at 1152 px; do not add a second container width.
- Breakpoints: verify every new page at 390 px and 1280 px.

### Radius, elevation, motion

| Token | Use |
| --- | --- |
| `rounded-md` | Controls: buttons, inputs, dropdown panel |
| `rounded-full` | Section rule and the scroll cue. Never for text badges |
| `shadow-sm` | Buttons only |
| `shadow-md` | Sticky header |
| `shadow-xl` | Popovers and dropdowns only |
| 200 ms | Colour, opacity, icon shifts |
| 300 ms | Background fills |

No entrance animations, parallax or looping decoration. Honour
`prefers-reduced-motion` for anything that does move.

### Icons

Material Symbols only, loaded in `index.html`.

- Inline with text: `style={{ fontSize: '1.1em', lineHeight: 1 }}`.
- Standalone section icon: `1.5rem` to `1.75rem`.
- Every icon is `aria-hidden="true"`; the label lives in text or
  `aria-label`.
- One icon per block, one per navigation item. No icon plus emoji.

## 3. Components

### Buttons

Primary, used once per view:

```
inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary
px-6 py-3 text-sm font-semibold text-text-primary shadow-sm
transition-colors duration-300 hover:bg-brand-primaryDark
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
focus-visible:ring-offset-2
```

Secondary, inside a section:

```
inline-flex items-center gap-2 rounded-md border border-brand-primary
px-5 py-2.5 text-sm font-semibold text-brand-primary
transition-colors duration-300 hover:bg-brand-primary hover:text-text-primary
```

Quiet link, white on photography:

```
inline-flex items-center gap-2 text-sm font-semibold text-white/85
hover:text-brand-primary
```

States: hover, `focus-visible` ring, `disabled` at 60 % opacity with
`cursor-not-allowed`. Never combine a border, a shadow and
a gradient in one button, and never place two filled buttons in the same view.

### Content blocks

Content is not wrapped in cards. Separate blocks with hairlines and spacing:

```
border-t border-border py-8
md:grid-cols-[4rem_14rem_1fr] md:items-baseline md:gap-8
```

- A block may sit on `bg-band`; the band has no radius, border or shadow.
- Related lists use `border-t` on the container and `border-b` on each row.
- Columns split with `md:divide-x md:divide-border`.

One icon maximum per block, plain amber, no tinted circle. No corner badge,
gradient border, inner card or hover lift.

### Section title

`SectionTitle` renders the centred `h2` with the amber rule and an optional
subtitle. A subtitle must add information; it cannot restate the title.

### Form field

White input, `border-border-dark`, amber focus ring:

```
block w-full rounded-md border border-border-dark bg-background-primary
px-4 py-3 text-text-primary transition-colors duration-200
focus:border-brand-primary focus:outline-none focus:ring-2
focus:ring-brand-primary/25
```

Errors sit under the field as `text-xs text-red-600` with `role="alert"` and
`aria-describedby`. Success messages use `role="status"` and the amber-edged
panel already in `Contact.jsx`.

### Header, page header, footer

The header is transparent over a photo hero and solid `footer` after 24 px of
scroll. Inner pages without a photo get the solid bar from the start. Page
headers are a single `h1` plus at most two lines of copy and one primary
action, with no eyebrow above the title.

## 4. Rules

These are enforced on every new page and on anything touched in the current
one.

### R1. No filter badges

No chips, pills, tags or bubbles for categories, filters, counts or status.

- Filtering uses underlined text tabs, a native `select`, or plain links with
  `aria-current`; never a row of rounded pills.
- Counts are written into the label ("Orders, 12"), not floated in a bubble.
- Status is text inside the row ("Overdue", "Approved"), not a coloured pill.
- The only `rounded-full` elements allowed are the scroll cue and the
  section rule.

Remove the Roadmap status pill (`Roadmap.jsx`) before that section is
re-enabled.

### R2. No redundant labels

A label must add something the content does not already say. Delete:

- eyebrows that restate the headline;
- a field label sitting directly above text that names the same thing
  ("Email" above an email address, "Phone" above a phone number);
- index numbers that only restate order (`01`, `02`);
- headings such as "Features" directly above a three-item feature list when
  the section title already says it;
- link text that repeats the destination ("Learn more about GDSense" inside
  the GDSense card).

Check: cover the label. If nothing is lost, remove it.

### R3. No italics

No italics in headings, UI copy or body text, and no synthetic oblique with
`skew`. Emphasis is weight, size, spacing or colour. Italics survive only for
titles of published works, and the site currently has none.

### R4. Emphasize the CTA

One primary action per view: filled amber, the largest button in its block,
24 to 32 px away from anything secondary. Secondary actions are outline or
text, never filled amber. The page closes with the same primary action. Forms
have exactly one filled button, the submit.

Squint test: after the headline, the CTA should be the first element the eye
lands on. If a box, a badge or a secondary link competes, the hierarchy is
wrong.

### R5. Remove embellishments

Delete decorative gradients, glows, scanlines, dot grids, floating shapes,
glassmorphism, oversized quote marks, duplicated rules or dividers between
every block, default hover lift, entrance animations, animated counters,
sparkle icons and emoji.

Kept on purpose: the photo overlays in the hero (text contrast), the amber rule
under section titles, and the CVP imagery with its edge fade, which the client
froze. The scanline keyframes stay in the config unused until the ValueProp
placeholder path is removed.

### R6. No card containers

No rounded, bordered, shadowed boxes wrapping content. Rounded corners plus a
border plus a shadow on every block is the default generated look and it
flattens hierarchy.

- Structure with hairlines (`border-t`, `divide-y`, `divide-x`), columns and
  whitespace.
- Section bands may use `bg-band`; they carry no radius, border or shadow.
- Form inputs and the language popover are the only bordered, rounded surfaces.
- Cards are not a layout tool. If content needs separation, use a rule or a
  change of ground.

## 5. Accessibility baseline

- Visible focus on every interactive element:
  `focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`.
  Never remove an outline without a replacement.
- Targets are at least 44 × 44 px.
- Body text uses the text tokens; amber is not used for small copy on white.
- Live regions: errors `role="alert"`, status and success `role="status"`.
- Motion respects `prefers-reduced-motion`.
- Every image has alt text, or `alt=""` plus `aria-hidden` when decorative.

## 6. Known deviations

| Where | Rule | Issue | Proposed |
| --- | --- | --- | --- |
| Hero CTA, Contact submit, survey link | Colour | White label on amber, 2.15:1 | Ink label (`text-text-primary`); decision needed |
| `ValueProp.jsx` | R5 | Edge fade and scanline in the placeholder path | Frozen with the CVP; remove the scanline when placeholders go |
| `Roadmap.jsx` | R1, R6 | Status pill and card blocks | Rebuild with hairlines and text status before re-enabling the section |
| `tailwind.config.js` | Hygiene | Unused tokens and keyframes | Delete during the next cleanup |
| `Team.jsx`, `Footer.jsx` | R5 | Uppercase tracked labels | Allowed: role and column labels, not decoration |

## 7. Review checklist

- [ ] One filled amber action, and it is the CTA
- [ ] No chips, pills, tags or count bubbles
- [ ] No content cards: no rounded, bordered, shadowed blocks
- [ ] No label repeats its content
- [ ] No italics
- [ ] No decorative gradient, glow, scanline or entrance animation
- [ ] Colours and spacing come from tokens, no raw hex outside the config
- [ ] Focus rings visible, targets 44 px
- [ ] Verified at 390 px and 1280 px
- [ ] Copy follows the humanizer rules: no em dashes, no stock marketing
      phrasing, no italic emphasis
