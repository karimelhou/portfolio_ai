import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { MainNav } from '@/components/navigation/main-nav';
import { SiteFooter } from '@/components/layout/site-footer';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { TranslationProvider } from '@/components/providers/translation-provider';
import type { Locale } from '@/lib/i18n';
import { getMessages, isLocale, locales } from '@/lib/i18n';
import { PWAInitializer } from '@/components/providers/pwa-initializer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) {
    return {};
  }
  const messages = getMessages(params.locale);
  const title = `${messages.meta.siteName} · ${messages.meta.tagline}`;
  return {
    title,
    description: messages.meta.description,
    openGraph: {
      title,
      description: messages.meta.description,
      locale: params.locale,
      siteName: messages.meta.siteName
    },
    twitter: {
      title,
      description: messages.meta.description
    },
    alternates: {
      canonical: `/${params.locale}`,
      languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}`]))
    }
  };
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale as Locale;
  const messages = getMessages(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'KARIM EL HOUMAINI',
    jobTitle: messages.meta.tagline,
    email: `mailto:${messages.common.email}`,
    telephone: messages.common.phone,
    url: 'https://karimelhoumaini.dev',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Aix-les-Bains',
      addressCountry: 'France'
    },
    sameAs: messages.common.socials.map((social) => social.url)
  };

  return (
    <TranslationProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <PWAInitializer />
        <div className="flex min-h-screen flex-col">
          <MainNav />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">{children}</div>
          </main>
          <SiteFooter messages={messages} />
        </div>
      </ThemeProvider>
      <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
    </TranslationProvider>
  );
}
