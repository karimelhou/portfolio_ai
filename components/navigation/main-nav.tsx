'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { LanguageSwitcher } from '@/components/navigation/language-switcher';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { useTranslation } from '@/components/providers/translation-provider';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { CommandPalette } from '@/components/command-palette';

export function MainNav() {
  const pathname = usePathname();
  const { locale, messages } = useTranslation();

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'experience', href: `/${locale}/experience` },
    { key: 'projects', href: `/${locale}/projects` },
    { key: 'skills', href: `/${locale}/skills` },
    { key: 'achievements', href: `/${locale}/achievements` },
    { key: 'resume', href: `/${locale}/resume` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'playground', href: `/${locale}/playground` }
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900/70 backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-glow">
              <span className="text-lg font-display text-white">KEH</span>
            </div>
            <div className="hidden flex-col text-sm leading-tight sm:flex">
              <span className="font-display text-base text-white">{messages.meta.siteName}</span>
              <span className="text-white/60">{messages.meta.tagline}</span>
            </div>
          </Link>
          <MobileNav />
        </div>
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={clsx(
                  'rounded-full px-4 py-2 text-sm transition-all duration-200 hover:-translate-y-0.5',
                  isActive
                    ? 'bg-white text-ink-900 shadow-glow dark:bg-slate-100'
                    : 'text-white/70 hover:text-white'
                )}
              >
                {messages.nav[item.key as keyof typeof messages.nav]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <CommandPalette />
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
