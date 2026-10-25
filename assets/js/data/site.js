/**
 * ABC: site-wide data (not tied to one event).
 * null means "not supplied yet". The site shows a placeholder or hides the item.
 */

export const SITE = {
    email: "info@theafricanbrands.net",
  phone: "+234 903 0888 871", // second line on the flyer: +234 813 1467 003
  address: "Co-ordination Office: The African Brands Media Ltd., Plot 299, Ikorodu Road, Maryland, Lagos, Nigeria",
  social: {
    // Icons stay hidden until a URL is set.
    linkedin: null,
    twitter: null,
    instagram: null,
  },
    privacyUrl: "/privacy",
};

/**
 * Past editions shown on Home. Years are taken from the design: client to confirm.
 * image: { src, alt, width, height } or null (4:3, compressed, under 200 KB).
 */
export const PAST_EDITIONS = [
    { year: 2021, image: { src: "/assets/img/ABC2021.webp", alt: "2021 Event", width: 800, height: 450 },

 },
  { year: 2022, image: { src: "/assets/img/ABC2022.webp", alt: "2022 Event", width: 800, height: 450 }, 

},
];

/**
 * Sponsors and partners. While empty, Home shows "Sponsor logo" placeholders.
 * { name: "Company", logo: "/assets/img/sponsors/company.webp", url: "https://..." }
 */
export const SPONSORS = [];

/**
 * Timeline on the About page. Years 2021 to 2023 are NOT confirmed: client to confirm.
 * theme and venue stay null until supplied; the page shows "to be added".
 * The upcoming edition is added automatically from events.js.
 */
export const TIMELINE = [
  { year: 2021, theme: null, venue: null },
  { year: 2022, theme: null, venue: null },
  { year: 2023, theme: null, venue: null },
];