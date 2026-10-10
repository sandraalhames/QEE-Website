// TODO: confirm real titles for the remaining members (currently generic
// 'E-Board Member') and fill in Laila once her headshot arrives. For each member:
//   name     : full name
//   role     : e.g. 'President', 'VP of Events'
//   photo    : import a 400x400+ square headshot from src/assets/team/ and
//              reference it here; leave null for the placeholder avatar
//   linkedin : profile URL, or null to hide the link
import aidenFox from '../assets/team/aiden-fox.jpg';
import giovanniSuarez from '../assets/team/giovanni-suarez.jpg';
import nehirKeskin from '../assets/team/nehir-keskin.jpg';
import peterMaiConnolly from '../assets/team/peter-mai-connolly.jpg';
import roseSifuentes from '../assets/team/rose-sifuentes.jpg';
import sandraAlHames from '../assets/team/sandra-al-hames.jpg';
import tinaHabibi from '../assets/team/tina-habibi.jpg';

// Current officers first, then former officers.
const team = [
  {
    name: 'Sandra Al Hames',
    role: 'President and Founder',
    photo: sandraAlHames,
    linkedin: 'https://www.linkedin.com/in/sandra-al-hames/',
  },
  {
    name: 'Nehir Keskin',
    role: 'Vice President',
    photo: nehirKeskin,
    linkedin: 'https://www.linkedin.com/in/nehirkeskin/',
  },
  {
    name: 'Tina Habibi',
    role: 'Qompute 2026 Co-Organizer',
    photo: tinaHabibi,
    linkedin: 'https://www.linkedin.com/in/tina-habibi/',
  },
  {
    name: 'Aiden Fox',
    role: 'E-Board Member',
    photo: aidenFox,
    linkedin: 'https://www.linkedin.com/in/aidenfox',
  },
  {
    name: 'Peter Mai Connolly',
    role: 'E-Board Member',
    photo: peterMaiConnolly,
    linkedin: 'https://www.linkedin.com/in/peter-mai-connolly/',
  },
  {
    name: null, role: 'E-Board Member', photo: null, linkedin: null,
  },
  {
    name: 'Giovanni Suarez',
    role: 'Former Vice President',
    photo: giovanniSuarez,
    linkedin: 'https://www.linkedin.com/in/gio-suarez-usc/',
  },
  {
    name: 'Rose Sifuentes',
    role: 'Former Secretary',
    photo: roseSifuentes,
    linkedin: null,
  },
];

export default team;
