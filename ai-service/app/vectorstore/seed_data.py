from typing import List, Dict, Any

LEGAL_CORPUS_CHUNKS: List[Dict[str, Any]] = [
    {
        "id": "bns-311-robbery-aggravated",
        "act": "BNS",
        "section": "Section 311",
        "title": "Robbery or dacoity with attempt to cause death or grievous hurt",
        "category": "Robbery",
        "record_type": "statute",
        "text": (
            "This provision addresses robbery or dacoity involving the use "
            "of a deadly weapon, causing grievous hurt, or attempting to "
            "cause death or grievous hurt. The provision prescribes a "
            "minimum term of imprisonment of seven years."
        ),
        "ipcEquivalent": "IPC Section 397",
        "related_sections": ["BNS Section 309"],
        "related_cases": [],
        "keywords": ["robbery", "dacoity", "deadly weapon", "grievous hurt"],
        "source_name": "Bharatiya Nyaya Sanhita, 2023",
        "source_url": "https://www.mha.gov.in/en/commoncontent/new-criminal-laws",
        "verification_status": "verify_against_official_act",
    },
    {
        "id": "ipc-397-phool-kumar",
        "act": "IPC",
        "section": "Section 397",
        "title": "Robbery or dacoity with attempt to cause death or grievous hurt",
        "category": "Robbery",
        "record_type": "precedent",
        "text": (
            "Historical IPC provision concerning robbery or dacoity involving "
            "a deadly weapon, grievous hurt, or an attempt to cause death "
            "or grievous hurt. Use this record for historical-law research "
            "and comparison with the corresponding BNS provision."
        ),
        "precedent": {
            "case_name": "Phool Kumar v. Delhi Administration",
            "citation": "AIR 1975 SC 905",
            "legal_issue": (
                "Interpretation of the word 'uses' in IPC Section 397 "
                "in relation to a weapon during robbery."
            ),
            "summary_status": "verify_against_original_judgment",
        },
        "ipcEquivalent": None,
        "related_sections": ["BNS Section 311"],
        "related_cases": ["Phool Kumar v. Delhi Administration"],
        "keywords": ["IPC 397", "robbery", "weapon", "Supreme Court"],
        "source_name": "Supreme Court judgment; citation supplied for verification",
        "source_url": "https://www.mha.gov.in/en/commoncontent/new-criminal-laws",
        "verification_status": "verify_judgment_and_citation",
        "note": (
            "Historical IPC law should not automatically be treated as the "
            "law applicable to incidents occurring under the BNS."
        ),
    },
    {
        "id": "bns-118-2-grievous-hurt-weapon",
        "act": "BNS",
        "section": "Section 118(2)",
        "title": "Voluntarily causing grievous hurt by dangerous weapons or means",
        "category": "Grievous Hurt",
        "record_type": "statute",
        "text": (
            "This provision concerns voluntarily causing grievous hurt using "
            "specified dangerous weapons or means. It prescribes imprisonment "
            "for life or imprisonment for a term of at least one year, "
            "which may extend to ten years, and liability to fine."
        ),
        "ipcEquivalent": "IPC Section 326",
        "related_sections": ["BNS Section 116", "BNS Section 117"],
        "related_cases": [],
        "keywords": [
            "grievous hurt",
            "dangerous weapon",
            "stabbing",
            "cutting",
            "injury",
        ],
        "source_name": "Bharatiya Nyaya Sanhita, 2023",
        "source_url": "https://www.mha.gov.in/en/commoncontent/new-criminal-laws",
        "verification_status": "verify_against_official_act",
    },
    {
        "id": "bns-103-1-punishment-murder",
        "act": "BNS",
        "section": "Section 103(1)",
        "title": "Punishment for murder",
        "category": "Murder",
        "record_type": "statute",
        "text": (
            "This provision prescribes the punishment for murder, including "
            "death or imprisonment for life, and liability to fine. The "
            "applicability of the provision depends on the established facts "
            "and the relevant legal requirements."
        ),
        "ipcEquivalent": "IPC Section 302",
        "related_sections": ["BNS Section 100", "BNS Section 101"],
        "related_cases": [],
        "keywords": ["murder", "homicide", "death", "punishment"],
        "source_name": "Bharatiya Nyaya Sanhita, 2023",
        "source_url": "https://www.mha.gov.in/en/commoncontent/new-criminal-laws",
        "verification_status": "verify_against_official_act",
    },
    {
        "id": "bsa-63-electronic-records",
        "act": "BSA",
        "section": "Section 63",
        "title": "Admissibility of electronic records",
        "category": "Electronic Evidence",
        "record_type": "statute",
        "text": (
            "This provision sets out conditions for the admissibility of "
            "electronic records and computer outputs as evidence. Relevant "
            "issues may include how the record was produced, the applicable "
            "statutory conditions, and the required certificate and particulars."
        ),
        "ipcEquivalent": None,
        "legacyEquivalent": "Indian Evidence Act, 1872, Section 65B",
        "related_sections": ["BSA Section 61", "BSA Section 62"],
        "related_cases": [],
        "keywords": [
            "electronic evidence",
            "digital evidence",
            "CCTV",
            "computer output",
            "certificate",
        ],
        "source_name": "Bharatiya Sakshya Adhiniyam, 2023",
        "source_url": (
            "https://www.indiacode.nic.in/indiacode/bitstream/"
            "123456789/20063/1/aa202347.pdf"
        ),
        "verification_status": "verify_against_official_act",
    },
    {
        "id": "bnss-173-cognizable-information",
        "act": "BNSS",
        "section": "Section 173",
        "title": "Information in cognizable cases",
        "category": "Criminal Procedure",
        "record_type": "statute",
        "text": (
            "This provision governs the recording of information relating "
            "to cognizable offences. It covers oral and electronic information, "
            "the recording process, provision of a copy to the informant or "
            "victim, and a conditional preliminary-enquiry procedure for "
            "certain offences punishable by three years or more but less "
            "than seven years, subject to statutory requirements."
        ),
        "ipcEquivalent": None,
        "legacyEquivalent": "Code of Criminal Procedure, 1973, Section 154",
        "related_sections": ["BNSS Section 175"],
        "related_cases": [],
        "keywords": [
            "FIR",
            "cognizable offence",
            "police",
            "electronic communication",
            "preliminary enquiry",
        ],
        "source_name": "Bharatiya Nagarik Suraksha Sanhita, 2023",
        "source_url": "https://www.indiacode.nic.in/indiacode/handle/123456789/20099",
        "verification_status": "verify_against_official_act",
    },
]



