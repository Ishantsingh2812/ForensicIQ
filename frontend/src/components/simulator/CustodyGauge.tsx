import React from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { CustodyActionLog } from '../../types';

interface CustodyGaugeProps {
  score: number; // 0 to 100
  logs: CustodyActionLog[];
}

export const CustodyGauge: React.FC<CustodyGaugeProps> = ({ score, logs }) => {
  const getScoreColor = () => {
    if (score >= 85) return 'text-legal-emerald stroke-legal-emerald';
    if (score >= 60) return 'text-crime-amber stroke-crime-amber';
    return 'text-police-crimson stroke-police-crimson';
  };

  const getStatusLabel = () => {
    if (score >= 85) return 'Evidence Admissible in Court (Section 63 BSA / Sec 65B Compliant)';
    if (score >= 60) return 'Vulnerable to Defense Challenge (Procedural Irregularities)';
    return 'Compromised / Inadmissible (Severe Contamination or Missing Seals)';
  };

  // SVG circular gauge calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-forensic-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-evidence-cyan" />
          Chain-of-Custody Integrity Gauge
        </h3>
        <span className="text-xs font-mono font-bold text-slate-300">
          Statutory Standard: Standing Order 1/89
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Circular SVG Gauge */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-forensic-950 fill-none"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={`fill-none transition-all duration-700 ease-out ${getScoreColor()}`}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xl font-extrabold font-mono text-white">{score}%</span>
            <span className="text-[9px] uppercase font-mono text-slate-400">Integrity</span>
          </div>
        </div>

        {/* Status text */}
        <div className="space-y-1.5 text-center sm:text-left">
          <p className="text-xs font-bold text-slate-200">Legal Admissibility Evaluation:</p>
          <p className={`text-xs font-semibold ${getScoreColor().split(' ')[0]}`}>
            {getStatusLabel()}
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Every step must follow proper evidence collection order, non-metallic tools, tamper-evident brass seals, and panch witness signatures.
          </p>
        </div>
      </div>

      {/* Handover & Custody Audit Log */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-semibold text-slate-300 font-mono uppercase">
          Contemporaneous Handover Log ({logs.length} events)
        </span>
        <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
          {logs.length === 0 ? (
            <p className="text-xs text-slate-500 italic p-2 bg-forensic-950 rounded-lg">
              No evidence collected yet. Select a scene hotspot to begin seizure.
            </p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-2 rounded-lg bg-forensic-950 border border-forensic-850 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono text-slate-400 text-[10px] mr-2">[{log.timestamp}]</span>
                  <span className="font-semibold text-slate-200">{log.evidenceLabel}</span>
                  <p className="text-[11px] text-slate-400">{log.notes}</p>
                </div>
                <span
                  className={`text-xs font-bold font-mono ${
                    log.impactScore < 0 ? 'text-police-crimson' : 'text-legal-emerald'
                  }`}
                >
                  {log.impactScore > 0 ? `+${log.impactScore}%` : `${log.impactScore}%`}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
