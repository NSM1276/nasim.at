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
