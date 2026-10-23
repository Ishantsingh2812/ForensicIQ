import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div
      role="tablist"
      aria-label="Filter navigation"
      className={`flex space-x-1 p-1 bg-forensic-900/80 rounded-xl border border-forensic-800 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-evidence-cyan ${
              isActive
                ? 'bg-evidence-cyan/20 text-evidence-cyan border border-evidence-cyan/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-forensic-800/40'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-evidence-cyan text-forensic-950' : 'bg-forensic-800 text-slate-300'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
