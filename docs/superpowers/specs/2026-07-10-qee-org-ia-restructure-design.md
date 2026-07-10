# QEE Org IA Restructure — Design

Date: 2026-07-10
Branch: `qee-org-restructure` (off `web-improvements`)

## Goal

Re-frame the site from "the Qompute in LA hackathon" into **QEE the org's permanent home**, with the hackathon demoted to one event under a scalable `/events/` hierarchy. The org shell persists year to year; events come and go beneath it.

This is an information-architecture pivot, not a rebuild. The homepage is already composed of separable section components and the hackathon pages are already their own routes, so the work is mostly re-parenting: routing, moving pages, nav, and copy — no new component logic.

## Decisions (locked)

- **Membership = a join form link**, not real auth. The site is static (GitHub Pages, no backend), so "become a QEE member" / "log in" is a link to an external form (Google Form / USC org portal). No accounts, no passwords.
- **Hackathon lives at `/events/qompute`** with subpages beneath it (scalable events hierarchy).
- **About stays a Home section only** (nav "About" scrolls to it); no dedicated `/about` page yet.
- **`/events` redirects to `/events/qompute`** for now; a real events index page is deferred until a second event exists.

## Target site map

### Org (top level, permanent)
- `/` — **Home.** Org landing. Sections: reworded org Hero, About, Countdown (reframed as a teaser to the flagship event, links into `/events/qompute`), Sponsors, TeamPreview. Primary CTA → **Become a QEE member** (join form). "Three ways in" removed from here.
- `/team` — org team (unchanged content/component).

### Events
- `/events` — `<Navigate to="/events/qompute" replace />` (redirect, no page yet).
- `/events/qompute` — **Hackathon landing.** Its own Hero ("Qompute in LA" — the current homepage Hero content moves here), Countdown, "Three ways in" (`Expect`), hackathon **Register** CTA, and a section sub-nav. Serves as the hub for the event's subpages.
- `/events/qompute/schedule`
- `/events/qompute/speakers`  ← Speakers is now a subpage of the hackathon
- `/events/qompute/faq`
- `/events/qompute/resources`  ← "learn quantum before you compete" learning links
- `/events/qompute/register`  (was `/registration`)

### Redirects (preserve existing links / QR codes / SEO)
Old flat path → new nested path, via client-side `<Navigate replace>`:
- `/schedule` → `/events/qompute/schedule`
- `/speakers` → `/events/qompute/speakers`
- `/faq` → `/events/qompute/faq`
- `/registration` → `/events/qompute/register`
- `/resources` → `/events/qompute/resources`

## Navigation

- **Top-level Navbar:** Home · About · Events · Team · **[Become a member]** CTA button.
  - "About" links to `/#about` (a hash anchor on the Home About section) so it works from any page — navigates to Home then scrolls. The Home About section gets `id="about"`.
  - "Events" links to `/events/qompute` (the only event) for now.
- **Hackathon sub-nav:** a secondary nav rendered inside the `/events/qompute` layout — Schedule · Speakers · FAQ · Resources · Register — so the event reads as its own mini-site. Active-link styling scoped to the section.

## Two distinct "register" concepts

| Context | Label | Target |
|---------|-------|--------|
| Home / org | "Become a QEE member" | Org join form (external, **stubbed** until URL provided) |
| Hackathon | "Register" | Hackathon registration form (external, **stubbed** — `REGISTRATION_FORM_URL` still null) |

These never share a button. The org CTA is about joining QEE; the hackathon CTA is about entering the event.

## Component / file plan

New:
- `src/pages/events/QomputeLayout.jsx` — wraps the event subpages: renders the hackathon sub-nav + `<Outlet />`. Uses nested routing.
- `src/pages/events/QomputeLanding.jsx` — the `/events/qompute` index (Hero + Countdown + Expect + Register CTA).
- `src/components/events/EventSubnav.jsx` — the section sub-nav.
- `src/components/home/OrgHero.jsx` — the reworded org homepage hero (org identity + "Become a member" CTA + countdown teaser). The existing `Hero.jsx` (Qompute-branded) moves into the Qompute landing.

Moved / re-parented (files may stay in place; routing changes):
- `Schedule`, `Speakers`, `Faq`, `Registration`→`Register`, `Resources` become children of `QomputeLayout`. Their primary `<h1>` (added in the web-improvements pass) is retained.

Edited:
- `src/App.jsx` — nested route tree under `/events/qompute`, redirect routes for old flat paths and `/events`.
- `src/components/layout/Navbar.jsx` — top-level org nav + "Become a member" CTA; drop hackathon links from the global nav.
- `src/pages/Home.jsx` — swap `Hero`→`OrgHero`, remove `Expect`, keep About/Sponsors/TeamPreview; add member CTA.
- `src/components/home/Expect.jsx` — unchanged component, now rendered on the Qompute landing instead of Home.
- `src/content/` — add `src/content/qompute.js` (or extend `event.js`) so event metadata (name, dates, CTAs) is centralized; add join-form + register URLs here (stubbed).

Build / SEO plumbing (must track the new routes):
- `package.json` `postbuild` — regenerate the route-folder list to create `dist/events/qompute/{schedule,speakers,faq,resources,register}/index.html` and the redirect folders (`dist/schedule`, etc.) so direct hits return 200 and the SPA boots.
- `scripts/inject-meta.mjs` — update the ROUTES map to the new nested paths (per-route title/description/canonical/og:url).
- `public/sitemap.xml` — replace flat URLs with the nested ones; drop redirect-only paths from the sitemap (or list canonical nested only).

## Static-hosting redirect mechanics

GitHub Pages is static. Redirects are client-side: old paths are real routes that render `<Navigate replace>`. For direct hits to a deep URL, the existing SPA fallback applies (`postbuild` copies `index.html` into each route folder; unknown paths fall through to `404.html`, which boots the SPA). The postbuild folder list must therefore include **both** the new nested paths and the legacy redirect paths so neither 404s at the CDN before the SPA loads.

## Out of scope (still blocked on content)

- Real join-form URL and hackathon register URL (both stay stubbed).
- Real speakers / team roster + photos / sponsor logos / schedule dates.
- Events index page at `/events` (deferred to 2nd event).
- Dedicated `/about` page (deferred).

## Testing / verification

- `npm run lint` → 0 errors.
- `npm run build` → clean; then assert:
  - `dist/events/qompute/speakers/index.html` exists with speaker-specific meta.
  - Legacy `dist/speakers/index.html` exists (redirect boots, no CDN 404).
  - `inject-meta` output differs per nested route.
- Manual/`/verify` browser pass: Home shows org framing + member CTA; `/events/qompute` shows the hackathon hero + subnav; old `/speakers` redirects to `/events/qompute/speakers`; hackathon Register and org Member CTAs point to their respective (stubbed) targets.
