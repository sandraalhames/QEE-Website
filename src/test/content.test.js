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
