// Qompute 2026 judges, in display order.
//   name  : full name
//   role  : optional line under the name (e.g. 'Former Participant'), or null
//   org   : organization
//   bio   : list of paragraphs shown when the card is opened; [] shows "Bio coming soon"
//   photo : import a headshot from src/assets/judges/, or null for the placeholder
// TODO: add headshots as judges send them.
import catherinePotts from '../assets/speakers/catherine-potts.jpg';
import sadmanAhmedShanto from '../assets/judges/sadman-ahmed-shanto.jpg';
import sandraAlHames from '../assets/team/sandra-al-hames.jpg';

import speakers from './speakers';

const bioOf = (name) => speakers.find((s) => s.name === name)?.bio || [];

const judges = [
  {
    name: 'Vatsal Vatsyayan', role: 'Former Participant', org: 'USC', photo: null, bio: [],
  },
  {
    name: 'Catherine Potts', role: null, org: 'D-Wave', photo: catherinePotts, bio: bioOf('Catherine Potts'),
  },
  {
    name: 'Sadman Ahmed Shanto',
    role: null,
    org: 'USC',
    photo: sadmanAhmedShanto,
    bio: [
      'Sadman Ahmed Shanto is a physics PhD candidate at the Levenson-Falk Lab at USC working on superconducting quantum hardware.',
    ],
  },
  {
    name: 'Sandra Al Hames', role: null, org: 'USC', photo: sandraAlHames, bio: [],
  },
  {
    name: 'Sophy Shin', role: null, org: 'IBM Quantum', photo: null, bio: bioOf('Sophy Shin'),
  },
  {
    name: 'Faustin Carter', role: null, org: 'HRL', photo: null, bio: [],
  },
];

export default judges;
