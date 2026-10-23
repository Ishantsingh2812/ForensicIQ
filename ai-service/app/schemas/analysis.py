from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class AnalyzeRequest(BaseModel):
    scenario: str = Field(..., min_length=50, max_length=5000, description="Raw criminal narrative")
    framework: Literal["IPC", "BNS", "BOTH"] = "BOTH"
    requestId: Optional[str] = None

class SectionAnalysis(BaseModel):
    act: Literal["IPC", "BNS"]
    section: str
    title: str
    punishment: str
    bnsEquivalent: Optional[str] = None
    confidence: float

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

class AnalysisResult(BaseModel):
    caseId: str
    createdAt: str
    title: Optional[str] = "Crime Analysis & Legal Mapping Dossier"
    sections: List[SectionAnalysis]
    status: LegalStatus
    ingredients: List[StatutoryIngredient]
    forensicEvidence: List[ForensicEvidenceItem]
    defenseCritique: List[DefenseCritiqueItem]
    extractedFacts: ExtractedFacts
    sources: List[SourceCitation]
    disclaimer: str = "Educational analysis only. Not legal advice. Consult a licensed advocate."
