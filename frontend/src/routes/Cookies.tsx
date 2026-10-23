import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { Cookie, RotateCcw } from 'lucide-react';
import { useConsent } from '../context/ConsentContext';
import { Button } from '../components/ui/Button';

export const Cookies: React.FC = () => {
  const { preferences, resetConsent } = useConsent();

  return (
    <>
      <SEO
        title="Cookie Policy &amp; Consent Configuration | ForensicAI"
        description="Learn how ForensicAI uses essential, analytics, and preference cookies to support secure law analysis."
        canonicalUrl="https://forensicai.in/cookies"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Header */}
        <div className="border-b border-forensic-800 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-crime-amber font-mono text-xs">
            <Cookie className="w-4 h-4" />
            <span>COOKIE MANAGEMENT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Cookie Policy</h1>
          <p className="text-xs text-slate-400">
            Last Updated: October 2024 &bull; <em>Subject to review by counsel.</em>
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-forensic-800 text-xs font-semibold gap-4 pb-2">
          <Link to="/terms" className="text-slate-400 hover:text-slate-200">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-slate-400 hover:text-slate-200">
            Privacy Policy &amp; DPDP Act
          </Link>
          <Link to="/cookies" className="text-evidence-cyan border-b-2 border-evidence-cyan pb-2 -mb-2.5">
            Cookie Policy
          </Link>
        </div>

        {/* Current State & Reset */}
        <div className="p-4 rounded-2xl bg-forensic-900 border border-forensic-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-white font-mono">Your Current Consent Status</span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-legal-emerald">Necessary: Active</span> &bull;{' '}
              <span className={preferences.analytics ? 'text-legal-emerald' : 'text-slate-500'}>
                Analytics: {preferences.analytics ? 'Granted' : 'Declined'}
              </span>{' '}
              &bull;{' '}
              <span className={preferences.preferences ? 'text-legal-emerald' : 'text-slate-500'}>
                Preferences: {preferences.preferences ? 'Granted' : 'Declined'}
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={resetConsent}
            leftIcon={<RotateCcw className="w-4 h-4 text-crime-amber" />}
          >
            Reset Consent Banner
          </Button>
        </div>

        {/* Breakdown */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white">Categories of Cookies We Employ</h2>
          
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-forensic-950 border border-forensic-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">1. Strictly Necessary Cookies</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Essential
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Stored via httpOnly, secure, sameSite cookies by our Spring Boot backend to handle token refresh and CSRF mitigation. Cannot be deactivated without breaking application functionality.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-forensic-950 border border-forensic-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">2. Educational Analytics (Aggregated)</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forensic-800 text-evidence-cyan">
                  Optional
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Assists faculty in understanding common crime scenario queries and identifying which criminal law provisions learners struggle with most frequently.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-forensic-950 border border-forensic-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">3. Functional &amp; Simulation State</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-forensic-800 text-evidence-cyan">
                  Optional
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Remembers your selected legal framework preference (BNS vs IPC) and simulator checkpoint scores locally in your browser.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
