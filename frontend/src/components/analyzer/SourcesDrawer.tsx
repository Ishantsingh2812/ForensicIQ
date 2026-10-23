import React from 'react';
import { LegalSourceCitation } from '../../types';
import { Drawer } from '../ui/Drawer';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface SourcesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sources: LegalSourceCitation[];
}

export const SourcesDrawer: React.FC<SourcesDrawerProps> = ({ isOpen, onClose, sources }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Legal Chunks & Citations" position="right">
      <div className="space-y-4">
        <p className="text-xs text-slate-400 leading-relaxed">
          The following statutory provisions and Supreme Court landmark precedents were retrieved via hybrid dense+sparse vector search in Qdrant and re-ranked with cross-encoder scoring.
        </p>

        {sources.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs">
            No external citations associated with this query.
          </div>
        ) : (
          <div className="space-y-3">
            {sources.map((src) => (
              <div
                key={src.id}
                className="p-3.5 rounded-xl bg-forensic-950/80 border border-forensic-800 space-y-2 hover:border-evidence-cyan/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-evidence-cyan truncate max-w-[200px]">
                    {src.id}
                  </span>
                  <Badge variant="legal">
                    {(src.score * 100).toFixed(1)}% match
                  </Badge>
                </div>

                <h4 className="text-xs font-semibold text-slate-200">{src.label}</h4>

                <blockquote className="text-[11px] text-slate-400 bg-forensic-900 p-2.5 rounded border border-forensic-850 font-mono italic leading-relaxed">
                  "{src.snippet}"
                </blockquote>

                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-legal-emerald" />
                  <span>Verified Indian Law Corpus (Official Gazette)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
};
