# QEE Org IA Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-frame the site so `/` is the permanent QEE org home and the hackathon lives under `/events/qompute` with its subpages nested beneath it.

**Architecture:** Pure information-architecture change on the existing React 18 + Vite + react-router-dom SPA. Nested routes under `/events/qompute`, client-side `<Navigate replace>` redirects for old flat URLs, page component files stay in place (only routing/nav/copy change), and the build plumbing (postbuild route folders, `inject-meta.mjs`, sitemap) is updated to match the new paths.

**Tech Stack:** React 18, react-router-dom v6, Vite 5, CSS Modules, ESLint (airbnb). No test framework in this repo — verification per task is `npm run lint` (0 errors) + `npm run build` (clean) + `dist/` output assertions + a final browser pass.

## Global Constraints

- No em-dashes anywhere (copy or comments) — use real punctuation. (Repo-wide rule.)
- Node 20; `npm ci` in CI. No new runtime dependencies.
- Static hosting (GitHub Pages, custom domain qeesc.org): no backend. "Membership"/"register" are external form links, both **stubbed** (`null`) until URLs are provided; render the existing Instagram/email fallback when null.
- Every page keeps its `<h1>` (added in the prior web-improvements pass) via `SectionHeading as="h1"`.
- Follow existing patterns: CSS Modules per component, `Container`/`SectionHeading`/`Button` primitives, ket-notation eyebrows, tokens in `src/styles/tokens.css`.
- Branch: `qee-org-restructure` (already created off `web-improvements`).

---

## File Structure

New files:
- `src/pages/events/QomputeLayout.jsx` — event section shell: renders `EventSubnav` + `<Outlet />`.
- `src/pages/events/QomputeLanding.jsx` — the `/events/qompute` index page (Hero + Expect + Sponsors + Register CTA).
- `src/components/events/EventSubnav.jsx` + `EventSubnav.module.css` — hackathon sub-nav.
- `src/components/home/OrgHero.jsx` + `OrgHero.module.css` — org homepage hero (org identity + Become-a-member CTA + Countdown teaser).

Modified:
- `src/content/event.js` — add `joinFormUrl` and `registerFormUrl` (both `null` stubs); `finalEventDateLabel`/`gcalUrl` unchanged.
- `src/App.jsx` — nested route tree + redirects.
- `src/components/layout/Navbar.jsx` — org top-level nav + Become-a-member CTA.
- `src/pages/Home.jsx` — use `OrgHero`, drop `Expect` + `Sponsors`.
- `src/components/home/About.jsx` — add `id="about"` to its section for the `/#about` anchor.
- `src/components/home/Hero.jsx` — update its two CTA `to=` paths to the nested routes; read `registerFormUrl`.
- `src/pages/Registration.jsx` — read `event.registerFormUrl` instead of the local `null` const (page stays, routed at `/events/qompute/register`).
- `package.json` — `postbuild` route-folder list.
- `scripts/inject-meta.mjs` — nested `ROUTES` map + optional per-route canonical override.
- `public/sitemap.xml` — nested URLs.

Unchanged components, just rendered in a new parent: `Expect.jsx`, `Sponsors.jsx`, `Schedule.jsx`, `Speakers.jsx`, `Faq.jsx`, `Resources.jsx`, `TeamPreview.jsx`, `Team.jsx`, `Countdown.jsx`.

---

## Task 1: Centralize the two form URLs in content

**Files:**
- Modify: `src/content/event.js`
- Modify: `src/pages/Registration.jsx:1-14`

**Interfaces:**
- Produces: `event.joinFormUrl` (string | null), `event.registerFormUrl` (string | null).

- [ ] **Step 1: Add the stubbed URLs to `src/content/event.js`**

Add two fields to the `event` object (keep the existing fields and comment):

