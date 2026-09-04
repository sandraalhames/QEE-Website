// Date confirmed 2026-09-04: the final event is OCTOBER 18, 2026 (moved from
// Oct 4). The live sign-up form states the same date. Full multi-week schedule
// (challenge release, workshops) still pending; waiting on the projected-dates table.
const event = {
  finalEventDate: '2026-10-18',
  finalEventDateLabel: 'October 18, 2026',
  format: 'Challenges run virtually in the weeks leading up to the event (like last year). The final day is an in-person conference with talks, workshops, and merch.',
  // registerFormUrl = the hackathon sign-up ('Qompute 2026 Sign Up').
  // joinFormUrl is the SEPARATE org-membership page: QEE's EngageSC "Join
  // Group" (RSO-Academic, membership runs to 2027-05-31). Requires a USC
  // login, so it is deliberately NOT the hackathon path -- non-USC entrants
  // register via registerFormUrl. Both open in a new tab (Button/Navbar/
  // Footer switch on href.startsWith('http')); null would fall back to the
  // qee@usc.edu mailto.
  joinFormUrl: 'https://engage.usc.edu/QEE/club_signup',
  registerFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf10oBaX-tgEp52jEfvt7erHJbB5_9Foxe257Ccra5c6vpBnA/viewform',
  gcalUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=Qompute+in+LA+2026'
    + '&dates=20261018/20261019'
    + '&details=Quantum+computing+%26+ethics+conference+day+by+USC+Quantum+Engineering+Ethics.+Info:+https://qeesc.org'
    + '&location=University+of+Southern+California,+Los+Angeles,+CA',
};

export default event;
