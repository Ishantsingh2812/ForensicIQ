import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../../types';
import { Badge } from '../ui/Badge';
import {
  Calendar,
  Building2,
  ArrowRight,
  ShieldCheck,
  Edit3,
  Globe,
  EyeOff,
  Trash2,
  FileEdit,
  CheckCircle,
} from 'lucide-react';

interface CaseCardProps {
  caseStudy: CaseStudy;
  canManage?: boolean;
  onEdit?: (caseStudy: CaseStudy) => void;
  onToggleStatus?: (caseStudy: CaseStudy) => void;
  onDelete?: (caseStudy: CaseStudy) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  caseStudy,
  canManage = false,
  onEdit,
  onToggleStatus,
  onDelete,
}) => {
  const categoryVariantMap: Record<string, 'crime' | 'evidence' | 'police' | 'legal' | 'neutral'> = {
    NDPS: 'police',
    'Property Theft': 'crime',
    Robbery: 'crime',
    'Grievous Hurt': 'police',
    Murder: 'police',
    'Assault & Bodily Harm': 'police',
    'Electronic Evidence': 'evidence',
    'Civil Dispute': 'legal',
  };

  const court = caseStudy.court || caseStudy.jurisdiction || 'Supreme Court of India';
  const year = caseStudy.decisionYear || (caseStudy.date ? caseStudy.date.split('-')[0] : '1966');
  const isDraft = caseStudy.status === 'DRAFT';

  return (
    <article
      aria-labelledby={`case-title-${caseStudy.id}`}
      className={`bg-forensic-900 border rounded-2xl p-6 shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 ${
        isDraft
          ? 'border-amber-500/40 bg-forensic-900/90'
          : 'border-forensic-800 hover:border-evidence-cyan/40 hover:shadow-forensic-glow'
      }`}
    >
      <div className="space-y-3">
        {/* Top Badges: Category, Verification, Status, Difficulty */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={categoryVariantMap[caseStudy.category] || 'neutral'}>
              {caseStudy.category}
            </Badge>

            {/* Publication Status Badge */}
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 font-semibold ${
                isDraft
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}
            >
              {isDraft ? (
                <>
                  <FileEdit className="w-3 h-3 text-amber-400" />
                  Draft
                </>
              ) : (
                <>
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  Published
                </>
              )}
            </span>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          </div>

          <span className="text-xs font-mono px-2 py-0.5 rounded bg-forensic-850 text-slate-400 border border-forensic-800">
            {caseStudy.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 id={`case-title-${caseStudy.id}`} className="text-base font-bold text-white line-clamp-2">
          <Link
            to={`/case-studies/${caseStudy.slug || caseStudy.id}`}
            className="hover:text-evidence-cyan transition-colors"
          >
            {caseStudy.title}
          </Link>
        </h3>

        {/* Citation & Court Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate max-w-[200px]">{court}</span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{year}</span>
          </span>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
          {caseStudy.summary}
        </p>

        {/* Statutory Sections Applied Preview */}
        {caseStudy.sectionsApplied && caseStudy.sectionsApplied.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {caseStudy.sectionsApplied.map((sec, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-forensic-950 text-evidence-cyan border border-forensic-800"
              >
                {sec.section}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info & Action Controls */}
      <div className="pt-3 border-t border-forensic-800/80 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px] font-mono text-slate-400 truncate max-w-[180px]">
            {caseStudy.citation || `${caseStudy.jurisdiction}`}
          </span>

          <Link
            to={`/case-studies/${caseStudy.slug || caseStudy.id}`}
            className="text-evidence-cyan hover:text-evidence-glow font-semibold flex items-center gap-1 group shrink-0"
          >
            <span>Full Case Study</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Author & Faculty Management Action Buttons */}
        {canManage && (
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-forensic-800/50">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(caseStudy)}
                aria-label={`Edit ${caseStudy.title}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 bg-forensic-850 hover:bg-forensic-800 hover:text-white border border-forensic-750 transition-colors"
              >
                <Edit3 className="w-3 h-3 text-cyan-400" />
                <span>Edit</span>
              </button>
            )}

            {onToggleStatus && (
              <button
                type="button"
                onClick={() => onToggleStatus(caseStudy)}
                aria-label={isDraft ? 'Publish case study' : 'Unpublish case study'}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  isDraft
                    ? 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-500/40'
                    : 'text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 border-amber-500/40'
                }`}
              >
                {isDraft ? (
                  <>
                    <Globe className="w-3 h-3 text-emerald-400" />
                    <span>Publish</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3 h-3 text-amber-400" />
                    <span>Unpublish</span>
                  </>
                )}
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(caseStudy)}
                aria-label={`Delete ${caseStudy.title}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-red-400 bg-red-950/30 hover:bg-red-900/50 hover:text-red-300 border border-red-500/30 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
