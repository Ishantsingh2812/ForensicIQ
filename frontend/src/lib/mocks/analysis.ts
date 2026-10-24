import { AnalysisResult, LawFramework, SectionAnalysis, ForensicCategory } from '../../types';

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

/**
 * Intelligent legal analysis engine covering all major Indian Criminal Law domains
 * (BNS 2023, BNSS 2023, BSA 2023, IT Act 2000, NDPS Act 1985, and legacy IPC/CrPC/IEA).
 */
export function generateDynamicAnalysis(
  rawScenario: string,
  framework: LawFramework = 'BOTH'
): AnalysisResult {
  const text = rawScenario.toLowerCase().trim();
  const caseId = `CASE-BNS-${Date.now().toString(36).toUpperCase()}`;
  const createdAt = new Date().toISOString();

  // Detection triggers
  const hasPhotoPrivacy =
    text.includes('photo') ||
    text.includes('picture') ||
    text.includes('video') ||
    text.includes('image') ||
    text.includes('permission') ||
    text.includes('social media') ||
    text.includes('instagram') ||
    text.includes('facebook') ||
    text.includes('whatsapp') ||
    text.includes('posted') ||
    text.includes('viral') ||
    text.includes('privacy');

  const hasSlap = text.includes('slap') || text.includes('slapped') || text.includes('shoved') || text.includes('pushed');
  const hasIronRod = text.includes('iron rod') || text.includes('rod') || text.includes('pipe') || text.includes('bludgeon');
  const hasGun = text.includes('gun') || text.includes('pistol') || text.includes('firearm') || text.includes('revolver');
  const hasKnife = text.includes('knife') || text.includes('dagger') || text.includes('blade') || text.includes('sword') || text.includes('stab');
  const hasWeapon = hasIronRod || hasGun || hasKnife || text.includes('weapon');
  const hasFracture = text.includes('fracture') || text.includes('broken bone') || text.includes('grievous');
  const hasBlood = text.includes('blood') || text.includes('bleeding') || text.includes('laceration');
  
  const hasMurder = (text.includes('killed') || text.includes('murder') || text.includes('dead') || text.includes('homicide') || text.includes('strangled')) && !text.includes('threat to kill');
  const hasAttemptMurder = (text.includes('attempt to murder') || text.includes('tried to kill') || text.includes('shot at') || text.includes('stabbed in chest')) && !hasMurder;
  const hasThreat = text.includes('threat') || text.includes('threatened') || text.includes('kill you') || text.includes('blackmail') || text.includes('extortion');
  
  const hasSnatching = text.includes('snatch') || text.includes('snatched') || text.includes('grabbed chain') || text.includes('pulled bag');
  const hasTheft = text.includes('stole') || text.includes('theft') || text.includes('stolen') || text.includes('took') || text.includes('pickpocket');
  const hasRobberyDemand = (text.includes('demanded') || text.includes('robbed') || text.includes('held at') || text.includes('gunpoint')) &&
                           (text.includes('cash') || text.includes('money') || text.includes('phone') || text.includes('watch') || text.includes('valuables'));
  const hasWindowBreak = (text.includes('window') || text.includes('door') || text.includes('lock')) && (text.includes('broke') || text.includes('shattered') || text.includes('burglary'));
  
  const hasCyberFraud = text.includes('otp') || text.includes('scam') || text.includes('phishing') || text.includes('hacked') || text.includes('bank fraud') || text.includes('cheated online');
  const hasCheating = text.includes('cheat') || text.includes('cheated') || text.includes('fraud') || text.includes('scammed') || text.includes('420') || text.includes('fake investment');
  const hasHitAndRun = text.includes('hit and run') || text.includes('car accident') || text.includes('rash driving') || text.includes('ran over');
  const hasSexualHarassment = text.includes('molest') || text.includes('harass') || text.includes('touched inappropriately') || text.includes('stalk') || text.includes('stalking') || text.includes('groped');
  const hasDomesticCruelty = text.includes('dowry') || text.includes('in-laws') || text.includes('husband beat') || text.includes('domestic violence') || text.includes('498a');
  const hasDrugs = text.includes('drugs') || text.includes('ganja') || text.includes('cannabis') || text.includes('cocaine') || text.includes('heroin') || text.includes('ndps');
  const hasCivilDelay = (text.includes('contractor') || text.includes('delayed') || text.includes('painting') || text.includes('rent') || text.includes('lease') || text.includes('tenant')) && !hasWeapon && !hasSlap && !hasTheft && !hasPhotoPrivacy;

  let title = 'Structured Criminal Offence & Legal Assessment';
  let predictionConfidence = 0.88;
  let severityAssessment: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'MEDIUM';
  let isTentative = false;
  let missingFacts: string[] = [];
  let clarifyingQuestions: string[] = [];
  const sections: SectionAnalysis[] = [];
  let evidenceList: { category: ForensicCategory; item: string; priority: 'high' | 'medium' | 'low'; notes: string }[] = [];
  let defenseList: { argument: string; weakness: string; counter: string }[] = [];
  let factsWhat: string[] = [];
  let factsHow: string[] = [];

  // ================= 1. CYBER PRIVACY / SOCIAL MEDIA PHOTO VIOLATION =================
  if (hasPhotoPrivacy && !hasMurder && !hasRobberyDemand) {
    title = 'Cyber Privacy Violation, Voyeurism & Social Media Publication';
    severityAssessment = 'MEDIUM';
    predictionConfidence = 0.92;
    factsWhat = ['Capturing personal photograph without consent', 'Publishing and disseminating personal photograph on social media'];
    factsHow = ['Digital image capture and transmission across social networking platforms without authorization'];

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 77',
        title: 'Voyeurism (Capturing / Disseminating Images Without Consent)',
        punishment: 'Imprisonment not less than 1 year, up to 3 years + fine (up to 7 years on repeat)',
        bnsEquivalent: 'Corresponds directly to IPC Section 354C & IT Act Section 66E',
        ipcEquivalent: 'IPC Section 354C',
        confidence: 0.94,
        mappingType: 'EXACT',
        rawStatutoryText: 'Any person who watches, or captures the image of a person or disseminates such image in circumstances where there is an expectation of privacy or without consent, commits voyeurism.',
        simplifiedText: 'Taking or disseminating personal/private photos of an individual without their permission constitutes voyeurism under Section 77 BNS.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        effectiveDate: '2024-07-01',
      });
      sections.push({
        act: 'IT_ACT',
        section: 'Section 66E',
        title: 'Punishment for Violation of Privacy (Information Technology Act)',
        punishment: 'Imprisonment up to 3 years, or fine not exceeding ₹2,00,000, or both',
        bnsEquivalent: 'Special cyber legislation operating alongside BNS',
        confidence: 0.95,
        mappingType: 'EXACT',
        rawStatutoryText: 'Whoever intentionally or knowingly captures, publishes or transmits the image of a private area of any person or personal picture without consent, violates privacy.',
        simplifiedText: 'Capturing, publishing, or sharing personal photos without consent on internet or social media attracts up to 3 years imprisonment under the IT Act.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1999',
        effectiveDate: '2000-10-17',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 356',
        title: 'Defamation (Public Dissemination Harmful to Reputation)',
        punishment: 'Simple imprisonment up to 2 years, or fine, or community service',
        bnsEquivalent: 'Corresponds to IPC Section 499 & 500',
        ipcEquivalent: 'IPC Section 500',
        confidence: 0.86,
        mappingType: 'QUALIFIED',
        rawStatutoryText: 'Whoever publishes any imputation intending to harm the reputation of any person commits defamation.',
        simplifiedText: 'Applies if sharing the photograph exposed the victim to public ridicule, harassment, or reputational damage.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        effectiveDate: '2024-07-01',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 78',
        title: 'Stalking & Electronic Surveillance',
        punishment: 'Imprisonment up to 3 years + fine (up to 5 years for repeat conviction)',
        bnsEquivalent: 'Corresponds to IPC Section 354D',
        ipcEquivalent: 'IPC Section 354D',
        confidence: 0.82,
        mappingType: 'QUALIFIED',
        rawStatutoryText: 'Monitoring internet, social media, or electronic communication of a person constitutes stalking.',
        simplifiedText: 'Covers unauthorized surveillance, social media stalking, and persistent tracking.',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        effectiveDate: '2024-07-01',
      });
    }

    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 354C',
        title: 'Voyeurism',
        punishment: 'Imprisonment 1 to 3 years + fine for first conviction',
        bnsEquivalent: 'Mapped to BNS Section 77',
        ipcEquivalent: 'IPC Section 354C',
        confidence: 0.92,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
      sections.push({
        act: 'IPC',
        section: 'Section 500',
        title: 'Punishment for Defamation',
        punishment: 'Simple imprisonment up to 2 years, or fine, or both',
        bnsEquivalent: 'Mapped to BNS Section 356',
        ipcEquivalent: 'IPC Section 500',
        confidence: 0.85,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }

    evidenceList = [
      {
        category: 'digital',
        item: 'Social Media URL, Post Permalinks & Direct Message Logs',
        priority: 'high',
        notes: 'Document exact post URLs, timestamps, account handles, and screenshot metadata before deletion; obtain Section 63 BSA certificate.',
      },
      {
        category: 'digital',
        item: 'Digital Media EXIF Metadata & Device Camera Identifiers',
        priority: 'high',
        notes: 'Preserve original image file showing camera model, GPS coordinates, and hash (SHA-256) value.',
      },
      {
        category: 'documentary',
        item: 'Formal Takedown Notice & Platform Acknowledgement',
        priority: 'medium',
        notes: 'Submit grievance to Intermediary Grievance Officer under IT Rules 2021 for removal within 24 hours.',
      },
    ];

    defenseList = [
      {
        argument: 'Claim of Implied Consent or Public Space Capture',
        weakness: 'Defense may argue photo was taken in open public domain without explicit expectation of absolute privacy.',
        counter: 'Supreme Court in Justice K.S. Puttaswamy (2017) affirmed informational privacy: capturing and publishing an individual\'s image on social media without consent violates Article 21 and Section 66E IT Act.',
      },
      {
        argument: 'Digital Hash & Chain of Custody Challenge (Section 63 BSA)',
        weakness: 'Social media screenshots captured without cryptographic hash certification may be challenged as doctored.',
        counter: 'Submit Section 63 BSA certificate signed by cyber forensic expert detailing extraction tool and SHA-256 checksum.',
      },
    ];
  }

  // ================= 2. WEAPON BATTERY: SLAP + IRON ROD =================
  else if ((hasSlap || text.includes('beat')) && hasIronRod) {
    title = 'Assault & Aggravated Battery with Dangerous Weapon (Iron Rod)';
    severityAssessment = 'HIGH';
    predictionConfidence = 0.94;
    factsWhat = ['Public physical assault', 'Violent battery using iron rod impact weapon'];
    factsHow = ['Unprovoked physical strikes escalated into blunt-force iron rod battery'];

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 118(1)',
        title: 'Voluntarily Causing Hurt or Grievous Hurt by Dangerous Weapons or Means',
        punishment: 'Imprisonment up to 3 years for hurt; up to 10 years + fine for grievous hurt',
        bnsEquivalent: 'Corresponds to IPC Section 324 & Section 326',
        ipcEquivalent: 'IPC Section 324 / 326',
        confidence: 0.95,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
        effectiveDate: '2024-07-01',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 131',
        title: 'Assault or Criminal Force Without Grave Provocation',
        punishment: 'Imprisonment up to 3 months, or fine up to ₹1,000, or both',
        bnsEquivalent: 'Corresponds directly to IPC Section 352',
        ipcEquivalent: 'IPC Section 352',
        confidence: 0.91,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 115(2)',
        title: 'Punishment for Voluntarily Causing Hurt',
        punishment: 'Imprisonment up to 1 year, or fine up to ₹10,000, or community service',
        bnsEquivalent: 'Corresponds to IPC Section 323',
        ipcEquivalent: 'IPC Section 323',
        confidence: 0.88,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }

    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 324',
        title: 'Voluntarily Causing Hurt by Dangerous Weapons or Means',
        punishment: 'Imprisonment up to 3 years, or fine, or both',
        bnsEquivalent: 'Mapped to BNS Section 118(1)',
        ipcEquivalent: 'IPC Section 324',
        confidence: 0.94,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
      sections.push({
        act: 'IPC',
        section: 'Section 352',
        title: 'Punishment for Assault or Criminal Force Otherwise Than on Grave Provocation',
        punishment: 'Imprisonment up to 3 months, or fine up to ₹500, or both',
        bnsEquivalent: 'Mapped to BNS Section 131',
        ipcEquivalent: 'IPC Section 352',
        confidence: 0.90,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }

    evidenceList = [
      {
        category: 'physical',
        item: 'Iron rod weapon recovery & toolmark striations',
        priority: 'high',
        notes: 'Dust weapon for latent fingerprints and blood spatter under Form IV; preserve under Section 23 BSA.',
      },
      {
        category: 'documentary',
        item: 'Medico-Legal Examination (MLC) Certificate from Government Hospital',
        priority: 'high',
        notes: 'Document blunt impact hematomas, contusions, and classification under Section 115/117 BNS.',
      },
      {
        category: 'digital',
        item: 'Public CCTV Footage & Mobile Video Recordings',
        priority: 'high',
        notes: 'Secure footage accompanied by mandatory Section 63 BSA Hash & Custody Certificate.',
      },
    ];
  }

  // ================= 3. MURDER / HOMICIDE =================
  else if (hasMurder) {
    title = 'Culpable Homicide & Murder Investigation Dossier';
    severityAssessment = 'CRITICAL';
    predictionConfidence = 0.96;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 103',
        title: 'Punishment for Murder',
        punishment: 'Death penalty or imprisonment for life, and fine',
        bnsEquivalent: 'Corresponds to IPC Section 302',
        ipcEquivalent: 'IPC Section 302',
        confidence: 0.96,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 101',
        title: 'Murder (Definition & Statutory Clauses)',
        punishment: 'Defines culpable homicide amounting to murder',
        bnsEquivalent: 'Corresponds to IPC Section 300 (Virsa Singh four-point test)',
        confidence: 0.94,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 302',
        title: 'Punishment for Murder',
        punishment: 'Death, or imprisonment for life, and fine',
        bnsEquivalent: 'Mapped to BNS Section 103',
        confidence: 0.96,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 4. ATTEMPT TO MURDER =================
  else if (hasAttemptMurder) {
    title = 'Attempt to Murder & Severe Bodily Violence';
    severityAssessment = 'CRITICAL';
    predictionConfidence = 0.94;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 109',
        title: 'Attempt to Murder',
        punishment: 'Imprisonment up to 10 years and fine; if hurt caused, life imprisonment',
        bnsEquivalent: 'Corresponds to IPC Section 307',
        ipcEquivalent: 'IPC Section 307',
        confidence: 0.94,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 307',
        title: 'Attempt to Murder',
        punishment: 'Imprisonment up to 10 years and fine; or imprisonment for life',
        bnsEquivalent: 'Mapped to BNS Section 109',
        confidence: 0.94,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 5. EXTORTION & CRIMINAL INTIMIDATION / THREATS =================
  else if (hasThreat) {
    title = 'Criminal Intimidation & Extortionate Blackmail';
    severityAssessment = 'HIGH';
    predictionConfidence = 0.91;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 351',
        title: 'Criminal Intimidation (Threat to Cause Death or Grievous Hurt)',
        punishment: 'Imprisonment up to 7 years, or fine, or both (if threat to kill)',
        bnsEquivalent: 'Corresponds to IPC Section 503 & 506',
        ipcEquivalent: 'IPC Section 506',
        confidence: 0.93,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 308',
        title: 'Extortion',
        punishment: 'Imprisonment up to 2 years, or fine, or both',
        bnsEquivalent: 'Corresponds to IPC Section 383 & 384',
        ipcEquivalent: 'IPC Section 384',
        confidence: 0.89,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 506',
        title: 'Punishment for Criminal Intimidation',
        punishment: 'Imprisonment up to 7 years if threat to cause death or grievous hurt',
        bnsEquivalent: 'Mapped to BNS Section 351',
        confidence: 0.93,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 6. ARMED ROBBERY =================
  else if (hasRobberyDemand || (hasWeapon && text.includes('money'))) {
    title = 'Armed Robbery & Use of Deadly Weapon Analysis';
    severityAssessment = 'HIGH';
    predictionConfidence = 0.95;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 309',
        title: 'Robbery',
        punishment: 'Rigorous Imprisonment up to 10 years + fine (14 years on highway at night)',
        bnsEquivalent: 'Corresponds to IPC Section 392 & Section 397',
        ipcEquivalent: 'IPC Section 392',
        confidence: 0.95,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 311',
        title: 'Robbery or Dacoity with Attempt to Cause Death or Grievous Hurt',
        punishment: 'Rigorous Imprisonment not less than 7 years (Mandatory Minimum)',
        bnsEquivalent: 'Corresponds to IPC Section 397 (Phool Kumar doctrine)',
        ipcEquivalent: 'IPC Section 397',
        confidence: 0.93,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 392',
        title: 'Punishment for Robbery',
        punishment: 'Rigorous Imprisonment up to 10 years + fine',
        bnsEquivalent: 'Mapped to BNS Section 309',
        confidence: 0.94,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
      sections.push({
        act: 'IPC',
        section: 'Section 397',
        title: 'Robbery, or Dacoity, with Attempt to Cause Death or Grievous Hurt',
        punishment: 'Rigorous Imprisonment not less than 7 years (Mandatory Minimum)',
        bnsEquivalent: 'Mapped to BNS Section 311',
        confidence: 0.96,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 7. STREET SNATCHING =================
  else if (hasSnatching) {
    title = 'Street Snatching & Quick Seizure Legal Mapping';
    severityAssessment = 'MEDIUM';
    predictionConfidence = 0.94;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 304',
        title: 'Snatching',
        punishment: 'Imprisonment up to 3 years, and fine',
        bnsEquivalent: 'New standalone offense in BNS; historically charged under IPC 379',
        ipcEquivalent: 'IPC Section 379',
        confidence: 0.96,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 379',
        title: 'Punishment for Theft',
        punishment: 'Imprisonment up to 3 years, or fine, or both',
        bnsEquivalent: 'Mapped to BNS Section 303(2) & Section 304',
        confidence: 0.90,
        mappingType: 'PARTIAL',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 8. HOUSE-BREAKING & BURGLARY =================
  else if (hasWindowBreak || (text.includes('shop') && hasTheft)) {
    title = 'House-Breaking by Night & Burglary Legal Analysis';
    severityAssessment = 'HIGH';
    predictionConfidence = 0.91;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 331',
        title: 'House-Breaking and House-Breaking by Night',
        punishment: 'Imprisonment up to 3 years (up to 14 years if committing theft)',
        bnsEquivalent: 'Corresponds to IPC Section 457',
        ipcEquivalent: 'IPC Section 457',
        confidence: 0.92,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 303(2)',
        title: 'Punishment for Theft',
        punishment: 'Imprisonment up to 3 years, or fine, or both',
        bnsEquivalent: 'Corresponds to IPC Section 379',
        ipcEquivalent: 'IPC Section 379',
        confidence: 0.94,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 324',
        title: 'Mischief Causing Damage',
        punishment: 'Imprisonment up to 1 year, or fine, or both',
        bnsEquivalent: 'Corresponds to IPC Section 427',
        ipcEquivalent: 'IPC Section 427',
        confidence: 0.88,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 457',
        title: 'Lurking House-Trespass or House-Breaking by Night in Order to Commit Offence',
        punishment: 'Imprisonment up to 5 years (up to 14 years if theft intended)',
        bnsEquivalent: 'Mapped to BNS Section 331',
        confidence: 0.91,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 9. CYBER PHISHING & FINANCIAL CHEATING =================
  else if (hasCyberFraud || hasCheating) {
    title = 'Cyber Fraud, Cheating by Personation & Online Financial Scam';
    severityAssessment = 'MEDIUM';
    predictionConfidence = 0.92;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 318(4)',
        title: 'Cheating and Dishonestly Inducing Delivery of Property',
        punishment: 'Imprisonment up to 7 years and fine',
        bnsEquivalent: 'Corresponds to historical IPC Section 420',
        ipcEquivalent: 'IPC Section 420',
        confidence: 0.95,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'IT_ACT',
        section: 'Section 66D',
        title: 'Cheating by Personation by Using Computer Resource',
        punishment: 'Imprisonment up to 3 years and fine up to ₹1,00,000',
        bnsEquivalent: 'Special cyber legislation',
        confidence: 0.94,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1999',
      });
      sections.push({
        act: 'IT_ACT',
        section: 'Section 66C',
        title: 'Identity Theft & Password / OTP Fraud',
        punishment: 'Imprisonment up to 3 years and fine up to ₹1,00,000',
        bnsEquivalent: 'Special cyber legislation',
        confidence: 0.91,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/1999',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 420',
        title: 'Cheating and Dishonestly Inducing Delivery of Property',
        punishment: 'Imprisonment up to 7 years and fine',
        bnsEquivalent: 'Mapped to BNS Section 318(4)',
        confidence: 0.95,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 10. MINOR SLAP ONLY (NO WEAPON) =================
  else if (hasSlap && !hasWeapon) {
    title = 'Physical Assault & Voluntary Hurt Threshold Analysis';
    severityAssessment = 'LOW';
    predictionConfidence = 0.65; // Triggers < 0.70 Tentative rule!
    isTentative = true;
    missingFacts = [
      'Degree of physical pain or visible injury (facial redness vs swelling vs dental injury)',
      'Whether the strike occurred following sudden and grave provocation',
      'Identity or relationship of assailant and public passenger witnesses',
    ];
    clarifyingQuestions = [
      'Did the slap cause any bleeding, ear pain, or medical impairment requiring an MLC doctor checkup?',
      'Did the assailant use any weapon, ring, or object, or was it an open-handed strike?',
      'Were there public surveillance cameras or eyewitnesses who observed the altercation?',
    ];

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 131',
        title: 'Assault or Criminal Force Without Grave Provocation',
        punishment: 'Imprisonment up to 3 months, or fine up to ₹1,000, or both',
        bnsEquivalent: 'Corresponds directly to IPC Section 352',
        ipcEquivalent: 'IPC Section 352',
        confidence: 0.65,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
      sections.push({
        act: 'BNS',
        section: 'Section 115(2)',
        title: 'Punishment for Voluntarily Causing Hurt',
        punishment: 'Imprisonment up to 1 year, or fine up to ₹10,000, or community service',
        bnsEquivalent: 'Corresponds to IPC Section 323',
        ipcEquivalent: 'IPC Section 323',
        confidence: 0.60,
        mappingType: 'QUALIFIED',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 352',
        title: 'Assault or Criminal Force Without Grave Provocation',
        punishment: 'Imprisonment up to 3 months, or fine up to ₹500, or both',
        bnsEquivalent: 'Mapped to BNS Section 131',
        confidence: 0.65,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 11. CIVIL DELAY / CONTRACT BREACH =================
  else if (hasCivilDelay) {
    title = 'Civil Breach of Contract / Non-Penal Remedy';
    severityAssessment = 'LOW';
    predictionConfidence = 0.88;

    sections.push({
      act: 'BNS',
      section: 'Advisory',
      title: 'Civil Breach of Contract / Non-Penal Dispute',
      punishment: 'No criminal penal liability; civil damages under Indian Contract Act 1872',
      bnsEquivalent: 'Not a cognizable criminal offense under BNS 2023',
      confidence: 0.88,
      mappingType: 'QUALIFIED',
      rawStatutoryText: 'Mere contractual delay without fraudulent intention at inception does not constitute a crime under BNS (Hridaya Ranjan Prasad Verma v. State of Bihar, 2000).',
      simplifiedText: 'Contractual delays or quality disputes are civil matters, not criminal penal offenses under BNS or IPC.',
      sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2187',
    });
  }

  // ================= 12. GENERAL THEFT / PROPERTY LOSS =================
  else if (hasTheft) {
    title = 'Offences Against Property & Simple Theft';
    severityAssessment = 'LOW';
    predictionConfidence = 0.89;

    if (framework === 'BNS' || framework === 'BOTH') {
      sections.push({
        act: 'BNS',
        section: 'Section 303(2)',
        title: 'Punishment for Theft',
        punishment: 'Imprisonment up to 3 years, or fine, or community service (under ₹5,000)',
        bnsEquivalent: 'Corresponds to IPC Section 379',
        ipcEquivalent: 'IPC Section 379',
        confidence: 0.92,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
      });
    }
    if (framework === 'IPC' || framework === 'BOTH') {
      sections.push({
        act: 'IPC',
        section: 'Section 379',
        title: 'Punishment for Theft',
        punishment: 'Imprisonment up to 3 years, or fine, or both',
        bnsEquivalent: 'Mapped to BNS Section 303(2)',
        confidence: 0.90,
        mappingType: 'EXACT',
        sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/2263',
      });
    }
  }

  // ================= 13. DEFAULT GENERIC INTENT / FACT MATCH =================
  else {
    title = 'Preliminary Criminal Incident Evaluation';
    severityAssessment = 'LOW';
    predictionConfidence = 0.62;
    isTentative = true;
    missingFacts = [
      'Specific unlawful action committed (physical strike vs verbal threat vs property deprivation)',
      'Identity or relationship between parties involved',
      'Presence of physical injuries, financial loss, or weapons',
    ];
    clarifyingQuestions = [
      'Was any physical violence, injury, or weapon involved in the incident?',
      'Did any theft, financial loss, or unauthorized property removal take place?',
      'Were digital platforms, phones, or social media used to commit or broadcast the act?',
    ];

    sections.push({
      act: 'BNS',
      section: 'Section 131',
      title: 'Assault or Criminal Force Without Grave Provocation',
      punishment: 'Imprisonment up to 3 months, or fine up to ₹1,000, or both',
      bnsEquivalent: 'Corresponds to IPC Section 352',
      confidence: 0.62,
      mappingType: 'QUALIFIED',
      sourceUrl: 'https://www.indiacode.nic.in/handle/123456789/20062',
    });
  }

  // Compute status
  const isBailable = severityAssessment === 'LOW';
  const isCognizable = severityAssessment !== 'LOW' || hasIronRod || hasWeapon || hasPhotoPrivacy;

  return {
    caseId,
    createdAt,
    title,
    prediction_confidence: predictionConfidence,
    predictionConfidence,
    severity_assessment: severityAssessment,
    severityAssessment,
    evidence_completeness: 0.85,
    evidenceCompleteness: 0.85,
    legal_uncertainty: isTentative ? 0.55 : 0.15,
    legalUncertainty: isTentative ? 0.55 : 0.15,
    needs_follow_up: isTentative,
    needsFollowUp: isTentative,
    is_tentative: isTentative,
    isTentative,
    missing_facts: missingFacts,
    missingFacts,
    clarifying_questions: clarifyingQuestions,
    clarifyingQuestions,
    sections,
    status: {
      bailable: isBailable,
      cognizable: isCognizable,
      compoundable: isBailable,
      triableBy: (severityAssessment as string) === 'HIGH' || (severityAssessment as string) === 'CRITICAL' ? 'Court of Session' : 'Any Magistrate',
    },
    ingredients: [
      {
        id: 'ing-1',
        element: hasPhotoPrivacy
          ? 'Capturing or publishing personal photographic record without lawful consent'
          : hasIronRod
          ? 'Use of dangerous blunt impact weapon (Iron Rod)'
          : 'Voluntary commission of unlawful act without consent',
        matchedFacts: factsWhat.length > 0 ? factsWhat : ['Incident parameters as described in complainant narrative'],
        satisfied: 'yes',
      },
      {
        id: 'ing-2',
        element: 'Absence of lawful authorization, court order, or grave provocation',
        matchedFacts: ['Non-consensual execution without statutory defense'],
        satisfied: 'yes',
      },
      {
        id: 'ing-3',
        element: hasPhotoPrivacy
          ? 'Dissemination across internet / social network violating privacy expectations'
          : 'Requisite criminal intention (mens rea) or culpable knowledge',
        matchedFacts: hasPhotoPrivacy ? ['Post published to social media platform'] : ['Intentionally initiated unlawful act'],
        satisfied: 'yes',
      },
    ],
    forensicEvidence: evidenceList.length > 0 ? evidenceList : [
      {
        category: 'digital' as ForensicCategory,
        item: 'Electronic Communication & Social Media Logs',
        priority: 'high' as const,
        notes: 'Secure digital evidence accompanied by mandatory Section 63 BSA Hash & Custody Certificate.',
      },
      {
        category: 'documentary' as ForensicCategory,
        item: 'Complainant First Information Statement',
        priority: 'high' as const,
        notes: 'Record under Section 173 BNSS with verified date, time, and incident timeline.',
      },
    ],
    defenseCritique: defenseList.length > 0 ? defenseList : [
      {
        argument: 'Challenge to Identification & Contemporaneous Reporting',
        weakness: 'Delay in reporting or lack of independent witness verification.',
        counter: 'Prosecution must establish digital trace corroborate timeline and party identities.',
      },
      {
        argument: 'Defect in Digital Evidence Certification under Section 63 BSA',
        weakness: 'Electronic records submitted without contemporaneous technical certificate by device custodian.',
        counter: 'Procure Section 63 BSA certificate from device custodian before chargesheet filing.',
      },
    ],
    extractedFacts: {
      who: ['Complainant (Victim)', 'Perpetrator(s)'],
      what: factsWhat.length > 0 ? factsWhat : [title],
      when: ['Timeline as reported in incident narrative'],
      where: ['Digital platform / Public or Private jurisdiction'],
      how: factsHow.length > 0 ? factsHow : ['Unlawful act performed without consent'],
    },
    sources: [
      {
        id: 'bns-statute-source',
        label: `${sections[0]?.act || 'BNS'} 2023 - ${sections[0]?.section || 'Section'} (${sections[0]?.title || 'Legal Provision'})`,
        snippet: sections[0]?.simplifiedText || sections[0]?.rawStatutoryText || 'Statutory legal provision under Indian Criminal Law.',
        score: 0.94,
      },
      {
        id: 'bsa-sec-63-digital',
        label: 'BSA 2023 - Section 63 (Admissibility of Electronic Records)',
        snippet: 'Admissibility of digital records, photos, and messages requires hash integrity and mandatory certificate...',
        score: 0.89,
      },
    ],
    disclaimer: 'Educational analysis only. Not legal advice. Consult a licensed advocate.',
  };
}

export const mockDefaultAnalysisResult: AnalysisResult = generateDynamicAnalysis(mockSampleScenario);
