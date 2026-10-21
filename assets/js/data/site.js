/**
 * ABC: site-wide data (not tied to one event).
 * null means "not supplied yet". The site shows a placeholder or hides the item.
 */

export const SITE = {
  email: null, // e.g. "info@example.com"
  phone: null, // e.g. "+234 000 000 0000"
  address: null, // office address
  social: {
    // Icons stay hidden until a URL is set.
    linkedin: null,
    twitter: null,
    instagram: null,
  },
  privacyUrl: null, // e.g. "/privacy"
};

/**
 * Past editions shown on Home. Years are taken from the design: client to confirm.
 * image: { src, alt, width, height } or null (4:3, compressed, under 200 KB).
 */
export const PAST_EDITIONS = [
  { year: 2021, image: { src: "/assets/img/ABC2021.webp", alt: "2022 Event", width: 800, height: 450 },

 },
  { year: 2022, image: { src: "/assets/img/ABC2022.webp", alt: "2022 Event", width: 800, height: 450 }, 

},
];

/**
 * Sponsors and partners. While empty, Home shows "Sponsor logo" placeholders.
 * { name: "Company", logo: "/assets/img/sponsors/company.webp", url: "https://..." }
 */
export const SPONSORS = [];