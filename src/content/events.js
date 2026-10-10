// Events listed in the navbar's Events dropdown, in display order.
// `page` holds placeholder copy for events that don't have a full section yet;
// Qompute 2026 has its own nested pages and needs no `page` entry.
const events = [
  { slug: 'qompute', label: 'Qompute 2026', to: '/events/qompute' },
  {
    slug: 'qompute-2025',
    label: 'Qompute 2025',
    to: '/events/qompute-2025',
    page: {
      eyebrow: 'past event',
      title: 'Qompute 2025',
      subtitle: 'Our 2025 quantum hackathon, run with challenges provided by IBM Quantum and completed in Qiskit.',
      body: [
        'Teams chose from three tracks tied to the UN Sustainable Development Goals: reversible computing, quantum optimization for impact, and quantum chemistry for sustainable technologies.',
        'Beyond implementing an algorithm, every team was asked to consider the real-world application and social context of its work.',
      ],
      link: { href: 'https://github.com/sandraalhames/Q-3-Qompute-2025', label: 'View the 2025 challenges on GitHub' },
    },
  },
  {
    slug: 'lecture-series',
    label: 'Lecture Series',
    to: '/events/lecture-series',
    page: {
      eyebrow: 'event',
      title: 'Lecture Series',
      subtitle: 'Talks on quantum computing and the ethics of emerging technology.',
      body: ['Details about upcoming and past lectures are coming soon.'],
      link: null,
    },
  },
  {
    slug: 'lab-tour',
    label: 'Lab Tour',
    to: '/events/lab-tour',
    page: {
      eyebrow: 'event',
      title: 'Lab Tour',
      subtitle: 'A behind-the-scenes look at quantum research labs.',
      body: ['Details about our lab tours are coming soon.'],
      link: null,
    },
  },
];

export default events;