```js
const event = {
  finalEventDate: '2026-10-04',
  finalEventDateLabel: 'October 4, 2026',
  format: 'Challenges run virtually in the weeks leading up to the event (like last year). The final day is an in-person conference with talks, workshops, and merch.',
  // TODO: paste the real Google Form URLs once built. null renders the
  // Instagram/email fallback instead of a dead button.
  joinFormUrl: null,
  registerFormUrl: null,
  gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=Qompute+in+LA+2026'
    + '&dates=20261004/20261005'
    + '&details=Quantum+computing+%26+ethics+conference+day+by+USC+Quantum+Engineering+Ethics.+Info:+https://qeesc.org'
    + '&location=University+of+Southern+California,+Los+Angeles,+CA',
};
```

- [ ] **Step 2: Point `Registration.jsx` at the centralized value**

Replace line 7-8 (`// TODO: replace... const REGISTRATION_FORM_URL = null;`) — delete the local const and use `event.registerFormUrl`. In the JSX (line 40) change `REGISTRATION_FORM_URL ?` to `event.registerFormUrl ?` and line 41 `href={REGISTRATION_FORM_URL}` to `href={event.registerFormUrl}`. `event` is already imported.

- [ ] **Step 3: Verify build + lint**

Run: `npm run lint && npm run build`
Expected: lint 0 errors; build completes; postbuild runs (still on old routes for now).

- [ ] **Step 4: Commit**

```bash
git add src/content/event.js src/pages/Registration.jsx
git commit -m "refactor: centralize join/register form URLs in event content"
```

---

## Task 2: Nested routing + legacy redirects

**Files:**
- Create: `src/pages/events/QomputeLayout.jsx`
- Create: `src/pages/events/QomputeLanding.jsx` (temporary stub in this task; fleshed out in Task 4)
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: existing lazy page components (`Schedule`, `Speakers`, `Faq`, `Registration`, `Resources`, `Team`, `Home`, `NotFound`).
- Produces: routes `/events/qompute` (+ `/schedule /speakers /faq /resources /register` children), redirect routes for `/events`, `/schedule`, `/speakers`, `/faq`, `/registration`, `/resources`.

- [ ] **Step 1: Create `src/pages/events/QomputeLayout.jsx`**

Temporary body (real sub-nav lands in Task 3); wire the Outlet now so children render:

```jsx
import { Outlet } from 'react-router-dom';

const QomputeLayout = () => (
  <Outlet />
);

export default QomputeLayout;
```

- [ ] **Step 2: Create a placeholder `src/pages/events/QomputeLanding.jsx`**

```jsx
const QomputeLanding = () => (
  <section style={{ minHeight: '50vh' }} />
);

export default QomputeLanding;
```

- [ ] **Step 3: Rewrite `src/App.jsx` routing**

Full file:

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

const Home = lazy(() => import('./pages/Home'));
const Team = lazy(() => import('./pages/Team'));
const QomputeLayout = lazy(() => import('./pages/events/QomputeLayout'));
const QomputeLanding = lazy(() => import('./pages/events/QomputeLanding'));
const Schedule = lazy(() => import('./pages/Schedule'));
const Speakers = lazy(() => import('./pages/Speakers'));
const Faq = lazy(() => import('./pages/Faq'));
const Registration = lazy(() => import('./pages/Registration'));
const Resources = lazy(() => import('./pages/Resources'));
const NotFound = lazy(() => import('./pages/NotFound'));

// wraps just the routed page, not Layout, so Navbar/Footer never
// unmount/flash while a lazy page chunk is loading
const PageFallback = () => (
  <div role="status" aria-live="polite" style={{ minHeight: '50vh' }} />
);

