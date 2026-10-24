"""
ai-service/tests/test_48_test_cases.py
Automated evaluation test suite verifying the 36 legal incident test cases (TC-01 to TC-36)
from the authoritative 48-case fixture dataset.

Requirements covered:
- Requirement 1: Structured test fixtures
- Requirement 2: Incident parsing, confidence thresholds, severity separation, legal retrieval
- Requirement 6: Source-grounded legal outputs verified against authoritative dataset
- Requirement 7: Confidence < 70% triggers uncertainty handling without marking incident harmless
- Requirement 8: Low confidence never suppresses urgent safety guidance for severe incidents
- Requirement 9: Official India Code source URLs verified
"""

import json
import os
import pytest
from app.graph.pipeline import pipeline

FIXTURE_PATH = os.path.join(os.path.dirname(__file__), "fixtures", "test_cases_48.json")

def load_incident_cases():
    with open(FIXTURE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    # Return cases TC-01 through TC-36 (the incident analysis cases)
    return [c for c in data if c["id"].startswith("TC-") and int(c["id"].split("-")[1]) <= 36]

INCIDENT_CASES = load_incident_cases()

@pytest.mark.asyncio
@pytest.mark.parametrize("case", INCIDENT_CASES, ids=[f"{c['id']}_{c['name'][:30]}" for c in INCIDENT_CASES])
async def test_legal_incident_case(case):
    """Executes the legal pipeline for each incident case and asserts against authoritative expectations."""
    scenario = case["incident_description"]
    exp = case["expected_behavior"]
    framework = exp.get("framework", "BOTH")

    res = await pipeline.execute(scenario, framework=framework)

    # 1. Assert Offense Classification & Category
    assert res.offense_classification_details is not None
    assert res.offense_classification_details.action is not None

    # 2. Assert Severity Assessment
    assert res.severity_assessment == exp["severity"], (
        f"[{case['id']}] Expected severity {exp['severity']}, got {res.severity_assessment}"
    )

    # 3. Assert Expected Sections Present
    section_numbers = [s.section for s in res.sections]
    for expected_sec in exp.get("expected_sections", []):
        assert any(expected_sec.lower() in s.lower() for s in section_numbers), (
            f"[{case['id']}] Expected section {expected_sec} not found in {section_numbers}"
        )

    # 4. Assert Prohibited Sections Absent (Negative Testing)
    for prohibited_sec in exp.get("must_not_contain_sections", []):
        assert not any(prohibited_sec.lower() in s.lower() for s in section_numbers), (
            f"[{case['id']}] Prohibited section {prohibited_sec} was wrongfully present in {section_numbers}"
        )

    # 5. Assert Confidence Thresholds & Uncertainty (Requirement 7)
    if exp.get("confidence_triggers_uncertainty"):
        assert res.prediction_confidence <= 0.70, (
            f"[{case['id']}] Expected confidence <= 0.70 for brief/vague incident, got {res.prediction_confidence}"
        )
        assert len(res.clarifying_questions) > 0 or len(res.missing_facts) > 0, (
            f"[{case['id']}] Expected clarifying questions or missing facts to be triggered"
        )
        # Verify it is NOT marked harmless: must still have valid statutory analysis
        assert len(res.sections) > 0, (
            f"[{case['id']}] Low confidence incident must NOT be dismissed as harmless; expected sections"
        )

    # 6. Decoupled Severity & Safety Guidance (Requirement 8)
    if exp.get("urgent_safety_guidance"):
        # Severe or critical incidents must preserve severity HIGH or CRITICAL regardless of confidence
        assert res.severity_assessment in ["HIGH", "CRITICAL"], (
            f"[{case['id']}] Urgent safety incident must have HIGH or CRITICAL severity, got {res.severity_assessment}"
        )

    # 7. Official Source URLs (Requirement 9)
    for s in res.sections:
        if s.section != "Advisory":
            assert s.source_url.startswith("https://www.indiacode.nic.in/"), (
                f"[{case['id']}] Section {s.section} has non-official source URL: {s.source_url}"
            )
            assert s.raw_statutory_text is not None and len(s.raw_statutory_text) > 10, (
                f"[{case['id']}] Section {s.section} missing raw statutory text"
            )

    # 8. Forensic Evidence items have BSA Section 63 certification guidance
    assert len(res.forensicEvidence) > 0, f"[{case['id']}] Expected forensic evidence items"
    digital_evidence = [e for e in res.forensicEvidence if e.category == "digital"]
    if digital_evidence:
        assert any("63" in e.notes or "bsa" in e.notes.lower() for e in digital_evidence), (
            f"[{case['id']}] Digital evidence must cite Section 63 BSA compliance"
        )
