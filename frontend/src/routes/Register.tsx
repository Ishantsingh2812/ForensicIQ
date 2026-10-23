import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../lib/validators';
import { Role } from '../types';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/layout/SEO';
import { Shield, Lock, Mail, User, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('STUDENT');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: 'Full name is required' });
      return;
    }
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
      await register(name, email, password, role);
      navigate('/analyzer');
    } catch (err: any) {
      setErrors({ general: err.message || 'Registration failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Create Account | ForensicAI Crime Analysis & Education"
        description="Register for ForensicAI to access Indian criminal law analysis, simulator checkpoints, and educational case archives."
        canonicalUrl="https://forensicai.in/register"
        noIndex={true}
      />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-forensic-900 border border-forensic-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-evidence-cyan/20 border border-evidence-cyan/40 flex items-center justify-center text-evidence-cyan">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white">Create Educational Account</h1>
            <p className="text-xs text-slate-400">
              For law students, forensic cadets, and police academy trainees.
            </p>
          </div>

          {errors.general && (
            <div className="p-3 rounded-xl bg-police-crimson/10 border border-police-crimson/30 text-xs text-police-crimson">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="reg-name" className="text-xs font-semibold text-slate-300">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cadet Rahul Sharma"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
                />
              </div>
              {errors.name && <p className="text-[11px] text-police-crimson">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-email" className="text-xs font-semibold text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@policeacademy.gov.in"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
                />
              </div>
              {errors.email && <p className="text-[11px] text-police-crimson">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-password" className="text-xs font-semibold text-slate-300">
                Password (min 8 chars)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-forensic-950 border border-forensic-750 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
                />
              </div>
              {errors.password && <p className="text-[11px] text-police-crimson">{errors.password}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="reg-role" className="text-xs font-semibold text-slate-300">
                Academic Role
              </label>
              <select
                id="reg-role"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full bg-forensic-950 border border-forensic-750 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-evidence-cyan"
              >
                <option value="STUDENT">Law Student / Police Academy Cadet</option>
                <option value="INSTRUCTOR">Faculty / Forensic Instructor</option>
                <option value="ADMIN">Institutional Administrator</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg" // Min 48px
              isLoading={isLoading}
              className="w-full font-bold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Complete Registration
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Already registered?{' '}
            <Link to="/login" className="text-evidence-cyan font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
