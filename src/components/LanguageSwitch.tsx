'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { otherLocale, type Locale } from '@/lib/i18n';

export default function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? `/${locale}/`;
  const next = otherLocale(locale);
  const rest = pathname.replace(/^\/(id|en)(?=\/|$)/, '');
  const href = `/${next}${rest === '' ? '/' : rest}`;

  const remember = () => {
    try {
      localStorage.setItem('locale', next);
    } catch {
      /* storage can be blocked, switching still works */
    }
  };

  return (
    <Link href={href} hrefLang={next} lang={next} className="btn-icon" aria-label={label} onClick={remember}>
      {next.toUpperCase()}
    </Link>
  );
}
