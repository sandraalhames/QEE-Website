// Conference-day agenda, October 18, 2026, TCC 450 at USC.
// Times may still shift; organizer set-up (11:00 am - 1:00 pm) is
// intentionally not listed publicly.
// kind: 'talk' | 'workshop' | 'panel' | 'logistics'
const LOCATION = 'TCC 450';

const dayof = [
  {
    time: '1:00 - 1:30 pm', title: 'Check-in', kind: 'logistics', location: LOCATION,
  },
  {
    time: '1:30 - 3:00 pm', title: 'Keynote Talk with IBM Quantum and HRL', kind: 'talk', location: LOCATION,
  },
  {
    time: '3:00 - 3:10 pm', title: 'Networking, snacks, and group photo break', kind: 'logistics', location: LOCATION,
  },
  {
    time: '3:10 - 4:30 pm', title: 'Wholistic View of Quantum Panel', kind: 'panel', location: LOCATION,
  },
  {
    time: '4:30 - 5:30 pm', title: 'Networking and snack break', kind: 'logistics', location: LOCATION,
  },
  {
    time: '4:30 - 5:30 pm', title: 'Quantum Workshop with qBraid', kind: 'workshop', location: LOCATION,
  },
  {
    time: '5:30 - 6:00 pm', title: 'Announcing of Winners and Closing Remarks', kind: 'logistics', location: LOCATION,
  },
  {
    time: '6:00 - 7:00 pm', title: 'Dinner', kind: 'logistics', location: LOCATION,
  },
];

export default dayof;
