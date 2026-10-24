"""
ai-service/tests/test_scenarios.py - Automated 10-Scenario Test Suite for ForensicIQ
Verifies source-grounded legal mappings, subtle offense thresholds, decoupled confidence/severity,
70% confidence threshold rule, clarifying questions, and negative/civil tests.
"""

import sys
import os
import pytest
import asyncio

# Ensure app is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.graph.pipeline import pipeline

@pytest.mark.asyncio
async def test_scenario_1_minor_slap_on_train():
    """Scenario 1: Minor physical assault / slap on train (subtle threshold & tentative rule)."""
    scenario = "Someone slapped me on a train"
    res = await pipeline.execute(scenario, framework="BOTH")

    # Decoupled confidence: short vague text must have confidence < 0.70
    assert res.prediction_confidence < 0.70, f"Expected confidence < 0.70, got {res.prediction_confidence}"
    assert res.is_tentative is True, "Expected tentative analysis flag to be True"
    assert res.severity_assessment == "LOW"
    assert len(res.clarifying_questions) >= 2, "Expected targeted clarifying questions"
    assert len(res.missing_facts) >= 2, "Expected critical missing facts listed"

    # Mapped sections must distinguish assault / hurt, not collapse into robbery or grievous hurt
    section_numbers = [s.section for s in res.sections]
    assert any("131" in sec for sec in section_numbers), f"Expected BNS Sec 131, got {section_numbers}"
    assert any("352" in sec for sec in section_numbers), f"Expected IPC Sec 352, got {section_numbers}"

@pytest.mark.asyncio
async def test_scenario_2_armed_robbery_deadly_weapon():
    """Scenario 2: Armed street robbery with firearm (Phool Kumar doctrine)."""
    scenario = "Two men on a motorcycle pointed a pistol at my chest and demanded all my cash and mobile phone."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.prediction_confidence >= 0.85
    assert res.severity_assessment in ["HIGH", "CRITICAL"]
    assert res.is_tentative is False

    section_numbers = [s.section for s in res.sections]
    assert any("309" in sec for sec in section_numbers), f"Expected BNS Sec 309 Robbery, got {section_numbers}"
    assert any("392" in sec for sec in section_numbers), f"Expected IPC Sec 392 Robbery, got {section_numbers}"
    assert any("311" in sec for sec in section_numbers), f"Expected BNS Sec 311 (Deadly weapon), got {section_numbers}"

    # Verify Ballistics & FSL evidence recommendations
    assert any("cartridge" in ev.item.lower() or "casing" in ev.item.lower() or "ballistic" in ev.item.lower() for ev in res.forensicEvidence)

@pytest.mark.asyncio
async def test_scenario_3_motorcycle_snatching():
    """Scenario 3: Snatching on motorcycle (BNS Section 304 specific new statutory section)."""
    scenario = "A person on a speeding motorcycle snatched my gold chain from my neck and fled."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.prediction_confidence >= 0.85
    section_numbers = [s.section for s in res.sections]
    assert any("304" in sec for sec in section_numbers), f"Expected new BNS Sec 304 Snatching, got {section_numbers}"
    assert any("379" in sec for sec in section_numbers), f"Expected historical IPC Sec 379 Theft, got {section_numbers}"

@pytest.mark.asyncio
async def test_scenario_4_shop_break_in_nocturnal_theft():
    """Scenario 4: House-breaking by night and broken shop window theft."""
    scenario = "A thief broke my shop window at night, shattered the glass, and stole 50,000 rupees worth of goods."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.prediction_confidence >= 0.85
    assert res.severity_assessment == "HIGH"

    section_numbers = [s.section for s in res.sections]
    assert any("331" in sec for sec in section_numbers), f"Expected BNS Sec 331 House-breaking, got {section_numbers}"
    assert any("303" in sec for sec in section_numbers), f"Expected BNS Sec 303 Theft, got {section_numbers}"
    assert any("324" in sec for sec in section_numbers), f"Expected BNS Sec 324 Mischief, got {section_numbers}"

@pytest.mark.asyncio
async def test_scenario_5_grievous_hurt_with_weapon():
    """Scenario 5: Voluntarily causing grievous hurt with weapon / fracture."""
    scenario = "The attacker struck the victim on the arm with an iron rod, causing a compound bone fracture and severe bleeding."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.prediction_confidence >= 0.85
    assert res.severity_assessment == "HIGH"

    section_numbers = [s.section for s in res.sections]
    assert any("118" in sec for sec in section_numbers or "117" in sec for sec in section_numbers), f"Expected BNS Sec 118/117, got {section_numbers}"
    assert any("326" in sec for sec in section_numbers), f"Expected IPC Sec 326 Grievous hurt, got {section_numbers}"

