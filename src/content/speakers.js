// Confirmed Qompute 2026 speakers, from the bios and photos they sent.
//   name   : full name
//   title  : role and organization, shown under the photo
//   bio    : full bio, shown when the card is opened
//   photo  : import a headshot from src/assets/speakers/, or null for the placeholder
//   kind   : 'keynote' | 'panelist' | 'workshop'
// TODO: add headshots. Florenta Teodoridis and Ricky Young emailed photos;
// save them to src/assets/speakers/ and import them below.
const speakers = [
  {
    name: 'Florenta Teodoridis',
    title: 'Associate Professor of Management and Organization, USC Marshall School of Business',
    kind: 'panelist',
    photo: null,
    bio: [
      'Florenta Teodoridis is Associate Professor of Management and Organization and the Jorge Paulo and Susanna Lemann Chair in Entrepreneurship at the University of Southern California. Her main areas of interest are the economics of innovation and science, creativity and the impact of technology on society.',
      'She investigates factors that influence the rate and direction of technological advancements, such as research technologies, collaborations and breadth and depth of expertise, and the impact of technological advancements, such as artificial intelligence and quantum technologies, on business strategy and productivity. She is also a mentor for quantum technology startups at the Creative Destruction Lab, a leading entrepreneurship accelerator.',
      'Florenta’s work has been published in Management Science, American Economic Journal, Administrative Science Quarterly, Organization Science and Strategic Management Journal, among others.',
    ],
  },
  {
    name: 'Ricky Young',
    title: 'COO, qBraid',
    kind: 'workshop',
    photo: null,
    bio: [
      'Ricky Young is the COO of qBraid, a quantum computing cloud platform which supplies 34,000+ researchers, developers, and enterprises in quantum with access to QPUs, GPUs, and CPUs.',
      'He has most recently developed the integration for Quantinuum on the qBraid SDK in the latest release (v0.13.0), which he’s excited to showcase. Furthermore, qBraid has been moving quickly to become the agentic orchestration layer of quantum computing where, using the existing platform’s QPUs, GPUs, and CPUs, agents can build algorithmic solutions quickly.',
    ],
  },
];

export default speakers;
