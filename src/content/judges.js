// Qompute 2026 judges, in display order.
//   name  : full name
//   role  : optional line under the name (e.g. 'Former Participant'), or null
//   org   : organization
//   photo : import a headshot from src/assets/judges/, or null for the placeholder
// TODO: add headshots as judges send them.
import catherinePotts from '../assets/speakers/catherine-potts.jpg';
import sandraAlHames from '../assets/team/sandra-al-hames.jpg';

const judges = [
  {
    name: 'Vatsal Vatsyayan', role: 'Former Participant', org: 'USC', photo: null,
  },
  {
    name: 'Catherine Potts', role: null, org: 'D-Wave', photo: catherinePotts,
  },
  {
    name: 'Sadman Ahmed Shanto', role: null, org: 'USC', photo: null,
  },
  {
    name: 'Sandra Al Hames', role: null, org: 'USC', photo: sandraAlHames,
  },
  {
    name: 'Sophy Shin', role: null, org: 'IBM Quantum', photo: null,
  },
  {
    name: 'Faustin Carter', role: null, org: 'HRL', photo: null,
  },
];

export default judges;
