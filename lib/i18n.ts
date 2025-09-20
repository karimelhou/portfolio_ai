import fr from '@/messages/fr.json';
import en from '@/messages/en.json';

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

const dictionaries = {
  fr,
  en
};

type Json = Record<string, unknown>;

function deepMerge(base: unknown, override: unknown): unknown {
  if (Array.isArray(base) && Array.isArray(override)) {
    return override;
  }

  if (isRecord(base) && isRecord(override)) {
    const result: Json = { ...base };
    Object.entries(override).forEach(([key, value]) => {
      const baseValue = result[key];
      result[key] = deepMerge(baseValue, value);
    });
    return result;
  }

  return override ?? base;
}

function isRecord(value: unknown): value is Json {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export type Messages = typeof fr;

export function getMessages(locale: Locale): Messages {
  if (locale === 'fr') {
    return dictionaries.fr;
  }

  const merged = deepMerge(dictionaries.fr, dictionaries[locale]) as Messages;
  return merged;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
