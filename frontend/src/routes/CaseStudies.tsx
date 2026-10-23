import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CaseStudy, CaseCategory } from '../types';
import { api } from '../lib/api';
import { CaseCard } from '../components/cases/CaseCard';
import { FilterBar } from '../components/cases/FilterBar';
import { SEO } from '../components/layout/SEO';
import { BookOpen, FolderSearch } from 'lucide-react';

const CATEGORIES: (CaseCategory | 'All')[] = [
  'All',
  'NDPS',
  'Property Theft',
  'Robbery',
  'Grievous Hurt',
  'Murder',
];

export const CaseStudies: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const currentCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const data = await api.getCaseStudies({
          category: currentCategory,
          search: searchQuery,
          sort: sortBy,
        });
        setCases(data);
      } catch (err) {
        console.error('Failed to load case studies', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [currentCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All') nextParams.delete('category');
    else nextParams.set('category', cat);
    setSearchParams(nextParams);
  };

  const handleSearchChange = (query: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (query) nextParams.set('search', query);
    else nextParams.delete('search');
    setSearchParams(nextParams);
  };

  const handleSortChange = (sort: string) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('sort', sort);
    setSearchParams(nextParams);
  };

  return (
    <>
      <SEO
        title="Indian Criminal Case Studies &amp; Precedents Archive"
        description="Browse landmark Indian criminal cases across NDPS, Robbery, Grievous Hurt, and Homicide with forensic timelines and applied IPC/BNS statutory provisions."
        canonicalUrl="https://forensicai.in/case-studies"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-crime-amber" />
            Forensic Case Study Archive
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real and synthesized Indian criminal jurisprudence cases analyzed under IPC 1860 and BNS 2023.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <FilterBar
          categories={CATEGORIES}
          selectedCategory={currentCategory}
          onSelectCategory={handleCategoryChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        {/* Case Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-forensic-900 border border-forensic-800 rounded-2xl animate-pulse p-6 space-y-3">
                <div className="h-5 bg-forensic-800 rounded w-1/3"></div>
                <div className="h-6 bg-forensic-800 rounded w-3/4"></div>
                <div className="h-20 bg-forensic-850 rounded"></div>
              </div>
            ))}
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center py-16 px-4 bg-forensic-900 border border-forensic-800 rounded-2xl space-y-3">
            <FolderSearch className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No Precedents Found</h3>
            <p className="text-xs text-slate-500">
              Try adjusting your search keywords or switching category filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <CaseCard key={c.id} caseStudy={c} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