const withSuspense = (element) => (
  <Suspense fallback={<PageFallback />}>{element}</Suspense>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={withSuspense(<Home />)} />
        <Route path="team" element={withSuspense(<Team />)} />

        <Route path="events">
          <Route index element={<Navigate to="/events/qompute" replace />} />
          <Route path="qompute" element={withSuspense(<QomputeLayout />)}>
            <Route index element={withSuspense(<QomputeLanding />)} />
            <Route path="schedule" element={withSuspense(<Schedule />)} />
            <Route path="speakers" element={withSuspense(<Speakers />)} />
            <Route path="faq" element={withSuspense(<Faq />)} />
            <Route path="resources" element={withSuspense(<Resources />)} />
            <Route path="register" element={withSuspense(<Registration />)} />
          </Route>
        </Route>

        {/* legacy flat URLs -> nested paths (preserve old links/QR/SEO) */}
        <Route path="schedule" element={<Navigate to="/events/qompute/schedule" replace />} />
        <Route path="speakers" element={<Navigate to="/events/qompute/speakers" replace />} />
        <Route path="faq" element={<Navigate to="/events/qompute/faq" replace />} />
        <Route path="registration" element={<Navigate to="/events/qompute/register" replace />} />
        <Route path="resources" element={<Navigate to="/events/qompute/resources" replace />} />

        <Route path="*" element={withSuspense(<NotFound />)} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run lint && npm run build`
Expected: lint 0 errors; build clean; new chunks `QomputeLayout-*.js` and `QomputeLanding-*.js` appear in output.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx src/pages/events/QomputeLayout.jsx src/pages/events/QomputeLanding.jsx
git commit -m "feat: nest hackathon under /events/qompute with legacy redirects"
```

---

## Task 3: Hackathon sub-nav

**Files:**
- Create: `src/components/events/EventSubnav.jsx`
- Create: `src/components/events/EventSubnav.module.css`
- Modify: `src/pages/events/QomputeLayout.jsx`

**Interfaces:**
- Consumes: react-router `NavLink`.
- Produces: `<EventSubnav />` rendered above the `<Outlet />` in `QomputeLayout`.

- [ ] **Step 1: Create `src/components/events/EventSubnav.jsx`**

```jsx
import { NavLink } from 'react-router-dom';
import Container from '../ui/Container';
import styles from './EventSubnav.module.css';

const LINKS = [
  { to: '/events/qompute', label: 'Overview', end: true },
  { to: '/events/qompute/schedule', label: 'Schedule' },
  { to: '/events/qompute/speakers', label: 'Speakers' },
  { to: '/events/qompute/faq', label: 'FAQ' },
  { to: '/events/qompute/resources', label: 'Resources' },
  { to: '/events/qompute/register', label: 'Register' },
];

const linkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`.trim();

const EventSubnav = () => (
  <nav aria-label="Qompute in LA" className={styles.subnav}>
    <Container className={styles.inner}>
      {LINKS.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
          {link.label}
        </NavLink>
      ))}
    </Container>
  </nav>
);

export default EventSubnav;
```

- [ ] **Step 2: Create `src/components/events/EventSubnav.module.css`**

Mirror the token usage in `src/components/layout/Navbar.module.css`. Minimum:

```css
.subnav {
  position: sticky;
  top: 0;
  z-index: 5;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-line, rgba(255, 255, 255, 0.08));
}

.inner {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  padding: 0.75rem 1.5rem;
}

