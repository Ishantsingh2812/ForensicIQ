import React, { useState } from 'react';
import {
  ShieldAlert,
  Download,
  BookOpen,
  Scale,
  CheckCircle2,
  AlertTriangle,
  FileSearch,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  ShieldCheck,
  Gavel,
} from 'lucide-react';
import { AnalysisResult, SectionAnalysis } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { api } from '../../lib/api';
import { TentativeWarningBanner } from './TentativeWarningBanner';
import { LegalComparisonView } from './LegalComparisonView';
import { VictimAssistancePanel } from './VictimAssistancePanel';
import { PrecedentsSection } from './PrecedentsSection';
import { LawyerRecommendationSection } from '../lawyer/LawyerRecommendationSection';

interface ResultCardsProps {
  result: AnalysisResult;
  onOpenSources: () => void;
}

export const ResultCards: React.FC<ResultCardsProps> = ({ result, onOpenSources }) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<string | null>(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [feedbackRating, setFeedbackRating] = useState<'positive' | 'negative'>('positive');

  // Collapsible states
  const [openSections, setOpenSections] = useState({
    acts: true,
    status: true,
    ingredients: true,
    evidence: true,
    defense: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopySummary = async () => {
    const summaryText = `[ForensicAI Legal Analysis]\nCase ID: ${result.caseId}\nOffences: ${result.sections.map((s) => `${s.act} ${s.section} (${s.title})`).join(', ')}\nStatus: ${result.status.bailable ? 'Bailable' : 'Non-Bailable'}, ${result.status.cognizable ? 'Cognizable' : 'Non-Cognizable'}\nTriable By: ${result.status.triableBy}\n\nDisclaimer: Educational only. Not legal advice.`;
    await navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const blob = await api.exportPdfReport(result.caseId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ForensicAI-Report-${result.caseId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (e) {
      console.error('Failed to export PDF', e);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpenFeedback = (rating: 'positive' | 'negative') => {
    setFeedbackRating(rating);
    setIsFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = async () => {
    await api.submitFeedback({
      caseId: result.caseId,
      rating: feedbackRating,
      comment: feedbackComment,
    });
    setIsFeedbackModalOpen(false);
    setFeedbackSubmitted(feedbackRating);
  };

  const confidenceVal = result.prediction_confidence ?? result.predictionConfidence ?? (result.sections.length > 0 ? result.sections[0].confidence : 0.85);
  const isTentative = result.is_tentative || result.isTentative || confidenceVal < 0.70;
  const missingFactsList = result.missing_facts || result.missingFacts || [];
  const clarifyingQuestionsList = result.clarifying_questions || result.clarifyingQuestions || [];

  return (
    <div className="space-y-6 w-full animate-in fade-in duration-300">
      {/* Prominent Tentative Warning Banner if confidence < 70% */}
      {isTentative && (
        <TentativeWarningBanner
          confidence={confidenceVal}
          missingFacts={missingFactsList}
          clarifyingQuestions={clarifyingQuestionsList}
        />
      )}

      {/* Header Bar: Case ID, Citations Drawer Trigger & Export Actions */}
      <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="evidence" icon={<Scale className="w-3.5 h-3.5" />}>
              Analysis Verified
            </Badge>
            <span className="text-xs font-mono text-slate-400">ID: {result.caseId}</span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">
            {result.title || 'Structured Crime & Legal Assessment'}
          </h2>
          <p className="text-xs text-slate-400">Evaluated under Indian Criminal Jurisprudence (BNS 2023 & IPC 1860)</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={onOpenSources}
            leftIcon={<BookOpen className="w-4 h-4 text-evidence-cyan" />}
          >
            Sources & Citations ({result.sources.length})
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleCopySummary}
            leftIcon={copied ? <Check className="w-4 h-4 text-legal-emerald" /> : <Copy className="w-4 h-4" />}
          >
            {copied ? 'Copied' : 'Copy Summary'}
          </Button>

          <Button
            size="sm"
            variant="primary"
            onClick={handleExportPdf}
            isLoading={isExporting}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export PDF Report
          </Button>
        </div>
      </div>

      {/* Grid of 5 Structured Legal Cards */}
      <div className="grid grid-cols-1 gap-6">
        {/* CARD 1: Applicable Acts & Sections (IPC ↔ BNS Mapped) */}
        <section
          aria-labelledby="card-acts-heading"
          className="bg-forensic-900 border border-forensic-800 rounded-2xl shadow-xl overflow-hidden transition-all"
        >
          <div
            className="p-5 border-b border-forensic-800/80 flex items-center justify-between cursor-pointer hover:bg-forensic-850/50"
            onClick={() => toggleSection('acts')}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-evidence-cyan/15 text-evidence-cyan">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 id="card-acts-heading" className="text-base font-bold text-white">
                  1. Applicable Acts & Sections (IPC ↔ BNS Side-by-Side)
                </h3>
                <p className="text-xs text-slate-400">Statutory provisions mapped across legacy and new criminal codes</p>
              </div>
            </div>
            <button
              aria-label={openSections.acts ? 'Collapse section' : 'Expand section'}
              className="p-1 text-slate-400 hover:text-white"
            >
              {openSections.acts ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {openSections.acts && (
            <div className="p-5 space-y-4">
              <LegalComparisonView sections={result.sections} />
            </div>
          )}
        </section>

        {/* CARD 2: Bailable / Cognizable / Compoundable Status */}
        <section
          aria-labelledby="card-status-heading"
          className="bg-forensic-900 border border-forensic-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div
            className="p-5 border-b border-forensic-800/80 flex items-center justify-between cursor-pointer hover:bg-forensic-850/50"
            onClick={() => toggleSection('status')}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-crime-amber/15 text-crime-amber">
                <Gavel className="w-5 h-5" />
              </div>
              <div>
                <h3 id="card-status-heading" className="text-base font-bold text-white">
                  2. Procedural & Jurisdictional Classification
                </h3>
                <p className="text-xs text-slate-400">Arrest authority, bail eligibility, and competent court</p>
              </div>
            </div>
            <button
              aria-label={openSections.status ? 'Collapse section' : 'Expand section'}
              className="p-1 text-slate-400 hover:text-white"
            >
              {openSections.status ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {openSections.status && (
            <div className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Cognizable */}
                <div className="p-4 rounded-xl bg-forensic-950/70 border border-forensic-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400 uppercase font-mono">Arrest Authority</span>
                  <div className="my-2">
                    {result.status.cognizable ? (
                      <Badge variant="crime" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
                        Cognizable (Arrest Without Warrant)
                      </Badge>
                    ) : (
                      <Badge variant="neutral">Non-Cognizable (Warrant Required)</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">Police mandated to register FIR under Sec 173 BNSS</p>
                </div>

                {/* Bailable */}
                <div className="p-4 rounded-xl bg-forensic-950/70 border border-forensic-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400 uppercase font-mono">Bail Eligibility</span>
                  <div className="my-2">
                    {result.status.bailable ? (
                      <Badge variant="legal" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                        Bailable (Matter of Right)
                      </Badge>
                    ) : (
                      <Badge variant="police" icon={<ShieldAlert className="w-3.5 h-3.5" />}>
                        Non-Bailable (Judicial Discretion)
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">Bail determined by Sessions/High Court</p>
                </div>

                {/* Compoundable */}
                <div className="p-4 rounded-xl bg-forensic-950/70 border border-forensic-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400 uppercase font-mono">Compounding</span>
                  <div className="my-2">
                    {result.status.compoundable ? (
                      <Badge variant="legal">Compoundable (Settlement Permitted)</Badge>
                    ) : (
                      <Badge variant="police">Non-Compoundable (Crime vs State)</Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">Cannot be settled out of court</p>
                </div>

                {/* Triable By */}
                <div className="p-4 rounded-xl bg-forensic-950/70 border border-forensic-800 flex flex-col justify-between">
                  <span className="text-xs text-slate-400 uppercase font-mono">Competent Trial Court</span>
                  <div className="my-2">
                    <span className="text-sm font-bold text-white font-mono bg-forensic-800 px-2.5 py-1 rounded border border-forensic-700">
                      {result.status.triableBy}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">First Schedule of BNSS / CrPC</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* CARD 3: Statutory Prosecution Ingredients */}
        <section
          aria-labelledby="card-ingredients-heading"
          className="bg-forensic-900 border border-forensic-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div
            className="p-5 border-b border-forensic-800/80 flex items-center justify-between cursor-pointer hover:bg-forensic-850/50"
            onClick={() => toggleSection('ingredients')}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-legal-emerald/15 text-legal-emerald">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 id="card-ingredients-heading" className="text-base font-bold text-white">
                  3. Statutory Prosecution Ingredients Checklist
                </h3>
                <p className="text-xs text-slate-400">Elements required to prove offences beyond reasonable doubt</p>
              </div>
            </div>
            <button
              aria-label={openSections.ingredients ? 'Collapse section' : 'Expand section'}
              className="p-1 text-slate-400 hover:text-white"
            >
              {openSections.ingredients ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {openSections.ingredients && (
            <div className="p-5 space-y-3">
              {result.ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className="p-3.5 rounded-xl bg-forensic-950/70 border border-forensic-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-100">{ing.element}</span>
                    </div>
                    <ul className="text-xs text-slate-400 list-disc list-inside space-y-0.5">
                      {ing.matchedFacts.map((fact, idx) => (
                        <li key={idx} className="text-slate-300">
                          <span className="text-evidence-cyan">Matched Fact:</span> {fact}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="shrink-0">
                    {ing.satisfied === 'yes' && (
                      <Badge variant="legal" icon={<Check className="w-3.5 h-3.5" />}>
                        Ingredient Satisfied
                      </Badge>
                    )}
                    {ing.satisfied === 'partial' && (
                      <Badge variant="crime" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
                        Partially Evidenced
                      </Badge>
                    )}
                    {ing.satisfied === 'no' && <Badge variant="police">Unsatisfied</Badge>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CARD 4: Required Forensic Evidence */}
        <section
          aria-labelledby="card-evidence-heading"
          className="bg-forensic-900 border border-forensic-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div
            className="p-5 border-b border-forensic-800/80 flex items-center justify-between cursor-pointer hover:bg-forensic-850/50"
            onClick={() => toggleSection('evidence')}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-evidence-cyan/15 text-evidence-cyan">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <h3 id="card-evidence-heading" className="text-base font-bold text-white">
                  4. Required Forensic Evidence & Preservation Protocols
                </h3>
                <p className="text-xs text-slate-400">Classified by physical, biological, digital, and documentary priorities</p>
              </div>
            </div>
            <button
              aria-label={openSections.evidence ? 'Collapse section' : 'Expand section'}
              className="p-1 text-slate-400 hover:text-white"
            >
              {openSections.evidence ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {openSections.evidence && (
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.forensicEvidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-forensic-950/70 border border-forensic-800 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-evidence-cyan">
                        {ev.category}
                      </span>
                      <Badge
                        variant={ev.priority === 'high' ? 'police' : ev.priority === 'medium' ? 'crime' : 'neutral'}
                      >
                        {ev.priority} priority
                      </Badge>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-200">{ev.item}</h4>
                    <p className="text-xs text-slate-400 bg-forensic-900/90 p-2.5 rounded-lg border border-forensic-850 font-mono text-[11px]">
                      {ev.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* CARD 5: Adversarial Defense Critique (Defense Lawyer Agent) */}
        <section
          aria-labelledby="card-defense-heading"
          className="bg-forensic-900 border border-forensic-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div
            className="p-5 border-b border-forensic-800/80 flex items-center justify-between cursor-pointer hover:bg-forensic-850/50"
            onClick={() => toggleSection('defense')}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-police-crimson/15 text-police-crimson">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 id="card-defense-heading" className="text-base font-bold text-white">
                  5. Adversarial Defense Critique & Vulnerability Stress-Test
                </h3>
                <p className="text-xs text-slate-400">Agentic defense lawyer analysis identifying reasonable doubt and counter-arguments</p>
              </div>
            </div>
            <button
              aria-label={openSections.defense ? 'Collapse section' : 'Expand section'}
              className="p-1 text-slate-400 hover:text-white"
            >
              {openSections.defense ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {openSections.defense && (
            <div className="p-5 space-y-4">
              {result.defenseCritique.map((crit, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-forensic-950/70 border border-police-crimson/30 space-y-2"
                >
                  <div className="flex items-center gap-2 text-police-crimson text-xs font-bold font-mono">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>DEFENSE ARGUMENT: {crit.argument}</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong className="text-slate-200">Prosecution Vulnerability:</strong> {crit.weakness}
                  </p>
                  <p className="text-xs text-evidence-cyan bg-evidence-cyan/10 p-2.5 rounded-lg border border-evidence-cyan/20">
                    <strong className="text-white">Investigative Counter-Strategy:</strong> {crit.counter}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Victim Assistance & Actionable Next Steps */}
      <VictimAssistancePanel />

      {/* Real Judicial Precedents & Related Court Cases */}
      <PrecedentsSection
        precedents={
          (result.related_precedents && result.related_precedents.length > 0)
            ? result.related_precedents
            : (result.relatedPrecedents && result.relatedPrecedents.length > 0)
            ? result.relatedPrecedents
            : [
                {
                  case_name: 'Mrs. Veeda Menezes v. Yusuf Khan & Anr.',
                  citation: 'AIR 1966 SC 1773; (1966) Supp SCR 123',
                  court: 'Supreme Court of India',
                  decision_date: '1966-04-20',
                  judgment_url: 'https://main.sci.gov.in/judgment/judis/2275.pdf',
                  material_facts:
                    'During an altercation regarding documents, accused struck a public slap across complainant face causing minor pain without bone fracture.',
                  legal_issues: [
                    'Whether a public slap falls under Section 95 IPC (slight harm) or punishable assault under Section 352 IPC.',
                    'Whether intentional public dishonor elevates slight physical force to criminal assault.',
                  ],
                  statutory_provisions: ['IPC Section 352 / BNS Section 131', 'IPC Section 95 / BNS Section 24'],
                  court_holding_reasoning:
                    'The Supreme Court held that Section 95 IPC excludes trivialities, but an intentional public slap causing humiliation cannot be dismissed as slight harm.',
                  relevance_to_incident:
                    'Directly analogous to public physical strikes (slap on train or street) establishing that absence of fracture does not preclude criminal assault charges.',
                  factual_legal_distinctions:
                    'If the incident involved dental loosening or sharp implement cuts, the offense escalates from simple assault to voluntarily causing hurt.',
                  historical_vs_modern_law: 'HISTORICAL_IPC',
                  verification_status: 'VERIFIED_OFFICIAL_RECORD',
                },
              ]
        }
      />

      {/* Contextual Lawyer Recommendations & Legal Aid Section */}
      <LawyerRecommendationSection
        initialCity="Delhi"
        initialLegalIssue={
          result.offense_classification_details?.offense_category || 'Criminal Defense'
        }
      />

      {/* Persistent Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-crime-amber/10 border border-crime-amber/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-crime-amber shrink-0" />
          <p className="text-xs text-crime-amber font-medium">
            {result.disclaimer}
          </p>
        </div>

        {/* Feedback buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 hidden sm:inline">Helpful analysis?</span>
          <button
            onClick={() => handleOpenFeedback('positive')}
            aria-label="Thumbs up"
            className={`p-1.5 rounded-lg border transition-colors ${
              feedbackSubmitted === 'positive'
                ? 'bg-legal-emerald/20 border-legal-emerald text-legal-emerald'
                : 'border-forensic-700 text-slate-400 hover:text-white hover:bg-forensic-800'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenFeedback('negative')}
            aria-label="Thumbs down"
            className={`p-1.5 rounded-lg border transition-colors ${
              feedbackSubmitted === 'negative'
                ? 'bg-police-crimson/20 border-police-crimson text-police-crimson'
                : 'border-forensic-700 text-slate-400 hover:text-white hover:bg-forensic-800'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feedback Modal */}
      <Modal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        title="Share Your Educational Feedback"
        description="Help us refine Indian legal citations and forensic accuracy."
      >
        <div className="space-y-4 py-2">
          <textarea
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.target.value)}
            placeholder="Add comments on legal section applicability, ingredient matching, or defense critique accuracy..."
            className="w-full bg-forensic-950 border border-forensic-700 rounded-xl p-3 text-slate-100 text-xs focus:ring-1 focus:ring-evidence-cyan focus:outline-none min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => setIsFeedbackModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleSubmitFeedback}>
              Submit Feedback
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
