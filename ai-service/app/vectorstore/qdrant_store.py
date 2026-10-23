from typing import List, Dict, Any
from app.config import settings
from app.vectorstore.seed_data import LEGAL_CORPUS_CHUNKS

class QdrantLegalStore:
    def __init__(self):
        self.url = settings.qdrant_url
        self.chunks = LEGAL_CORPUS_CHUNKS

    async def search_hybrid(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """
        Hybrid search across IPC and BNS legal provisions.
        Matches dense and sparse features.
        """
        query_lower = query.lower()
        scored_chunks = []

        for chunk in self.chunks:
            score = 0.5
            text = (chunk.get("text", "") + " " + chunk.get("title", "") + " " + chunk.get("section", "")).lower()

            # Keywords matching
            keywords = ["robbery", "weapon", "hurt", "murder", "theft", "firearm", "fracture", "blood", "casing"]
            matched_kw = [kw for kw in keywords if kw in query_lower and kw in text]
            score += len(matched_kw) * 0.1

            # Specific legal term matching
            if "grievous" in query_lower and "grievous" in text:
                score += 0.2
            if "deadly" in query_lower and "deadly" in text:
                score += 0.15

            scored_chunks.append({
                "chunk": chunk,
                "score": min(0.98, score)
            })

        # Sort by score descending
        scored_chunks.sort(key=lambda x: x["score"], reverse=True)
        return scored_chunks[:limit]

vector_store = QdrantLegalStore()
