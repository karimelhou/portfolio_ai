'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import clsx from 'clsx';
import type { Locale } from '@/lib/i18n';
import { locales } from '@/lib/i18n';
import { useTranslation } from '@/components/providers/translation-provider';
import type { Route } from 'next';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function buildPath(pathname: string | null, locale: Locale) {
  if (!pathname) {
    return `/${locale}`;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  segments[0] = locale;
  return `/${segments.join('/')}`;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useTranslation();

  const onSelect = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      const nextPath = buildPath(pathname, nextLocale) as Route;
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${COOKIE_MAX_AGE}`;
      router.push(nextPath);
    },
    [locale, pathname, router]
  );

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 text-xs font-medium backdrop-blur">
      {locales.map((itemLocale) => {
        const isActive = itemLocale === locale;
        return (
          <button
            key={itemLocale}
            type="button"
            onClick={() => onSelect(itemLocale)}
            className={clsx(
              'px-3 py-1 rounded-full transition-colors duration-200',
              isActive
                ? 'bg-white text-ink-900 shadow-sm dark:bg-slate-100 dark:text-ink-900'
                : 'text-white/70 hover:text-white dark:text-slate-200/70'
            )}
            aria-pressed={isActive}
          >
            {itemLocale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
