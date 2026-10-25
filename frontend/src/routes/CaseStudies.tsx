import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CaseStudy } from '../types';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { CaseCard } from '../components/cases/CaseCard';
import { FilterBar } from '../components/cases/FilterBar';
import { DeleteConfirmModal } from '../components/cases/DeleteConfirmModal';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';
import {
  BookOpen,
  FolderSearch,
  ShieldCheck,
  Plus,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

const CATEGORIES: string[] = [
  'All',
  'Assault & Bodily Harm',
  'Robbery',
  'Murder',
  'Electronic Evidence',
  'NDPS',
  'Property Theft',
  'Grievous Hurt',
  'Civil Dispute',
];

export const CaseStudies: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();

  const canManage = isAuthenticated && (user?.role === 'ADMIN' || user?.role === 'INSTRUCTOR');

  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<CaseStudy | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 12;

  const currentCategory = searchParams.get('category') || 'All';
  const currentCourt = searchParams.get('court') || 'All Courts';
  const currentYear = searchParams.get('year') || 'All Years';
  const currentAct = searchParams.get('act') || 'All Statutes';
  const currentEvidenceType = searchParams.get('evidenceType') || 'All Evidence';
  const currentStatus = searchParams.get('status') || (canManage ? 'ALL' : 'PUBLISHED');
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  const fetchCases = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await api.getCaseStudies({
        category: currentCategory,
        court: currentCourt,
        year: currentYear,
        act: currentAct,
        evidenceType: currentEvidenceType,
        search: searchQuery,
        sort: sortBy,
        status: currentStatus,
      });
      setCases(data);
    } catch (err: any) {
      console.error('Failed to load case studies', err);
      setErrorMsg(err.message || 'Failed to load case studies. Please verify connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [
    currentCategory,
    currentCourt,
    currentYear,
    currentAct,
    currentEvidenceType,
    currentStatus,
    searchQuery,
    sortBy,
  ]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleCategoryChange = (cat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All') nextParams.delete('category');
    else nextParams.set('category', cat);
    setSearchParams(nextParams);
    setCurrentPage(0);
  };

  const handleCourtChange = (court: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (court === 'All Courts') nextParams.delete('court');
    else nextParams.set('court', court);
    setSearchParams(nextParams);
    setCurrentPage(0);
  };

  const handleYearChange = (year: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (year === 'All Years') nextParams.delete('year');
    else nextParams.set('year', year);
    setSearchParams(nextParams);
    setCurrentPage(0);
  };

  const handleActChange = (act: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (act === 'All Statutes') nextParams.delete('act');
    else nextParams.set('act', act);
    setSearchParams(nextParams);
    setCurrentPage(0);
  };

  const handleEvidenceTypeChange = (ev: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (ev === 'All Evidence') nextParams.delete('evidenceType');
    else nextParams.set('evidenceType', ev);
    setSearchParams(nextParams);
    setCurrentPage(0);
  };

  const handleStatusChange = (status: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (status === 'ALL') nextParams.delete('status');
    else nextParams.set('status', status);
    setSearchParams(nextParams);
    setCurrentPage(0);
  };

  const handleSearchChange = (query: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (query) nextParams.set('search', query);
    else nextParams.delete('search');
    setSearchParams(nextParams);
    setCurrentPage(0);
  };

  const handleSortChange = (sort: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', sort);
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    setCurrentPage(0);
  };

  // Actions
  const handleEdit = (caseStudy: CaseStudy) => {
    navigate(`/case-studies/${caseStudy.id}/edit`);
  };

  const handleToggleStatus = async (caseStudy: CaseStudy) => {
    const nextStatus = caseStudy.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
    try {
      await api.updateCaseStudyStatus(caseStudy.id, nextStatus);
      showNotification(
        `Case study "${caseStudy.title}" ${nextStatus === 'PUBLISHED' ? 'published' : 'moved to drafts'}.`
      );
      fetchCases();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update status.');
    }
  };

  const handleDeleteClick = (caseStudy: CaseStudy) => {
    setDeleteTarget(caseStudy);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await api.deleteCaseStudy(deleteTarget.id);
      showNotification(`Case study "${deleteTarget.title}" deleted.`);
      setDeleteTarget(null);
      fetchCases();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete case study.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Pagination calculation
  const totalPages = Math.ceil(cases.length / pageSize) || 1;
  const pagedCases = cases.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <>
      <SEO
        title="Indian Criminal Case Studies &amp; Precedents Archive | ForensicIQ"
        description="Comprehensive learning library of landmark Indian criminal judgments across assault, robbery, homicide, cyber evidence, and NDPS with 16-point analytical breakdowns."
        canonicalUrl="https://forensicai.in/case-studies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <BookOpen className="w-7 h-7 text-crime-amber" />
              Forensic Case Studies &amp; Judicial Precedents Archive
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Curated legal learning library grounded in real Supreme Court of India and High Court judgments.
              Each case file provides a 16-point analytical breakdown comparing IPC 1860 with BNS 2023, evidentiary principles, and judicial holdings.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-2 text-xs bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Supreme Court Reports (SCR) Grounded</span>
            </div>

            {/* + Add Case Study button */}
            <Link to="/case-studies/new">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                className="font-bold shadow-forensic-glow"
              >
                + Add Case Study
              </Button>
            </Link>
          </div>
        </div>

        {/* Action Notifications */}
        {notification && (
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center justify-between gap-2.5 animate-in fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={fetchCases}
              className="text-xs text-white underline hover:text-red-200 font-semibold"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filter & Search Bar */}
        <FilterBar
          categories={CATEGORIES}
          selectedCategory={currentCategory}
          onSelectCategory={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          selectedCourt={currentCourt}
          onSelectCourt={handleCourtChange}
          selectedYear={currentYear}
          onSelectYear={handleYearChange}
          selectedAct={currentAct}
          onSelectAct={handleActChange}
          selectedEvidenceType={currentEvidenceType}
          onSelectEvidenceType={handleEvidenceTypeChange}
          selectedStatus={currentStatus}
          onSelectStatus={handleStatusChange}
          canManage={canManage}
          onResetFilters={handleResetFilters}
        />

        {/* Results Counter & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            Showing <strong className="text-white">{cases.length}</strong> precedent case stud{cases.length !== 1 ? 'ies' : 'y'}
            {canManage && (
              <span className="ml-2 font-mono text-[11px] text-amber-400/80">
                (Faculty Management Mode Active)
              </span>
            )}
          </span>

          {(currentCategory !== 'All' ||
            currentCourt !== 'All Courts' ||
            currentYear !== 'All Years' ||
            currentAct !== 'All Statutes' ||
            currentEvidenceType !== 'All Evidence' ||
            currentStatus !== (canManage ? 'ALL' : 'PUBLISHED') ||
            searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-evidence-cyan hover:underline font-semibold"
            >
              Clear all active filters
            </button>
          )}
        </div>

        {/* Case Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-forensic-900/60 rounded-2xl border border-forensic-800 animate-pulse" />
            ))}
          </div>
        ) : cases.length === 0 ? (
          <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-12 text-center space-y-4">
            <FolderSearch className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Matching Precedents Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We could not find any case studies matching your search filters. Try broadening the search terms or clearing specific category chips.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-evidence-cyan text-forensic-950 font-bold text-xs rounded-xl hover:bg-evidence-glow transition-all"
              >
                Reset Filters
              </button>
              <Link to="/case-studies/new">
                <Button variant="secondary" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                  Add New Case Study
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pagedCases.map((c) => (
                <CaseCard
                  key={c.id}
                  caseStudy={c}
                  canManage={canManage}
                  onEdit={handleEdit}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-forensic-800 text-xs text-slate-400">
                <span>
                  Page <strong className="text-white">{currentPage + 1}</strong> of <strong className="text-white">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={deleteTarget !== null}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
          caseTitle={deleteTarget?.title || ''}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};
