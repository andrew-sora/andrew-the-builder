import type { Metadata } from 'next';
import { locales, type Dictionary, type Locale } from './i18n';
import type { LocalizedSite } from './content';

/** Path without the locale prefix, always with leading and trailing slash, e.g. "/" or "/projects/lumen/". */
export function localizedAlternates(locale: Locale, pagePath: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}${pagePath}`;
  languages['x-default'] = `/id${pagePath}`;
  return { canonical: `/${locale}${pagePath}`, languages };
}

export function pageMetadata(opts: {
  site: LocalizedSite;
  dict: Dictionary;
  locale: Locale;
  pagePath: string;
  title: string;
  description: string;
}): Metadata {
  const { site, dict, locale, pagePath, title, description } = opts;
  // Shared 1200x630 card per language, see scripts/gen-og.mjs. Resolved against metadataBase.
  const image = { url: `/og-${locale}.png`, width: 1200, height: 630, alt: site.brand };
  return {
    title,
    description,
    alternates: localizedAlternates(locale, pagePath),
    openGraph: {
      title,
      description,
      url: `/${locale}${pagePath}`,
      siteName: site.brand,
      locale: dict.meta.ogLocale,
      type: 'website',
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}
