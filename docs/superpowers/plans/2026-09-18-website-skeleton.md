# Nasim Vision Website Skeleton — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable bilingual (DE/EN) Astro skeleton for the Nasim Vision landing page, with design tokens, working language switching, legally required pages, SEO metadata, and a live Vercel deploy.

**Architecture:** Static Astro 5 site in `website/`, built-in Astro i18n routing with German as the unprefixed default locale and English under `/en/`. All user-facing strings live in one typed dictionary (`src/i18n/ui.ts`) so no German or English text is hardcoded in components. A typed route map (`src/i18n/routes.ts`) pairs each page with its counterpart in the other language, which drives both the language switcher and the `hreflang` tags. The landing page is assembled from placeholder `<Section>` blocks in the final order, so later plans fill in content without restructuring.

**Tech Stack:** Astro 5, Tailwind CSS 4 (via `@tailwindcss/vite`), TypeScript, Vitest, `@astrojs/sitemap`, `@astrojs/vercel`, self-hosted Inter via Fontsource.

**Spec:** `WEBSITE_PLAN.md`. Product spec: `PLAN.md`.

**Out of scope for this plan** (later plans): section content and copy, dashboard mockup graphic, privacy diagram SVG, contact form + serverless handler, pricing numbers, real Impressum data, cookieless web analytics, custom domain.

---

## Prerequisites

- Node.js 22+ (verified: v25.8.1) and npm (verified: 11.11.0).
- Git installed.
- A GitHub repository created by the user. The remote URL is needed only in Task 12.

> **Note on fonts:** Fonts are self-hosted via Fontsource, never loaded from the Google Fonts CDN. Austrian and German courts have fined site operators for transmitting visitor IP addresses to Google via the font CDN. Self-hosting removes that risk and supports the "no cookie banner" decision in `WEBSITE_PLAN.md` §2.

---

## File Structure

| Path | Responsibility |
|---|---|
| `website/package.json` | Dependencies and scripts |
| `website/astro.config.mjs` | Astro config: site URL, i18n, Tailwind, sitemap, Vercel adapter |
| `website/tsconfig.json` | TypeScript strict config |
| `website/vitest.config.ts` | Test runner config |
| `website/src/styles/global.css` | Tailwind import + design tokens (`@theme`) |
| `website/src/i18n/ui.ts` | All UI strings, DE and EN |
| `website/src/i18n/routes.ts` | Typed route map pairing DE and EN paths |
| `website/src/i18n/utils.ts` | `getLangFromUrl`, `useTranslations`, `getAlternates` |
| `website/src/i18n/utils.test.ts` | Unit tests incl. DE/EN key parity |
| `website/src/layouts/BaseLayout.astro` | `<html>`, head, SEO meta, hreflang, header, footer |
| `website/src/components/Header.astro` | Logo, nav, CTA |
| `website/src/components/LangSwitcher.astro` | DE/EN links |
| `website/src/components/Footer.astro` | Legal links, copyright |
| `website/src/components/Section.astro` | Reusable section wrapper |
| `website/src/pages/index.astro` | German landing page |
| `website/src/pages/impressum.astro` | German Impressum |
| `website/src/pages/datenschutz.astro` | German privacy policy |
| `website/src/pages/en/index.astro` | English landing page |
| `website/src/pages/en/imprint.astro` | English Impressum |
| `website/src/pages/en/privacy.astro` | English privacy policy |
| `website/public/robots.txt` | Crawler rules + sitemap pointer |
| `website/public/favicon.svg` | Favicon |
| `.gitignore` | Repo-root ignore rules |
| `README.md` | Repo-root readme with Vercel setup instructions |

---

## Task 1: Initialize repository and Astro project

**Files:**
- Create: `.gitignore`
- Create: `website/` (via Astro CLI)

- [ ] **Step 1: Initialize git at the repository root**

Run from `C:\Users\User\Documents\mein website\NEW\Nasim Vision`:

```bash
git init -b main
```

Expected: `Initialized empty Git repository in .../Nasim Vision/.git/`

- [ ] **Step 2: Create the root `.gitignore`**

Create `.gitignore`:

```gitignore
# Dependencies
node_modules/

# Astro build output
website/dist/
website/.astro/
website/.vercel/

# Python (box/)
box/__pycache__/
box/.venv/
box/*.db
*.pyc

# Environment
.env
.env.local
.env.production

# Editor / OS
.DS_Store
Thumbs.db
.vscode/
.idea/

# Logs
*.log
npm-debug.log*
```

- [ ] **Step 3: Scaffold the Astro project into `website/`**

```bash
npm create astro@latest website -- --template minimal --typescript strict --no-install --no-git --skip-houston
```

Expected: directory `website/` created containing `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`.

- [ ] **Step 4: Install dependencies**

```bash
cd website && npm install
```

Expected: `added N packages` and a `website/node_modules/` directory. npm may print an engine warning for Node 25; this is safe to ignore because Vercel builds on Node 22.

- [ ] **Step 5: Verify the dev server starts**

```bash
cd website && npm run build
```

Expected: `[build] Complete!` with no errors.

- [ ] **Step 6: Commit**

```bash
git add .gitignore website
git commit -m "chore: scaffold Astro project for the website

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2: Add Tailwind CSS 4 and design tokens

**Files:**
- Create: `website/src/styles/global.css`
- Modify: `website/astro.config.mjs`
- Modify: `website/package.json` (via npm install)

- [ ] **Step 1: Install Tailwind and the Inter font**

```bash
cd website && npm install tailwindcss @tailwindcss/vite @fontsource-variable/inter
```

Expected: `added 3 packages` (plus transitive dependencies).

- [ ] **Step 2: Create the stylesheet with design tokens**

Create `website/src/styles/global.css`:

```css
@import "tailwindcss";

