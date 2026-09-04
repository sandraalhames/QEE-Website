import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import event from '../content/event';

// The components read these keys directly. If a content edit drops one (e.g.
// renames registerFormUrl), the CTAs break; this catches it before merge.
describe('event content shape', () => {
  it('exposes the keys components depend on', () => {
    expect(event).toHaveProperty('finalEventDateLabel');
    expect(event).toHaveProperty('joinFormUrl');
    expect(event).toHaveProperty('registerFormUrl');
    expect(event).toHaveProperty('gcalUrl');
  });

  it('keeps the form URLs as either a string or null (never undefined)', () => {
    expect(['string', 'object']).toContain(typeof event.joinFormUrl);
    expect(['string', 'object']).toContain(typeof event.registerFormUrl);
  });
});

// The event date is duplicated across content, components, index.html JSON-LD
// and the meta script. It moved Oct 4 -> Oct 18 on 2026-09-04 and had to be
// changed in 12 files; a half-done edit ships a site quoting two dates, which
// is worse than either. This fails if the copies drift apart again.
describe('event date is consistent everywhere', () => {
  const iso = event.finalEventDate;

  it('label, gcal link and ISO date agree', () => {
    const [, month, day] = iso.split('-');
    const monthName = new Date(`${iso}T12:00:00Z`).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    expect(event.finalEventDateLabel).toBe(`${monthName} ${Number(day)}, ${iso.slice(0, 4)}`);
    expect(event.gcalUrl).toContain(`dates=${iso.replace(/-/g, '')}/`);
    expect(month).toBeTruthy();
  });

  it('no stale October 4 copy survives in shipped content', () => {
    const files = ['index.html', 'scripts/inject-meta.mjs', 'src/content/faq.js', 'src/content/schedule.js', 'src/components/home/Countdown.jsx'];
    files.forEach((f) => {
      const text = readFileSync(resolve(process.cwd(), f), 'utf8');
      expect(text).not.toMatch(/October 4, 2026|2026-10-04|20261004/);
    });
  });
});
