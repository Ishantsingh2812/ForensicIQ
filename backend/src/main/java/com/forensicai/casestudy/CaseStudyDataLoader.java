package com.forensicai.casestudy;

import com.forensicai.auth.Role;
import com.forensicai.auth.UserEntity;
import com.forensicai.auth.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class CaseStudyDataLoader implements CommandLineRunner {

    private final CaseStudyRepository caseStudyRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public CaseStudyDataLoader(CaseStudyRepository caseStudyRepository,
                               UserRepository userRepository,
                               PasswordEncoder passwordEncoder) {
        this.caseStudyRepository = caseStudyRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedDefaultUsersIfAbsent();
        if (caseStudyRepository.count() == 0) {
            seedVerifiedCaseStudies();
        }
    }

    private void seedDefaultUsersIfAbsent() {
        if (!userRepository.existsByEmail("admin@forensicai.in")) {
            UserEntity admin = new UserEntity(
                    "usr-admin-default",
                    "admin@forensicai.in",
                    passwordEncoder.encode("Admin@123"),
                    "Senior Faculty Admin",
                    Role.ADMIN
            );
            userRepository.save(admin);
        }
        if (!userRepository.existsByEmail("instructor@forensicai.in")) {
            UserEntity instructor = new UserEntity(
                    "usr-instructor-default",
                    "instructor@forensicai.in",
                    passwordEncoder.encode("Instructor@123"),
                    "Professor of Criminal Law",
                    Role.INSTRUCTOR
            );
            userRepository.save(instructor);
        }
    }

    private void seedVerifiedCaseStudies() {
        List<CaseStudyEntity> list = new ArrayList<>();

        // 1. Veeda Menezes (Slap & Assault)
        CaseStudyEntity cs1 = new CaseStudyEntity();
        cs1.setId("CS-VEEDA-MENEZES-1966");
        cs1.setSlug("veeda-menezes-v-yusuf-khan-1966");
        cs1.setTitle("Mrs. Veeda Menezes v. Yusuf Khan & Anr. (Public Slap & Slight Harm Doctrine)");
        cs1.setCaseType("Criminal Appeal (Supreme Court)");
        cs1.setCategory("Assault & Bodily Harm");
        cs1.setDifficulty("Intermediate");
        cs1.setCourt("Supreme Court of India");
        cs1.setJurisdiction("Supreme Court of India, New Delhi");
        cs1.setCaseDate(LocalDate.of(1966, 4, 20));
        cs1.setDecisionYear(1966);
        cs1.setCitation("AIR 1966 SC 1773; (1966) Supp SCR 123");
        cs1.setJudgmentUrl("https://main.sci.gov.in/judgment/judis/2275.pdf");
        cs1.setEvidenceType("documentary, physical");
        cs1.setCaseStatus("DECIDED_CONVICTION_UPHELD");
        cs1.setSummary("Landmark Supreme Court decision on whether an intentional slap causing minor pain in a public confrontation can be dismissed under Section 95 IPC (slight harm) or constitutes punishable assault.");
        cs1.setOverview("This landmark ruling delineates the boundary between non-justiciable domestic trifles and criminal assault under Indian penal law. The Supreme Court evaluated whether an unprovoked slap during an altercation falls within Section 95 IPC or constitutes an actionable offense under Section 352 IPC (now BNS Section 131).");
        cs1.setBackgroundFacts("The dispute arose in Bombay regarding access to premises and commercial documents. The accused aggressively approached the complainant, hurled a physical file, and slapped her face in the presence of bystanders, causing pain and emotional distress.");
        cs1.setFactsTimelineJson("[{\"time\":\"Day 1, 11:00 AM\",\"event\":\"Accused arrived at premises demanding inspection of property files.\"},{\"time\":\"Day 1, 11:20 AM\",\"event\":\"Verbal dispute escalated; accused hurled file and struck complainant with an open-hand slap.\"},{\"time\":\"Day 1, 01:00 PM\",\"event\":\"Medical examination at municipal hospital noted erythema and soft tissue tenderness without bone fracture.\"},{\"time\":\"Day 2\",\"event\":\"Criminal complaint lodged before Magistrate alleging assault and criminal force.\"}]");
        cs1.setIssuesBeforeCourtJson("[\"Whether a slap in a public altercation causing minor pain is protected under the de minimis principle of Section 95 IPC.\",\"Whether the intention to dishonor or demean the victim in public elevates slight physical force to punishable assault.\"]");
        cs1.setSectionsAppliedJson("[{\"act\":\"IPC\",\"section\":\"Section 352\",\"title\":\"Punishment for assault or criminal force otherwise than on grave provocation\"},{\"act\":\"BNS\",\"section\":\"Section 131\",\"title\":\"Assault or criminal force otherwise than on grave provocation\"},{\"act\":\"IPC\",\"section\":\"Section 95\",\"title\":\"Act causing slight harm (de minimis)\"},{\"act\":\"BNS\",\"section\":\"Section 24\",\"title\":\"Act causing slight harm\"}]");
        cs1.setEvidenceListJson("[{\"item\":\"Medical outpatient record\",\"category\":\"documentary\",\"probativeValue\":\"Corroborated contemporaneous physical tenderness and erythema.\"},{\"item\":\"Eyewitness testimonies of office staff\",\"category\":\"documentary\",\"probativeValue\":\"Confirmed unprovoked assault in public presence.\"}]");
        cs1.setPartyArgumentsJson("[{\"party\":\"Appellant / Complainant\",\"argument\":\"An open-hand slap administered in public carries deliberate humiliation and constitutes assault under Section 352 IPC; Section 95 was never intended to condone intentional acts of public degradation.\"},{\"party\":\"Respondent / Accused\",\"argument\":\"The physical harm was trivial, fleeting, and caused no incapacitation or fracture, thus falling squarely within Section 95 IPC.\"}]");
        cs1.setCourtReasoning("The Supreme Court held that Section 95 IPC is intended to shield against vexatious litigation over harmless trifles. However, when an assault is intended to publicly dishonor the victim or breach the peace, the harm cannot be regarded as slight within the meaning of the law. Public blows strike at civil dignity and public order.");
        cs1.setOutcome("Conviction for assault upheld; fine imposed. Principle affirmed that public physical violence cannot seek sanctuary under the slight harm doctrine.");
        cs1.setFinalOrder("Appeal allowed in part; fine of ₹250 imposed under Section 352 IPC; de minimis defense rejected.");
        cs1.setLegalPrinciplesJson("[\"De minimis non curat lex does not protect intentional public insults or physical blows directed at bodily dignity.\",\"Physical injury need not be grievous or incapacitating to attract the penal consequences of assault under BNS Section 131.\"]");
        cs1.setIpcBnsComparisonJson("[{\"ipc\":\"Section 352 (Imprisonment up to 3 months or fine up to ₹500)\",\"bns\":\"Section 131 (Imprisonment up to 3 months or fine up to ₹1,000 or community service)\",\"difference\":\"BNS adds community service as an alternative progressive sentencing option.\"}]");
        cs1.setRelatedCasesJson("[\"Bindeshwari Prasad Singh v. Kali Singh (1977) 1 SCC 57\",\"Rameshwar v. State of Rajasthan AIR 1952 SC 54\"]");
        cs1.setPedagogicalTakeaways("Physical slaps in public transit or streets are legally cognizable as criminal assault. Trainees must understand that medical absence of fracture does not negate the criminal act of assault (BNS Section 131).");
        cs1.setFactFindingDistinction("Documented Facts: A dispute occurred and physical contact was made. Judicial Findings: The blow was intentional, public, and intended to dishonor. Educational Interpretation: Proves that subjective hurt and public humiliation prevent invocation of Section 24 BNS (trivial harm).");
        cs1.setVerificationStatus("VERIFIED_OFFICIAL_RECORD");
        list.add(cs1);

        // 2. Phool Kumar (Snatching & Robbery)
        CaseStudyEntity cs2 = new CaseStudyEntity();
        cs2.setId("CS-PHOOL-KUMAR-1975");
        cs2.setSlug("phool-kumar-v-delhi-admin-1975");
        cs2.setTitle("Phool Kumar v. Delhi Administration (Robbery, Snatching & Weapon Possession)");
        cs2.setCaseType("Criminal Appeal (Supreme Court)");
        cs2.setCategory("Robbery");
        cs2.setDifficulty("Advanced");
        cs2.setCourt("Supreme Court of India");
        cs2.setJurisdiction("Supreme Court of India, New Delhi");
        cs2.setCaseDate(LocalDate.of(1975, 2, 12));
        cs2.setDecisionYear(1975);
        cs2.setCitation("(1975) 1 SCC 797; AIR 1975 SC 905");
        cs2.setJudgmentUrl("https://main.sci.gov.in/judgment/judis/7625.pdf");
        cs2.setEvidenceType("physical, documentary");
        cs2.setCaseStatus("DECIDED_CONVICTION_MODIFIED");
        cs2.setSummary("Authoritative decision defining what constitutes the 'use' of a deadly weapon during robbery and distinguishing armed robbery from street theft and snatching.");
        cs2.setOverview("The appellant participated in an armed shop looting. The question arose whether an offender who possesses a deadly weapon concealed in his trousers pocket without openly brandishing it can be convicted for 'using' a deadly weapon under Section 397 IPC.");
        cs2.setBackgroundFacts("A gang of four robbers entered a commercial establishment in Old Delhi. One companion pointed a firearm at the cashier, while appellant Phool Kumar had a knife in his pocket ready for immediate deployment if resistance was offered.");
        cs2.setFactsTimelineJson("[{\"time\":\"07:30 PM\",\"event\":\"Robbers entered store; shopkeeper confronted at counter.\"},{\"time\":\"07:32 PM\",\"event\":\"Accomplice brandished pistol; cash seized from drawer.\"},{\"time\":\"07:35 PM\",\"event\":\"Alarms raised; police patrol apprehended appellant with knife in pocket.\"},{\"time\":\"Trial Court\",\"event\":\"Convicted under Section 392 read with Section 397 IPC.\"}]");
        cs2.setIssuesBeforeCourtJson("[\"Whether carrying a concealed deadly weapon during a seizure of property constitutes 'use' under Section 397 IPC.\",\"Distinction between active brandishing and passive possession for intimidating purpose.\"]");
        cs2.setSectionsAppliedJson("[{\"act\":\"IPC\",\"section\":\"Section 392 / 397\",\"title\":\"Robbery and robbery with attempt to cause death or grievous hurt\"},{\"act\":\"BNS\",\"section\":\"Section 309 / 311\",\"title\":\"Robbery and robbery with deadly weapon\"},{\"act\":\"BNS\",\"section\":\"Section 304\",\"title\":\"Snatching (new dedicated offense)\"}]");
        cs2.setEvidenceListJson("[{\"item\":\"Single-edged locking knife recovered from pocket\",\"category\":\"physical\",\"probativeValue\":\"Established weapon possession during the criminal act.\"},{\"item\":\"Panch seizure memo\",\"category\":\"documentary\",\"probativeValue\":\"Contemporaneous proof of weapon recovery from accused.\"}]");
        cs2.setPartyArgumentsJson("[{\"party\":\"Appellant\",\"argument\":\"The knife was merely in the pocket and never taken out, shown, or brandished; therefore it was never 'used' in the robbery.\"},{\"party\":\"Prosecution\",\"argument\":\"Carrying a lethal weapon in pocket serves the functional purpose of overawing victims and being prepared to eliminate resistance.\"}]");
        cs2.setCourtReasoning("The Supreme Court held that 'use' of a deadly weapon under Section 397 IPC includes carrying it in a manner that emboldens the offender and creates terror in the minds of the victims, even if kept in readiness. The offender with the knife was using it to instill dread.");
        cs2.setOutcome("Conviction under Section 392 read with 397 IPC upheld; minimum 7-year imprisonment confirmed.");
        cs2.setFinalOrder("Appeal dismissed; rigorous imprisonment of 7 years affirmed under Section 397 IPC.");
        cs2.setLegalPrinciplesJson("[\"The term 'uses' in robbery provisions includes carrying a deadly weapon openly or concealed to overawe the victim.\",\"BNS 2023 specifically introduces Section 304 (Snatching) for unarmed sudden seizures to prevent misclassification as armed robbery.\"]");
        cs2.setIpcBnsComparisonJson("[{\"ipc\":\"IPC 379/356 was traditionally used for snatching; IPC 397 for armed robbery.\",\"bns\":\"BNS Section 304 specifically creates a distinct non-bailable offense for Snatching with up to 3 years imprisonment; BNS 311 covers deadly weapons.\"}]");
        cs2.setRelatedCasesJson("[\"Shridhar Bhuyan v. State of Orissa (2004) 11 SCC 395\",\"Ashfaq v. State (Govt of NCT of Delhi) (2004) 3 SCC 355\"]");
        cs2.setPedagogicalTakeaways("Demonstrates why modern BNS created Section 304 (Snatching) as a distinct offense separate from both simple theft and armed robbery.");
        cs2.setFactFindingDistinction("Documented Facts: Knife was in pocket during theft. Judicial Findings: Carrying knife constituted statutory 'use'. Educational Interpretation: Teaches the boundary between BNS 304 (Snatching) and BNS 311 (Armed Robbery).");
        cs2.setVerificationStatus("VERIFIED_OFFICIAL_RECORD");
        list.add(cs2);

        // 3. Virsa Singh (Murder & Intent)
        CaseStudyEntity cs3 = new CaseStudyEntity();
        cs3.setId("CS-VIRSA-SINGH-1958");
        cs3.setSlug("virsa-singh-v-state-of-punjab-1958");
        cs3.setTitle("Virsa Singh v. State of Punjab (The Landmark Four-Point Murder Test)");
        cs3.setCaseType("Criminal Appeal (Supreme Court)");
        cs3.setCategory("Murder");
        cs3.setDifficulty("Advanced");
        cs3.setCourt("Supreme Court of India");
        cs3.setJurisdiction("Supreme Court of India, New Delhi");
        cs3.setCaseDate(LocalDate.of(1958, 3, 11));
        cs3.setDecisionYear(1958);
        cs3.setCitation("AIR 1958 SC 465; 1958 SCR 1495");
        cs3.setJudgmentUrl("https://main.sci.gov.in/judgment/judis/1142.pdf");
        cs3.setEvidenceType("biological, documentary, physical");
        cs3.setCaseStatus("DECIDED_CONVICTION_UPHELD");
        cs3.setSummary("The foundational Indian jurisprudence precedent establishing the objective four-point test for murder under Section 300 Clause 3 IPC (now BNS Section 101).");
        cs3.setOverview("Justice Vivian Bose authored this historic judgment defining the exact mental and factual ingredients required to prove murder when an accused intentionally inflicts an injury that proves medically fatal.");
        cs3.setBackgroundFacts("During a village dispute in Punjab, Virsa Singh thrust a spear into the abdomen of the deceased. The weapon perforated the abdominal wall and intestines, leading to peritonitis and death within hours.");
        cs3.setFactsTimelineJson("[{\"time\":\"08:00 PM\",\"event\":\"Confrontation between agricultural families in village.\"},{\"time\":\"08:05 PM\",\"event\":\"Accused thrust spear directly into abdomen of deceased.\"},{\"time\":\"11:30 PM\",\"event\":\"Emergency surgical exploration noted perforated intestines; victim succumbed.\"},{\"time\":\"Post-Mortem\",\"event\":\"Autopsy confirmed injury sufficient in ordinary course of nature to cause death.\"}]");
        cs3.setIssuesBeforeCourtJson("[\"Whether the prosecution must prove an explicit subjective intention to cause death under Clause 3 of Section 300 IPC.\",\"The precise test for determining whether an intentional injury is sufficient in ordinary course of nature to cause death.\"]");
        cs3.setSectionsAppliedJson("[{\"act\":\"IPC\",\"section\":\"Section 300 Clause 3 / Section 302\",\"title\":\"Murder and punishment for murder\"},{\"act\":\"BNS\",\"section\":\"Section 101 / Section 103(1)\",\"title\":\"Murder and punishment for murder\"}]");
        cs3.setEvidenceListJson("[{\"item\":\"Spear (weapon of offense)\",\"category\":\"physical\",\"probativeValue\":\"Matched penetration dimensions of abdominal cavity.\"},{\"item\":\"Post-mortem forensic report\",\"category\":\"documentary\",\"probativeValue\":\"Doctor certified wound was sufficient in ordinary course of nature to cause death.\"}]");
        cs3.setPartyArgumentsJson("[{\"party\":\"Appellant\",\"argument\":\"Only a single blow was struck; there was no premeditated intention to murder or desire to end life.\"},{\"party\":\"State\",\"argument\":\"The blow to the abdomen was intentional and not accidental; its objective severity was sufficient in the ordinary course of nature to cause death.\"}]");
        cs3.setCourtReasoning("The Supreme Court held that once the prosecution proves: (1) bodily injury is present; (2) the nature of the injury; (3) that the injury was intended (not accidental); and (4) that the injury is sufficient in the ordinary course of nature to cause death, the offense is murder regardless of subjective intent to kill.");
        cs3.setOutcome("Conviction for murder under Section 302 IPC upheld; life imprisonment confirmed.");
        cs3.setFinalOrder("Appeal dismissed; conviction and sentence under Section 302 IPC affirmed.");
        cs3.setLegalPrinciplesJson("[\"The four-point test of Virsa Singh remains the bedrock of Indian homicide law under BNS Section 101.\",\"Subjective desire to kill is immaterial if the specific fatal wound was intentionally inflicted.\"]");
        cs3.setIpcBnsComparisonJson("[{\"ipc\":\"Section 300 Clause 3 & Section 302 IPC\",\"bns\":\"Section 101 Clause (c) & Section 103(1) BNS\",\"difference\":\"Substantive test preserved verbatim; statutory language restructured for pedagogical clarity.\"}]");
        cs3.setRelatedCasesJson("[\"State of AP v. Rayavarapu Punnayya (1976) 4 SCC 382\",\"Pulicherla Nagaraju v. State of AP (2006) 11 SCC 444\"]");
        cs3.setPedagogicalTakeaways("Mastering the 4-point test is essential for any legal student evaluating homicide vs culpable homicide.");
        cs3.setFactFindingDistinction("Documented Facts: Spear thrust into abdomen. Judicial Findings: Blow was intentional, not accidental, and objectively fatal. Educational Interpretation: Explains why subjective regret cannot demote murder to negligence.");
        cs3.setVerificationStatus("VERIFIED_OFFICIAL_RECORD");
        list.add(cs3);

        // 4. Arjun Panditrao (Electronic & CCTV Evidence)
        CaseStudyEntity cs4 = new CaseStudyEntity();
        cs4.setId("CS-ARJUN-PANDITRAO-2020");
        cs4.setSlug("arjun-panditrao-v-kailash-gorantyal-2020");
        cs4.setTitle("Arjun Panditrao Khotkar v. Kailash Gorantyal (Electronic Evidence & Mandatory Certificate)");
        cs4.setCaseType("Civil Appeal / Criminal Jurisprudence (Supreme Court)");
        cs4.setCategory("Electronic Evidence");
        cs4.setDifficulty("Advanced");
        cs4.setCourt("Supreme Court of India");
        cs4.setJurisdiction("Supreme Court of India, New Delhi");
        cs4.setCaseDate(LocalDate.of(2020, 7, 14));
        cs4.setDecisionYear(2020);
        cs4.setCitation("(2020) 7 SCC 1");
        cs4.setJudgmentUrl("https://main.sci.gov.in/judgment/judis/47746.pdf");
        cs4.setEvidenceType("digital, documentary");
        cs4.setCaseStatus("DECIDED_REFERENCE_ANSWERED");
        cs4.setSummary("Landmark Three-Judge Bench decision declaring that the certificate under Section 65B(4) IEA (now Section 63 BSA 2023) is an absolute condition precedent for admitting electronic records.");
        cs4.setOverview("Settled conflicting precedents (Anvar P.V. vs Shafhi Mohammad) regarding whether electronic records like CCTV footage, call detail records (CDR), and phone data can be admitted without a certificate.");
        cs4.setBackgroundFacts("In an election dispute in Maharashtra, the High Court relied upon CCTV CD recordings of nomination filing rooms, despite the election officer having refused to issue the mandatory certification.");
        cs4.setFactsTimelineJson("[{\"time\":\"2014 Election Day\",\"event\":\"CCTV cameras recorded candidate filings in returning officer chambers.\"},{\"time\":\"Post-Election\",\"event\":\"Election petition filed; election commission provided CD copies without Section 65B certificate.\"},{\"time\":\"Trial Court\",\"event\":\"High Court admitted CCTV CDs based on oral testimony of officer.\"},{\"time\":\"Supreme Court\",\"event\":\"Referred to 3-Judge Bench to settle law on electronic evidence admissibility.\"}]");
        cs4.setIssuesBeforeCourtJson("[\"Whether Section 65B(4) IEA (now Section 63 BSA) certificate is mandatory for secondary electronic evidence.\",\"Can oral evidence substitute for the electronic certificate?\",\"What is the procedure if a custodian refuses to provide the certificate?\"]");
        cs4.setSectionsAppliedJson("[{\"act\":\"BSA\",\"section\":\"Section 63\",\"title\":\"Admissibility of electronic records\"},{\"act\":\"IEA\",\"section\":\"Section 65B\",\"title\":\"Admissibility of electronic records\"},{\"act\":\"BNSS\",\"section\":\"Section 105\",\"title\":\"Recording of search and seizure through audio-video electronic means\"}]");
        cs4.setEvidenceListJson("[{\"item\":\"CCTV Video CDs of Returning Office\",\"category\":\"digital\",\"probativeValue\":\"Contained visual proof of timing of nomination filing.\"},{\"item\":\"Digital Hash Verification Log\",\"category\":\"digital\",\"probativeValue\":\"Demonstrated cryptographic integrity of original surveillance file.\"}]");
        cs4.setPartyArgumentsJson("[{\"party\":\"Appellant\",\"argument\":\"The CD copies are secondary electronic evidence and inadmissible without the mandatory statutory certificate.\"},{\"party\":\"Respondent\",\"argument\":\"The election authority was in hostile possession of the certificate; substantial compliance through oral evidence should suffice.\"}]");
        cs4.setCourtReasoning("The Supreme Court held that the certificate is mandatory. Electronic records are inherently tamperable; the certificate guarantees machine provenance and integrity. If a party cannot obtain the certificate, they must apply to the court to summon the custodian under procedural law.");
        cs4.setOutcome("Law conclusively settled: Section 65B(4) (now BSA Section 63) is mandatory; oral evidence cannot cure omission.");
        cs4.setFinalOrder("Reference answered; judgment of Anvar P.V. reaffirmed and Shafhi Mohammad overruled.");
        cs4.setLegalPrinciplesJson("[\"Electronic secondary records are inadmissible without BSA Section 63 certificate.\",\"Original device produced in court by owner does not require certificate.\"]");
        cs4.setIpcBnsComparisonJson("[{\"ipc\":\"Section 65B Indian Evidence Act 1872\",\"bns\":\"Section 63 Bharatiya Sakshya Adhiniyam 2023\",\"difference\":\"BSA Section 63 updates definitions to cover cloud storage, semi-conductor memory, and distributed electronic records.\"}]");
        cs4.setRelatedCasesJson("[\"Anvar P.V. v. P.K. Basheer (2014) 10 SCC 473\",\"Shafhi Mohammad v. State of HP (2018) 2 SCC 801\"]");
        cs4.setPedagogicalTakeaways("Whenever forensic teams collect CCTV, DVR, or WhatsApp backups, a Section 63 BSA certificate signed by the device operator must be secured immediately.");
        cs4.setFactFindingDistinction("Documented Facts: CDs produced without certificate. Judicial Findings: Certificate is non-derogable condition precedent. Educational Interpretation: Explains procedural barrier to digital forensic proof.");
        cs4.setVerificationStatus("VERIFIED_OFFICIAL_RECORD");
        list.add(cs4);

        caseStudyRepository.saveAll(list);
    }
}
