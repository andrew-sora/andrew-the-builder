import type { MetadataRoute } from 'next';
import { getProjects, getSite } from '@/lib/content';
import { locales } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSite().siteUrl.replace(/\/$/, '');
  const paths = ['/', '/projects/', ...getProjects().map((p) => `/projects/${p.slug}/`)];
  return paths.flatMap((p) =>
    locales.map((l) => ({
      url: `${base}/${l}${p}`,
      changeFrequency: 'monthly' as const,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${base}/${x}${p}`])) },
    })),
  );
}
