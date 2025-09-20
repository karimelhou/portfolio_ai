import Link from 'next/link';
import type { Messages, Locale } from '@/lib/i18n';
import { ArrowRight } from 'lucide-react';

export function HomeIntro({ messages, locale }: { messages: Messages; locale: Locale }) {
  const intro = messages.home.intro;
  return (
    <section className="mt-24 grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h2 className="font-display text-3xl text-white sm:text-4xl">{intro.title}</h2>
        <p className="mt-4 text-lg text-white/80">{intro.text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 shadow-lg transition hover:-translate-y-0.5"
          >
            {intro.actions.projects}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            {intro.actions.contact}
          </Link>
        </div>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 text-white/80">
        <div className="absolute inset-0 dotted-overlay" />
        <div className="relative space-y-3 text-sm">
          <p>• {messages.resume.sections.summary.content}</p>
        </div>
      </div>
    </section>
  );
}
