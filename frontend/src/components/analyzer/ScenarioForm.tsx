import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ShieldAlert, CheckCircle2, Trash2, FileText, ArrowRight, XCircle } from 'lucide-react';
import { LawFramework } from '../../types';
import { detectPii, anonymizePii, PiiDetectionResult } from '../../lib/piiDetector';
import { validateScenario } from '../../lib/validators';
import { mockSampleScenariosList } from '../../lib/mocks/analysis';
import { Button } from '../ui/Button';

interface ScenarioFormProps {
  onSubmit: (scenario: string, framework: LawFramework) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const ScenarioForm: React.FC<ScenarioFormProps> = ({ onSubmit, onCancel, isLoading }) => {
  const [scenario, setScenario] = useState('');
  const [framework, setFramework] = useState<LawFramework>('BOTH');
  const [piiResult, setPiiResult] = useState<PiiDetectionResult>({ hasPii: false, types: [], findingsCount: 0 });
  const [validationError, setValidationError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.max(160, textareaRef.current.scrollHeight)}px`;
    }
  }, [scenario]);

  // Real-time PII detection & validation
  useEffect(() => {
    if (!scenario.trim()) {
      setPiiResult({ hasPii: false, types: [], findingsCount: 0 });
      setValidationError(null);
      return;
    }

    const detected = detectPii(scenario);
    setPiiResult(detected);

    if (hasInteracted) {
      const v = validateScenario(scenario);
      setValidationError(v.isValid ? null : v.error || null);
    }
  }, [scenario, hasInteracted]);

  const handleAnonymize = () => {
    const cleaned = anonymizePii(scenario);
    setScenario(cleaned);
  };

  const handleLoadSample = (text: string) => {
    setScenario(text);
    setHasInteracted(true);
  };

  const handleClear = () => {
    setScenario('');
    setValidationError(null);
    setHasInteracted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);
    const v = validateScenario(scenario);
    if (!v.isValid) {
      setValidationError(v.error || 'Please check scenario requirements.');
      textareaRef.current?.focus();
      return;
    }
    onSubmit(scenario, framework);
  };

  const charCount = scenario.length;
  const isTooShort = charCount > 0 && charCount < 5;
  const isTooLong = charCount > 5000;

  return (
    <form onSubmit={handleSubmit} className="w-full bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Top Controls: Framework & Sample Helper */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forensic-800 pb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="framework-select" className="text-xs font-semibold text-slate-300 font-mono uppercase">
            Law Framework:
          </label>
          <select
            id="framework-select"
            value={framework}
            onChange={(e) => setFramework(e.target.value as LawFramework)}
            className="bg-forensic-850 border border-forensic-700 text-white text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-evidence-cyan focus:outline-none"
            disabled={isLoading}
          >
            <option value="BOTH">BNS (2023) + Legacy IPC (Side-by-Side)</option>
            <option value="BNS">Bharatiya Nyaya Sanhita (BNS) Only</option>
            <option value="IPC">Indian Penal Code (IPC) Only</option>
          </select>
        </div>

        {/* Sample Scenario Picker Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Sample Cases:</span>
          <div className="flex flex-wrap gap-1.5">
            {mockSampleScenariosList.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadSample(sample.text)}
                disabled={isLoading}
                className="text-[11px] px-2.5 py-1 rounded bg-forensic-850 hover:bg-forensic-800 text-evidence-cyan border border-forensic-700 hover:border-evidence-cyan/40 transition-colors"
              >
                {sample.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="scenario-input" className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <FileText className="w-4 h-4 text-evidence-cyan" />
            Raw Crime Scene / Incident Scenario
          </label>
          {scenario.length > 0 && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-police-crimson flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>

        <textarea
          id="scenario-input"
          ref={textareaRef}
          value={scenario}
          onChange={(e) => {
            setScenario(e.target.value);
            if (!hasInteracted) setHasInteracted(true);
          }}
          disabled={isLoading}
          placeholder="Paste or write the factual crime scenario here (e.g. details of accused actions, weapon brandishing, injuries sustained, recovery of articles, time & location)..."
          className="w-full bg-forensic-950 border border-forensic-700/80 rounded-xl p-4 text-slate-100 placeholder-slate-500 text-sm focus:border-evidence-cyan focus:ring-1 focus:ring-evidence-cyan focus:outline-none transition-all resize-none min-h-[160px] leading-relaxed"
          aria-describedby="char-counter pii-warning validation-error"
          aria-invalid={!!validationError}
        />

        {/* Char Counter & Status */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div id="validation-error" aria-live="polite" className="text-police-crimson font-medium">
            {validationError}
          </div>
          <div
            id="char-counter"
            className={`${
              isTooShort || isTooLong ? 'text-police-crimson font-bold' : 'text-slate-400'
            }`}
          >
            {charCount} / 5,000 characters (min 5)
          </div>
        </div>
      </div>

      {/* PII Detection Warning Banner with One-Click Anonymize */}
      {piiResult.hasPii && (
        <div
          id="pii-warning"
          role="alert"
          className="p-3.5 rounded-xl bg-crime-amber/10 border border-crime-amber/30 flex items-start justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-crime-amber shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-crime-amber">
                PII Detected ({piiResult.findingsCount} items): {piiResult.types.join(', ').toUpperCase()}
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Protect citizen privacy under DPDP Act 2023. Anonymize names, phone numbers, PAN, and Aadhaar before submission.
              </p>
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleAnonymize}
            className="shrink-0 text-xs border-crime-amber/50 text-crime-amber hover:bg-crime-amber/15"
          >
            Redact PII Now
          </Button>
        </div>
      )}

      {/* Action Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-[11px] text-slate-500 max-w-sm">
          Scenarios are evaluated through multi-agent LangGraph analysis and re-ranked with statutory Indian legal provisions.
        </p>

        <div className="flex items-center gap-3">
          {isLoading && (
            <Button
              type="button"
              variant="danger"
              size="md"
              onClick={onCancel}
              leftIcon={<XCircle className="w-4 h-4" />}
            >
              Cancel Analysis
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg" // Min 48px height per conversion spec
            isLoading={isLoading}
            disabled={isLoading || charCount < 50 || isTooLong}
            rightIcon={!isLoading && <ArrowRight className="w-5 h-5" />}
            className="px-8 font-bold"
          >
            {isLoading ? 'Synthesizing Crime Analysis...' : 'Analyze Scenario Now'}
          </Button>
        </div>
      </div>
    </form>
  );
};
