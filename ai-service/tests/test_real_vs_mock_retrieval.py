"""
ai-service/tests/test_real_vs_mock_retrieval.py
Unit tests using mocks for external AI / vector services and integration tests for hybrid retrieval.

Requirements covered:
- Requirement 5: Use mocks for external AI services where deterministic unit tests are required,
  and add separate integration tests for real retrieval.
"""

from unittest.mock import AsyncMock, patch
import pytest
from app.graph.pipeline import pipeline
from app.vectorstore.qdrant_store import QdrantLegalStore

@pytest.mark.asyncio
async def test_deterministic_pipeline_with_mocked_retriever():
    """Unit test: Deterministically mocks external vector store retrieval."""
    mock_retrieved_chunk = {
        "chunk": {
            "id": "mock-bns-304",
            "act": "BNS",
            "section": "Section 304",
            "title": "Snatching",
            "category": "Theft",
            "text": "Theft is snatching if offender suddenly or quickly or forcibly seizes property.",
            "simplified_text": "Sudden grabbing of mobile phones or chains.",
            "source_url": "https://www.indiacode.nic.in/handle/123456789/20062",
            "verification_status": "SOURCE_VERIFIED"
        },
        "score": 0.95,
        "rrf_score": 0.03
    }

    with patch("app.graph.pipeline.vector_store.search_hybrid", new_callable=AsyncMock) as mock_search:
        mock_search.return_value = [mock_retrieved_chunk]

        result = await pipeline.execute("Two men snatched my gold chain on a motorcycle.", framework="BOTH")

        mock_search.assert_awaited_once()
        assert result is not None
        assert result.caseId is not None
        assert any("304" in s.section for s in result.sections)
        assert result.prediction_confidence >= 0.85

@pytest.mark.asyncio
async def test_real_hybrid_retrieval_rrf_scoring():
    """Integration test: Real hybrid search (Dense Proxy + BM25 Sparse with RRF Fusion)."""
    store = QdrantLegalStore()
    assert len(store.chunks) > 0, "Store corpus must not be empty"

    # Query 1: Snatching
    results_snatch = await store.search_hybrid("Two men suddenly grabbed and snatched gold chain on motorcycle", limit=5)
    assert len(results_snatch) > 0
    top_chunk = results_snatch[0]["chunk"]
    assert any(k in top_chunk.get("title", "").lower() or k in top_chunk.get("text", "").lower() for k in ["snatch", "theft"])
    # Verify RRF score sorting
    scores = [r["score"] for r in results_snatch]
    assert scores == sorted(scores, reverse=True), "Results must be sorted by score descending"

    # Query 2: Murder
    results_murder = await store.search_hybrid("intentional shooting causing instant death murder", limit=5)
    assert len(results_murder) > 0
    murder_acts = [r["chunk"].get("act") for r in results_murder]
    assert "BNS" in murder_acts or "IPC" in murder_acts
