import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { ShieldCheck, Lock, Database, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Privacy: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy &amp; DPDP Act 2023 | ForensicAI"
        description="Privacy policy and data protection framework complying with the Digital Personal Data Protection Act 2023 and zero-PII audit logging standards."
        canonicalUrl="https://forensicai.in/privacy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Header */}
        <div className="border-b border-forensic-800 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-legal-emerald font-mono text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>DATA PROTECTION POLICY</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Privacy Notice (DPDP Act 2023)</h1>
          <p className="text-xs text-slate-400">
            Last Updated: October 2024 &bull; <em>Subject to review by counsel.</em>
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-forensic-800 text-xs font-semibold gap-4 pb-2">
          <Link to="/terms" className="text-slate-400 hover:text-slate-200">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-evidence-cyan border-b-2 border-evidence-cyan pb-2 -mb-2.5">
            Privacy Policy &amp; DPDP Act
          </Link>
          <Link to="/cookies" className="text-slate-400 hover:text-slate-200">
            Cookie Policy
          </Link>
        </div>

        {/* DPDP Act 2023 Highlights */}
        <div className="p-4 rounded-2xl bg-legal-emerald/10 border border-legal-emerald/30 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-legal-emerald">
            <Lock className="w-4 h-4" />
            <span>Digital Personal Data Protection (DPDP) Act 2023 Principles</span>
          </div>
          <p className="text-slate-200 text-[11px] leading-relaxed">
            ForensicAI adheres strictly to data minimization, purpose limitation, and storage limitation. We process crime scenarios solely to generate educational statutory mappings and simulated forensic checklists.
          </p>
        </div>

        {/* 1. Client-Side PII Redaction */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Client-Side Anonymization &amp; Redaction</h2>
          <p>
            Before your crime scenario is submitted over HTTPS to the backend, our client-side regex engine detects Indian identifiers:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
            <li>Aadhaar 12-digit numbers (masked as <code>[REDACTED_AADHAAR]</code>)</li>
            <li>Permanent Account Numbers (PAN) (masked as <code>[REDACTED_PAN]</code>)</li>
            <li>10-digit Mobile Phone Numbers (masked as <code>[REDACTED_PHONE]</code>)</li>
            <li>Personal Email Addresses (masked as <code>[REDACTED_EMAIL]</code>)</li>
          </ul>
        </section>

        {/* 2. Audit Logging Strict Exclusions */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Audit Logging Standards (No Raw Text)</h2>
          <p>
            In accordance with forensic institutional requirements, our Spring Boot audit aspect records:
          </p>
          <div className="p-3 bg-forensic-900 border border-forensic-800 rounded-xl font-mono text-xs text-slate-300">
            Timestamp &bull; User ID &bull; Action Type &bull; Case Identifier &bull; Client IP
          </div>
          <p className="text-slate-400 text-xs mt-1">
            <strong className="text-white">Strict Rule:</strong> The raw text of your submitted crime scenario is <em>NEVER</em> written into the audit log database.
          </p>
        </section>

        {/* 3. Third-Party LLM Processing */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Third-Party Foundation Models (LLM) Disclosure</h2>
          <p>
            When utilizing OpenAI or Anthropic provider endpoints via our FastAPI AI microservice, scenarios are transmitted encrypted via TLS. We utilize zero-data-retention enterprise API tier endpoints where data is not retained for model training.
          </p>
        </section>

        {/* 4. Right to Erasure */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. User Rights: Erasure and Data Portability</h2>
          <p>
            Under the DPDP Act 2023, you have the right to request erasure of any saved case analysis from your user profile at any time.
          </p>
          <div className="pt-2">
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Trash2 className="w-4 h-4 text-police-crimson" />}
              onClick={() => alert('Session cases cleared from memory.')}
            >
              Clear Local Session Cache
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};
