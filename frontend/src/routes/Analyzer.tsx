import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { ScenarioForm } from '../components/analyzer/ScenarioForm';
import { ProgressSteps } from '../components/analyzer/ProgressSteps';
import { SkeletonResults } from '../components/analyzer/SkeletonResults';
import { ResultCards } from '../components/analyzer/ResultCards';
import { SourcesDrawer } from '../components/analyzer/SourcesDrawer';
import { SEO } from '../components/layout/SEO';
import { AlertCircle, History, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Analyzer: React.FC = () => {
  const location = useLocation();
  const {
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
  } = useAnalysis();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [lastScenario, setLastScenario] = useState<string>('');

  // Handle prefilled scenario passed via router state from Home mini-demo
  useEffect(() => {
    if (location.state?.initialScenario && !result && !loading) {
      setLastScenario(location.state.initialScenario);
      analyze(location.state.initialScenario, 'BOTH');
    }
  }, [location.state]);

  const handleSubmit = (scenario: string, framework: any) => {
    setLastScenario(scenario);
    analyze(scenario, framework);
  };

  const handleRetry = () => {
    if (lastScenario) {
      analyze(lastScenario, 'BOTH');
    }
  };

  const getHumanErrorMessage = (err: { status?: number; message: string }) => {
    if (err.status === 502 || err.status === 503) {
      return {
        title: 'AI Microservice Temporarily Unavailable (503)',
        description: 'The Spring core backend cannot connect to the Python FastAPI / LangGraph service. If running locally, verify port 8000 is active or enable VITE_USE_MOCKS=true.',
      };
    }
    if (err.status === 429) {
      return {
        title: 'Rate Limit Exceeded (429)',
        description: 'You have submitted too many requests in a short duration. Please wait 60 seconds before re-analyzing.',
      };
    }
    if (err.status === 401) {
      return {
        title: 'Session Expired (401)',
        description: 'Your authentication token has expired. Please log in again to continue recording analysis history.',
      };
    }
    return {
      title: 'Analysis Processing Failed',
      description: err.message || 'An error occurred while evaluating statutory provisions.',
    };
  };

  return (
    <>
      <SEO
        title="Crime Analyzer | AI Indian Law Mapping (IPC ↔ BNS)"
        description="Submit criminal incident scenarios to get automated IPC and BNS charge mapping, bailable/cognizable classification, and forensic evidence collection checklists."
        canonicalUrl="https://forensicai.in/analyzer"
        noIndex={true} // Authenticated / dynamic analyzer tool
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Top Header & History Toggle */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-forensic-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-evidence-cyan" />
              Crime Analyzer &amp; Legal Synthesizer
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Multi-Agent Fact Extraction &bull; Qdrant Dense+Sparse Search &bull; Adversarial Defense Lawyer Check
            </p>
          </div>

          {history.length > 0 && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              leftIcon={<History className="w-4 h-4 text-crime-amber" />}
            >
              Session History ({history.length})
            </Button>
          )}
        </div>

        {/* History Dropdown / Drawer if enabled */}
        {isHistoryOpen && (
          <div className="p-4 rounded-xl bg-forensic-900 border border-forensic-800 shadow-xl space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-300">
                Previously Evaluated Cases in this Session
              </h3>
              <button
                onClick={() => setIsHistoryOpen(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {history.map((h: any) => (
                <button
                  key={h.caseId}
                  onClick={() => {
                    setResult(h);
                    setIsHistoryOpen(false);
                  }}
                  className="p-3 text-left rounded-lg bg-forensic-950 hover:bg-forensic-850 border border-forensic-800 transition-colors"
                >
                  <p className="text-xs font-bold text-white truncate">{h.title || h.caseId}</p>
                  <p className="text-[10px] text-evidence-cyan font-mono">{h.caseId}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Input Form */}
        <ScenarioForm onSubmit={handleSubmit} onCancel={cancelAnalysis} isLoading={loading} />

        {/* Error Alert with Human-Readable Resolution & Retry Button */}
        {error && (
          <div
            role="alert"
            className="p-5 rounded-2xl bg-police-crimson/10 border border-police-crimson/40 space-y-3 animate-in fade-in"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-police-crimson shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-police-crimson">
                  {getHumanErrorMessage(error).title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {getHumanErrorMessage(error).description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <Button
                size="sm"
                variant="primary"
                onClick={handleRetry}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Retry Analysis
              </Button>
              <Button size="sm" variant="ghost" onClick={clearError}>
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Stepped Progress Indicator */}
        {loading && <ProgressSteps currentStep={step} />}

        {/* Skeleton Results while waiting for final payload */}
        {loading && <SkeletonResults />}

        {/* Structured Results Display */}
        {!loading && result && (
          <ResultCards result={result} onOpenSources={() => setIsSourcesOpen(true)} />
        )}

        {/* Empty State when no result and not loading */}
        {!loading && !result && !error && (
          <div className="text-center py-16 px-4 border border-dashed border-forensic-800 rounded-2xl bg-forensic-950/40 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-xl bg-forensic-850 flex items-center justify-center text-slate-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-300">Ready for Crime Scenario Input</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Paste details from an FIR, investigation case diary, or mock police academy incident. The pipeline will parse facts, match IPC/BNS provisions, and run defense critique.
            </p>
          </div>
        )}

        {/* Sources / Citations Drawer */}
        <SourcesDrawer
          isOpen={isSourcesOpen}
          onClose={() => setIsSourcesOpen(false)}
          sources={result?.sources || []}
        />
      </div>
    </>
  );
};
