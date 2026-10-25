import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { CaseCategory } from '../../types';

interface FilterBarProps {
  categories: (CaseCategory | 'All' | string)[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  selectedCourt?: string;
  onSelectCourt?: (court: string) => void;
  selectedYear?: string;
  onSelectYear?: (year: string) => void;
  selectedAct?: string;
  onSelectAct?: (act: string) => void;
  selectedEvidenceType?: string;
  onSelectEvidenceType?: (ev: string) => void;
  selectedStatus?: string;
  onSelectStatus?: (status: string) => void;
  canManage?: boolean;
  onResetFilters?: () => void;
}

const COURTS = [
  'All Courts',
  'Supreme Court of India',
  'High Court of Delhi',
  'Bombay High Court',
  'High Court of Karnataka',
];

const YEARS = ['All Years', '2024', '2023', '2020', '2019', '2015', '2011', '2000', '1999', '1975', '1966', '1958'];

const STATUTES = ['All Statutes', 'BNS', 'IPC', 'BSA', 'NDPS', 'IT Act', 'POCSO'];

const EVIDENCE_TYPES = ['All Evidence', 'Physical', 'Digital', 'Biological', 'Documentary'];

const STATUSES = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Published Only', value: 'PUBLISHED' },
  { label: 'Drafts Only', value: 'DRAFT' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCourt = 'All Courts',
  onSelectCourt,
  selectedYear = 'All Years',
  onSelectYear,
  selectedAct = 'All Statutes',
  onSelectAct,
  selectedEvidenceType = 'All Evidence',
  onSelectEvidenceType,
  selectedStatus = 'ALL',
  onSelectStatus,
  canManage = false,
  onResetFilters,
}) => {
  return (
    <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-4 shadow-xl space-y-4">
      {/* Top Search & Primary Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by landmark case name, legal issue, statutory provision, or keywords..."
            aria-label="Search case studies"
            className="w-full bg-forensic-950 border border-forensic-750 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs text-slate-400 font-mono">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-forensic-950 border border-forensic-700 text-xs text-white rounded-lg px-3 py-2 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            <option value="newest">Newest Decisions First</option>
            <option value="oldest">Historical Decisions First</option>
            <option value="title">Case Title (A-Z)</option>
          </select>

          {onResetFilters && (
            <button
              onClick={onResetFilters}
              title="Reset all filters"
              className="p-2 rounded-lg bg-forensic-850 hover:bg-forensic-800 border border-forensic-700 text-slate-300 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Multi-facet Dropdowns (Court, Year, Act, Evidence, Status) */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 ${canManage ? 'lg:grid-cols-5' : ''} gap-2.5 pt-1 text-xs`}>
        {/* Court */}
        <div>
          <label htmlFor="filter-court" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Court
          </label>
          <select
            id="filter-court"
            value={selectedCourt}
            onChange={(e) => onSelectCourt && onSelectCourt(e.target.value)}
            className="w-full bg-forensic-950 border border-forensic-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            {COURTS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label htmlFor="filter-year" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Decision Year
          </label>
          <select
            id="filter-year"
            value={selectedYear}
            onChange={(e) => onSelectYear && onSelectYear(e.target.value)}
            className="w-full bg-forensic-950 border border-forensic-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Statute / Act */}
        <div>
          <label htmlFor="filter-act" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Applicable Act
          </label>
          <select
            id="filter-act"
            value={selectedAct}
            onChange={(e) => onSelectAct && onSelectAct(e.target.value)}
            className="w-full bg-forensic-950 border border-forensic-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            {STATUTES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Evidence Type */}
        <div>
          <label htmlFor="filter-evidence" className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Evidence Type
          </label>
          <select
            id="filter-evidence"
            value={selectedEvidenceType}
            onChange={(e) => onSelectEvidenceType && onSelectEvidenceType(e.target.value)}
            className="w-full bg-forensic-950 border border-forensic-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-evidence-cyan focus:outline-none"
          >
            {EVIDENCE_TYPES.map((ev) => (
              <option key={ev} value={ev}>
                {ev}
              </option>
            ))}
          </select>
        </div>

        {/* Publication Status (for Faculty/Admin) */}
        {canManage && (
          <div>
            <label htmlFor="filter-status" className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              id="filter-status"
              value={selectedStatus}
              onChange={(e) => onSelectStatus && onSelectStatus(e.target.value)}
              className="w-full bg-forensic-950 border border-amber-500/40 text-amber-300 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-400 focus:outline-none"
            >
              {STATUSES.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Category Chips */}
      <div
        role="group"
        aria-label="Filter cases by category"
        className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-forensic-800/60"
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-evidence-cyan text-forensic-950 shadow-forensic-glow font-bold'
                  : 'bg-forensic-850 hover:bg-forensic-800 text-slate-300 border border-forensic-700'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
