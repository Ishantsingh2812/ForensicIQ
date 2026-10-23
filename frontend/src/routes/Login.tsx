import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../lib/validators';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';
import { Shield, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/analyzer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailV = validateEmail(email);
    const passV = validatePassword(password);

    if (!emailV.isValid || !passV.isValid) {
      setErrors({
        email: emailV.error,
        password: passV.error,
      });
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrors({ general: err.message || 'Login failed. Please check your credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Password123!');
    setIsLoading(true);
    try {
      await login(roleEmail, 'Password123!');
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrors({ general: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign In | ForensicAI Crime Analysis & Education"
        description="Sign in to ForensicAI with your academic or trainee account to access case history, export analysis reports, and practice simulations."
        canonicalUrl="https://forensicai.in/login"
        noIndex={true}
      />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-forensic-900 border border-forensic-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-evidence-cyan/20 border border-evidence-cyan/40 flex items-center justify-center text-evidence-cyan">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white">Sign In to ForensicAI</h1>
            <p className="text-xs text-slate-400">
              Access your saved crime scenario analyses and cohort records.
            </p>
          </div>

          {errors.general && (
            <div className="p-3 rounded-xl bg-police-crimson/10 border border-police-crimson/30 text-xs text-police-crimson">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="login-email" className="text-xs font-semibold text-slate-300">
                Institutional / Trainee Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@policeacademy.gov.in"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
                />
              </div>
              {errors.email && <p className="text-[11px] text-police-crimson">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="login-password" className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
                />
              </div>
              {errors.password && <p className="text-[11px] text-police-crimson">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg" // Min 48px
              isLoading={isLoading}
              className="w-full font-bold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          {/* Quick Demo Logins for evaluators */}
          <div className="pt-4 border-t border-forensic-800 space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-500 block text-center">
              One-Click Demo Personas
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('student@policeacademy.gov.in')}
                className="p-2 rounded-lg bg-forensic-950 hover:bg-forensic-800 border border-forensic-800 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('instructor@nludelhi.ac.in')}
                className="p-2 rounded-lg bg-forensic-950 hover:bg-forensic-800 border border-forensic-800 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Instructor
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin@forensicai.in')}
                className="p-2 rounded-lg bg-forensic-950 hover:bg-forensic-800 border border-forensic-800 text-[11px] font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Admin
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-evidence-cyan font-semibold hover:underline">
              Create student account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
