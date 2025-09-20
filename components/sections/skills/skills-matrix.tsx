'use client';

import { useState } from 'react';
import clsx from 'clsx';
import type { Messages } from '@/lib/i18n';

export function SkillsMatrix({ messages }: { messages: Messages }) {
  const skills = messages.skills;
  const [active, setActive] = useState(skills.domains[0]?.id ?? 'ai');
  const activeDomain = skills.domains.find((domain) => domain.id === active) ?? skills.domains[0];

  return (
    <section className="space-y-10">
      <div>
        <h1 className="section-title">{skills.title}</h1>
        <p className="section-subtitle">{skills.subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.domains.map((domain) => (
          <button
            key={domain.id}
            type="button"
            onClick={() => setActive(domain.id)}
            className={clsx(
              'rounded-full px-5 py-2 text-sm transition',
              active === domain.id
                ? 'bg-white text-ink-900 shadow-glow'
                : 'border border-white/20 text-white/70 hover:border-white hover:text-white'
            )}
          >
            {domain.title}
          </button>
        ))}
      </div>
      {activeDomain ? (
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div>
            <h2 className="font-display text-2xl text-white">{activeDomain.title}</h2>
            <p className="mt-2 text-sm text-white/70">{activeDomain.description}</p>
          </div>
          <div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-amber to-white"
                style={{ width: `${activeDomain.proficiency}%` }}
              />
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-white/60">{activeDomain.proficiency}%</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
