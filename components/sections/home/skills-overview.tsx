import type { Messages } from '@/lib/i18n';

export function SkillsOverview({ messages }: { messages: Messages }) {
  const skills = messages.home.skills;
  return (
    <section id="skills" className="mt-24 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-inner backdrop-blur">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="section-title">{skills.title}</h2>
          <p className="section-subtitle max-w-xl">{skills.subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.items.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-amber" style={{ width: '100%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
