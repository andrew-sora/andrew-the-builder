import Link from 'next/link';
import type { Lane, Status } from '@/lib/content';

export type CardProject = {
  slug: string;
  lane: Lane;
  status: Status;
  year: number;
  title: string;
  tagline: string;
  cover: string;
  stack: string[];
  placeholder: boolean;
  role?: string;
  liveUrl?: string;
};

export type CardLabels = {
  status: Record<Status, string>;
  lane: Record<Lane, string>;
  dummy: string;
  featuredBadge?: string;
  caseStudy?: string;
  liveDemo?: string;
};

export default function ProjectCard({
  project,
  locale,
  labels,
  variant = 'default',
}: {
  project: CardProject;
  locale: string;
  labels: CardLabels;
  variant?: 'featured' | 'default';
}) {
  if (variant === 'featured') {
    return (
      <article className="card project project--featured">
        <div className="project__media">
          <Link href={`/${locale}/projects/${project.slug}/`} tabIndex={-1} aria-hidden="true">
            <img src={project.cover} alt="" width={1200} height={750} fetchPriority="high" />
          </Link>
          {project.placeholder && <span className="dummy">{labels.dummy}</span>}
        </div>
        <div className="project__body">
          <div className="project__meta mono">
            <span className="chip chip--featured">{labels.featuredBadge || 'FEATURED'}</span>
            <span className={`chip chip--${project.status}`}>{labels.status[project.status]}</span>
            <span>
              {labels.lane[project.lane]} · {project.year}
            </span>
          </div>
          <h3 className="project__title">
            <Link href={`/${locale}/projects/${project.slug}/`}>{project.title}</Link>
          </h3>
          {project.role && <p className="project__role mono">{project.role}</p>}
          <p className="project__tagline">{project.tagline}</p>
          <ul className="tags" aria-label="Tech stack">
            {project.stack.slice(0, 5).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="project__actions">
            <Link href={`/${locale}/projects/${project.slug}/`} className="btn btn--solid btn--sm">
              {labels.caseStudy || 'Buka studi kasus'} <span className="btn__tag mono">STUDI KASUS</span>
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--sm"
              >
                {labels.liveDemo || 'Buka demo langsung'} <span className="btn__tag mono">LIVE</span>
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card project">
      <Link href={`/${locale}/projects/${project.slug}/`} className="project__link">
        <div className="project__media">
          <img src={project.cover} alt="" width={1200} height={750} loading="lazy" />
          {project.placeholder && <span className="dummy">{labels.dummy}</span>}
        </div>
        <div className="project__body">
          <div className="project__meta mono">
            <span className={`chip chip--${project.status}`}>{labels.status[project.status]}</span>
            <span>
              {labels.lane[project.lane]} · {project.year}
            </span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.tagline}</p>
          <ul className="tags">
            {project.stack.slice(0, 4).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
