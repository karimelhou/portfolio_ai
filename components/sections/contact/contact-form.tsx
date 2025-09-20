'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import type { Locale, Messages } from '@/lib/i18n';
import { contactSchema, type ContactFormValues } from '@/lib/validation/contact';

export function ContactForm({ locale, messages }: { locale: Locale; messages: Messages }) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', locale }
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      setStatus('success');
      form.reset({ ...values, name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-white/80">
          {messages.contact.form.name}
        </label>
        <input
          id="name"
          type="text"
          {...form.register('name')}
          className={clsx(
            'mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder:text-white/40 focus:border-accent-blue focus:outline-none',
            form.formState.errors.name && 'border-red-400'
          )}
          placeholder="Jane Doe"
        />
        {form.formState.errors.name ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.name.message}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-white/80">
          {messages.contact.form.email}
        </label>
        <input
          id="email"
          type="email"
          {...form.register('email')}
          className={clsx(
            'mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder:text-white/40 focus:border-accent-blue focus:outline-none',
            form.formState.errors.email && 'border-red-400'
          )}
          placeholder="you@email.com"
        />
        {form.formState.errors.email ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.email.message}</p>
        ) : null}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-white/80">
          {messages.contact.form.message}
        </label>
        <textarea
          id="message"
          rows={6}
          {...form.register('message')}
          className={clsx(
            'mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white/90 placeholder:text-white/40 focus:border-accent-blue focus:outline-none',
            form.formState.errors.message && 'border-red-400'
          )}
          placeholder="Hello Karim, nous pouvons…"
        />
        {form.formState.errors.message ? (
          <p className="mt-1 text-xs text-red-300">{form.formState.errors.message.message}</p>
        ) : null}
      </div>
      <input type="hidden" {...form.register('locale')} value={locale} />
      <button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {form.formState.isSubmitting ? '…' : messages.contact.form.submit}
      </button>
      {status === 'success' ? (
        <p className="text-sm text-emerald-300">{messages.contact.form.success}</p>
      ) : null}
      {status === 'error' ? <p className="text-sm text-red-300">{messages.contact.form.error}</p> : null}
    </form>
  );
}
