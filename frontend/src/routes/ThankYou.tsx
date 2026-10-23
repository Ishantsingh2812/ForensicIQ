import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, BookOpen, Share2, Copy, Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';

export const ThankYou: React.FC = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action') || 'waitlist';
  const [copied, setCopied] = useState(false);

  const actionDetails: Record<string, { title: string; desc: string }> = {
    feedback: {
      title: 'Thank You for Your Feedback!',
      desc: 'Your critique helps train our cross-encoder and refine Indian criminal statutory mapping for learners nationwide.',
    },
    waitlist: {
      title: 'You are on the ForensicAI Academic Waitlist!',
      desc: 'We are gradually onboarding law schools and state police academies. We will notify you when institutional cohort features go live.',
    },
    report: {
      title: 'PDF Legal Report Generated Successfully!',
      desc: 'Your structured analysis report includes side-by-side IPC/BNS provisions, evidentiary protocols, and defense vulnerability analysis.',
    },
  };

  const current = actionDetails[action] || actionDetails.waitlist;

  const handleShare = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ForensicAI - Indian Crime Analysis & Forensic Platform',
          text: 'Check out ForensicAI for analyzing criminal law scenarios and practicing chain-of-custody protocols.',
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <SEO
        title="Thank You | ForensicAI"
        description="Confirmation screen for ForensicAI actions, reports, and waitlist subscriptions."
        canonicalUrl="https://forensicai.in/thank-you"
        noIndex={true}
      />

      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-forensic-900 border border-forensic-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-legal-emerald/20 border border-legal-emerald/40 flex items-center justify-center text-legal-emerald">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">{current.title}</h1>
            <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link to="/analyzer">
              <Button
                variant="primary"
                size="lg" // Min 48px
                className="w-full font-bold shadow-forensic-glow"
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Analyze Another Crime Case
              </Button>
            </Link>

            <Link to="/case-studies">
              <Button
                variant="secondary"
                size="md"
                className="w-full font-semibold"
                leftIcon={<BookOpen className="w-4 h-4 text-crime-amber" />}
              >
                Explore 10+ Case Studies
              </Button>
            </Link>

            <Button
              variant="outline"
              size="md"
              onClick={handleShare}
              leftIcon={copied ? <Check className="w-4 h-4 text-legal-emerald" /> : <Share2 className="w-4 h-4" />}
            >
              {copied ? 'Link Copied to Clipboard' : 'Share ForensicAI Platform'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
