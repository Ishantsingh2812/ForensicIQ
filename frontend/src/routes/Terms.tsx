import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/layout/SEO';
import { ShieldAlert, Scale, FileText } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Service | ForensicAI Educational Platform"
        description="Terms of service, academic acceptable use policies, and educational disclaimers for ForensicAI."
        canonicalUrl="https://forensicai.in/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
        {/* Header */}
        <div className="border-b border-forensic-800 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-evidence-cyan font-mono text-xs">
            <Scale className="w-4 h-4" />
            <span>LEGAL DOCUMENTATION</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400">
            Last Updated: October 2024 &bull; <em>Placeholder drafted for academic prototyping; subject to review by licensed legal counsel.</em>
          </p>
        </div>

        {/* Tab switcher for quick access */}
        <div className="flex border-b border-forensic-800 text-xs font-semibold gap-4 pb-2">
          <Link to="/terms" className="text-evidence-cyan border-b-2 border-evidence-cyan pb-2 -mb-2.5">
            Terms of Service
          </Link>
          <Link to="/privacy" className="text-slate-400 hover:text-slate-200">
            Privacy Policy &amp; DPDP Act
          </Link>
          <Link to="/cookies" className="text-slate-400 hover:text-slate-200">
            Cookie Policy
          </Link>
        </div>

        {/* Core Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-crime-amber/10 border border-crime-amber/30 text-crime-amber text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>CRITICAL LEGAL NOTICE: STRICTLY EDUCATIONAL &amp; SIMULATION PURPOSES ONLY</span>
          </div>
          <p className="text-slate-200 text-[11px] leading-relaxed">
            ForensicAI does NOT provide formal legal advice, representation, or judicial determinations. Use of this platform does NOT create an advocate-client relationship. If you require legal assistance in an active proceeding, consult a member of the Bar Council of India.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or interacting with ForensicAI, including submitting crime narratives to the Crime Analyzer or using the Scene Simulator, you agree to comply with these Terms of Service and applicable Indian laws.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Acceptable Educational Use</h2>
          <p>
            ForensicAI is built for law students, police academy recruits, prosecutors, and forensic analysts. You agree never to use this platform to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-400">
            <li>Generate assistance, planning, or evasion strategies for committing crimes.</li>
            <li>Submit un-redacted classified investigation records or real victims' personal identifiable information (PII).</li>
            <li>Present automated AI outputs in court as binding official statements without independent expert verification.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Third-Party LLM &amp; Cloud Microservices</h2>
          <p>
            The analyzer utilizes FastAPI microservices orchestrating LangGraph multi-agent pipelines with foundation LLMs (OpenAI, Anthropic). Scenarios are treated strictly as data payloads and are never utilized to train public foundation models without explicit user consent.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Intellectual Property</h2>
          <p>
            Statutory texts (IPC 1860, BNS 2023, BNSS 2023, BSA 2023) are public domain government publications. The unique agentic prompts, user interface design tokens, and simulation scoring algorithms are the intellectual property of ForensicAI Educational Foundation.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Grievance Officer</h2>
          <p>
            In compliance with Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, contact:
          </p>
          <div className="p-3 bg-forensic-900 border border-forensic-800 rounded-xl font-mono text-xs text-slate-300">
            Grievance Officer: Legal Compliance Cell<br />
            Email: grievance@forensicai.in<br />
            Jurisdiction: New Delhi, India
          </div>
        </section>
      </div>
    </>
  );
};
