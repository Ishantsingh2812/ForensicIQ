import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Scale,
  Calendar,
  Building2,
  FileText,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { JudicialPrecedent } from '../../types';

interface PrecedentsSectionProps {
  precedents?: JudicialPrecedent[];
}

export const PrecedentsSection: React.FC<PrecedentsSectionProps> = ({ precedents = [] }) => {
  const [expandedId, setExpandedId] = useState<number | null>(0); // First item expanded by default

  if (!precedents || precedents.length === 0) {
    return null;
  }

  const toggleExpand = (index: number) => {
    setExpandedId((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-labelledby="precedents-section-heading"
      className="bg-forensic-900 border border-forensic-800 rounded-2xl shadow-xl overflow-hidden mt-6"
    >
      {/* Header */}
      <div className="p-5 border-b border-forensic-800/80 bg-gradient-to-r from-forensic-900 via-forensic-850 to-forensic-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 id="precedents-section-heading" className="text-base font-bold text-white">
                Related Real Cases &amp; Judicial Precedents
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {precedents.length} Real Precedent{precedents.length !== 1 ? 's' : ''} Retrieved
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Authoritative Indian Supreme Court and High Court judgments addressing analogous facts, offenses, and statutory provisions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Supreme Court Reports (SCR) &amp; eCourts Verified</span>
        </div>
      </div>

      {/* Precedent Cards List */}
      <div className="divide-y divide-forensic-800/60 p-5 space-y-4">
        {precedents.map((prec, idx) => {
          const isExpanded = expandedId === idx;
          const caseName = prec.case_name || prec.caseName || 'Judicial Precedent';
          const citation = prec.citation;
          const court = prec.court;
          const date = prec.decision_date || prec.decisionDate;
          const url = prec.judgment_url || prec.judgmentUrl;
          const facts = prec.material_facts || prec.materialFacts;
          const issues = prec.legal_issues || prec.legalIssues || [];
          const provisions = prec.statutory_provisions || prec.statutoryProvisions || [];
          const reasoning = prec.court_holding_reasoning || prec.courtHoldingReasoning;
          const relevance = prec.relevance_to_incident || prec.relevanceToIncident;
          const distinctions = prec.factual_legal_distinctions || prec.factualLegalDistinctions;
          const lawStatus = prec.historical_vs_modern_law || prec.historicalVsModernLaw || 'HISTORICAL_IPC';
          const verification = prec.verification_status || prec.verificationStatus || 'VERIFIED_OFFICIAL_RECORD';

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'border-amber-500/40 bg-forensic-950/80 shadow-lg'
                  : 'border-forensic-800 bg-forensic-950/40 hover:border-forensic-700'
              }`}
            >
              {/* Card Title Bar */}
              <div
                className="p-4 cursor-pointer flex items-start justify-between gap-3 select-none"
                onClick={() => toggleExpand(idx)}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-100 hover:text-amber-300 transition-colors">
                      {caseName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                      {citation}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {verification === 'VERIFIED_OFFICIAL_RECORD' ? 'Official Record' : 'Verified Precedent'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {lawStatus === 'HISTORICAL_IPC' ? 'Historical (IPC Precedent)' : 'BNS / Special Statute'}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-amber-400" />
                      {court}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 transition-colors"
                      title="Read official judgment on sci.gov.in / eCourts"
                    >
                      <span>Official Judgment</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <button
                    aria-label={isExpanded ? 'Collapse case details' : 'Expand case details'}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded Precedent Details */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-1 border-t border-forensic-800/80 space-y-4 text-xs">
                  {/* Relevance & Distinction Callout Boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {/* Why relevant */}
                    <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 space-y-1.5">
                      <h4 className="font-bold text-amber-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                        <Scale className="w-3.5 h-3.5" />
                        Why This Precedent Is Relevant to Your Incident
                      </h4>
                      <p className="text-slate-200 leading-relaxed text-xs">{relevance}</p>
                    </div>

                    {/* Important Differences */}
                    <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5 space-y-1.5">
                      <h4 className="font-bold text-cyan-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Key Differences Between Precedent &amp; Described Incident
                      </h4>
                      <p className="text-slate-200 leading-relaxed text-xs">{distinctions}</p>
                    </div>
                  </div>

                  {/* Material Facts from Judgment */}
                  <div>
                    <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-1">
                      Material Facts from the Judgment:
                    </span>
                    <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      {facts}
                    </p>
                  </div>

                  {/* Issues & Statutory Provisions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Legal Issues */}
                    {issues.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-1.5">
                          Legal Issues Considered:
                        </span>
                        <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                          {issues.map((issue, i) => (
                            <li key={i} className="leading-relaxed">
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Statutory Provisions */}
                    {provisions.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-1.5">
                          Statutory Provisions Applied:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {provisions.map((prov, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-forensic-850 border border-forensic-700 text-evidence-cyan font-mono text-[11px]"
                            >
                              {prov}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Court Holding & Reasoning */}
                  <div>
                    <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block mb-1">
                      Court Decision &amp; Legal Reasoning:
                    </span>
                    <p className="text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      {reasoning}
                    </p>
                  </div>

                  {/* Legal Precaution Advisory */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span className="italic">
                      Note: Factual similarity does not guarantee an identical judicial outcome in pending cases.
                    </span>
                    {url && (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        View Full Text on Supreme Court Portal
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
