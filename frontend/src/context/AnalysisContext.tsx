import React, { createContext, useContext, useRef, useState } from 'react';
import { AnalysisResult, LawFramework } from '../types';
import { api, ApiError } from '../lib/api';

export type PipelineStep = 0 | 1 | 2 | 3 | 4 | 5;

export const PIPELINE_STEPS_LABELS = [
  'Idle',
  'Extracting factual elements & timeline',
  'Searching IPC & BNS legal database in Qdrant',
  'Re-ranking relevant legal sections with cross-encoder',
  'Synthesizing prosecution ingredients & forensic protocols',
  'Running adversarial defense lawyer stress-test',
];

interface AnalysisContextType {
  result: AnalysisResult | null;
  loading: boolean;
  step: PipelineStep;
  error: { status?: number; message: string } | null;
  history: AnalysisResult[];
  isSourcesOpen: boolean;
  setIsSourcesOpen: (open: boolean) => void;
  analyze: (scenario: string, framework: LawFramework) => Promise<void>;
  cancelAnalysis: () => void;
  setResult: (res: AnalysisResult | null) => void;
  clearError: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<PipelineStep>(0);
  const [error, setError] = useState<{ status?: number; message: string } | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const stepTimerRef = useRef<any>(null);

  const clearTimers = () => {
    if (stepTimerRef.current) clearInterval(stepTimerRef.current);
  };

  const simulateProgressSteps = () => {
    clearTimers();
    let currentStep = 1;
    setStep(1 as PipelineStep);
    stepTimerRef.current = setInterval(() => {
      currentStep++;
      if (currentStep <= 5) {
        setStep(currentStep as PipelineStep);
      } else {
        clearTimers();
      }
    }, 450);
  };

  const analyze = async (scenario: string, framework: LawFramework) => {
    setLoading(true);
    setError(null);
    abortControllerRef.current = new AbortController();
    simulateProgressSteps();

    try {
      const data = await api.analyzeScenario(scenario, framework, abortControllerRef.current.signal);
      clearTimers();
      setStep(5);
      setResult(data);
      setHistory((prev) => [data, ...prev.filter((c) => c.caseId !== data.caseId)]);
    } catch (err: any) {
      clearTimers();
      setStep(0);
      if (err instanceof ApiError) {
        setError({ status: err.status, message: err.message });
      } else {
        setError({
          message: err.message || 'An unexpected error occurred while analyzing the scenario.',
        });
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelAnalysis = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    clearTimers();
    setLoading(false);
    setStep(0);
    setError({ message: 'Analysis cancelled by user.' });
  };

  const clearError = () => setError(null);

  return (
    <AnalysisContext.Provider
      value={{
        result,
        loading,
        step,
        error,
        history,
        isSourcesOpen,
        setIsSourcesOpen,
        analyze,
        cancelAnalysis,
        setResult,
        clearError,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within an AnalysisProvider');
  return ctx;
};
