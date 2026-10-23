import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'evidence' | 'crime' | 'police' | 'legal' | 'neutral' | 'outline';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  icon,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider select-none';

  const variants = {
    evidence: 'bg-evidence-cyan/15 text-evidence-cyan border border-evidence-cyan/30',
    crime: 'bg-crime-amber/15 text-crime-amber border border-crime-amber/30',
    police: 'bg-police-crimson/15 text-police-crimson border border-police-crimson/30',
    legal: 'bg-legal-emerald/15 text-legal-emerald border border-legal-emerald/30',
    neutral: 'bg-slate-700/40 text-slate-300 border border-slate-600/40',
    outline: 'border border-slate-700 text-slate-300 bg-transparent',
  };

  return (
    <span className={twMerge(clsx(base, variants[variant], className))} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
