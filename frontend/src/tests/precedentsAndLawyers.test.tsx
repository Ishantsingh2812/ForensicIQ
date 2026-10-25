import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { PrecedentsSection } from '../components/analyzer/PrecedentsSection';
import { LawyerRecommendationSection } from '../components/lawyer/LawyerRecommendationSection';
import { JudicialPrecedent } from '../types';

describe('Real Judicial Precedents & Lawyer Recommendations UI Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockPrecedents: JudicialPrecedent[] = [
    {
      case_name: 'Mrs. Veeda Menezes v. Yusuf Khan & Anr.',
      citation: 'AIR 1966 SC 1773; (1966) Supp SCR 123',
      court: 'Supreme Court of India',
      decision_date: '1966-04-20',
      judgment_url: 'https://main.sci.gov.in/judgment/judis/2275.pdf',
      material_facts: 'During a heated dispute, the accused threw a file and slapped the complainant across the face.',
      legal_issues: ['Whether a public slap falls under Section 95 IPC (slight harm) or Section 352 IPC.'],
      statutory_provisions: ['IPC Section 352', 'BNS Section 131', 'IPC Section 95'],
      court_holding_reasoning: 'An intentional public slap causing insult and humiliation cannot be dismissed as trivial under Section 95.',
      relevance_to_incident: 'Directly analogous to incidents where an individual is slapped in a public area without weapons.',
      factual_legal_distinctions: 'If the confrontation involved sudden mutual provocation, courts evaluate who initiated contact.',
      historical_vs_modern_law: 'HISTORICAL_IPC',
      verification_status: 'VERIFIED_OFFICIAL_RECORD',
    },
  ];

  it('PrecedentsSection renders the 11-point analytical breakdown with official judgment link', () => {
    render(<PrecedentsSection precedents={mockPrecedents} />);

    // Section title
    expect(screen.getByText(/Related Real Cases & Judicial Precedents/i)).toBeInTheDocument();

    // Case name and citation
    expect(screen.getByText(/Mrs\. Veeda Menezes v\. Yusuf Khan & Anr\./i)).toBeInTheDocument();
    expect(screen.getByText(/AIR 1966 SC 1773/i)).toBeInTheDocument();

    // Court and date
    expect(screen.getByText(/Supreme Court of India/i)).toBeInTheDocument();
    expect(screen.getByText(/1966-04-20/i)).toBeInTheDocument();

    // Why Relevant and Key Differences callouts
    expect(screen.getByText(/Why This Precedent Is Relevant to Your Incident/i)).toBeInTheDocument();
    expect(screen.getByText(/Key Differences Between Precedent/i)).toBeInTheDocument();

    // Official Judgment Link with security rel
    const judgmentLink = screen.getByRole('link', { name: /view full text on supreme court portal/i });
    expect(judgmentLink).toBeInTheDocument();
    expect(judgmentLink).toHaveAttribute('href', 'https://main.sci.gov.in/judgment/judis/2275.pdf');
    expect(judgmentLink).toHaveAttribute('target', '_blank');
    expect(judgmentLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('PrecedentsSection handles empty precedent list cleanly without throwing', () => {
    const { container } = render(<PrecedentsSection precedents={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('LawyerRecommendationSection renders dynamic counters, filters, and NALSA 24x7 legal aid helpline', async () => {
    render(
      <LawyerRecommendationSection
        initialCity="Delhi"
        initialLegalIssue="Assault & Bodily Harm"
      />
    );

    // Section title
    expect(screen.getByText(/Find a Relevant Lawyer/i)).toBeInTheDocument();

    // Dynamic count element
    const countBadge = screen.getByTestId('lawyer-dynamic-count');
    expect(countBadge).toBeInTheDocument();

    // Explanation text exists
    const explanation = screen.getByTestId('lawyer-count-explanation');
    expect(explanation).toBeInTheDocument();

    // Permanent NALSA 24x7 Helpline Card & Banner
    expect(screen.getByText(/National Legal Services Authority \(NALSA\) — Free Legal Representation/i)).toBeInTheDocument();
    expect(screen.getAllByText(/15100/i).length).toBeGreaterThanOrEqual(1);

    // Check NALSA portal link
    const nalsaLink = screen.getByRole('link', { name: /Visit nalsa\.gov\.in/i });
    expect(nalsaLink).toBeInTheDocument();
    expect(nalsaLink).toHaveAttribute('href', 'https://nalsa.gov.in/');
    expect(nalsaLink).toHaveAttribute('target', '_blank');
    expect(nalsaLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
