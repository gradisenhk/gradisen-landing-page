# Plan: multi-page Gradisen site with Gradisen SMART

Status: implemented on `restructure/multipage` on 11 November 2026. The decisions taken are recorded in section 11.
Date: 2026-11-10, implemented 2026-11-11.
Baseline: the current uncommitted working tree (single-page site, GDSense-focused, Roadmap hidden).

## 1. Why this change

The site today is one page that presents GDSense. Gradisen needs a company-level home plus a second product, GDSMART. The company should be the frame; each product should have its own page where the content is not forced into the GDSense narrative.

The visual language, amber accent, three locales and the Core Value Propositions section stay as they are. This is a structure and content change, not a redesign.

## 2. Success criteria

- Four pages plus the contact section render and are reachable from the nav and footer: `/`, `/gdsense`, `/gdsmart`, `/about`, and `/#contact`.
- A direct URL load (for example `www.gradisen.com/gdsmart`) works on GitHub Pages, including a refresh.
- The nav shows the current page, in all three languages.
- Gradisen SMART explains the product, the two parts, where each is used, and that data is synchronized.
- The Core Value Propositions section on the GDSense page is unchanged.
- Roadmap stays hidden.
- No console errors; existing tests (22) still pass; build succeeds.

## 3. Information architecture

Recommended and assumed below. See section 11 for the decisions that change it.

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Who Gradisen is, the two products at a glance, how the team works, contact CTA |
| `/gdsense` | GDSense | Current product content: hero, hardware, how it works, value propositions, CTA |
| `/gdsmart` | GDSmart | New product: overview, the two parts, shared data, CTA |
| `/about` | About | Company story, approach and the team |

Contact is a section at the bottom of Home (`#contact`); `/contact` redirects to it. Team lives on About.

### Navigation

Desktop and mobile share one structure:

- Home
- GDSense
- GDSmart
- About
- Contact

Four page links plus Contact, which scrolls to the section at the bottom of Home. No dropdown; the bar still fits at 768 px with the language switcher.

Footer: Products (GDSense, GDSmart), Company (Home, About, Contact to `#contact`), email and copyright.

## 4. Page content map

### Home

- Company hero: Gradisen, what the company does, and a line that names both products. This replaces the current GDSense hero, which moves to `/gdsense`.
- Two product rows: GDSense and Gradisen SMART, one line each, link to their pages.
- Short "what we do" band with three company strengths (edge AI for warehouses, property engineering software, Hong Kong team).
- Team section, unchanged content.
- Contact section at the bottom, linked from the nav and CTAs.
- Footer.

### GDSense

- Existing hero copy, image and CTAs (moved, not rewritten).
- `Product` section: hardware and how it works.
- `ValueProp` section: unchanged.
- Roadmap: still hidden; component and locale keys kept.
- CTA to the contact section on Home.

### Gradisen SMART

1. Hero: name, one-line positioning, "Book a demo" CTA.
2. Overview: the problem it solves for frontline and engineering staff (maintenance requests, upkeep, materials).
3. The two parts: Web Management Portal and Mobile Application, with where each is used and what it is for, rendered as two capability columns.
4. Capabilities: grouped by part.
   - Portal: work order approval, report export, account management, full inventory management.
   - Mobile: reporting issues, accepting orders, photo evidence, issuing materials.
5. One system, one dataset: how the two parts stay synchronized, with a visual that links office and site.
6. Audience: property management and engineering teams, and the frontline staff they support.
7. CTA: the contact section on Home.

### Contact

The contact section lives at the bottom of Home: contact information, response note, survey link and message form. `/contact` redirects to `/#contact`.
- Keep the form and its validation tests as they are.

## 5. Gradisen SMART content draft

Draft English lines for review. Chinese copy to be written after the terminology decision.

- Hero title: `Gradisen SMART: property work assignment, from the site to the office.`
- Hero line: `A management system for frontline and engineering staff. The web portal runs approvals, reports, accounts and inventory; the mobile app handles reporting, orders, photo evidence and material issuing. Both work on the same data.`
- Two-part comparison:

| Part | Where to use it | What it is for |
| --- | --- | --- |
| Web Management Portal | Computer browser in the office | Work order approval, report export, account management, full inventory management |
| Mobile Application | Phone on site | Reporting issues, accepting orders, taking photos for evidence, issuing materials |

