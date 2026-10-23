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
  act: 'IPC' | 'BNS';
  section: string;
  title: string;
  punishment: string;
  bnsEquivalent?: string;
  confidence: number;
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

export interface AnalysisResult {
  caseId: string;
  createdAt: string;
  title?: string;
  sections: SectionAnalysis[];
  status: LegalStatus;
  ingredients: StatutoryIngredient[];
  forensicEvidence: ForensicEvidenceItem[];
  defenseCritique: DefenseCritiqueItem[];
  extractedFacts: ExtractedFacts;
  sources: LegalSourceCitation[];
  disclaimer: string;
}

export type CaseCategory = 'NDPS' | 'Property Theft' | 'Robbery' | 'Grievous Hurt' | 'Murder';
export type CaseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: CaseCategory;
  difficulty: CaseDifficulty;
  summary: string;
  date: string;
  jurisdiction: string;
  factsTimeline: { time: string; event: string }[];
  sectionsApplied: { act: 'IPC' | 'BNS'; section: string; title: string }[];
  evidenceList: { item: string; category: ForensicCategory; probativeValue: string }[];
  outcome: string;
  fullAnalysis?: AnalysisResult;
}

// Simulator Types
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
