import React from 'react';
import { Search } from 'lucide-react';
import { CaseCategory } from '../../types';

interface FilterBarProps {
  categories: (CaseCategory | 'All')[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-4 shadow-xl space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by keywords, sections, court jurisdiction, or crime facts..."
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
            <option value="newest">Newest Cases First</option>
            <option value="difficulty">By Difficulty (Trainee to Expert)</option>
          </select>
        </div>
      </div>

      {/* Category Chips */}
      <div
        role="group"
        aria-label="Filter cases by category"
        className="flex flex-wrap items-center gap-1.5 pt-1"
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
