import React from 'react';
import { PhotoEvidenceAnalyzer } from '../components/evidence/PhotoEvidenceAnalyzer';
import { SEO } from '../components/layout/SEO';

export const EvidenceStudio: React.FC = () => {
  return (
    <>
      <SEO
        title="Crime Scene Photo Evidence Studio | ForensicAI"
        description="Interactive crime scene photo evidence studio. Plot normalized coordinate markers, generate visual hypotheses, and verify chain-of-custody compliance under Section 63 BSA & Section 105 BNSS."
        canonicalUrl="https://forensicai.in/evidence-studio"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <PhotoEvidenceAnalyzer />
      </div>
    </>
  );
};