/* Design tokens. Changing a value here changes it site-wide.
   Palette is a starting point and is reviewed on the Vercel preview URL
   before content work begins (WEBSITE_PLAN.md, open question 6). */
@theme {
  /* Neutrals: cool near-black through off-white */
  --color-ink-950: #070A0E;
  --color-ink-900: #0E131A;
  --color-ink-800: #1A2230;
  --color-ink-700: #2B3648;
  --color-ink-500: #5A6B82;
  --color-ink-400: #8493A8;
  --color-ink-300: #AFBCCC;
  --color-ink-200: #D7DFE9;
  --color-ink-100: #EAF0F6;
  --color-ink-50:  #F6F9FC;

  /* Accent: teal-green, reads as "secure" and "live data" */
  --color-accent-700: #0B7A61;
  --color-accent-600: #0F9476;
  --color-accent-500: #17B890;
  --color-accent-400: #35D5AC;
  --color-accent-300: #7BE9CB;

  /* Signal colour for the crossed-out "to the internet" arrow */
  --color-alert-500: #E2574C;

  --font-sans: "Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* Consistent vertical rhythm between landing page sections.
   A plain class rather than a spacing token, so it works regardless of
   Tailwind's spacing-namespace behaviour. */
.section-y {
  padding-block: 4.5rem;
}

@media (min-width: 640px) {
  .section-y {
    padding-block: 6.5rem;
  }
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background-color: var(--color-ink-50);
  color: var(--color-ink-900);
  font-family: var(--font-sans);
  margin: 0;
  -webkit-font-smoothing: antialiased;
}

/* Visible keyboard focus everywhere, required for accessibility */
:focus-visible {
  outline: 2px solid var(--color-accent-600);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Register the Tailwind Vite plugin**

Replace the entire contents of `website/astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 4: Verify Tailwind compiles**

Temporarily replace `website/src/pages/index.astro` with:

```astro
---
import '../styles/global.css';
import '@fontsource-variable/inter';
---

<html lang="de">
  <head><meta charset="utf-8" /><title>Build check</title></head>
  <body>
    <h1 class="text-4xl font-bold text-accent-600">Tailwind works</h1>
  </body>
</html>
```

Run:

```bash
cd website && npm run build
```

Expected: `[build] Complete!`. Then confirm the accent token made it into the CSS:

```bash
cd website && grep -ril "0f9476" dist/
```

Expected: one match, a `dist/_astro/*.css` file. (`0f9476` is `--color-accent-600`, the
token used by the test markup. Tailwind 4 tree-shakes theme variables that no utility
references, so only tokens actually in use appear in the output.)

Confirm the font is self-hosted rather than fetched from a CDN:

```bash
cd website && ls dist/_astro/ | grep -c woff2
```

Expected: a number greater than 0.

- [ ] **Step 5: Commit**

```bash
git add website/package.json website/package-lock.json website/astro.config.mjs website/src
git commit -m "feat: add Tailwind 4 with design tokens and self-hosted Inter

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: Create the string dictionary

**Files:**
- Create: `website/src/i18n/ui.ts`

- [ ] **Step 1: Write the dictionary**

Create `website/src/i18n/ui.ts`:

```ts
export const languages = {
  de: 'Deutsch',
  en: 'English',
} as const;

export const defaultLang = 'de';

export type Lang = keyof typeof languages;

export const ui = {
  de: {
    'site.name': 'Nasim Vision',
    'site.tagline': 'Besucherzählung ohne Cloud',
    'meta.home.title': 'Nasim Vision — Besucherzählung für Gastronomie und Handel in Wien',
    'meta.home.description':
      'Erfahren Sie, wie viele Gäste Ihr Lokal betreten — mit Ihren vorhandenen Kameras. Das Video bleibt im Haus. Keine Cloud, keine Gesichtserkennung.',
    'meta.imprint.title': 'Impressum — Nasim Vision',
    'meta.imprint.description': 'Impressum und Offenlegung gemäß §5 ECG und §25 MedienG.',
    'meta.privacy.title': 'Datenschutzerklärung — Nasim Vision',
    'meta.privacy.description': 'Wie wir mit Ihren Daten umgehen, gemäß DSGVO.',

    'nav.how': 'So funktioniert es',
    'nav.privacy': 'Datenschutz',
    'nav.pricing': 'Pakete',
    'nav.contact': 'Kontakt',
    'nav.cta': 'Demo anfragen',
    'nav.menu.open': 'Menü öffnen',
    'nav.menu.close': 'Menü schließen',

    'hero.title': 'Wie viele Gäste hatten Sie heute?',
    'hero.subtitle':
      'Nasim Vision verbindet sich mit Ihren vorhandenen Kameras und zählt Ihre Besucher. Das Video verlässt Ihr Lokal nicht.',
    'hero.cta.primary': 'Demo anfragen',
    'hero.cta.whatsapp': 'Per WhatsApp schreiben',

    'problem.title': 'Kameras haben Sie. Zahlen nicht.',
    'problem.lead': 'Die Aufnahmen laufen mit. Ausgewertet wird davon nichts.',

    'how.title': 'So funktioniert es',
    'how.lead': 'Ein Besuch, drei Schritte. Ihre Kameras und Ihr Rekorder bleiben, wie sie sind.',

    'privacy.title': 'Ihre Daten bleiben bei Ihnen',
    'privacy.lead':
      'Kein Video wird gespeichert. Keine Gesichter werden erkannt. Nach außen geht nur die Meldung, dass das Gerät läuft.',

    'dashboard.title': 'Das sehen Sie',
    'dashboard.lead': 'Vom Handy aus, jederzeit.',

    'audience.title': 'Für wen',
    'audience.lead': 'Überall dort, wo Gäste durch eine Tür gehen.',

    'pricing.title': 'Pakete',
    'pricing.lead': 'Der genaue Preis steht nach der Besichtigung fest. Keine versteckten Kosten.',

    'about.title': 'Über uns',
    'about.lead': 'Wir sitzen in Wien und installieren selbst.',

    'contact.title': 'Demo anfragen',
    'contact.lead': 'Wir melden uns innerhalb eines Werktags.',

    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.madein': 'Entwickelt in Wien.',

    'lang.label': 'Sprache',
    'skip.content': 'Zum Inhalt springen',

    'placeholder.notice': 'Inhalt folgt.',
  },
  en: {
    'site.name': 'Nasim Vision',
    'site.tagline': 'Visitor counting without the cloud',
    'meta.home.title': 'Nasim Vision — Visitor analytics for hospitality and retail in Vienna',
    'meta.home.description':
      'Find out how many guests walk into your venue, using the cameras you already have. The video stays on site. No cloud, no face recognition.',
    'meta.imprint.title': 'Imprint — Nasim Vision',
    'meta.imprint.description': 'Imprint and disclosure under §5 ECG and §25 MedienG.',
    'meta.privacy.title': 'Privacy Policy — Nasim Vision',
    'meta.privacy.description': 'How we handle your data, under the GDPR.',

    'nav.how': 'How it works',
    'nav.privacy': 'Privacy',
    'nav.pricing': 'Packages',
    'nav.contact': 'Contact',
    'nav.cta': 'Request a demo',
    'nav.menu.open': 'Open menu',
    'nav.menu.close': 'Close menu',

    'hero.title': 'How many guests did you have today?',
    'hero.subtitle':
      'Nasim Vision connects to the cameras you already have and counts your visitors. The video never leaves your venue.',
    'hero.cta.primary': 'Request a demo',
    'hero.cta.whatsapp': 'Message us on WhatsApp',

    'problem.title': 'You have cameras. You do not have numbers.',
    'problem.lead': 'The recordings keep running. Nothing in them is ever analysed.',

    'how.title': 'How it works',
    'how.lead': 'One visit, three steps. Your cameras and your recorder stay exactly as they are.',

    'privacy.title': 'Your data stays with you',
    'privacy.lead':
      'No video is stored. No faces are recognised. The only thing that leaves the building is a message saying the device is alive.',

    'dashboard.title': 'What you will see',
    'dashboard.lead': 'From your phone, any time.',

    'audience.title': 'Who it is for',
    'audience.lead': 'Anywhere guests walk through a door.',

    'pricing.title': 'Packages',
    'pricing.lead': 'The exact price is set after we see the venue. No hidden costs.',

    'about.title': 'About us',
    'about.lead': 'We are based in Vienna and install the hardware ourselves.',

    'contact.title': 'Request a demo',
    'contact.lead': 'We get back to you within one business day.',

    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.rights': 'All rights reserved.',
    'footer.madein': 'Built in Vienna.',

    'lang.label': 'Language',
    'skip.content': 'Skip to content',

    'placeholder.notice': 'Content to follow.',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
```

- [ ] **Step 2: Verify TypeScript accepts the file**

```bash
cd website && npx astro check --minimumSeverity error
```

Expected: `0 errors`. (Warnings about unused files are acceptable.)

- [ ] **Step 3: Commit**

```bash
git add website/src/i18n/ui.ts
git commit -m "feat: add DE/EN string dictionary

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: Create the route map

**Files:**
- Create: `website/src/i18n/routes.ts`

German and English page slugs differ (`/impressum/` vs `/en/imprint/`), so the language switcher cannot simply prepend a prefix. A route map pairs them explicitly.

- [ ] **Step 1: Write the route map**

Create `website/src/i18n/routes.ts`:

```ts
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
```

- [ ] **Step 2: Verify TypeScript accepts the file**

```bash
cd website && npx astro check --minimumSeverity error
```

Expected: `0 errors`.

- [ ] **Step 3: Commit**

```bash
git add website/src/i18n/routes.ts
git commit -m "feat: add typed DE/EN route map

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5: Build the i18n helpers with tests

**Files:**
- Create: `website/vitest.config.ts`
- Create: `website/src/i18n/utils.test.ts`
- Create: `website/src/i18n/utils.ts`
- Modify: `website/package.json`

- [ ] **Step 1: Install Vitest**

```bash
cd website && npm install -D vitest
```

Expected: `added N packages`.

- [ ] **Step 2: Add the test script**

In `website/package.json`, inside the `"scripts"` object, add:

```json
    "test": "vitest run",
    "test:watch": "vitest"
```

- [ ] **Step 3: Create the Vitest config**

Create `website/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 4: Write the failing tests**

Create `website/src/i18n/utils.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { ui, defaultLang, languages } from './ui';
import { getLangFromUrl, useTranslations, getAlternates } from './utils';

describe('getLangFromUrl', () => {
  it('returns the default language for the root path', () => {
    expect(getLangFromUrl(new URL('https://example.com/'))).toBe('de');
  });

  it('returns the default language for an unprefixed page', () => {
    expect(getLangFromUrl(new URL('https://example.com/impressum/'))).toBe('de');
  });

  it('returns en for a prefixed path', () => {
    expect(getLangFromUrl(new URL('https://example.com/en/'))).toBe('en');
  });

  it('returns en for a nested prefixed path', () => {
    expect(getLangFromUrl(new URL('https://example.com/en/privacy/'))).toBe('en');
  });

  it('falls back to the default language for an unknown prefix', () => {
    expect(getLangFromUrl(new URL('https://example.com/fr/'))).toBe('de');
  });
});

describe('useTranslations', () => {
  it('returns the German string', () => {
    const t = useTranslations('de');
    expect(t('nav.cta')).toBe('Demo anfragen');
  });

  it('returns the English string', () => {
    const t = useTranslations('en');
    expect(t('nav.cta')).toBe('Request a demo');
  });

  it('returns an empty string for an unknown key instead of throwing', () => {
    const t = useTranslations('en');
    // Cast because the type system already forbids missing keys; this guards
    // against a dictionary edited by hand at runtime.
    expect(t('does.not.exist' as never)).toBe('');
  });
});

describe('getAlternates', () => {
  it('returns one entry per configured language', () => {
    expect(getAlternates('home')).toHaveLength(Object.keys(languages).length);
  });

  it('maps the home route to both locales', () => {
    expect(getAlternates('home')).toEqual([
      { lang: 'de', path: '/' },
      { lang: 'en', path: '/en/' },
    ]);
  });

  it('maps the imprint route across differing slugs', () => {
    expect(getAlternates('imprint')).toEqual([
      { lang: 'de', path: '/impressum/' },
      { lang: 'en', path: '/en/imprint/' },
    ]);
  });
});

describe('dictionary integrity', () => {
  it('has identical key sets in every language', () => {
    const reference = Object.keys(ui[defaultLang]).sort();
    for (const lang of Object.keys(languages) as Array<keyof typeof languages>) {
      expect(Object.keys(ui[lang]).sort(), `language "${lang}"`).toEqual(reference);
    }
  });

  it('has no empty strings', () => {
    for (const lang of Object.keys(languages) as Array<keyof typeof languages>) {
      for (const [key, value] of Object.entries(ui[lang])) {
        expect(value.trim(), `${lang}.${key}`).not.toBe('');
      }
    }
  });
});
```

- [ ] **Step 5: Run the tests to verify they fail**

```bash
cd website && npm test
```

Expected: FAIL with `Failed to resolve import "./utils"`.

- [ ] **Step 6: Write the implementation**

Create `website/src/i18n/utils.ts`:

```ts
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
```

- [ ] **Step 7: Run the tests to verify they pass**

```bash
cd website && npm test
```

Expected: `Test Files 1 passed`, `Tests 13 passed`.

- [ ] **Step 8: Commit**

```bash
git add website/package.json website/package-lock.json website/vitest.config.ts website/src/i18n
git commit -m "feat: add i18n helpers with key-parity tests

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: Configure Astro i18n routing and integrations

**Files:**
- Modify: `website/astro.config.mjs`

- [ ] **Step 1: Install the sitemap integration and Vercel adapter**

```bash
cd website && npx astro add sitemap vercel --yes
```

Expected: both packages installed and added to `astro.config.mjs`.

- [ ] **Step 2: Replace the config with the full version**

Replace the entire contents of `website/astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Placeholder domain. Replace once the real domain is registered
// (WEBSITE_PLAN.md, open question 1).
const SITE = 'https://nasimvision.at';

export default defineConfig({
  site: SITE,
  output: 'static',
  adapter: vercel(),
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
```

- [ ] **Step 3: Verify the build still succeeds**

```bash
cd website && npm run build
```

Expected: `[build] Complete!` and a `.vercel/output/` directory.

- [ ] **Step 4: Commit**

```bash
git add website/package.json website/package-lock.json website/astro.config.mjs
git commit -m "feat: configure i18n routing, sitemap and Vercel adapter

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: Build the base layout

**Files:**
- Create: `website/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write the layout**

Create `website/src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import '@fontsource-variable/inter';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { getLangFromUrl, useTranslations, getAlternates, absoluteUrl } from '../i18n/utils';
import type { RouteKey } from '../i18n/routes';
import type { UIKey } from '../i18n/ui';

interface Props {
  route: RouteKey;
  titleKey: UIKey;
  descriptionKey: UIKey;
}

const { route, titleKey, descriptionKey } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const alternates = getAlternates(route);
const canonical = absoluteUrl(Astro.url.pathname, Astro.site);
const title = t(titleKey);
const description = t(descriptionKey);
---

<!doctype html>
<html lang={lang === 'de' ? 'de-AT' : 'en'}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    {alternates.map((alt) => (
      <link
        rel="alternate"
        hreflang={alt.lang === 'de' ? 'de-AT' : 'en'}
        href={absoluteUrl(alt.path, Astro.site)}
      />
    ))}
    <link rel="alternate" hreflang="x-default" href={absoluteUrl('/', Astro.site)} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:locale" content={lang === 'de' ? 'de_AT' : 'en_US'} />
    <meta property="og:site_name" content={t('site.name')} />
    <meta name="twitter:card" content="summary_large_image" />
  </head>

  <body class="min-h-screen flex flex-col bg-ink-50 text-ink-900">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-ink-50"
    >
      {t('skip.content')}
    </a>

    <Header route={route} />

    <main id="main" class="flex-1">
      <slot />
    </main>

    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Do not build yet**

`Header.astro` and `Footer.astro` do not exist until Tasks 8 and 9. The build will fail until then. Proceed to Task 8.

---

## Task 8: Build the header and language switcher

**Files:**
- Create: `website/src/components/LangSwitcher.astro`
- Create: `website/src/components/Header.astro`

- [ ] **Step 1: Write the language switcher**

Create `website/src/components/LangSwitcher.astro`:

```astro
---
import { getLangFromUrl, useTranslations, getAlternates } from '../i18n/utils';
import { languages } from '../i18n/ui';
import type { RouteKey } from '../i18n/routes';

interface Props {
  route: RouteKey;
}

const { route } = Astro.props;
const current = getLangFromUrl(Astro.url);
const t = useTranslations(current);
const alternates = getAlternates(route);
---

<nav aria-label={t('lang.label')} class="flex items-center gap-1 text-sm">
  {alternates.map((alt, index) => (
    <>
      {index > 0 && <span aria-hidden="true" class="text-ink-300">/</span>}
      <a
        href={alt.path}
        hreflang={alt.lang}
        aria-current={alt.lang === current ? 'true' : undefined}
        class:list={[
          'rounded px-1.5 py-1 uppercase tracking-wide transition-colors',
          alt.lang === current
            ? 'font-semibold text-ink-900'
            : 'text-ink-500 hover:text-ink-900',
        ]}
      >
        <span class="sr-only">{languages[alt.lang]}</span>
        <span aria-hidden="true">{alt.lang}</span>
      </a>
    </>
  ))}
</nav>
```

- [ ] **Step 2: Write the header**

Create `website/src/components/Header.astro`:

```astro
---
import LangSwitcher from './LangSwitcher.astro';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import { routePath, type RouteKey } from '../i18n/routes';

interface Props {
  route: RouteKey;
}

const { route } = Astro.props;
const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const home = routePath('home', lang);

// In-page anchors only resolve on the landing page; elsewhere they are
// prefixed with the home path so the link still works.
const anchor = (id: string) => (route === 'home' ? `#${id}` : `${home}#${id}`);

const navItems = [
  { href: anchor('how'), label: t('nav.how') },
  { href: anchor('privacy'), label: t('nav.privacy') },
  { href: anchor('pricing'), label: t('nav.pricing') },
];
---

<header class="sticky top-0 z-40 border-b border-ink-200/70 bg-ink-50/85 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
    <a href={home} class="flex items-center gap-2 font-semibold tracking-tight text-ink-900">
      <span
        aria-hidden="true"
        class="inline-block h-2.5 w-2.5 rounded-full bg-accent-500"
      ></span>
      {t('site.name')}
    </a>

    <nav aria-label="Hauptnavigation" class="hidden items-center gap-6 text-sm text-ink-500 md:flex">
      {navItems.map((item) => (
        <a href={item.href} class="transition-colors hover:text-ink-900">{item.label}</a>
      ))}
    </nav>

    <div class="flex items-center gap-3">
      <LangSwitcher route={route} />
      <a
        href={anchor('contact')}
        class="rounded-lg bg-ink-900 px-4 py-2 text-sm font-medium text-ink-50 transition-colors hover:bg-ink-800"
      >
        {t('nav.cta')}
      </a>
    </div>
  </div>
</header>
```

- [ ] **Step 3: Commit**

```bash
git add website/src/components/Header.astro website/src/components/LangSwitcher.astro website/src/layouts/BaseLayout.astro
git commit -m "feat: add base layout, header and language switcher

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 9: Build the footer and section wrapper

**Files:**
- Create: `website/src/components/Footer.astro`
- Create: `website/src/components/Section.astro`

- [ ] **Step 1: Write the footer**

Create `website/src/components/Footer.astro`:

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import { routePath } from '../i18n/routes';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
const year = new Date().getFullYear();
---

<footer class="border-t border-ink-200 bg-ink-100/60">
  <div
    class="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between"
  >
    <p>
      &copy; {year} {t('site.name')}. {t('footer.rights')}
      <span class="hidden sm:inline">{t('footer.madein')}</span>
    </p>
    <nav aria-label={t('footer.imprint')} class="flex gap-5">
      <a href={routePath('imprint', lang)} class="transition-colors hover:text-ink-900">
        {t('footer.imprint')}
      </a>
      <a href={routePath('privacy', lang)} class="transition-colors hover:text-ink-900">
        {t('footer.privacy')}
      </a>
    </nav>
  </div>
</footer>
```

- [ ] **Step 2: Write the section wrapper**

Create `website/src/components/Section.astro`:

```astro
---
interface Props {
  id: string;
  title: string;
  lead?: string;
  tone?: 'light' | 'dark';
}

const { id, title, lead, tone = 'light' } = Astro.props;
---

<section
  id={id}
  class:list={[
    'section-y scroll-mt-20',
    tone === 'dark' ? 'bg-ink-900 text-ink-100' : 'bg-ink-50 text-ink-900',
  ]}
>
  <div class="mx-auto max-w-6xl px-5">
    <h2 class="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    {lead && (
      <p
        class:list={[
          'mt-4 max-w-2xl text-lg text-pretty',
          tone === 'dark' ? 'text-ink-300' : 'text-ink-500',
        ]}
      >
        {lead}
      </p>
    )}
    <div class="mt-10">
      <slot />
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add website/src/components/Footer.astro website/src/components/Section.astro
git commit -m "feat: add footer and reusable section wrapper

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 10: Build the landing pages in both languages

**Files:**
- Create: `website/src/components/Hero.astro`
- Create: `website/src/components/LandingSections.astro`
- Modify: `website/src/pages/index.astro`
- Create: `website/src/pages/en/index.astro`

`LandingSections.astro` holds the section order once, so the German and English pages cannot drift apart.

- [ ] **Step 1: Write the hero**

Create `website/src/components/Hero.astro`:

```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// Placeholder. Replaced with the real number in a later plan
// (WEBSITE_PLAN.md, open question 3).
const WHATSAPP_URL = 'https://wa.me/0000000000';
---

<section class="bg-ink-50 pt-16 pb-20 sm:pt-24 sm:pb-28">
  <div class="mx-auto max-w-6xl px-5">
    <p class="text-sm font-medium uppercase tracking-[0.18em] text-accent-600">
      {t('site.tagline')}
    </p>
    <h1 class="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
      {t('hero.title')}
    </h1>
    <p class="mt-6 max-w-2xl text-pretty text-lg text-ink-500 sm:text-xl">
      {t('hero.subtitle')}
    </p>

    <div class="mt-9 flex flex-wrap gap-3">
      <a
        href="#contact"
        class="rounded-lg bg-ink-900 px-6 py-3 font-medium text-ink-50 transition-colors hover:bg-ink-800"
      >
        {t('hero.cta.primary')}
      </a>
      <a
        href={WHATSAPP_URL}
        rel="noopener noreferrer"
        target="_blank"
        class="rounded-lg border border-ink-300 bg-white px-6 py-3 font-medium text-ink-900 transition-colors hover:border-ink-400"
      >
        {t('hero.cta.whatsapp')}
      </a>
    </div>

    <!-- Dashboard mockup lands here in a later plan (WEBSITE_PLAN.md §5). -->
    <div
      class="mt-16 flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-dashed border-ink-300 bg-ink-100 text-sm text-ink-400"
    >
      Dashboard-Mockup
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write the section list**

Create `website/src/components/LandingSections.astro`:

```astro
---
import Hero from './Hero.astro';
import Section from './Section.astro';
import { getLangFromUrl, useTranslations } from '../i18n/utils';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);

// Section order matches WEBSITE_PLAN.md §4, blocks 2-10.
const sections = [
  { id: 'problem', title: t('problem.title'), lead: t('problem.lead'), tone: 'light' },
  { id: 'how', title: t('how.title'), lead: t('how.lead'), tone: 'light' },
  { id: 'privacy', title: t('privacy.title'), lead: t('privacy.lead'), tone: 'dark' },
  { id: 'dashboard', title: t('dashboard.title'), lead: t('dashboard.lead'), tone: 'light' },
  { id: 'audience', title: t('audience.title'), lead: t('audience.lead'), tone: 'light' },
  { id: 'pricing', title: t('pricing.title'), lead: t('pricing.lead'), tone: 'light' },
  { id: 'about', title: t('about.title'), lead: t('about.lead'), tone: 'light' },
  { id: 'contact', title: t('contact.title'), lead: t('contact.lead'), tone: 'dark' },
] as const;
---

<Hero />

{sections.map((section) => (
  <Section id={section.id} title={section.title} lead={section.lead} tone={section.tone}>
    <p class="text-sm italic text-ink-400">{t('placeholder.notice')}</p>
  </Section>
))}
```

- [ ] **Step 3: Write the German landing page**

Replace the entire contents of `website/src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LandingSections from '../components/LandingSections.astro';
---

<BaseLayout route="home" titleKey="meta.home.title" descriptionKey="meta.home.description">
  <LandingSections />
</BaseLayout>
```

- [ ] **Step 4: Write the English landing page**

Create `website/src/pages/en/index.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import LandingSections from '../../components/LandingSections.astro';
---

<BaseLayout route="home" titleKey="meta.home.title" descriptionKey="meta.home.description">
  <LandingSections />
</BaseLayout>
```

- [ ] **Step 5: Build and verify both languages render**

```bash
cd website && npm run build
```

Expected: `[build] Complete!` with `/index.html` and `/en/index.html` among the built pages.

Verify the German page carries the German headline:

```bash
cd website && grep -c "Wie viele Gäste hatten Sie heute" .vercel/output/static/index.html
```

Expected: `1`

Verify the English page carries the English headline:

```bash
cd website && grep -c "How many guests did you have today" .vercel/output/static/en/index.html
```

Expected: `1`

- [ ] **Step 6: Commit**

```bash
git add website/src/components website/src/pages
git commit -m "feat: add bilingual landing page skeleton with section placeholders

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 11: Add the legal pages

**Files:**
- Create: `website/src/components/LegalPage.astro`
- Create: `website/src/pages/impressum.astro`
- Create: `website/src/pages/datenschutz.astro`
- Create: `website/src/pages/en/imprint.astro`
- Create: `website/src/pages/en/privacy.astro`

These pages carry placeholder company data. Real values come from the user (`WEBSITE_PLAN.md`, open question 4). Placeholders are marked `[…]` so they are impossible to miss.

- [ ] **Step 1: Write the legal page wrapper**

Create `website/src/components/LegalPage.astro`:

```astro
---
interface Props {
  heading: string;
}

const { heading } = Astro.props;
---

<article class="section-y mx-auto max-w-3xl px-5">
  <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{heading}</h1>
  <div
    class="mt-8 space-y-6 text-ink-700 [&_a]:text-accent-700 [&_a]:underline [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:ml-5 [&_li]:list-disc"
  >
    <slot />
  </div>
</article>
```

- [ ] **Step 2: Write the German Impressum**

Create `website/src/pages/impressum.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LegalPage from '../components/LegalPage.astro';
---

<BaseLayout route="imprint" titleKey="meta.imprint.title" descriptionKey="meta.imprint.description">
  <LegalPage heading="Impressum">
    <p>Offenlegung gemäß §25 Mediengesetz und Informationen gemäß §5 E-Commerce-Gesetz.</p>

    <h2>Medieninhaber und Diensteanbieter</h2>
    <p>
      [Firmenwortlaut oder Vor- und Nachname]<br />
      [Rechtsform]<br />
      [Straße und Hausnummer]<br />
      [PLZ] Wien, Österreich
    </p>

    <h2>Kontakt</h2>
    <p>
      Telefon: [Telefonnummer]<br />
      E-Mail: [E-Mail-Adresse]
    </p>

    <h2>Unternehmensdaten</h2>
    <p>
      UID-Nummer: [ATU-Nummer oder „nicht umsatzsteuerpflichtig“]<br />
      Firmenbuchnummer: [FN-Nummer oder „nicht eingetragen“]<br />
      Firmenbuchgericht: [Gericht]<br />
      Gewerbeaufsichtsbehörde: Magistratisches Bezirksamt [Bezirk]
    </p>

    <h2>Unternehmensgegenstand</h2>
    <p>Entwicklung und Installation von Systemen zur Besucheranalyse.</p>

    <h2>Online-Streitbeilegung</h2>
    <p>
      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
      <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer" target="_blank">
        ec.europa.eu/consumers/odr
      </a>
    </p>
  </LegalPage>
</BaseLayout>
```

- [ ] **Step 3: Write the German privacy policy**

Create `website/src/pages/datenschutz.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LegalPage from '../components/LegalPage.astro';
---

<BaseLayout route="privacy" titleKey="meta.privacy.title" descriptionKey="meta.privacy.description">
  <LegalPage heading="Datenschutzerklärung">
    <p>
      Diese Erklärung beschreibt, welche personenbezogenen Daten beim Besuch dieser Website
      verarbeitet werden. Verantwortlich ist die im Impressum genannte Stelle.
    </p>

    <h2>Keine Cookies, kein Tracking</h2>
    <p>
      Diese Website setzt keine Cookies und bindet keine Dienste Dritter ein. Schriftarten werden
      vom eigenen Server ausgeliefert, nicht von einem externen Anbieter.
    </p>

    <h2>Server-Logdateien</h2>
    <p>
      Der Hosting-Anbieter erhebt technisch notwendige Zugriffsdaten wie IP-Adresse, Zeitpunkt der
      Anfrage und aufgerufene Seite. Rechtsgrundlage ist das berechtigte Interesse am sicheren
      Betrieb der Website gemäß Art. 6 Abs. 1 lit. f DSGVO.
    </p>

    <h2>Kontaktanfragen</h2>
    <p>
      Wenn Sie uns über das Kontaktformular oder per WhatsApp schreiben, verarbeiten wir die von
      Ihnen angegebenen Daten ausschließlich zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist
      Art. 6 Abs. 1 lit. b DSGVO. Wir löschen diese Daten, sobald sie nicht mehr benötigt werden,
      spätestens nach [Aufbewahrungsfrist].
    </p>

    <h2>Ihre Rechte</h2>
    <p>
      Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
      Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an die im Impressum genannte
      Adresse. Außerdem können Sie sich bei der Österreichischen Datenschutzbehörde beschweren.
    </p>

    <h2>Hinweis zum Produkt Nasim Vision</h2>
    <p>
      Diese Erklärung betrifft ausschließlich diese Website. Das Produkt selbst speichert keine
      Videoaufnahmen und führt keine Gesichtserkennung durch. Es verarbeitet ausschließlich
      anonyme Zählwerte auf einem Gerät im Betrieb des Kunden.
    </p>

    <p class="text-sm text-ink-500">Stand: [Datum]</p>
  </LegalPage>
</BaseLayout>
```

- [ ] **Step 4: Write the English imprint**

Create `website/src/pages/en/imprint.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import LegalPage from '../../components/LegalPage.astro';
---

<BaseLayout route="imprint" titleKey="meta.imprint.title" descriptionKey="meta.imprint.description">
  <LegalPage heading="Imprint">
    <p>Disclosure under §25 of the Austrian Media Act and §5 of the Austrian E-Commerce Act.</p>

    <h2>Media owner and service provider</h2>
    <p>
      [Company name or first and last name]<br />
      [Legal form]<br />
      [Street and number]<br />
      [Postal code] Vienna, Austria
    </p>

    <h2>Contact</h2>
    <p>
      Phone: [phone number]<br />
      Email: [email address]
    </p>

    <h2>Company details</h2>
    <p>
      VAT ID: [ATU number or "not subject to VAT"]<br />
      Commercial register number: [FN number or "not registered"]<br />
      Register court: [court]<br />
      Trade supervisory authority: District Authority [district]
    </p>

    <h2>Business purpose</h2>
    <p>Development and installation of visitor analytics systems.</p>

    <h2>Online dispute resolution</h2>
    <p>
      The European Commission provides a platform for online dispute resolution:
      <a href="https://ec.europa.eu/consumers/odr" rel="noopener noreferrer" target="_blank">
        ec.europa.eu/consumers/odr
      </a>
    </p>
  </LegalPage>
</BaseLayout>
```

- [ ] **Step 5: Write the English privacy policy**

Create `website/src/pages/en/privacy.astro`:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import LegalPage from '../../components/LegalPage.astro';
---

<BaseLayout route="privacy" titleKey="meta.privacy.title" descriptionKey="meta.privacy.description">
  <LegalPage heading="Privacy Policy">
    <p>
      This policy describes which personal data is processed when you visit this website. The
      controller is the entity named in the imprint.
    </p>

    <h2>No cookies, no tracking</h2>
    <p>
      This website sets no cookies and embeds no third-party services. Fonts are served from our
      own server, not from an external provider.
    </p>

    <h2>Server log files</h2>
    <p>
      The hosting provider collects technically necessary access data such as IP address, time of
      request and page requested. The legal basis is our legitimate interest in the secure
      operation of the website under Art. 6(1)(f) GDPR.
    </p>

    <h2>Contact requests</h2>
    <p>
      If you write to us through the contact form or via WhatsApp, we process the data you provide
      solely to handle your enquiry. The legal basis is Art. 6(1)(b) GDPR. We delete this data once
      it is no longer needed, at the latest after [retention period].
    </p>

    <h2>Your rights</h2>
    <p>
      You have the right to access, rectification, erasure, restriction of processing, data
      portability and objection. Contact us at the address given in the imprint. You may also
      lodge a complaint with the Austrian Data Protection Authority.
    </p>

    <h2>Note on the Nasim Vision product</h2>
    <p>
      This policy covers this website only. The product itself stores no video recordings and
      performs no face recognition. It processes only anonymous counts on a device located on the
      customer's premises.
    </p>

    <p class="text-sm text-ink-500">Last updated: [date]</p>
  </LegalPage>
</BaseLayout>
```

- [ ] **Step 6: Build and verify all six pages exist**

```bash
cd website && npm run build && ls .vercel/output/static .vercel/output/static/en
```

Expected: `index.html`, `impressum/`, `datenschutz/` in the first listing; `index.html`, `imprint/`, `privacy/` in the second.

- [ ] **Step 7: Verify the language switcher pairs the differing slugs**

```bash
cd website && grep -o 'href="/en/imprint/"' .vercel/output/static/impressum/index.html
```

Expected: `href="/en/imprint/"`

- [ ] **Step 8: Commit**

```bash
git add website/src
git commit -m "feat: add Impressum and privacy policy in both languages

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 12: Add favicon, robots.txt and the repo readme

**Files:**
- Create: `website/public/favicon.svg`
- Create: `website/public/robots.txt`
- Create: `README.md`

- [ ] **Step 1: Write the favicon**

Create `website/public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Nasim Vision">
  <rect width="32" height="32" rx="7" fill="#0E131A"/>
  <circle cx="16" cy="16" r="7" fill="none" stroke="#17B890" stroke-width="2.5"/>
  <circle cx="16" cy="16" r="2.5" fill="#17B890"/>
</svg>
```

- [ ] **Step 2: Write robots.txt**

Create `website/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://nasimvision.at/sitemap-index.xml
```

- [ ] **Step 3: Write the repo readme**

Create `README.md` at the repository root:

````markdown
# Nasim Vision

Visitor analytics for hospitality and retail, running entirely on a box inside the venue.
No cloud, no video storage. Vienna, Austria.

- Product plan: [`PLAN.md`](PLAN.md)
- Website plan: [`WEBSITE_PLAN.md`](WEBSITE_PLAN.md)
- Implementation plans: [`docs/superpowers/plans/`](docs/superpowers/plans/)

## Repository layout

| Path | Contents |
|---|---|
| `website/` | Marketing site, Astro. Deployed to Vercel. |
| `box/` | On-premise analytics software, Python. Not deployed. |

## Website: local development

```bash
cd website
npm install
npm run dev      # http://localhost:4321
npm run build    # production build
npm test         # unit tests
```

## Website: Vercel setup

Done once, in the Vercel dashboard:

1. Import the GitHub repository.
2. **Settings → General → Root Directory**: set to `website`.
3. Framework preset: Astro (auto-detected). Leave build and output settings unchanged.
4. Deploy.

After that, every push to `main` deploys to production and every push to any other
branch gets its own preview URL.
````

- [ ] **Step 4: Build and verify the sitemap is generated**

```bash
cd website && npm run build && ls .vercel/output/static/sitemap-index.xml
```

Expected: the path is listed, no error.

- [ ] **Step 5: Commit**

```bash
git add website/public README.md
git commit -m "chore: add favicon, robots.txt and repository readme

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 13: Final verification and push

**Files:** none

- [ ] **Step 1: Run the full check**

```bash
cd website && npm test && npx astro check --minimumSeverity error && npm run build
```

Expected: tests pass, `0 errors`, `[build] Complete!`.

- [ ] **Step 2: Inspect the site in a browser**

```bash
cd website && npm run dev
```

Open `http://localhost:4321/` and confirm:
- The German headline is shown.
- Clicking `EN` in the header goes to `/en/` and shows the English headline.
- The footer links reach `/impressum/` and `/datenschutz/`.
- From `/impressum/`, clicking `EN` goes to `/en/imprint/`, not to `/en/impressum/`.
- The page has no horizontal scrollbar at 375 px width.

Stop the server with `Ctrl+C`.

- [ ] **Step 3: Add the GitHub remote**

Ask the user for the repository URL, then run from the repository root:

```bash
git remote add origin <URL provided by the user>
```

- [ ] **Step 4: Push**

```bash
git push -u origin main
```

Expected: `branch 'main' set up to track 'origin/main'`.

- [ ] **Step 5: Verify the Vercel deploy**

Confirm in the Vercel dashboard that the deployment succeeded, then open the production
URL and repeat the checks from Step 2 against the live site.

If the build fails with `No Output Directory named "public" found`, the Root Directory
setting is missing. Set **Settings → General → Root Directory** to `website` and redeploy.

---

## Definition of done

- `npm test`, `npx astro check` and `npm run build` all pass in `website/`.
- Six pages build: DE home, Impressum, Datenschutz; EN home, imprint, privacy.
- The language switcher preserves the current page across the two languages.
- Every page has a canonical URL, both `hreflang` alternates and an `x-default`.
- No German or English text is hardcoded in a component; everything reads from `ui.ts`.
- The site is live on Vercel and pushes to `main` deploy automatically.

## Handover to the next plan

The next plans, in order:

1. **Box Phase 0 spike** — measure detector throughput on CPU from a video file, to confirm the
   2-4 camera assumption behind the Standard package (`PLAN.md` §8).
2. **Website content** — fill the eight placeholder sections, build the dashboard mockup and the
   privacy diagram.
3. **Contact form** — serverless handler on Vercel, email plus Telegram notification.
