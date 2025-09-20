import type { Metadata } from 'next';
import './globals.css';
import { bodyFont, displayFont } from '@/lib/fonts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://karimelhoumaini.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KARIM EL HOUMAINI · Portfolio',
  description:
    'Portfolio bilingue (FR/EN) de KARIM EL HOUMAINI, ingénieur IA & logiciel à Aix-les-Bains, spécialisé en vision par ordinateur, full-stack et cloud.',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'KARIM EL HOUMAINI · AI & Software Engineer',
    description:
      'Bilingual FR/EN portfolio for Karim El Houmaini showcasing AI, computer-vision, full-stack and cloud engineering work.',
    siteName: 'Karim El Houmaini Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KARIM EL HOUMAINI · AI & Software Engineer',
    description:
      'Bilingual FR/EN portfolio for Karim El Houmaini showcasing AI, computer-vision, full-stack and cloud engineering work.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${displayFont.variable} min-h-screen bg-ink-900 font-body text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
