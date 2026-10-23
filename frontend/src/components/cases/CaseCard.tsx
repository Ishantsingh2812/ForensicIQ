import React from 'react';
import { Link } from 'react-router-dom';
import { CaseStudy } from '../../types';
import { Badge } from '../ui/Badge';
import { Calendar, MapPin, ArrowRight, Scale, Shield } from 'lucide-react';

interface CaseCardProps {
  caseStudy: CaseStudy;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseStudy }) => {
  const categoryVariantMap: Record<string, 'crime' | 'evidence' | 'police' | 'legal' | 'neutral'> = {
    NDPS: 'police',
    'Property Theft': 'crime',
    Robbery: 'crime',
    'Grievous Hurt': 'police',
    Murder: 'police',
  };

  return (
    <article
      aria-labelledby={`case-title-${caseStudy.id}`}
      className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl hover:border-evidence-cyan/40 hover:shadow-forensic-glow transition-all duration-200 flex flex-col justify-between space-y-4"
    >
      <div className="space-y-3">
        {/* Top Badges & Difficulty */}
        <div className="flex items-center justify-between gap-2">
          <Badge variant={categoryVariantMap[caseStudy.category] || 'neutral'}>
            {caseStudy.category}
          </Badge>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-forensic-850 text-slate-400 border border-forensic-800">
            {caseStudy.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 id={`case-title-${caseStudy.id}`} className="text-base font-bold text-white line-clamp-2">
          <Link to={`/case-studies/${caseStudy.slug}`} className="hover:text-evidence-cyan transition-colors">
            {caseStudy.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
          {caseStudy.summary}
        </p>

        {/* Statutory Sections Applied Preview */}
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
      </div>

      {/* Footer Info & View Link */}
      <div className="pt-3 border-t border-forensic-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            {caseStudy.date}
          </span>
          <span className="flex items-center gap-1 truncate max-w-[140px]">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{caseStudy.jurisdiction}</span>
          </span>
        </div>

        <Link
          to={`/case-studies/${caseStudy.slug}`}
          className="text-evidence-cyan hover:text-evidence-glow font-semibold flex items-center gap-1 group shrink-0"
        >
          <span>Examine</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
};
