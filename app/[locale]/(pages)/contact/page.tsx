import { Mail, MapPin, Phone, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale } from '@/lib/i18n';
import { ContactForm } from '@/components/sections/contact/contact-form';

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <h1 className="section-title">{messages.contact.title}</h1>
        <p className="section-subtitle">{messages.contact.subtitle}</p>
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
          <a href={`mailto:${messages.common.email}`} className="flex items-center gap-3 text-white/80 transition hover:text-white">
            <Mail className="h-5 w-5" />
            <span>{messages.common.email}</span>
          </a>
          <a href={`tel:${messages.common.phone}`} className="flex items-center gap-3 text-white/80 transition hover:text-white">
            <Phone className="h-5 w-5" />
            <span>{messages.common.phone}</span>
          </a>
          <div className="flex items-center gap-3 text-white/80">
            <MapPin className="h-5 w-5" />
            <span>{messages.common.location}</span>
          </div>
          <a
            href={messages.common.calendly}
            className="flex items-center gap-3 text-white/80 transition hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            <Calendar className="h-5 w-5" />
            <span>{messages.contact.details.calendar}</span>
          </a>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-display text-xl text-white">{messages.contact.details.socials}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {messages.common.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-white hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
        <a
          href={`mailto:${messages.common.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5"
        >
          {messages.contact.ctaEmail}
        </a>
      </div>
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <ContactForm locale={locale} messages={messages} />
        </div>
        <div className="glass-panel flex h-72 items-center justify-center bg-gradient-to-br from-accent-blue/40 via-transparent to-accent-amber/40 text-center text-white/70">
          <p>{messages.contact.mapNote}</p>
        </div>
      </div>
    </div>
  );
}
