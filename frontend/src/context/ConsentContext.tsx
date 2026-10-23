import React, { createContext, useContext, useEffect, useState } from 'react';
import { CookiePreferences } from '../types';

interface ConsentContextType {
  preferences: CookiePreferences;
  hasConsented: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: Partial<CookiePreferences>) => void;
  resetConsent: () => void;
}

const STORAGE_KEY = 'forensicai_cookie_consent_v1';

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  preferences: false,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(true); // default true to avoid flash before effect

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
        setHasConsented(true);
      } else {
        setHasConsented(false);
      }
    } catch {
      setHasConsented(false);
    }
  }, []);

  const save = (newPrefs: CookiePreferences) => {
    const updated = { ...newPrefs, necessary: true, timestamp: new Date().toISOString() };
    setPreferences(updated);
    setHasConsented(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store cookie preferences', e);
    }
  };

  const acceptAll = () => {
    save({ necessary: true, analytics: true, preferences: true });
  };

  const rejectNonEssential = () => {
    save({ necessary: true, analytics: false, preferences: false });
  };

  const savePreferences = (partial: Partial<CookiePreferences>) => {
    save({ ...preferences, ...partial, necessary: true });
  };

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPreferences(defaultPreferences);
    setHasConsented(false);
  };

  return (
    <ConsentContext.Provider
      value={{
        preferences,
        hasConsented,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        resetConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within a ConsentProvider');
  return ctx;
};
