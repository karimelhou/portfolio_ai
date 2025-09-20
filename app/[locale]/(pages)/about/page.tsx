import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale } from '@/lib/i18n';

const photoUrl = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d';

export default function AboutPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const messages = getMessages(locale);
  const about = messages.about;

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <h1 className="section-title">{about.title}</h1>
          <p className="text-lg text-white/80">{about.intro}</p>
          <div className="space-y-4 text-white/70">
            {about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="glass-panel overflow-hidden p-0">
          <Image
            src={photoUrl}
            alt={about.photoAlt}
            width={900}
            height={1200}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="font-display text-2xl text-white">{about.focus.title}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {about.focus.items.map((item) => (
              <span key={item} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="font-display text-2xl text-white">{about.values.title}</h2>
          <div className="mt-4 grid gap-4">
            {about.values.items.map((value) => (
              <div key={value.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <h3 className="font-display text-lg text-white">{value.title}</h3>
                <p className="mt-2 text-sm text-white/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="section-title">{about.timeline.title}</h2>
        <div className="mt-8 space-y-6 border-l border-white/20 pl-6">
          {about.timeline.education.map((item) => (
            <div key={item.title} className="relative pl-6">
              <span className="absolute -left-9 mt-1 h-4 w-4 rounded-full border-2 border-white bg-ink-900" />
              <p className="text-sm uppercase tracking-widest text-white/60">{item.period}</p>
              <h3 className="mt-1 font-display text-xl text-white">{item.title}</h3>
              <p className="text-sm text-white/70">{item.place}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
