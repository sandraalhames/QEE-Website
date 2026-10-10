// Past and current supporters, shown on the Qompute landing page.
//   name : used as the logo's alt text
//   logo : imported asset from src/assets/sponsors/
//   url  : the organization's site, or null to show the logo without a link
// TODO: add IBM Quantum once a working logo file (PNG/SVG) is available; the
// supplied .ai file was corrupted and would not render.
// TODO: confirm the name and link for the arrow-mark logo (unknown-arrow.png).
import uscViterbi from '../assets/sponsors/usc-viterbi.png';
import uscWie from '../assets/sponsors/usc-wie.png';
import cqn from '../assets/sponsors/cqn.png';
import unitaryFoundation from '../assets/sponsors/unitary-foundation.png';
import itu from '../assets/sponsors/itu.png';
import wiser from '../assets/sponsors/wiser.png';
import arrowMark from '../assets/sponsors/unknown-arrow.png';

const sponsors = [
  { name: 'USC Viterbi School of Engineering', logo: uscViterbi, url: 'https://viterbischool.usc.edu' },
  { name: 'USC Viterbi Women in Engineering', logo: uscWie, url: null },
  { name: 'Center for Quantum Networks', logo: cqn, url: 'https://cqn-erc.org' },
  { name: 'Unitary Foundation', logo: unitaryFoundation, url: 'https://unitary.foundation' },
  { name: 'International Telecommunication Union', logo: itu, url: 'https://www.itu.int' },
  { name: 'WISER', logo: wiser, url: null },
  { name: 'Supporter', logo: arrowMark, url: null },
];

export default sponsors;
