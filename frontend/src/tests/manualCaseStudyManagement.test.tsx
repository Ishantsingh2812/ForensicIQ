import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CaseCard } from '../components/cases/CaseCard';
import { FilterBar } from '../components/cases/FilterBar';
import { DeleteConfirmModal } from '../components/cases/DeleteConfirmModal';
import { CaseStudyPreviewModal } from '../components/cases/CaseStudyPreviewModal';
import { CaseStudy } from '../types';

describe('Manual Case Study Management UI Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCaseStudy: CaseStudy = {
    id: 'CS-TEST-001',
    slug: 'state-v-test-case-2024',
    title: 'State of Maharashtra v. Test Accused (Armed Snatching)',
    category: 'Robbery',
    difficulty: 'Intermediate',
    summary: 'Detailed statutory analysis of armed snatching at bus terminus.',
    overview: 'Pedagogical overview of weapon use.',
    date: '2024-03-15',
    decisionYear: 2024,
    jurisdiction: 'Bombay High Court',
    court: 'Bombay High Court',
    citation: '(2024) 2 BomCR 450',
    judgmentUrl: 'https://judgments.ecourts.gov.in/test.pdf',
    status: 'PUBLISHED',
    sectionsApplied: [{ act: 'BNS', section: 'Section 304', title: 'Snatching' }],
    factsTimeline: [{ time: '10:00 AM', event: 'Suspect grabbed necklace' }],
    evidenceList: [],
    outcome: 'Conviction upheld.',
  };

  const mockDraftCaseStudy: CaseStudy = {
    ...mockCaseStudy,
    id: 'CS-DRAFT-002',
    slug: 'draft-case-2024',
    title: 'State of Gujarat v. Unsettled Investigation Report',
    status: 'DRAFT',
  };

  it('CaseCard renders Published status badge and management buttons when canManage is true', () => {
    const onEdit = vi.fn();
    const onToggleStatus = vi.fn();
    const onDelete = vi.fn();

    render(
      <BrowserRouter>
        <CaseCard
          caseStudy={mockCaseStudy}
          canManage={true}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      </BrowserRouter>
    );

    // Published badge
    expect(screen.getByText(/Published/i)).toBeInTheDocument();

    // Edit button
    const editBtn = screen.getByRole('button', { name: /Edit/i });
    expect(editBtn).toBeInTheDocument();
    fireEvent.click(editBtn);
    expect(onEdit).toHaveBeenCalledWith(mockCaseStudy);

    // Unpublish button (since currently Published)
    const toggleBtn = screen.getByRole('button', { name: /Unpublish/i });
    expect(toggleBtn).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(onToggleStatus).toHaveBeenCalledWith(mockCaseStudy);

    // Delete button
    const deleteBtn = screen.getByRole('button', { name: /Delete/i });
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith(mockCaseStudy);
  });

  it('CaseCard renders Draft status badge and Publish action button for drafts', () => {
    const onToggleStatus = vi.fn();

    render(
      <BrowserRouter>
        <CaseCard
          caseStudy={mockDraftCaseStudy}
          canManage={true}
          onToggleStatus={onToggleStatus}
        />
      </BrowserRouter>
    );

    // Draft badge
    expect(screen.getByText(/Draft/i)).toBeInTheDocument();

    // Publish action button
    const publishBtn = screen.getByRole('button', { name: /Publish/i });
    expect(publishBtn).toBeInTheDocument();
    fireEvent.click(publishBtn);
    expect(onToggleStatus).toHaveBeenCalledWith(mockDraftCaseStudy);
  });

  it('FilterBar displays publication status selector when canManage is true', () => {
    const onSelectStatus = vi.fn();

    render(
      <FilterBar
        categories={['All', 'Robbery', 'Assault']}
        selectedCategory="All"
        onSelectCategory={vi.fn()}
        searchQuery=""
        onSearchChange={vi.fn()}
        sortBy="newest"
        onSortChange={vi.fn()}
        selectedStatus="ALL"
        onSelectStatus={onSelectStatus}
        canManage={true}
      />
    );

    const statusSelect = screen.getByLabelText(/Status/i);
    expect(statusSelect).toBeInTheDocument();
    fireEvent.change(statusSelect, { target: { value: 'DRAFT' } });
    expect(onSelectStatus).toHaveBeenCalledWith('DRAFT');
  });

  it('DeleteConfirmModal displays warning, case title, and triggers confirm', () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <DeleteConfirmModal
        isOpen={true}
        onClose={onClose}
        onConfirm={onConfirm}
        caseTitle="State of Maharashtra v. Test Accused"
        isDeleting={false}
      />
    );

    expect(screen.getByText(/Delete Case Study/i)).toBeInTheDocument();
    expect(screen.getByText(/State of Maharashtra v\. Test Accused/i)).toBeInTheDocument();
    expect(screen.getByText(/This action is permanent and irreversible/i)).toBeInTheDocument();

    const confirmBtn = screen.getByRole('button', { name: /Confirm Delete/i });
    fireEvent.click(confirmBtn);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('CaseStudyPreviewModal displays live preview of the case study', () => {
    const onClose = vi.fn();

    render(
      <CaseStudyPreviewModal
        isOpen={true}
        onClose={onClose}
        caseStudy={mockCaseStudy}
      />
    );

    expect(screen.getByText(/Case Study Preview/i)).toBeInTheDocument();
    expect(screen.getByText(/State of Maharashtra v\. Test Accused \(Armed Snatching\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Detailed statutory analysis of armed snatching at bus terminus\./i)).toBeInTheDocument();
  });
});
