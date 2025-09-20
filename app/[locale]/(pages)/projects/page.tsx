import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale } from '@/lib/i18n';
import { ProjectsGrid } from '@/components/sections/projects/projects-grid';

export default function ProjectsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  return <ProjectsGrid messages={messages} locale={locale} />;
}
