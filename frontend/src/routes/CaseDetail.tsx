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
  MapPin,
  Clock,
  Scale,
  FileCheck2,
  Gavel,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

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
        <div className="h-6 bg-forensic-900 rounded w-1/4"></div>
        <div className="h-10 bg-forensic-900 rounded w-3/4"></div>
        <div className="h-48 bg-forensic-900 rounded-2xl"></div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Case File Not Found</h2>
        <p className="text-xs text-slate-400">The requested legal precedent could not be located.</p>
        <Link to="/case-studies">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Case Studies
          </Button>
        </Link>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.summary,
    datePublished: caseStudy.date,
    author: {
      '@type': 'Organization',
      name: 'ForensicAI Educational Foundation',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ForensicAI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://forensicai.in/favicon.svg',
      },
    },
  };

  return (
    <>
      <SEO
        title={`${caseStudy.title} | ForensicAI Legal Case Analysis`}
        description={caseStudy.summary.slice(0, 155)}
        canonicalUrl={`https://forensicai.in/case-studies/${caseStudy.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/case-studies" className="hover:text-evidence-cyan flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Archive
          </Link>
          <span>/</span>
          <span className="text-slate-200 truncate">{caseStudy.category}</span>
        </div>

        {/* Title & Metadata Header */}
        <div className="space-y-4 border-b border-forensic-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="crime">{caseStudy.category}</Badge>
            <span className="text-xs font-mono text-slate-400 bg-forensic-850 px-2 py-0.5 rounded border border-forensic-800">
              {caseStudy.difficulty}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {caseStudy.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              {caseStudy.date}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-500" />
              {caseStudy.jurisdiction}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed font-normal bg-forensic-900/60 p-4 rounded-xl border border-forensic-800">
            {caseStudy.summary}
          </p>
        </div>

        {/* Chronological Facts Timeline */}
        <section aria-labelledby="timeline-heading" className="space-y-4">
          <h2 id="timeline-heading" className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-evidence-cyan" />
            Chronological Investigation Facts Timeline
          </h2>
          <div className="relative pl-6 border-l-2 border-forensic-800 space-y-6">
            {caseStudy.factsTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-evidence-cyan border-4 border-forensic-950" />
                <span className="text-xs font-mono font-bold text-evidence-cyan block mb-1">
                  {item.time}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed bg-forensic-900 p-3 rounded-xl border border-forensic-800">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Statutory Sections Applied */}
        <section aria-labelledby="sections-heading" className="space-y-4">
          <h2 id="sections-heading" className="text-lg font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-crime-amber" />
            Statutory Penal Provisions Applied
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {caseStudy.sectionsApplied.map((sec, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-forensic-900 border border-forensic-800 space-y-1"
              >
                <span className="text-xs font-mono font-bold text-evidence-cyan bg-forensic-850 px-2 py-0.5 rounded border border-forensic-750">
                  {sec.act} · {sec.section}
                </span>
                <p className="text-xs font-semibold text-white pt-1">{sec.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Forensic Evidence Analysis */}
        <section aria-labelledby="evidence-heading" className="space-y-4">
          <h2 id="evidence-heading" className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-legal-emerald" />
            Physical &amp; Forensic Evidence Log
          </h2>
          <div className="space-y-2.5">
            {caseStudy.evidenceList.map((ev, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-forensic-900 border border-forensic-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
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

        {/* Judicial Outcome */}
        <section aria-labelledby="outcome-heading" className="space-y-3">
          <h2 id="outcome-heading" className="text-lg font-bold text-white flex items-center gap-2">
            <Gavel className="w-5 h-5 text-police-crimson" />
            Judicial Outcome &amp; Precedent Notes
          </h2>
          <div className="p-4 rounded-xl bg-forensic-900 border border-forensic-800 text-xs text-slate-200 leading-relaxed space-y-2">
            <p>{caseStudy.outcome}</p>
          </div>
        </section>

        {/* Action Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-forensic-900 via-forensic-850 to-forensic-900 border border-evidence-cyan/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-bold text-white">Want to evaluate similar scenarios?</h3>
            <p className="text-xs text-slate-400">Paste your crime facts into the dual-law analyzer.</p>
          </div>
          <Link to="/analyzer">
            <Button variant="primary" size="md" leftIcon={<Sparkles className="w-4 h-4" />}>
              Test with Analyzer
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
