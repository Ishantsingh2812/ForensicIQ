import { CaseStudy } from '../../types';

export const mockCaseStudies: CaseStudy[] = [
  // 1. NDPS 1
  {
    id: 'case-ndps-001',
    slug: 'state-v-karan-ndps-2024',
    title: 'State of Goa v. Karan Sethi (Commercial Quantity MDMA Interception)',
    category: 'NDPS',
    difficulty: 'Advanced',
    summary: 'Highway toll checkpoint recovery of 2.4 kg MDMA concealed in vehicle spare tyre with procedural analysis of Section 50 NDPS compliance.',
    date: '2024-09-05',
    jurisdiction: 'Special NDPS Court, Panaji, Goa',
    factsTimeline: [
      { time: '04:15 AM', event: 'Secret intelligence received by ANC inspector and logged in Station General Diary.' },
      { time: '04:30 AM', event: 'Checkpoint established at Anjuna Toll Plaza with two independent panch witnesses.' },
      { time: '05:10 AM', event: 'Silver sedan stopped; notice under Section 50 NDPS served in writing to suspect.' },
      { time: '05:40 AM', event: 'Executive Magistrate arrives; vehicle searched, 2.4 kg MDMA found inside spare tire.' },
      { time: '06:15 AM', event: 'Field Narcotic Test positive; seizure memo drawn and sealed with brass seal impression.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'NDPS Act Sec 22(c)', title: 'Commercial quantity psychotropic substance possession' },
      { act: 'BNS', section: 'BNS Sec 3(5)', title: 'Joint liability & criminal conspiracy' },
    ],
    evidenceList: [
      { item: '2.4 kg MDMA crystals', category: 'biological', probativeValue: 'Commercial quantity trigger for statutory reverse burden of proof' },
      { item: 'Brass seal stamped seizure memo', category: 'documentary', probativeValue: 'Chain of custody proof under Standing Order 1/89' },
      { item: 'Dashboard dashcam footage', category: 'digital', probativeValue: 'Corroboration of voluntary disclosure' },
    ],
    outcome: 'Bail dismissed by High Court; held that compliance with Section 50 was scrupulous and commercial quantity bar under Section 37 applies.',
  },
  // 2. NDPS 2
  {
    id: 'case-ndps-002',
    slug: 'narcotics-bureau-v-singh-2023',
    title: 'NCB v. Harpreet Singh (Darknet Courier Synthetic Opioid Seizure)',
    category: 'NDPS',
    difficulty: 'Intermediate',
    summary: 'International postal courier parcel containing fentanyl concealed in hollowed machinery parts tracked via digital forensic logs.',
    date: '2023-11-18',
    jurisdiction: 'Foreign Post Office, New Delhi',
    factsTimeline: [
      { time: '11:00 AM', event: 'Canine unit detects organic odor in consignment marked "Hydraulic Lathe Spare".' },
      { time: '12:30 PM', event: 'Customs and NCB open box under video surveillance; 450g fentanyl powder discovered.' },
      { time: '04:00 PM', event: 'Controlled delivery executed at recipient address in Rohini.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'NDPS Sec 21(c)', title: 'Manufacture/import/export of commercial narcotic drugs' },
      { act: 'BNS', section: 'BNS Sec 61', title: 'Criminal conspiracy' },
    ],
    evidenceList: [
      { item: '450g Fentanyl lab sample', category: 'biological', probativeValue: 'Chemical purity analysis exceeding 92%' },
      { item: 'Encrypted Wickr chat export', category: 'digital', probativeValue: 'Ties accused crypto wallet to sender' },
    ],
    outcome: 'Accused convicted under Section 21(c) NDPS Act; 10 years rigorous imprisonment.',
  },
  // 3. Property Theft 1
  {
    id: 'case-prop-001',
    slug: 'delhi-cyber-bank-theft',
    title: 'State (NCT of Delhi) v. Alok & Ors (Automated Clearing House Database Infiltration)',
    category: 'Property Theft',
    difficulty: 'Advanced',
    summary: 'Unauthorised server access and theft of electronic bearer securities amounting to ₹14 Crores using trojanized maintenance scripts.',
    date: '2024-04-12',
    jurisdiction: 'Chief Metropolitan Magistrate, Patiala House Courts',
    factsTimeline: [
      { time: '01:30 AM', event: 'Privileged IT account accessed from unexpected Ukrainian proxy IP.' },
      { time: '02:00 AM', event: 'Automated batch script executes unauthorized wire transfers to 18 split accounts.' },
      { time: '06:00 AM', event: 'Morning reconciliation triggers fraud alert; CERT-In notified.' },
    ],
    sectionsApplied: [
      { act: 'BNS', section: 'BNS Sec 303(2)', title: 'Theft of digital movable property' },
      { act: 'IPC', section: 'IPC Sec 379 / 420', title: 'Theft & Cheating by impersonation' },
      { act: 'BNS', section: 'BNS Sec 318(4)', title: 'Cheating with dishonest intention' },
    ],
    evidenceList: [
      { item: 'Firewall PCAP logs with SHA-256 hash', category: 'digital', probativeValue: 'Proof of payload injection and command & control' },
      { item: 'Beneficiary bank KYC records', category: 'documentary', probativeValue: 'Identifies mule account operators' },
    ],
    outcome: 'Charges framed under BNS 303(2), 318(4) and Section 66 IT Act; cyber forensic imaging upheld under Section 63 BSA.',
  },
  // 4. Property Theft 2
  {
    id: 'case-prop-002',
    slug: 'jaipur-museum-antique-theft',
    title: 'State of Rajasthan v. Mahesh Kumar (Heritage Idol Theft from Havelí)',
    category: 'Property Theft',
    difficulty: 'Beginner',
    summary: 'Nocturnal break-in and theft of 12th century bronze idol using glass cutters, leaving latent finger marks on display case.',
    date: '2023-08-22',
    jurisdiction: 'District Court, Jaipur',
    factsTimeline: [
      { time: '03:15 AM', event: 'Perimeter motion detector tripped; guard reported false alarm without physical check.' },
      { time: '08:00 AM', event: 'Curator discovers cut display case and missing idol.' },
      { time: '10:30 AM', event: 'Fingerprint bureau lifts 3 latent ridge patterns from glass perimeter.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'IPC Sec 380', title: 'Theft in dwelling house or place of worship' },
      { act: 'BNS', section: 'BNS Sec 305(a)', title: 'Theft in building, tent, or vessel used for worship' },
    ],
    evidenceList: [
      { item: 'Latent fingerprint cards (12-point match)', category: 'physical', probativeValue: 'Conclusive link to habitual offender in NAFIS database' },
      { item: 'Glass diamond cutter', category: 'physical', probativeValue: 'Toolmark microscopic alignment with glass edge fractures' },
    ],
    outcome: 'Accused sentenced to 5 years rigorous imprisonment under Section 305 BNS.',
  },
  // 5. Robbery 1
  {
    id: 'case-rob-001',
    slug: 'mumbai-highway-heist-2023',
    title: 'State of Maharashtra v. Salim @ Langda (Western Expressway Armed Robbery)',
    category: 'Robbery',
    difficulty: 'Intermediate',
    summary: 'Interception of jewelry merchant vehicle using spike strips followed by armed brandishing of country-made firearms.',
    date: '2023-12-04',
    jurisdiction: 'Sessions Court, Greater Mumbai',
    factsTimeline: [
      { time: '10:45 PM', event: 'Merchant car tires punctured by spiked steel strip thrown on expressway.' },
      { time: '10:47 PM', event: 'SUV blocks car; four masked men smash driver window with crowbar.' },
      { time: '10:52 PM', event: 'Gold consignment worth ₹1.8 Crore looted; driver pistol-whipped.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'IPC Sec 392 / 397', title: 'Robbery with deadly weapon' },
      { act: 'BNS', section: 'BNS Sec 309(4)', title: 'Robbery with deadly weapon causing hurt' },
    ],
    evidenceList: [
      { item: 'Punctured tire with embedded steel spikes', category: 'physical', probativeValue: 'Pre-meditation and ambush planning' },
      { item: 'Stolen gold bars recovered from scrap yard', category: 'physical', probativeValue: 'Recovery memo under Section 27 Evidence Act / Section 23 BSA' },
    ],
    outcome: 'Conviction affirmed; all 4 accused sentenced to 7 years mandatory minimum under Section 397 IPC.',
  },
  // 6. Robbery 2
  {
    id: 'case-rob-002',
    slug: 'chennai-atm-cash-van-ambush',
    title: 'State of Tamil Nadu v. Vignesh & 3 Ors (Cash Logistics Van Robbery)',
    category: 'Robbery',
    difficulty: 'Advanced',
    summary: 'Pepper spray attack on armed security guard during ATM cash replenishment, seizing ₹45 Lakhs in currency trunks.',
    date: '2024-02-14',
    jurisdiction: 'Principal Sessions Court, Chennai',
    factsTimeline: [
      { time: '01:15 PM', event: 'Security guard carrying cash trunk enters ATM vestibule.' },
      { time: '01:16 PM', event: 'Two assailants spray industrial grade capsicum spray directly into guard eyes.' },
      { time: '01:17 PM', event: 'Trunk snatched; guard firearm grabbed and tossed into nearby stormwater drain.' },
    ],
    sectionsApplied: [
      { act: 'BNS', section: 'BNS Sec 309(2)', title: 'Robbery in gang with hurt' },
      { act: 'IPC', section: 'IPC Sec 394', title: 'Voluntarily causing hurt in committing robbery' },
    ],
    evidenceList: [
      { item: 'Aerosol canister residue', category: 'biological', probativeValue: 'Chemical composition matching canister recovered from suspect residence' },
      { item: 'GPS tracking beacon inside currency box', category: 'digital', probativeValue: 'Real-time telemetry showing route to hideout' },
    ],
    outcome: 'Fast-track court convicted within 6 months based on GPS tracking and recovered cash bundles with bank wrappers.',
  },
  // 7. Grievous Hurt 1
  {
    id: 'case-hurt-001',
    slug: 'bengaluru-tech-park-assault',
    title: 'State of Karnataka v. Rahul Nair (Electronic City Road Rage with Machete)',
    category: 'Grievous Hurt',
    difficulty: 'Intermediate',
    summary: 'Minor traffic fender bender escalating into weaponized assault resulting in severed ulna nerve and permanent physical disability.',
    date: '2024-03-29',
    jurisdiction: 'City Civil & Sessions Court, Bengaluru',
    factsTimeline: [
      { time: '08:45 PM', event: 'Vehicle collision at U-turn near Tech Park main gate.' },
      { time: '08:48 PM', event: 'Accused retrieves 18-inch billhook machete from trunk during heated exchange.' },
      { time: '08:50 PM', event: 'Strikes complainant forearm as victim shielded his neck, severing tendons and nerve.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'IPC Sec 326', title: 'Voluntarily causing grievous hurt by dangerous weapons' },
      { act: 'BNS', section: 'BNS Sec 115(2)', title: 'Voluntarily causing grievous hurt with dangerous weapons' },
    ],
    evidenceList: [
      { item: 'Billhook machete with blood matching victim DNA', category: 'physical', probativeValue: 'Conclusive weapon identification' },
      { item: 'Plastic surgeon EMG report certifying 60% permanent loss of grip', category: 'documentary', probativeValue: 'Statutory qualification under Grievous Hurt clause 6' },
    ],
    outcome: 'Sentenced to 5 years rigorous imprisonment and ₹5 Lakh compensation ordered under Section 357 CrPC / Section 395 BNSS.',
  },
  // 8. Grievous Hurt 2
  {
    id: 'case-hurt-002',
    slug: 'kolkata-college-acid-attack',
    title: 'State of West Bengal v. Subham Dey (Corrosive Liquid Assault Case)',
    category: 'Grievous Hurt',
    difficulty: 'Advanced',
    summary: 'Stalking incident culminating in throwing commercial sulfuric acid on university student, causing facial disfigurement.',
    date: '2023-07-15',
    jurisdiction: 'Sessions Court, Alipore, Kolkata',
    factsTimeline: [
      { time: '04:30 PM', event: 'Victim exits campus; accused on scooter pulls alongside.' },
      { time: '04:31 PM', event: 'Throws beaker of concentrated acid; victim sustains 3rd-degree burns to face and neck.' },
      { time: '05:00 PM', event: 'Accused arrested attempting to dispose of glass container in pond.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'IPC Sec 326A', title: 'Voluntarily causing grievous hurt by use of acid' },
      { act: 'BNS', section: 'BNS Sec 124(1)', title: 'Causing grievous hurt by use of acid' },
    ],
    evidenceList: [
      { item: 'Glass jar with sulfuric acid residue (pH 1.0)', category: 'physical', probativeValue: 'Corrosive substance verification' },
      { item: 'Chemical shop inventory register', category: 'documentary', probativeValue: 'Shows illegal sale without photo ID recording' },
    ],
    outcome: 'Life imprisonment awarded under Section 326A IPC with fine of ₹10 Lakhs payable directly to victim for reconstructive surgeries.',
  },
  // 9. Murder 1
  {
    id: 'case-murd-001',
    slug: 'pune-villa-homicide-2024',
    title: 'State of Maharashtra v. Dr. Ajay Verma (Bavdhan Villa Arsenic Poisoning)',
    category: 'Murder',
    difficulty: 'Advanced',
    summary: 'High-profile forensic investigation into chronic thallium & arsenic administration inside protein supplements over 90 days.',
    date: '2024-01-20',
    jurisdiction: 'Sessions Court, Pune',
    factsTimeline: [
      { time: 'Day 1-60', event: 'Victim progressively hospitalized with peripheral neuropathy and sudden alopecia.' },
      { time: 'Day 75', event: 'Victim passes away due to multi-organ failure attributed to mysterious Guillain-Barré like syndrome.' },
      { time: 'Day 80', event: 'Forensic autopsy and ICP-MS toxicology report reveals 400x lethal arsenic levels in liver & hair.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'IPC Sec 302 / 328', title: 'Murder by administering unwholesome drug/poison' },
      { act: 'BNS', section: 'BNS Sec 101(1) / 123', title: 'Murder and administering poison' },
    ],
    evidenceList: [
      { item: 'ICP-MS spectrometry tissue sample report', category: 'biological', probativeValue: 'Conclusive toxicological cause of death' },
      { item: 'Chemical supply purchase invoice on suspect credit card', category: 'digital', probativeValue: 'Mens rea and deliberate acquisition of lethal compound' },
    ],
    outcome: 'Sentenced to life imprisonment; Court commended forensic toxicology analysis for unravelling the medical alibi.',
  },
  // 10. Murder 2
  {
    id: 'case-murd-002',
    slug: 'hyderabad-lake-contract-killing',
    title: 'State of Telangana v. Shiva & 2 Ors (Gandipet Lake Dismemberment Case)',
    category: 'Murder',
    difficulty: 'Advanced',
    summary: 'Contract killing with body concealed inside sealed steel trunk submerged in lakebed; solved via dental radiograph matching.',
    date: '2023-10-09',
    jurisdiction: 'District Court, Ranga Reddy',
    factsTimeline: [
      { time: 'Day 1', event: 'Real estate businessman reported missing by family.' },
      { time: 'Day 14', event: 'Fishermen hook submerged locked trunk weighed down with construction stones.' },
      { time: 'Day 15', event: 'Severe decomposition; forensic odontologist matches molar dental bridge records.' },
    ],
    sectionsApplied: [
      { act: 'IPC', section: 'IPC Sec 302 / 201', title: 'Murder & Causing disappearance of evidence' },
      { act: 'BNS', section: 'BNS Sec 103(1) / 238', title: 'Punishment for murder and causing disappearance of evidence' },
    ],
    evidenceList: [
      { item: 'Ante-mortem dental X-ray comparison chart', category: 'biological', probativeValue: 'Positive identification of John Doe corpse' },
      { item: 'Toll plaza FASTag telemetry log', category: 'digital', probativeValue: 'Places accused vehicle at lakeside at 02:40 AM on night of disappearance' },
    ],
    outcome: 'All three conspirators convicted under Section 302 IPC / Section 103 BNS and sentenced to life imprisonment.',
  },
];
