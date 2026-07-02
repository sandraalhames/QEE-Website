// Conference-day agenda skeleton, October 4, 2026.
// TODO: fill real times/locations/titles when the run-of-show is locked.
// Blocks below reflect the confirmed format (talks, workshops, panels,
// merch); times stay null until scheduled so the page renders "time tba".
// kind: 'talk' | 'workshop' | 'panel' | 'logistics'
const dayof = [
  {
    time: null, title: 'Check-in opens', kind: 'logistics', location: null,
  },
  {
    time: null, title: 'Opening keynote', kind: 'talk', location: null,
  },
  {
    time: null, title: 'Workshop block', kind: 'workshop', location: null,
  },
  {
    time: null, title: 'Panel: quantum ethics', kind: 'panel', location: null,
  },
  {
    time: null, title: 'Closing talk and awards', kind: 'talk', location: null,
  },
];

export default dayof;
