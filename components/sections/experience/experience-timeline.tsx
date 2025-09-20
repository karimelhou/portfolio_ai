import type { Messages } from '@/lib/i18n';

export function ExperienceTimeline({ messages }: { messages: Messages }) {
  const timeline = messages.experience;
  return (
    <section className="space-y-12">
      <div>
        <h1 className="section-title">{timeline.title}</h1>
        <p className="section-subtitle">{timeline.subtitle}</p>
      </div>
      <div className="space-y-10">
        {timeline.timeline.map((item) => (
          <div key={item.id} className="glass-panel p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
              <div>
                <h2 className="font-display text-2xl text-white">{item.role}</h2>
                <p className="text-sm uppercase tracking-widest text-white/60">
                  {item.company} · {item.location}
                </p>
              </div>
              <p className="text-sm text-white/60">{item.period}</p>
            </div>
            <div className="mt-4 space-y-3 text-white/80">
              {item.impact.map((point) => (
                <p key={point}>• {point}</p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              {item.metrics.map((metric) => (
                <span key={metric} className="rounded-full bg-white/10 px-3 py-1">
                  {metric}
                </span>
              ))}
              {item.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/20 px-3 py-1">
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
