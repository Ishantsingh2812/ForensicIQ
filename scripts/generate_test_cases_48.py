#!/usr/bin/env python3
"""
scripts/generate_test_cases_48.py
Generates the authoritative 48 test cases fixture dataset for ForensicIQ.
Copies to Python, Spring Boot, and Frontend test fixture directories.
"""

import json
import os
import shutil

TEST_CASES_48 = [
    # ---------------- Category 1: Bodily Offences & Hurt ----------------
    {
        "id": "TC-01",
        "category": "BODILY_OFFENCE",
        "name": "Public slap on train without injury (conversational brevity)",
        "incident_description": "Someone slapped me on a train.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["131", "352"],
            "expected_category": "Assault & Bodily Harm",
            "severity": "LOW",
            "confidence_max": 0.70,
            "confidence_triggers_uncertainty": True,
            "must_not_contain_sections": ["103", "309"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": True,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-02",
        "category": "BODILY_OFFENCE",
        "name": "Voluntary hurt with facial swelling and bruising",
        "incident_description": "A man punched me in the jaw causing visible swelling and bruising.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["115(2)", "323"],
            "expected_category": "Assault & Bodily Harm",
            "severity": "LOW",
            "confidence_max": 0.90,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-03",
        "category": "BODILY_OFFENCE",
        "name": "Assault with iron rod causing compound bone fracture",
        "incident_description": "The attacker struck the victim on the arm with an iron rod, causing a compound bone fracture.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["118(1)", "324", "326"],
            "expected_category": "Assault & Dangerous Weapon Battery",
            "severity": "HIGH",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["309"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-04",
        "category": "BODILY_OFFENCE",
        "name": "Acid attack causing severe chemical disfigurement",
        "incident_description": "An assailant threw battery acid on the woman's face causing severe permanent chemical burns.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["124(1)", "326A"],
            "expected_category": "Grievous Hurt by Acid / Chemical Substance",
            "severity": "CRITICAL",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["304"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-05",
        "category": "BODILY_OFFENCE",
        "name": "Public market brawl disrupting public peace (Affray)",
        "incident_description": "Two rival street vendors engaged in a violent fistfight in the crowded weekly bazaar disturbing public peace.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["194", "159", "160"],
            "expected_category": "Affray & Public Tranquility",
            "severity": "LOW",
            "confidence_max": 0.90,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-06",
        "category": "BODILY_OFFENCE",
        "name": "Deterring public servant by assault",
        "incident_description": "A motorist physically pushed a traffic police officer while preventing issuance of a lawful challan.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["121(1)", "332", "353"],
            "expected_category": "Assault on Public Servant",
            "severity": "MEDIUM",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["309"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },

    # ---------------- Category 2: Homicide & Fatal Violence ----------------
    {
        "id": "TC-07",
        "category": "HOMICIDE",
        "name": "Point-blank intentional shooting causing immediate death",
        "incident_description": "Accused fired two fatal bullets into the victim's chest at point-blank range, killing him instantly.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["103(1)", "101", "302"],
            "expected_category": "Homicide & Murder",
            "severity": "CRITICAL",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["379"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-08",
        "category": "HOMICIDE",
        "name": "Attempted murder with razor slash to neck",
        "incident_description": "Attacker slashed the victim's throat with a surgical razor; victim survived due to emergency ICU surgery.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["109", "307"],
            "expected_category": "Attempt to Murder",
            "severity": "CRITICAL",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-09",
        "category": "HOMICIDE",
        "name": "Culpable homicide not amounting to murder in sudden quarrel",
        "incident_description": "A sudden heated argument over parking escalated into a mutual scuffle where victim fell onto a sharp iron curb and died without prior enmity.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["105", "304"],
            "expected_category": "Culpable Homicide Not Amounting to Murder",
            "severity": "HIGH",
            "confidence_max": 0.90,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["303"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-10",
        "category": "HOMICIDE",
        "name": "Speeding vehicle pedestrian collision (Rash Driving Causing Death)",
        "incident_description": "A speeding SUV skipped a red traffic light and crushed a pedestrian crossing the road.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["106(1)", "281", "304A"],
            "expected_category": "Causing Death by Negligence",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-11",
        "category": "HOMICIDE",
        "name": "Dowry death within seven years of marriage",
        "incident_description": "Woman died of burn injuries in marital home 2 years after marriage following relentless demands for a car.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["80", "85", "304B", "498A"],
            "expected_category": "Dowry Death & Domestic Cruelty",
            "severity": "CRITICAL",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["379"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-12",
        "category": "HOMICIDE",
        "name": "Abetment of suicide with suicide note",
        "incident_description": "Victim hung himself leaving a handwritten note detailing persistent mental harassment and blackmail by supervisor.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["108", "306"],
            "expected_category": "Abetment of Suicide",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["309"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },

    # ---------------- Category 3: Property Offences & Robbery ----------------
    {
        "id": "TC-13",
        "category": "PROPERTY_OFFENCE",
        "name": "Motorcycle chain snatching on public street",
        "incident_description": "Two men on a motorcycle suddenly grabbed a gold chain from a woman walking on the street and fled.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["304", "379"],
            "expected_category": "Snatching & Street Theft",
            "severity": "MEDIUM",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-14",
        "category": "PROPERTY_OFFENCE",
        "name": "Nocturnal shop burglary with broken window glass",
        "incident_description": "A thief broke my shop window at night, shattered the glass, and stole 50,000 rupees worth of goods.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["331", "303(2)", "324", "457"],
            "expected_category": "House-Breaking & Property Theft",
            "severity": "HIGH",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-15",
        "category": "PROPERTY_OFFENCE",
        "name": "Armed robbery at gunpoint in store (7-year mandatory minimum)",
        "incident_description": "Three masked men held a cashier at gunpoint with a country-made pistol and took the cash register.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["309", "311", "392", "397"],
            "expected_category": "Armed Robbery",
            "severity": "HIGH",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-16",
        "category": "PROPERTY_OFFENCE",
        "name": "Dacoity by armed gang of six perpetrators",
        "incident_description": "A gang of six armed robbers broke into a farmhouse, held the family hostage with axes and looted jewelry.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["310", "312", "395", "396"],
            "expected_category": "Dacoity with Deadly Weapons",
            "severity": "CRITICAL",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["304"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-17",
        "category": "PROPERTY_OFFENCE",
        "name": "Dishonest misappropriation of lost property found on street",
        "incident_description": "A person found an expensive lost diamond necklace on the airport floor and appropriated it to his own pocket without reporting.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["314", "403"],
            "expected_category": "Dishonest Misappropriation of Property",
            "severity": "LOW",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["309"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },
    {
        "id": "TC-18",
        "category": "PROPERTY_OFFENCE",
        "name": "Criminal breach of trust by employee with client escrow funds",
        "incident_description": "A company accountant diverted 10 lakh rupees from client escrow accounts into his personal crypto wallet.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["316", "408"],
            "expected_category": "Criminal Breach of Trust",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/2263"
            ]
        }
    },

    # ---------------- Category 4: Cybercrime & Privacy ----------------
    {
        "id": "TC-19",
        "category": "CYBER_PRIVACY",
        "name": "Unauthorized photo capture and social media posting without consent",
        "incident_description": "someone click my personal photo without my permission and he posted it in social media.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["77", "66E", "356", "354C"],
            "expected_category": "Cyber Privacy & Voyeurism",
            "severity": "HIGH",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["309", "103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": True,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/1999"
            ]
        }
    },
    {
        "id": "TC-20",
        "category": "CYBER_PRIVACY",
        "name": "Banking OTP phishing fraud and digital account theft",
        "incident_description": "A scammer called claiming to be an SBI manager, obtained my OTP, and siphoned 80,000 rupees from my bank account.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "IT_ACT",
            "expected_sections": ["66D", "318(4)", "420"],
            "expected_category": "Cyber & Digital Offences",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/1999",
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },
    {
        "id": "TC-21",
        "category": "CYBER_PRIVACY",
        "name": "Persistent online cyber stalking via social handles",
        "incident_description": "Perpetrator created multiple fake Instagram accounts to send continuous sexually explicit and threatening messages after being blocked.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["78", "67", "354D"],
            "expected_category": "Cyber Stalking & Electronic Harassment",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["309"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": True,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/1999"
            ]
        }
    },
    {
        "id": "TC-22",
        "category": "CYBER_PRIVACY",
        "name": "Hospital critical infrastructure ransomware attack",
        "incident_description": "Hackers infected the hospital oncology server with ransomware, demanding 5 Bitcoin to decrypt critical patient files.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "IT_ACT",
            "expected_sections": ["66F", "66", "324"],
            "expected_category": "Cyber Terrorism & Data Extortion",
            "severity": "CRITICAL",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/1999",
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },
    {
        "id": "TC-23",
        "category": "CYBER_PRIVACY",
        "name": "Identity theft through forged KYC Aadhaar credentials",
        "incident_description": "Fraudster forged my Aadhaar card to obtain a duplicate SIM card and drained my mutual funds.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "IT_ACT",
            "expected_sections": ["66C", "319", "336", "468"],
            "expected_category": "Identity Theft & Digital Forgery",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/1999",
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },
    {
        "id": "TC-24",
        "category": "CYBER_PRIVACY",
        "name": "Deepfake synthetic media blackmail and extortion",
        "incident_description": "A blackmailer generated a deepfake sexually explicit video of a student and demanded 2 lakh rupees or threatened to post it on college groups.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["308", "77", "66E", "384"],
            "expected_category": "Deepfake Extortion & Cyber Defamation",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": True,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062",
                "https://www.indiacode.nic.in/handle/123456789/1999"
            ]
        }
    },

    # ---------------- Category 5: Special Statutes & Forensics ----------------
    {
        "id": "TC-25",
        "category": "SPECIAL_STATUTES",
        "name": "Commercial narcotics trafficking (25 kg cannabis with statutory bail bar)",
        "incident_description": "Customs intercepted a truck carrying 25 kg of commercial cannabis ganja and packaged drugs.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "NDPS_ACT",
            "expected_sections": ["20(b)(ii)(C)", "37"],
            "expected_category": "NDPS Narcotics Offence",
            "severity": "CRITICAL",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/1791"
            ]
        }
    },
    {
        "id": "TC-26",
        "category": "SPECIAL_STATUTES",
        "name": "Small quantity narcotics personal consumption",
        "incident_description": "Police intercepted a youth carrying 5 grams of cannabis for personal consumption.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "NDPS_ACT",
            "expected_sections": ["27", "64A"],
            "expected_category": "NDPS Personal Consumption & Diversion",
            "severity": "LOW",
            "confidence_max": 0.90,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["37"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/1791"
            ]
        }
    },
    {
        "id": "TC-27",
        "category": "SPECIAL_STATUTES",
        "name": "Unlicensed country-made firearm possession (Desi Katta)",
        "incident_description": "Police recovered an unauthorized country-made firearm (desi katta) and live cartridges from suspect's waistband during checking.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "ARMS_ACT",
            "expected_sections": ["25", "3"],
            "expected_category": "Arms Act Firearm Offence",
            "severity": "HIGH",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/1458"
            ]
        }
    },
    {
        "id": "TC-28",
        "category": "SPECIAL_STATUTES",
        "name": "Child sexual assault triggering mandatory POCSO reporting",
        "incident_description": "An adult neighbor inappropriately touched a 10-year-old child in the building stairwell.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "POCSO_ACT",
            "expected_sections": ["7", "8", "74", "354"],
            "expected_category": "Child Protection & POCSO Offence",
            "severity": "CRITICAL",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["379"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/2085",
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },
    {
        "id": "TC-29",
        "category": "SPECIAL_STATUTES",
        "name": "Digital CCTV electronic evidence admissibility under BSA Section 63",
        "incident_description": "Two men stole a laptop from an office, recorded on CCTV cameras.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BSA",
            "expected_sections": ["63", "65B"],
            "expected_category": "Electronic Admissibility & Evidence Preservation",
            "severity": "MEDIUM",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20063"
            ]
        }
    },
    {
        "id": "TC-30",
        "category": "SPECIAL_STATUTES",
        "name": "Forensic ballistics and Gunshot Residue (GSR) evidence chain",
        "incident_description": "Gunfire exchange left cartridge casings and gunshot residue on the suspect's hands.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BSA",
            "expected_sections": ["63", "45"],
            "expected_category": "Forensic Ballistics & Chemical Trace",
            "severity": "CRITICAL",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["131"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20063"
            ]
        }
    },

    # ---------------- Category 6: Boundaries, Decoupling & Negative Cases ----------------
    {
        "id": "TC-31",
        "category": "UNCERTAINTY_DECOUPLING",
        "name": "Brief vague query triggering uncertainty handling (<0.70)",
        "incident_description": "someone hit me",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["131", "115(2)"],
            "expected_category": "Assault & Bodily Harm",
            "severity": "LOW",
            "confidence_max": 0.70,
            "confidence_triggers_uncertainty": True,
            "must_not_contain_sections": ["103", "309"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": True,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },
    {
        "id": "TC-32",
        "category": "UNCERTAINTY_DECOUPLING",
        "name": "Emergency brief high-stakes query (Confidence <0.70, Severity CRITICAL)",
        "incident_description": "help they have guns outside my door",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["351", "309"],
            "expected_category": "Armed Threat & Criminal Intimidation",
            "severity": "CRITICAL",
            "confidence_max": 0.70,
            "confidence_triggers_uncertainty": True,
            "must_not_contain_sections": ["303"],
            "urgent_safety_guidance": True,
            "clarifying_questions_required": True,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },
    {
        "id": "TC-33",
        "category": "UNCERTAINTY_DECOUPLING",
        "name": "Misspelled conversational incident with typos",
        "incident_description": "a theif slaped me and stealed my phone in train",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["304", "131"],
            "expected_category": "Snatching & Street Theft",
            "severity": "MEDIUM",
            "confidence_max": 0.90,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },
    {
        "id": "TC-34",
        "category": "UNCERTAINTY_DECOUPLING",
        "name": "Negative civil dispute - Home painting schedule delay",
        "incident_description": "My contractor delayed painting my bedroom walls by two days.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "CONTRACT_ACT",
            "expected_sections": ["Advisory"],
            "expected_category": "Civil Breach & Non-Penal Dispute",
            "severity": "LOW",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["103", "309", "118"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/2187"
            ]
        }
    },
    {
        "id": "TC-35",
        "category": "UNCERTAINTY_DECOUPLING",
        "name": "Negative civil dispute - Commercial tenant rent delay",
        "incident_description": "Tenant is two weeks late on commercial office lease rent.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "CONTRACT_ACT",
            "expected_sections": ["Advisory"],
            "expected_category": "Civil Breach & Non-Penal Dispute",
            "severity": "LOW",
            "confidence_max": 1.0,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["303", "309", "103"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/2187"
            ]
        }
    },
    {
        "id": "TC-36",
        "category": "UNCERTAINTY_DECOUPLING",
        "name": "Workplace email defamation without violence",
        "incident_description": "Colleague circulated an untrue rumor via email alleging embezzlement without any physical confrontation.",
        "expected_behavior": {
            "framework": "BOTH",
            "primary_act": "BNS",
            "expected_sections": ["356", "500"],
            "expected_category": "Defamation & Reputation Damage",
            "severity": "LOW",
            "confidence_max": 0.95,
            "confidence_triggers_uncertainty": False,
            "must_not_contain_sections": ["115", "131"],
            "urgent_safety_guidance": False,
            "clarifying_questions_required": False,
            "official_sources": [
                "https://www.indiacode.nic.in/handle/123456789/20062"
            ]
        }
    },

    # ---------------- Category 7: Spring Boot API & Auth ----------------
    {
        "id": "TC-37",
        "category": "BACKEND_SPRING_BOOT",
        "name": "Valid scenario analysis returns HTTP 200 with structured analysis",
        "incident_description": "Two men on a motorcycle snatched a handbag from a lady in the evening.",
        "expected_behavior": {
            "endpoint": "/api/cases/analyze",
            "method": "POST",
            "auth_required": True,
            "role": "STUDENT",
            "expected_http_status": 200,
            "response_contract_fields": ["caseId", "sections", "forensicEvidence", "jurisdiction", "severityAssessment", "predictionConfidence"]
        }
    },
    {
        "id": "TC-38",
        "category": "BACKEND_SPRING_BOOT",
        "name": "Validation rejection for blank scenario returns HTTP 400",
        "incident_description": "   ",
        "expected_behavior": {
            "endpoint": "/api/cases/analyze",
            "method": "POST",
            "auth_required": True,
            "role": "STUDENT",
            "expected_http_status": 400,
            "error_response_contains": "Scenario description cannot be blank"
        }
    },
    {
        "id": "TC-39",
        "category": "BACKEND_SPRING_BOOT",
        "name": "Unauthenticated access without JWT token returns HTTP 401/403",
        "incident_description": "Unauthorized access test",
        "expected_behavior": {
            "endpoint": "/api/cases",
            "method": "GET",
            "auth_required": False,
            "expected_http_status": 403
        }
    },
    {
        "id": "TC-40",
        "category": "BACKEND_SPRING_BOOT",
        "name": "RBAC role restriction: student blocked from admin audit logs (403)",
        "incident_description": "RBAC restriction test",
        "expected_behavior": {
            "endpoint": "/api/admin/audit-logs",
            "method": "GET",
            "auth_required": True,
            "role": "STUDENT",
            "expected_http_status": 403
        }
    },
    {
        "id": "TC-41",
        "category": "BACKEND_SPRING_BOOT",
        "name": "Evidence photo upload with valid JPEG returns HTTP 200/201",
        "incident_description": "Valid JPEG evidence upload",
        "expected_behavior": {
            "endpoint": "/api/evidence/photos/upload",
            "method": "POST",
            "content_type": "image/jpeg",
            "expected_http_status": 200
        }
    },
    {
        "id": "TC-42",
        "category": "BACKEND_SPRING_BOOT",
        "name": "Evidence photo upload with executable .exe rejected (HTTP 400)",
        "incident_description": "Invalid executable evidence upload",
        "expected_behavior": {
            "endpoint": "/api/evidence/photos/upload",
            "method": "POST",
            "content_type": "application/x-msdownload",
            "expected_http_status": 400,
            "error_response_contains": "Invalid file type"
        }
    },

    # ---------------- Category 8: Frontend UI & Evidence Canvas ----------------
    {
        "id": "TC-43",
        "category": "FRONTEND_UI",
        "name": "Scenario form renders input and triggers submission",
        "incident_description": "Frontend scenario form input interaction",
        "expected_behavior": {
            "component": "ScenarioForm",
            "action": "type_and_submit",
            "expected_element": "Analyze Scenario",
            "status": "PASS"
        }
    },
    {
        "id": "TC-44",
        "category": "FRONTEND_UI",
        "name": "Legal source link renders with target=_blank and rel=noopener",
        "incident_description": "Legal reference external security verification",
        "expected_behavior": {
            "component": "SectionCard",
            "expected_attr_target": "_blank",
            "expected_attr_rel": "noopener noreferrer",
            "source_domain": "indiacode.nic.in",
            "status": "PASS"
        }
    },
    {
        "id": "TC-45",
        "category": "FRONTEND_UI",
        "name": "Confidence <70% renders uncertainty warning and clarifying questions",
        "incident_description": "Uncertainty warning visual rendering",
        "expected_behavior": {
            "component": "UncertaintyBanner",
            "confidence_threshold": 0.70,
            "expected_banner_text": "Low Confidence Analysis",
            "status": "PASS"
        }
    },
    {
        "id": "TC-46",
        "category": "FRONTEND_UI",
        "name": "Crime scene image renders clickable evidence markers at normalized coordinates",
        "incident_description": "Crime scene annotation coordinate placement",
        "expected_behavior": {
            "component": "CrimeSceneCanvas",
            "marker_coordinates": {"x": 35.5, "y": 62.0},
            "status": "PASS"
        }
    },
    {
        "id": "TC-47",
        "category": "FRONTEND_UI",
        "name": "Annotation marker selection opens inspector drawer",
        "incident_description": "Interactive marker editing test",
        "expected_behavior": {
            "component": "EvidenceInspector",
            "action": "click_marker",
            "expected_drawer_open": True,
            "status": "PASS"
        }
    },
    {
        "id": "TC-48",
        "category": "FRONTEND_UI",
        "name": "Evidence annotations persist in local storage across sessions",
        "incident_description": "Annotation storage persistence verification",
        "expected_behavior": {
            "storage_key": "forensicai_annotations_",
            "persistence_type": "localStorage",
            "status": "PASS"
        }
    }
]

def main():
    print(f"Generating 48 test cases fixture dataset...")
    assert len(TEST_CASES_48) == 48, f"Expected exactly 48 test cases, found {len(TEST_CASES_48)}"

    dest_paths = [
        "tests/fixtures/test_cases_48.json",
        "ai-service/tests/fixtures/test_cases_48.json",
        "backend/src/test/resources/fixtures/test_cases_48.json",
        "frontend/src/tests/fixtures/test_cases_48.json"
    ]

    for p in dest_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(TEST_CASES_48, f, indent=2)
        print(f"Successfully saved: {p}")

if __name__ == "__main__":
    main()
