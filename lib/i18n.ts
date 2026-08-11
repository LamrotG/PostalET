import en from '../locales/en.json';
import am from '../locales/am.json';

const LOCALES: Record<string, Record<string, string>> = {
  en,
  am,
};

export function t(key: string, locale = 'en'): string {
  const pack = LOCALES[locale] ?? LOCALES['en'];
  return pack[key] ?? LOCALES['en'][key] ?? key;
}

export function availableLocales() { return Object.keys(LOCALES); }
