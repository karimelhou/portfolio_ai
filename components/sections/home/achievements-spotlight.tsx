import type { Messages } from '@/lib/i18n';

export function AchievementsSpotlight({ messages }: { messages: Messages }) {
  const achievements = messages.home.achievements;
  return (
    <section id="achievements" className="mt-24">
      <h2 className="section-title">{achievements.title}</h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {achievements.items.map((item) => (
          <div key={item.title} className="glass-panel p-6">
            <h3 className="font-display text-lg text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-white/70">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
