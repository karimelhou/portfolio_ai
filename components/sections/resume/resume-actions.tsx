'use client';

import { useState, useTransition } from 'react';
import type { Locale, Messages } from '@/lib/i18n';

export function ResumeActions({ locale, messages }: { locale: Locale; messages: Messages }) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const onDownload = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/resume?locale=${locale}`);
        if (!response.ok) {
          const data = await response.json();
          setFeedback(data.message);
          return;
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `karim-el-houmaini-resume-${locale}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        setFeedback(messages.contact.form.success);
      } catch (error) {
        setFeedback(messages.contact.form.error);
      }
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5"
        disabled={pending}
      >
        {pending ? '…' : messages.resume.download}
      </button>
      {feedback ? <p className="text-sm text-white/70">{feedback}</p> : null}
    </div>
  );
}