def make_chunk(
    record_id: str,
    act: str,
    section: str,
    title: str,
    category: str,
    text: str,
    keywords: list,
    related_sections: list = None,
    record_type: str = "statute",
) -> Dict[str, Any]:
    source_urls = {
        "BNS": (
            "https://www.indiacode.nic.in/bitstream/"
            "123456789/20062/1/a202345.pdf"
        ),
        "BSA": (
            "https://www.indiacode.nic.in/indiacode/bitstream/"
            "123456789/20063/1/aa202347.pdf"
        ),
        "BNSS": (
            "https://www.indiacode.nic.in/indiacode/handle/"
            "123456789/20099"
        ),
    }

    return {
        "id": record_id,
        "act": act,
        "section": section,
        "title": title,
        "category": category,
        "record_type": record_type,
        "text": text,
        "keywords": keywords,
        "related_sections": related_sections or [],
        "related_cases": [],
        "source_name": {
            "BNS": "Bharatiya Nyaya Sanhita, 2023",
            "BSA": "Bharatiya Sakshya Adhiniyam, 2023",
            "BNSS": "Bharatiya Nagarik Suraksha Sanhita, 2023",
        }[act],
        "source_url": source_urls[act],
        "verification_status": "verify_against_official_act",
    }


ADDITIONAL_LEGAL_CHUNKS: List[Dict[str, Any]] = [
    # --------------------------------------------------
    # BNS: OFFENCES AND CRIMINAL LIABILITY
    # --------------------------------------------------
    make_chunk(
        "bns-100-culpable-homicide", "BNS", "Section 100",
        "Culpable homicide", "Homicide",
        "Defines culpable homicide by reference to causing death with the "
        "specified intention or knowledge. Examine the circumstances, "
        "mental element, causation, and applicable statutory exceptions.",
        ["homicide", "death", "intention", "knowledge"],
        ["BNS Section 101", "BNS Section 105"],
    ),
    make_chunk(
        "bns-101-murder-definition", "BNS", "Section 101",
        "Murder", "Homicide",
        "Defines the circumstances in which culpable homicide amounts to "
        "murder, subject to the statutory conditions and exceptions. "
        "Classification depends on the facts and applicable law.",
        ["murder", "homicide", "intent", "exceptions"],
        ["BNS Section 100", "BNS Section 103"],
    ),
    make_chunk(
        "bns-105-culpable-homicide-punishment", "BNS", "Section 105",
        "Punishment for culpable homicide not amounting to murder",
        "Homicide",
        "Addresses punishment for culpable homicide not amounting to murder. "
        "The applicable part depends on the intention or knowledge and the "
        "circumstances specified by the provision.",
        ["culpable homicide", "death", "punishment"],
        ["BNS Section 100", "BNS Section 101"],
    ),
    make_chunk(
        "bns-109-attempt-murder", "BNS", "Section 109",
        "Attempt to murder", "Violent Offence",
        "Concerns an act done with the intention or knowledge and under "
        "circumstances such that, if death were caused, the act could "
        "amount to murder. Investigators should distinguish evidence of "
        "intention from the injury actually sustained.",
        ["attempt to murder", "intent", "weapon", "injury"],
        ["BNS Section 101", "BNS Section 103"],
    ),
    make_chunk(
        "bns-115-voluntarily-causing-hurt", "BNS", "Section 115",
        "Voluntarily causing hurt", "Physical Injury",
        "Addresses voluntarily causing hurt and the circumstances relevant "
        "to liability. Medical records, witness accounts, and injury evidence "
        "may help establish the facts, subject to legal assessment.",
        ["hurt", "assault", "medical evidence", "injury"],
        ["BNS Section 116", "BNS Section 117"],
    ),
    make_chunk(
        "bns-116-grievous-hurt-definition", "BNS", "Section 116",
        "Grievous hurt", "Physical Injury",
        "Specifies categories of injury treated as grievous hurt under the "
        "law. The medical description should be compared with the statutory "
        "definition rather than assuming every serious-looking injury "
        "meets the legal test.",
        ["grievous hurt", "medical report", "injury classification"],
        ["BNS Section 115", "BNS Section 117"],
    ),
    make_chunk(
        "bns-117-voluntarily-causing-grievous-hurt", "BNS", "Section 117",
        "Voluntarily causing grievous hurt", "Physical Injury",
        "Addresses voluntarily causing grievous hurt. Relevant investigative "
        "material may include medical evidence, the alleged act, causation, "
        "and facts bearing on intention or knowledge.",
        ["grievous hurt", "medical evidence", "causation"],
        ["BNS Section 116", "BNS Section 118"],
    ),
    make_chunk(
        "bns-124-acid-attack", "BNS", "Section 124",
        "Voluntarily causing grievous hurt by use of acid, etc.",
        "Violent Offence",
        "Addresses specified acts involving acid or similar substances and "
        "the resulting harm. Preserve medical documentation, scene evidence, "
        "witness accounts, and relevant physical or chemical evidence.",
        ["acid attack", "chemical injury", "medical evidence", "forensics"],
        ["BNS Section 116", "BNS Section 117"],
    ),
    make_chunk(
        "bns-125-endangering-life", "BNS", "Section 125",
        "Act endangering life or personal safety of others",
        "Public Safety",
        "Concerns specified rash or negligent acts that endanger human life "
        "or personal safety. Assessment requires evidence of the act, risk, "
        "causation, and resulting consequences where applicable.",
        ["negligence", "endangerment", "public safety", "causation"],
        ["BNS Section 115", "BNS Section 117"],
    ),
    make_chunk(
        "bns-303-theft", "BNS", "Section 303",
        "Theft", "Property Offence",
        "Defines theft and its essential elements. Investigators may need "
        "to establish possession, movement of property, lack of consent, "
        "and the relevant dishonest intention from the available evidence.",
        ["theft", "stolen property", "ownership", "CCTV"],
        ["BNS Section 304", "BNS Section 309"],
    ),
    make_chunk(
        "bns-304-snatching", "BNS", "Section 304",
        "Snatching", "Property Offence",
        "Addresses snatching as a specified property offence. Incident "
        "timelines, eyewitness accounts, CCTV, identification evidence, "
        "and recovery records may be relevant to the investigation.",
        ["snatching", "theft", "CCTV", "eyewitness"],
        ["BNS Section 303", "BNS Section 309"],
    ),
    make_chunk(
        "bns-308-extortion", "BNS", "Section 308",
        "Extortion", "Property Offence",
        "Concerns intentionally putting a person in fear of injury and "
        "thereby dishonestly inducing delivery of property or specified "
        "valuable items. Threat communications and transaction records "
        "may be relevant, depending on the facts.",
        ["extortion", "threat", "payment", "messages"],
        ["BNS Section 309", "BNS Section 351"],
    ),
    make_chunk(
        "bns-309-robbery", "BNS", "Section 309",
        "Robbery", "Property Offence",
        "Defines robbery in the circumstances specified by the provision, "
        "including when theft or extortion is accompanied by the required "
        "violence, attempted violence, or fear of immediate harm. Assess "
        "the actual sequence of events before classifying the offence.",
        ["robbery", "theft", "extortion", "violence"],
        ["BNS Section 303", "BNS Section 308", "BNS Section 311"],
    ),
    make_chunk(
        "bns-310-dacoity", "BNS", "Section 310",
        "Dacoity", "Property Offence",
        "Addresses dacoity, including the statutory group-participation "
        "requirements. Evidence about the number of participants, their "
        "conduct, coordination, and the incident itself may be relevant.",
        ["dacoity", "group offence", "robbery", "participants"],
        ["BNS Section 309", "BNS Section 311"],
    ),
    make_chunk(
        "bns-316-criminal-breach-trust", "BNS", "Section 316",
        "Criminal breach of trust", "Financial Offence",
        "Concerns dishonest misappropriation or use of property entrusted "
        "to a person, or other conduct covered by the statutory definition. "
        "Entrustment, account records, communications, and the handling "
        "of property may be relevant.",
        ["breach of trust", "entrustment", "misappropriation", "accounts"],
        ["BNS Section 318"],
    ),
    make_chunk(
        "bns-318-cheating", "BNS", "Section 318",
        "Cheating", "Financial Offence",
        "Addresses cheating and associated dishonest inducement under "
        "the statutory provision. Investigators should examine the alleged "
        "deception, relevant intention, communications, representations, "
        "and any resulting delivery of property or harm.",
        ["cheating", "fraud", "deception", "financial records"],
        ["BNS Section 316"],
    ),

    # --------------------------------------------------
    # BSA: EVIDENCE AND DIGITAL RECORDS
    # --------------------------------------------------
    make_chunk(
        "bsa-3-evidence-facts", "BSA", "Section 3",
        "Evidence may be given of facts in issue and relevant facts",
        "Evidence",
        "Sets out the general framework for evidence concerning facts in "
        "issue and facts declared relevant under the Act. A factual link "
        "to an incident does not, by itself, settle admissibility.",
        ["relevant facts", "facts in issue", "evidence"],
        ["BSA Section 61", "BSA Section 63"],
    ),
    make_chunk(
        "bsa-22-confession", "BSA", "Section 22",
        "Confession caused by inducement, threat, coercion or promise",
        "Statements and Confessions",
        "Addresses circumstances in which a confession is irrelevant "
        "because of the specified inducement, threat, coercion, or promise. "
        "The circumstances of the statement and the applicable statutory "
        "conditions require careful assessment.",
        ["confession", "coercion", "threat", "statement"],
        ["BSA Section 23"],
    ),
    make_chunk(
        "bsa-39-expert-opinion", "BSA", "Section 39",
        "Opinions of experts",
        "Forensic Evidence",
        "Addresses expert opinion on matters specified by the Act. Forensic "
        "reports should be interpreted in context, with attention to the "
        "expert's field, methods, findings, and limitations.",
        ["expert opinion", "forensic report", "DNA", "fingerprints"],
        ["BSA Section 40"],
    ),
    make_chunk(
        "bsa-61-electronic-digital-record", "BSA", "Section 61",
        "Electronic or digital record",
        "Electronic Evidence",
        "Provides that an electronic or digital record is not to be denied "
        "admissibility solely because it is electronic or digital, subject "
        "to the Act's provisions. The relevant statutory requirements still "
        "need to be considered.",
        ["digital evidence", "electronic record", "computer", "CCTV"],
        ["BSA Section 62", "BSA Section 63"],
    ),
    make_chunk(
        "bsa-62-electronic-evidence-proof", "BSA", "Section 62",
        "Special provisions as to evidence relating to electronic record",
        "Electronic Evidence",
        "Provides that the contents of electronic records may be proved "
        "in accordance with Section 63. The method used to prove the record "
        "must be checked against the applicable statutory conditions.",
        ["electronic record", "digital evidence", "proof"],
        ["BSA Section 61", "BSA Section 63"],
    ),
    make_chunk(
        "bsa-74-public-private-documents", "BSA", "Section 74",
        "Public and private documents",
        "Documentary Evidence",
        "Classifies documents as public or private for purposes of the "
        "evidence framework. The classification may affect how a document "
        "is proved, so its origin and legal character should be established.",
        ["public document", "private document", "documentary evidence"],
        ["BSA Section 75"],
    ),
    make_chunk(
        "bsa-75-certified-copies", "BSA", "Section 75",
        "Certified copies of public documents",
        "Documentary Evidence",
        "Addresses certified copies of public documents. Verify the document's "
        "status, the issuing authority, and the applicable requirements before "
        "relying on a copy as evidence.",
        ["certified copy", "public records", "document verification"],
        ["BSA Section 74"],
    ),

    # --------------------------------------------------
    # BNSS: REPORTING AND INVESTIGATION
    # --------------------------------------------------
    make_chunk(
        "bnss-105-audiovisual-search", "BNSS", "Section 105",
        "Recording of search and seizure through audio-video electronic means",
        "Investigation Procedure",
        "Concerns audio-video recording of specified search and seizure "
        "processes, including preparation and signing of the list of seized "
        "items and the place from which they are recovered, as required "
        "by the provision. Preserve recordings and associated records.",
        ["search", "seizure", "video recording", "chain of custody"],
        ["BNSS Section 176"],
    ),
    make_chunk(
        "bnss-175-police-investigation", "BNSS", "Section 175",
        "Police officer's power to investigate cognizable case",
        "Investigation Procedure",
        "Addresses police powers to investigate cognizable cases and related "
        "procedural requirements. The authority to investigate and any "
        "applicable judicial directions or safeguards should be checked.",
        ["police investigation", "cognizable offence", "investigation"],
        ["BNSS Section 173", "BNSS Section 176"],
    ),
    make_chunk(
        "bnss-176-investigation-procedure", "BNSS", "Section 176",
        "Procedure for investigation",
        "Investigation Procedure",
        "Sets out procedural steps for investigating a suspected offence. "
        "Depending on the case and applicable statutory requirements, this "
        "may include reporting to a Magistrate, proceeding to the scene, "
        "examining facts, and collecting relevant evidence.",
        ["crime scene", "investigation", "evidence collection"],
        ["BNSS Section 175", "BNSS Section 193"],
    ),
    make_chunk(
        "bnss-183-magistrate-statements", "BNSS", "Section 183",
        "Recording of confessions and statements",
        "Statements and Confessions",
        "Addresses the recording of specified confessions and statements "
        "by a Magistrate. The circumstances of recording, voluntariness, "
        "safeguards, and the applicable statutory procedure are important.",
        ["confession", "witness statement", "Magistrate"],
        ["BNSS Section 180"],
    ),
    make_chunk(
        "bnss-187-investigation-remand", "BNSS", "Section 187",
        "Procedure when investigation cannot be completed in twenty-four hours",
        "Investigation Procedure",
        "Addresses the procedure when an investigation cannot be completed "
        "within the prescribed initial period and the statutory conditions "
        "for forwarding the accused and seeking further detention arise. "
        "Time limits and safeguards must be checked against the Act.",
        ["remand", "custody", "investigation deadline", "Magistrate"],
        ["BNSS Section 175", "BNSS Section 193"],
    ),
    make_chunk(
        "bnss-193-final-police-report", "BNSS", "Section 193",
        "Report of police officer on completion of investigation",
        "Investigation Procedure",
        "Addresses the police report following completion of investigation. "
        "Relevant materials may include the investigation findings, witness "
        "information, medical or forensic reports, and other particulars "
        "required by the provision.",
        ["final report", "charge sheet", "investigation", "forensic report"],
        ["BNSS Section 176", "BNSS Section 187"],
    ),
]


LEGAL_CORPUS_CHUNKS.extend(ADDITIONAL_LEGAL_CHUNKS)

print("Total legal chunks:", len(LEGAL_CORPUS_CHUNKS))
print(
    "Unique IDs:",
    len({chunk["id"] for chunk in LEGAL_CORPUS_CHUNKS})
)

assert len(LEGAL_CORPUS_CHUNKS) == 35
assert len({chunk["id"] for chunk in LEGAL_CORPUS_CHUNKS}) == 35