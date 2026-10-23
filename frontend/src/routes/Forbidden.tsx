import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';

export const Forbidden: React.FC = () => {
  return (
    <>
      <SEO
        title="403 - Access Restricted | ForensicAI"
        description="Access restricted to authorized institutional roles."
        canonicalUrl="https://forensicai.in/forbidden"
        noIndex={true}
      />

      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-forensic-900 border border-forensic-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-crime-amber/20 border border-crime-amber/40 flex items-center justify-center text-crime-amber">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-crime-amber uppercase tracking-widest">
              Error 403 · Security Clearance Required
            </span>
            <h1 className="text-2xl font-extrabold text-white">Access Restricted</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your current role does not possess permissions to view this forensic audit ledger or administrator cohort control panel.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/analyzer">
              <Button variant="primary" size="md">
                Go to Analyzer
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
