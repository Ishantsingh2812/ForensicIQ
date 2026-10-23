import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sparkles, BookOpen, Crosshair, Menu, X, Sun, Moon, LogIn, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Crime Analyzer', href: '/analyzer', icon: <Sparkles className="w-4 h-4 text-evidence-cyan" /> },
    { name: 'Case Studies', href: '/case-studies', icon: <BookOpen className="w-4 h-4 text-crime-amber" /> },
    { name: 'Crime Simulator', href: '/simulator', icon: <Crosshair className="w-4 h-4 text-police-crimson" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-forensic-950/85 border-b border-forensic-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-evidence-cyan rounded-lg p-1"
          aria-label="ForensicAI Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-forensic-800 to-forensic-900 border border-evidence-cyan/40 flex items-center justify-center shadow-forensic-glow">
            <Shield className="w-5 h-5 text-evidence-cyan" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              Forensic<span className="text-evidence-cyan">IQ</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-crime-amber/15 text-crime-amber rounded border border-crime-amber/30 uppercase">
                BNS · IPC
              </span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">
              CRIME ANALYSIS & FORENSIC ED
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(link.href)
                  ? 'bg-forensic-800/90 text-evidence-cyan border border-forensic-700 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-forensic-900'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Icons & Auth */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-forensic-850 border border-transparent hover:border-forensic-700 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-crime-amber" /> : <Moon className="w-4 h-4 text-evidence-cyan" />}
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 border-l border-forensic-800 pl-3">
              <div className="flex flex-col text-right">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1 justify-end">
                  <UserCheck className="w-3.5 h-3.5 text-legal-emerald" />
                  {user.name}
                </span>
                <span className="text-[10px] font-mono text-evidence-cyan">{user.role}</span>
              </div>
              <button
                onClick={logout}
                aria-label="Log out"
                title="Log out"
                className="p-1.5 text-slate-400 hover:text-police-crimson rounded-lg hover:bg-forensic-850"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                  Sign In
                </Button>
              </Link>
              <Link to="/analyzer">
                <Button variant="primary" size="sm">
                  Launch Analyzer
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-slate-400 hover:text-white"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open main menu"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-forensic-850"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-forensic-800 bg-forensic-900 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive(link.href)
                  ? 'bg-forensic-800 text-evidence-cyan border border-forensic-700'
                  : 'text-slate-300 hover:bg-forensic-850'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-forensic-800 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-2 rounded-lg bg-forensic-850">
                <div>
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-evidence-cyan">{user.role}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to="/analyzer" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="md" className="w-full">
                    Analyze Case
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
