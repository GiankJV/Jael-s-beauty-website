'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Lang = 'en' | 'es';

type LangCtx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LangCtx | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  // hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('jael-lang');
    if (stored === 'en' || stored === 'es') {
      setLangState(stored);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = stored;
      }
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('jael-lang', next);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next;
    }
  };

  const toggleLang = () => setLang(lang === 'en' ? 'es' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

// Backward compatibility for existing imports
export const useLang = useLanguage;
