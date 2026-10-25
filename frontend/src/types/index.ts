export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type LawFramework = 'IPC' | 'BNS' | 'BOTH';

export interface SectionAnalysis {
  act: 'IPC' | 'BNS' | 'BNSS' | 'BSA' | 'NDPS_ACT' | 'IT_ACT';
  section: string;
  title: string;
  punishment: string;
  bnsEquivalent?: string;
  ipcEquivalent?: string;
  confidence: number;
  mapping_type?: 'EXACT' | 'PARTIAL' | 'QUALIFIED' | 'UNAVAILABLE';
  mappingType?: 'EXACT' | 'PARTIAL' | 'QUALIFIED' | 'UNAVAILABLE';
  raw_statutory_text?: string;
  rawStatutoryText?: string;
  simplified_text?: string;
  simplifiedText?: string;
  source_url?: string;
  sourceUrl?: string;
  effective_date?: string;
  effectiveDate?: string;
}

export interface LegalStatus {
  bailable: boolean;
  cognizable: boolean;
  compoundable: boolean;
  triableBy: string;
}

export interface StatutoryIngredient {
  id: string;
  element: string;
  matchedFacts: string[];
  satisfied: 'yes' | 'partial' | 'no';
}

export type ForensicCategory = 'physical' | 'digital' | 'biological' | 'documentary';

export interface ForensicEvidenceItem {
  category: ForensicCategory;
  item: string;
  priority: 'high' | 'medium' | 'low';
  notes: string;
}

export interface DefenseCritiqueItem {
  argument: string;
  weakness: string;
  counter: string;
}

export interface ExtractedFacts {
  who?: string[];
  what?: string[];
  when?: string[];
  where?: string[];
  how?: string[];
}

export interface LegalSourceCitation {
  id: string;
  label: string;
  snippet: string;
  score: number;
}

export interface OffenseClassificationDetails {
  action?: string;
  intent_indicators?: string;
  weapon_used?: string;
  injuries_sustained?: string;
  location?: string;
  property_value?: string;
  threat_medium?: string;
  witnesses?: string;
  offense_category?: string;
}

export interface JudicialPrecedent {
  case_name: string;
  caseName?: string;
  citation: string;
  court: string;
  decision_date: string;
  decisionDate?: string;
  judgment_url: string;
  judgmentUrl?: string;
  material_facts: string;
  materialFacts?: string;
  legal_issues: string[];
  legalIssues?: string[];
  statutory_provisions: string[];
  statutoryProvisions?: string[];
  court_holding_reasoning: string;
  courtHoldingReasoning?: string;
  relevance_to_incident: string;
  relevanceToIncident?: string;
  factual_legal_distinctions: string;
  factualLegalDistinctions?: string;
  historical_vs_modern_law: 'HISTORICAL_IPC' | 'MODERN_BNS_TRANSITIONAL' | 'SPECIAL_STATUTE';
  historicalVsModernLaw?: 'HISTORICAL_IPC' | 'MODERN_BNS_TRANSITIONAL' | 'SPECIAL_STATUTE';
  verification_status: 'VERIFIED_OFFICIAL_RECORD' | 'SOURCE_VERIFIED' | 'UNVERIFIED';
  verificationStatus?: 'VERIFIED_OFFICIAL_RECORD' | 'SOURCE_VERIFIED' | 'UNVERIFIED';
}

export interface AnalysisResult {
  caseId: string;
  createdAt: string;
  title?: string;
  
  // Decoupled confidence and severity assessment
  prediction_confidence?: number;
  predictionConfidence?: number;
  severity_assessment?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  severityAssessment?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  evidence_completeness?: number;
  evidenceCompleteness?: number;
  legal_uncertainty?: number;
  legalUncertainty?: number;
  needs_follow_up?: boolean;
  needsFollowUp?: boolean;
  is_tentative?: boolean;
  isTentative?: boolean;
  missing_facts?: string[];
  missingFacts?: string[];
  clarifying_questions?: string[];
  clarifyingQuestions?: string[];

  offense_classification_details?: OffenseClassificationDetails;
  sections: SectionAnalysis[];
  status: LegalStatus;
  ingredients: StatutoryIngredient[];
  forensicEvidence: ForensicEvidenceItem[];
  defenseCritique: DefenseCritiqueItem[];
  extractedFacts: ExtractedFacts;
  sources: LegalSourceCitation[];
  related_precedents?: JudicialPrecedent[];
  relatedPrecedents?: JudicialPrecedent[];
  disclaimer: string;
}

export type CaseCategory =
  | 'NDPS'
  | 'Property Theft'
  | 'Robbery'
  | 'Grievous Hurt'
  | 'Murder'
  | 'Assault & Bodily Harm'
  | 'Electronic Evidence'
  | 'Civil Dispute';

