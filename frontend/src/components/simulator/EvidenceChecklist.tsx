import React from 'react';
import { Hotspot } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CheckCircle2, AlertTriangle, Package, ShieldAlert, Award } from 'lucide-react';

interface EvidenceChecklistProps {
  hotspots: Hotspot[];
  collectedIds: string[];
  selectedHotspot: Hotspot | null;
  onCollect: (hotspot: Hotspot, withPackagingMistake: boolean) => void;
  onReset: () => void;
  isComplete: boolean;
  score: number;
}

export const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({
  hotspots,
  collectedIds,
  selectedHotspot,
  onCollect,
  onReset,
  isComplete,
  score,
}) => {
  return (
    <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-forensic-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-evidence-cyan" />
            Evidence Seizure Checklist
          </h3>
          <p className="text-xs text-slate-400">
            {collectedIds.length} of {hotspots.length} evidence items secured
          </p>
        </div>

        <Button size="sm" variant="ghost" onClick={onReset}>
          Reset Scene
        </Button>
      </div>

      {/* Selected Hotspot Action Box */}
      {selectedHotspot && !collectedIds.includes(selectedHotspot.id) && (
        <div className="p-4 rounded-xl bg-evidence-cyan/10 border border-evidence-cyan/40 space-y-3 animate-in fade-in">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-evidence-cyan font-bold">
                Target Evidence Identified
              </span>
              <h4 className="text-sm font-bold text-white">{selectedHotspot.label}</h4>
            </div>
            <Badge variant="evidence">{selectedHotspot.category}</Badge>
          </div>

          <p className="text-xs text-slate-300">{selectedHotspot.description}</p>

          <div className="p-2.5 rounded-lg bg-forensic-950 border border-forensic-800 text-xs font-mono text-slate-300 space-y-1">
            <span className="text-crime-amber font-bold">Recommended Forensic Packaging:</span>
            <p className="text-[11px] text-slate-400">{selectedHotspot.recommendedPackaging}</p>
          </div>

          {/* Action buttons: Standard Procedure vs Procedural Shortcut */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button
              size="sm"
              variant="primary"
              onClick={() => onCollect(selectedHotspot, false)}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Seal, Label & Collect (Standard SOP)
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onCollect(selectedHotspot, true)}
              leftIcon={<AlertTriangle className="w-4 h-4 text-crime-amber" />}
              className="text-xs text-slate-300"
            >
              Improvised Bag (Unsealed / No Label)
            </Button>
          </div>
        </div>
      )}

      {/* Final Completion Debrief */}
      {isComplete && (
        <div className="p-4 rounded-xl bg-legal-emerald/15 border border-legal-emerald/40 space-y-2 animate-in zoom-in-95">
          <div className="flex items-center gap-2 text-legal-emerald font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>Scene Processing Complete!</span>
          </div>
          <p className="text-xs text-slate-200">
            Final Chain-of-Custody Integrity Score: <strong>{score}%</strong>.
            {score >= 80
              ? ' Excellent forensic adherence. All physical and digital evidence will withstand defense cross-examination in court.'
              : ' Several procedural flaws detected. Defense lawyer can challenge admissibility under Indian Evidence Act / BSA.'}
          </p>
        </div>
      )}

      {/* Checklist items */}
      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {hotspots.map((hs, idx) => {
          const isCollected = collectedIds.includes(hs.id);
          const isSelected = selectedHotspot?.id === hs.id;

          return (
            <div
              key={hs.id}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between text-xs ${
                isCollected
                  ? 'bg-legal-emerald/10 border-legal-emerald/30 text-slate-300'
                  : isSelected
                  ? 'bg-evidence-cyan/15 border-evidence-cyan text-white shadow-sm'
                  : 'bg-forensic-950/70 border-forensic-850 text-slate-400 hover:border-forensic-750'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] w-5 h-5 rounded-full bg-forensic-800 flex items-center justify-center font-bold text-slate-300">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-semibold text-slate-200">{hs.label}</p>
                  <span className="text-[10px] uppercase font-mono text-evidence-cyan">
                    {hs.category}
                  </span>
                </div>
              </div>

              <div>
                {isCollected ? (
                  <Badge variant="legal" icon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                    Secured
                  </Badge>
                ) : (
                  <Badge variant="neutral">Pending</Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