- Sync line: `A work order raised on site appears in the office immediately, and materials issued on the phone leave the same stock count the portal shows.`
- Audience: property and facility teams that run maintenance, upkeep and material stock across sites.

Terminology: `Gradisen SMART` is the full name, `GDSmart` the short form; zh-HK uses `物業管理工作分配系統` and zh-CN `物业管理工作分配系统`. `SMART` stands for Systematic Maintenance Assignment & Resource Tracking, a backronym that is not expanded on the site.

Assets needed: product lockup or logotype, portal screenshot, mobile screenshot. Until they arrive, the page can use a two-panel diagram and CSS device frames. The plan assumes placeholders are acceptable for the first pass.

## 6. Design decisions

- Keep the current tokens, section titles, dark footer and Material Symbols.
- Follow [docs/design-system.md](../design-system.md). Its rules apply to every new page: no filter badges, no redundant labels, no italics, one emphasized CTA, no embellishments.
- Header: transparent over a photo hero only. Product pages without a hero photo get a solid dark bar and a compact page header (product name, one line, CTA). Without this, white nav text would sit on a white page.
- Page header pattern: product eyebrow, title, one or two lines, optional CTA. It reuses `SectionTitle` typography but is not a new visual system.
- Gradisen SMART differentiation: the two-part columns, capability lists and shared-data block carry the page. No new colour, no cards.
- Product rows on Home use one consistent image/text layout for both products.
- Breadcrumbs are not planned. The nav and footer are enough for four pages.

## 7. Technical plan

### Routing

- Add `react-router-dom` and use `BrowserRouter`, `Routes` and `Link`.
- Routes: `/`, `/gdsense`, `/gdsmart`, `/about`, plus `/contact` redirecting to `/#contact`; catch-all `*` renders a small 404 page with a link home.
- Nav and footer links become router links. In-page anchors (for example Team on Home) stay as hash links and scroll with the existing offset.
- `ScrollToTop` component resets scroll on route change, with an exception for hash targets. Focus moves to the page `h1` after navigation for keyboard and screen reader users.
- Active link state via `useLocation` with `aria-current="page"`.

### GitHub Pages deep links

`BrowserRouter` needs a fallback because GitHub Pages serves a 404 for unknown paths.

- Add `public/404.html` with the standard redirect script that sends the requested path back to `index.html` as a query, and a small script in `index.html` that restores the path. This keeps clean URLs.
- Alternative if that proves brittle: `HashRouter` (`/#/gdsmart`). Ugly URLs, no server tricks. Not recommended.
- Verification: `npm run build`, `npm run preview`, open `/gdsmart` directly, refresh, and check the console.

### Page metadata

- A small `usePageMeta({ titleKey, descriptionKey })` hook sets `document.title` and the meta description per route and language.
- `index.html` keeps its defaults for the home page.
- No prerendering or SSR. Search engines run JavaScript, but this remains a client-rendered site; note as a limitation rather than solving it now.

### i18n

- Keep the three locale files and the detection behaviour.
- Add keys for: product names, page titles and descriptions, Gradisen SMART sections, page links, capability groups.
- Existing keys stay, even when moved between pages. Roadmap keys stay unused.
- Chinese copy follows the terminology decision above. No machine translation committed unreviewed.

### Code structure

New files:

- `src/pages/Home.jsx`, `Gdsense.jsx`, `Gdsmart.jsx`, `About.jsx`, `NotFound.jsx`
- `src/components/Layout.jsx` (skip link, nav, main, footer, scroll restoration, page meta)
- `src/components/PageHeader.jsx` (dark band for pages without a photo hero)
- `src/components/CtaBand.jsx`
- `src/components/ScrollToTop.jsx`
- `src/hooks/usePageMeta.js`
- `public/404.html`
- `src/test/routes.test.jsx`, `src/test/locales.test.js`

Modified:

- `src/App.jsx` (route table), `src/main.jsx` (`BrowserRouter`)
- `Navbar.jsx`, `Footer.jsx` (route links, active state, header variant)
- `Hero.jsx` (now takes copy, CTAs and scroll target as props)
- `Contact.jsx` (section title always rendered; redundant email label removed)
- locale files, `README.md`, `package.json`, `index.html`
- `docs/design-system.md` (rules), `docs/plans/gradisen-multipage.md` (this record)

