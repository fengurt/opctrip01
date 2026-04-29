import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (zh: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_STORAGE_KEY = 'travel-trips-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'zh' || stored === 'en') return stored;
    }
    return 'zh'; // Default to Chinese
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(LANG_STORAGE_KEY, newLang);
  };

  // Helper function for inline translations
  const t = (zh: string, en: string) => (lang === 'zh' ? zh : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