export type CaseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  caseType?: string;
  category: CaseCategory | string;
  difficulty: CaseDifficulty;
  summary: string;
  overview?: string;
  date: string;
  decisionYear?: number;
  jurisdiction: string;
  court?: string;
  citation?: string;
  judgmentUrl?: string;
  evidenceType?: string;
  caseStatus?: string;
  backgroundFacts?: string;
  factsTimeline: { time: string; event: string }[];
  issuesBeforeCourt?: string[];
  sectionsApplied: { act: 'IPC' | 'BNS' | string; section: string; title: string }[];
  evidenceList: { item: string; category: ForensicCategory; probativeValue: string }[];
  partyArguments?: { party: string; argument: string }[];
  courtReasoning?: string;
  outcome: string;
  finalOrder?: string;
  legalPrinciples?: string[];
  ipcBnsComparison?: { ipc: string; bns: string; difference?: string }[];
  relatedCases?: string[];
  pedagogicalTakeaways?: string;
  factFindingDistinction?: string;
  verificationStatus?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  caseReference?: string;
  sourceName?: string;
  investigationFindings?: string;
  mediaList?: { url: string; caption?: string; description?: string }[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  fullAnalysis?: AnalysisResult;
}

export interface CaseStudyPageResponse {
  items: CaseStudy[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateCaseStudyPayload {
  title: string;
  category: string;
  summary: string;
  difficulty?: CaseDifficulty;
  caseType?: string;
  jurisdiction?: string;
  court?: string;
  caseDate?: string;
  date?: string;
  decisionYear?: number;
  citation?: string;
  judgmentUrl?: string;
  sourceName?: string;
  caseReference?: string;
  evidenceType?: string;
  caseStatus?: string;
  status?: 'DRAFT' | 'PUBLISHED';
  overview?: string;
  backgroundFacts?: string;
  investigationFindings?: string;
  courtReasoning?: string;
  outcome?: string;
  finalOrder?: string;
  pedagogicalTakeaways?: string;
  factFindingDistinction?: string;
  verificationStatus?: string;
  factsTimeline?: { time: string; event: string }[];
  issuesBeforeCourt?: string[];
  sectionsApplied?: { act: string; section: string; title: string }[];
  evidenceList?: { item: string; category: ForensicCategory; probativeValue: string }[];
  partyArguments?: { party: string; argument: string }[];
  legalPrinciples?: string[];
  ipcBnsComparison?: { ipc: string; bns: string; difference?: string }[];
  relatedCases?: string[];
  mediaList?: { url: string; caption?: string; description?: string }[];
}

export type UpdateCaseStudyPayload = Partial<CreateCaseStudyPayload>;

export interface LawyerListing {
  id: string;
  name: string;
  barCouncilEnrollment?: string;
  qualification?: string;
  city: string;
  district?: string;
  state?: string;
  practiceAreas: string[];
  languages: string[];
  isLegalAid: boolean;
  legalAidOrganization?: string;
  officeAddress?: string;
  publicProfileUrl?: string;
  contactLink?: string;
  phoneHelpline?: string;
  verificationSource?: string;
  lastVerifiedDate?: string;
  verificationStatus: string;
}

export interface LawyerSearchResponse {
  totalListings: number;
  uniqueLawyers: number;
  verifiedCount: number;
  isLegalAidAvailable: boolean;
  nalsaHelpline: string;
  nalsaPortalUrl: string;
  countExplanation: string;
  listings: LawyerListing[];
}

export interface LawyerFilterParams {
  city?: string;
  legalIssue?: string;
  isLegalAid?: boolean;
  language?: string;
}

// Simulator & Crime Scene Photo Evidence Types
export interface EvidencePhoto {
  id: string;
  fileName: string;
  fileUrl: string;
  contentType?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  createdAt?: string;
  annotations?: EvidenceAnnotation[];
}

export interface EvidenceAnnotation {
  id: string;
  photoId?: string;
  markerLabel: string;
  title: string;
  category: ForensicCategory;
  coordinateX: number; // 0.0 to 1.0 normalized
  coordinateY: number; // 0.0 to 1.0 normalized
  notes?: string;
  visualHypothesis?: string;
  statutoryRelevance?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EvidenceHypothesis {
  marker_id?: string;
  marker_label: string;
  category: string;
  finding: string;
  hypothesis: string;
  statutory_relevance: string;
  preservation_protocol: string;
}

export interface Hotspot {
  id: string;
  label: string;
  category: ForensicCategory;
  x: number;
  y: number;
  description: string;
  properOrder: number;
  recommendedPackaging: string;
  collected?: boolean;
}

export interface CustodyActionLog {
  id: string;
  timestamp: string;
  action: string;
  evidenceLabel: string;
  impactScore: number;
  notes: string;
}

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  timestamp?: string;
}

export interface FeedbackSubmission {
  caseId?: string;
  rating: 'positive' | 'negative';
  category?: string;
  comment: string;
}

export interface WaitlistSubmission {
  email: string;
  role: 'student' | 'educator' | 'investigator' | 'other';
  institution?: string;
}
