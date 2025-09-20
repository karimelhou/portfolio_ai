'use client';

import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';
import type { Messages, Locale } from '@/lib/i18n';

const tagMap: Record<string, string> = {
  AI: 'ai',
  'Computer Vision': 'cv',
  Healthcare: 'cv',
  'Full-stack': 'cloud',
  Cloud: 'cloud',
  DevOps: 'devops',
  IoT: 'cloud'
};

export function ProjectsGrid({ messages, locale }: { messages: Messages; locale: Locale }) {
  const projects = messages.projects;
  const [filter, setFilter] = useState<keyof typeof projects.filters>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredProjects = projects.items.filter((project) => {
    if (filter === 'all') return true;
    return project.tags.some((tag) => tagMap[tag] === filter || tag.toLowerCase() === filter);
  });

  const selectedProject = projects.items.find((item) => item.id === selectedId) ?? null;

  return (
    <section className="space-y-10">
      <div className="space-y-2">
        <h1 className="section-title">{projects.title}</h1>
        <p className="section-subtitle">{projects.subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {(Object.entries(projects.filters) as [keyof typeof projects.filters, string][]).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm transition-all',
              filter === key
                ? 'border-white bg-white text-ink-900 shadow-glow'
                : 'border-white/20 text-white/70 hover:border-white hover:text-white'
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {filteredProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setSelectedId(project.id)}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 text-left transition hover:-translate-y-1 hover:border-white/40"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="font-display text-2xl text-white">{project.title}</h3>
              </div>
            </div>
            <div className="p-6 text-sm text-white/80">
              <p>{project.problem}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={Boolean(selectedProject)} onClose={() => setSelectedId(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="glass-panel max-w-3xl overflow-hidden p-0">
            {selectedProject ? (
              <div>
                <div className="relative h-64">
                  <Image
                    src={selectedProject.cover}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-6 p-8 text-white/80">
                  <div>
                    <Dialog.Title className="font-display text-3xl text-white">
                      {selectedProject.title}
                    </Dialog.Title>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/60">{projects.modal.problem}</p>
                      <p className="mt-1 text-sm">{selectedProject.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/60">{projects.modal.approach}</p>
                      <p className="mt-1 text-sm">{selectedProject.approach}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/60">{projects.modal.result}</p>
                      <p className="mt-1 text-sm">{selectedProject.result}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/30 px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white"
                    >
                      {projects.modal.close}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}
