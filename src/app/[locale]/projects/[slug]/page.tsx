import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ApkDownload from '@/components/ApkDownload';
import LiteYouTube from '@/components/LiteYouTube';
import { getProjects, getSite, localizeProject, localizeSite } from '@/lib/content';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjects().map((p) => ({ locale, slug: p.slug })));
}

function load(locale: string, slug: string) {
  if (!isLocale(locale)) return null;
  const raw = getProjects().find((p) => p.slug === slug);
  if (!raw) return null;
  return { locale, project: localizeProject(raw, locale) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = load(locale, slug);
  if (!found) return {};
  return pageMetadata({
    site: localizeSite(getSite(), found.locale),
    dict: getDictionary(found.locale),
    locale: found.locale,
    pagePath: `/projects/${slug}/`,
    title: found.project.title,
    description: found.project.tagline,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const found = load(rawLocale, slug);
  if (!found) notFound();

  const { locale, project: p } = found;
  const dict = getDictionary(locale);

  return (
    <article className="section">
      <div className="wrap">
        <Link className="back mono" href={`/${locale}/projects/`}>
          ← {dict.project.back}
        </Link>

        <header className="project-hero">
          <span className={`chip chip--${p.status} mono`}>{dict.status[p.status]}</span>
          <h1>{p.title}</h1>
          <p className="lede">{p.tagline}</p>

          <dl className="facts">
            <div>
              <dt className="mono">{dict.project.role}</dt>
              <dd>{p.role}</dd>
            </div>
            <div>
              <dt className="mono">{dict.project.year}</dt>
              <dd>{p.year}</dd>
            </div>
            <div>
              <dt className="mono">{dict.project.lane}</dt>
              <dd>{dict.lanes[p.lane].name}</dd>
            </div>
          </dl>

          <div className="actions">
            {p.links.live && (
              <a className="btn btn--solid" href={p.links.live} target="_blank" rel="noopener noreferrer">
                {dict.project.live} ↗
              </a>
            )}
            {p.links.repo && (
              <a className="btn btn--ghost" href={p.links.repo} target="_blank" rel="noopener noreferrer">
                {dict.project.repo} ↗
              </a>
            )}
          </div>
        </header>

        <div className="cover" style={{ position: 'relative' }}>
          <img src={p.cover} alt={p.gallery[0]?.alt ?? p.title} width={1200} height={750} />
          {p.placeholder && <span className="dummy">{dict.dummy}</span>}
        </div>

        <div className="prose-grid">
          <div className="prose">
            <section>
              <h2>{dict.project.problem}</h2>
              <p>{p.problem}</p>
            </section>
            <section>
              <h2>{dict.project.approach}</h2>
              <p>{p.approach}</p>
            </section>
            <section>
              <h2>{dict.project.highlights}</h2>
              <ul className="highlights">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="aside" style={{ display: 'grid', gap: 28, alignContent: 'start' }}>
            <div>
              <h2>{dict.project.stack}</h2>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            {p.links.apk && <ApkDownload apk={p.links.apk} dict={dict.apk} />}
            {p.links.video && (
              <LiteYouTube id={p.links.video} title={p.title} playLabel={dict.project.videoPlay} />
            )}
          </aside>
        </div>

        {p.gallery.length > 0 && (
          <section style={{ marginTop: 56 }} aria-labelledby="gallery-title">
            <h2 id="gallery-title" style={{ fontSize: '1.6rem', marginBottom: 16 }}>
              {dict.project.gallery}
            </h2>
            <div className="gallery" role="region" aria-label={dict.a11y.gallery} tabIndex={0}>
              {p.gallery.map((g) => (
                <figure key={g.src}>
                  <img src={g.src} alt={g.alt} width={1200} height={750} loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
