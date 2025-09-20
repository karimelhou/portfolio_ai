'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { Messages } from '@/lib/i18n';

export function AchievementsDeck({ messages }: { messages: Messages }) {
  const achievements = messages.achievements;
  const [index, setIndex] = useState(0);
  const current = achievements.items[index];

  const next = () => setIndex((prev) => (prev + 1) % achievements.items.length);
  const prev = () => setIndex((prev) => (prev - 1 + achievements.items.length) % achievements.items.length);

  return (
    <section className="space-y-10">
      <div>
        <h1 className="section-title">{achievements.title}</h1>
        <p className="section-subtitle">{achievements.subtitle}</p>
      </div>
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-64 w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="glass-panel absolute inset-0 flex flex-col justify-center gap-3 p-8 text-center"
            >
              <p className="text-xs uppercase tracking-widest text-white/60">{current.type}</p>
              <h3 className="font-display text-2xl text-white">{current.title}</h3>
              <p className="text-sm text-white/70">{current.detail}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:border-white hover:text-white"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {achievements.items.map((item, idx) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setIndex(idx)}
                className={`h-2 w-6 rounded-full ${idx === index ? 'bg-white' : 'bg-white/30'}`}
                aria-label={item.title}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition hover:border-white hover:text-white"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
