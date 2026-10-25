from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    scenario: str = Field(..., min_length=5, max_length=10000, description="Raw or conversational criminal narrative")
    framework: Literal["IPC", "BNS", "BOTH"] = "BOTH"
    requestId: Optional[str] = None

class OffenseClassificationDetails(BaseModel):
    action: Optional[str] = None
    intent_indicators: Optional[str] = None
    weapon_used: Optional[str] = None
    injuries_sustained: Optional[str] = None
    location: Optional[str] = None
    property_value: Optional[str] = None
    threat_medium: Optional[str] = None
    witnesses: Optional[str] = None
    offense_category: str = "General Criminal Offence"

class SectionAnalysis(BaseModel):
    act: Literal["IPC", "BNS", "BNSS", "BSA", "NDPS_ACT", "IT_ACT", "ARMS_ACT", "POCSO_ACT", "CONTRACT_ACT"]
    section: str
    title: str
    punishment: str
    bnsEquivalent: Optional[str] = None
    ipcEquivalent: Optional[str] = None
    confidence: float
    mapping_type: Literal["EXACT", "PARTIAL", "QUALIFIED", "UNAVAILABLE"] = "EXACT"
    raw_statutory_text: Optional[str] = None
    simplified_text: Optional[str] = None
    source_url: Optional[str] = "https://www.indiacode.nic.in"
    effective_date: Optional[str] = "2024-07-01"

class LegalStatus(BaseModel):
    bailable: bool
    cognizable: bool
    compoundable: bool
    triableBy: str

class StatutoryIngredient(BaseModel):
    id: str
    element: str
    matchedFacts: List[str]
    satisfied: Literal["yes", "partial", "no"]

class ForensicEvidenceItem(BaseModel):
    category: Literal["physical", "digital", "biological", "documentary"]
    item: str
    priority: Literal["high", "medium", "low"]
    notes: str

class DefenseCritiqueItem(BaseModel):
    argument: str
    weakness: str
    counter: str

class ExtractedFacts(BaseModel):
    who: Optional[List[str]] = None
    what: Optional[List[str]] = None
    when: Optional[List[str]] = None
    where: Optional[List[str]] = None
    how: Optional[List[str]] = None

class SourceCitation(BaseModel):
    id: str
    label: str
    snippet: str
    score: float

class JudicialPrecedent(BaseModel):
    case_name: str
    citation: str
    court: str
    decision_date: str
    judgment_url: str
    material_facts: str
    legal_issues: List[str]
    statutory_provisions: List[str]
    court_holding_reasoning: str
    relevance_to_incident: str
    factual_legal_distinctions: str
    historical_vs_modern_law: Literal["HISTORICAL_IPC", "MODERN_BNS_TRANSITIONAL", "SPECIAL_STATUTE"] = "HISTORICAL_IPC"
    verification_status: Literal["VERIFIED_OFFICIAL_RECORD", "SOURCE_VERIFIED", "UNVERIFIED"] = "VERIFIED_OFFICIAL_RECORD"

class AnalysisResult(BaseModel):
    caseId: str
    createdAt: str
    title: Optional[str] = "Crime Analysis & Legal Mapping Dossier"
    
    # Decoupled confidence and severity scoring
    prediction_confidence: float = Field(..., ge=0.0, le=1.0, description="Certainty of statutory mapping")
    severity_assessment: Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"] = "MEDIUM"
    evidence_completeness: float = Field(0.8, ge=0.0, le=1.0)
    legal_uncertainty: float = Field(0.2, ge=0.0, le=1.0)
    needs_follow_up: bool = False
    is_tentative: bool = False
    missing_facts: List[str] = Field(default_factory=list)
    clarifying_questions: List[str] = Field(default_factory=list)
    
    offense_classification_details: Optional[OffenseClassificationDetails] = None
    sections: List[SectionAnalysis]
    status: LegalStatus
    ingredients: List[StatutoryIngredient]
    forensicEvidence: List[ForensicEvidenceItem]
    defenseCritique: List[DefenseCritiqueItem]
    extractedFacts: ExtractedFacts
    sources: List[SourceCitation]
    related_precedents: List[JudicialPrecedent] = Field(default_factory=list)
    disclaimer: str = "Educational analysis only. Not legal advice. Consult a licensed advocate."
