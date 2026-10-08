import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ObfuscatedEmail from '@/components/ObfuscatedEmail';
import Stamp from '@/components/Stamp';
import ProjectCard from '@/components/ProjectCard';
import { cardLabels, toCard } from '@/lib/cards';
import { LANES, getProjects, getSite, localizeProject, localizeSite } from '@/lib/content';
import { getDictionary, isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = localizeSite(getSite(), locale);
  const dict = getDictionary(locale);
  return pageMetadata({
    site,
    dict,
    locale,
    pagePath: '/',
    title: `${site.fullName} (${site.brand}) · ${dict.meta.role}`,
    description: dict.meta.description,
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const site = localizeSite(getSite(), locale);
  const projects = getProjects().map((p) => localizeProject(p, locale));
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const labels = cardLabels(dict);

  const { clients, recruiters } = site.availability;
  const availabilityKey = clients && recruiters ? 'both' : recruiters ? 'roles' : clients ? 'projects' : 'closed';

  const waHref = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(dict.hero.waMessage)}`;
  const emailEncoded = Buffer.from(site.contact.email).toString('base64');
  const emailFallback = site.contact.email.replace('@', ' [at] ');
  const cvFilename = 'CV-Andrew-Chivas-Arsenal-Rico.pdf';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.fullName,
    alternateName: site.brand,
    url: `${site.siteUrl}/${locale}/`,
    image: `${site.siteUrl}/me-720.webp`,
    jobTitle: dict.meta.role,
    sameAs: [site.contact.linkedin, site.contact.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__copy">
            <p className="hero__name mono">{site.fullName}</p>
            <h1>
              {dict.hero.headlineA} <em>{dict.hero.headlineB}</em>
            </h1>
            <p className="dim" aria-hidden="true">
              {dict.hero.dimension}
            </p>
            <p className="hero__sub">{dict.hero.sub}</p>

            <div className="hero__ctas">
              {recruiters && (
                <div className="cta">
                  <span className="cta__for mono">{dict.hero.forRecruiters}</span>
                  <a className="btn btn--solid" href={site.cv} download={cvFilename}>
                    {dict.hero.ctaCv} <span className="btn__tag mono">PDF</span>
                  </a>
                </div>
              )}
              {clients && (
                <div className="cta">
                  <span className="cta__for mono">{dict.hero.forClients}</span>
                  <a className="btn btn--ghost" href={waHref} target="_blank" rel="noopener noreferrer">
                    {dict.hero.ctaClient} <span className="btn__tag mono">WA</span>
                  </a>
                </div>
              )}
            </div>

            <ul className="pills" aria-label={dict.lanes.title}>
              {LANES.map((lane) => (
                <li key={lane}>
                  <Link className="pill" href={`/${locale}/projects/#${lane}`}>
                    {dict.lanes[lane].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__photo">
            <div className="hero__arch" aria-hidden="true" />
            <img
              className="hero__me"
              src="/me-720.webp"
              srcSet="/me-480.webp 480w, /me-720.webp 720w"
              sizes="(min-width: 900px) 300px, 60vw"
              width={720}
              height={1314}
              alt={dict.hero.photoAlt}
              fetchPriority="high"
              decoding="async"
            />
            <Stamp text={dict.hero.availability[availabilityKey]} />
          </div>
        </div>
      </section>
      <div className="tape" aria-hidden="true" />

      {/* ------------------------------------------------------------ glance */}
      <section className="section" id="glance" aria-labelledby="glance-title">
        <div className="wrap">
          <div className="section__head">
            <span className="eyebrow mono">01</span>
            <h2 id="glance-title">{dict.glance.title}</h2>
            <p>{dict.glance.intro}</p>
          </div>
          <p className="about">{site.about}</p>
          <dl className="glance">
            {site.glance.map((g) => (
              <div className="glance__item" key={g.label}>
                <dt className="mono">{g.label}</dt>
                <dd>{g.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ lanes */}
      <section className="section" id="lanes" aria-labelledby="lanes-title">
        <div className="wrap">
          <div className="section__head">
            <span className="eyebrow mono">02</span>
            <h2 id="lanes-title">{dict.lanes.title}</h2>
            <p>{dict.lanes.intro}</p>
          </div>
          <div className="lanes">
            {LANES.map((lane, i) => (
              <Link key={lane} href={`/${locale}/projects/#${lane}`} className="card lane">
                <span className="lane__num mono">0{i + 1}</span>
                <h3>{dict.lanes[lane].name}</h3>
                <p>{dict.lanes[lane].blurb}</p>
                <span className="lane__go">{dict.lanes.view} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ work */}
      <section className="section" id="work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section__head">
            <span className="eyebrow mono">03</span>
            <h2 id="work-title">{dict.work.title}</h2>
            <p>{dict.work.intro}</p>
          </div>
          <div className="projects-grid">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={toCard(p)} locale={locale} labels={labels} />
            ))}
          </div>
          <p className="more">
            <Link className="link" href={`/${locale}/projects/`}>
              {dict.work.all} →
            </Link>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ experience */}
      <section className="section" id="experience" aria-labelledby="exp-title">
        <div className="wrap">
          <div className="section__head">
            <span className="eyebrow mono">04</span>
            <h2 id="exp-title">{dict.experience.title}</h2>
          </div>
          <ul className="timeline">
            {site.experience.map((e) => (
              <li key={`${e.company}-${e.period}`}>
                <span className="mono">{e.period}</span>
                <h3>
                  {e.role} · {e.company}
                </h3>
                <p>{e.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ contact */}
      <section className="section" id="contact" aria-labelledby="contact-title">
        <div className="wrap">
          <div className="section__head">
            <span className="eyebrow mono">05</span>
            <h2 id="contact-title">{dict.contact.title}</h2>
            <p>{dict.contact.intro}</p>
          </div>
          <div className="contact">
            {recruiters && (
              <div className="card contact__card">
                <h3>{dict.contact.hireTitle}</h3>
                <p>{dict.contact.hireBody}</p>
                <div className="contact__links">
                  <a className="btn btn--solid" href={site.cv} download={cvFilename}>
                    {dict.contact.cv} <span className="btn__tag mono">PDF</span>
                  </a>
                </div>
                <div className="contact__chips">
                  <ObfuscatedEmail
                    className="contact__chip"
                    encoded={emailEncoded}
                    fallback={emailFallback}
                    subject={dict.contact.mailSubject}
                  >
                    <svg className="contact__chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Email</span>
                  </ObfuscatedEmail>
                  <a className="contact__chip" href={site.contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <svg className="contact__chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            )}
            {clients && (
              <div className="card contact__card">
                <h3>{dict.contact.projectTitle}</h3>
                <p>{dict.contact.projectBody}</p>
                <div className="contact__links">
                  <a className="btn btn--ghost" href={waHref} target="_blank" rel="noopener noreferrer">
                    {dict.contact.whatsapp} <span className="btn__tag mono">WA</span>
                  </a>
                </div>
                <div className="contact__chips">
                  <ObfuscatedEmail
                    className="contact__chip"
                    encoded={emailEncoded}
                    fallback={emailFallback}
                    subject={dict.contact.mailSubject}
                  >
                    <svg className="contact__chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Email</span>
                  </ObfuscatedEmail>
                  <a className="contact__chip" href={site.contact.github} target="_blank" rel="noopener noreferrer">
                    <svg className="contact__chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
