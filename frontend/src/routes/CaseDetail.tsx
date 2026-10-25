import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CaseStudy } from '../types';
import { api } from '../lib/api';
import { SEO } from '../components/layout/SEO';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  ArrowLeft,
  Calendar,
  Building2,
  Clock,
  Scale,
  FileCheck2,
  Gavel,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

function safeParse<T>(val: any, fallback: T): T {
  if (!val) return fallback;
  if (typeof val === 'object') return val as T;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

export const CaseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getCaseStudyBySlug(slug);
        setCaseStudy(data);
      } catch (e) {
        console.error('Error fetching case detail', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-6 bg-forensic-900 rounded w-1/4" />
        <div className="h-10 bg-forensic-900 rounded w-3/4" />
        <div className="h-48 bg-forensic-900 rounded-2xl" />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Case File Not Found</h2>
        <p className="text-xs text-slate-400">The requested legal precedent could not be located in our archive.</p>
        <Link to="/case-studies">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Case Studies Archive
          </Button>
        </Link>
      </div>
    );
  }

  // Safe parsing of multi-type JSON fields
  const timeline = safeParse<{ time: string; event: string }[]>(caseStudy.factsTimeline, []);
  const sections = safeParse<{ act: string; section: string; title: string }[]>(caseStudy.sectionsApplied, []);
  const evidence = safeParse<{ item: string; category: any; probativeValue: string }[]>(caseStudy.evidenceList, []);
  const issues = safeParse<string[]>(caseStudy.issuesBeforeCourt, []);
  const partyArgs = safeParse<{ party: string; argument: string }[]>(caseStudy.partyArguments, []);
  const principles = safeParse<string[]>(caseStudy.legalPrinciples, []);
  const ipcBnsComp = safeParse<{ ipc: string; bns: string; difference?: string }[]>(caseStudy.ipcBnsComparison, []);
  const relatedCases = safeParse<string[]>(caseStudy.relatedCases, []);

  const court = caseStudy.court || caseStudy.jurisdiction || 'Supreme Court of India';
  const year = caseStudy.decisionYear || (caseStudy.date ? caseStudy.date.split('-')[0] : '1966');

  return (
    <>
      <SEO
        title={`${caseStudy.title} | 16-Point Legal Analysis | ForensicIQ`}
        description={caseStudy.summary.slice(0, 155)}
        canonicalUrl={`https://forensicai.in/case-studies/${caseStudy.slug}`}
        ogType="article"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/case-studies" className="hover:text-evidence-cyan flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" />
            Case Studies Library
          </Link>
          <span>/</span>
          <span className="text-slate-200 truncate">{caseStudy.category}</span>
        </div>

        {/* 1. Case Title, Case Type & Meta Badges */}
        <div className="space-y-4 border-b border-forensic-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="crime">{caseStudy.category}</Badge>
            <span className="text-xs font-mono text-slate-300 bg-forensic-850 px-2.5 py-0.5 rounded border border-forensic-800">
              {caseStudy.caseType || 'Criminal Appeal'}
            </span>
            <span className="text-[11px] font-mono text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Verified Official Record
            </span>
            <span className="text-xs font-mono text-slate-400 bg-forensic-850 px-2 py-0.5 rounded border border-forensic-800">
              {caseStudy.difficulty}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {caseStudy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-mono">
            {caseStudy.citation && (
              <span className="text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                {caseStudy.citation}
              </span>
            )}
            <span className="flex items-center gap-1 text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              {court}
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {caseStudy.date} ({year})
            </span>
            {caseStudy.judgmentUrl && (
              <a
                href={caseStudy.judgmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-evidence-cyan hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Supreme Court / eCourts PDF</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* 2. Short, Accessible Overview */}
        <section aria-labelledby="overview-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-2">
          <h2 id="overview-heading" className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            2. Case Overview
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed">
            {caseStudy.overview || caseStudy.summary}
          </p>
        </section>

        {/* 3. Background & Material Facts */}
        <section aria-labelledby="facts-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-2">
          <h2 id="facts-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-evidence-cyan" />
            3. Background &amp; Material Facts
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
            {caseStudy.backgroundFacts || caseStudy.summary}
          </p>
        </section>

        {/* 4. Incident Timeline */}
        {timeline.length > 0 && (
          <section aria-labelledby="timeline-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h2 id="timeline-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-evidence-cyan" />
              4. Chronological Incident &amp; Investigation Timeline
            </h2>
            <div className="relative pl-6 border-l-2 border-forensic-800 space-y-4 text-xs">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-evidence-cyan border-4 border-forensic-950" />
                  <span className="font-mono font-bold text-evidence-cyan block mb-0.5">
                    {item.time}
                  </span>
                  <p className="text-slate-200 leading-relaxed bg-forensic-950/70 p-2.5 rounded-lg border border-forensic-800">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Issues Before the Court */}
        {issues.length > 0 && (
          <section aria-labelledby="issues-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 id="issues-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              5. Legal Issues Considered by the Court
            </h2>
            <ul className="space-y-2 text-xs list-disc list-inside text-slate-300">
              {issues.map((issue, idx) => (
                <li key={idx} className="leading-relaxed">
                  {issue}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 6. Applicable Legal Provisions */}
        {sections.length > 0 && (
          <section aria-labelledby="sections-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 id="sections-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-crime-amber" />
              6. Applicable Legal Provisions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {sections.map((sec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-forensic-950 border border-forensic-800 space-y-1">
                  <span className="font-mono font-bold text-evidence-cyan bg-forensic-850 px-2 py-0.5 rounded border border-forensic-750 text-[11px]">
                    {sec.act} · {sec.section}
                  </span>
                  <p className="font-semibold text-white pt-1">{sec.title}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Evidence Discussed in the Judgment */}
        {evidence.length > 0 && (
          <section aria-labelledby="evidence-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 id="evidence-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-legal-emerald" />
              7. Evidence Discussed in the Judgment
            </h2>
            <div className="space-y-2 text-xs">
              {evidence.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-forensic-950 border border-forensic-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-white">{ev.item}</span>
                    <p className="text-slate-400">
                      <strong className="text-slate-300">Probative Value:</strong> {ev.probativeValue}
                    </p>
                  </div>
                  <Badge variant="evidence">{ev.category}</Badge>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Arguments & Positions of Parties */}
        {partyArgs.length > 0 && (
          <section aria-labelledby="arguments-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 id="arguments-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-400" />
              8. Arguments &amp; Positions of the Parties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {partyArgs.map((pa, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-forensic-950 border border-forensic-800 space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-amber-300 block">
                    {pa.party}:
                  </span>
                  <p className="text-slate-200 leading-relaxed">{pa.argument}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. Court Reasoning */}
        {caseStudy.courtReasoning && (
          <section aria-labelledby="reasoning-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-2">
            <h2 id="reasoning-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <Gavel className="w-4 h-4 text-cyan-400" />
              9. Court Legal Reasoning &amp; Ratio Decidendi
            </h2>
            <p className="text-xs text-slate-200 leading-relaxed bg-forensic-950/70 p-3.5 rounded-xl border border-forensic-800 whitespace-pre-line">
              {caseStudy.courtReasoning}
            </p>
          </section>
        )}

        {/* 10. Final Judgment / Order */}
        <section aria-labelledby="order-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-2">
          <h2 id="order-heading" className="text-sm font-bold text-police-crimson flex items-center gap-1.5">
            <Gavel className="w-4 h-4" />
            10. Final Judgment &amp; Order
          </h2>
          <p className="text-xs text-slate-100 font-medium bg-police-crimson/10 p-3.5 rounded-xl border border-police-crimson/30">
            {caseStudy.finalOrder || caseStudy.outcome}
          </p>
        </section>

        {/* 11. Important Legal Principles */}
        {principles.length > 0 && (
          <section aria-labelledby="principles-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 id="principles-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              11. Foundational Legal Principles Established
            </h2>
            <div className="space-y-2 text-xs">
              {principles.map((p, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-forensic-950 p-2.5 rounded-lg border border-forensic-800 text-slate-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. Relevant IPC ↔ BNS Comparison */}
        {ipcBnsComp.length > 0 && (
          <section aria-labelledby="comparison-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h2 id="comparison-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-indigo-400" />
              12. Historical IPC ↔ Modern BNS/BSA Statutory Mapping
            </h2>
            <div className="space-y-2 text-xs">
              {ipcBnsComp.map((comp, idx) => (
                <div key={idx} className="p-3 bg-forensic-950 rounded-xl border border-forensic-800 space-y-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                    <span className="text-slate-400">IPC: <strong className="text-slate-200">{comp.ipc}</strong></span>
                    <span className="text-indigo-400">BNS: <strong className="text-indigo-300">{comp.bns}</strong></span>
                  </div>
                  {comp.difference && (
                    <p className="text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                      <strong className="text-amber-400">Evolution Note:</strong> {comp.difference}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 13. Related Cases & Cross-References */}
        {relatedCases.length > 0 && (
          <section aria-labelledby="cross-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-2">
            <h2 id="cross-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-400" />
              13. Related Judicial Precedents &amp; Citations
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {relatedCases.map((rc, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-forensic-950 text-slate-300 border border-forensic-800 font-mono text-[11px]">
                  {rc}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 14. Original Judgment Source Link */}
        {caseStudy.judgmentUrl && (
          <section aria-labelledby="source-heading" className="bg-gradient-to-r from-amber-950/20 via-forensic-900 to-amber-950/10 border border-amber-500/30 rounded-2xl p-5 shadow-xl space-y-2 text-xs">
            <h2 id="source-heading" className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4" />
              14. Official Judgment Record &amp; Authority Link
            </h2>
            <p className="text-slate-300">
              Access the original verbatim text of this judgment on the Supreme Court of India SCR or High Court repository:
            </p>
            <a
              href={caseStudy.judgmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 font-semibold"
            >
              <span>Open Official Court Judgment (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </section>
        )}

        {/* 15. Simplified "What Can We Learn from This Case?" */}
        {caseStudy.pedagogicalTakeaways && (
          <section aria-labelledby="learn-heading" className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 shadow-xl space-y-2 text-xs">
            <h2 id="learn-heading" className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              15. What Can We Learn from This Case?
            </h2>
            <p className="text-slate-200 leading-relaxed font-medium">
              {caseStudy.pedagogicalTakeaways}
            </p>
          </section>
        )}

        {/* 16. Distinction: Facts vs Findings vs Interpretation */}
        {caseStudy.factFindingDistinction && (
          <section aria-labelledby="distinction-heading" className="bg-forensic-900 border border-forensic-800 rounded-2xl p-5 shadow-xl space-y-2 text-xs">
            <h2 id="distinction-heading" className="text-sm font-bold text-white flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              16. Distinction: Documented Facts vs Judicial Findings vs Educational Interpretation
            </h2>
            <p className="text-slate-300 leading-relaxed bg-forensic-950/70 p-3 rounded-lg border border-forensic-800">
              {caseStudy.factFindingDistinction}
            </p>
          </section>
        )}

        {/* Action Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-forensic-900 via-forensic-850 to-forensic-900 border border-evidence-cyan/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white">Have a crime scenario with similar legal issues?</h3>
            <p className="text-xs text-slate-400">Run an instant factual analysis with dual-statute mapping and lawyer recommendations.</p>
          </div>
          <Link to="/analyzer">
            <Button variant="primary" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
              Analyze Your Scenario
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
