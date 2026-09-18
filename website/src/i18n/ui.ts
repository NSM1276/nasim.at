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
