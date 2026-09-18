import type { Lang } from './ui';

export const routes = {
  home: { de: '/', en: '/en/' },
  imprint: { de: '/impressum/', en: '/en/imprint/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Path of `route` in `lang`. */
export function routePath(route: RouteKey, lang: Lang): string {
  return routes[route][lang];
}
