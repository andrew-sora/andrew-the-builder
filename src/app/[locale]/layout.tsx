import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { getSite, hasPlaceholders, localizeSite } from '@/lib/content';

type Params = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const site = localizeSite(getSite(), locale);
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.siteUrl),
    title: { default: `${site.fullName} · ${site.brand}`, template: `%s · ${site.brand}` },
    description: dict.meta.description,
    authors: [{ name: site.fullName }],
    icons: { icon: '/favicon.svg' },
    // Dummy content must never be indexed.
    robots: hasPlaceholders() ? { index: false, follow: false } : undefined,
  };
}

// Applies a saved theme before first paint. Without a saved choice, default to light mode.
const themeScript = `try{var t=localStorage.getItem('theme')||'light';if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}`;

export default async function LocaleLayout({ children, params }: { children: ReactNode } & Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const site = localizeSite(getSite(), locale);

  return (
    <html lang={locale} data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {dict.a11y.skip}
        </a>
        <Header locale={locale} dict={dict} brand={site.brand} />
        <main id="main">{children}</main>
        <Footer dict={dict} name={site.fullName} />
      </body>
    </html>
  );
}
