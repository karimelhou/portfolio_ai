import type { Messages } from '@/lib/i18n';

export function ExperienceHighlights({ messages }: { messages: Messages }) {
  const experience = messages.home.experience;
  return (
    <section id="experience" className="mt-24 space-y-6">
      <div>
        <h2 className="section-title">{experience.title}</h2>
        <p className="section-subtitle">{messages.home.intro.text}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {experience.items.map((item) => (
          <div key={item.title} className="glass-panel flex flex-col justify-between p-6">
            <div className="space-y-3">
              <h3 className="font-display text-xl text-white">{item.title}</h3>
              <p className="text-sm text-white/70">{item.description}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">{item.metric}</span>
              {item.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
