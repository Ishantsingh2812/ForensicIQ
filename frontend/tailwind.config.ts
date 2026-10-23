import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Forensic Dark Theme Tokens
        forensic: {
          950: '#070a12', // Deep Void
          900: '#0b1120', // Crime Noir Slate
          850: '#10182b', // Card Surface
          800: '#17223b', // Card Border / Hover
          700: '#233354', // Muted Divider
          600: '#384d7a', // Subtle text
          500: '#526eab',
          400: '#7d9cd4',
          300: '#a8c2f0',
          200: '#d0e0fb',
          100: '#eef4ff',
        },
        // Accents
        evidence: {
          cyan: '#06b6d4',
          glow: '#22d3ee',
          dark: '#0891b2',
        },
        crime: {
          amber: '#f59e0b',
          gold: '#fbbf24',
          dark: '#d97706',
        },
        police: {
          crimson: '#ef4444',
          alert: '#dc2626',
          dark: '#991b1b',
        },
        legal: {
          emerald: '#10b981',
          teal: '#14b8a6',
          dark: '#047857',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'forensic-glow': '0 0 25px -5px rgba(6, 182, 212, 0.15)',
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.2)',
        'crimson-glow': '0 0 25px -5px rgba(239, 68, 68, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
