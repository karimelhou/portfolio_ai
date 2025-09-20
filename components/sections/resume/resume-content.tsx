import type { Messages } from '@/lib/i18n';

export function ResumeContent({ messages }: { messages: Messages }) {
  const resume = messages.resume.sections;
  const experience = messages.experience.timeline;
  const education = messages.about.timeline.education;

  return (
    <article className="space-y-10 rounded-3xl border border-white/10 bg-white/5 p-10">
      <section className="space-y-3">
        <h1 className="font-display text-4xl text-white">{messages.meta.siteName}</h1>
        <p className="text-sm text-white/60">{messages.meta.tagline}</p>
        <p className="text-sm text-white/60">
          {messages.common.location} · {messages.common.email} · {messages.common.phone}
        </p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-white">{resume.summary.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{resume.summary.content}</p>
      </section>
      <section>
        <h2 className="font-display text-2xl text-white">{messages.experience.title}</h2>
        <div className="mt-4 space-y-4">
          {experience.map((item) => (
            <div key={item.id} className="border-b border-white/10 pb-3">
              <div className="flex flex-col gap-1 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
                <span className="font-semibold text-white">{item.role}</span>
                <span>
                  {item.company} · {item.location}
                </span>
                <span>{item.period}</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm text-white/70">
                {item.impact.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl text-white">{messages.about.timeline.title}</h2>
        <div className="mt-3 space-y-2 text-sm text-white/70">
          {education.map((item) => (
            <p key={item.title}>
              <span className="font-semibold text-white">{item.title}</span> · {item.place} ({item.period})
            </p>
          ))}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl text-white">Langues & Intérêts</h2>
        <p className="mt-2 text-sm text-white/70">{resume.languages}</p>
        <p className="mt-1 text-sm text-white/70">{resume.interests}</p>
      </section>
    </article>
  );
}
