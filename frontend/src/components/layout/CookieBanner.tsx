import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, Check, Settings2 } from 'lucide-react';
import { useConsent } from '../../context/ConsentContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export const CookieBanner: React.FC = () => {
  const { hasConsented, acceptAll, rejectNonEssential, savePreferences, preferences } = useConsent();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [customAnalytics, setCustomAnalytics] = useState(preferences.analytics);
  const [customPrefs, setCustomPrefs] = useState(preferences.preferences);

  if (hasConsented) return null;

  const handleSaveCustom = () => {
    savePreferences({
      analytics: customAnalytics,
      preferences: customPrefs,
    });
    setIsCustomizeOpen(false);
  };

  return (
    <>
      <div
        role="region"
        aria-label="Cookie consent banner"
        className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-xl z-35 bg-forensic-900 border border-forensic-700 p-5 rounded-2xl shadow-2xl backdrop-blur-lg animate-in slide-in-from-bottom duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-evidence-cyan/15 text-evidence-cyan shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Privacy & Cookie Preferences
              <span className="text-[10px] px-1.5 py-0.2 bg-legal-emerald/20 text-legal-emerald rounded border border-legal-emerald/40">
                DPDP Act 2023
              </span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ForensicAI uses essential cookies to manage your authentication session and analysis history. We do not sell your data or scenario prompts. Read our{' '}
              <Link to="/cookies" className="text-evidence-cyan underline hover:text-evidence-glow">
                Cookie Policy
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-evidence-cyan underline hover:text-evidence-glow">
                Privacy Notice
              </Link>.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Button size="sm" variant="primary" onClick={acceptAll}>
                Accept All
              </Button>
              <Button size="sm" variant="secondary" onClick={rejectNonEssential}>
                Reject Non-Essential
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsCustomizeOpen(true)}
                leftIcon={<Settings2 className="w-3.5 h-3.5" />}
              >
                Customize
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Customize Modal */}
      <Modal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        title="Customise Cookie Preferences"
        description="Select the categories of cookies you consent to use during your session."
      >
        <div className="space-y-4 py-2">
          {/* Essential */}
          <div className="p-3 rounded-lg bg-forensic-850 border border-forensic-700 flex items-start justify-between">
            <div className="pr-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Strictly Necessary Cookies</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded">
                  Required
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Enables secure JWT session tokens, CSRF protection, and in-memory scenario state. Cannot be switched off.
              </p>
            </div>
            <input type="checkbox" checked disabled className="rounded bg-slate-700 text-evidence-cyan cursor-not-allowed mt-1" />
          </div>

          {/* Analytics */}
          <div className="p-3 rounded-lg bg-forensic-850 border border-forensic-700 flex items-start justify-between">
            <div className="pr-4">
              <span className="text-sm font-semibold text-white">Aggregated Educational Analytics</span>
              <p className="text-xs text-slate-400 mt-1">
                Anonymous telemetry on case queries and simulator completion times to improve educational content.
              </p>
            </div>
            <input
              type="checkbox"
              id="analytics-toggle"
              checked={customAnalytics}
              onChange={(e) => setCustomAnalytics(e.target.checked)}
              className="w-4 h-4 rounded text-evidence-cyan focus:ring-evidence-cyan bg-forensic-800 border-forensic-600 mt-1 cursor-pointer"
            />
          </div>

          {/* Preferences */}
          <div className="p-3 rounded-lg bg-forensic-850 border border-forensic-700 flex items-start justify-between">
            <div className="pr-4">
              <span className="text-sm font-semibold text-white">UI Preferences & Simulator Progress</span>
              <p className="text-xs text-slate-400 mt-1">
                Remembers your selected legal framework (IPC vs BNS) and simulator checkpoint progress locally.
              </p>
            </div>
            <input
              type="checkbox"
              id="preferences-toggle"
              checked={customPrefs}
              onChange={(e) => setCustomPrefs(e.target.checked)}
              className="w-4 h-4 rounded text-evidence-cyan focus:ring-evidence-cyan bg-forensic-800 border-forensic-600 mt-1 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-forensic-800">
            <Button variant="ghost" size="sm" onClick={() => setIsCustomizeOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveCustom} leftIcon={<Check className="w-4 h-4" />}>
              Save Preferences
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
