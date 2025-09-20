import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale } from '@/lib/i18n';
import { EdgeDetectionDemo } from '@/components/playground/edge-detection-demo';
import { MatrixRain } from '@/components/playground/matrix-rain';

export default function PlaygroundPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="section-title">{messages.playground.title}</h1>
        <p className="section-subtitle">{messages.playground.subtitle}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <EdgeDetectionDemo />
        <MatrixRain />
      </div>
    </div>
  );
}
