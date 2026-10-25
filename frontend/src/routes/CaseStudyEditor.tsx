import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Trash2,
  Save,
  Globe,
  Eye,
  ArrowLeft,
  Scale,
  Calendar,
  Building2,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';
import { api, ApiError } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import {
  CaseCategory,
  CaseDifficulty,
  CreateCaseStudyPayload,
  ForensicCategory,
  CaseStudy,
} from '../types';
import { CaseStudyPreviewModal } from '../components/cases/CaseStudyPreviewModal';

const CATEGORIES: CaseCategory[] = [
  'Assault & Bodily Harm',
  'Robbery',
  'Murder',
  'Electronic Evidence',
  'NDPS',
  'Property Theft',
  'Grievous Hurt',
  'Civil Dispute',
];

const FORENSIC_CATEGORIES: ForensicCategory[] = [
  'physical',
  'biological',
  'digital',
  'documentary',
];

export const CaseStudyEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();

  // Active section tab
  const [activeTab, setActiveTab] = useState<'basic' | 'incident' | 'legal' | 'sources' | 'media'>('basic');

  // Loading & error state
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Assault & Bodily Harm');
  const [difficulty, setDifficulty] = useState<CaseDifficulty>('Intermediate');
  const [caseType, setCaseType] = useState('Criminal Precedent');
  const [summary, setSummary] = useState('');
  const [caseReference, setCaseReference] = useState('');
  const [court, setCourt] = useState('Supreme Court of India');
  const [jurisdiction, setJurisdiction] = useState('Supreme Court of India, New Delhi');
  const [caseDate, setCaseDate] = useState('');
  const [decisionYear, setDecisionYear] = useState<string>('');
  const [citation, setCitation] = useState('');
  const [judgmentUrl, setJudgmentUrl] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('VERIFIED_OFFICIAL_RECORD');
  const [caseStatus, setCaseStatus] = useState('DECIDED');

  // Incident & Findings
  const [overview, setOverview] = useState('');
  const [backgroundFacts, setBackgroundFacts] = useState('');
  const [investigationFindings, setInvestigationFindings] = useState('');
  const [courtReasoning, setCourtReasoning] = useState('');
  const [outcome, setOutcome] = useState('');
  const [finalOrder, setFinalOrder] = useState('');
  const [pedagogicalTakeaways, setPedagogicalTakeaways] = useState('');
  const [factFindingDistinction, setFactFindingDistinction] = useState('');

  // Dynamic Lists
  const [factsTimeline, setFactsTimeline] = useState<{ time: string; event: string }[]>([
    { time: 'Initial Occurrence', event: '' },
  ]);
  const [issuesBeforeCourt, setIssuesBeforeCourt] = useState<string[]>(['']);
  const [sectionsApplied, setSectionsApplied] = useState<{ act: string; section: string; title: string }[]>([
    { act: 'BNS', section: '', title: '' },
  ]);
  const [evidenceList, setEvidenceList] = useState<{ item: string; category: ForensicCategory; probativeValue: string }[]>([]);
  const [legalPrinciples, setLegalPrinciples] = useState<string[]>(['']);
  const [ipcBnsComparison, setIpcBnsComparison] = useState<{ ipc: string; bns: string; difference: string }[]>([]);
  const [relatedCases, setRelatedCases] = useState<string[]>([]);
  const [mediaList, setMediaList] = useState<{ url: string; caption: string; description: string }[]>([]);

  // Load existing data if editing
  useEffect(() => {
    if (isEditing && id) {
      const loadCase = async () => {
        setLoading(true);
        try {
          const data = await api.getCaseStudyBySlug(id);
          if (data) {
            setTitle(data.title || '');
            setCategory(data.category || 'Assault & Bodily Harm');
            setDifficulty(data.difficulty || 'Intermediate');
            setCaseType(data.caseType || 'Criminal Precedent');
            setSummary(data.summary || '');
            setOverview(data.overview || '');
            setCaseReference(data.caseReference || '');
            setCourt(data.court || 'Supreme Court of India');
            setJurisdiction(data.jurisdiction || '');
            setCaseDate(data.date ? data.date.substring(0, 10) : '');
            setDecisionYear(data.decisionYear ? String(data.decisionYear) : '');
            setCitation(data.citation || '');
            setJudgmentUrl(data.judgmentUrl || '');
            setSourceName(data.sourceName || '');
            setVerificationStatus(data.verificationStatus || 'VERIFIED_OFFICIAL_RECORD');
            setCaseStatus(data.caseStatus || 'DECIDED');
            setBackgroundFacts(data.backgroundFacts || '');
            setInvestigationFindings(data.investigationFindings || '');
            setCourtReasoning(data.courtReasoning || '');
            setOutcome(data.outcome || '');
            setFinalOrder(data.finalOrder || '');
            setPedagogicalTakeaways(data.pedagogicalTakeaways || '');
            setFactFindingDistinction(data.factFindingDistinction || '');

            if (data.factsTimeline && data.factsTimeline.length > 0) {
              setFactsTimeline(data.factsTimeline);
            }
            if (data.issuesBeforeCourt && data.issuesBeforeCourt.length > 0) {
              setIssuesBeforeCourt(data.issuesBeforeCourt);
            }
            if (data.sectionsApplied && data.sectionsApplied.length > 0) {
              setSectionsApplied(data.sectionsApplied);
            }
            if (data.evidenceList && data.evidenceList.length > 0) {
              setEvidenceList(data.evidenceList);
            }
            if (data.legalPrinciples && data.legalPrinciples.length > 0) {
              setLegalPrinciples(data.legalPrinciples);
            }
            if (data.ipcBnsComparison && data.ipcBnsComparison.length > 0) {
              setIpcBnsComparison(data.ipcBnsComparison.map((i) => ({ ...i, difference: i.difference || '' })));
            }
            if (data.relatedCases && data.relatedCases.length > 0) {
              setRelatedCases(data.relatedCases);
            }
            if (data.mediaList && data.mediaList.length > 0) {
              setMediaList(data.mediaList.map((m) => ({ url: m.url, caption: m.caption || '', description: m.description || '' })));
            }
          } else {
            setErrorMsg('Case study not found');
          }
        } catch (err: any) {
          setErrorMsg(err.message || 'Failed to load case study');
        } finally {
          setLoading(false);
        }
      };
      loadCase();
    }
  }, [isEditing, id]);

  // Validation
  const validate = (): string | null => {
    if (!title.trim() || title.trim().length < 3) {
      return 'Case study title must be at least 3 characters long.';
    }
    if (!category.trim()) {
      return 'Please select a legal category.';
    }
    if (!summary.trim() || summary.trim().length < 10) {
      return 'Summary is required and must be at least 10 characters long.';
    }
    if (judgmentUrl.trim()) {
      try {
        const u = new URL(judgmentUrl.trim());
        if (u.protocol !== 'http:' && u.protocol !== 'https:') {
          return 'Judgment URL must begin with http:// or https://';
        }
      } catch {
        return 'Please enter a valid judgment source URL.';
      }
    }
    return null;
  };

  // Build Payload
  const buildPayload = (status: 'DRAFT' | 'PUBLISHED'): CreateCaseStudyPayload => {
    const cleanTimeline = factsTimeline.filter((t) => t.event.trim().length > 0);
    const cleanIssues = issuesBeforeCourt.filter((i) => i.trim().length > 0);
    const cleanSections = sectionsApplied.filter((s) => s.section.trim().length > 0);
    const cleanPrinciples = legalPrinciples.filter((p) => p.trim().length > 0);
    const cleanRelated = relatedCases.filter((r) => r.trim().length > 0);
    const cleanMedia = mediaList.filter((m) => m.url.trim().length > 0);

    return {
      title: title.trim(),
      category: category.trim(),
      difficulty,
      caseType: caseType.trim(),
      summary: summary.trim(),
      overview: overview.trim() || summary.trim(),
      caseReference: caseReference.trim() || undefined,
      court: court.trim() || undefined,
      jurisdiction: jurisdiction.trim() || undefined,
      caseDate: caseDate || undefined,
      decisionYear: decisionYear ? parseInt(decisionYear, 10) : undefined,
      citation: citation.trim() || undefined,
      judgmentUrl: judgmentUrl.trim() || undefined,
      sourceName: sourceName.trim() || undefined,
      verificationStatus,
      caseStatus,
      status,
      backgroundFacts: backgroundFacts.trim() || undefined,
      investigationFindings: investigationFindings.trim() || undefined,
      courtReasoning: courtReasoning.trim() || undefined,
      outcome: outcome.trim() || 'Judgment pronounced',
      finalOrder: finalOrder.trim() || undefined,
      pedagogicalTakeaways: pedagogicalTakeaways.trim() || undefined,
      factFindingDistinction: factFindingDistinction.trim() || undefined,
      factsTimeline: cleanTimeline.length > 0 ? cleanTimeline : undefined,
      issuesBeforeCourt: cleanIssues.length > 0 ? cleanIssues : undefined,
      sectionsApplied: cleanSections.length > 0 ? cleanSections : undefined,
      evidenceList: evidenceList.length > 0 ? evidenceList : undefined,
      legalPrinciples: cleanPrinciples.length > 0 ? cleanPrinciples : undefined,
      ipcBnsComparison: ipcBnsComparison.length > 0 ? ipcBnsComparison : undefined,
      relatedCases: cleanRelated.length > 0 ? cleanRelated : undefined,
      mediaList: cleanMedia.length > 0 ? cleanMedia : undefined,
    };
  };

  const handleSave = async (targetStatus: 'DRAFT' | 'PUBLISHED') => {
    setErrorMsg(null);
    setSuccessMsg(null);

    const validationErr = validate();
    if (validationErr) {
      setErrorMsg(validationErr);
      return;
    }

    setSaving(true);
    const payload = buildPayload(targetStatus);

    try {
      if (isEditing && id) {
        await api.updateCaseStudy(id, payload);
        setSuccessMsg(`Case study updated successfully as ${targetStatus === 'PUBLISHED' ? 'Published' : 'Draft'}!`);
      } else {
        const created = await api.createCaseStudy(payload);
        setSuccessMsg(`Case study created successfully as ${targetStatus === 'PUBLISHED' ? 'Published' : 'Draft'}!`);
        setTimeout(() => {
          navigate(`/case-studies/${created.slug || created.id}`);
        }, 1200);
        return;
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save case study.');
    } finally {
      setSaving(false);
    }
  };

  // Preview Object
  const previewCaseStudy: Partial<CaseStudy> = {
    title,
    category,
    difficulty,
    summary,
    overview,
    court,
    decisionYear: decisionYear ? parseInt(decisionYear, 10) : undefined,
    citation,
    backgroundFacts,
    outcome,
    finalOrder,
    status: 'DRAFT',
    sectionsApplied,
    factsTimeline,
    evidenceList,
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-evidence-cyan border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-slate-400 text-sm">Loading case study data...</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={isEditing ? 'Edit Case Study | ForensicIQ' : 'Add Case Study | ForensicIQ'}
        description="Author and publish landmark judicial case studies and Indian forensic analyses."
      />

      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/case-studies"
              className="p-2 rounded-xl bg-forensic-900 border border-forensic-800 text-slate-400 hover:text-white transition-colors"
              title="Return to case studies"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-evidence-cyan" />
                {isEditing ? 'Edit Case Study' : 'Manual Case Study Authoring'}
              </h1>
              <p className="text-xs text-slate-400">
                Author authoritative criminal law precedents with multi-statute (IPC/BNS/BSA) mappings.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setPreviewOpen(true)}
              leftIcon={<Eye className="w-3.5 h-3.5" />}
            >
              Preview
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSave('DRAFT')}
              isLoading={saving}
              leftIcon={<Save className="w-3.5 h-3.5 text-amber-400" />}
              className="text-amber-300 hover:text-amber-200 border border-amber-500/30"
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => handleSave('PUBLISHED')}
              isLoading={saving}
              leftIcon={<Globe className="w-3.5 h-3.5" />}
            >
              {isEditing ? 'Save & Publish' : 'Publish Case Study'}
            </Button>
          </div>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-forensic-900 border border-forensic-800 rounded-xl overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('basic')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'basic'
                ? 'bg-evidence-cyan text-forensic-950 shadow-sm font-bold'
                : 'text-slate-300 hover:bg-forensic-850'
            }`}
          >
            1. Basic Information
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('incident')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'incident'
                ? 'bg-evidence-cyan text-forensic-950 shadow-sm font-bold'
                : 'text-slate-300 hover:bg-forensic-850'
            }`}
          >
            2. Incident &amp; Findings
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('legal')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'legal'
                ? 'bg-evidence-cyan text-forensic-950 shadow-sm font-bold'
                : 'text-slate-300 hover:bg-forensic-850'
            }`}
          >
            3. Legal &amp; Statutory Matrix
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sources')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'sources'
                ? 'bg-evidence-cyan text-forensic-950 shadow-sm font-bold'
                : 'text-slate-300 hover:bg-forensic-850'
            }`}
          >
            4. Sources &amp; Citations
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('media')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeTab === 'media'
                ? 'bg-evidence-cyan text-forensic-950 shadow-sm font-bold'
                : 'text-slate-300 hover:bg-forensic-850'
            }`}
          >
            5. Media &amp; Diagrams
          </button>
        </div>

        {/* Tab 1: Basic Information */}
        {activeTab === 'basic' && (
          <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-forensic-800 pb-3">
              <BookOpen className="w-4 h-4 text-evidence-cyan" />
              Basic Case Study Information
            </h2>

            {/* Title */}
            <div>
              <label htmlFor="cs-title" className="block text-slate-300 font-semibold mb-1">
                Case Study Title <span className="text-red-400">*</span>
              </label>
              <input
                id="cs-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mrs. Veeda Menezes v. Yusuf Khan & Anr. (Public Slap & Slight Harm Doctrine)"
                className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
              />
            </div>

            {/* Category & Difficulty Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="cs-category" className="block text-slate-300 font-semibold mb-1">
                  Category / Crime Type <span className="text-red-400">*</span>
                </label>
                <select
                  id="cs-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2.5 text-white focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="cs-difficulty" className="block text-slate-300 font-semibold mb-1">
                  Learner Difficulty Level
                </label>
                <select
                  id="cs-difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as CaseDifficulty)}
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2.5 text-white focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                >
                  <option value="Beginner">Beginner (Cadet / LLB 1st Year)</option>
                  <option value="Intermediate">Intermediate (Police Inspector / Advocate)</option>
                  <option value="Advanced">Advanced (Forensic Pathologist / Special Prosecutor)</option>
                </select>
              </div>

              <div>
                <label htmlFor="cs-case-type" className="block text-slate-300 font-semibold mb-1">
                  Procedural Case Type
                </label>
                <input
                  id="cs-case-type"
                  type="text"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                  placeholder="e.g. Criminal Appeal (Supreme Court)"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>
            </div>

            {/* Short Summary */}
            <div>
              <label htmlFor="cs-summary" className="block text-slate-300 font-semibold mb-1">
                Executive Pedagogical Summary <span className="text-red-400">*</span>
              </label>
              <textarea
                id="cs-summary"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="2-3 sentence overview explaining the central legal and factual controversy..."
                className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
              />
            </div>

            {/* Court, Reference & Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="cs-court" className="block text-slate-300 font-semibold mb-1">
                  Court / Tribunal Name
                </label>
                <input
                  id="cs-court"
                  type="text"
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  placeholder="e.g. Supreme Court of India"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-reference" className="block text-slate-300 font-semibold mb-1">
                  Docket / Case Reference No.
                </label>
                <input
                  id="cs-reference"
                  type="text"
                  value={caseReference}
                  onChange={(e) => setCaseReference(e.target.value)}
                  placeholder="e.g. Criminal Appeal No. 254 of 1965"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-date" className="block text-slate-300 font-semibold mb-1">
                  Decision Date (Optional)
                </label>
                <input
                  id="cs-date"
                  type="date"
                  value={caseDate}
                  onChange={(e) => {
                    setCaseDate(e.target.value);
                    if (e.target.value) {
                      setDecisionYear(e.target.value.split('-')[0]);
                    }
                  }}
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2 text-white focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-year" className="block text-slate-300 font-semibold mb-1">
                  Decision Year
                </label>
                <input
                  id="cs-year"
                  type="number"
                  value={decisionYear}
                  onChange={(e) => setDecisionYear(e.target.value)}
                  placeholder="e.g. 1966"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Incident & Findings */}
        {activeTab === 'incident' && (
          <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-forensic-800 pb-3">
              <Scale className="w-4 h-4 text-evidence-cyan" />
              Incident Timeline, Facts &amp; Investigation
            </h2>

            {/* Background Facts */}
            <div>
              <label htmlFor="cs-background" className="block text-slate-300 font-semibold mb-1">
                Material Facts from Records
              </label>
              <textarea
                id="cs-background"
                rows={4}
                value={backgroundFacts}
                onChange={(e) => setBackgroundFacts(e.target.value)}
                placeholder="Factual background: who was involved, time and location, sequence of actions, and weapons/instruments..."
                className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
              />
            </div>

            {/* Facts Timeline Dynamic Rows */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">Incident Chronology &amp; Timeline</label>
                <button
                  type="button"
                  onClick={() => setFactsTimeline([...factsTimeline, { time: '', event: '' }])}
                  className="text-evidence-cyan hover:underline flex items-center gap-1 font-semibold text-[11px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Timeline Event
                </button>
              </div>

              {factsTimeline.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.time}
                    onChange={(e) => {
                      const updated = [...factsTimeline];
                      updated[index].time = e.target.value;
                      setFactsTimeline(updated);
                    }}
                    placeholder="e.g. Day 1, 11:00 AM"
                    className="w-1/3 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.event}
                    onChange={(e) => {
                      const updated = [...factsTimeline];
                      updated[index].event = e.target.value;
                      setFactsTimeline(updated);
                    }}
                    placeholder="Event description..."
                    className="flex-1 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />
                  {factsTimeline.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setFactsTimeline(factsTimeline.filter((_, i) => i !== index))}
                      className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Court Reasoning & Order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cs-reasoning" className="block text-slate-300 font-semibold mb-1">
                  Court Reasoning &amp; Ratio Decidendi
                </label>
                <textarea
                  id="cs-reasoning"
                  rows={4}
                  value={courtReasoning}
                  onChange={(e) => setCourtReasoning(e.target.value)}
                  placeholder="How the court interpreted the statute, evaluated precedents, and resolved ambiguity..."
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-outcome" className="block text-slate-300 font-semibold mb-1">
                  Final Judgment &amp; Sentence Order
                </label>
                <textarea
                  id="cs-outcome"
                  rows={4}
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  placeholder="e.g. Conviction upheld; sentence modified to fine under Section 352 IPC..."
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>
            </div>

            {/* Educational Takeaways & Distinctions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cs-takeaways" className="block text-slate-300 font-semibold mb-1">
                  Pedagogical Takeaways for Trainees
                </label>
                <textarea
                  id="cs-takeaways"
                  rows={3}
                  value={pedagogicalTakeaways}
                  onChange={(e) => setPedagogicalTakeaways(e.target.value)}
                  placeholder="Key investigative lessons and evidentiary hygiene rules..."
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-distinction" className="block text-slate-300 font-semibold mb-1">
                  Fact-Finding Distinction Guidance
                </label>
                <textarea
                  id="cs-distinction"
                  rows={3}
                  value={factFindingDistinction}
                  onChange={(e) => setFactFindingDistinction(e.target.value)}
                  placeholder="What factual factors distinguish this case from pending incidents..."
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Legal & Statutory Matrix */}
        {activeTab === 'legal' && (
          <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-forensic-800 pb-3">
              <Scale className="w-4 h-4 text-evidence-cyan" />
              Statutory Sections &amp; IPC ↔ BNS Mapping Matrix
            </h2>

            {/* Sections Applied */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">Statutory Sections Applied in Judgment</label>
                <button
                  type="button"
                  onClick={() => setSectionsApplied([...sectionsApplied, { act: 'BNS', section: '', title: '' }])}
                  className="text-evidence-cyan hover:underline flex items-center gap-1 font-semibold text-[11px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Section
                </button>
              </div>

              {sectionsApplied.map((sec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <select
                    value={sec.act}
                    onChange={(e) => {
                      const updated = [...sectionsApplied];
                      updated[idx].act = e.target.value;
                      setSectionsApplied(updated);
                    }}
                    className="w-28 bg-forensic-950 border border-forensic-750 rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
                  >
                    <option value="BNS">BNS 2023</option>
                    <option value="IPC">IPC 1860</option>
                    <option value="BSA">BSA 2023</option>
                    <option value="BNSS">BNSS 2023</option>
                    <option value="NDPS">NDPS Act</option>
                    <option value="IT_ACT">IT Act 2000</option>
                  </select>

                  <input
                    type="text"
                    value={sec.section}
                    onChange={(e) => {
                      const updated = [...sectionsApplied];
                      updated[idx].section = e.target.value;
                      setSectionsApplied(updated);
                    }}
                    placeholder="e.g. Section 131"
                    className="w-36 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />

                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => {
                      const updated = [...sectionsApplied];
                      updated[idx].title = e.target.value;
                      setSectionsApplied(updated);
                    }}
                    placeholder="Provision title, e.g. Assault or criminal force otherwise than on grave provocation"
                    className="flex-1 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />

                  {sectionsApplied.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSectionsApplied(sectionsApplied.filter((_, i) => i !== idx))}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* IPC ↔ BNS Comparative Mapping */}
            <div className="space-y-3 pt-3 border-t border-forensic-800">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">IPC ↔ BNS Comparative Mapping</label>
                <button
                  type="button"
                  onClick={() => setIpcBnsComparison([...ipcBnsComparison, { ipc: '', bns: '', difference: '' }])}
                  className="text-evidence-cyan hover:underline flex items-center gap-1 font-semibold text-[11px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Comparative Mapping
                </button>
              </div>

              {ipcBnsComparison.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.ipc}
                    onChange={(e) => {
                      const updated = [...ipcBnsComparison];
                      updated[idx].ipc = e.target.value;
                      setIpcBnsComparison(updated);
                    }}
                    placeholder="Historical IPC Section (e.g. Sec 352)"
                    className="w-48 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.bns}
                    onChange={(e) => {
                      const updated = [...ipcBnsComparison];
                      updated[idx].bns = e.target.value;
                      setIpcBnsComparison(updated);
                    }}
                    placeholder="Modern BNS Section (e.g. Sec 131)"
                    className="w-48 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={item.difference}
                    onChange={(e) => {
                      const updated = [...ipcBnsComparison];
                      updated[idx].difference = e.target.value;
                      setIpcBnsComparison(updated);
                    }}
                    placeholder="Key variation / fine adjustment..."
                    className="flex-1 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setIpcBnsComparison(ipcBnsComparison.filter((_, i) => i !== idx))}
                    className="p-1.5 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Legal Principles */}
            <div className="space-y-3 pt-3 border-t border-forensic-800">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">Important Legal Principles &amp; Doctrinal Rules</label>
                <button
                  type="button"
                  onClick={() => setLegalPrinciples([...legalPrinciples, ''])}
                  className="text-evidence-cyan hover:underline flex items-center gap-1 font-semibold text-[11px]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Principle
                </button>
              </div>

              {legalPrinciples.map((prin, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={prin}
                    onChange={(e) => {
                      const updated = [...legalPrinciples];
                      updated[idx] = e.target.value;
                      setLegalPrinciples(updated);
                    }}
                    placeholder="e.g. An intentional public slap causing humiliation cannot be dismissed as a trifle under Section 95 IPC."
                    className="flex-1 bg-forensic-950 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                  />
                  {legalPrinciples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setLegalPrinciples(legalPrinciples.filter((_, i) => i !== idx))}
                      className="p-1.5 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Sources & Verification */}
        {activeTab === 'sources' && (
          <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-forensic-800 pb-3">
              <BookOpen className="w-4 h-4 text-evidence-cyan" />
              Judicial Sources, Official Citations &amp; Verification
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cs-citation" className="block text-slate-300 font-semibold mb-1">
                  Official Reporter Citation
                </label>
                <input
                  id="cs-citation"
                  type="text"
                  value={citation}
                  onChange={(e) => setCitation(e.target.value)}
                  placeholder="e.g. AIR 1966 SC 1773; (1966) Supp SCR 123"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-judgment-url" className="block text-slate-300 font-semibold mb-1">
                  Original Judgment URL (Supreme Court / High Court)
                </label>
                <input
                  id="cs-judgment-url"
                  type="url"
                  value={judgmentUrl}
                  onChange={(e) => setJudgmentUrl(e.target.value)}
                  placeholder="https://main.sci.gov.in/judgment/judis/..."
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-source-name" className="block text-slate-300 font-semibold mb-1">
                  Official Source Name
                </label>
                <input
                  id="cs-source-name"
                  type="text"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  placeholder="e.g. Supreme Court Reports (SCR) / eCourts Portal"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="cs-verification" className="block text-slate-300 font-semibold mb-1">
                  Verification Status
                </label>
                <select
                  id="cs-verification"
                  value={verificationStatus}
                  onChange={(e) => setVerificationStatus(e.target.value)}
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3.5 py-2.5 text-white focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
                >
                  <option value="VERIFIED_OFFICIAL_RECORD">Official Record - Verified (Supreme Court / High Court)</option>
                  <option value="SOURCE_VERIFIED">Source Verified (Bar / Academy Corpus)</option>
                  <option value="MANUAL_ENTRY">Manual Entry (Faculty Draft)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Media & Diagrams */}
        {activeTab === 'media' && (
          <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
            <div className="flex items-center justify-between border-b border-forensic-800 pb-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-evidence-cyan" />
                Case Diagrams &amp; Evidence Photography
              </h2>
              <button
                type="button"
                onClick={() => setMediaList([...mediaList, { url: '', caption: '', description: '' }])}
                className="text-evidence-cyan hover:underline flex items-center gap-1 font-semibold text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Media / Diagram
              </button>
            </div>

            {mediaList.length === 0 ? (
              <div className="text-center py-8 text-slate-400 space-y-2">
                <ImageIcon className="w-8 h-8 mx-auto text-slate-600" />
                <p>No diagrams or images attached. Media is optional.</p>
              </div>
            ) : (
              mediaList.map((media, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-forensic-950 border border-forensic-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300">Media #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => setMediaList(mediaList.filter((_, i) => i !== idx))}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="url"
                      value={media.url}
                      onChange={(e) => {
                        const updated = [...mediaList];
                        updated[idx].url = e.target.value;
                        setMediaList(updated);
                      }}
                      placeholder="Image or Diagram URL (https://...)"
                      className="w-full bg-forensic-900 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={media.caption}
                      onChange={(e) => {
                        const updated = [...mediaList];
                        updated[idx].caption = e.target.value;
                        setMediaList(updated);
                      }}
                      placeholder="Caption, e.g. Crime Scene Layout"
                      className="w-full bg-forensic-900 border border-forensic-750 rounded-lg px-3 py-1.5 text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Bottom Save & Publish CTAs */}
        <div className="flex items-center justify-between pt-4 border-t border-forensic-800">
          <Link to="/case-studies">
            <Button type="button" variant="ghost" size="sm">
              Cancel
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setPreviewOpen(true)}
              leftIcon={<Eye className="w-3.5 h-3.5" />}
            >
              Live Preview
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => handleSave('DRAFT')}
              isLoading={saving}
              leftIcon={<Save className="w-3.5 h-3.5 text-amber-400" />}
              className="text-amber-300 hover:text-amber-200 border border-amber-500/30"
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => handleSave('PUBLISHED')}
              isLoading={saving}
              leftIcon={<Globe className="w-3.5 h-3.5" />}
            >
              {isEditing ? 'Save & Publish' : 'Publish Case Study'}
            </Button>
          </div>
        </div>

        {/* Live Preview Modal */}
        <CaseStudyPreviewModal
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          caseStudy={previewCaseStudy}
        />
      </div>
    </>
  );
};