Kept as-is: `ValueProp.jsx`, `Roadmap.jsx` (unimported), assets, Tailwind config.

## 8. Phases and acceptance checks

| Phase | Work | Done when |
| --- | --- | --- |
| 0 | Confirm the decisions in section 11; commit the current state on a branch | Answers recorded, clean baseline commit |
| 1 | Router, layout shell, 404 page, GitHub Pages fallback, ScrollToTop, page meta | All pages render, deep link and refresh work in preview |
| 2 | Home: company hero, product rows, strengths, contact section | Home leads with Gradisen and closes with the contact form |
| 3 | GDSense page: move hero, product, value props; keep roadmap hidden | Page matches current GDSense content, CVP untouched |
| 4 | GDSmart page: copy, two-part columns, capability lists, shared-data block, CTA | Page explains both parts and shared data without new assets |
| 5 | About page, contact section on Home, nav/footer links, active states | Story, team and form work, current page marked |
| 6 | i18n pass, page titles and descriptions, focus and keyboard pass | Three locales across all pages, no untranslated keys |
| 7 | Tests, build, preview click-through, README | Tests and build pass, deploy verified locally |

Rough effort: 7 to 12 agent-hours. Most of it is copy and the i18n pass.

Status: all phases complete. 31 tests pass, the production build succeeds, and the pages were checked in the dev server.

## 9. Testing plan

- Keep the 22 contact tests.
- Add router smoke tests: each route renders its heading; nav highlights the current page; unknown route renders the 404 view.
- Add a test that each locale has the new keys (a small key-parity check) so a missing translation fails loudly.
- Manual: direct URL load and refresh for all routes, browser back and forward, mobile menu, language switch on every page, reduced motion, keyboard focus after navigation.
- Build and preview, then a final check of the output paths in `dist`.

## 10. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| GitHub Pages returns 404 on direct product URLs | `404.html` redirect, verified in preview and after deploy; HashRouter only as fallback |
| White nav text on pages without a hero photo | Solid header variant for inner pages, transparent only on Home |
| Scope grows into a redesign | No token or layout changes beyond the page header pattern |
| Gradisen SMART screenshots or logo not ready | Columns and a rule diagram; asset slots documented |
| CVP section drifts | It stays on the GDSense page untouched |
| Chinese copy quality | Terminology decided first; copy reviewed before commit |
| Uncommitted work is lost during the restructure | Branch and commit the current tree before phase 1 |
| Route tests need a router wrapper | Add a small test helper; contact tests unaffected |

## 11. Decisions taken

1. Pages: five, including `/about`; Team moved to About.
2. Nav: five flat links, no Products dropdown.
3. Naming: `Gradisen SMART` (short `GDSmart`), zh-HK `物業管理工作分配系統`, zh-CN `物业管理工作分配系统`. `SMART` is a backronym for Systematic Maintenance Assignment & Resource Tracking and is not expanded on the site.
4. Assets: no screenshots or lockup yet. Columns, capability lists and a two-column shared-data block carry the page; no placeholder device frames were needed.
5. Header: photo hero only on Home and GDSense; other pages get a solid dark header plus a dark page header band.
6. Contact: a section at the bottom of Home, linked from the nav; `/contact` redirects.
7. URLs: clean paths with the GitHub Pages `404.html` fallback.
8. Roadmap stays hidden during and after the restructure.

The remaining open questions are visual rather than structural: the button label contrast (white on amber, 2.15:1) recorded in the design system, and when real product screenshots replace the diagram.

## 12. Out of scope

Content management system, booking or demo scheduling, authentication, analytics, pricing, blog or case studies, per-language URL paths, prerendering, visual redesign of existing sections, rewrites of GDSense copy, relaunching the roadmap.

## 13. Result

Built on `restructure/multipage`:

- `react-router-dom` 6 with clean paths, a catch-all NotFound route, and the `public/404.html` fallback for GitHub Pages deep links.
- `Layout` handles the skip link, nav, footer, scroll restoration, heading focus and per-route `title` / meta description.
- Home and GDSense use the photo hero; GDSmart and About use a solid dark page header band.
- 31 tests pass (22 contact, 4 page headings, the `/contact` redirect, NotFound, nav state and two locale checks), and `npm run build` succeeds.
- Home closes with the contact section; `/contact` redirects to `/#contact`.
- The GDSense value propositions section is unchanged and the roadmap stays hidden.
