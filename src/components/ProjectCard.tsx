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
};

export type CardLabels = {
  status: Record<Status, string>;
  lane: Record<Lane, string>;
  dummy: string;
};

export default function ProjectCard({
  project,
  locale,
  labels,
}: {
  project: CardProject;
  locale: string;
  labels: CardLabels;
}) {
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
