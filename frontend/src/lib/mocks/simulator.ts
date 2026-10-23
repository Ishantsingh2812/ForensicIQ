import { Hotspot, ForensicCategory } from '../../types';

export interface SimulatorLevel {
  id: string;
  name: string;
  difficulty: 'Trainee' | 'Investigator' | 'Forensic Expert';
  description: string;
  maxMistakes: number;
  hotspots: Hotspot[];
}

export const simulatorLevels: SimulatorLevel[] = [
  {
    id: 'level-1',
    name: 'Executive Office Break-in & Assault',
    difficulty: 'Trainee',
    description: 'An overnight break-in occurred at a corporate executive suite. The safe was pried open and a security guard was incapacitated. Identify and secure high-priority evidence without contaminating the perimeter.',
    maxMistakes: 4,
    hotspots: [
      {
        id: 'hs-blood',
        label: 'Arterial Blood Spatter on Mahogany Desk',
        category: 'biological' as ForensicCategory,
        x: 32,
        y: 45,
        description: 'Directional blood drops with elliptical tails showing angle of impact and blunt trauma.',
        properOrder: 1, // Biological transient evidence should be photographed and swabbed early
        recommendedPackaging: 'Sterile cotton swab, air-dried at ambient temperature, placed in breathable paper envelope',
      },
      {
        id: 'hs-casing',
        label: 'Spent 9mm Brass Cartridge Casing',
        category: 'physical' as ForensicCategory,
        x: 48,
        y: 68,
        description: 'Fired cartridge resting near the conference carpet with visible firing-pin indentation.',
        properOrder: 2,
        recommendedPackaging: 'Non-metallic tweezers, rigid cardboard container with cotton padding, sealed with tamper-evident tape',
      },
      {
        id: 'hs-phone',
        label: 'Cracked Flagship Smartphone with Active Screen',
        category: 'digital' as ForensicCategory,
        x: 65,
        y: 52,
        description: 'Unlocked mobile displaying an unread encrypted chat notification with a 3-minute timer.',
        properOrder: 3,
        recommendedPackaging: 'Faraday isolation pouch or foil wrap, airplane mode enabled, power bank attached to prevent shutdown',
      },
      {
        id: 'hs-glass',
        label: 'Stemmed Crystal Wine Glass with Latent Lip/Finger Prints',
        category: 'physical' as ForensicCategory,
        x: 22,
        y: 35,
        description: 'Partially drunk beverage; clear sebum and sweat impressions on rim and stem.',
        properOrder: 4,
        recommendedPackaging: 'Handled strictly by base edge; secured in custom wooden glass transport rack without touching sides',
      },
      {
        id: 'hs-footprint',
        label: 'Muddy Tread Impression on Polished Marble Floor',
        category: 'physical' as ForensicCategory,
        x: 78,
        y: 75,
        description: 'Distinctive chevron lug pattern with a unique tear on the left heel outsole.',
        properOrder: 5,
        recommendedPackaging: 'Oblique lighting photograph with forensic scale ruler, electrostatic dust lifter or silicone casting',
      },
      {
        id: 'hs-note',
        label: 'Folded Handwritten Extortion Note',
        category: 'documentary' as ForensicCategory,
        x: 42,
        y: 28,
        description: 'Letter written on legal notepad stating "Pay the debt or the company burns".',
        properOrder: 6,
        recommendedPackaging: 'Handled with clean gloved tweezers; preserved in transparent archival mylar sleeve without folding',
      },
    ],
  },
  {
    id: 'level-2',
    name: 'Suburban Villa Homicide & Burglary',
    difficulty: 'Investigator',
    description: 'A multi-story residence with multiple points of forced entry, broken glassware, and suspect shoe prints leading to the back patio.',
    maxMistakes: 2,
    hotspots: [
      {
        id: 'hs-2-knife',
        label: '8-inch Chef Knife with Fingerprint on Bolster',
        category: 'physical',
        x: 55,
        y: 60,
        description: 'Stained blade with latent fingerprint on metal bolster.',
        properOrder: 1,
        recommendedPackaging: 'Secured inside rigid plastic weapon box with zip-ties',
      },
      {
        id: 'hs-2-fiber',
        label: 'Red Synthetic Fabric Fiber Caught on Window Latch',
        category: 'physical',
        x: 18,
        y: 25,
        description: 'Microscopic thread corresponding to woolen knitwear.',
        properOrder: 2,
        recommendedPackaging: 'Stainless tweezers into paper bindle inside clean envelope',
      },
      {
        id: 'hs-2-usb',
        label: 'High-Speed USB Storage Drive in Waste Bin',
        category: 'digital',
        x: 72,
        y: 40,
        description: 'Thumb drive containing database backup files.',
        properOrder: 3,
        recommendedPackaging: 'Anti-static ESD envelope sealed and initialed',
      },
    ],
  },
  {
    id: 'level-3',
    name: 'Clandestine Chemical Synthesis Lab',
    difficulty: 'Forensic Expert',
    description: 'Complex toxic chemical scene requiring PPE, biological decontamination, and meticulous Chain-of-Custody under NDPS Standing Order 1/89.',
    maxMistakes: 1,
    hotspots: [
      {
        id: 'hs-3-glassware',
        label: 'Condenser Flask with Crystallized Precursor Residue',
        category: 'biological',
        x: 40,
        y: 50,
        description: 'Reflux setup showing thermal condensation marks.',
        properOrder: 1,
        recommendedPackaging: 'Hazard-labeled inert teflon-lined transport box',
      },
      {
        id: 'hs-3-scale',
        label: 'Precision Analytical Digital Scale',
        category: 'physical',
        x: 60,
        y: 35,
        description: 'Weighing platform with fine white powder remnants.',
        properOrder: 2,
        recommendedPackaging: 'Dust-sealed container preserving powder deposit intact',
      },
    ],
  },
];
