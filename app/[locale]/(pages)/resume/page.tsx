import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale } from '@/lib/i18n';
import { ResumeContent } from '@/components/sections/resume/resume-content';
import { ResumeActions } from '@/components/sections/resume/resume-actions';

export default function ResumePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="section-title">{messages.resume.title}</h1>
          <p className="section-subtitle">{messages.resume.intro}</p>
        </div>
        <ResumeActions locale={locale} messages={messages} />
      </div>
      <ResumeContent messages={messages} />
    </div>
  );
}
