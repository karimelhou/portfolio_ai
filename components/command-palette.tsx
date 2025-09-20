'use client';

import * as CommandPrimitive from 'cmdk';
import { Search } from 'lucide-react';
import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '@/components/providers/translation-provider';

export function CommandPalette() {
  const { locale, messages } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const pageCommands = useMemo(
    () => [
      { id: 'home', label: messages.nav.home, href: `/${locale}` },
      { id: 'about', label: messages.nav.about, href: `/${locale}/about` },
      { id: 'experience', label: messages.nav.experience, href: `/${locale}/experience` },
      { id: 'projects', label: messages.nav.projects, href: `/${locale}/projects` },
      { id: 'skills', label: messages.nav.skills, href: `/${locale}/skills` },
      { id: 'achievements', label: messages.nav.achievements, href: `/${locale}/achievements` },
      { id: 'resume', label: messages.nav.resume, href: `/${locale}/resume` },
      { id: 'contact', label: messages.nav.contact, href: `/${locale}/contact` },
      { id: 'playground', label: messages.nav.playground, href: `/${locale}/playground` }
    ],
    [locale, messages.nav]
  );

  const sectionCommands = useMemo(
    () => [
      { id: 'section-experience', label: `${messages.nav.experience} · ${messages.home.experience.title}`, href: `/${locale}#experience` },
      { id: 'section-projects', label: `${messages.nav.projects} · ${messages.projects.title}`, href: `/${locale}#projects` },
      { id: 'section-skills', label: `${messages.nav.skills} · ${messages.home.skills.title}`, href: `/${locale}#skills` },
      { id: 'section-achievements', label: `${messages.nav.achievements} · ${messages.home.achievements.title}`, href: `/${locale}#achievements` },
      { id: 'section-contact', label: `${messages.nav.contact}`, href: `/${locale}#contact` }
    ],
    [locale, messages]
  );

  const runCommand = (href: string) => {
    router.push(href as Route);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/70 transition hover:text-white md:flex"
      >
        <Search className="h-4 w-4" />
        <span>{messages.commandPalette.shortcuts}</span>
      </button>
      {open ? (
        <div className="command-palette-portal">
          <CommandPrimitive.Command className="command-palette-content">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-white/60" />
              <CommandPrimitive.CommandInput
                autoFocus
                placeholder={messages.commandPalette.placeholder}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
            </div>
            <CommandPrimitive.CommandList className="max-h-80 overflow-y-auto px-2 py-4">
              <CommandPrimitive.CommandEmpty className="px-3 py-6 text-center text-sm text-white/60">
                {messages.commandPalette.noResults}
              </CommandPrimitive.CommandEmpty>
              <CommandPrimitive.CommandGroup heading={messages.commandPalette.sections.pages} className="px-1">
                {pageCommands.map((item) => (
                  <CommandPrimitive.CommandItem
                    key={item.id}
                    onSelect={() => runCommand(item.href)}
                    className="cursor-pointer rounded-2xl px-3 py-2 text-sm text-white/80 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    {item.label}
                  </CommandPrimitive.CommandItem>
                ))}
              </CommandPrimitive.CommandGroup>
              <CommandPrimitive.CommandSeparator className="my-3 border-t border-white/10" />
              <CommandPrimitive.CommandGroup heading={messages.commandPalette.sections.sections} className="px-1">
                {sectionCommands.map((item) => (
                  <CommandPrimitive.CommandItem
                    key={item.id}
                    onSelect={() => runCommand(item.href)}
                    className="cursor-pointer rounded-2xl px-3 py-2 text-sm text-white/80 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    {item.label}
                  </CommandPrimitive.CommandItem>
                ))}
              </CommandPrimitive.CommandGroup>
            </CommandPrimitive.CommandList>
          </CommandPrimitive.Command>
        </div>
      ) : null}
    </>
  );
}
