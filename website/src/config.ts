/**
 * Single place for the business details that appear across the site.
 *
 * PLACEHOLDERS — replace all four with the real values. They are deliberately
 * kept together so nobody has to hunt through components for a phone number.
 */
export const CONTACT = {
  /** Shown on the call button and used for the tel: link. */
  phone: '+43 660 0000000',
  /** Shown on the email button and used for the mailto: link. */
  email: 'office@nasim.at',
  /** Full https://wa.me/<number> link, digits only, no plus and no spaces. */
  whatsapp: 'https://wa.me/436600000000',
  /** Where the contact form posts. Wired up once a destination exists. */
  formEndpoint: '/api/contact',
} as const;