.link {
  color: var(--color-text-dim, #9aa);
  text-decoration: none;
  font-size: 0.9rem;
  white-space: nowrap;
}

.linkActive {
  color: var(--color-teal-text);
  font-weight: 600;
}
```

Read `tokens.css` and swap the fallback literals for the real token names present there (e.g. `--color-bg`, `--color-teal-text`). Do not invent tokens that do not exist — use the fallback in the `var(--x, fallback)` form if unsure.

- [ ] **Step 3: Render it in `QomputeLayout.jsx`**

```jsx
import { Outlet } from 'react-router-dom';
import EventSubnav from '../../components/events/EventSubnav';

const QomputeLayout = () => (
  <>
    <EventSubnav />
    <Outlet />
  </>
);

export default QomputeLayout;
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run lint && npm run build`
Expected: lint 0 errors; build clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/events/ src/pages/events/QomputeLayout.jsx
git commit -m "feat: add Qompute section sub-nav"
```

---

## Task 4: Qompute landing page

**Files:**
- Modify: `src/pages/events/QomputeLanding.jsx`
- Modify: `src/components/home/Hero.jsx:29-33` (CTA targets)

**Interfaces:**
- Consumes: `Hero`, `Expect`, `Sponsors` (existing components), `Registration` page content is separate.
- Produces: full `/events/qompute` landing.

- [ ] **Step 1: Update `Hero.jsx` CTA targets to the nested routes**

In `src/components/home/Hero.jsx`, the actions block currently points at `/registration` and `/schedule`. Change to:

```jsx
      <div className={styles.actions}>
        <Button to="/events/qompute/register" variant="glow">Register interest</Button>
        <Button to="/events/qompute/schedule" variant="ghost">View schedule</Button>
      </div>
```

- [ ] **Step 2: Flesh out `QomputeLanding.jsx`**

Compose the existing event sections (Hero already contains the Countdown and the CTAs):

```jsx
import Hero from '../../components/home/Hero';
import Expect from '../../components/home/Expect';
import Sponsors from '../../components/home/Sponsors';

const QomputeLanding = () => (
  <>
    <Hero />
    <Expect />
    <Sponsors />
  </>
);

export default QomputeLanding;
```

(Register lives on its own subpage `/events/qompute/register`; the Hero CTA links there, so no duplicate register block is needed on the landing.)

- [ ] **Step 3: Verify build + lint**

Run: `npm run lint && npm run build`
Expected: lint 0 errors; build clean. `Hero`, `Expect`, `Sponsors` now bundled into the QomputeLanding chunk.

- [ ] **Step 4: Commit**

```bash
git add src/pages/events/QomputeLanding.jsx src/components/home/Hero.jsx
git commit -m "feat: build Qompute landing from event hero/expect/sponsors"
```

---

## Task 5: Org homepage (OrgHero + Home rework)

**Files:**
- Create: `src/components/home/OrgHero.jsx`
- Create: `src/components/home/OrgHero.module.css`
- Modify: `src/pages/Home.jsx`
- Modify: `src/components/home/About.jsx:8` (add `id="about"`)

**Interfaces:**
- Consumes: `Container`, `Button`, `Countdown`, `QuantumField`, `event`.
- Produces: `<OrgHero />`; Home renders OrgHero + About + TeamPreview only.

- [ ] **Step 1: Create `src/components/home/OrgHero.jsx`**

Org-framed hero. Keeps the QuantumField backdrop and Countdown (as a teaser), swaps the copy and CTAs. Member CTA uses `joinFormUrl`, falling back to email when null (matching the Registration fallback pattern):

```jsx
import Container from '../ui/Container';
import Button from '../ui/Button';
import QuantumField from './QuantumField';
import Countdown from './Countdown';
import event from '../../content/event';
import styles from './OrgHero.module.css';

const memberHref = event.joinFormUrl
  || 'mailto:qee@usc.edu?subject=Joining%20QEE';

const OrgHero = () => (
  <section className={styles.hero}>
    <QuantumField />
    <Container className={styles.inner}>
      <p className={styles.eyebrow}>
        <span className={styles.ket}>|</span>
        usc quantum engineering ethics
        <span className={styles.ket}>⟩</span>
      </p>
      <h1 className={styles.title}>
        Quantum computing,
        {' '}
        <span className={styles.accent}>done ethically</span>
      </h1>
      <p className={styles.subtitle}>
        QEE is USC&apos;s student org exploring the responsibility that comes
        with quantum computing&apos;s power, through talks, panels, and
        hands-on events.
      </p>
      <div className={styles.actions}>
        <Button href={memberHref} variant="glow">Become a member</Button>
        <Button to="/events/qompute" variant="ghost">Explore Qompute in LA</Button>
      </div>
      <p className={styles.teaser}>Next up: Qompute in LA</p>
      <Countdown />
    </Container>
  </section>
);

export default OrgHero;
```

- [ ] **Step 2: Create `src/components/home/OrgHero.module.css`**

Copy `src/components/home/Hero.module.css` verbatim as the starting point (same layout: `.hero`, `.inner`, `.eyebrow`, `.ket`, `.title`, `.accent`, `.subtitle`, `.actions`), then add one rule:

```css
.teaser {
  margin: 1.5rem 0 0.5rem;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-teal-text);
}
```

Read `Hero.module.css` first and reuse its exact declarations for the shared classes so the org hero visually matches the existing hero.

- [ ] **Step 3: Rework `src/pages/Home.jsx`**

```jsx
import OrgHero from '../components/home/OrgHero';
import About from '../components/home/About';
import TeamPreview from '../components/home/TeamPreview';

const Home = () => (
  <>
    <OrgHero />
    <About />
    <TeamPreview />
  </>
);

export default Home;
```

- [ ] **Step 4: Add the anchor id in `About.jsx`**

In `src/components/home/About.jsx` line 8, add `id="about"` to the `<section>`:

```jsx
  <section id="about" className={styles.section} ref={useReveal()}>
```

- [ ] **Step 5: Verify build + lint**

Run: `npm run lint && npm run build`
Expected: lint 0 errors; build clean. Home chunk no longer imports Expect/Sponsors.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/OrgHero.jsx src/components/home/OrgHero.module.css src/pages/Home.jsx src/components/home/About.jsx
git commit -m "feat: org-framed homepage hero, drop event sections from Home"
```

---

## Task 6: Navbar rework

**Files:**
- Modify: `src/components/layout/Navbar.jsx`

**Interfaces:**
- Consumes: `event.joinFormUrl`.
- Produces: org top-level nav (Home, About, Events, Team) + Become-a-member CTA.

- [ ] **Step 1: Rewrite the nav links and CTA in `Navbar.jsx`**

Replace `NAV_LINKS` (lines 6-13), the brand label (line 25), and the CTA (lines 52-54). The About link uses a hash so it works from any page; the CTA is an external `href` (join form or email fallback), so it becomes an `<a>`, not a `NavLink`:

```jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import qeeMark from '../../assets/qee-mark.png';
import event from '../../content/event';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/#about', label: 'About', end: false },
  { to: '/events/qompute', label: 'Events', end: false },
  { to: '/team', label: 'Team', end: false },
];

