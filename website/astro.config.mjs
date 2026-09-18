// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Placeholder domain. Replace once the real domain is registered
// (WEBSITE_PLAN.md, open question 1).
const SITE = 'https://nasim.at';

export default defineConfig({
  site: SITE,
  output: 'static',
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de-AT', en: 'en' },
      },
    }),
  ],
});
