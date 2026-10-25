import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Scale,
  Shield,
  BookOpen,
  Crosshair,
  ArrowRight,
  CheckCircle2,
  Lock,
  Gavel,
  ChevronDown,
  ChevronUp,
  FileText,
  Search,
  Calendar,
  Building2,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SEO } from '../components/layout/SEO';
import { mockSampleScenariosList } from '../lib/mocks/analysis';
import { mockCaseStudies } from '../lib/mocks/cases';
import { api } from '../lib/api';
import { CaseStudy } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [miniScenario, setMiniScenario] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [featuredCases, setFeaturedCases] = useState<CaseStudy[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);

  useEffect(() => {
    const loadFeaturedCases = async () => {
      try {
        const data = await api.getCaseStudies();
        if (data && data.length > 0) {
          setFeaturedCases(data.slice(0, 3));
        } else {
          setFeaturedCases(mockCaseStudies.slice(0, 3));
        }
      } catch (err) {
        console.warn('Using local fallback for featured case studies', err);
        setFeaturedCases(mockCaseStudies.slice(0, 3));
      } finally {
        setLoadingCases(false);
      }
    };
    loadFeaturedCases();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleMiniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (miniScenario.trim()) {
      navigate('/analyzer', { state: { initialScenario: miniScenario } });
    } else {
      navigate('/analyzer');
    }
  };

  const faqs = [
    {
      q: 'How does ForensicAI map the Indian Penal Code (IPC) to Bharatiya Nyaya Sanhita (BNS)?',
      a: 'ForensicAI utilizes dense and sparse hybrid vector retrieval over the official Ministry of Law & Justice gazettes. Every factual element is evaluated against both historical IPC sections and their corresponding BNS 2023 equivalents, including key sentencing differences and statutory ingredient variations.',
    },
    {
      q: 'Is ForensicAI authorized to offer legal representation or advice?',
      a: 'No. ForensicAI is an academic, forensic training, and investigative pedagogy platform designed strictly for law students, police academy cadets, and forensic trainees. It must never be used as a replacement for advice from a licensed advocate.',
    },
    {
      q: 'How does the Chain-of-Custody Simulator grade evidence collection?',
      a: 'The simulator enforces statutory forensics standards (NDPS Standing Order 1/89 and Section 63 BSA). Scores drop whenever users violate collection order, fail to seal packages, or miss panch witness signatures.',
    },
    {
      q: 'How does the platform ensure data privacy under the DPDP Act 2023?',
      a: 'All scenarios undergo client-side PII detection to identify Aadhaar, PAN, phone numbers, and emails with one-click redaction. Furthermore, raw scenario prompts are never stored in server audit logs.',
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'ForensicAI',
      url: 'https://forensicai.in',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://forensicai.in/case-studies?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'ForensicAI Educational Foundation',
      url: 'https://forensicai.in',
      logo: 'https://forensicai.in/favicon.svg',
      description: 'Educational crime analysis and legal mapping platform for Indian criminal law (IPC, BNS, BNSS, BSA).',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <>
      <SEO
        title="ForensicIQ | AI Crime Analysis & Forensic Education Platform"
        description="Paste raw crime scenarios and receive structured Indian legal analysis mapping IPC to BNS/BNSS/BSA. Features case library and crime scene simulator."
        canonicalUrl="https://forensicai.in"
        jsonLd={jsonLd}
      />

      <div className="flex flex-col items-center w-full">
        {/* HERO SECTION (Above the Fold) */}
        <section className="w-full relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-forensic-800/80 bg-gradient-to-b from-forensic-950 via-forensic-900 to-forensic-950">
          {/* Subtle Grid Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#17223b15_1px,transparent_1px),linear-gradient(to_bottom,#17223b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center space-y-6">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="evidence" icon={<Scale className="w-3.5 h-3.5" />}>
                IPC ↔ BNS 2023 Mapped
              </Badge>
              <Badge variant="crime" icon={<Shield className="w-3.5 h-3.5" />}>
                Built for Law & Forensic Academies
              </Badge>
              <Badge variant="legal" icon={<Lock className="w-3.5 h-3.5" />}>
                DPDP Act 2023 Compliant
              </Badge>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
              AI-Powered Crime Analysis &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-evidence-cyan via-evidence-glow to-crime-amber">
                Forensic Legal Mapping
              </span>
            </h1>

            {/* One-line Value Proposition */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Transform unstructured crime facts into instant statutory charges, evidentiary checklists, and adversarial defense critiques under Indian law.
            </p>

            {/* Conversion CTA Group: Primary CTA visible without scroll at 375, 768, 1024, 1280px+ */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full max-w-md justify-center">
              <Link to="/analyzer" className="w-full sm:w-auto">
                <Button
                  size="lg" // Min 48px height
                  variant="primary"
                  className="w-full sm:w-auto text-base px-8 py-3.5 font-bold shadow-forensic-glow"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Analyze Scenario Now
                </Button>
              </Link>

              <Link to="/simulator" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto text-base px-6 py-3.5 font-semibold"
                  leftIcon={<Crosshair className="w-5 h-5 text-police-crimson" />}
                >
                  Try Crime Simulator
                </Button>
              </Link>
            </div>

            {/* Inline Mini-Demo Input */}
            <div className="w-full max-w-2xl mt-8 pt-4">
              <form
                onSubmit={handleMiniSubmit}
                className="p-2 sm:p-3 bg-forensic-900/90 border border-forensic-700 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center gap-2"
              >
                <div className="relative w-full flex-1">
                  <input
                    type="text"
                    value={miniScenario}
                    onChange={(e) => setMiniScenario(e.target.value)}
                    placeholder="Try a quick scenario: 'Two bikers snatched a gold chain at knife point in Delhi...'"
                    className="w-full bg-forensic-950 border border-forensic-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
                  />
                </div>
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  className="w-full sm:w-auto shrink-0 font-bold"
                >
                  Quick Test
                </Button>
              </form>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-[11px] text-slate-400">
                <span>Or load sample:</span>
                {mockSampleScenariosList.map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMiniScenario(sample.text);
                      navigate('/analyzer', { state: { initialScenario: sample.text } });
                    }}
                    className="text-evidence-cyan hover:underline hover:text-evidence-glow"
                  >
                    {sample.category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3 CORE PILLARS SECTION */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Complete Forensic &amp; Legal Education Pipeline
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Engineered for Indian police academies, national law universities, and forensic science laboratories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-evidence-cyan/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-evidence-cyan/15 border border-evidence-cyan/30 flex items-center justify-center text-evidence-cyan">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Dual-Law Crime Analyzer</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Parse raw narrative facts into side-by-side IPC and Bharatiya Nyaya Sanhita (BNS) statutory sections with bailable/cognizable classifications and prosecution ingredients.
              </p>
              <Link to="/analyzer" className="inline-flex items-center text-xs text-evidence-cyan font-bold hover:underline">
                Explore Analyzer &rarr;
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-crime-amber/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-crime-amber/15 border border-crime-amber/30 flex items-center justify-center text-crime-amber">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Case Study Archive</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore real Indian criminal precedents across NDPS, Robbery, Grievous Hurt, and Homicide with chronological fact timelines and forensic ballistics/toxicology analyses.
              </p>
              <Link to="/case-studies" className="inline-flex items-center text-xs text-crime-amber font-bold hover:underline">
                Browse 10+ Precedents &rarr;
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl space-y-4 hover:border-police-crimson/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-police-crimson/15 border border-police-crimson/30 flex items-center justify-center text-police-crimson">
                <Crosshair className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Chain-of-Custody Simulator</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Practice evidence collection on interactive SVG scenes. Secure biological swabs, digital memory dumps, and fingerprints while maintaining strict statutory chain of custody.
              </p>
              <Link to="/simulator" className="inline-flex items-center text-xs text-police-crimson font-bold hover:underline">
                Launch Simulator &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED LANDMARK CASE STUDIES SECTION */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl border-t border-forensic-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-crime-amber/15 text-crime-amber border border-crime-amber/30 mb-3">
                <Gavel className="w-3.5 h-3.5" />
                Verified Judicial Precedents
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Featured Landmark Case Studies
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Ground your legal learning in verified Supreme Court of India precedents. Examine statutory reasoning, evidentiary burdens, and IPC-to-BNS statutory transitions.
              </p>
            </div>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-evidence-cyan font-bold hover:underline shrink-0"
            >
              Explore Full Case Archive &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCases.map((cs) => {
              const courtName = cs.court || cs.jurisdiction || 'Supreme Court of India';
              const year = cs.decisionYear || (cs.date ? cs.date.substring(0, 4) : 'Landmark');
              const summaryText = cs.overview || cs.summary || '';
              const linkUrl = `/case-studies/${cs.slug || cs.id}`;

              return (
                <div
                  key={cs.id}
                  className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-evidence-cyan/40 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-evidence-cyan/15 text-evidence-cyan border border-evidence-cyan/30 uppercase tracking-wider">
                        {cs.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{year}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-evidence-cyan transition-colors line-clamp-2">
                      {cs.title}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{courtName}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {summaryText}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-forensic-800/80 flex items-center justify-between">
                    <Link
                      to={linkUrl}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-forensic-800 hover:bg-forensic-700 hover:text-evidence-cyan border border-forensic-700 transition-colors shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Read Case Study
                      <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-4xl border-t border-forensic-800">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">
              Clarifications on Indian penal code mapping, forensics education, and data handling.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-forensic-900 border border-forensic-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                  className="w-full p-4 text-left font-semibold text-sm text-slate-100 flex items-center justify-between hover:bg-forensic-850"
                >
                  <span>{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-evidence-cyan shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 text-xs text-slate-300 leading-relaxed border-t border-forensic-850">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
