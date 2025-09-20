import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale } from '@/lib/i18n';
import { ExperienceTimeline } from '@/components/sections/experience/experience-timeline';

export default function ExperiencePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  return <ExperienceTimeline messages={messages} />;
}
