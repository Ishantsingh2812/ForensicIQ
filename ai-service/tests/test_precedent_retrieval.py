import pytest
from app.data.verified_precedents import retrieve_relevant_precedents, VERIFIED_JUDICIAL_PRECEDENTS
from app.graph.pipeline import pipeline

def test_all_curated_precedents_have_mandatory_11_points():
    """Verify that every precedent in the verified database adheres to the 11 analytical requirements."""
    assert len(VERIFIED_JUDICIAL_PRECEDENTS) >= 8
    
    for p in VERIFIED_JUDICIAL_PRECEDENTS:
        # 1. Case name and citation
        assert p["case_name"] and len(p["case_name"]) > 5
        assert p["citation"] and len(p["citation"]) > 3
        # 2. Court and decision date
        assert "Supreme Court" in p["court"] or "High Court" in p["court"]
        assert p["decision_date"] and len(p["decision_date"]) >= 4
        # 3. Original judgment link
        assert p["judgment_url"].startswith("https://")
        assert "sci.gov.in" in p["judgment_url"] or "ecourts.gov.in" in p["judgment_url"]
        # 4. Relevant facts
        assert len(p["material_facts"]) >= 20
        # 5. Legal issues considered
        assert len(p["legal_issues"]) >= 1
        # 6. Relevant statutory provisions
        assert len(p["statutory_provisions"]) >= 1
        # 7. Court's actual decision and legal reasoning
        assert len(p["court_holding_reasoning"]) >= 20
        # 8. Relevance reasoning
        assert len(p["relevance_to_incident"]) >= 15
        # 9. Key differences
        assert len(p["factual_legal_distinctions"]) >= 15
        # 10. Historical IPC vs modern BNS era status
        assert p["historical_vs_modern_law"] in ["HISTORICAL_IPC", "MODERN_BNS_TRANSITIONAL", "SPECIAL_STATUTE"]
        # 11. Source verification status
        assert p["verification_status"] == "VERIFIED_OFFICIAL_RECORD"

def test_train_slap_retrieves_veeda_menezes_precedent():
    """Test that inputting a slap on a train retrieves Mrs. Veeda Menezes v. Yusuf Khan."""
    results = retrieve_relevant_precedents(
        scenario="someone slapped me on a train during a petty verbal argument over seats",
        category="Assault",
        sections=["115", "131", "323", "352"],
        limit=3
    )
    assert len(results) > 0
    case_names = [p["case_name"] for p in results]
    assert any("Veeda Menezes" in name for name in case_names)
    
    veeda = next(p for p in results if "Veeda Menezes" in p["case_name"])
    assert "AIR 1966 SC 1773" in veeda["citation"]
    assert "Section 95" in " ".join(veeda["statutory_provisions"]) or "trivial" in veeda["relevance_to_incident"].lower()
    assert veeda["judgment_url"].startswith("https://main.sci.gov.in/")

def test_deadly_weapon_robbery_retrieves_phool_kumar():
    """Test that deadly weapon robbery retrieves Phool Kumar v. Delhi Administration."""
    results = retrieve_relevant_precedents(
        scenario="Two men brandishing a loaded country pistol and large knife held up a jewelry shop and robbed the cash box",
        category="Robbery",
        sections=["310", "311", "392", "397"],
        limit=3
    )
    assert len(results) > 0
    case_names = [p["case_name"] for p in results]
    assert any("Phool Kumar" in name for name in case_names)
    
    phool = next(p for p in results if "Phool Kumar" in p["case_name"])
    assert "(1975) 1 SCC 797" in phool["citation"]
    assert any("397" in s for s in phool["statutory_provisions"])

def test_homicide_bodily_injury_retrieves_virsa_singh():
    """Test that fatal stabbing retrieves Virsa Singh v. State of Punjab."""
    results = retrieve_relevant_precedents(
        scenario="The assailant thrust a spear into the victim's abdomen, severing the intestines and causing death",
        category="Homicide",
        sections=["103", "300", "302"],
        limit=3
    )
    assert len(results) > 0
    case_names = [p["case_name"] for p in results]
    assert any("Virsa Singh" in name for name in case_names)
    
    virsa = next(p for p in results if "Virsa Singh" in p["case_name"])
    assert "AIR 1958 SC 465" in virsa["citation"]
    assert "ordinary course of nature" in virsa["court_holding_reasoning"].lower()

def test_electronic_cctv_evidence_retrieves_arjun_khotkar():
    """Test that electronic record / CCTV authentication retrieves Arjun Panditrao Khotkar."""
    results = retrieve_relevant_precedents(
        scenario="Security footage from bank CCTV hard drive presented as evidence without section 65B certificate",
        category="Evidence",
        sections=["63", "65B"],
        limit=3
    )
    assert len(results) > 0
    case_names = [p["case_name"] for p in results]
    assert any("Arjun Panditrao Khotkar" in name for name in case_names)
    
    arjun = next(p for p in results if "Arjun Panditrao Khotkar" in p["case_name"])
    assert "(2020) 7 SCC 1" in arjun["citation"]
    assert any("65B" in s or "63" in s for s in arjun["statutory_provisions"])

@pytest.mark.asyncio
async def test_pipeline_populates_related_precedents():
    """Test that end-to-end pipeline execution populates related_precedents."""
    result = await pipeline.execute("A masked intruder with a knife snatched a handbag from a lady on the road")
    assert result is not None
    assert hasattr(result, "related_precedents")
    assert len(result.related_precedents) > 0
    first_precedent = result.related_precedents[0]
    assert first_precedent.case_name
    assert first_precedent.citation
    assert first_precedent.judgment_url.startswith("https://")
    assert first_precedent.relevance_to_incident
    assert first_precedent.factual_legal_distinctions
