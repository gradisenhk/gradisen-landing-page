# Gradisen site

Marketing site for **Gradisen**, a Hong Kong team building **GDSense**, an edge AI patrol and inventory robot for small and medium warehouses, and **Gradisen SMART** (`GDSmart`), a property work assignment system for the office and the site.

Live at **[www.gradisen.com](https://www.gradisen.com)** (GitHub Pages, custom domain via `CNAME`).

The visual language is a fusion of the original Gradisen site with [icchk.cn](https://www.icchk.cn): photo heroes with a transparent-to-solid header, centred section titles over a short amber rule, white cards on alternating grounds, and a dark footer. The GDSense value propositions section is untouched, the amber `#F59E0B` accent is unchanged, and no webfont was added.

## Pages

| Route | Page | Content |
| --- | --- | --- |
| `/` | Home | Company hero, the two products in image rows, how we build, contact section at the bottom |
| `/gdsense` | GDSense | Product hero, hardware, workflow, core value propositions, CTA |
| `/gdsmart` | Gradisen SMART | Overview, Web Management Portal and Mobile Application, shared data, CTA |
| `/about` | About | What the company does, how it works, the team |

Contact is a section at the bottom of Home (`#contact`), not a separate page. `/contact` redirects to `/#contact`. `*` renders a small NotFound page. The roadmap section is still hidden: `Roadmap.jsx` and its locale keys are kept but not imported.

## Product naming

- Full name: `Gradisen SMART`; short name: `GDSmart`.
- zh-HK: `物業管理工作分配系統`; zh-CN: `物业管理工作分配系统`.
- `SMART` is a backronym for Systematic Maintenance Assignment & Resource Tracking. It is not expanded on the site.

## Tech stack

| Concern | Choice |
| --- | --- |
| UI | React 18, function components and hooks |
| Routing | `react-router-dom` 6 (`BrowserRouter`) |
| Build / dev server | Vite 5, `@vitejs/plugin-react` |
| Styling | Tailwind CSS 3 + PostCSS + Autoprefixer, tokens in `tailwind.config.js` |
| i18n | `i18next`, `react-i18next`, `i18next-browser-languagedetector` |
| Flags | `flag-icons` (language switcher) |
| Tests | Vitest + jsdom + Testing Library + `jest-dom` |
| Deploy | `gh-pages` → GitHub Pages |

## Getting started

Node.js 18+ and npm.

```bash
npm install
npm run dev        # http://localhost:3000 (auto-opens)
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
npm test           # run the test suite once
npm run deploy     # publish dist/ to the gh-pages branch
```

| Script | Description |
| --- | --- |
| `npm run dev` | Vite dev server on port 3000, opens a browser |
| `npm run build` | Production build: Terser minified, no sourcemaps, React and i18n split into vendor chunks |
| `npm run preview` | Preview the built site |
| `npm test` | Vitest single run |
| `npm run test:watch` | Vitest watch mode |
| `npm run deploy` | Push `dist/` to `gh-pages` |

## Project structure

```
.
├── index.html                    # Entry: Material Symbols font, meta, 404 redirect restore
├── vite.config.js                # Vite + Vitest config (jsdom, setup file)
├── tailwind.config.js            # Brand, band, footer and surface tokens
├── postcss.config.js
├── eslint.config.js              # Flat ESLint config (not wired into scripts, see gaps)
├── .gitignore
├── CNAME                         # www.gradisen.com
├── public/
│   ├── 404.html                  # GitHub Pages deep-link fallback
│   └── favicon.png               # 512 px square icon, logo mark centred
└── src/
    ├── main.jsx                  # React root, BrowserRouter
    ├── App.jsx                   # Route table
    ├── index.css                 # Tailwind layers, body styles, anchor offset, heading focus
    ├── i18n.js                   # i18next init, language resolution, localStorage cache
    ├── locales/                  # en.json, zh-HK.json, zh-CN.json
    ├── hooks/
    │   └── usePageMeta.js        # Per-route title, meta description and html lang
    ├── assets/
    │   ├── icon.png              # Logo mark source, not imported
    │   ├── icon_words.png        # Logo mark + wordmark (navbar, footer)
    │   └── ValuePropsErrorCheck.png  # Cargo-damage photo used by the CVP section
    ├── pages/
    │   ├── Home.jsx
    │   ├── Gdsense.jsx
    │   ├── Gdsmart.jsx
    │   ├── About.jsx
    │   └── NotFound.jsx
    └── components/
        ├── Layout.jsx            # Skip link, nav, main, footer, scroll and focus handling
        ├── Navbar.jsx            # Route links, active state, language menu, mobile menu
        ├── Hero.jsx              # Photo hero; copy, CTAs and scroll target arrive as props
        ├── PageHeader.jsx        # Dark page band for pages without a photo hero
        ├── SectionTitle.jsx      # Centred title with the short amber rule
        ├── CtaBand.jsx           # Closing CTA section
        ├── ScrollToTop.jsx       # Resets scroll and moves focus to the page heading
        ├── Product.jsx           # GDSense hardware blocks and three workflow rows
        ├── ValueProp.jsx         # Core Value Propositions (unchanged from the original site)
        ├── Roadmap.jsx           # Three phase cards (hidden, not imported)
        ├── Team.jsx              # Four member entries on a tinted band
        ├── Contact.jsx           # Contact details + validated message form
        └── Footer.jsx            # Dark footer: brand, products, company, copyright
```

`src/components/SectionHeader.jsx` and `src/assets/damage-scan.jpg` are leftovers from an earlier direction and are no longer imported; they can be deleted.

## Layout and navigation

- The header is fixed. It starts transparent over the photo heroes on Home and GDSense, and turns solid `#3a3e3e` after 24 px of scroll.
- GDSmart, About, Contact and NotFound start on a solid header, followed by a dark page header band. Without the band, white nav text would sit on a white page.
- The nav shows four page links plus Contact, which scrolls to the contact section at the bottom of Home. `aria-current="page"` marks the current page (or Contact once `#contact` is active). The active link is amber.
- `ScrollToTop` resets the scroll position on navigation and moves focus to the page `h1`; the heading takes focus for screen readers without drawing a focus ring.
- The skip link is the first focusable element.

## Design system

Tokens live in `tailwind.config.js`; components use these names rather than raw hex values. The full rulebook, component recipes and review checklist are in [docs/design-system.md](docs/design-system.md).

| Group | Token | Value | Use |
| --- | --- | --- | --- |
| Brand | `brand.primary` / `brand.primaryDark` | `#F59E0B` / `#D97706` | CTAs, rules, active states, their hover |
| Brand | `brand.secondary` / `brand.accent` | `#3B82F6` / `#F97316` | Informational accents (secondary is unused) |
| Grounds | `background.primary` / `background.tertiary` | `#FFFFFF` / `#F3F4F6` | Page and CVP band |
| Band | `band` | `#F8F9FA` | Alternating section band |
| Dark | `footer` | `#3A3E3E` | Header, page headers, footer |
| Surface | `surface` | `#FFFFFF` | Unused: content no longer sits in cards |
| Rules | `border` / `border.dark` | `#E5E7EB` / `#D1D5DB` | Hairlines and form inputs |
| Text | `text.primary` / `secondary` / `muted` | `#111827` / `#4B5563` / `#6B7280` | Headings, body, metadata |

- Content blocks, not cards: hairlines (`border-t`, `divide-x`, `divide-y`), columns and whitespace carry the structure. Section bands may use `bg-band`, with no radius, border or shadow. No index numbers: the heading and order carry the sequence.
- Home products use the same 4:3 image and text row for both, with equal weight and an outlined rounded link.
- Section composition: `SectionTitle` renders a centred `text-3xl md:text-4xl` heading with a 12 × 4 px amber rule; sections use `py-20` and alternate white and tinted grounds. The CVP section keeps its original heading style (no rule).
- Buttons: solid amber (`hover:bg-brand-primaryDark`) for primary actions and outlined amber for secondary actions.
- Form fields: white inputs with `border-border-dark` and an amber focus ring; errors use `text-red-600` with `role="alert"`. The form sits on a top hairline, not in a panel.
- Icons: every UI symbol is a Material Symbols ligature (`material-symbols-outlined`), loaded in `index.html`; sizes are set inline so the glyphs sit on the text baseline. The legacy SVGs inside `ValueProp.jsx` are unused placeholders.

## Internationalisation

Three locale files in `src/locales/`; English is the fallback and the reference file. Every key must exist in all three, and a test enforces that.

- `zh-cn` / `zh-hans` → `zh-CN`
- any other `zh*` (`zh-TW`, `zh-HK`, `zh`, …) → `zh-HK`
- everything else → `en`

Detection order is `localStorage` → `navigator`; the resolved language is cached under `i18nextLng`. The navbar switcher is a plain text trigger (`繁` / `简` / `EN`) that opens a flag dropdown, so it reads as part of the navigation rather than a form control; on small screens it sits inside the mobile menu.

`usePageMeta` keeps `document.title`, the meta description and `<html lang>` in sync with the route and language.

### Adding a language

1. Copy `src/locales/en.json` to `src/locales/<code>.json` and translate the values, keeping the keys identical.
2. Import it in `src/i18n.js` and add it to `resources`.
3. Add `{ code, short, label, flagClass }` to `languages` in `src/components/Navbar.jsx`.
4. Add the locale to `htmlLang` in `src/hooks/usePageMeta.js`.
5. Extend `resolveLanguage()` if the browser locale needs an explicit mapping.

## Contact form

`Contact.jsx` is a controlled form with local validation and no network call:

- **Required:** name, company, contact number. Message is optional and marked outside the label.
- **Phone rule:** `+`, digits, spaces and brackets only, at least 8 digits. It accepts the Hong Kong and mainland China formats covered by the tests and rejects letters, `@` and `#`.
- **Behaviour:** errors appear under the field with `role="alert"`, `aria-invalid` and `aria-describedby`; typing in a field clears its error; editing after a successful submit clears the confirmation.
- **States:** an amber-ruled confirmation panel using `contact.success`.

**No endpoint is wired yet.** The success state confirms validation only; wire the submit handler to a form service (or a `mailto:` handoff) before launch.

## Testing

```bash
npm test
npm run test:watch
npx vitest --ui
```

- `Contact.validation.test.jsx` mocks `react-i18next`, so translation keys render verbatim and assertions read as keys (`contact.errors.contactRequired`). It covers required fields, whitespace-only input, error clearing, success clearing, and seven valid plus four invalid phone formats.
- `routes.test.jsx` renders each page in a memory router and checks its `h1`, the `/contact` redirect to the Home contact section, the NotFound route, and `aria-current` on the nav.
- `locales.test.js` checks that the three locale files share the same key set and contain no em or en dashes.

All 31 tests pass.

## Deployment

```bash
npm run build
npm run deploy
```

`npm run deploy` publishes `dist/` to the `gh-pages` branch. `CNAME` pins `www.gradisen.com`, and `vite.config.js` sets `base: '/'`, which is correct for a custom domain at the root; change it to `/repo-name/` if the site moves to a repository subpath.

### Deep links on GitHub Pages

GitHub Pages serves a static 404 for unknown paths, so a direct load of `/gdsmart` would normally fail. `public/404.html` stores the requested URL in `sessionStorage` and reloads `/`; a small script in `index.html` restores the path with `history.replaceState` before React starts. Both files are copied into `dist/`.

To verify after a build:

```bash
npm run build
npm run preview
# open http://localhost:4173/gdsmart directly, then refresh
```

Vite's preview server already falls back to `index.html`, so this checks the router rather than the GitHub Pages fallback. The fallback itself only runs on GitHub Pages; check it once after the first deploy by opening `www.gradisen.com/gdsmart` directly and refreshing.

## Known gaps

- **Form endpoint.** The contact form validates and confirms but sends nothing; see above.
- **Heavy assets.** `flag-icons` imports its full stylesheet, so the CSS bundle is about 440 kB and contains many unused flag SVGs. The CVP photo is the original 2 MB PNG; it is untouched on purpose but worth compressing later.
- **Leftover files.** `src/components/SectionHeader.jsx` and `src/assets/damage-scan.jpg` are unused.
- **ESLint is configured but not wired up.** `eslint.config.js` imports packages that are not in `devDependencies`, and there is no `lint` script.
- **Unused locale keys.** `pageTitle`, `nav.primary`, `team.label`, `team.labels.*`, `contact.label`, `product.robotPlaceholder` and `roadmap.*` are not rendered. The roadmap keys are kept for when the section returns.
- **External images.** The hero and the two Home product rows load photos from Unsplash and Pexels. The site has no local copy, so those visuals depend on the hosts.
- **No product screenshots.** The GDSmart page explains the two parts with columns and a rule diagram; real screenshots and a product lockup are still to come.
- **Button label contrast.** White on amber measures 2.15:1. The design system records the ink-label alternative; the current buttons keep white.
- **Logo files are WebP inside `.png` names** (`icon.png`, `icon_words.png`); browsers detect the content, but rename them to `.webp` before running them through tools that trust extensions.

## Contact

[team@gradisen.com](mailto:team@gradisen.com) · product survey: [forms.gle/zurn76xtQXupTg9x9](https://forms.gle/zurn76xtQXupTg9x9)
