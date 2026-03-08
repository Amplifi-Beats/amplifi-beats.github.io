import en from '../i18n/en.json';
import ga from '../i18n/ga.json';
import type { Locale } from './i18n';

const copy = { en, ga };

export function getCopy(locale: Locale) {
  return copy[locale];
}
