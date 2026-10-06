import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectsExplorer from '@/components/ProjectsExplorer';
import { cardLabels, toCard } from '@/lib/cards';
import { getProjects, getSite, localizeProject, localizeSite } from '@/lib/content';
import { getDictionary, isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({
    site: localizeSite(getSite(), locale),
    dict,
    locale,
    pagePath: '/projects/',
    title: dict.meta.projectsTitle,
    description: dict.meta.projectsDescription,
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const projects = getProjects().map((p) => toCard(localizeProject(p, locale)));

  return (
    <section className="section">
      <div className="wrap">
        <div className="section__head">
          <span className="eyebrow mono">{dict.projects.title}</span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}>{dict.projects.title}</h1>
          <p>{dict.projects.intro}</p>
        </div>
        <ProjectsExplorer
          locale={locale}
          projects={projects}
          labels={cardLabels(dict)}
          filterLabel={dict.projects.filterLabel}
          allLabel={dict.projects.all}
          emptyLabel={dict.projects.empty}
        />
      </div>
    </section>
  );
}
