import en from '@/messages/en.json';
import id from '@/messages/id.json';

export const locales = ['id', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'id';

export type Dictionary = typeof en;

// If id.json drifts from en.json (missing key, wrong type), this line fails typecheck.
const dictionaries: Record<Locale, Dictionary> = { en, id };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'id' ? 'en' : 'id';
}
