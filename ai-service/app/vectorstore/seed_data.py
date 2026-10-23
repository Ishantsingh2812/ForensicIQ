from typing import List, Dict, Any

LEGAL_CORPUS_CHUNKS: List[Dict[str, Any]] = [
    {
        "id": "bns-309-aggravated",
        "act": "BNS",
        "section": "Section 309(4)",
        "title": "Robbery with attempt to cause death or grievous hurt",
        "category": "Robbery",
        "text": "Whoever commits robbery, and if at the time of committing robbery uses any deadly weapon, or causes grievous hurt to any person, or attempts to cause death or grievous hurt to any person, the imprisonment with which such offender shall be punished shall not be less than seven years.",
        "ipcEquivalent": "IPC Section 397",
        "bailable": False,
        "cognizable": True,
        "triableBy": "Court of Session"
    },
    {
        "id": "ipc-397-landmark",
        "act": "IPC",
        "section": "Section 397",
        "title": "Robbery or dacoity, with attempt to cause death or grievous hurt",
        "category": "Robbery",
        "text": "If, at the time of committing robbery or dacoity, the offender uses any deadly weapon, or causes grievous hurt to any person, or attempts to cause death or grievous hurt to any person, the imprisonment with which such offender shall be punished shall not be less than seven years.",
        "precedent": "Phool Kumar v. Delhi Administration (AIR 1975 SC 905): The word 'uses' in Section 397 is wide enough to include brandishing a weapon to instill terror without discharging it.",
        "bailable": False,
        "cognizable": True,
        "triableBy": "Court of Session"
    },
    {
        "id": "bns-115-grievous-hurt",
        "act": "BNS",
        "section": "Section 115(2)",
        "title": "Voluntarily causing hurt or grievous hurt by dangerous weapons or means",
        "category": "Grievous Hurt",
        "text": "Whoever voluntarily causes grievous hurt by means of any instrument for shooting, stabbing or cutting, or any instrument which used as a weapon of offence is likely to cause death, shall be punished with imprisonment for life or imprisonment up to ten years, and fine.",
        "ipcEquivalent": "IPC Section 326",
        "bailable": False,
        "cognizable": True,
        "triableBy": "Court of Session"
    },
    {
        "id": "bns-101-murder",
        "act": "BNS",
        "section": "Section 101(1)",
        "title": "Punishment for Murder",
        "category": "Murder",
        "text": "Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. Corresponds to legacy Section 302 IPC.",
        "ipcEquivalent": "IPC Section 302",
        "bailable": False,
        "cognizable": True,
        "triableBy": "Court of Session"
    },
    {
        "id": "bsa-63-electronic",
        "act": "BSA",
        "section": "Section 63",
        "title": "Admissibility of electronic records",
        "category": "Evidence",
        "text": "Any information contained in an electronic record which is printed on a paper, stored, recorded or copied in optical or magnetic media produced by a computer shall be deemed to be also a document... accompanied by a certificate signed by a person occupying a responsible official position in relation to the operation of the device.",
        "ipcEquivalent": "IEA Section 65B",
        "bailable": True,
        "cognizable": True,
        "triableBy": "All Courts"
    },
    {
        "id": "bnss-173-fir",
        "act": "BNSS",
        "section": "Section 173",
        "title": "Information in cognizable cases (First Information Report)",
        "category": "Procedure",
        "text": "Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him or under his direction... and preliminary enquiry may be conducted within fourteen days in offences punishable between 3 and 7 years.",
        "ipcEquivalent": "CrPC Section 154",
        "bailable": True,
        "cognizable": True,
        "triableBy": "Police Authority"
    }
]
