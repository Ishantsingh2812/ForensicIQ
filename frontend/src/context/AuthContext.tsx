import React, { createContext, useContext, useEffect, useState } from 'react';
import { Role, User } from '../types';
import { api, setAccessToken } from '../lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string, role?: Role) => Promise<void>;
  logout: () => void;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt silent session hydration
    const hydrate = async () => {
      try {
        const refreshRes = await api.refreshToken();
        if (refreshRes) {
          const me = await api.getMe();
          if (me) setUser(me);
        }
      } catch (e) {
        console.warn('No active session found during hydration');
      } finally {
        setLoading(false);
      }
    };
    hydrate();
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    setUser(res.user);
  };

  const register = async (name: string, email: string, pass: string, role: Role = 'STUDENT') => {
    const res = await api.register(name, email, pass, role);
    setUser(res.user);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  const hasRole = (role: Role): boolean => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    if (user.role === 'INSTRUCTOR' && role === 'STUDENT') return true;
    return user.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
