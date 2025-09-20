'use client';

import { LaptopMinimal, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const themes = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'Auto', icon: LaptopMinimal }
] as const;

type ThemeId = (typeof themes)[number]['id'];

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = theme ?? resolvedTheme ?? 'system';

  if (!mounted) {
    return (
      <div className="flex gap-1 rounded-full border border-white/10 bg-white/10 p-1 text-xs opacity-60">
        {themes.map(({ id }) => (
          <span key={id} className="px-2 py-1">
            {id}
          </span>
        ))}
      </div>
    );
  }

  const handleClick = (id: ThemeId) => {
    setTheme(id);
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 text-xs font-medium backdrop-blur">
      {themes.map(({ id, label, icon: Icon }) => {
        const isActive = activeTheme === id || (id === 'system' && activeTheme === 'system');
        return (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            className={clsx(
              'flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors duration-200',
              isActive
                ? 'bg-white text-ink-900 shadow-sm dark:bg-slate-100 dark:text-ink-900'
                : 'text-white/70 hover:text-white dark:text-slate-200/70'
            )}
            aria-pressed={isActive}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
