import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CaseStudy } from '../../types';
import { Scale, Calendar, Building2, ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

interface CaseStudyPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: Partial<CaseStudy>;
}

export const CaseStudyPreviewModal: React.FC<CaseStudyPreviewModalProps> = ({
  isOpen,
  onClose,
  caseStudy,
}) => {
  if (!caseStudy) return null;

  const title = caseStudy.title || 'Untitled Case Study';
  const category = caseStudy.category || 'General Criminal Law';
  const court = caseStudy.court || 'Court / Forum not specified';
  const year = caseStudy.decisionYear || (caseStudy.date ? caseStudy.date.split('-')[0] : 'N/A');
  const summary = caseStudy.summary || 'No summary provided.';
  const background = caseStudy.backgroundFacts || caseStudy.overview || 'No background facts documented yet.';
  const outcome = caseStudy.outcome || caseStudy.finalOrder || 'Judgment outcome pending.';
  const status = caseStudy.status || 'DRAFT';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Case Study Preview"
      description="Live preview of how this case study appears to law learners and faculty"
      maxWidth="2xl"
    >
      <div className="space-y-5 text-xs max-h-[75vh] overflow-y-auto pr-2">
        {/* Status & Category Bar */}
        <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-forensic-900 border border-forensic-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-evidence-cyan/20 text-evidence-cyan border border-evidence-cyan/40">
              {category}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                status === 'PUBLISHED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {status === 'PUBLISHED' ? 'Published' : 'Draft Preview'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>{year}</span>
          </div>
        </div>

        {/* Title & Citation */}
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-white leading-snug">{title}</h2>
          <div className="flex flex-wrap items-center gap-3 text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{court}</span>
            </span>
            {caseStudy.citation && (
              <span className="font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                {caseStudy.citation}
              </span>
            )}
          </div>
        </div>

        {/* Summary Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Executive Summary</span>
          <p className="text-slate-200 leading-relaxed">{summary}</p>
        </div>

        {/* Background Facts */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Background & Facts</span>
          <p className="text-slate-300 leading-relaxed bg-forensic-950 p-3.5 rounded-xl border border-forensic-800">
            {background}
          </p>
        </div>

        {/* Sections Applied */}
        {caseStudy.sectionsApplied && caseStudy.sectionsApplied.length > 0 && (
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Statutory Provisions</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseStudy.sectionsApplied.map((sec, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-forensic-900 border border-forensic-800 flex items-center justify-between">
                  <span className="font-mono font-bold text-evidence-cyan">{sec.section}</span>
                  <span className="text-[11px] text-slate-300 truncate max-w-[180px]">{sec.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Court Reasoning & Outcome */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Court Decision & Order</span>
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 leading-relaxed">
            {outcome}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-3 border-t border-forensic-800">
          <Button type="button" variant="primary" size="sm" onClick={onClose}>
            Back to Editor
          </Button>
        </div>
      </div>
    </Modal>
  );
};
