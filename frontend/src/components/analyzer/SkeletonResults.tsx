import React from 'react';

export const SkeletonResults: React.FC = () => {
  return (
    <div className="space-y-6 w-full animate-pulse" aria-label="Loading analysis cards">
      {/* Top Banner Skeleton */}
      <div className="h-20 bg-forensic-900 border border-forensic-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="space-y-2 w-1/2">
          <div className="h-5 bg-forensic-800 rounded w-3/4"></div>
          <div className="h-3 bg-forensic-800 rounded w-1/3"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-28 bg-forensic-800 rounded-lg"></div>
          <div className="h-9 w-28 bg-forensic-800 rounded-lg"></div>
        </div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Acts & Sections */}
        <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 space-y-4">
          <div className="h-6 bg-forensic-800 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-16 bg-forensic-850 rounded-xl"></div>
            <div className="h-16 bg-forensic-850 rounded-xl"></div>
            <div className="h-16 bg-forensic-850 rounded-xl"></div>
          </div>
        </div>

        {/* Card 2: Bailable/Cognizable Status */}
        <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 space-y-4">
          <div className="h-6 bg-forensic-800 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="h-14 bg-forensic-850 rounded-xl"></div>
            <div className="h-14 bg-forensic-850 rounded-xl"></div>
            <div className="h-14 bg-forensic-850 rounded-xl"></div>
            <div className="h-14 bg-forensic-850 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Card 3: Prosecution Ingredients */}
      <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 space-y-4">
        <div className="h-6 bg-forensic-800 rounded w-1/4"></div>
        <div className="space-y-3">
          <div className="h-14 bg-forensic-850 rounded-xl"></div>
          <div className="h-14 bg-forensic-850 rounded-xl"></div>
        </div>
      </div>

      {/* Card 4: Required Evidence */}
      <div className="bg-forensic-900 border border-forensic-800 rounded-2xl p-6 space-y-4">
        <div className="h-6 bg-forensic-800 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="h-20 bg-forensic-850 rounded-xl"></div>
          <div className="h-20 bg-forensic-850 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};