const memberHref = event.joinFormUrl
  || 'mailto:qee@usc.edu?subject=Joining%20QEE';

const navLinkClass = ({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`.trim();
```

Brand label (line 25) `<span>Qompute in LA</span>` becomes `<span>QEE</span>`.

The links map stays; the trailing CTA changes from `NavLink to="/registration"` to:

```jsx
          <a
            href={memberHref}
            className={styles.cta}
            target={memberHref.startsWith('http') ? '_blank' : undefined}
            rel={memberHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            onClick={() => setIsOpen(false)}
          >
            Become a member
          </a>
```

Note: the `/#about` NavLink will not get an `isActive` highlight (hash links don't match by default) — that is acceptable; it still navigates and scrolls.

- [ ] **Step 2: Verify build + lint**

Run: `npm run lint && npm run build`
Expected: lint 0 errors (watch for `jsx-a11y` on the anchor — it has an href, so it is valid); build clean.

- [ ] **Step 3: Manually confirm nav in the built output is org-framed**

Run: `grep -o 'Become a member\|>QEE<\|/events/qompute' dist/index.html | sort -u`
Expected: shows the QEE brand and member CTA are present (SPA is JS-rendered, so this greps the bundle only as a sanity check; primary verification is the browser pass in Task 8).

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.jsx
git commit -m "feat: org-level navbar with Become-a-member CTA"
```

---

## Task 7: Build plumbing (postbuild folders, inject-meta, sitemap)

**Files:**
- Modify: `package.json:9` (postbuild)
- Modify: `scripts/inject-meta.mjs`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: the route set defined in Task 2.
- Produces: `dist/**/index.html` for every real + legacy route with correct per-route meta.

- [ ] **Step 1: Update `postbuild` in `package.json`**

Replace the route list so nested + legacy + org folders are all created (mkdir -p handles nested paths):

```json
"postbuild": "cp dist/index.html dist/404.html && for r in team events events/qompute events/qompute/schedule events/qompute/speakers events/qompute/faq events/qompute/resources events/qompute/register schedule speakers faq registration resources; do mkdir -p dist/$r && cp dist/index.html dist/$r/index.html; done && node scripts/inject-meta.mjs",
```

- [ ] **Step 2: Rewrite the `ROUTES` map and canonical handling in `scripts/inject-meta.mjs`**

Change `injectRoute` to accept an optional `canonical` (target path for redirect folders), and rewrite `ROUTES`. Replace lines 14-100:

```js
// Copy grounded in src/content/event.js. Nested event routes get their own
// meta; legacy flat routes redirect client-side, so their canonical points at
// the nested target to consolidate SEO signals.
const ROUTES = {
  'events/qompute': {
    title: 'Qompute in LA | QEE',
    description: "USC Quantum Engineering Ethics' quantum computing hackathon: virtual challenges leading to an in-person conference day at USC on October 4, 2026.",
  },
  'events/qompute/schedule': {
    title: 'Schedule | Qompute in LA',
    description: "The Qompute in LA schedule: virtual challenges leading up to the in-person conference day at USC on October 4, 2026, with talks and workshops.",
  },
  'events/qompute/speakers': {
    title: 'Speakers | Qompute in LA',
    description: "Meet the speakers and panelists for Qompute in LA, the USC Quantum Engineering Ethics conference day on October 4, 2026.",
  },
  'events/qompute/faq': {
    title: 'FAQ | Qompute in LA',
    description: "Answers to common questions about Qompute in LA, the USC Quantum Engineering Ethics hackathon and conference day on October 4, 2026.",
  },
  'events/qompute/resources': {
    title: 'Resources | Qompute in LA',
    description: "Learning resources to take you from zero to writing quantum circuits before Qompute in LA's conference day at USC on October 4, 2026.",
  },
  'events/qompute/register': {
    title: 'Register | Qompute in LA',
    description: "Register for Qompute in LA, the USC Quantum Engineering Ethics quantum computing hackathon culminating in a conference day on October 4, 2026.",
  },
  team: {
    title: 'Team | QEE',
    description: "Meet the USC students on the Quantum Engineering Ethics e-board organizing Qompute in LA and the org's quantum computing events.",
  },
  // legacy redirect folders: canonical -> nested target
  schedule: { canonical: 'events/qompute/schedule' },
  speakers: { canonical: 'events/qompute/speakers' },
  faq: { canonical: 'events/qompute/faq' },
  registration: { canonical: 'events/qompute/register' },
  resources: { canonical: 'events/qompute/resources' },
};

function injectRoute(route, { title, description, canonical }) {
  const filePath = path.join(distDir, route, 'index.html');
  if (!existsSync(filePath)) {
    throw new Error(`inject-meta: expected ${filePath} to exist (run the postbuild copy step first).`);
  }

  let html = readFileSync(filePath, 'utf8');
  const canonicalUrl = `https://qeesc.org/${canonical || route}`;

  if (title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    html = html.replace(
      /<meta property="og:title" content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${title}" />`,
    );
    html = html.replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${title}" />`,
    );
  }

  if (description) {
    html = html.replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${description}" />`,
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`,
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${description}" />`,
    );
  }

  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );

  if (/<link rel="canonical" href="[^"]*"\s*\/>/.test(html)) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    );
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  writeFileSync(filePath, html, 'utf8');
}
```

Keep the existing final two lines (`Object.entries(ROUTES).forEach(...)` and the `console.log`).

- [ ] **Step 3: Update `public/sitemap.xml`**

Replace the flat `<loc>` entries with the canonical nested URLs. The URL set should be:
`https://qeesc.org/`, `https://qeesc.org/team`, `https://qeesc.org/events/qompute`, `.../schedule`, `.../speakers`, `.../faq`, `.../resources`, `.../register`. Do not list the legacy redirect URLs (they are not canonical). Preserve the existing XML structure/namespace; only swap the `<loc>` values.

