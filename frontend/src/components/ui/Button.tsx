import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-evidence-cyan hover:bg-evidence-glow text-forensic-950 font-semibold shadow-forensic-glow focus:ring-evidence-cyan focus:ring-offset-forensic-950',
      secondary:
        'bg-forensic-850 hover:bg-forensic-800 text-slate-100 border border-forensic-700 focus:ring-forensic-600 focus:ring-offset-forensic-950',
      outline:
        'border border-evidence-cyan/60 text-evidence-cyan hover:bg-evidence-cyan/10 focus:ring-evidence-cyan focus:ring-offset-forensic-950',
      danger:
        'bg-police-crimson hover:bg-police-alert text-white shadow-crimson-glow focus:ring-police-crimson focus:ring-offset-forensic-950',
      ghost:
        'text-slate-300 hover:text-white hover:bg-forensic-800/60 focus:ring-slate-500 focus:ring-offset-forensic-950',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs min-h-[36px]',
      md: 'px-4 py-2.5 text-sm min-h-[44px]',
      lg: 'px-6 py-3.5 text-base font-semibold min-h-[48px]', // Meets conversion CTA requirement (min 48px)
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-label="Loading"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
