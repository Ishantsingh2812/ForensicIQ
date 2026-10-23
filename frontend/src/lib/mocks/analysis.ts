import { AnalysisResult } from '../../types';

export const mockSampleScenario = `On October 14, 2024, at approximately 23:45 IST, near Bandra West, Mumbai, two unidentified male assailants on a black Yamaha motorcycle intercepted the complainant, Mr. Vikram Malhotra (aged 38). Assailant 1 brandished an unlicensed country-made firearm (Desi Katta) and demanded his luxury watch (Omega Seamaster, Valued at ₹4,50,000) and smartphone (iPhone 15 Pro). 

When Mr. Malhotra resisted and attempted to dial 112, Assailant 2 struck his right temporal bone with an iron knuckle-duster, causing blunt-force trauma, laceration, and profuse arterial bleeding. The assailants forcibly snatched the watch and phone before fleeing toward Western Express Highway. 

The victim was discovered semi-conscious by a patrolling police PCR van at 00:15 IST and transported to Bhabha Municipal Hospital. The attending doctor classified the injury as 'grievous' due to a hairline skull fracture and temporary loss of vision. Police recovered one spent 8mm brass cartridge casing, smeared bloodstains on the sidewalk, and tire friction marks. CCTV footage from a nearby commercial ATM captured partial footage of the registration plate (MH-02-??-9812).`;

export const mockSampleScenariosList = [
  {
    title: 'Armed Robbery & Grievous Hurt (Mumbai)',
    category: 'Robbery',
    text: mockSampleScenario,
  },
  {
    title: 'Commercial Quantity NDPS Interception (Goa)',
    category: 'NDPS',
    text: `On September 5, 2024, at 04:30 AM, acting on prior intelligence, the Anti-Narcotics Cell (ANC) set up a checkpoint at Anjuna Toll Plaza. A silver sedan driven by suspect 'R.K.' was flagged down. Upon search conducted in the presence of an Executive Magistrate and two independent punch witnesses, officers recovered 2.4 kilograms of suspected MDMA crystals concealed inside a hollowed-out spare tire. The suspect failed to produce any valid license or medical authorization. Field drug test kit gave positive colorimetric indication for methamphetamine derivatives. A digital weighing scale and ₹3,80,000 in unaccounted cash were also seized.`,
  },
  {
    title: 'Corporate Server Ransomware & Extortion (Bengaluru)',
    category: 'Property Theft',
    text: `On August 12, 2024, the Chief Information Security Officer of FinTech Corp reported that their core banking production database was encrypted at 02:15 AM via a compromised VPN account with administrative credentials. The intruder exfiltrated 150,000 customer KYC records and left a ransom note demanding 15 Bitcoin (approx ₹8.2 Crore) to be deposited into a Monero-bridged wallet within 72 hours, threatening public exposure on a Dark Web leak site. IP connection logs trace initial login to a known Russian proxy, while memory dump artifacts indicate exploitation of an unpatched CVE vulnerability.`,
  },
];