@pytest.mark.asyncio
async def test_scenario_6_ndps_commercial_narcotics():
    """Scenario 6: Commercial quantity narcotics seizure."""
    scenario = "Customs intercepted a truck carrying 25 kg of commercial cannabis ganja and packaged drugs."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.severity_assessment == "CRITICAL"
    section_numbers = [s.section for s in res.sections]
    acts = [s.act for s in res.sections]
    assert "NDPS_ACT" in acts, f"Expected NDPS Act classification, got {acts}"
    assert any("20" in sec for sec in section_numbers), f"Expected NDPS Section 20, got {section_numbers}"
    assert any("37" in sec for sec in section_numbers), f"Expected NDPS Section 37 Bail restriction, got {section_numbers}"

@pytest.mark.asyncio
async def test_scenario_7_cyber_phishing_scam():
    """Scenario 7: Cyber impersonation and financial fraud."""
    scenario = "An online caller impersonated a bank manager, obtained my OTP and password, and transferred 2 lakh rupees from my bank account."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.offense_classification_details.threat_medium == "Digital / Telephonic electronic channel"
    assert any("cctv" in ev.item.lower() or "cdr" in ev.item.lower() or "digital" in ev.category.lower() for ev in res.forensicEvidence)

@pytest.mark.asyncio
async def test_scenario_8_misspelled_conversational_input():
    """Scenario 8: Misspelled and informal user input handling."""
    scenario = "Someone slaped me and stealed my wndow shop items"
    res = await pipeline.execute(scenario, framework="BOTH")

    # System must process without crashing and categorize actions
    assert res.caseId.startswith("CASE-BNS-")
    assert res.prediction_confidence > 0.50
    assert len(res.sections) > 0

@pytest.mark.asyncio
async def test_scenario_9_section_63_bsa_electronic_admissibility():
    """Scenario 9: Evidence items must include Section 63 BSA certificate guidance."""
    scenario = "Two men stole a laptop from an office, recorded on CCTV cameras."
    res = await pipeline.execute(scenario, framework="BOTH")

    # Check that forensic evidence includes CCTV with Section 63 BSA compliance
    digital_evidence = [ev for ev in res.forensicEvidence if ev.category == "digital"]
    assert len(digital_evidence) > 0, "Expected digital forensic evidence"
    assert any("63" in ev.notes or "bsa" in ev.notes.lower() for ev in digital_evidence), "Expected Section 63 BSA note"

@pytest.mark.asyncio
async def test_scenario_10_negative_civil_dispute():
    """Scenario 10: Civil breach / non-criminal dispute."""
    scenario = "My contractor delayed painting my bedroom walls by two days."
    res = await pipeline.execute(scenario, framework="BOTH")

    # Must NOT classify as robbery, murder, or grievous hurt!
    section_titles = [s.title.lower() for s in res.sections]
    assert not any("robbery" in t for t in section_titles), "Civil contract delay must not trigger robbery"
    assert not any("murder" in t for t in section_titles), "Civil contract delay must not trigger murder"
    assert res.severity_assessment == "LOW"

@pytest.mark.asyncio
async def test_scenario_11_public_slap_and_iron_rod_battery():
    """Scenario 11: Public slap combined with iron rod beating (Weapon battery under BNS 118 & 131)."""
    scenario = "some one slapped me in public. and beat me with iron rod."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.offense_classification_details.weapon_used == "Iron rod"
    assert res.severity_assessment == "HIGH"

    section_numbers = [s.section for s in res.sections]
    assert any("118" in sec for sec in section_numbers), f"Expected BNS Sec 118(1) Dangerous weapon hurt, got {section_numbers}"
    assert any("131" in sec for sec in section_numbers), f"Expected BNS Sec 131 Assault, got {section_numbers}"
    assert any("324" in sec for sec in section_numbers), f"Expected IPC Sec 324 Weapon hurt, got {section_numbers}"

    # Must NOT be misclassified as Robbery or Murder
    section_titles = [s.title.lower() for s in res.sections]
    assert not any("robbery" in t for t in section_titles), "Iron rod assault must not be classified as robbery"
    assert not any("murder" in t for t in section_titles), "Iron rod assault must not be classified as murder"

@pytest.mark.asyncio
async def test_scenario_12_photo_privacy_violation_social_media():
    """Scenario 12: Unauthorized capture and posting of personal photo on social media without consent."""
    scenario = "someone click my personal photo without my permission and he posted it in social media."
    res = await pipeline.execute(scenario, framework="BOTH")

    assert res.offense_classification_details.offense_category == "Cyber Privacy & Voyeurism"
    assert res.severity_assessment == "HIGH"

    section_numbers = [s.section for s in res.sections]
    acts = [s.act for s in res.sections]

    assert any("77" in sec for sec in section_numbers), f"Expected BNS Sec 77 Voyeurism, got {section_numbers}"
    assert "IT_ACT" in acts, f"Expected IT Act violation, got {acts}"
    assert any("66E" in sec for sec in section_numbers), f"Expected IT Act 66E Privacy violation, got {section_numbers}"
    assert any("356" in sec for sec in section_numbers), f"Expected BNS Sec 356 Defamation, got {section_numbers}"

    # Verify no bogus assault or physical force sections as primary
    assert not any("309" in sec for sec in section_numbers), "Photo privacy violation must not be classified as robbery"
    assert not any("103" in sec for sec in section_numbers), "Photo privacy violation must not be classified as murder"

