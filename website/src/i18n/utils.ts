import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';
import { routes, type RouteKey } from './routes';

/** Detects the active language from the request URL. */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first && first in languages) return first as Lang;
  return defaultLang;
}

/** Returns a translation function bound to one language. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    const dictionary = ui[lang] as Record<string, string>;
    const fallback = ui[defaultLang] as Record<string, string>;
    return dictionary[key] ?? fallback[key] ?? '';
  };
}

export interface Alternate {
  lang: Lang;
  path: string;
}

/** All language variants of one route, for hreflang tags and the switcher. */
export function getAlternates(route: RouteKey): Alternate[] {
  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    path: routes[route][lang],
  }));
}

/** Absolute URL for a path, given the deployed site origin. */
export function absoluteUrl(path: string, site: URL | undefined): string {
  if (!site) return path;
  return new URL(path, site).href;
}
