// TODO: fill real dates from the projected-dates table when it arrives.
// Only the final conference day (Oct 4) is confirmed so far.
const schedule = [
  {
    gate: 'R',
    label: 'Registration opens',
    date: null,
    detail: 'Google Form link goes live here and on @qee_usc.',
  },
  {
    gate: 'H',
    label: 'Challenges released',
    date: null,
    detail: 'Virtual quantum challenges open — work on them anywhere, on your own schedule.',
  },
  {
    gate: 'W',
    label: 'Workshop series',
    date: null,
    detail: 'Intro sessions to get first-timers up to speed before submissions close.',
  },
  {
    gate: 'M',
    label: 'Conference day @ USC',
    date: 'October 4, 2026',
    confirmed: true,
    detail: 'The in-person finale — keynote talks, hands-on workshops, panels, and merch.',
  },
];

export default schedule;
