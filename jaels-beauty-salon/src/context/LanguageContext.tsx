'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'es';
type LangCtx = { lang: Lang; toggleLang: () => void };

const LanguageContext = createContext<LangCtx>({ lang: 'en', toggleLang: () => {} });
export const useLang = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'es' : 'en'));
  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
