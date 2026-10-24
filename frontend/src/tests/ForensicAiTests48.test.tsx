import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { ScenarioForm } from '../components/analyzer/ScenarioForm';
import { LegalComparisonView } from '../components/analyzer/LegalComparisonView';
import { TentativeWarningBanner } from '../components/analyzer/TentativeWarningBanner';
import { PhotoEvidenceAnalyzer, ANNOTATIONS_STORAGE_KEY } from '../components/evidence/PhotoEvidenceAnalyzer';
import { SectionAnalysis } from '../types';

describe('ForensicIQ Frontend Test Suite (TC-43 through TC-48)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('TC-43: ScenarioForm renders input and triggers submission', () => {
    const handleSubmit = vi.fn();
    const handleCancel = vi.fn();

    render(
      <ScenarioForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={false}
      />
    );

    // Verify textarea is present
    const textarea = screen.getByPlaceholderText(/paste or write the factual crime scenario/i);
    expect(textarea).toBeInTheDocument();

    // Type valid legal incident
    const testScenario = 'Two individuals broke into a residential premises at 2 AM using a crowbar.';
    fireEvent.change(textarea, { target: { value: testScenario } });

    // Locate submission button
    const submitButton = screen.getByRole('button', { name: /analyze scenario/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeEnabled();

    // Click submit
    fireEvent.click(submitButton);

    // Verify submit handler was called
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(testScenario, 'BOTH');
  });

  it('TC-44: Legal source link renders with target="_blank" and rel="noopener noreferrer"', () => {
    const mockSections: SectionAnalysis[] = [
      {
        act: 'BNS',
        section: '304',
        title: 'Snatching',
        punishment: 'Imprisonment up to 3 years and fine',
        bnsEquivalent: 'Section 304',
        ipcEquivalent: 'Section 379/356',
        confidence: 0.94,
        mapping_type: 'EXACT',
        raw_statutory_text: 'Whoever, in order to committing of theft, suddenly or quickly or forcibly seizes...',
        simplified_text: 'Sudden or forcible seizure of property from person.',
        source_url: 'https://www.indiacode.nic.in/handle/123456789/20062'
      }
    ];

    render(<LegalComparisonView sections={mockSections} />);

    // Query official India Code source link
    const sourceLink = screen.getByRole('link', { name: /india code/i });
    expect(sourceLink).toBeInTheDocument();
    expect(sourceLink).toHaveAttribute('href', 'https://www.indiacode.nic.in/handle/123456789/20062');
    expect(sourceLink).toHaveAttribute('target', '_blank');
    expect(sourceLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('TC-45: Confidence <70% renders uncertainty warning and clarifying questions', () => {
    const confidence = 0.55;
    const missingFacts = ['Specific weapon used or threatened', 'Location context (public street vs domicile)'];
    const clarifyingQuestions = [
      'Was any implement or knife brandished?',
      'Did bodily contact cause visible contusion or bone fracture?'
    ];

    render(
      <TentativeWarningBanner
        confidence={confidence}
        missingFacts={missingFacts}
        clarifyingQuestions={clarifyingQuestions}
      />
    );

    // Verify Low Confidence Analysis header
    expect(screen.getByText(/low confidence analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/55%/)).toBeInTheDocument();
    expect(screen.getByText(/< 70% threshold/i)).toBeInTheDocument();

    // Verify missing facts & clarifying questions render
    expect(screen.getByText(/Specific weapon used or threatened/i)).toBeInTheDocument();
    expect(screen.getByText(/Was any implement or knife brandished\?/i)).toBeInTheDocument();
  });

  it('TC-46: Crime scene image renders clickable evidence markers at normalized coordinates', () => {
    render(<PhotoEvidenceAnalyzer />);

    const canvas = screen.getByTestId('crime-scene-canvas');
    expect(canvas).toBeInTheDocument();

    // E1 marker should be positioned at x: 35.5%, y: 62.0%
    const markerE1 = screen.getByTestId('evidence-marker-E1');
    expect(markerE1).toBeInTheDocument();
    expect(markerE1).toHaveStyle({
      left: '35.5%',
      top: '62%'
    });
  });

  it('TC-47: Annotation marker selection opens inspector drawer', () => {
    render(<PhotoEvidenceAnalyzer />);

    // Inspector should initially not be visible
    expect(screen.queryByTestId('evidence-inspector')).not.toBeInTheDocument();

    // Click marker E1
    const markerE1 = screen.getByTestId('evidence-marker-E1');
    fireEvent.click(markerE1);

    // Inspector should now open
    const inspector = screen.getByTestId('evidence-inspector');
    expect(inspector).toBeInTheDocument();
    expect(within(inspector).getByText(/Discharged 9mm Shell Casing/i)).toBeInTheDocument();
    expect(within(inspector).getByText(/X: 35.5%, Y: 62.0%/i)).toBeInTheDocument();
  });

  it('TC-48: Evidence annotations persist in local storage across sessions', () => {
    render(<PhotoEvidenceAnalyzer />);

    // Verify localStorage has been populated with the expected key prefix
    const storedData = localStorage.getItem(ANNOTATIONS_STORAGE_KEY);
    expect(storedData).not.toBeNull();

    const parsed = JSON.parse(storedData!);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThanOrEqual(3);
    expect(parsed[0].markerLabel).toBe('E1');
    expect(parsed[0].title).toBe('Discharged 9mm Shell Casing');
    expect(ANNOTATIONS_STORAGE_KEY).toMatch(/^forensicai_annotations_/);
  });
});
