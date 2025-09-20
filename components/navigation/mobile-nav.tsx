'use client';

import { Dialog } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';
import { useTranslation } from '@/components/providers/translation-provider';

export function MobileNav() {
  const [open, setOpen] = useState(false);
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
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/10 bg-white/10 p-2 text-white/80 transition hover:text-white"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-start justify-end">
          <Dialog.Panel className="glass-panel mr-4 mt-16 w-64 rounded-3xl bg-ink-900/95 p-4 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-sm font-semibold uppercase tracking-widest text-white/70">
                {messages.meta.siteName}
              </Dialog.Title>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 p-2 text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'rounded-2xl px-3 py-2 text-sm transition-colors',
                      isActive ? 'bg-white text-ink-900' : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {messages.nav[item.key as keyof typeof messages.nav]}
                  </Link>
                );
              })}
            </nav>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
