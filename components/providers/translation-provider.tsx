'use client';

import { createContext, useContext, useEffect } from 'react';
import type { Locale, Messages } from '@/lib/i18n';

type TranslationContextValue = {
  locale: Locale;
  messages: Messages;
};

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({
  locale,
  messages,
  children
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <TranslationContext.Provider value={{ locale, messages }}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }

  return context;
}
