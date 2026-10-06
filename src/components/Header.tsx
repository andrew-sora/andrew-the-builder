import Link from 'next/link';
import LanguageSwitch from './LanguageSwitch';
import ThemeToggle from './ThemeToggle';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Header({ locale, dict, brand }: { locale: Locale; dict: Dictionary; brand: string }) {
  const home = `/${locale}/`;
  return (
    <header className="header">
      <div className="wrap header__row">
        <Link href={home} className="wordmark" aria-label={dict.a11y.home}>
          <span className="wordmark__mark" aria-hidden="true">
            A
          </span>
          {brand}
        </Link>
        <nav className="nav" aria-label={dict.a11y.mainNav}>
          <Link href={`${home}#work`}>{dict.nav.work}</Link>
          <Link href={`${home}#glance`}>{dict.nav.glance}</Link>
          <Link href={`${home}#experience`}>{dict.nav.experience}</Link>
          <Link href={`${home}#contact`}>{dict.nav.contact}</Link>
        </nav>
        <div className="tools">
          <LanguageSwitch locale={locale} label={dict.a11y.switchLabel} />
          <ThemeToggle label={dict.a11y.theme} />
        </div>
      </div>
    </header>
  );
}
