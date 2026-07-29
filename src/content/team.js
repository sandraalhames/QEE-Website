// TODO: confirm real titles for each member (all currently generic 'E-Board
// Member') and fill in Laila once her headshot arrives. For each member:
//   name     : full name
//   role     : e.g. 'President', 'VP of Events'
//   photo    : import a 400x400+ square headshot from src/assets/team/ and
//              reference it here; leave null for the placeholder avatar
//   linkedin : profile URL, or null to hide the link
import aidenFox from '../assets/team/aiden-fox.jpg';
import peterMaiConnolly from '../assets/team/peter-mai-connolly.jpg';
import sandraAlHames from '../assets/team/sandra-al-hames.jpg';
import tinaHabibi from '../assets/team/tina-habibi.jpg';

const team = [
  {
    name: 'Aiden Fox',
    role: 'E-Board Member',
    photo: aidenFox,
    linkedin: 'https://www.linkedin.com/in/aidenfox',
  },
  {
    name: 'Tina Habibi',
    role: 'E-Board Member',
    photo: tinaHabibi,
    linkedin: 'https://www.linkedin.com/in/tina-habibi',
  },
  {
    name: 'Peter Mai Connolly',
    role: 'E-Board Member',
    photo: peterMaiConnolly,
    linkedin: 'https://www.linkedin.com/in/peter-mai-connolly/',
  },
  {
    name: 'Sandra Al Hames',
    role: 'E-Board Member',
    photo: sandraAlHames,
    linkedin: 'https://www.linkedin.com/in/sandra-al-hames/',
  },
  {
    name: null, role: 'E-Board Member', photo: null, linkedin: null,
  },
];

export default team;
