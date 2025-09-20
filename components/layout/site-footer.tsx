import type { Messages } from '@/lib/i18n';

type Props = {
  messages: Messages;
};

export function SiteFooter({ messages }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink-900/70 py-10 text-white/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="font-display text-xl text-white">{messages.meta.siteName}</p>
          <p className="max-w-md text-sm text-white/60">{messages.meta.description}</p>
          <p className="text-xs uppercase tracking-widest text-white/40">{messages.meta.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {messages.common.socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              className="transition hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6 text-xs text-white/40">
        <p>{messages.footer.crafted}</p>
        <p className="mt-2">{messages.footer.rights.replace('{{year}}', year.toString())}</p>
      </div>
    </footer>
  );
}