- [ ] **Step 4: Verify build + per-route meta in dist**

Run:
```bash
npm run build \
  && echo '--- nested speakers ---' && grep -E '<title>|canonical|og:url' dist/events/qompute/speakers/index.html \
  && echo '--- legacy speakers redirect canonical ---' && grep -E 'canonical|og:url' dist/speakers/index.html \
  && echo '--- landing ---' && grep -E '<title>' dist/events/qompute/index.html
```
Expected: nested speakers shows `Speakers | Qompute in LA` + canonical `https://qeesc.org/events/qompute/speakers`; legacy `dist/speakers/index.html` canonical points at `.../events/qompute/speakers` (target, not self); landing title `Qompute in LA | QEE`. No `inject-meta: expected ... to exist` error.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/inject-meta.mjs public/sitemap.xml
git commit -m "build: per-route meta + folders for nested event routes"
```

---

## Task 8: Full verification pass

**Files:** none (verification only).

- [ ] **Step 1: Clean lint + build**

Run: `npm run lint && npm run build`
Expected: lint 0 errors; build clean; postbuild logs `inject-meta: updated per-route meta for events/qompute, ...`.

- [ ] **Step 2: Assert the dist tree has every route folder**

Run: `ls dist/events/qompute && ls dist/team dist/schedule`
Expected: `schedule speakers faq resources register index.html` under `dist/events/qompute`; `dist/team` and legacy `dist/schedule` exist.

- [ ] **Step 3: Browser pass via `preview`**

Run: `npm run preview` and open the shown localhost URL. Confirm:
- `/` shows org hero ("Quantum computing, done ethically"), About, TeamPreview, Become-a-member CTA in nav, countdown present. No "Three ways in", no Sponsors.
- `/events/qompute` shows the Qompute hero + Three ways in + Sponsors + sub-nav.
- Sub-nav links reach `/events/qompute/{schedule,speakers,faq,resources,register}`.
- Old `/speakers` redirects to `/events/qompute/speakers`; `/registration` redirects to `/events/qompute/register`; `/events` redirects to `/events/qompute`.
- Nav "About" from `/team` navigates home and scrolls to the About section.
- Both CTAs (nav Become-a-member, hero Register interest) resolve to their stub targets (email fallback / registration subpage) with no dead ends.

- [ ] **Step 4: Final commit if any verification fixups were needed**

```bash
git add -A
git commit -m "chore: restructure verification fixups" # only if changes were made
```

---

## Self-Review

**Spec coverage:**
- Home = org, keeps About + countdown teaser, member CTA, drops Three ways in + Sponsors → Task 5. ✓
- Hackathon at `/events/qompute` with hero + Three ways in + Sponsors + register + sub-nav → Tasks 3, 4. ✓
- Speakers/Schedule/FAQ/Resources as subpages → Task 2. ✓
- `/events` redirects; legacy flat URLs redirect → Task 2. ✓
- Two separate register concepts, both stubbed → Tasks 1, 5 (member), 4 (event register). ✓
- Nav "Events" label, About = `/#about` anchor → Tasks 5 (id), 6. ✓
- Build plumbing (postbuild, inject-meta, sitemap) tracks new routes → Task 7. ✓
- No em-dashes / no new deps / Node 20 → Global Constraints. ✓

**Placeholder scan:** No TBD/TODO in steps except the intentional `null` URL stubs (documented). CSS steps that say "mirror Hero.module.css" reference an exact existing file with exact class names, not vague instructions.

**Type consistency:** `event.joinFormUrl` / `event.registerFormUrl` defined in Task 1, consumed in Tasks 4 (register), 5 (OrgHero), 6 (Navbar). `injectRoute({title, description, canonical})` signature consistent in Task 7. Route paths identical across App.jsx (Task 2), EventSubnav (Task 3), Hero CTAs (Task 4), Navbar (Task 6), postbuild + inject-meta (Task 7).
