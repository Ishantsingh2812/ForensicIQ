import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Search, ArrowLeft, Home, BookOpen, Crosshair } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';

export const NotFound: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/case-studies?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <SEO
        title="404 - Case File Not Found | ForensicAI"
        description="The requested case file or forensic page could not be located in the judicial archive."
        canonicalUrl="https://forensicai.in/404"
        noIndex={true}
      />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full bg-forensic-900 border border-forensic-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-police-crimson/20 border border-police-crimson/40 flex items-center justify-center text-police-crimson animate-pulse">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-police-crimson uppercase tracking-widest">
              Error 404 · Unresolved Dossier
            </span>
            <h1 className="text-2xl font-extrabold text-white">
              Case File Not Found: Evidence Missing
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              The page, case file, or judicial citation you are searching for has been moved, purged, or does not exist in this court registry.
            </p>
          </div>

          {/* Integrated Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies, sections, or simulator..."
              className="w-full bg-forensic-950 border border-forensic-750 rounded-xl pl-10 pr-24 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-evidence-cyan text-forensic-950 text-xs font-bold rounded-lg hover:bg-evidence-glow transition-colors"
            >
              Search
            </button>
          </form>

          {/* Popular Links */}
          <div className="space-y-2 pt-2 border-t border-forensic-800/80">
            <span className="text-[11px] font-mono uppercase text-slate-500 block">
              Suggested Legal Destinations
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <Link
                to="/analyzer"
                className="px-3 py-1.5 rounded-lg bg-forensic-950 hover:bg-forensic-850 text-slate-300 border border-forensic-800"
              >
                Crime Analyzer
              </Link>
              <Link
                to="/case-studies"
                className="px-3 py-1.5 rounded-lg bg-forensic-950 hover:bg-forensic-850 text-slate-300 border border-forensic-800"
              >
                Case Studies Library
              </Link>
              <Link
                to="/simulator"
                className="px-3 py-1.5 rounded-lg bg-forensic-950 hover:bg-forensic-850 text-slate-300 border border-forensic-800"
              >
                Crime Simulator
              </Link>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/">
              <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
