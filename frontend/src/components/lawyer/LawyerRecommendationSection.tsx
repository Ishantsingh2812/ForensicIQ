import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  MapPin,
  ShieldCheck,
  Phone,
  ExternalLink,
  Mail,
  Building,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileBadge,
} from 'lucide-react';
import { LawyerListing, LawyerSearchResponse } from '../../types';
import { api } from '../../lib/api';
import { Button } from '../ui/Button';

interface LawyerRecommendationSectionProps {
  initialCity?: string;
  initialLegalIssue?: string;
}

const INDIAN_METROS = ['Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'Pune'];

const PRACTICE_AREAS = [
  'All Practice Areas',
  'Criminal Defense',
  'Assault & Bodily Harm',
  'Bail & Personal Liberty',
  'Property Theft & Robbery',
  'Cyber Crime',
  'NDPS & Narcotics',
  'White Collar Crime',
];

const LANGUAGES = ['All Languages', 'English', 'Hindi', 'Marathi', 'Kannada', 'Tamil', 'Urdu', 'Punjabi'];

export const LawyerRecommendationSection: React.FC<LawyerRecommendationSectionProps> = ({
  initialCity = 'Delhi',
  initialLegalIssue = 'Criminal Defense',
}) => {
  const [city, setCity] = useState<string>(initialCity);
  const [legalIssue, setLegalIssue] = useState<string>(initialLegalIssue);
  const [language, setLanguage] = useState<string>('All Languages');
  const [isLegalAidOnly, setIsLegalAidOnly] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<LawyerSearchResponse | null>(null);

  const fetchLawyers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.searchLawyers({
        city: city !== 'All' ? city : undefined,
        legalIssue: legalIssue !== 'All Practice Areas' ? legalIssue : undefined,
        language: language !== 'All Languages' ? language : undefined,
        isLegalAid: isLegalAidOnly,
      });
      setData(response);
    } catch (err: any) {
      setError('Unable to retrieve verified lawyer directory at this time. Please use NALSA direct assistance.');
      console.error('Lawyer fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [city, legalIssue, language, isLegalAidOnly]);

  const totalCount = data?.totalListings ?? 0;
  const uniqueCount = data?.uniqueLawyers ?? 0;
  const verifiedCount = data?.verifiedCount ?? 0;

  return (
    <section
      aria-labelledby="lawyer-section-heading"
      className="bg-forensic-900 border border-forensic-800 rounded-2xl shadow-xl overflow-hidden mt-6"
    >
      {/* Header */}
      <div className="p-5 border-b border-forensic-800/80 bg-gradient-to-r from-forensic-900 via-forensic-850 to-forensic-900 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-evidence-cyan/15 text-evidence-cyan border border-evidence-cyan/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 id="lawyer-section-heading" className="text-base font-bold text-white">
                Find a Relevant Lawyer
              </h3>
              <span
                data-testid="lawyer-dynamic-count"
                className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-evidence-cyan/20 text-evidence-cyan border border-evidence-cyan/30"
              >
                {totalCount} Found ({verifiedCount} Verified)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified legal aid counsel and advocates empanelled with State Legal Services Authorities and Bar Councils
            </p>
          </div>
        </div>

        {/* NALSA Direct Helpline Pill */}
        <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-xs text-emerald-300">
          <Phone className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span className="font-semibold">NALSA 24x7 Helpline: 15100</span>
          <span className="text-emerald-400/80 text-[11px]">(Toll-Free Legal Aid)</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 bg-forensic-950/50 border-b border-forensic-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* City Filter */}
        <div>
          <label htmlFor="lawyer-city-select" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            City / District
          </label>
          <select
            id="lawyer-city-select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-forensic-850 border border-forensic-700 text-white rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            {INDIAN_METROS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Practice Area Filter */}
        <div>
          <label htmlFor="lawyer-practice-select" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Legal Issue / Practice Area
          </label>
          <select
            id="lawyer-practice-select"
            value={legalIssue}
            onChange={(e) => setLegalIssue(e.target.value)}
            className="w-full bg-forensic-850 border border-forensic-700 text-white rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            {PRACTICE_AREAS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label htmlFor="lawyer-language-select" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Preferred Language
          </label>
          <select
            id="lawyer-language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-forensic-850 border border-forensic-700 text-white rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Legal Aid Toggle */}
        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-2 p-2 rounded-lg bg-forensic-850 border border-forensic-700 cursor-pointer hover:border-evidence-cyan/40 select-none">
            <input
              type="checkbox"
              checked={isLegalAidOnly}
              onChange={(e) => setIsLegalAidOnly(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-evidence-cyan focus:ring-evidence-cyan"
            />
            <span className="text-[11px] font-semibold text-slate-200">
              Free Legal Aid Only (NALSA / DLSA)
            </span>
          </label>
        </div>
      </div>

      {/* Dynamic Count Banner */}
      <div className="px-5 py-3 bg-slate-950/60 border-b border-forensic-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="h-2 w-2 rounded-full bg-evidence-cyan animate-pulse" />
          <span data-testid="lawyer-count-explanation" className="font-medium text-slate-200">
            {totalCount === 0
              ? `No verified lawyer listings found for this search in ${city}.`
              : `${totalCount} matching lawyer listing${totalCount !== 1 ? 's' : ''} found in your selected area (${uniqueCount} unique advocates, ${verifiedCount} with verified Bar Council enrollment details).`}
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-400 text-[11px]">
          <span>Location: <strong className="text-white">{city}</strong></span>
          <span>&bull;</span>
          <span>Area: <strong className="text-white">{legalIssue}</strong></span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-4">
        {/* Loading State */}
        {loading && (
          <div className="space-y-3 py-6 animate-pulse">
            <div className="h-24 bg-forensic-950 rounded-xl border border-forensic-800" />
            <div className="h-24 bg-forensic-950 rounded-xl border border-forensic-800" />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 text-rose-300 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Directory Search Encountered an Issue</span>
            </div>
            <p className="text-slate-300">{error}</p>
            <div className="pt-1">
              <Button size="sm" variant="secondary" onClick={fetchLawyers} leftIcon={<RotateCcw className="w-3.5 h-3.5" />}>
                Retry Directory Lookup
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && totalCount === 0 && (
          <div className="rounded-xl border border-slate-800 bg-forensic-950/40 p-6 text-center space-y-3 text-xs">
            <Users className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-sm font-bold text-white">No Matching Verified Listings in {city}</h4>
            <p className="text-slate-400 max-w-md mx-auto">
              No private advocates matching &ldquo;{legalIssue}&rdquo; are currently registered in our verified directory for {city}.
              However, statutory legal aid is guaranteed by the Constitution under Article 39A.
            </p>
            <div className="flex justify-center gap-3 pt-1">
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  setCity('Delhi');
                  setLegalIssue('All Practice Areas');
                  setIsLegalAidOnly(false);
                }}
              >
                Reset Search Filters
              </Button>
              <a
                href="https://nalsa.gov.in/faqs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 font-semibold"
              >
                <span>NALSA Legal Aid FAQs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Results List */}
        {!loading && !error && totalCount > 0 && data?.listings && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.listings.map((lawyer) => (
              <div
                key={lawyer.id}
                className={`rounded-xl border p-4 text-xs space-y-3 transition-all ${
                  lawyer.isLegalAid
                    ? 'border-emerald-500/40 bg-emerald-950/15 shadow-sm'
                    : 'border-forensic-800 bg-forensic-950/60 hover:border-forensic-700'
                }`}
              >
                {/* Title & Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{lawyer.name}</h4>
                      {lawyer.isLegalAid && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Free Statutory Legal Aid
                        </span>
                      )}
                    </div>
                    {lawyer.qualification && (
                      <p className="text-[11px] text-slate-300 font-medium">{lawyer.qualification}</p>
                    )}
                  </div>

                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Enrollment & Verification Source */}
                <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 space-y-1 text-[11px]">
                  {lawyer.barCouncilEnrollment && (
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-400">Enrollment / Panel ID:</span>
                      <span className="font-mono font-bold text-white">{lawyer.barCouncilEnrollment}</span>
                    </div>
                  )}
                  {lawyer.verificationSource && (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Source:</span>
                      <span className="text-slate-300 italic">{lawyer.verificationSource}</span>
                    </div>
                  )}
                  {lawyer.lastVerifiedDate && (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Last Verified:</span>
                      <span className="text-slate-300">{lawyer.lastVerifiedDate}</span>
                    </div>
                  )}
                </div>

                {/* Location & Address */}
                {lawyer.officeAddress && (
                  <div className="flex items-start gap-1.5 text-slate-300 text-[11px]">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{lawyer.officeAddress}</span>
                  </div>
                )}

                {/* Practice Areas */}
                {lawyer.practiceAreas && lawyer.practiceAreas.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Practice Areas:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {lawyer.practiceAreas.map((pa, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-forensic-850 border border-forensic-700 text-slate-200 text-[10px]"
                        >
                          {pa}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {lawyer.languages && lawyer.languages.length > 0 && (
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span className="text-slate-400">Languages:</span>
                    <span className="text-slate-300">{lawyer.languages.join(', ')}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {lawyer.phoneHelpline && (
                      <a
                        href={`tel:${lawyer.phoneHelpline}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold"
                      >
                        <Phone className="w-3 h-3 text-evidence-cyan" />
                        <span>{lawyer.phoneHelpline}</span>
                      </a>
                    )}
                    {lawyer.contactLink && (
                      <a
                        href={lawyer.contactLink}
                        target={lawyer.contactLink.startsWith('http') ? '_blank' : undefined}
                        rel={lawyer.contactLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1 text-evidence-cyan hover:underline text-xs font-medium"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Contact Counsel</span>
                      </a>
                    )}
                  </div>

                  {lawyer.publicProfileUrl && (
                    <a
                      href={lawyer.publicProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-semibold"
                    >
                      <span>Bar Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NALSA Statutory Free Legal Aid Explainer Card */}
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 via-forensic-900 to-emerald-950/20 p-4 space-y-2 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="font-bold text-emerald-300">
                National Legal Services Authority (NALSA) — Free Legal Representation
              </h4>
            </div>
            <a
              href="https://nalsa.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-semibold text-[11px]"
            >
              <span>Visit nalsa.gov.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-slate-300 leading-relaxed text-[11px]">
            Under <strong>Section 12 of the Legal Services Authorities Act, 1987</strong>, free legal aid by empanelled advocates is guaranteed to:
            women and children, persons in police or judicial custody, victims of mass disasters, violence or trafficking, members of SC/ST communities,
            and citizens whose annual income is below statutory thresholds (₹3,00,000 in Delhi).
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-slate-300">
            <span>National 24x7 Helpline: <strong className="text-white">15100</strong> (Toll-Free)</span>
            <span>&bull;</span>
            <span>Representation: <strong className="text-white">High Courts, Sessions Courts, Magistrate Courts</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
