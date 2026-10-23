import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Scale, Lock, FileText, ExternalLink, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-forensic-950 border-t border-forensic-800 text-slate-400 text-sm mt-auto">
      {/* Educational Disclaimer Banner */}
      <div className="bg-crime-amber/10 border-b border-crime-amber/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm text-crime-amber font-medium text-center">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>
            <strong>EDUCATIONAL USE ONLY:</strong> ForensicAI is an academic and investigative learning tool. It does not provide legal advice, representation, or authoritative court judgments. Always consult a licensed advocate.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-evidence-cyan/20 border border-evidence-cyan/50 flex items-center justify-center">
                <Scale className="w-4 h-4 text-evidence-cyan" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">ForensicAI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accelerating Indian criminal justice education. Bridging legacy IPC jurisprudence with the new criminal codes: Bharatiya Nyaya Sanhita (BNS), BNSS, and BSA 2023.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <Lock className="w-3 h-3 text-legal-emerald" />
              <span>DPDP Act 2023 Compliant · Zero PII Retention</span>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 font-mono">
              Platform
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/analyzer" className="hover:text-evidence-cyan transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-evidence-cyan" />
                  Crime Analyzer
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-evidence-cyan transition-colors">
                  Case Studies Library (10+ Precedents)
                </Link>
              </li>
              <li>
                <Link to="/simulator" className="hover:text-evidence-cyan transition-colors">
                  Crime Scene Simulator & Custody Chain
                </Link>
              </li>
              <li>
                <Link to="/thank-you" className="hover:text-evidence-cyan transition-colors">
                  Join Academic Waitlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Regulatory Knowledge */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 font-mono">
              Statutory Codes
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Bharatiya Nyaya Sanhita (BNS) 2023</li>
              <li>Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023</li>
              <li>Bharatiya Sakshya Adhiniyam (BSA) 2023</li>
              <li>Indian Penal Code (IPC) 1860 [Mapped]</li>
              <li>Digital Personal Data Protection Act 2023</li>
            </ul>
          </div>

          {/* Column 4: Policies & Grievance */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3 font-mono">
              Ethics & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/terms" className="hover:text-evidence-cyan transition-colors flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-evidence-cyan transition-colors">
                  Privacy Policy (DPDP & LLM Disclosures)
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-evidence-cyan transition-colors">
                  Cookie Policy & Consent Settings
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Grievance Officer: <span className="text-slate-400">grievance@forensicai.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-forensic-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ForensicAI Education Foundation. All rights reserved.</p>
          <p className="text-[11px]">Designed for police academies, state judicial academies, and law universities.</p>
        </div>
      </div>
    </footer>
  );
};
