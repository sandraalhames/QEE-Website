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

// Copy grounded in src/content/event.js: Qompute in LA is USC Quantum
// Engineering Ethics' quantum computing hackathon, virtual challenges
// leading to a single in-person conference day at USC on October 4, 2026.
const ROUTES = {
  schedule: {
    title: 'Schedule | QEE',
    description: "See the Qompute in LA schedule: virtual challenges leading up to the in-person conference day at USC on October 4, 2026, with talks and workshops.",
  },
  speakers: {
    title: 'Speakers | QEE',
    description: "Meet the speakers and panelists for Qompute in LA, USC Quantum Engineering Ethics' quantum computing conference day on October 4, 2026.",
  },
  faq: {
    title: 'FAQ | QEE',
    description: "Answers to common questions about Qompute in LA, USC Quantum Engineering Ethics' quantum computing hackathon and conference day on October 4, 2026.",
  },
  registration: {
    title: 'Register | QEE',
    description: "Register for Qompute in LA, USC Quantum Engineering Ethics' quantum computing hackathon culminating in a conference day at USC on October 4, 2026.",
  },
  resources: {
    title: 'Resources | QEE',
    description: "Learning resources to take you from zero to writing quantum circuits before Qompute in LA's conference day at USC on October 4, 2026.",
  },
  team: {
    title: 'Team | QEE',
    description: "Meet the USC students on the Quantum Engineering Ethics e-board organizing Qompute in LA, the quantum computing conference day on October 4, 2026.",
  },
};

// Targeted patterns matched against the exact tags currently emitted by the
// source index.html (see index.html <head>). Each pattern is scoped tightly
// enough to hit only its own tag and not neighboring meta tags.
function injectRoute(route, { title, description }) {
  const filePath = path.join(distDir, route, 'index.html');
  if (!existsSync(filePath)) {
    throw new Error(`inject-meta: expected ${filePath} to exist (run the postbuild copy step first).`);
  }

  let html = readFileSync(filePath, 'utf8');
  const canonicalUrl = `https://qeesc.org/${route}`;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/>/,
    `<meta name="description" content="${description}" />`,
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/>/,
    `<meta property="og:title" content="${title}" />`,
  );

  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${description}" />`,
  );

  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
  );

  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta name="twitter:title" content="${title}" />`,
  );

  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${description}" />`,
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
