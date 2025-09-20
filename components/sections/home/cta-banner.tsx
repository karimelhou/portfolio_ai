import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Messages, Locale } from '@/lib/i18n';

export function CTABanner({ messages, locale }: { messages: Messages; locale: Locale }) {
  const cta = messages.home.cta;
  return (
    <section className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-br from-accent-blue/40 via-ink-800/90 to-accent-amber/40 p-10 text-white shadow-glow">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-3xl">{cta.title}</h2>
          <p className="mt-3 max-w-2xl text-white/80">{cta.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/contact`}
            className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 shadow-lg transition hover:-translate-y-0.5"
          >
            {cta.primary}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/${locale}/resume`}
            className="rounded-full border border-white/70 px-6 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            {cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
