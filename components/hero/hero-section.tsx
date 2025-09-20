import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import type { Messages, Locale } from '@/lib/i18n';
import { HeroCanvas } from '@/components/three/hero-canvas';

export function HeroSection({ messages, locale }: { messages: Messages; locale: Locale }) {
  const hero = messages.hero;

  return (
    <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-widest text-white/70">
          <span className="h-2 w-2 rounded-full bg-accent-blue" />
          {hero.eyebrow}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl">{hero.title}</h1>
        <p className="max-w-2xl text-lg text-white/80">{hero.subtitle}</p>
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <Link
            href={`/${locale}/resume`}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            {hero.ctaPrimary}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white"
          >
            {hero.ctaSecondary}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {hero.quickStats.map((stat) => (
            <div key={stat.label} className="glass-panel p-4">
              <p className="text-xs uppercase tracking-widest text-white/60">{stat.label}</p>
              <p className="mt-2 text-2xl font-display text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-white/60">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl lg:h-[520px]">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/30 via-transparent to-accent-amber/20" />
        <HeroCanvas />
      </div>
    </section>
  );
}
