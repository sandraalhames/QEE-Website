// Runs at build time (postbuild) after index.html has been copied into each
// route folder. Every route folder currently serves a byte-identical copy of
// the homepage's <head>, so crawlers (including non-JS social scrapers that
// never execute React Router) see the same title/description/og tags no
// matter which route they hit. This script rewrites the per-route copies in
// place so each route gets accurate, route-specific meta.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

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

Object.entries(ROUTES).forEach(([route, copy]) => injectRoute(route, copy));

// eslint-disable-next-line no-console
console.log(`inject-meta: updated per-route meta for ${Object.keys(ROUTES).join(', ')}`);
