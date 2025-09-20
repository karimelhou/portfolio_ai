import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KARIM EL HOUMAINI · Portfolio',
    short_name: 'Karim Portfolio',
    description:
      'Portfolio bilingue FR/EN de KARIM EL HOUMAINI, ingénieur IA & logiciel spécialisé en vision par ordinateur et digitalisation industrielle.',
    start_url: '/fr',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    lang: 'fr',
    icons: [
      {
        src: '/icon.svg',
        type: 'image/svg+xml',
        sizes: '512x512'
      }
    ]
  };
}