export const mockDefaultAnalysisResult: AnalysisResult = {
  caseId: 'CASE-2024-BNS-8912',
  createdAt: '2024-10-15T02:30:00Z',
  title: 'Armed Robbery with Dangerous Weapon & Grievous Hurt',
  sections: [
    {
      act: 'BNS',
      section: 'Section 309(4)',
      title: 'Robbery with attempt to cause death or grievous hurt',
      punishment: 'Rigorous Imprisonment not less than 7 years, up to 10 years + fine',
      bnsEquivalent: 'Corresponds directly to IPC Section 397 (Robbery or Dacoity with attempt to cause death/grievous hurt)',
      confidence: 0.94,
    },
    {
      act: 'IPC',
      section: 'Section 397',
      title: 'Robbery, or dacoity, with attempt to cause death or grievous hurt',
      punishment: 'Rigorous Imprisonment not less than 7 years',
      confidence: 0.96,
    },
    {
      act: 'BNS',
      section: 'Section 115(2)',
      title: 'Voluntarily causing grievous hurt with dangerous weapons or means',
      punishment: 'Imprisonment up to 10 years and fine',
      bnsEquivalent: 'Corresponds to IPC Section 326',
      confidence: 0.89,
    },
    {
      act: 'IPC',
      section: 'Section 326',
      title: 'Voluntarily causing grievous hurt by dangerous weapons or means',
      punishment: 'Imprisonment for life, or imprisonment up to 10 years + fine',
      confidence: 0.91,
    },
    {
      act: 'BNS',
      section: 'Section 3(5)',
      title: 'Joint liability & Common Intention',
      punishment: 'Each person liable as if done by him alone',
      bnsEquivalent: 'Corresponds to IPC Section 34',
      confidence: 0.98,
    },
  ],
  status: {
    bailable: false,
    cognizable: true,
    compoundable: false,
    triableBy: 'Court of Session',
  },
  ingredients: [
    {
      id: 'ing-1',
      element: 'Commission of theft accompanied by immediate fear of death or grievous hurt',
      matchedFacts: [
        'Assailant 1 brandished an unlicensed country-made firearm (Desi Katta)',
        'Forcibly snatched Omega luxury watch and iPhone 15 Pro',
      ],
      satisfied: 'yes',
    },
    {
      id: 'ing-2',
      element: 'Use of a deadly weapon during the commission of robbery',
      matchedFacts: [
        'Assailant 2 used an iron knuckle-duster inflicting skull fracture',
        'Firearm brandished to restrain the victim',
      ],
      satisfied: 'yes',
    },
    {
      id: 'ing-3',
      element: 'Infliction of Grievous Hurt under Section 114/320 definition',
      matchedFacts: [
        'Hairline temporal skull fracture verified by attending surgeon',
        'Profuse arterial hemorrhage and temporary loss of vision',
      ],
      satisfied: 'yes',
    },
    {
      id: 'ing-4',
      element: 'Meeting of minds / Common Intention to commit the crime',
      matchedFacts: [
        'Two individuals arrived and coordinated on a single motorcycle',
        'Fled the crime scene jointly toward Western Express Highway',
      ],
      satisfied: 'yes',
    },
  ],
  forensicEvidence: [
    {
      category: 'physical',
      item: 'Spent 8mm brass cartridge casing',
      priority: 'high',
      notes: 'Preserve firing pin impression and breech-face markings; send to Forensic Science Laboratory (FSL) Ballistics division under Form IV.',
    },
    {
      category: 'biological',
      item: 'Sidewalk bloodstains & knuckle-duster weapon swab',
      priority: 'high',
      notes: 'Collect sterile gauze swab, air-dry in dark envelope to prevent fungal degradation; preserve for STR-DNA profiling.',
    },
    {
      category: 'digital',
      item: 'ATM CCTV DVR recording & Cell Tower Dump',
      priority: 'high',
      notes: 'Extract hash-verified RAW footage (SHA-256) under Section 63 BSA (formerly Section 65B IEA certificate); obtain CDR/tower dump for Bandra West sector.',
    },
    {
      category: 'documentary',
      item: 'Medico-Legal Certificate (MLC) & CT Scan Radiology Report',
      priority: 'medium',
      notes: 'Ensure attending medical officer categorizes injury as dangerous to life under Section 116 BNS (Grievous Hurt).',
    },
  ],
  defenseCritique: [
    {
      argument: 'Lack of Test Identification Parade (TIP) Reliability',
      weakness: 'Incident occurred in poor ambient illumination at 23:45 IST; victim suffered head trauma and disorientation immediately.',
      counter: 'Prosecution must establish independent corroboration via CCTV matching suspect attire, motorcycle chassis number, and recovery of stolen articles under Section 23(2) BSA.',
    },
    {
      argument: 'Challenge to Section 309(4) BNS / 397 IPC against both accused',
      weakness: 'Only Assailant 2 physically struck the victim; weapon attribution must be specific under Phool Kumar v. Delhi Administration (AIR 1975 SC 905).',
      counter: 'Assailant 1 brandished the firearm, constituting independent "use" within the strict statutory meaning of Section 397 IPC / 309(4) BNS.',
    },
    {
      argument: 'Non-compliance with Digital Evidence Certification',
      weakness: 'CCTV footage seized without immediate contemporaneous certificate by the ATM technician.',
      counter: 'Secure Section 63 BSA affidavit from bank facility security manager before framing of formal charges.',
    },
  ],
  extractedFacts: {
    who: ['Complainant Vikram Malhotra (Victim)', 'Two unidentified male assailants', 'Attending Bhabha Hospital Medical Officer'],
    what: ['Armed interception', 'Robbery of luxury watch and smartphone', 'Blunt force head assault causing skull fracture'],
    when: ['14 October 2024 at ~23:45 IST (PCR dispatched 00:15 IST)'],
    where: ['Sidewalk near Bandra West, Mumbai, escape via Western Express Highway'],
    how: ['Motorcycle interception, Desi Katta firearm intimidation, iron knuckle-duster strike'],
  },
  sources: [
    {
      id: 'bns-309-chunk-4',
      label: 'BNS 2023 - Section 309 (Robbery & Aggravated Circumstances)',
      snippet: 'Whoever commits robbery, and if at the time of committing robbery uses any deadly weapon, or causes grievous hurt to any person, shall be punished with rigorous imprisonment for not less than seven years...',
      score: 0.942,
    },
    {
      id: 'ipc-397-landmark',
      label: 'IPC 1860 - Section 397 & Phool Kumar Precedent (Supreme Court)',
      snippet: 'The word "uses" in Section 397 IPC is wide enough to include brandishing or holding out a weapon to instill fear in the victim without discharging a projectile.',
      score: 0.915,
    },
    {
      id: 'bsa-sec-63-digital',
      label: 'BSA 2023 - Section 63 (Admissibility of Electronic Records)',
      snippet: 'Any information contained in an electronic record produced by a computer shall be deemed to be also a document if conditions specified in this section are satisfied without further proof...',
      score: 0.884,
    },
    {
      id: 'bnss-sec-173-cognizable',
      label: 'BNSS 2023 - Section 173 (Information in Cognizable Cases / FIR)',
      snippet: 'Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing...',
      score: 0.831,
    },
  ],
  disclaimer: 'Educational analysis only. Not legal advice. Consult a licensed advocate.',
};
