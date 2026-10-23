import React from 'react';
import { PipelineStep, PIPELINE_STEPS_LABELS } from '../../context/AnalysisContext';
import { Check, Loader2 } from 'lucide-react';

interface ProgressStepsProps {
  currentStep: PipelineStep;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep }) => {
  const steps = [
    { num: 1, label: 'Fact Extractor Agent', desc: '5W1H Elements' },
    { num: 2, label: 'Hybrid Qdrant Retrieval', desc: 'IPC & BNS Corpus' },
    { num: 3, label: 'Cross-Encoder Re-ranker', desc: 'Precedent Alignment' },
    { num: 4, label: 'Legal Synthesizer', desc: 'Statutory Ingredients' },
    { num: 5, label: 'Adversarial Defense Check', desc: 'Vulnerability Analysis' },
  ];

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in"
    >
      <div className="flex items-center justify-between border-b border-forensic-800 pb-3">
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-evidence-cyan animate-spin" />
          <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Orchestrating Multi-Agent Pipeline
          </span>
        </div>
        <span className="text-xs font-mono text-evidence-cyan font-semibold">
          Step {Math.min(currentStep, 5)} of 5
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-forensic-950 h-2 rounded-full overflow-hidden border border-forensic-800">
        <div
          className="bg-gradient-to-r from-evidence-cyan via-crime-amber to-legal-emerald h-full transition-all duration-500 ease-out"
          style={{ width: `${(Math.max(currentStep, 1) / 5) * 100}%` }}
        />
      </div>

      {/* Current Step Active Announcement */}
      <p className="text-xs text-slate-300 font-medium italic">
        {PIPELINE_STEPS_LABELS[currentStep] || 'Processing pipeline...'}
      </p>

      {/* Step Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
        {steps.map((st) => {
          const isDone = currentStep > st.num;
          const isCurrent = currentStep === st.num;

          return (
            <div
              key={st.num}
              className={`p-2.5 rounded-xl border transition-all text-xs ${
                isDone
                  ? 'bg-legal-emerald/10 border-legal-emerald/30 text-legal-emerald'
                  : isCurrent
                  ? 'bg-evidence-cyan/15 border-evidence-cyan shadow-forensic-glow text-evidence-cyan'
                  : 'bg-forensic-950/60 border-forensic-850 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {isDone ? (
                  <Check className="w-3.5 h-3.5 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 shrink-0 animate-spin" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[9px] font-mono">
                    {st.num}
                  </span>
                )}
                <span className="font-bold truncate">{st.label}</span>
              </div>
              <p className="text-[10px] text-slate-400 truncate">{st.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
