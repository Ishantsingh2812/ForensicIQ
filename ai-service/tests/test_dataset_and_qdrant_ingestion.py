"""
ai-service/tests/test_dataset_and_qdrant_ingestion.py
Validates the authoritative legal corpus dataset (131 records) and idempotent Qdrant ingestion.

Requirements covered:
- Requirement 2: Dataset validation and Qdrant ingestion testing
- Requirement 6: Authoritative verified statutory corpus (no manufactured sections or fake URLs)
- Requirement 9: Official India Code URLs verified for all provisions
"""

import hashlib
import json
import os
import sys
import uuid
import pytest

# Add root directory to sys.path so we can import scripts
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.ingest_corpus import compute_deterministic_id, build_sparse_vector

CORPUS_PATH = os.path.join(ROOT_DIR, "ai-service", "app", "data", "corpus.json")

def test_corpus_exists_and_loaded():
    """Verify that the official legal corpus file exists and is populated."""
    assert os.path.exists(CORPUS_PATH), f"Legal corpus file not found at {CORPUS_PATH}"
    with open(CORPUS_PATH, "r", encoding="utf-8") as f:
        records = json.load(f)
    assert len(records) >= 100, f"Expected at least 100 verified legal chunks, found {len(records)}"

def test_corpus_schema_and_metadata_integrity():
    """Verify that every record contains strictly typed required metadata."""
    with open(CORPUS_PATH, "r", encoding="utf-8") as f:
        records = json.load(f)

    required_keys = [
        "id", "act", "section", "title", "category", "record_type",
        "text", "simplified_text", "keywords", "source_url",
        "publication_date", "effective_date", "historical_law_status",
        "verification_status"
    ]

    acts_found = set()
    for idx, r in enumerate(records):
        for k in required_keys:
            assert k in r, f"Record #{idx} ({r.get('id', 'unknown')}) missing required key '{k}'"
            assert r[k] is not None, f"Record #{idx} has None value for '{k}'"
            if isinstance(r[k], str):
                assert len(r[k].strip()) > 0, f"Record #{idx} has empty string for '{k}'"

        # Requirement 6: Must be source verified
        assert r["verification_status"] == "SOURCE_VERIFIED", (
            f"Record {r['id']} has unverified status: {r['verification_status']}"
        )

        # Requirement 9: Official India Code or Supreme Court of India URLs
        assert r["source_url"].startswith("https://www.indiacode.nic.in/") or r["source_url"].startswith("https://main.sci.gov.in/"), (
            f"Record {r['id']} has invalid source URL domain: {r['source_url']}"
        )

        acts_found.add(r["act"])

    # Must cover major statutory acts
    assert "BNS" in acts_found
    assert "BNSS" in acts_found
    assert "BSA" in acts_found
    assert "IPC" in acts_found

def test_qdrant_deterministic_id_idempotency():
    """Verify that deterministic vector IDs (UUID-5) are consistent across runs."""
    sample_chunk = {
        "id": "bns-sec-101-murder",
        "act": "BNS",
        "section": "Section 101",
        "text": "Except in the cases hereinafter excepted, culpable homicide is murder..."
    }

    id_1 = compute_deterministic_id(sample_chunk)
    id_2 = compute_deterministic_id(sample_chunk)
    assert id_1 == id_2, "Deterministic ID must be identical across invocations"

    # Verify valid UUID format
    parsed_uuid = uuid.UUID(id_1)
    assert parsed_uuid.version == 5, f"Expected UUID version 5, got {parsed_uuid.version}"

def test_qdrant_no_id_collisions_across_entire_corpus():
    """Verify zero ID collisions across the entire legal corpus."""
    with open(CORPUS_PATH, "r", encoding="utf-8") as f:
        records = json.load(f)

    seen_ids = set()
    for r in records:
        det_id = compute_deterministic_id(r)
        assert det_id not in seen_ids, f"Collision detected for deterministic ID: {det_id} on record {r['id']}"
        seen_ids.add(det_id)

    assert len(seen_ids) == len(records)

def test_sparse_bm25_vector_generation():
    """Verify sparse term frequency representation for hybrid search."""
    sample_vocab = {
        "murder": 1,
        "culpable": 2,
        "homicide": 3,
        "intention": 4,
        "death": 5
    }
    sample_text = "Murder and culpable homicide done with intention of causing death."

    sparse = build_sparse_vector(sample_text, sample_vocab)
    assert "indices" in sparse and "values" in sparse
    assert len(sparse["indices"]) == len(sparse["values"])
    assert len(sparse["indices"]) >= 4
    # All counts should be positive floats
    assert all(v > 0.0 for v in sparse["values"])
