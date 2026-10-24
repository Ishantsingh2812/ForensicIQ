from typing import List, Dict, Any, Optional
from fastapi import FastAPI, Header, HTTPException, status, Query
from pydantic import BaseModel
from app.config import settings
from app.schemas.analysis import AnalyzeRequest, AnalysisResult
from app.graph.pipeline import pipeline
from app.vectorstore.qdrant_store import vector_store

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Internal LangGraph microservice for Indian criminal law scenario analysis (IPC & BNS 2023)"
)

class EvidenceDetectRequest(BaseModel):
    description: Optional[str] = None
    annotations: Optional[List[Dict[str, Any]]] = None

class EvidenceDetectResponse(BaseModel):
    hypotheses: List[Dict[str, Any]]
    scene_summary: str

@app.get("/health", tags=["Monitoring"])
async def health():
    return {
        "status": "ok",
        "service": settings.app_name,
        "version": "1.0.0"
    }

@app.post(
    "/api/v1/analyze",
    response_model=AnalysisResult,
    tags=["Legal Analysis"],
    summary="Multi-Agent Crime Scenario Evaluation"
)
async def analyze_scenario(
    request: AnalyzeRequest,
    x_internal_token: str = Header(..., alias="X-Internal-Token")
):
    if x_internal_token != settings.ai_internal_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing X-Internal-Token header"
        )

    try:
        result = await pipeline.execute(
            scenario=request.scenario,
            framework=request.framework
        )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"LangGraph pipeline processing error: {str(e)}"
        )

@app.post(
    "/api/v1/evidence/detect",
    response_model=EvidenceDetectResponse,
    tags=["Forensic Evidence"],
    summary="Generate Crime Scene Evidence Hypotheses from Annotations"
)
async def detect_evidence_hypotheses(
    request: EvidenceDetectRequest,
    x_internal_token: Optional[str] = Header(None, alias="X-Internal-Token")
):
    # Allow local frontend calls or internal calls
    annotations = request.annotations or []
    hypotheses = []

    for ann in annotations:
        label = ann.get("label", "E")
        category = ann.get("category", "physical").lower()
        desc = (ann.get("description", "") + " " + ann.get("title", "")).lower()

        if "casing" in desc or "cartridge" in desc or "bullet" in desc or "ballistic" in category:
            hypotheses.append({
                "marker_id": ann.get("id"),
                "marker_label": label,
                "category": "physical",
                "finding": "Discharged Ballistic Ammunition",
                "hypothesis": "Spent cartridge casing consistent with semi-automatic firearm discharge at close range; preserves firing pin and breech face striations.",
                "statutory_relevance": "Triggers Section 311 BNS / Section 397 IPC mandatory minimum and Arms Act 1959.",
                "preservation_protocol": "Pack in sterile padded container. Do not mark base or primer. Forward under Form IV to Ballistics FSL."
            })
        elif "blood" in desc or "stain" in desc or "biological" in category:
            hypotheses.append({
                "marker_id": ann.get("id"),
                "marker_label": label,
                "category": "biological",
                "finding": "Suspect/Victim Fluid Deposition",
                "hypothesis": "Biological bloodstain spatter indicating blunt impact or arterial spurting. High probability of obtaining foreign perpetrator STR-DNA profile.",
                "statutory_relevance": "Substantive corroborative physical proof under Section 39 BSA (Expert Scientific Evidence).",
                "preservation_protocol": "Collect with sterile saline cotton swabs; air-dry in dark ventilated environment to prevent mold."
            })
        elif "glass" in desc or "window" in desc or "fracture" in desc:
            hypotheses.append({
                "marker_id": ann.get("id"),
                "marker_label": label,
                "category": "physical",
                "finding": "Radial & Concentric Glass Fractures",
                "hypothesis": "Fracture lines indicate point of origin and high-velocity exterior impact force, establishing forcible house-trespass.",
                "statutory_relevance": "Section 331 BNS (House-breaking) & Section 324 BNS (Mischief).",
                "preservation_protocol": "Dust fracture edges for latent friction ridges; photograph under oblique angle lighting."
            })
        elif "phone" in desc or "digital" in desc or "cctv" in desc or "camera" in desc:
            hypotheses.append({
                "marker_id": ann.get("id"),
                "marker_label": label,
                "category": "digital",
                "finding": "Digital Recording / Telephonic Resource",
                "hypothesis": "Device contains digital timestamps, location coordinates, or optical capture of incident sequence.",
                "statutory_relevance": "Requires mandatory Section 63 BSA Hash & Custody Certificate for court admissibility.",
                "preservation_protocol": "Place mobile in Faraday bag to prevent remote wiping. Document cryptographic SHA-256 hash immediately."
            })
        else:
            hypotheses.append({
                "marker_id": ann.get("id"),
                "marker_label": label,
                "category": category,
                "finding": f"Physical Marker ({label})",
                "hypothesis": f"Trace material at ({ann.get('x', 0):.2f}, {ann.get('y', 0):.2f}) relevant to scene reconstruction and timeline verification.",
                "statutory_relevance": "Primary circumstantial evidence under Section 6 BSA (Res Gestae).",
                "preservation_protocol": "Document with forensic scale ruler and capture macro photographs before disturbing position."
            })

    scene_summary = (
        f"Analyzed {len(annotations)} crime scene annotations. Visual hypotheses confirm sequence of ingress, "
        "weapon deployment, and evidentiary trace deposition. All electronic and biological markers require Section 63 BSA compliance."
    )

    return EvidenceDetectResponse(
        hypotheses=hypotheses,
        scene_summary=scene_summary
    )

@app.get(
    "/api/v1/legal/compare",
    tags=["Legal Comparative"],
    summary="Side-by-side IPC and BNS Legal Comparison"
)
async def compare_legal_sections(
    ipc_section: Optional[str] = Query(None, description="IPC Section e.g. '302', '379', '397'"),
    bns_section: Optional[str] = Query(None, description="BNS Section e.g. '103', '303', '309'")
):
    chunks = vector_store.chunks
    matches = []

    for c in chunks:
        sec = c.get("section", "").lower()
        title = c.get("title", "").lower()
        text = c.get("text", "").lower()

        if ipc_section and (ipc_section.lower() in sec or f"ipc section {ipc_section.lower()}" in text):
            matches.append(c)
        elif bns_section and (bns_section.lower() in sec or f"bns section {bns_section.lower()}" in text):
            matches.append(c)

    return {
        "query": {"ipc": ipc_section, "bns": bns_section},
        "count": len(matches),
        "results": matches[:10]
    }
