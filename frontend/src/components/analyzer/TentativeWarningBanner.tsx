import React from 'react';
import { AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface TentativeWarningBannerProps {
  confidence: number;
  missingFacts?: string[];
  clarifyingQuestions?: string[];
  onSelectQuestion?: (question: string) => void;
}

export const TentativeWarningBanner: React.FC<TentativeWarningBannerProps> = ({
  confidence,
  missingFacts = [],
  clarifyingQuestions = [],
  onSelectQuestion,
}) => {
  return (
    <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-950/20 p-5 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-amber-500/20 p-2 text-amber-400">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-amber-300">
              Low Confidence Analysis — Insufficient Legal Facts
            </h3>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
              Mapping Confidence: {Math.round(confidence * 100)}% (&lt; 70% threshold)
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-300">
            The narrative provides insufficient statutory parameters to definitively frame charges. This tentative evaluation distinguishes subtle offense thresholds but requires essential factual clarification.
          </p>

          {missingFacts.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400/90">
                Critical Missing Legal Facts:
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-slate-300">
                {missingFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {clarifyingQuestions.length > 0 && (
            <div className="mt-4 rounded-lg bg-slate-900/60 p-4 border border-amber-500/20">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
                <HelpCircle className="h-4 w-4" />
                <span>Recommended Clarifying Questions for Investigator / Complainant:</span>
              </div>
              <div className="mt-2.5 space-y-2">
                {clarifyingQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectQuestion && onSelectQuestion(q)}
                    className="group flex cursor-pointer items-center justify-between rounded-lg border border-slate-800 bg-slate-800/60 px-3 py-2 text-xs text-slate-200 transition hover:border-amber-500/40 hover:bg-slate-800"
                  >
                    <span>{q}</span>
                    <span className="ml-2 flex items-center gap-1 text-[11px] font-medium text-amber-400 opacity-0 group-hover:opacity-100 transition">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Add to Scenario
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
