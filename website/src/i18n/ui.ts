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

    'hero.title': 'Wie viele Gäste hatten Sie heute?',
    'hero.subtitle':
      'Nasim Vision verbindet sich mit den Kameras, die Sie schon haben, und zählt Ihre Besucher. Das Video verlässt Ihr Lokal nicht.',
    'hero.cta.primary': 'Demo anfragen',
    'hero.cta.whatsapp': 'Per WhatsApp schreiben',
    'hero.note': 'Einrichtung an einem Termin. Ihre Kameras bleiben, wie sie sind.',

    'mock.now': 'Jetzt im Lokal',
    'mock.today': 'Heute gesamt',
    'mock.peak': 'Stärkste Stunde',
    'mock.vs': 'zur Vorwoche',
    'mock.chart': 'Gäste pro Stunde',
    'mock.caption': 'So sieht Ihre Übersicht am Handy aus.',

    'problem.title': 'Kameras haben Sie. Zahlen nicht.',
    'problem.lead':
      'Die Aufnahmen laufen mit, Monat für Monat. Ausgewertet wird davon nichts.',
    'problem.1.title': 'Sie schätzen statt zu wissen',
    'problem.1.body':
      'Wie viele Gäste waren am Samstag da? Die meisten Wirte antworten mit einem Gefühl, nicht mit einer Zahl.',
    'problem.2.title': 'Dienstpläne nach Bauchgefühl',
    'problem.2.body':
      'Zu viel Personal am Dienstag, zu wenig am Freitag um sieben. Beides kostet Geld, jede Woche.',
    'problem.3.title': 'Aktionen ohne Beweis',
    'problem.3.body':
      'Hat die Happy Hour wirklich mehr Leute gebracht? Ohne Zahlen bleibt es eine Vermutung.',

    'how.title': 'So funktioniert es',
    'how.lead':
      'Ein Termin, drei Schritte. Ihre Kameras und Ihr Rekorder bleiben unverändert.',
    'how.1.title': 'Gerät anschließen',
    'how.1.body':
      'Wir stellen einen kleinen Computer zu Ihrem Netzwerk und verbinden ihn mit den vorhandenen Kameras. Nichts wird umgebaut, nichts ersetzt.',
    'how.2.title': 'Linie einzeichnen',
    'how.2.body':
      'Auf dem Kamerabild markieren wir Ihre Eingangstür. Ab diesem Moment zählt das Gerät jeden, der die Linie überschreitet, in beide Richtungen.',
    'how.3.title': 'Zahlen ansehen',
    'how.3.body':
      'Sie öffnen die Übersicht am Handy und sehen, wie viele Gäste da waren, wann der Andrang kam und wie die Woche im Vergleich läuft.',
    'how.footnote': 'Die Einrichtung dauert etwa zwei Stunden. Danach läuft das Gerät allein.',

    'privacy.title': 'Ihre Daten bleiben bei Ihnen',
    'privacy.lead':
      'Das ist kein Zusatz, sondern der Kern: Wir bauen das Gerät so, dass gar nichts erst entsteht, was abfließen könnte.',
    'privacy.1.title': 'Kein Video wird gespeichert',
    'privacy.1.body':
      'Das Bild wird im Arbeitsspeicher ausgewertet und im selben Moment verworfen. Auf dem Gerät liegen nur Zahlen: Uhrzeit, Richtung, eins.',
    'privacy.2.title': 'Keine Gesichtserkennung',
    'privacy.2.body':
      'Das System unterscheidet einen Menschen von einem Sessel. Es unterscheidet nicht Herrn Huber von Frau Gruber. Niemand wird wiedererkannt.',
    'privacy.3.title': 'Nichts verlässt das Haus',
    'privacy.3.body':
      'Nach außen geht eine einzige Meldung: Gerät läuft, Version 1.2, Speicher 40 Prozent. Keine Gästedaten, keine Umsätze, kein Bild.',
    'privacy.gdpr':
      'Weil nur anonyme Zählwerte entstehen, verarbeiten wir keine personenbezogenen Daten im Sinne der DSGVO. Ihre bestehende Videoüberwachung bleibt davon unberührt und weiterhin Ihre Sache.',
    'privacy.diagram.camera': 'Ihre Kameras',
    'privacy.diagram.box': 'Gerät in Ihrem Lokal',
    'privacy.diagram.phone': 'Ihr Handy',
    'privacy.diagram.cloud': 'Cloud',
    'privacy.diagram.blocked': 'Kein Video ins Internet',
    'privacy.diagram.alt':
      'Schema: Kameras senden an ein Gerät im Lokal, das Gerät zeigt Zahlen auf Ihrem Handy. Der Weg in die Cloud ist durchgestrichen.',

    'dashboard.title': 'Das sehen Sie',
    'dashboard.lead': 'Vier Zahlen, die Sie sofort verwenden können. Vom Handy aus, jederzeit.',
    'dashboard.1.title': 'Jetzt im Lokal',
    'dashboard.1.body': 'Wie viele Menschen gerade da sind, aktualisiert im Sekundentakt.',
    'dashboard.2.title': 'Verlauf nach Stunden',
    'dashboard.2.body': 'Wann der Andrang beginnt und wann er abreißt, Tag für Tag.',
    'dashboard.3.title': 'Vergleich mit der Vorwoche',
    'dashboard.3.body': 'Dieser Samstag gegen letzten Samstag. Sofort sichtbar, ob es besser lief.',
    'dashboard.4.title': 'Tägliche Zusammenfassung',
    'dashboard.4.body':
      'Jeden Morgen ein kurzer Text: wie viele Gäste, wann der Höhepunkt war, was sich verändert hat.',

    'audience.title': 'Für wen',
    'audience.lead': 'Überall dort, wo Gäste durch eine Tür gehen.',
    'audience.1.title': 'Restaurants',
    'audience.1.body':
      'Sehen, wann der Andrang kommt, und den Dienstplan danach schreiben statt nach Gefühl.',
    'audience.2.title': 'Bars',
    'audience.2.body':
      'Prüfen, ob die Aktion am Donnerstag wirklich Gäste bringt oder nur die Marge drückt.',
    'audience.3.title': 'Hotels',
    'audience.3.body':
      'Frequenz in Lobby, Frühstücksraum und Bar kennen, ohne einzelne Gäste zu beobachten.',
    'audience.4.title': 'Geschäfte',
    'audience.4.body':
      'Wissen, wie viele hereinkommen, und diese Zahl gegen Ihre Kassenbons halten.',

    'pricing.title': 'Pakete',
    'pricing.lead':
      'Zwei Größen, je nachdem wie viele Kameras Sie haben. Der genaue Preis steht nach der Besichtigung fest.',
    'pricing.standard.name': 'Standard',
    'pricing.standard.for': 'Für ein Lokal mit einem Eingang',
    'pricing.standard.1': 'Bis zu 4 Kameras',
    'pricing.standard.2': 'Übersicht am Handy',
    'pricing.standard.3': 'Tägliche Zusammenfassung',
    'pricing.standard.4': 'Einrichtung vor Ort durch uns',
    'pricing.pro.name': 'Pro',
    'pricing.pro.for': 'Für größere Häuser und mehrere Bereiche',
    'pricing.pro.1': 'Bis zu 8 Kameras',
    'pricing.pro.2': 'Alles aus Standard',
    'pricing.pro.3': 'Fragen in normaler Sprache an Ihre Zahlen',
    'pricing.pro.4': 'Schnellere Hardware für mehr Kameras',
    'pricing.badge': 'Beliebt',
    'pricing.price': 'Preis nach Besichtigung',
    'pricing.cta': 'Angebot anfragen',
    'pricing.note':
      'Einmalige Einrichtung plus monatliche Betreuung. Keine versteckten Kosten, monatlich kündbar.',

    'about.title': 'Über uns',
    'about.body.1':
      'Wir sind ein kleines Team aus Wien. Wir schreiben die Software selbst, bauen die Geräte selbst zusammen und kommen selbst zur Installation vorbei.',
    'about.body.2':
      'Wenn etwas nicht stimmt, rufen Sie nicht in einem Callcenter in einem anderen Land an, sondern bei den Leuten, die das Gerät gebaut haben.',

    'contact.title': 'Demo anfragen',
    'contact.lead':
      'Erzählen Sie kurz, was für ein Lokal Sie haben. Wir melden uns innerhalb eines Werktags und zeigen Ihnen das Gerät in Betrieb.',
    'contact.form.name': 'Ihr Name',
    'contact.form.venue': 'Name des Lokals',
    'contact.form.contact': 'Telefon oder E-Mail',
    'contact.form.message': 'Worum geht es? (optional)',
    'contact.form.message.placeholder':
      'Zum Beispiel: Restaurant im 7. Bezirk, 3 Kameras, ein Eingang.',
    'contact.form.consent':
      'Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden.',
    'contact.form.submit': 'Anfrage senden',
    'contact.form.required': 'Pflichtfeld',
    'contact.or': 'Oder direkt',
    'contact.whatsapp': 'WhatsApp',
    'contact.phone': 'Anrufen',
    'contact.email': 'E-Mail',

    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.madein': 'Entwickelt in Wien.',

    'lang.label': 'Sprache',
    'skip.content': 'Zum Inhalt springen',
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

    'hero.title': 'How many guests did you have today?',
    'hero.subtitle':
      'Nasim Vision connects to the cameras you already have and counts your visitors. The video never leaves your venue.',
    'hero.cta.primary': 'Request a demo',
    'hero.cta.whatsapp': 'Message us on WhatsApp',
    'hero.note': 'Set up in a single visit. Your cameras stay exactly as they are.',

    'mock.now': 'In the venue now',
    'mock.today': 'Today in total',
    'mock.peak': 'Busiest hour',
    'mock.vs': 'vs last week',
    'mock.chart': 'Guests per hour',
    'mock.caption': 'This is what your dashboard looks like on a phone.',

    'problem.title': 'You have cameras. You do not have numbers.',
    'problem.lead':
      'The recordings keep running, month after month. Nothing in them is ever analysed.',
    'problem.1.title': 'You estimate instead of knowing',
    'problem.1.body':
      'How many guests came in on Saturday? Most owners answer with a feeling, not a number.',
    'problem.2.title': 'Rosters built on instinct',
    'problem.2.body':
      'Too much staff on Tuesday, too little at seven on Friday. Both cost money, every single week.',
    'problem.3.title': 'Promotions with no proof',
    'problem.3.body':
      'Did happy hour actually bring more people in? Without numbers it stays a guess.',

    'how.title': 'How it works',
    'how.lead': 'One visit, three steps. Your cameras and your recorder stay untouched.',
    'how.1.title': 'Connect the device',
    'how.1.body':
      'We add a small computer to your network and connect it to your existing cameras. Nothing is rebuilt, nothing is replaced.',
    'how.2.title': 'Draw the line',
    'how.2.body':
      'On the camera image we mark your entrance. From that moment the device counts everyone who crosses the line, in both directions.',
    'how.3.title': 'Read the numbers',
    'how.3.body':
      'You open the dashboard on your phone and see how many guests came, when the rush started, and how the week compares.',
    'how.footnote': 'Setup takes about two hours. After that the device runs on its own.',

    'privacy.title': 'Your data stays with you',
    'privacy.lead':
      'This is not a feature bolted on at the end. The device is built so that nothing which could leak is ever created.',
    'privacy.1.title': 'No video is stored',
    'privacy.1.body':
      'The image is analysed in memory and discarded in the same instant. All that remains on the device is numbers: time, direction, one.',
    'privacy.2.title': 'No face recognition',
    'privacy.2.body':
      'The system tells a person from a chair. It does not tell Mr Huber from Ms Gruber. Nobody is ever recognised again.',
    'privacy.3.title': 'Nothing leaves the building',
    'privacy.3.body':
      'One single message goes out: device alive, version 1.2, storage 40 per cent. No guest data, no revenue, no image.',
    'privacy.gdpr':
      'Because only anonymous counts are produced, we process no personal data within the meaning of the GDPR. Your existing video surveillance is untouched and remains your own responsibility.',
    'privacy.diagram.camera': 'Your cameras',
    'privacy.diagram.box': 'Device in your venue',
    'privacy.diagram.phone': 'Your phone',
    'privacy.diagram.cloud': 'Cloud',
    'privacy.diagram.blocked': 'No video to the internet',
    'privacy.diagram.alt':
      'Diagram: cameras feed a device inside the venue, the device shows numbers on your phone. The path to the cloud is crossed out.',

    'dashboard.title': 'What you will see',
    'dashboard.lead': 'Four numbers you can act on straight away. From your phone, any time.',
    'dashboard.1.title': 'In the venue now',
    'dashboard.1.body': 'How many people are inside right now, updated every few seconds.',
    'dashboard.2.title': 'Hour by hour',
    'dashboard.2.body': 'When the rush starts and when it drops off, day after day.',
    'dashboard.3.title': 'Compared to last week',
    'dashboard.3.body': 'This Saturday against last Saturday. You see at once whether it went better.',
    'dashboard.4.title': 'Daily summary',
    'dashboard.4.body':
      'A short note every morning: how many guests, when the peak was, what changed.',

    'audience.title': 'Who it is for',
    'audience.lead': 'Anywhere guests walk through a door.',
    'audience.1.title': 'Restaurants',
    'audience.1.body':
      'See when the rush arrives and write the roster around it instead of around a hunch.',
    'audience.2.title': 'Bars',
    'audience.2.body':
      'Check whether Thursday night promotions actually bring people in or only cut your margin.',
    'audience.3.title': 'Hotels',
    'audience.3.body':
      'Know the footfall in the lobby, breakfast room and bar without watching individual guests.',
    'audience.4.title': 'Shops',
    'audience.4.body':
      'Know how many people come in, and hold that number against your till receipts.',

    'pricing.title': 'Packages',
    'pricing.lead':
      'Two sizes, depending on how many cameras you have. The exact price is set after we see the venue.',
    'pricing.standard.name': 'Standard',
    'pricing.standard.for': 'For a venue with one entrance',
    'pricing.standard.1': 'Up to 4 cameras',
    'pricing.standard.2': 'Dashboard on your phone',
    'pricing.standard.3': 'Daily summary',
    'pricing.standard.4': 'On-site setup by us',
    'pricing.pro.name': 'Pro',
    'pricing.pro.for': 'For larger venues and several areas',
    'pricing.pro.1': 'Up to 8 cameras',
    'pricing.pro.2': 'Everything in Standard',
    'pricing.pro.3': 'Ask your numbers questions in plain language',
    'pricing.pro.4': 'Faster hardware for more cameras',
    'pricing.badge': 'Popular',
    'pricing.price': 'Price after a site visit',
    'pricing.cta': 'Request a quote',
    'pricing.note':
      'A one-off setup fee plus monthly support. No hidden costs, cancel monthly.',

    'about.title': 'About us',
    'about.body.1':
      'We are a small team in Vienna. We write the software ourselves, assemble the devices ourselves, and come to the installation ourselves.',
    'about.body.2':
      'When something is wrong you do not ring a call centre in another country. You ring the people who built the device.',

    'contact.title': 'Request a demo',
    'contact.lead':
      'Tell us briefly what kind of venue you run. We get back to you within one business day and show you the device working.',
    'contact.form.name': 'Your name',
    'contact.form.venue': 'Name of the venue',
    'contact.form.contact': 'Phone or email',
    'contact.form.message': 'What is it about? (optional)',
    'contact.form.message.placeholder':
      'For example: restaurant in the 7th district, 3 cameras, one entrance.',
    'contact.form.consent':
      'I agree that my details may be used to handle my enquiry.',
    'contact.form.submit': 'Send enquiry',
    'contact.form.required': 'Required',
    'contact.or': 'Or reach us directly',
    'contact.whatsapp': 'WhatsApp',
    'contact.phone': 'Call us',
    'contact.email': 'Email',

    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.rights': 'All rights reserved.',
    'footer.madein': 'Built in Vienna.',

    'lang.label': 'Language',
    'skip.content': 'Skip to content',
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
