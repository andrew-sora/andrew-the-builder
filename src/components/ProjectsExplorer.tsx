'use client';

import { useEffect, useState } from 'react';
import ProjectCard, { type CardLabels, type CardProject } from './ProjectCard';
import type { Lane } from '@/lib/content';

type Filter = 'all' | Lane;
const FILTERS: Filter[] = ['all', 'web', 'infra', 'security', 'ai'];

function fromHash(): Filter {
  const h = window.location.hash.replace('#', '');
  return (FILTERS as string[]).includes(h) ? (h as Filter) : 'all';
}

export default function ProjectsExplorer({
  locale,
  projects,
  labels,
  filterLabel,
  allLabel,
  emptyLabel,
}: {
  locale: string;
  projects: CardProject[];
  labels: CardLabels;
  filterLabel: string;
  allLabel: string;
  emptyLabel: string;
}) {
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    setFilter(fromHash());
    const onHash = () => setFilter(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const select = (next: Filter) => {
    setFilter(next);
    const url = window.location.pathname + (next === 'all' ? '' : `#${next}`);
    window.history.replaceState(null, '', url);
  };

  const visible = filter === 'all' ? projects : projects.filter((p) => p.lane === filter);

  return (
    <>
      <div className="filters" role="group" aria-label={filterLabel}>
        {FILTERS.map((f) => (
          <button key={f} type="button" className="filter" aria-pressed={filter === f} onClick={() => select(f)}>
            {f === 'all' ? allLabel : labels.lane[f]}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="empty">{emptyLabel}</p>
      ) : (
        <div className="projects-grid">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={locale} labels={labels} />
          ))}
        </div>
      )}
    </>
  );
}
