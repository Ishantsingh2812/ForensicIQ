import React, { useState } from 'react';
import { SectionAnalysis } from '../../types';
import { Scale, ExternalLink, BookOpen, FileText, CheckCircle2 } from 'lucide-react';

interface LegalComparisonViewProps {
  sections: SectionAnalysis[];
}

export const LegalComparisonView: React.FC<LegalComparisonViewProps> = ({ sections }) => {
  const [showRawText, setShowRawText] = useState<boolean>(false);
  const [filterAct, setFilterAct] = useState<'ALL' | 'BNS' | 'IPC'>('ALL');

  const bnsSections = sections.filter((s) => s.act === 'BNS' || s.act === 'BNSS' || s.act === 'BSA');
  const ipcSections = sections.filter((s) => s.act === 'IPC');

  const filteredSections = sections.filter((s) => {
    if (filterAct === 'BNS') return s.act === 'BNS' || s.act === 'BNSS' || s.act === 'BSA';
    if (filterAct === 'IPC') return s.act === 'IPC';
    return true;
  });

  const getMappingBadge = (type?: string) => {
    switch (type) {
      case 'EXACT':
        return <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">Exact Mapping</span>;
      case 'PARTIAL':
        return <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300">Partial / Aggregated</span>;
      case 'QUALIFIED':
        return <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[11px] font-semibold text-blue-300">Qualified</span>;
      default:
        return <span className="rounded bg-slate-700 px-2 py-0.5 text-[11px] font-semibold text-slate-300">Statutory Record</span>;
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-indigo-400" />
          <h3 className="text-base font-semibold text-slate-100">
            IPC ↔ BNS Statutory Comparison & Mapping Dossier
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle Raw vs Simplified */}
          <button
            onClick={() => setShowRawText(!showRawText)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700"
          >
            {showRawText ? <BookOpen className="h-3.5 w-3.5 text-indigo-400" /> : <FileText className="h-3.5 w-3.5 text-indigo-400" />}
            <span>{showRawText ? 'Show Simplified Explanations' : 'Show Official Statutory Text'}</span>
          </button>

          {/* Act Filter */}
          <div className="flex rounded-lg border border-slate-700 bg-slate-800 p-0.5 text-xs">
            {(['ALL', 'BNS', 'IPC'] as const).map((act) => (
              <button
                key={act}
                onClick={() => setFilterAct(act)}
                className={`rounded px-2.5 py-1 font-medium transition ${
                  filterAct === act ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {act === 'ALL' ? 'All Provisions' : act}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side-by-side or list display */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredSections.map((sec, idx) => {
          const isBns = sec.act === 'BNS' || sec.act === 'BNSS' || sec.act === 'BSA';
          return (
            <div
              key={idx}
              className={`rounded-xl border p-4 transition ${
                isBns
                  ? 'border-indigo-500/30 bg-indigo-950/10'
                  : 'border-slate-800 bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-bold ${
                        isBns
                          ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {sec.act} {sec.section}
                    </span>
                    {getMappingBadge(sec.mapping_type || sec.mappingType)}
                  </div>
                  <h4 className="mt-2 text-sm font-semibold text-slate-100">{sec.title}</h4>
                </div>

                {sec.source_url && (
                  <a
                    href={sec.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:underline"
                    title="View official text on India Code"
                  >
                    <span>India Code</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Text content */}
              <div className="mt-3 rounded-lg bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-300 border border-slate-800/80">
                {showRawText ? (
                  <div>
                    <span className="font-semibold text-slate-400">Official Statutory Language: </span>
                    {sec.raw_statutory_text || sec.rawStatutoryText || 'Refer to India Code portal.'}
                  </div>
                ) : (
                  <div>
                    <span className="font-semibold text-indigo-300">Plain Legal Explanation: </span>
                    {sec.simplified_text || sec.simplifiedText || sec.raw_statutory_text || 'Active statutory provision.'}
                  </div>
                )}
              </div>

              {/* Punishment & Cross reference */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="text-amber-400">
                  <span className="font-semibold text-slate-400">Punishment: </span>
                  {sec.punishment}
                </div>
                {(sec.bnsEquivalent || sec.ipcEquivalent) && (
                  <div className="text-slate-400">
                    <span className="font-medium text-slate-500">Cross-Ref: </span>
                    <span className="text-slate-300">{sec.bnsEquivalent || sec.ipcEquivalent}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
