// Qompute 2026 judges, in display order.
//   name  : full name
//   role  : optional line under the name (e.g. 'Former Participant'), or null
//   org   : organization
//   bio   : list of paragraphs shown when the card is opened; [] shows "Bio coming soon"
//   photo : import a headshot from src/assets/judges/, or null for the placeholder
// TODO: add headshots as judges send them.
import catherinePotts from '../assets/speakers/catherine-potts.jpg';
import sophyShin from '../assets/speakers/sophy-shin.jpg';
import sadmanAhmedShanto from '../assets/judges/sadman-ahmed-shanto.jpg';

import speakers from './speakers';

const bioOf = (name) => speakers.find((s) => s.name === name)?.bio || [];

const judges = [
  {
    name: 'Vatsal Vatsyayan', role: null, org: 'Former Qompute participant, USC', photo: null, bio: [],
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
    name: 'Jeanie Qi', role: null, org: 'USC', photo: null, bio: [],
  },
  {
    name: 'Sophy Shin', role: null, org: 'IBM Research', photo: sophyShin, bio: bioOf('Sophy Shin'),
  },
  {
    name: 'Faustin Carter',
    role: null,
    org: 'HRL Laboratories, LLC',
    photo: null,
    bio: [
      'Faustin Carter is the Qubit Systems Software and Theory lead at HRL Laboratories where he has spent the last eight years working on spin qubit systems. Prior to HRL he did a joint postdoc at Argonne National Laboratories and U. Chicago where he worked on the South Pole Telescope’s third-generation CMB focal plane. He holds a PhD from Yale University where he specialized in building superconducting electronics for photon detectors.',
    ],
  },
  {
    name: 'Parker Williams',
    role: null,
    org: 'HRL Laboratories, LLC',
    photo: null,
    bio: [
      'Parker Williams is a scientist at HRL Laboratories, where he has spent over eight years specializing in quantum error correction, fault-tolerant quantum computing, and quantum software development. His work spans quantum circuit design and optimization, decoding algorithms, quantum compilation, and semiconductor spin qubit architectures. He holds an M.S. in Theoretical Computer Science from Columbia University and a B.S. in Computer Science from UC Irvine.',
    ],
  },
  {
    name: 'Abigail Wessels',
    role: null,
    org: 'HRL Laboratories, LLC',
    photo: null,
    bio: [
      'Abigail Wessels is a research scientist at HRL Laboratories specializing in low-temperature physics and qubit control electronics. She earned her PhD from the University of Colorado Boulder and conducted postdoctoral research within the Quantum Sensors Group at the National Institute of Standards and Technology (NIST). Currently, she serves as lead developer for spinQICK, an open-source software platform designed to provide cost-effective quantum control infrastructure for solid-state spin qubits using RFSoC FPGA hardware.',
    ],
  },
];

export default judges;
