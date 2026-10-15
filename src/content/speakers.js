// Qompute 2026 speakers, in display order.
//   name   : full name
//   title  : organization, shown under the role on the card
//   bio    : list of paragraphs shown when the card is opened; [] shows "Bio coming soon"
//   photo  : import a headshot from src/assets/speakers/, or null for the placeholder
//   kind   : 'keynote' | 'speaker' | 'panelist' | 'workshop'
// Affiliations follow IBM's guidance for public pages: 'IBM Research' for IBM
// speakers, 'HRL Laboratories, LLC' for HRL speakers.
// TODO: add headshots and the remaining bios as speakers send them.
import aaronWirthwein from '../assets/speakers/aaron-wirthwein.jpg';
import bhaskarKrishnamachari from '../assets/speakers/bhaskar-krishnamachari.jpg';
import catherinePotts from '../assets/speakers/catherine-potts.jpg';
import florentaTeodoridis from '../assets/speakers/florenta-teodoridis.jpg';
import rosaDiFelice from '../assets/speakers/rosa-di-felice.jpg';
import serenaGodwin from '../assets/speakers/serena-godwin.jpg';
import thaddeusLadd from '../assets/speakers/thaddeus-ladd.jpg';

const speakers = [
  {
    name: 'Sophy Shin',
    title: 'IBM Research',
    kind: 'keynote',
    roleLabel: 'Keynote Speaker & Panelist',
    photo: null,
    bio: [
      'My unique career path has taken me from space engineering and computational physics to a Ph.D. in quantum algorithms, a journey I proudly navigated after a seven-year career break to raise my two sons as a home-stay mom. This diverse background gives me a rare ability to bridge different technical domains and rapidly master new technologies.',
      'As a Quantum Strategist at IBM, I now channel this expertise into education and workforce development. I focus on creating impactful educational content and building educational strategies with North American universities to grow the quantum ecosystem.',
      'A firm believer in the proverb, “it takes a village to raise a child,” I apply this philosophy to nurturing the next generation of computational scientists. My goal is to foster a vibrant and inclusive developer community, connecting cutting-edge technology with the people who will shape its future.',
    ],
  },
  {
    name: 'Thaddeus Ladd',
    title: 'HRL Laboratories, LLC',
    kind: 'keynote',
    photo: thaddeusLadd,
    bio: [
      'Thaddeus D. Ladd, Ph.D. is a distinguished quantum information scientist serving as Chief Scientist of the Qubit Systems Laboratory at HRL Laboratories in Malibu, California. He earned his B.S. in physics from Harvey Mudd College in 1998 before pursuing his graduate studies at Stanford University, where he obtained both an M.S. and a Ph.D. in Applied Physics in 2005. Prior to joining HRL Laboratories in late 2009, he performed project research at Stanford\'s Edward L. Ginzton Laboratory while holding appointments with the University of Tokyo and Japan’s National Institute of Informatics.',
      'Thaddeus\'s research typically provides the computational and management “glue” connecting quantum theory and cryogenic experiment, enabling pioneering advances in silicon spin qubits, integrated quantum optics, and practical architectures for scalable, fault-tolerant quantum error correction. Thaddeus is a Fellow of the Fannie and John Hertz Foundation and a Fellow of the American Physical Society. His technical leadership and high-impact contributions at HRL have also been recognized with multiple HRL-internal honors, including HRL\'s prestigious Chairman’s Award.',
    ],
  },
  {
    name: 'Serena Godwin',
    title: 'IBM Research',
    kind: 'keynote',
    photo: serenaGodwin,
    bio: [
      'Serena Godwin is a Quantum Event Manager at IBM Quantum, where she leads large-scale community and educational initiatives within the quantum computing ecosystem. Based in Los Angeles, California, Serena began her IBM journey as an intern in 2022 before joining full-time now within the Experience and Marketing team.',
      'Since then she has led and built out the Qiskit Fall Fest, IBM Quantum’s largest annual community program, helping it reach more than 32,000 participants globally in the past year. Her work focuses on fostering engagement, expanding access to quantum education, and building the worldwide quantum community.',
    ],
  },
  {
    name: 'Aaron Wirthwein',
    title: 'Assistant Professor (Teaching), Department of Physics and Astronomy, USC',
    kind: 'panelist',
    photo: aaronWirthwein,
    bio: [
      'Professor Aaron Wirthwein teaches physics and astronomy at the University of Southern California, where his courses range from introductory physics and astronomy to upper-division mechanics, electromagnetism, and quantum mechanics. His background is in computational physics, with a focus on Bose-Einstein condensation.',
      'His teaching emphasizes how physical ideas are constructed, including the assumptions and principles behind a model and the evidence that supports it. He presents science as an ongoing effort to build, test, and refine explanations of the natural world.',
    ],
  },
  {
    name: 'Florenta Teodoridis',
    title: 'USC',
    kind: 'panelist',
    photo: florentaTeodoridis,
    bio: [
      'Florenta Teodoridis is Associate Professor of Management and Organization and the Jorge Paulo and Susanna Lemann Chair in Entrepreneurship at the University of Southern California. Her main areas of interest are the economics of innovation and science, creativity and the impact of technology on society.',
      'She investigates factors that influence the rate and direction of technological advancements, such as research technologies, collaborations and breadth and depth of expertise, and the impact of technological advancements, such as artificial intelligence and quantum technologies, on business strategy and productivity. She is also a mentor for quantum technology startups at the Creative Destruction Lab, a leading entrepreneurship accelerator.',
      'Florenta’s work has been published in Management Science, American Economic Journal, Administrative Science Quarterly, Organization Science and Strategic Management Journal, among others.',
    ],
  },
  {
    name: 'Rosa Di Felice',
    title: 'USC',
    kind: 'panelist',
    photo: rosaDiFelice,
    bio: [
      'Rosa Di Felice is a Professor of Physics and Astronomy and of Quantitative and Computational Biology at the University of Southern California, and a Research Director at the CNR-NANO Institute in Modena, Italy. She earned her Ph.D. in Physics from the University of Rome "Tor Vergata" and was a DARPA postdoctoral researcher at Xerox PARC.',
      'Her research in theoretical and computational biophysics examines the electronic and structural properties of DNA and proteins, charge transport in biological systems, and hybrid bio-nano materials. She is also exploring how quantum computation can be applied to problems in nanoscience, chemistry, materials science, physics, and biology.',
    ],
  },
  {
    name: 'Bhaskar Krishnamachari',
    title: 'USC',
    kind: 'panelist',
    photo: bhaskarKrishnamachari,
    bio: [],
  },
  {
    name: 'Catherine Potts',
    title: 'D-Wave',
    kind: 'panelist',
    photo: catherinePotts,
    bio: [],
  },
  {
    name: 'Ricky Young',
    title: 'qBraid',
    kind: 'workshop',
    photo: null,
    bio: [
      'Ricky Young is the COO of qBraid, a quantum computing cloud platform which supplies 34,000+ researchers, developers, and enterprises in quantum with access to QPUs, GPUs, and CPUs.',
      'He has most recently developed the integration for Quantinuum on the qBraid SDK in the latest release (v0.13.0), which he’s excited to showcase. Furthermore, qBraid has been moving quickly to become the agentic orchestration layer of quantum computing where, using the existing platform’s QPUs, GPUs, and CPUs, agents can build algorithmic solutions quickly.',
    ],
  },
];

export default speakers;
